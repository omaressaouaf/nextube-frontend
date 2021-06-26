import axios from "axios";
import { usersActionTypes } from "./types";
import { clearLoading, handleServerError, setLoading } from "./uiActions";

export const toggleSubscribe = (userId, authUserAlreadySubscribed) => async dispatch => {
  const component = `SubscriptionButton${userId}`;
  try {
    dispatch(setLoading(component));

    if (authUserAlreadySubscribed) {
      // unsubscribe
      await axios.delete(`/subscriptions/unsubscribe/${userId}`);
      dispatch({
        type: usersActionTypes.UNSUBSCRIBE,
        payload: userId,
      });
    } else {
      // subscribe
      const { data } = await axios.post(`/subscriptions/subscribe/${userId}`);
      dispatch({
        type: usersActionTypes.SUBSCRIBE,
        payload: data.newSubscription,
      });
    }
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};
