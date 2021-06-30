import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from './uiReducer'
import videosReducer from './videosReducer'
import commentsReducer from "./commentsReducer";
import historiesReducer from "./historiesReducer";

export default combineReducers({
  authReducer,
  uiReducer,
  videosReducer,
  commentsReducer,
  historiesReducer
});
