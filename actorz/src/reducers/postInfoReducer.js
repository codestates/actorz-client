import {
  GET_ALL_POST_INFO,
  EDIT_POST_INFO,
  REMOVE_POST_PHOTO,
} from "../actions/postAction";
import { postInitState } from "./postInitState";

const postInfoReducer = (state = postInitState, action) => {
  //console.log(state);
  //console.log(action.type);
  switch (action.type) {
    case GET_ALL_POST_INFO:
      return Object.assign({}, state, {
        data: { data: action.payload },
      });

    case REMOVE_POST_PHOTO:
      const filteredPhoto = Object.assign({}, state.data.posts[0], {
        path: state.data.posts[0].path.filter(
          (el) => el.id !== action.payload.id
        ),
      });
      return { data: { posts: [filteredPhoto] } };

    case EDIT_POST_INFO:
      const a = Object.assign({}, state, {
        data: { posts: action.payload },
      });
      return a;

    default:
      return state;
  }
};

export default postInfoReducer;
