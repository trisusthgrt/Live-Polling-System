import React, { useState, useEffect, useRef } from "react";
import { Button, Popover, OverlayTrigger, Tab, Nav } from "react-bootstrap";
import Chat from "./Chat";
import { io } from "socket.io-client";
import "./Chat.css";
import chatIcon from "../../assets/chat.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { 
  addMessage, 
  setNewMessage, 
  clearNewMessage, 
  setParticipants, 
  toggleChat, 
  setActiveTab,
  setError,
  clearError
} from "../../store/slices/chatSlice";

let apiUrl =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:3001";
const socket = io(apiUrl);

const ChatPopover = () => {
  const dispatch = useAppDispatch();
  const { messages, newMessage, participants, isChatOpen, activeTab } = useAppSelector((state) => state.chat);
  const [kickedFromChat, setKickedFromChat] = useState(false);
  const chatWindowRef = useRef(null);
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    const username = sessionStorage.getItem("username");
    socket.emit("joinChat", { username });

    socket.on("chatMessage", (message) => {
      dispatch(addMessage(message));
    });
    socket.on("participantsUpdate", (participantsList) => {
      dispatch(setParticipants(participantsList));
    });

    socket.on("kickedFromChat", (data) => {
      setKickedFromChat(true);
      // Don't show error in chat component, just hide the chat
    });

    socket.on("chatError", (error) => {
      dispatch(setError(error.message));
      // Clear error after 3 seconds
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    });

    return () => {
      socket.off("participantsUpdate");
      socket.off("chatMessage");
      socket.off("kickedFromChat");
      socket.off("chatError");
    };
  }, [dispatch]);
  const username = sessionStorage.getItem("username");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Don't send message if user is kicked from chat
      if (kickedFromChat) {
        dispatch(setError("You have been kicked from the chat and cannot send messages."));
        return;
      }
      
      const message = { user: username, text: newMessage };
      socket.emit("chatMessage", message);
      dispatch(clearNewMessage());
    }
  };
  const handleKickOut = (participant, index) => {
    socket.emit("kickOut", participant);
  };

  const participantsTab = (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {participants.length === 0 ? (
        <div>No participants connected</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {username.startsWith("teacher") ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td>{participant}</td>
                {username.startsWith("teacher") ? (
                  <td>
                    <button
                      style={{ fontSize: "10px" }}
                      onClick={() => handleKickOut(participant)}
                      className="btn btn-link"
                    >
                      Kick Out
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const popover = (
    <Popover
      id="chat-popover"
      style={{ width: "400px", height: "400px", fontSize: "12px" }}
    >
      <Popover.Body style={{ height: "100%" }}>
        <Tab.Container defaultActiveKey={activeTab}>
          <Nav variant="underline">
            <Nav.Item>
              <Nav.Link 
                className="tab-item message-form" 
                eventKey="chat"
                onClick={() => dispatch(setActiveTab('chat'))}
              >
                Chat
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                className="tab-item" 
                eventKey="participants"
                onClick={() => dispatch(setActiveTab('participants'))}
              >
                Participants
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="chat">
        <Chat
          messages={messages}
          newMessage={newMessage}
          onMessageChange={(value) => dispatch(setNewMessage(value))}
          onSendMessage={handleSendMessage}
          kickedFromChat={kickedFromChat}
        />
            </Tab.Pane>
            <Tab.Pane eventKey="participants">{participantsTab}</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Popover.Body>
    </Popover>
  );

  // Don't show chat icon if kicked from chat
  if (kickedFromChat) {
    return null;
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      overlay={popover}
      rootClose
    >
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px",
          background: "rgba(90, 102, 209, 1)",
          borderRadius: "100%",
          cursor: "pointer",
        }}
      >
        <img
          style={{ width: "30px", height: "30px" }}
          src={chatIcon}
          alt="chat icon"
        />
      </div>
    </OverlayTrigger>
  );
};

export default ChatPopover;
