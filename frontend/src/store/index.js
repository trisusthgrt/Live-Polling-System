import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import pollSlice from './slices/pollSlice';
import chatSlice from './slices/chatSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    poll: pollSlice,
    chat: chatSlice,
    ui: uiSlice,
  },
});
