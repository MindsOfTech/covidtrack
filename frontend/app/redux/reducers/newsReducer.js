import {
  FETCH_NEWS_BEGIN,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "./../actions/newsActions";

const initialState = {
  news: [],
  loading: false,
  error: false,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_NEWS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the NEWS with the ones from the server
      return {
        ...state,
        loading: false,
        news: action.payload,
      };

    case FETCH_NEWS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have NEWS to display anymore, so set `NEWS` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the NEWS around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: true,
        news: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
