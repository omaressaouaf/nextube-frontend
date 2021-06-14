import { videosActionTypes } from "../actions/types";

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
        video: payload,
      };
    case videosActionTypes.SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: payload,
      };
    default:
      return state;
  }
}
