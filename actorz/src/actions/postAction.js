export const GET_ALL_POST_INFO = "GET_ALL_POST_INFO";
export const EDIT_POST_INFO = "EDIT_POST_INFO";
export const REMOVE_POST_PHOTO = "REMOVE_POST_PHOTO";

export const getAllPostInfo = (allPostInfo) => {
  return {
    type: GET_ALL_POST_INFO,
    payload: {
      posts: allPostInfo,
    },
  };
};

export const removePostPhoto = (id) => {
  return {
    type: REMOVE_POST_PHOTO,
    payload: {
      id,
    },
  };
};

export const editPostInfo = (posts) => {
  return {
    type: EDIT_POST_INFO,
    payload: [posts],
  };
};
