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
export const setServerErrors = (component, error) => {
  return {
    type: uiActionTypes.SET_SERVER_ERRORS,
    payload: {
      component,
      error,
    },
  };
};
export const clearServerErrors = component => {
  return {
    type: uiActionTypes.CLEAR_SERVER_ERRORS,
    payload: {
      component,
    },
  };
};

