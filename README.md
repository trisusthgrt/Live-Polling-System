# 🗳️ Live Polling System

A real-time interactive polling platform designed for educational environments, enabling teachers to create live polls and students to participate with real-time updates, chat functionality, and comprehensive classroom management features.

## 📖 Overview

The Live Polling System is a full-stack web application that facilitates interactive learning through real-time polling sessions. Teachers can create engaging polls with multiple choice questions, set timers, and monitor student participation in real-time. Students can participate in polls, chat with peers and teachers, and receive instant feedback on their responses.

### ✨ Key Features

- 🎯 **Real-time Polling** - Live poll creation and participation with instant updates
- 💬 **Interactive Chat** - Student-teacher communication during sessions
- 👥 **Participant Management** - Real-time participant tracking and management
- ⏱️ **Timer-based Polls** - Configurable poll duration with countdown timers
- 📊 **Live Results** - Real-time vote counting and result visualization
- 🚫 **Smart Moderation** - Kick disruptive students from chat while preserving poll access
- 📈 **Poll History** - Complete history of past poll sessions
- 🔐 **Secure Authentication** - Role-based access control
- 🎨 **Responsive Design** - Works perfectly on all devices
- 🧠 **State Management** - Redux-powered centralized state management

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 22.5.1+ |
| **Express.js** | Web Framework | Latest |
| **MongoDB** | Database | Latest |
| **Socket.IO** | Real-time Communication | Latest |
| **Mongoose** | MongoDB ODM | Latest |
| **CORS** | Cross-Origin Resource Sharing | Latest |
| **dotenv** | Environment Variables | Latest |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | 18.0+ |
| **Vite** | Build Tool & Dev Server | Latest |
| **Redux Toolkit** | State Management | Latest |
| **React Redux** | React-Redux Integration | Latest |
| **Socket.IO Client** | Real-time Communication | Latest |
| **React Router** | Client-side Routing | Latest |
| **Bootstrap** | CSS Framework | 5.x |
| **React Bootstrap** | Bootstrap Components | Latest |
| **Axios** | HTTP Client | Latest |

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
   git clone https://github.com/trisusthgrt/Live-Polling-System.git
   cd Live-Polling-System
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   # Backend environment variables
   MONGODB_URL=mongodb://localhost:27017/intevuePoll
   PORT=3000
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

5. **Start both servers**
   ```bash
   npm start
   ```

### 🎯 Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 🎭 User Roles & Features

### 👨‍🏫 Teacher Features

| Feature | Description | Route |
|---------|-------------|-------|
| **Poll Creation** | Create polls with custom questions, options, and timers | `/teacher-home-page` |
| **Live Monitoring** | Real-time view of poll results and student participation | `/teacher-poll` |
| **Chat Moderation** | Kick disruptive students from chat while preserving poll access | `/teacher-poll` |
| **Poll History** | View and analyze past poll sessions | `/teacher-poll-history` |
| **Answer Tracking** | Monitor which students have answered and progress status | `/teacher-poll` |

### 👨‍🎓 Student Features

| Feature | Description | Route |
|---------|-------------|-------|
| **Poll Participation** | Join and vote on active polls in real-time | `/poll-question` |
| **Chat Interaction** | Communicate with teacher and other students | `/poll-question` |
| **Result Viewing** | See live poll results and vote counts | `/poll-question` |
| **Session Management** | Automatic reconnection and session persistence | All routes |
| **Moderation Awareness** | Clear feedback when chat access is restricted | `/poll-question` |

---

## 🏗️ Project Structure

```
Live-Polling-System/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── app.js          # Main application file
│   │   ├── controllers/    # Route controllers
│   │   │   ├── login.js   # Authentication logic
│   │   │   └── poll.js    # Poll management
│   │   ├── middleware/     # Custom middleware
│   │   │   └── auth.js    # Session validation
│   │   └── models/         # Database models
│   │       ├── pollModel.js # Poll schema
│   │       └── teacher.js  # Teacher schema
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables
│   └── README.md          # Backend documentation
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── chat/      # Chat-related components
│   │   │   ├── route-protect/ # Route protection
│   │   │   └── ErrorBoundary.jsx # Error handling
│   │   ├── Pages/         # Main application pages
│   │   │   ├── loginPage/ # Authentication
│   │   │   ├── teacher-*  # Teacher interfaces
│   │   │   ├── student-*  # Student interfaces
│   │   │   ├── poll-history/ # Poll history
│   │   │   └── kicked-out/ # Moderation feedback
│   │   ├── store/         # Redux store configuration
│   │   │   ├── index.js   # Store setup
│   │   │   ├── hooks.js   # Typed Redux hooks
│   │   │   └── slices/    # Redux slices
│   │   │       ├── authSlice.js    # Authentication state
│   │   │       ├── pollSlice.js    # Poll state management
│   │   │       ├── chatSlice.js    # Chat state management
│   │   │       └── uiSlice.js      # UI state management
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
├── package.json           # Root package configuration
└── README.md              # This file
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/teacher-login` | Teacher authentication |
| `POST` | `/student-login` | Student authentication |

### Poll Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/create-poll` | Create a new poll |
| `GET` | `/polls/:teacherUsername` | Get poll history |
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

## 🎮 Usage Examples

### Teacher Creating a Poll
```javascript
// Teacher creates a poll
socket.emit('createPoll', {
  question: "What is your favorite programming language?",
  options: ["JavaScript", "Python", "Java", "C++"],
  timer: 60 // seconds
});
```

### Student Submitting an Answer
```javascript
// Student submits poll answer
socket.emit('submitAnswer', {
  pollId: "poll123",
  option: "JavaScript",
  username: "student1"
});
```

### Chat Message Handling
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
# Start both backend and frontend servers
npm start

# Start only backend server
npm run start:backend

# Start only frontend server
npm run start:frontend

# Development mode (same as npm start)
npm run dev

# Build frontend for production
npm run build

# Install new dependencies
npm install <package-name>
```

### Environment Variables

#### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/intevuePoll` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

#### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_NODE_ENV` | Environment mode | `development` |
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3000` |

---

## 🎨 Features in Detail

### Real-time Polling System
- **Instant Updates**: Vote counts update in real-time for all participants
- **Timer Integration**: Visual countdown timers with automatic poll closure
- **Answer Tracking**: Teachers can monitor which students have responded
- **Result Visualization**: Live charts and percentages for poll results

### Interactive Chat System
- **Real-time Messaging**: Instant message delivery between all participants
- **Participant List**: See who's currently active in the session
- **Smart Moderation**: Kick disruptive students while preserving poll access
- **Chat History**: View message history during the session

### Advanced Moderation
- **Selective Kicking**: Remove students from chat without affecting poll participation
- **Clear Feedback**: Students receive immediate notification of chat restrictions
- **Preserved Learning**: Kicked students can still participate in polls
- **Flexible Control**: Teachers can moderate chat behavior while maintaining educational access

### State Management
- **Centralized State**: Redux-powered state management for consistent data flow
- **Real-time Sync**: Socket.IO events automatically update Redux state
- **Persistent Sessions**: User authentication and session management
- **Error Handling**: Comprehensive error boundaries and user feedback

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
   
   # Kill process using port 5173
   npx kill-port 5173
   ```

3. **Socket.IO Connection Issues**
   - Check CORS settings in backend
   - Verify frontend URL configuration
   - Ensure both servers are running

4. **Redux State Issues**
   ```javascript
   // Check Redux DevTools
   console.log(store.getState());
   ```

5. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Tools

- **React DevTools** - Component inspection
- **Redux DevTools** - State management debugging
- **Socket.IO Debug** - Real-time communication debugging
- **MongoDB Compass** - Database inspection

---

## 🧪 Testing

### Manual Testing Checklist

- ✅ **Authentication Flow** - Login/logout works correctly
- ✅ **Poll Creation** - Teachers can create polls with custom options
- ✅ **Poll Participation** - Students can vote on active polls
- ✅ **Real-time Updates** - Votes update instantly across all clients
- ✅ **Chat Functionality** - Messages send/receive in real-time
- ✅ **Moderation Features** - Kick functionality works as expected
- ✅ **Responsive Design** - Works on mobile/desktop devices
- ✅ **Error Handling** - Graceful error management and user feedback
- ✅ **Session Persistence** - User sessions maintained across page refreshes
- ✅ **Database Operations** - Poll data saved and retrieved correctly

---

## 🚀 Deployment

### Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

### Environment Configuration
```env
# Production environment variables
NODE_ENV=production
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/live-polling-system
VITE_API_BASE_URL=https://your-api-domain.com
```

### Deployment Platforms
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas (cloud) or self-hosted MongoDB

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow Redux best practices
- Maintain consistent naming conventions
- Add proper error handling
- Include responsive design considerations
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/trisusthgrt/Live-Polling-System/issues) page
2. Create a new issue with detailed description
3. Include error logs and system information
4. Provide steps to reproduce the issue

---

## 🎯 Roadmap

### Planned Features
- [ ] **User Registration System** - Proper user accounts and profiles
- [ ] **Poll Templates** - Pre-made poll templates for common questions
- [ ] **Analytics Dashboard** - Detailed analytics and reporting
- [ ] **Multi-language Support** - Internationalization support
- [ ] **Mobile App** - React Native mobile application
- [ ] **Integration APIs** - Third-party service integrations
- [ ] **Advanced Moderation** - More sophisticated moderation tools
- [ ] **Offline Support** - Progressive Web App capabilities

### Performance Improvements
- [ ] **Database Optimization** - Query optimization and indexing
- [ ] **Caching Layer** - Redis caching for better performance
- [ ] **Load Balancing** - Multiple server instances
- [ ] **CDN Integration** - Content delivery network setup

---

## 🏆 Acknowledgments

- **Socket.IO** - For real-time communication capabilities
- **React & Redux** - For powerful frontend state management
- **MongoDB** - For flexible database solutions
- **Bootstrap** - For responsive UI components
- **Vite** - For fast development experience

---

## 📊 Statistics

- **Total Files**: 50+ source files
- **Lines of Code**: 10,000+ lines
- **Technologies Used**: 15+ modern technologies
- **Features Implemented**: 20+ core features
- **Real-time Events**: 15+ Socket.IO events
- **API Endpoints**: 10+ REST endpoints

---

**Happy Polling! 🗳️✨**

*Built with ❤️ for interactive education*
