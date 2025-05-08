import io from 'socket.io-client';

export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';
export const SOCKET_MESSAGE_RECEIVED = 'SOCKET_MESSAGE_RECEIVED';

let socket = null;

export const connectSocket = (url) => {
    let ENDPOINT = url;
    socket = io(ENDPOINT, { transports: ['websocket'] });
    if(socket){
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
            return {
                type: SOCKET_CONNECT,
                payload:socket
            }
        });
    } else {
        console.error('Socket connection failed');
    }
}