import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Butterfly from "./Butterfly"; // Import Butterfly component
import "./styles.css";

function App() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (roomCode.trim() !== "") {
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div className="app-container">
      <Butterfly /> {/* 🦋 Add the flying butterfly */}
      <h1>YouTube Watch Party</h1>
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}

export default App;
