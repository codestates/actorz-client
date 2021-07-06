import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import postInfoReducer from "./postInfoReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userInfoReducer,
  postInfoReducer,
});

export default rootReducer;
