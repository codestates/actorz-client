import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

// 새로고침, 종료해도 지속적으로 정보가 저장될 store 생성
import { persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default { store, persistor };
