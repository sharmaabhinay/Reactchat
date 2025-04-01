import { io } from "socket.io-client";
const SocketUrl = 'http://10.0.2.2:4300';
import BackendUrl from "./BackendUrl";
// const SocketUrl = 'https://me-chat-cazt.onrender.com/';
var newsocket;
const socketConnection = () => {
    let ENDPOINT = BackendUrl;
    newsocket = io(ENDPOINT,{transports:['websocket']});
    newsocket.on('connect',()=> {
        console.log('connected though')
    })
    return newsocket;
}
export default socketConnection;
