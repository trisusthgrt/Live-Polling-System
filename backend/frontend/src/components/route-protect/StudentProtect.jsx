import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const StudentProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const username = user || sessionStorage.getItem("username");

  if (!username && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StudentProtectedRoute;
