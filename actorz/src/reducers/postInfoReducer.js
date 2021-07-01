import { SELECT_POST_INFO } from "../actions/postAction";
import { postInitState } from "./postInitState";

const postInfoReducer = (state = postInitState, action) => {
  switch (action.type) {
    // case SELECT_POST_INFO:
    //   return Object.assign({}, state, {
    //     posts: state.data.posts.filter((el) => {
    //       return el.id === action.payload.id;
    //     }),
    //   });
    default:
      return state;
  }
};

export default postInfoReducer;
