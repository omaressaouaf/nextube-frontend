// auth action types
export const authActionTypes = {
  SET_AUTH: "SET_AUTH",
};

// ui action types
export const uiActionTypes = {
  SET_LOADING: "SET_LOADING",
  CLEAR_LOADING: "CLEAR_LOADING",
  SET_SERVER_ERROR: "SET_SERVER_ERROR",
  CLEAR_SERVER_ERROR: "CLEAR_SERVER_ERROR",
};

// videos action types
export const videosActionTypes = {
  SET_UPLOAD_PROGRESS: "SET_UPLOAD_PROGRESS",
  CLEAR_UPLOAD_PROGRESS: "CLEAR_UPLOAD_PROGRESS",
  SET_VIDEOS: "SET_VIDEOS",
  SET_VIDEO: "SET_VIDEO",
  SET_SUGGESTIONS: "SET_SUGGESTIONS",
  TOGGLE_FEELING: "TOGGLE_FEELING",
};

// comments action types
export const commentsActionTypes = {
  SET_COMMENTS: "SET_COMMENTS",
  SET_REPLIES: "SET_REPLIES",
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  UPDATE_COMMENT: "UPDATE_COMMENT",
};

// users / subscriptions action types
export const usersActionTypes = {
  SUBSCRIBE: "SUBSCRIBE",
  UNSUBSCRIBE: "UNSUBSCRIBE",
  SET_SUBSCRIPTIONS: "SET_SUBSCRIPTIONS",
};

// histories action types
export const historiesActionTypes = {
  SET_HISTORIES: "SET_HISTORIES",
  ADD_HISTORY: "ADD_HISTORY",
  DELETE_HISTORY: "DELETE_HISTORY",
};

// watchLaters action types
export const watchLatersActionTypes = {
  SET_WATCHLATERS: "SET_WATCHLATERS",
  DELETE_WATCHLATER: "DELETE_WATCHLATER",
  SET_IS_WATCH_LATER: "SET_IS_WATCH_LATER",
};
