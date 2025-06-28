const initialState = {
    currentChat: "",
    name: "",
    image: "",
    id: "",
    isOnline: false,
    isTyping: false,
    lastSeen: "",
    lastMessage: "",
    lastMessageTime: "",
    unreadMessages: 0,
    messages : [{}],
    
    

};

const currentChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_FRIEND':
            return {
                ...state,
                currentChat: action.payload, // Set the current friend
            };
        case 'CLEAR_CURRENT_FRIEND':
            return {
                ...state,
                currentChat: null, // Clear the current friend
            };
        default:
            return state; // Return the current state for unknown actions
    }
};

export default currentChatReducer;