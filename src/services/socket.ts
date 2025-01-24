import { io } from "socket.io-client";

const token = localStorage.getItem("auth-token");

const socket = io(`${import.meta.env.VITE_API_BASE_URL}`, {
  auth: {
    token,
  },
});

socket.on("connect_error", (err) => {
  console.log("Connection Error:", err.message);
});

export default socket;
