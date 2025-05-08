import {

SOCKET_CONNECT,
SOCKET_DISCONNECT,
SOCKET_MESSAGE_RECEIVED,
} from './action';

const initialState = {
isConnected: false,
messages: [],
socket:null
};

const socketReducer = (state = initialState, action) => {
    console.log(action)
switch (action.type) {
    case SOCKET_CONNECT:
        return {
            ...state,
            isConnected: true,
        };

    case SOCKET_DISCONNECT:
        return {
            ...state,
            isConnected: false,
        };

    case SOCKET_MESSAGE_RECEIVED:
        return {
            ...state,
            messages: [...state.messages, action.payload],
        };

    default:
        return state;
}
};

export default socketReducer;