import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  modals: {
    isOpen: false,
    type: null,
    data: null,
  },
  loading: {
    global: false,
    auth: false,
    poll: false,
    chat: false,
  },
  theme: 'light',
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message,
        duration: action.payload.duration || 5000,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action) => {
      state.modals = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modals = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    setLoading: (state, action) => {
      const { key, loading } = action.payload;
      state.loading[key] = loading;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  setLoading,
  setGlobalLoading,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;

