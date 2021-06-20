import { authActionTypes, subscriptionsActionTypes } from "../actions/types";

const initialState = {
  authUser: null,
  authPending: true,
  accessToken: null,
  accessTokenEndDate: null,
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
    case subscriptionsActionTypes.SUBSCRIBE:
      return {
        ...state,
        authUser: { ...state.authUser, subscriptions: [payload, ...state.authUser.subscriptions] },
      };
    case subscriptionsActionTypes.UNSUBSCRIBE:
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
