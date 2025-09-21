import React, { useState } from "react";
import stars from "../../assets/spark.svg";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser, setLoading, setError, clearError } from "../../store/slices/authSlice";
let apiUrl =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:3000";
const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const selectRole = (role) => {
    setSelectedRole(role);
  };

  const continueToPoll = async () => {
    if (!selectedRole) {
      dispatch(setError("Please select a role."));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      if (selectedRole === "teacher") {
        const teacherlogin = await axios.post(`${apiUrl}/teacher-login`);
        const username = teacherlogin.data.username;
        
        // Store in sessionStorage for compatibility
        sessionStorage.setItem("username", username);
        
        // Store in Redux
        dispatch(setUser({ username, role: 'teacher' }));
        
        navigate("/teacher-home-page");
      } else if (selectedRole === "student") {
        // For students, we'll set the user when they enter their name
        navigate("/student-home-page");
      }
    } catch (error) {
      dispatch(setError(error.message || "Login failed. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="poll-container text-center">
        <button className="btn btn-sm intervue-btn mb-5">
          <img src={stars} className="px-1" alt="" />
          Intervue Poll
        </button>
        <h3 className="poll-title">
          Welcome to the <b>Live Polling System</b>
        </h3>
        <p className="poll-description">
          Please select the role that best describes you to begin using the live
          polling system
        </p>

        <div className="d-flex justify-content-around mb-4">
          <div
            className={`role-btn ${selectedRole === "student" ? "active" : ""}`}
            onClick={() => selectRole("student")}
          >
            <p>I'm a Student</p>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
          </div>
          <div
            className={`role-btn ${selectedRole === "teacher" ? "active" : ""}`}
            onClick={() => selectRole("teacher")}
          >
            <p>I'm a Teacher</p>
            <span>Submit answers and view live poll results in real-time.</span>
          </div>
        </div>

        {error && <div className="alert alert-danger mb-3">{error}</div>}
        
        <button 
          className="btn continue-btn" 
          onClick={continueToPoll}
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
