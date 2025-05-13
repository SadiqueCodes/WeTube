import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat({ socket, roomCode }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chat-message", (chatData) => {
      setMessages((prevMessages) => [...prevMessages, chatData]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [socket]);

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
