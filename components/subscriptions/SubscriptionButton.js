import { useDispatch, useSelector } from "react-redux";
import Button from "../base/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { toggleSubscribe } from "../../store/actions/usersActions";
import { fireToast } from "../../global/helpers";

const SubscriptionButton = ({ userId }) => {
  // redux
  const [authUser, loading] = useSelector(state => [
    state.authReducer.authUser,
    state.uiReducer.loadings[`SubscriptionButton${userId}`],
  ]);
  const dispatch = useDispatch();

  const [subscribedToArray, setSubscribedToArray] = useState([]);
  const authUserAlreadySubscribed = subscribedToArray.includes(userId);
  useEffect(() => {
    if (authUser) {
      setSubscribedToArray(
        authUser.subscriptions.map(subscription => subscription.subscribedTo.id)
      );
    }
  }, [authUser]);

  const handleToggleSubscribe = () => {
    if (!authUser) return fireToast("info", "Please Login First");
    dispatch(toggleSubscribe(userId, authUserAlreadySubscribed));
  };

  return (
    <div className="ml-auto order-1 md:order-2">
      <Button
        onClick={handleToggleSubscribe}
        disabled={loading}
        className={`mb-2 flex items-center ${authUserAlreadySubscribed ? "btn-gray" : "btn-red"}`}
      >
        {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}
        {authUserAlreadySubscribed ? "Subscribed" : "Subscribe"}
      </Button>
    </div>
  );
};

SubscriptionButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SubscriptionButton;
