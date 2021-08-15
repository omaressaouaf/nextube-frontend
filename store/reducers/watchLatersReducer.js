import { watchLatersActionTypes } from "../actions/types";

const initialState = {
  watchLaters: [],
};

export default function watchLatersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case watchLatersActionTypes.SET_WATCHLATERS:
      return {
        ...state,
        watchLaters: payload,
      };
    case watchLatersActionTypes.DELETE_WATCHLATER:
      return {
        ...state,
        watchLaters: state.watchLaters.filter(watchLater => watchLater.video.id !== payload),
      };
    default:
      return state;
  }
}
