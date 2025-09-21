import React from "react";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/spark.svg";

const KickedOutPage = () => {
  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <button className="btn btn-sm intervue-btn mb-5">
          <img src={stars} className="px-1" alt="" />
          Intervue Poll
        </button>
        
        <div className="alert alert-warning mb-4">
          <h4>Chat Access Restricted</h4>
          <p className="mb-0">You have been kicked from the chat, but you can still participate in polls and view questions.</p>
          <p className="mb-0 mt-2"><small>Return to the polling page to continue participating in the session.</small></p>
        </div>
        
        <button 
          className="btn continue-btn me-2"
          onClick={() => window.history.back()}
        >
          Back to Polls
        </button>
        <button 
          className="btn btn-outline-secondary"
          onClick={handleReturnToLogin}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default KickedOutPage;
