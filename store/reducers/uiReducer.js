import { uiActionTypes } from "../actions/types";

const initialState = {
  loading: {},
  serverErrors: {},
};
export default function uiReducer(state = initialState, { type, payload }) {
  var modifiedLoading = null;
  var modifiedServerErrors = null;

  switch (type) {
    case uiActionTypes.SET_LOADING:
      modifiedLoading = { ...state.loading };
      modifiedLoading[payload] = true;
      return {
        ...state,
        loading: modifiedLoading,
      };
    case uiActionTypes.CLEAR_LOADING:
      modifiedLoading = { ...state.loading };
      modifiedLoading[payload] = false;
      return {
        ...state,
        loading: modifiedLoading,
      };
    case uiActionTypes.SET_SERVER_ERRORS:
      modifiedServerErrors = { ...state.errors };
      modifiedServerErrors[payload.component] = payload.error;
      return {
        ...state,
        serverErrors: modifiedServerErrors,
      };
    case uiActionTypes.CLEAR_SERVER_ERRORS:
      modifiedServerErrors = { ...state.errors };
      if (payload.component) {
        delete modifiedServerErrors[payload.component];
      } else {
        modifiedServerErrors = {};
      }
      return {
        ...state,
        serverErrors: modifiedServerErrors,
      };
    default:
      return state;
  }
}
