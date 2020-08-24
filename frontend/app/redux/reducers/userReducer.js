import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./../actions/setUserActions";

const initialState = {
  user: "guest",
  loading: false,
  error: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_USER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the USER with the ones from the server
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case FETCH_USER_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have USER to display anymore, so set `USER` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the USER around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: true,
        user: "guest",
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
