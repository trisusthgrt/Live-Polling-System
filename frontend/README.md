
# 🎨 Live Polling System - Frontend

## 📖 Overview

This is the frontend application for a **real-time live polling system** built with React and modern web technologies. It provides an intuitive user interface for teachers to manage interactive polls and for students to participate in real-time voting sessions with advanced features like chat, moderation, and comprehensive state management.

### ✨ Key Features

- 🎯 **Real-time Polling Interface** - Seamless poll creation and participation
- 💬 **Interactive Chat System** - Student-teacher communication with moderation
- 👥 **Participant Management** - Real-time participant tracking and management
- ⏱️ **Timer Integration** - Visual countdown timers for poll sessions
- 📊 **Live Results Display** - Real-time vote counting and visualization
- 🚫 **Smart Moderation** - Kick disruptive students while preserving poll access
- 📈 **Poll History** - Complete history of past poll sessions
- 🔐 **Secure Authentication** - Role-based access control
- 🎨 **Responsive Design** - Works perfectly on all devices
- 🧠 **State Management** - Redux-powered centralized state management

---

## 🛠️ Tech Stack

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
- **Backend Server** (must be running on port 3000)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Live-Polling-System/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the frontend directory
   touch .env
   ```
   
   Add the following to your `.env` file:
   ```env
   VITE_NODE_ENV=development
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```

### 🎯 Application Information

- **Frontend URL**: `http://localhost:5173`
- **Backend Connection**: `http://localhost:3000`
- **Hot Module Replacement**: Enabled for fast development

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
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── chat/            # Chat-related components
│   │   │   ├── Chat.jsx     # Main chat component
│   │   │   ├── Chat.css     # Chat styling
│   │   │   └── ChatPopover.jsx # Chat popover wrapper
│   │   ├── route-protect/   # Route protection components
│   │   │   ├── TeacherProtect.jsx # Teacher route guard
│   │   │   └── StudentProtect.jsx # Student route guard
│   │   └── ErrorBoundary.jsx # Error handling component
│   ├── Pages/               # Main application pages
│   │   ├── loginPage/       # Authentication page
│   │   ├── teacher-landing/ # Teacher dashboard
│   │   ├── teacher-poll/    # Teacher poll management
│   │   ├── student-landing/ # Student dashboard
│   │   ├── student-poll/    # Student poll participation
│   │   ├── poll-history/    # Poll history view
│   │   └── kicked-out/      # Kicked user page
│   ├── store/               # Redux store configuration
│   │   ├── index.js         # Store setup
│   │   ├── hooks.js         # Typed Redux hooks
│   │   └── slices/          # Redux slices
│   │       ├── authSlice.js # Authentication state
│   │       ├── pollSlice.js # Poll state management
│   │       ├── chatSlice.js # Chat state management
│   │       └── uiSlice.js   # UI state management
│   ├── assets/              # Static assets
│   │   ├── images/          # Image files
│   │   └── icons/           # Icon files
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Public static files
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

---

## 🔌 State Management (Redux)

### Store Structure

```javascript
{
  auth: {
    user: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  poll: {
    currentPoll: null,
    pollQuestion: '',
    pollOptions: [],
    votes: {},
    selectedOption: null,
    submitted: false,
    pollHistory: [],
    loading: false,
    error: null
  },
  chat: {
    messages: [],
    participants: [],
    newMessage: '',
    isChatOpen: false,
    activeTab: 'chat',
    loading: false,
    error: null
  },
  ui: {
    notifications: [],
    loading: {},
    theme: 'light',
    sidebarOpen: false
  }
}
```

### Key Redux Actions

| Action | Purpose | Slice |
|--------|---------|-------|
| `setUser` | Set authenticated user | `authSlice` |
| `setCurrentPoll` | Set active poll data | `pollSlice` |
| `updateVotes` | Update poll vote counts | `pollSlice` |
| `addMessage` | Add chat message | `chatSlice` |
| `setParticipants` | Update participant list | `chatSlice` |
| `addNotification` | Show notification | `uiSlice` |

---

## 🛣️ Routing Structure

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/` | `LoginPage` | None | Authentication page |
| `/teacher-home-page` | `TeacherLandingPage` | Teacher | Teacher dashboard |
| `/teacher-poll` | `TeacherPollPage` | Teacher | Poll management |
| `/teacher-poll-history` | `PollHistoryPage` | Teacher | Poll history |
| `/student-home-page` | `StudentLandingPage` | None | Student dashboard |
| `/poll-question` | `StudentPollPage` | Student | Poll participation |
| `/kicked-out` | `KickedOutPage` | None | Kicked user page |

---

## 🎮 Usage Examples

### Teacher Creating a Poll
```javascript
// Teacher creates a poll
const createPoll = async (pollData) => {
  dispatch(setLoading(true));
  try {
    socket.emit('createPoll', {
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
      timer: 60
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
};
```

### Student Submitting an Answer
```javascript
// Student submits poll answer
const submitAnswer = () => {
  if (selectedOption && !submitted) {
    socket.emit('submitAnswer', {
      pollId: currentPoll._id,
      option: selectedOption,
      username: user
    });
    dispatch(submitAnswer());
  }
};
```

### Chat Message Handling
```javascript
// Send chat message
const sendMessage = () => {
  if (newMessage.trim() && !kickedFromChat) {
    socket.emit('chatMessage', {
      user: username,
      text: newMessage
    });
    dispatch(clearNewMessage());
  }
};
```

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install new dependencies
npm install <package-name>
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_NODE_ENV` | Environment mode | `development` |
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3000` |

### Development Features

- ⚡ **Hot Module Replacement** - Instant updates during development
- 🔍 **Source Maps** - Easy debugging with original source code
- 📦 **Tree Shaking** - Automatic dead code elimination
- 🚀 **Fast Builds** - Optimized build process with Vite

---

## 🎨 Styling & UI

### Design System

- **Framework**: Bootstrap 5.x for responsive design
- **Components**: React Bootstrap for consistent UI components
- **Icons**: Custom SVG icons for better performance
- **Themes**: Light theme with dark mode support
- **Responsive**: Mobile-first design approach

### Key Styling Features

- 📱 **Mobile Responsive** - Works on all screen sizes
- 🎨 **Modern UI** - Clean and intuitive interface
- ⚡ **Fast Loading** - Optimized CSS and assets
- 🎯 **Accessibility** - WCAG compliant components
- 🌙 **Theme Support** - Light/dark mode toggle

---

## 🔌 Socket.IO Integration

### Connection Setup
```javascript
import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const socket = io(apiUrl);
```

### Event Handling
```javascript
// Listen for poll updates
socket.on('pollCreated', (pollData) => {
  dispatch(setCurrentPoll(pollData));
});

// Listen for vote updates
socket.on('pollResults', (votes) => {
  dispatch(updateVotes(votes));
});

// Listen for chat messages
socket.on('chatMessage', (message) => {
  dispatch(addMessage(message));
});
```

---

## 🐛 Troubleshooting

### Common Issues

1. **Socket Connection Failed**
   ```bash
   # Ensure backend is running
   curl http://localhost:3000
   
   # Check CORS settings in backend
   ```

2. **Redux State Issues**
   ```javascript
   // Check Redux DevTools
   // Ensure proper action dispatching
   console.log(store.getState());
   ```

3. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Route Protection Issues**
   - Verify authentication state
   - Check route guard components
   - Ensure proper role assignments

### Debug Tools

- **React DevTools** - Component inspection
- **Redux DevTools** - State management debugging
- **Socket.IO Debug** - Real-time communication debugging

---

## 🧪 Testing

### Manual Testing Checklist

- ✅ **Authentication Flow** - Login/logout works correctly
- ✅ **Poll Creation** - Teachers can create polls
- ✅ **Poll Participation** - Students can vote
- ✅ **Real-time Updates** - Votes update instantly
- ✅ **Chat Functionality** - Messages send/receive
- ✅ **Moderation** - Kick functionality works
- ✅ **Responsive Design** - Works on mobile/desktop
- ✅ **Error Handling** - Graceful error management

---

## 🚀 Deployment

### Production Build
```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Deploy to hosting service
npm run deploy
```

### Environment Configuration
```env
# Production environment
VITE_NODE_ENV=production
VITE_API_BASE_URL=https://your-api-domain.com
```

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

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Include browser console logs and system information

---

## 🎯 Backend Integration

This frontend works seamlessly with the Node.js backend. Make sure to:

1. Start the backend server first (`cd ../backend && npm start`)
2. Start the frontend server (`npm run dev`)
3. The frontend will automatically connect to the backend

**Happy Coding! 🎨✨**
