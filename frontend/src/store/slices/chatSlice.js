import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  participants: [],
  newMessage: '',
  isChatOpen: false,
  activeTab: 'chat', // 'chat' or 'participants'
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    clearNewMessage: (state) => {
      state.newMessage = '';
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetChat: (state) => {
      state.messages = [];
      state.participants = [];
      state.newMessage = '';
      state.isChatOpen = false;
      state.activeTab = 'chat';
      state.error = null;
    },
  },
});

export const {
  addMessage,
  setNewMessage,
  clearNewMessage,
  setParticipants,
  toggleChat,
  setActiveTab,
  setLoading,
  setError,
  clearError,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;

