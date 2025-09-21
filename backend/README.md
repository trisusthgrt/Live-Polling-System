
# 🗳️ Live Polling System - Backend

## 📖 Overview

This is the backend server for a **real-time live polling system** designed for educational environments. It enables teachers to create interactive polls and students to participate in them with real-time updates, chat functionality, and comprehensive classroom management features.

### ✨ Key Features

- 🎯 **Real-time Polling** - Live poll creation and participation
- 💬 **Interactive Chat** - Student-teacher communication during sessions
- 👥 **Participant Management** - Track and manage student participation
- ⏱️ **Timer-based Polls** - Configurable poll duration
- 📊 **Live Results** - Real-time vote counting and result display
- 🚫 **Chat Moderation** - Kick disruptive students from chat while preserving poll access
- 📈 **Poll History** - Track and view past poll sessions
- 🔐 **Session Management** - Secure user authentication and session handling

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 22.5.1+ |
| **Express.js** | Web Framework | Latest |
| **MongoDB** | Database | Latest |
| **Socket.IO** | Real-time Communication | Latest |
| **Mongoose** | MongoDB ODM | Latest |
| **CORS** | Cross-Origin Resource Sharing | Latest |
| **dotenv** | Environment Variables | Latest |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0.0 or higher)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Live-Polling-System/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the backend directory
   touch .env
   ```
   
   Add the following to your `.env` file:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/live-polling-system
   NODE_ENV=development
   ```

4. **Start MongoDB service**
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb/brew/mongodb-community
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

### 🎯 Server Information

- **Backend URL**: `http://localhost:3000`
- **Socket.IO Endpoint**: `http://localhost:3000`
- **API Base**: `http://localhost:3000/api`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/teacher-login` | Teacher authentication |
| `POST` | `/student-login` | Student authentication |

### Poll Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/create-poll` | Create a new poll |
| `GET` | `/poll-history` | Get poll history |
| `POST` | `/vote` | Submit poll vote |

---

## 🔌 Socket.IO Events

### Client → Server Events

| Event | Data | Description |
|-------|------|-------------|
| `joinChat` | `{ username }` | Join chat session |
| `chatMessage` | `{ user, text }` | Send chat message |
| `kickOut` | `userToKick` | Kick user from chat |
| `submitAnswer` | `{ pollId, option, username }` | Submit poll answer |
| `createPoll` | `{ question, options, timer }` | Create new poll |

### Server → Client Events

| Event | Data | Description |
|-------|------|-------------|
| `pollCreated` | `pollData` | New poll created |
| `pollResults` | `votes` | Updated poll results |
| `chatMessage` | `{ user, text }` | New chat message |
| `participantsUpdate` | `participants[]` | Updated participant list |
| `kickedOut` | `{ message, kickedFromChat }` | User kicked notification |
| `answerStatus` | `{ totalStudents, answeredStudents, allAnswered }` | Answer progress |

---

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── app.js              # Main application file
│   ├── controllers/        # Route controllers
│   │   ├── login.js       # Authentication logic
│   │   └── poll.js        # Poll management
│   └── models/            # Database models
│       ├── pollModel.js   # Poll schema
│       └── teacher.js     # Teacher schema
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── .env                  # Environment variables
```

---

## 🎮 Usage Examples

### Creating a Poll
```javascript
// Teacher creates a poll
socket.emit('createPoll', {
  question: "What is your favorite programming language?",
  options: ["JavaScript", "Python", "Java", "C++"],
  timer: 60 // seconds
});
```

### Submitting an Answer
```javascript
// Student submits answer
socket.emit('submitAnswer', {
  pollId: "poll123",
  option: "JavaScript",
  username: "student1"
});
```

### Sending Chat Message
```javascript
// Send chat message
socket.emit('chatMessage', {
  user: "student1",
  text: "Great question!"
});
```

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Install new dependencies
npm install <package-name>

# Check for outdated packages
npm outdated
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/live-polling-system` |
| `NODE_ENV` | Environment mode | `development` |

---

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Ensure MongoDB is running
   mongod --version
   
   # Check if port 27017 is available
   netstat -an | grep 27017
   ```

2. **Port Already in Use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   ```

3. **Socket.IO Connection Issues**
   - Check CORS settings
   - Verify frontend URL configuration
   - Ensure both servers are running

### Debug Mode

Enable debug logging:
```bash
DEBUG=socket.io:* npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Include error logs and system information

---

## 🎯 Frontend Integration

This backend works seamlessly with the React frontend. Make sure to:

1. Start the backend server first (`npm start`)
2. Start the frontend server (`cd ../frontend && npm run dev`)
3. The frontend will automatically connect to `http://localhost:3000`

**Happy Polling! 🗳️✨**
