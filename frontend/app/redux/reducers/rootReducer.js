import { combineReducers } from "redux";
import stats from "./../reducers/statsReducer";
import news from "./../reducers/newsReducer";
import user from "./../reducers/userReducer";

export default combineReducers({
  stats,
  news,
  user,
});
