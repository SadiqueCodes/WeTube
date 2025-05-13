import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoom = Math.random().toString(36).substring(2, 7).toUpperCase();
    navigate(`/room/${newRoom}`);
  };

  return (
    <div className="home-container">
      <h1>YouTube Watch Party</h1>
      <button onClick={createRoom}>Create New Room</button>
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={() => navigate(`/room/${roomCode}`)}>Join</button>
    </div>
  );
}

export default Home;
