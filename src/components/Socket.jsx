import { io } from "socket.io-client";
const SocketUrl = 'http://10.0.2.2:4300';
import BackendUrl from "./BackendUrl";
// const SocketUrl = 'https://me-chat-cazt.onrender.com/';

const ENDPOINT = BackendUrl;
let socket = null;

const socketConnection = () => {
  if (!socket || !socket.connected) { // Ensure socket is initialized only once
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    

    // Optional: handle disconnect/reconnect here if needed
  }

  return socket;
};

export default socketConnection;

