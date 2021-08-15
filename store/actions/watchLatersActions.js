import axios from "axios";
import { fireToast } from "../../global/helpers";
import { watchLatersActionTypes } from "./types";
import { clearLoading, handleServerError, setLoading } from "./uiActions";

export const setWatchLaters = watchLaters => dispatch => {
  dispatch({
    type: watchLatersActionTypes.SET_WATCHLATERS,
    payload: watchLaters,
  });
};
export const addWatchLater = videoId => async dispatch => {
  try {
    await axios.put(`/watchlaters/${videoId}`);
  } catch (err) {}
};

export const toggleWatchLater = videoId => async dispatch => {
  const component = `WatchLaterItem${videoId}`;
  try {
    dispatch(setLoading(component));
    const res = await axios.put(`/watchlaters/${videoId}`);
    if (res.status === 204) {
      dispatch({
        type: watchLatersActionTypes.DELETE_WATCHLATER,
        payload: videoId,
      });
      dispatch({
        type: watchLatersActionTypes.SET_IS_WATCH_LATER,
        payload: { videoId, isWatchLater: false },
      });
      fireToast("success", "Video deleted from watch list");
    } else {
      dispatch({
        type: watchLatersActionTypes.SET_IS_WATCH_LATER,
        payload: { videoId, isWatchLater: true },
      });
      fireToast("success", "Video added to watch list");
    }
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const deleteAllWatchLaters = () => async dispatch => {
  const component = `WatchLaterSidebarDelete`;
  try {
    dispatch(setLoading(component));
    await axios.delete(`/watchlaters`);
    dispatch({
      type: watchLatersActionTypes.SET_WATCHLATERS,
      payload: [],
    });
    fireToast("success", "Watch Later cleared");
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const checkIfVideoIsWatchLater = videoId => async dispatch => {
  const component = "VideoSingle";
  try {
    const {
      data: { isWatchLater },
    } = await axios.get(`/watchlaters/${videoId}/`);

    dispatch({
      type: watchLatersActionTypes.SET_IS_WATCH_LATER,
      payload: { videoId, isWatchLater },
    });
  } catch (err) {
    dispatch(handleServerError(err, component));
  }
};
