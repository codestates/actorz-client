import {
  GET_ALL_POST_INFO,
  EDIT_POST_INFO,
  REMOVE_POST_PHOTO,
  EDIT_LIKE,
  REMOVE_POST,
} from "../actions/postAction";
import { postInitState } from "./postInitState";

const postInfoReducer = (state = postInitState, action) => {
  switch (action.type) {
    case GET_ALL_POST_INFO:
      return Object.assign({}, state, {
        data: { data: action.payload },
      });

    case REMOVE_POST_PHOTO:
      const filteredPost = state.data.data.posts.posts.filter((post) => {
        return post._id === action.payload.post_id;
      });
      const filteredPhoto = Object.assign({}, filteredPost[0], {
        media: filteredPost[0].media.filter((el) => {
          return el._id !== action.payload.img_id;
        }),
      });
      return {
        data: {
          data: { posts: { posts: [filteredPhoto] } },
        },
      };

    case EDIT_POST_INFO:
      const editedPost = Object.assign({}, state.data.data.posts, {
        posts: [action.payload],
      });
      return {
        data: {
          data: { posts: editedPost },
        },
      };

    case EDIT_LIKE:
      const copied = { ...state };
      let idx = state.data.data.posts.posts.findIndex((el) => {
        return el._id === action.payload.post_id;
      });
      copied.data.data.posts.posts[idx].likes = action.payload.like;
      return copied;

    case REMOVE_POST:
      const copiedPost = { ...state };
      const filt = copiedPost.data.data.posts.posts.filter((post) => {
        return post._id !== action.payload.post_id;
      });

      return { data: { data: { posts: { posts: filt } } } };

    default:
      return state;
  }
};

export default postInfoReducer;
