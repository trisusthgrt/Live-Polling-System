# Redux Store Structure

This document describes the Redux store implementation for the Live Polling System.

## Store Configuration

The store is configured using Redux Toolkit and includes the following slices:

- `authSlice` - Authentication and user management
- `pollSlice` - Poll-related state management
- `chatSlice` - Chat functionality state
- `uiSlice` - General UI state management

## Slices Overview

### Auth Slice (`authSlice.js`)
Manages user authentication state:
- `user` - Current user information
- `role` - User role (teacher/student)
- `isAuthenticated` - Authentication status
- `loading` - Loading state for auth operations
- `error` - Authentication errors

**Actions:**
- `setUser(payload)` - Set user data
- `clearUser()` - Clear user data
- `setLoading(boolean)` - Set loading state
- `setError(message)` - Set error message
- `clearError()` - Clear error message

### Poll Slice (`pollSlice.js`)
Manages poll-related state:
- `currentPoll` - Current active poll
- `pollQuestion` - Current poll question
- `pollOptions` - Poll options
- `votes` - Vote counts
- `selectedOption` - User's selected option
- `submitted` - Submission status
- `answerStatus` - Answer tracking status
- `pollHistory` - Historical polls
- `canCreatePoll` - Poll creation permission

**Actions:**
- `setCurrentPoll(pollData)` - Set current poll
- `updateVotes(votes)` - Update vote counts
- `setSelectedOption(option)` - Set user selection
- `submitAnswer()` - Mark answer as submitted
- `setAnswerStatus(status)` - Set answer tracking status
- `setCanCreatePoll(boolean)` - Set poll creation permission

### Chat Slice (`chatSlice.js`)
Manages chat functionality:
- `messages` - Chat messages array
- `participants` - Active participants
- `newMessage` - Current message being typed
- `isChatOpen` - Chat popover state
- `activeTab` - Active chat tab

**Actions:**
- `addMessage(message)` - Add new message
- `setNewMessage(text)` - Set message being typed
- `setParticipants(list)` - Update participants list
- `toggleChat()` - Toggle chat popover
- `setActiveTab(tab)` - Set active tab

### UI Slice (`uiSlice.js`)
Manages general UI state:
- `notifications` - Notification array
- `modals` - Modal state
- `loading` - Loading states for different operations
- `theme` - Theme preference
- `sidebarOpen` - Sidebar state

**Actions:**
- `addNotification(notification)` - Add notification
- `openModal(modalData)` - Open modal
- `setLoading({key, loading})` - Set loading state
- `setTheme(theme)` - Set theme

## Usage

### Hooks
Use the provided hooks for type-safe Redux interactions:

```javascript
import { useAppDispatch, useAppSelector } from '../store/hooks';

// In component
const dispatch = useAppDispatch();
const { user, loading } = useAppSelector((state) => state.auth);
```

### Dispatching Actions
```javascript
// Set user
dispatch(setUser({ username: 'john', role: 'student' }));

// Update poll votes
dispatch(updateVotes({ 'Option A': 5, 'Option B': 3 }));

// Add chat message
dispatch(addMessage({ user: 'john', text: 'Hello!' }));
```

### Selecting State
```javascript
// Get auth state
const { user, isAuthenticated } = useAppSelector((state) => state.auth);

// Get poll state
const { currentPoll, votes } = useAppSelector((state) => state.poll);

// Get chat state
const { messages, participants } = useAppSelector((state) => state.chat);
```

## Integration with Socket.IO

The Redux store integrates seamlessly with Socket.IO events:

- Socket events trigger Redux actions
- Redux state updates trigger UI re-renders
- State persistence across component unmounts
- Centralized state management for real-time updates

## Benefits

1. **Centralized State** - All application state in one place
2. **Predictable Updates** - State changes through actions only
3. **Time Travel Debugging** - Redux DevTools support
4. **Performance** - Selective re-renders with useSelector
5. **Maintainability** - Clear separation of concerns
6. **Scalability** - Easy to add new features and state

## Development Tools

- Redux DevTools Extension for debugging
- Logger middleware for action tracking (development)
- TypeScript-like experience with proper action types

