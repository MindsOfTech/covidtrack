import { combineReducers } from "redux";
import stats from "./../reducers/statsReducer";
import news from "./../reducers/newsReducer";
import user from "./../reducers/userReducer";
import userlog from "./../reducers/userLogReducer";
import qr from "./../reducers/qrReducer";

export default combineReducers({
  stats,
  news,
  user,
  userlog,
  qr,
});
