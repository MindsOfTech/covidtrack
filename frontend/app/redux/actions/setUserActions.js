export function setUser(username) {
  return (dispatch) => {
    dispatch(setUserBegin());
    // console.log("username recieved: ", username);
    dispatch(setUserSuccess(username));
  };
}

export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_REFRESH = "FETCH_USER_REFRESH";

export const setUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});
export const fetchUserRefresh = () => ({
  type: FETCH_USER_REFRESH,
});

export const setUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
