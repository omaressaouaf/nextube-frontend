import { useDispatch, useSelector } from "react-redux";
import Button from "../base/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { toggleSubscribe } from "../../store/actions/usersActions";
import { fireToast } from "../../global/helpers";
import Skeleton from "react-loading-skeleton";

const SubscriptionButton = ({ userId }) => {
  // redux
  const [authUser, loading] = useSelector(state => [
    state.authReducer.authUser,
    state.uiReducer.loadings[`SubscriptionButton${userId}`],
  ]);
  const dispatch = useDispatch();

  const [subscribedToArray, setSubscribedToArray] = useState([]);
  const authUserAlreadySubscribed = subscribedToArray.includes(userId);
  const [subscribedToArrayLoading, setSubscribedToArrayLoading] = useState(true);
  useEffect(() => {
    if (authUser) {
      setSubscribedToArray(
        authUser.subscriptions.map(subscription => subscription.subscribedTo.id)
      );
    }
    setSubscribedToArrayLoading(false);
  }, [authUser]);

  const handleToggleSubscribe = async () => {
    if (!authUser) return fireToast("info", "Please Login First");
    await dispatch(toggleSubscribe(userId, authUserAlreadySubscribed));
    fireToast("success", `Subscription ${authUserAlreadySubscribed ? "removed" : "added"}`);
  };

  return (
    <div className="ml-auto order-1 md:order-2">
      {subscribedToArrayLoading ? (
        <Skeleton height={40} width={120} />
      ) : (
        <Button
          onClick={handleToggleSubscribe}
          disabled={loading}
          variant={authUserAlreadySubscribed ? "gray" : "red"}
          className="mb-2 flex items-center"
        >
          {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}
          {authUserAlreadySubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      )}
    </div>
  );
};

SubscriptionButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SubscriptionButton;
