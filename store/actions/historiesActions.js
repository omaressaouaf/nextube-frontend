import axios from "axios";
import { fireToast } from "../../global/helpers";
import { historiesActionTypes } from "./types";
import { clearLoading, handleServerError, setLoading } from "./uiActions";

export const setHistories = historiesPerDay => dispatch => {
  dispatch({
    type: historiesActionTypes.SET_HISTORIES,
    payload: historiesPerDay,
  });
};
export const addHistory = videoId => async dispatch => {
  try {
    await axios.put(`/histories/${videoId}`);
  } catch (err) {}
};

export const deleteHistory = videoId => async dispatch => {
  const component = `HistoryItem${videoId}`;
  try {
    dispatch(setLoading(component));
    await axios.delete(`/histories/${videoId}`);
    dispatch({
      type: historiesActionTypes.DELETE_HISTORY,
      payload: videoId,
    });
    fireToast("success", "History deleted successfully");
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const deleteAllHistories = () => async dispatch => {
  const component = `HistorySidebarDelete`;
  try {
    dispatch(setLoading(component));
    await axios.delete(`/histories`);
    dispatch({
      type: historiesActionTypes.SET_HISTORIES,
      payload: [],
    });
    fireToast("success", "History cleared successfully");
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

