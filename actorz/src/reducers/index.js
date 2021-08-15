import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import postInfoReducer from "./postInfoReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userInfoReducer"],
};

const rootReducer = combineReducers({
  userInfoReducer,
  postInfoReducer,
});

export default persistReducer(persistConfig, rootReducer);
