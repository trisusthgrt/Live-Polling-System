import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import "./StudentPollPage.css";
import stopwatch from "../../assets/stopwatch.svg";
import ChatPopover from "../../components/chat/ChatPopover";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/spark.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { 
  setCurrentPoll, 
  setSelectedOption, 
  submitAnswer, 
  updateVotes,
  setError,
  clearError 
} from "../../store/slices/pollSlice";
let apiUrl =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:3001";
const socket = io(apiUrl);

const StudentPollPage = () => {
  const [kickedFromChat, setKickedFromChat] = useState(false);
  const [pollId, setPollId] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { 
    votes, 
    selectedOption, 
    submitted, 
    pollQuestion, 
    pollOptions, 
    totalVotes, 
    error 
  } = useAppSelector((state) => state.poll);

  const handleOptionSelect = (option) => {
    dispatch(setSelectedOption(option));
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const username = sessionStorage.getItem("username");
      if (username) {
        socket.emit("submitAnswer", {
          username: username,
          option: selectedOption,
          pollId: pollId,
        });
        dispatch(submitAnswer());
      } else {
        dispatch(setError("No username found in session storage!"));
      }
    }
  };

  useEffect(() => {
    const handleKickedOut = (data) => {
      setKickedFromChat(true);
      // Show notification but don't redirect - student can still participate in polls
      dispatch(setError(data.message));
      // Clear the error after 5 seconds
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    };

    socket.on("kickedOut", handleKickedOut);

    return () => {
      socket.off("kickedOut", handleKickedOut);
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    socket.on("pollCreated", (pollData) => {
      dispatch(setCurrentPoll(pollData));
      setPollId(pollData._id);
      setTimeLeft(pollData.timer);
    });

    socket.on("pollResults", (updatedVotes) => {
      dispatch(updateVotes(updatedVotes));
    });

    socket.on("answerError", (error) => {
      dispatch(setError(error.message));
    });

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      socket.off("answerError");
    };
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            dispatch(submitAnswer());
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, submitted, dispatch]);

  const calculatePercentage = (count) => {
    if (totalVotes === 0) return 0;
    return (count / totalVotes) * 100;
  };

  return (
    <>
      {!kickedFromChat && <ChatPopover />}
      {kickedFromChat && (
        <div className="alert alert-warning" style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          maxWidth: "300px"
        }}>
          <strong>Chat Access Restricted:</strong> You can still participate in polls but cannot access chat.
        </div>
      )}
      <>
        {pollQuestion === "" && timeLeft === 0 && (
            <div className="d-flex justify-content-center align-items-center vh-100 w-75  mx-auto">
              <div className="student-landing-container text-center">
                <button className="btn btn-sm intervue-btn mb-5">
                  <img src={stars} className="px-1" alt="" />
                  Intervue Poll
                </button>
                <br />
                <div
                  className="spinner-border text-center spinner"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h3 className="landing-title">
                  <b>Wait for the teacher to ask questions..</b>
                </h3>
              </div>
            </div>
          )}
          {pollQuestion !== "" && (
            <div className="container mt-5 w-50">
              <div className="d-flex align-items-center mb-4">
                <h5 className="m-0 pe-5">Question</h5>
                <img
                  src={stopwatch}
                  width="15px"
                  height="auto"
                  alt="Stopwatch"
                />
                <span className="ps-2 ml-2 text-danger">{timeLeft}s</span>
              </div>
              
              {error && (
                <div className="alert alert-danger mb-3">{error}</div>
              )}
              <div className="card">
                <div className="card-body">
                  <h6 className="question py-2 ps-2 float-left rounded text-white">
                    {pollQuestion}?
                  </h6>
                  <div className="list-group mt-4">
                    {pollOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`list-group-item rounded m-1 ${
                          selectedOption === option.text
                            ? "border option-border"
                            : ""
                        }`}
                        style={{
                          padding: "10px",
                          cursor:
                            submitted || timeLeft === 0
                              ? "not-allowed"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (!submitted && timeLeft > 0) {
                            handleOptionSelect(option.text);
                          }
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className={`ml-2 text-left ${
                              submitted ? "font-weight-bold" : ""
                            }`}
                          >
                            {option.text}
                          </span>
                          {submitted && (
                            <span className="text-right">
                              {Math.round(
                                calculatePercentage(votes[option.text] || 0)
                              )}
                              %
                            </span>
                          )}
                        </div>
                        {submitted && (
                          <div className="progress mt-2">
                            <div
                              className="progress-bar progress-bar-bg"
                              role="progressbar"
                              style={{
                                width: `${calculatePercentage(
                                  votes[option.text] || 0
                                )}%`,
                              }}
                              aria-valuenow={votes[option.text] || 0}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!submitted && selectedOption && timeLeft > 0 && (
                <div className="d-flex  justify-content-end align-items-center">
                  <button
                    type="submit"
                    className="btn continue-btn my-3 w-25"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}

              {submitted && (
                <div className="mt-5">
                  <h6 className="text-center">
                    Wait for the teacher to ask a new question...
                  </h6>
                </div>
              )}
            </div>
          )}
      </>
    </>
  );
};

export default StudentPollPage;
