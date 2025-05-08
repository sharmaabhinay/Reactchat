const initialState = {
  id: '',
  isOnline: false,
  isLoggedIn:false,
  name: '',
  phone: '',
  email: '',
  about:'',
  location: [],
  locationName: '',
  device: '',
  contacts: [],
  updatecontact: 0,
  fetchContacts:[{}],

  profile_pic: '',
  lastSeen: null,
  statusMessage: '',
};

const userReducer = (state = initialState, action) => {
  console.log(action.data);
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        id: action.data.user._id,
        isOnline: true,
        name: action.data.user.name,
        phone: action.data.user.phone,
        about: action.data.user.about,
        email: action.data.user.email, // Fix: Correctly map email
        location: action.data.user.location || [], // Ensure location is set
        locationName: action.data.user.locationName || '',
        device: action.data.user.device || '',
        contacts: action.data.user.contacts || [],
        profile_pic: action.data.user.profile_pic,
        lastSeen: action.data.user.lastSeen || null,
        statusMessage: action.data.user.statusMessage || '',
      };
    
    
    case 'USER_LOGIN':
        return {

            ...state,
            isLoggedIn: action.data,
        
        };
    case 'UPDATE_CONTACT':
        return {
            ...state,
            updatecontact: action.data.updatecontact,
        };
    case "REFRESH_CONTACTS":
        return {
            ...state,
            fetchContacts:action.data
        }
    // case 'USER_LOGOUT':
    //     return {
    //         ...initialState,
    //     };
    case 'UPDATE_USER_STATUS':
      return {
        ...state,
        isOnline: action.dsata.isOnline,
        lastSeen: action.dsata.lastSeen,
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        name: action.data.name,
        phone: action.data.phone,
        email: action.data.email,
        profile_pic: action.data.profilePicture,
        statusMessage: action.data.statusMessage,
      };
    case 'UPDATE_CONTACTS':
      return {
        ...state,
        contacts: action.data.contacts,
      };
    default:
      return state;
  }
};

export default userReducer;
