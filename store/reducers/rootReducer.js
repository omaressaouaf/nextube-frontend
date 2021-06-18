import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from './uiReducer'
import videosReducer from './videosReducer'
import commentsReducer from "./commentsReducer";

export default combineReducers({
  authReducer,
  uiReducer,
  videosReducer,
  commentsReducer
});
