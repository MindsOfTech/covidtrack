import {
  FETCH_QR_BEGIN,
  FETCH_QR_SUCCESS,
  FETCH_QR_FAILURE,
} from "./../actions/setQrActions";

const initialState = {
  qr: "blob:7941833A-6136-40B1-85CC-77895BECEC44?offset=0&size=440",
  loading: false,
  error: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QR_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_QR_SUCCESS:
      // All done: set loading "false".
      // Also, replace the USER with the ones from the server
      return {
        ...state,
        loading: false,
        qr: action.payload,
      };

    case FETCH_QR_FAILURE:
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
