export const GET_ALL_POST_INFO = "GET_ALL_POST_INFO";
export const EDIT_POST_INFO = "EDIT_POST_INFO";
export const REMOVE_POST_PHOTO = "REMOVE_POST_PHOTO";
export const EDIT_LIKE = "EDIT_LIKE";

export const getAllPostInfo = (allPostInfo) => {
  return {
    type: GET_ALL_POST_INFO,
    payload: {
      posts: allPostInfo,
    },
  };
};

export const removePostPhoto = (post_id, img_id) => {
  return {
    type: REMOVE_POST_PHOTO,
    payload: {
      post_id,
      img_id,
    },
  };
};

export const editPostInfo = (posts) => {
  return {
    type: EDIT_POST_INFO,
    payload: posts,
  };
};

export const editLike = (post_id, like) => {
  console.log(like);
  return {
    type: EDIT_LIKE,
    payload: {
      post_id: post_id,
      like: like,
    },
  };
};
