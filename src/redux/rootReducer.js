import { combineReducers } from 'redux';
import tempReducer from './temp/reducer'; // make sure this path is correct
import userReducer from './user/userData/reducer';
import socketReducer from './socket/reducer';
// import AuthReducer from './user/userAuth/reducer';

const rootReducer = combineReducers({
  userDetail: userReducer,
  // Auth: AuthReducer 
  // socket: socketReducer
});

export default rootReducer;
