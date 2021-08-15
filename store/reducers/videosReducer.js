import { validateFeelingsVariable } from "../../global/helpers";
import { usersActionTypes, videosActionTypes, watchLatersActionTypes } from "../actions/types";

const initialState = {
  uploadProgresses: {},
  videos: [],
  video: { user: {} },
  suggestions: [],
};

export default function videosReducer(state = initialState, { type, payload }) {
  var modifiedUploadProgresses = null;

  switch (type) {
    case videosActionTypes.SET_UPLOAD_PROGRESS:
      modifiedUploadProgresses = { ...state.uploadProgresses };
      modifiedUploadProgresses[payload.identifier] = payload;
      return {
        ...state,
        uploadProgresses: modifiedUploadProgresses,
      };
    case videosActionTypes.CLEAR_UPLOAD_PROGRESS:
      modifiedUploadProgresses = { ...state.uploadProgresses };
      delete modifiedUploadProgresses[payload.identifier];

      return {
        ...state,
        uploadProgresses: modifiedUploadProgresses,
      };
    case videosActionTypes.SET_VIDEOS:
      return {
        ...state,
        videos: payload,
      };
    case videosActionTypes.SET_VIDEO:
      return {
        ...state,
        video: { ...payload, isWatchLater: false },
      };
    case watchLatersActionTypes.SET_IS_WATCH_LATER:
      return {
        ...state,
        video: { ...state.video, isWatchLater: payload.isWatchLater },
      };
    case videosActionTypes.SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: payload,
      };
    case videosActionTypes.TOGGLE_FEELING:
      let modifiedVideo = { ...state.video };

      const { authUser, feelings } = payload;

      validateFeelingsVariable(feelings);

      const oppositeFeelings = feelings === "likes" ? "dislikes" : "likes";

      if (modifiedVideo[feelings].includes(authUser.id)) {
        modifiedVideo[feelings] = modifiedVideo[feelings].filter(userId => userId != authUser.id);
      } else {
        if (modifiedVideo[oppositeFeelings].includes(authUser.id)) {
          modifiedVideo[oppositeFeelings] = modifiedVideo[oppositeFeelings].filter(
            userId => userId != authUser.id
          );
        }
        modifiedVideo[feelings].push(authUser.id);
      }
      return {
        ...state,
        video: modifiedVideo,
      };
    case usersActionTypes.SUBSCRIBE:
      return {
        ...state,
        video: {
          ...state.video,
          user: { ...state.video.user, subscribersCount: state.video.user.subscribersCount + 1 },
        },
      };
    case usersActionTypes.UNSUBSCRIBE:
      return {
        ...state,
        video: {
          ...state.video,
          user: { ...state.video.user, subscribersCount: state.video.user.subscribersCount - 1 },
        },
      };
    default:
      return state;
  }
}
