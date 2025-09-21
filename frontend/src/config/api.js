// API Configuration
// This file centralizes all API endpoints and connection settings

// Get the backend port from environment or default to 3001
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 3001;

// Base API URL
export const API_BASE_URL = 
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : `http://localhost:${BACKEND_PORT}`;

// Socket.IO connection URL
export const SOCKET_URL = API_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  TEACHER_LOGIN: `${API_BASE_URL}/teacher-login`,
  STUDENT_LOGIN: `${API_BASE_URL}/student-login`,
  GET_POLLS: (teacherUsername) => `${API_BASE_URL}/polls/${teacherUsername}`,
};

// Export for backward compatibility
export default API_BASE_URL;
