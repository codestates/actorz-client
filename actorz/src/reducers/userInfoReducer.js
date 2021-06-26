import { SELECT_USER_INFO } from "../actions";
import { initialState } from "./initialState";

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER_INFO:
      return state;
    default:
      return state;
  }
}

export default userInfoReducer;