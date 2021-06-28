import { ADD_USER_CAREER, REMOVE_USER_CAREER } from "../actions/userAction";
import { userInfoInitState } from "./userInfoInitState";

const userInfoReducer = (state = userInfoInitState, action) => {
  switch (action.type) {
    case ADD_USER_CAREER:
      let a = Object.assign({}, state.data.userInfo, {
        careers: [...state.data.userInfo.careers, action.payload.item],
      });
      return { data: { userInfo: a } };
    case REMOVE_USER_CAREER:
      const filteredCareer = Object.assign({}, state.data.userInfo, {
        careers: state.data.userInfo.careers.filter(
          (el) => el.id !== action.payload.itemId
        ),
      });
      return { data: { userInfo: filteredCareer } };
    default:
      return state;
  }
};

export default userInfoReducer;
