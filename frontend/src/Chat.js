import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { socketConfig } from "./config/backend";
import "./Chat.css";

const socket = io(socketConfig.url, socketConfig.options);

function Chat({ roomCode }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chat-message", (chatData) => {
      setMessages((prevMessages) => [...prevMessages, chatData]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat-message", { roomCode, message, sender: "You" });
      setMessages([...messages, { sender: "You", message }]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h3>Chat</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;