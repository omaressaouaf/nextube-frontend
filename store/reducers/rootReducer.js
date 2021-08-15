import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import videosReducer from "./videosReducer";
import commentsReducer from "./commentsReducer";
import historiesReducer from "./historiesReducer";
import watchLatersReducer from "./watchLatersReducer";

export default combineReducers({
  authReducer,
  uiReducer,
  videosReducer,
  commentsReducer,
  historiesReducer,
  watchLatersReducer,
});
