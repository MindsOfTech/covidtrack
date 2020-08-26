import {
  FETCH_USERLOG_BEGIN,
  FETCH_USERLOG_SUCCESS,
  FETCH_USERLOG_FAILURE,
} from "./../actions/setUserLogActions";

const initialState = {
  userlog: {
    CompanyName: [],
    DateTimeVisited: [],
    LocationVisited: [],
    //NOTE: username should probably come from userReducer where it's set at login
    username: "",
  },
  loading: false,
  error: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERLOG_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_USERLOG_SUCCESS:
      // All done: set loading "false".
      // Also, replace the USER with the ones from the server
      return {
        ...state,
        loading: false,
        userlog: action.payload,
      };

    case FETCH_USERLOG_FAILURE:
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
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
