import {
  GET_USER_INF0,
  EDIT_USER_INFO,
  ADD_USER_CAREER,
  REMOVE_USER_CAREER,
} from "../actions/userAction";
import { userInfoInitState } from "./userInfoInitState";

const userInfoReducer = (state = userInfoInitState, action) => {
  switch (action.type) {
    case GET_USER_INF0:
      return Object.assign({}, state, {
        data: action.payload,
        isLogin: true,
      });

    case EDIT_USER_INFO:
      return Object.assign({}, state, {
        data: action.payload,
        isLogin: true,
      });

    case ADD_USER_CAREER:
      const newId = state.data.userInfo.careers.length + 1;
      let updatedUser = Object.assign({}, state.data.userInfo, {
        careers: [...state.data.userInfo.careers, action.payload.item],
      });
      updatedUser.careers[newId - 1].id = newId;
      return { 
        data: { userInfo: updatedUser },
        isLogin: true,
    };

    case REMOVE_USER_CAREER:
      const filteredCareer = Object.assign({}, state.data.userInfo, {
        careers: [...state.data.userInfo.careers.slice(0, action.payload.itemId), ...state.data.userInfo.careers.slice(action.payload.itemId + 1)],
      });
      return { 
        data: { userInfo: filteredCareer },
        isLogin: true,
    };

    default:
      return state;
  }
};

export default userInfoReducer;
