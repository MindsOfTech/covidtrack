export function fetchStats() {
  const COVID_STATS_ENDPOINT =
    "https://corona.lmao.ninja/v2/countries/Jamaica?strict&query%20";

  return (dispatch) => {
    dispatch(fetchStatsBegin());
    return fetch(COVID_STATS_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchStatsSuccess(json));
        return json;
      })
      .catch((error) => handleErrors(dispatch, error));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(dispatch, error) {
  console.log(error);
  dispatch(fetchStatsFailure(error));

  return error;
}

export const FETCH_STATS_BEGIN = "FETCH_STATS_BEGIN";
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";
export const FETCH_STATS_FAILURE = "FETCH_STATS_FAILURE";

export const fetchStatsBegin = () => ({
  type: FETCH_STATS_BEGIN,
});

export const fetchStatsSuccess = (stats) => ({
  type: FETCH_STATS_SUCCESS,
  payload: stats,
});

export const fetchStatsFailure = (error) => ({
  type: FETCH_STATS_FAILURE,
  payload: error,
});
