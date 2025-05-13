const BACKEND_URL = "https://backend-wetube-production.up.railway.app";

export const socketConfig = {
  url: BACKEND_URL,
  options: {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000
  }
};

export default BACKEND_URL;