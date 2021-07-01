export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const ADD_USER_CAREER = "ADD_USER_CAREER";
export const REMOVE_USER_CAREER = "REMOVE_USER_CAREER";

export const editUserInfo = (userInfo) => {
  return {
    type: EDIT_USER_INFO,
    payload: {
      userInfo,
    },
  };
};

export const addUserCareer = (item) => {
  return {
    type: ADD_USER_CAREER,
    payload: {
      item,
    },
  };
};

export const removeUserCareer = (itemId) => {
  return {
    type: REMOVE_USER_CAREER,
    payload: {
      itemId,
    },
  };
};
