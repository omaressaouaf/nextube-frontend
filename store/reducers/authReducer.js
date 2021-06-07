import { authActionTypes } from "../actions/types";

const initialState = {
  authUser: null,
  authPending: true,
  accessToken: null,
};
export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case authActionTypes.SET_AUTH_USER:
      return {
        ...state,
        authUser: payload.user,
        accessToken: payload.accessToken,
        authPending: false,
      };
    default:
      return state;
  }
}
