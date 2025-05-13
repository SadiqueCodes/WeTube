import React, { useState, useEffect } from "react";
import "./Butterfly.css";

const Butterfly = () => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const moveButterfly = () => {
      let newTop = Math.min(Math.max(parseFloat(position.top) + (Math.random() * 10 - 5), 15), 80);
      let newLeft = Math.min(Math.max(parseFloat(position.left) + (Math.random() * 15 - 7), 15), 85);

      if (newLeft > parseFloat(position.left)) setDirection(1);
      else setDirection(-1);

      setPosition({ top: `${newTop}%`, left: `${newLeft}%` });

      if (message) {
        setMessage((prev) => ({
          ...prev,
          x: Math.min(Math.max(newLeft * (window.innerWidth / 100) + 10, 20), window.innerWidth - 100),
          y: Math.min(Math.max(newTop * (window.innerHeight / 100) + 40, 30), window.innerHeight - 50),
        }));
      }
    };

    const interval = setInterval(moveButterfly, 3000);
    return () => clearInterval(interval);
  }, [position, message]);

  const handleClick = (event) => {
    let x = event.clientX;
    let y = event.clientY;

    x = Math.min(Math.max(x + 5, 20), window.innerWidth - 100);
    y = Math.min(Math.max(y + 30, 30), window.innerHeight - 50);

    setMessage({ x, y, text: "Hey Nandani 🤍", follow: true });

    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div>
      <div className="butterfly-click-area" onClick={handleClick}>
        <img
          src="/butterfly.gif"
          className="butterfly"
          style={{
            top: position.top,
            left: position.left,
            transform: `scaleX(${direction})`,
          }}
          alt="butterfly"
        />
      </div>

      {message && (
        <div
          className="butterfly-message"
          style={{
            left: `${message.x}px`,
            top: `${message.y}px`,
            transform: `translateX(${direction * 5}px)`, // Moves slightly with butterfly
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Butterfly;
