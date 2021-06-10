import axios from "axios";
import { fireToast } from "../../global/helpers";
import { videosActionTypes } from "./types";
import { handleServerError } from "./uiActions";

const setUploadProgress = ({ identifier, title, percentage, source }) => {
  return {
    type: videosActionTypes.SET_UPLOAD_PROGRESS,
    payload: {
      identifier,
      title,
      percentage,
      source,
    },
  };
};

const clearUploadProgress = identifier => {
  return {
    type: videosActionTypes.CLEAR_UPLOAD_PROGRESS,
    payload: {
      identifier,
    },
  };
};

export const cancelUploadVideo = source => async dispatch => {
  source.cancel("You have canceled the upload");
};

export const uploadVideo = formData => async dispatch => {
  try {
    var component = "UploadForm";
    var uploadProgressIdentifier = Date.now();
    const source = axios.CancelToken.source();

    const config = {
      cancelToken: source.token,
      headers: {
        "Content-Type": "multipart/form-data; charset=utf-8;",
      },
      onUploadProgress: ({ loaded, total }) => {
        const percentage = parseInt(Math.round((loaded * 100) / total));
        const uploadProgress = {
          identifier: uploadProgressIdentifier,
          title: formData.get("title"),
          percentage,
          source,
        };
        dispatch(setUploadProgress(uploadProgress));
      },
    };
    await axios.post("/videos/upload", formData, config);
    fireToast("success", "Video uploaded successfully");
  } catch (err) {
    if (axios.isCancel(err)) {
      fireToast("info", err.message);
    } else {
      dispatch(handleServerError(err, component));
    }
  } finally {
    setTimeout(() => dispatch(clearUploadProgress(uploadProgressIdentifier)), 2000);
  }
};
