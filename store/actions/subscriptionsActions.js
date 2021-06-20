import axios from "axios";
import { subscriptionsActionTypes } from "./types";
import { clearLoading, handleServerError, setLoading } from "./uiActions";

export const toggleSubscribe = (userId, authUserSubscribedToVideoUser) => async dispatch => {
  // TODO CHANGE COMPONENT
  const component = "SubscriptionButton";
  try {
    dispatch(setLoading(component));

    if (authUserSubscribedToVideoUser) {
      // unsubscribe
      await axios.delete(`/subscriptions/unsubscribe/${userId}`);
      dispatch({
        type: subscriptionsActionTypes.UNSUBSCRIBE,
        payload: userId,
      });
    } else {
      // subscribe
      const { data } = await axios.post(`/subscriptions/subscribe/${userId}`);
      dispatch({
        type: subscriptionsActionTypes.SUBSCRIBE,
        payload: data.newSubscription,
      });
    }
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component))
  }
};
