import axios from "axios";
import { fireToast } from "../../global/helpers";
import { setAuthData } from "./authActions";
import { uiActionTypes } from "./types";

export const setLoading = component => {
  return {
    type: uiActionTypes.SET_LOADING,
    payload: component,
  };
};
export const clearLoading = component => {
  return {
    type: uiActionTypes.CLEAR_LOADING,
    payload: component,
  };
};
export const setServerError = (component, error) => {
  return {
    type: uiActionTypes.SET_SERVER_ERROR,
    payload: {
      component,
      error,
    },
  };
};
export const clearServerErrors = component => {
  return {
    type: uiActionTypes.CLEAR_SERVER_ERROR,
    payload: {
      component,
    },
  };
};

export const handleServerError = (err, component) => dispatch => {
  console.error(err);
  const status = err.response?.status;
  const expectedStatuses = [400, 401, 404, 422, 409];
  if (expectedStatuses.includes(status)) {
    dispatch(setServerError(component, err.response.data.message));
    if (component !== "signin" && component !== "signup" && status === 401) {
      dispatch(setAuthData({}));
      delete axios.defaults.headers.common["Authorization"];
    }
  } else {
    fireToast("error", "Unknown Error. Try again");
  }
};
