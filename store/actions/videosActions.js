import axios from "axios";
import router from "next/router";
import nProgress from "nprogress";
import { fireToast } from "../../global/helpers";
import { videosActionTypes } from "./types";
import { clearLoading, handleServerError, setLoading } from "./uiActions";

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

export const setVideos = videos => {
  return {
    type: videosActionTypes.SET_VIDEOS,
    payload: videos,
  };
};

export const uploadVideo = formData => async dispatch => {
  const component = "VideoForm";
  const uploadProgressIdentifier = Date.now();

  try {
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

export const fetchVideo = id => dispatch => {
  return new Promise(async resolve => {
    const component = "VideoSingle";
    try {
      dispatch(setLoading(component));
      const {
        data: { video },
      } = await axios.get("/videos/" + id);

      dispatch({
        type: videosActionTypes.SET_VIDEO,
        payload: video,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        router.push("/404");
      }
      dispatch(handleServerError(err, component));
    } finally {
      dispatch(clearLoading(component));
      resolve();
    }
  });
};

export const fetchSuggestions = videoId => async dispatch => {
  const component = "SuggestionList";
  try {
    dispatch(setLoading(component));

    const { data } = await axios.get(`/videos/${videoId}/suggestions`);

    dispatch({
      type: videosActionTypes.SET_SUGGESTIONS,
      payload: data.suggestions,
    });
  } catch (err) {
    if (err.response?.status === 404) {
      router.push("/404");
    }
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const toggleLike = videoId => async (dispatch, getState) => {
  try {
    const authUser = getState().authReducer.authUser;
    dispatch({
      type: videosActionTypes.TOGGLE_FEELING,
      payload: {
        authUser,
        feelings: "likes",
      },
    });
    await axios.put(`/videos/${videoId}/togglelike`);
  } catch (err) {
    // README : don't handle errors here
  }
};

export const toggleDislike = videoId => async (dispatch, getState) => {
  try {
    const authUser = getState().authReducer.authUser;
    dispatch({
      type: videosActionTypes.TOGGLE_FEELING,
      payload: {
        authUser,
        feelings: "dislikes",
      },
    });
    await axios.put(`/videos/${videoId}/toggledislike`);
  } catch (err) {
    // README : don't handle errors here
  }
};

export const fetchStudioVideos = () => async dispatch => {
  const component = "VideosTable";
  try {
    dispatch(setLoading(component));

    const { data } = await axios.get(`/videos/studio`);
    dispatch(setVideos(data.videos));
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const deleteVideo = videoId => async dispatch => {
  const component = `VideosTable${videoId}`;
  try {
    nProgress.start();
    await axios.delete(`/videos/${videoId}`);

    dispatch({
      type: videosActionTypes.DELETE_VIDEO,
      payload: videoId,
    });
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    nProgress.done();
  }
};
