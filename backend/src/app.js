const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const { Server } = require("socket.io");
const { TeacherLogin } = require("./controllers/login");
const {
  createPoll,
  voteOnOption,
  getPolls,
} = require("../src/controllers/poll");
const { validateSession } = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const DB =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URL
    : "mongodb://localhost:27017/intevuePoll";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Failed to connect to MongoDB:", e);
  });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let votes = {};
let connectedUsers = {}; // Users in chat
let allConnectedUsers = {}; // All users (including kicked ones) for poll purposes
let currentPoll = null;
let studentAnswers = new Map(); // Track individual student answers
let pollStartTime = null;
let kickedUsers = new Set(); // Track kicked users

// Helper function to check if all students have answered
const checkIfAllStudentsAnswered = () => {
  if (!currentPoll) return true;
  
  // Get all connected students (exclude teachers)
  const students = Object.values(connectedUsers).filter(username => !username.startsWith('teacher'));
  
  if (students.length === 0) return true; // No students connected
  
  // Check if all students have answered
  return students.every(student => studentAnswers.has(student));
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createPoll", async (pollData) => {
    // Check if teacher can create new poll
    const teacherUsername = pollData.teacherUsername;
    if (currentPoll && currentPoll.teacherUsername === teacherUsername) {
      // Check if all students have answered or time has expired
      const allStudentsAnswered = checkIfAllStudentsAnswered();
      const timeExpired = pollStartTime && (Date.now() - pollStartTime) > (currentPoll.timer * 1000);
      
      if (!allStudentsAnswered && !timeExpired) {
        socket.emit("pollCreationError", { 
          message: "Cannot create new poll. Wait for all students to answer or time to expire." 
        });
        return;
      }
    }

    // Reset for new poll
    votes = {};
    studentAnswers.clear();
    currentPoll = null;
    pollStartTime = null;

    const poll = await createPoll(pollData);
    currentPoll = poll;
    pollStartTime = Date.now();
    console.log(`Broadcasting poll to all users. Total connected: ${Object.keys(allConnectedUsers).length}`);
    console.log(`All connected users:`, allConnectedUsers);
    io.emit("pollCreated", poll);

    // Set timer to automatically end poll
    setTimeout(() => {
      if (currentPoll && currentPoll._id.toString() === poll._id.toString()) {
        io.emit("pollTimeExpired", { 
          message: "Time's up! Poll has ended.",
          allAnswered: checkIfAllStudentsAnswered()
        });
      }
    }, poll.timer * 1000);
  });

  socket.on("kickOut", (userToKick) => {
    console.log(`Attempting to kick user: ${userToKick}`);
    console.log(`Current connected users:`, connectedUsers);
    console.log(`Current all connected users:`, allConnectedUsers);
    
    for (let id in allConnectedUsers) {
      if (allConnectedUsers[id] === userToKick) {
        // Add user to kicked users set
        kickedUsers.add(userToKick);
        console.log(`User ${userToKick} added to kicked users set`);
        
        // Notify the kicked user but don't disconnect them
        io.to(id).emit("kickedOut", { 
          message: "You have been kicked from the chat but can still participate in polls.",
          kickedFromChat: true 
        });
        console.log(`Sent kick notification to socket ${id}`);
        
        // Remove from connected users for chat purposes only
        if (connectedUsers[id]) {
          delete connectedUsers[id];
          console.log(`Removed ${userToKick} from chat participants`);
        }
        break;
      }
    }
    io.emit("participantsUpdate", Object.values(connectedUsers));
    console.log(`Updated participants list:`, Object.values(connectedUsers));
  });

  socket.on("joinChat", ({ username }) => {
    // Always add to allConnectedUsers for poll purposes
    allConnectedUsers[socket.id] = username;
    
    // Check if user is kicked from chat
    if (kickedUsers.has(username)) {
      socket.emit("kickedFromChat", { 
        message: "You have been kicked from the chat but can still participate in polls.",
        kickedFromChat: true 
      });
    } else {
      connectedUsers[socket.id] = username;
      io.emit("participantsUpdate", Object.values(connectedUsers));
    }

    // Send current poll status if poll is active (regardless of kick status)
    if (currentPoll) {
      socket.emit("pollCreated", currentPoll);
      socket.emit("pollResults", votes);
      socket.emit("answerStatus", {
        totalStudents: Object.values(allConnectedUsers).filter(u => !u.startsWith('teacher')).length,
        answeredStudents: studentAnswers.size,
        allAnswered: checkIfAllStudentsAnswered()
      });
    }

    socket.on("disconnect", () => {
      const disconnectedUser = allConnectedUsers[socket.id];
      delete connectedUsers[socket.id];
      delete allConnectedUsers[socket.id];
      
      // Remove student's answer if they disconnect
      if (disconnectedUser && !disconnectedUser.startsWith('teacher')) {
        studentAnswers.delete(disconnectedUser);
        kickedUsers.delete(disconnectedUser); // Remove from kicked users too
      }
      
      // Only update participants if user was in chat
      if (disconnectedUser && !kickedUsers.has(disconnectedUser)) {
        io.emit("participantsUpdate", Object.values(connectedUsers));
      }
      
      // Update answer status after disconnection
      if (currentPoll) {
        io.emit("answerStatus", {
          totalStudents: Object.values(allConnectedUsers).filter(u => !u.startsWith('teacher')).length,
          answeredStudents: studentAnswers.size,
          allAnswered: checkIfAllStudentsAnswered()
        });
      }
    });
  });

  socket.on("studentLogin", (name) => {
    socket.emit("loginSuccess", { message: "Login successful", name });
  });

  socket.on("chatMessage", (message) => {
    const username = allConnectedUsers[socket.id];
    
    // Check if user is kicked from chat
    if (kickedUsers.has(username)) {
      socket.emit("chatError", { 
        message: "You have been kicked from the chat and cannot send messages.",
        type: "kicked"
      });
      return;
    }
    
    // Only broadcast if user is not kicked
    io.emit("chatMessage", message);
  });

  socket.on("submitAnswer", (answerData) => {
    // Check if student has already answered
    if (studentAnswers.has(answerData.username)) {
      socket.emit("answerError", { message: "You have already answered this question." });
      return;
    }

    // Track student answer
    studentAnswers.set(answerData.username, {
      option: answerData.option,
      timestamp: Date.now()
    });

    votes[answerData.option] = (votes[answerData.option] || 0) + 1;
    voteOnOption(answerData.pollId, answerData.option);
    
    // Send updated results
    io.emit("pollResults", votes);
    
    // Send answer status to teacher
    io.emit("answerStatus", {
      totalStudents: Object.values(allConnectedUsers).filter(username => !username.startsWith('teacher')).length,
      answeredStudents: studentAnswers.size,
      allAnswered: checkIfAllStudentsAnswered()
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Polling System Backend");
});

app.post("/teacher-login", (req, res) => {
  TeacherLogin(req, res);
});

app.get("/polls/:teacherUsername", validateSession, (req, res) => {
  getPolls(req, res);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
