export function fetchUserLog(user) {
  const USERLOG_ENDPOINT = `http://covy-backend.mybluemix.net/log/${user}`;

  return (dispatch) => {
    dispatch(fetchUserLogBegin());
    return fetch(USERLOG_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUserLogSuccess(json));
        return json;
      })
      .catch((error) => handleErrors(dispatch, error));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(dispatch, error) {
  dispatch(fetchUserLogFailure(error));

  return error;
}

export const FETCH_USERLOG_BEGIN = "FETCH_USERLOG_BEGIN";
export const FETCH_USERLOG_SUCCESS = "FETCH_USERLOG_SUCCESS";
export const FETCH_USERLOG_FAILURE = "FETCH_USERLOG_FAILURE";

export const fetchUserLogBegin = () => ({
  type: FETCH_USERLOG_BEGIN,
});

export const fetchUserLogSuccess = (userlog) => ({
  type: FETCH_USERLOG_SUCCESS,
  payload: userlog,
});

export const fetchUserLogFailure = (error) => ({
  type: FETCH_USERLOG_FAILURE,
  payload: error,
});
