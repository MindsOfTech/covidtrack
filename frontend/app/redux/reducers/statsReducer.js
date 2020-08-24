import {
  FETCH_STATS_BEGIN,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
} from "./../actions/statsActions";

const initialState = {
  stats: [],
  loading: false,
  error: false,
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_STATS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the stats with the ones from the server
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };

    case FETCH_STATS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have stats to display anymore, so set `stats` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the stats around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: true,
        stats: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
