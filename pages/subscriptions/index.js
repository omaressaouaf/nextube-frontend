import { useSelector } from "react-redux";
import Divider from "../../components/base/Divider";
import SubscriptionItem from "../../components/subscriptions/SubscriptionItem";
import Link from "next/link";
import Alert from "../../components/base/Alert";
import withAuth from "../../components/HOC/withAuth";
import store from "../../store";
import { useEffect } from "react";
import { useState } from "react";

const SubscriptionsPage = () => {
  // redux
  const [authUser] = useSelector(state => [state.authReducer.authUser]);

const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    setSubscriptions([...authUser.subscriptions]);
  }, []);

  return (
    <div className="mt-5">
      {!subscriptions.length && (
        <Alert variant="gray" className="font-semibold">
          No Subscriptions at the moment .
          <Link href="/">
            <a className="ml-1 text-blue-500">Explore</a>
          </Link>
        </Alert>
      )}
      {subscriptions.map(subscription => {
        return (
          <div key={subscription.id}>
            <SubscriptionItem subscription={subscription} />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default withAuth(SubscriptionsPage);
