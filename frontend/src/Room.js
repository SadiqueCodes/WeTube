import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ReactPlayer from "react-player";
import { socketConfig } from "./config/backend";
import "./styles.css";

const socket = io(socketConfig.url, socketConfig.options);

function Room() {
  const { roomCode } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    socket.emit("join-room", roomCode);

    socket.on("sync-video", ({ action, time }) => {
      if (playerRef.current) {
        if (action === "play") {
          setPlaying(true);
          playerRef.current.seekTo(time, "seconds");
        } else if (action === "pause") {
          setPlaying(false);
        }
      }
    });

    socket.on("update-video-url", (url) => {
      setVideoUrl(url);
    });

    return () => socket.disconnect();
  }, [roomCode]);

  const handlePlay = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      socket.emit("video-action", { roomCode, action: "play", time: currentTime });
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      socket.emit("video-action", { roomCode, action: "pause", time: currentTime });
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    socket.emit("change-video-url", { roomCode, url });
  };

  return (
    <div className="room-container">
      <h2>Room Code: {roomCode}</h2>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={handleUrlChange}
      />
      <div className="video-container">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={playing}
          controls
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
    </div>
  );
}

export default Room;