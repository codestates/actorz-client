import {
  GET_ALL_POST_INFO,
  EDIT_POST_INFO,
  REMOVE_POST_PHOTO,
} from "../actions/postAction";
import { postInitState } from "./postInitState";

const postInfoReducer = (state = postInitState, action) => {
  switch (action.type) {
    case GET_ALL_POST_INFO:
      return Object.assign({}, state, {
        data: { data: action.payload },
      });

    case REMOVE_POST_PHOTO:
      //console.log(action.payload.post_id);
      //console.log(action.payload.img_id);
      //console.log(state.data.data.posts.posts);
      //state.data.data.posts.posts
      //state.data.data.posts.posts.map 해서 post_id가 같은 것을 가져온다
      //console.log(state.data.data.posts);
      const filteredPost = state.data.data.posts.posts.filter((post) => {
        return post._id === action.payload.post_id;
      });
      //console.log(filteredPost);
      const filteredPhoto = filteredPost[0].media.filter((media) => {
        return media._id !== action.payload.img_id;
      });
      console.log(filteredPhoto);
      //console.log(filteredPhoto);
      return Object.assign({}, state, {});

    // const filteredPhoto = Object.assign();
    // //console.log(filteredPhoto);
    // return { posts: [filteredPhoto] };

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
