import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from './uiReducer'
import videosReducer from './videosReducer'

export default combineReducers({
  authReducer,
  uiReducer,
  videosReducer
});
