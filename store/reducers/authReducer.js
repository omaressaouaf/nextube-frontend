import { authActionTypes } from "../actions/types";

const initialState = {
  authUser: null,
  authPending: true,
  accessToken: null,
  accessTokenEndDate : null,
};
export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case authActionTypes.SET_AUTH:
      return {
        ...state,
        authUser: payload.user,
        accessToken: payload.accessToken,
        accessTokenEndDate : payload.accessTokenEndDate,
        authPending: false,
      };
    default:
      return state;
  }
}
