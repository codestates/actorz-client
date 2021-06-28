import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer';
import postInfoReducer from "./postInfoReducer";

const rootReducer = combineReducers({
  userInfoReducer,
  postInfoReducer,
});

export default rootReducer;