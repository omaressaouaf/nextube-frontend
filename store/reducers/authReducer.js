import { authActionTypes, usersActionTypes } from "../actions/types";

const initialState = {
  authUser: null,
  accessToken: null,
  accessTokenEndDate: null,
  authPending: true,
};
export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case authActionTypes.SET_AUTH:
      return {
        ...state,
        authUser: payload.user,
        accessToken: payload.accessToken,
        accessTokenEndDate: payload.accessTokenEndDate,
        authPending: false,
      };

    case usersActionTypes.SUBSCRIBE:
      return {
        ...state,
        authUser: { ...state.authUser, subscriptions: [payload, ...state.authUser.subscriptions] },
      };
    case usersActionTypes.UNSUBSCRIBE:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          subscriptions: state.authUser.subscriptions.filter(
            subscription => subscription.subscribedTo.id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
