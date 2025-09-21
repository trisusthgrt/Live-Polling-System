import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const TeacherProtectedRoute = ({ children }) => {
  const { user, role } = useAppSelector((state) => state.auth);
  const username = user || sessionStorage.getItem("username");

  if (!username || (!username.startsWith("teacher") && role !== 'teacher')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TeacherProtectedRoute;
