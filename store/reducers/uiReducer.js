import { uiActionTypes } from "../actions/types";

const initialState = {
  loadings: {},
  serverErrors: {},
};
export default function uiReducer(state = initialState, { type, payload }) {
  var modifiedLoadings = null;
  var modifiedServerErrors = null;


  switch (type) {
    case uiActionTypes.SET_LOADING:
      modifiedLoadings = { ...state.loadings };
      modifiedLoadings[payload] = true;
      return {
        ...state,
        loadings: modifiedLoadings,
      };
    case uiActionTypes.CLEAR_LOADING:
      modifiedLoadings = { ...state.loadings };
      modifiedLoadings[payload] = false;
      return {
        ...state,
        loadings: modifiedLoadings,
      };
    case uiActionTypes.SET_SERVER_ERROR:
      modifiedServerErrors = { ...state.serverErrors };
      modifiedServerErrors[payload.component] = payload.error;
      return {
        ...state,
        serverErrors: modifiedServerErrors,
      };
    case uiActionTypes.CLEAR_SERVER_ERROR:
      modifiedServerErrors = { ...state.serverErrors };
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
