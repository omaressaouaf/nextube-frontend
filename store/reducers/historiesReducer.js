import { historiesActionTypes } from "../actions/types";

const initialState = {
  historiesPerDay: [],
};

export default function historiesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case historiesActionTypes.SET_HISTORIES:
      return {
        ...state,
        historiesPerDay: payload,
      };
    case historiesActionTypes.DELETE_HISTORY:
      return {
        ...state,
        historiesPerDay: state.historiesPerDay.reduce((accum, item) => {
          item.histories = item.histories.filter(history => history.video._id !== payload);
          if (item.histories.length) {
            accum.push(item);
          }
          return accum;
        }, []),
      };
    default:
      return state;
  }
}
