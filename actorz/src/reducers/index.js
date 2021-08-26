import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import postInfoReducer from "./postInfoReducer";

// reducer를 persist할 수 있게 해주는 persistReducer
import { persistReducer } from "redux-persist";

// 정보를 localStorage에 저장하고싶으면
import storage from "redux-persist/lib/storage";

// 정보를 sessionStorage에 저장하고싶으면
// import storage from "redux-persist/lib/storage/session"

//새로운 persistConfig를 생성한다.
const persistConfig = {
  key: "root",
  storage: storage, // 9번째 줄에서 import한 storage를 지정해준다.
  whitelist: ["userInfoReducer"], // 유지하고 싶은 데이터를 배열 안에 지정한다.
  // combineReducers 안에 지정된 값들을 사용한다. 이렇게 하면 특정 reducer만 storage에 저장 할 수 있다.
  // 특정 reducer만 storage에 저장하지 않도록 하기 위해서는 blacklist를 사용하면 된다.
  // blacklist: ["userInfoReducer"]
};

const rootReducer = combineReducers({
  userInfoReducer,
  postInfoReducer,
});

export default persistReducer(persistConfig, rootReducer);
// persistReducer 함수안에 persistConfig와 rootReducer를 넣어서 export 한다.
// 이 뜻은 수정된 rootReducer를 persistConfig의 조건에 맞게 persist 하여 export 하겠다는 뜻이다.
// 단순하게 rootReducer에 persist 능력을 추가해준 것이다.
