export function setUser(username) {
  return (dispatch) => {
    dispatch(setUserBegin());
    console.log("username recieved: ", username);
    dispatch(setUserSuccess(username));
  };
}

export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const setUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});

export const setUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
