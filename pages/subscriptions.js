import { axios } from "../global/bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Divider from "../components/base/Divider";
import SubscriptionVideoItem from "../components/subscriptions/SubscriptionVideoItem";
import { serializeServerError } from "../global/helpers";
import { handleServerError } from "../store/actions/uiActions";
import Link from "next/link";
import Alert from "../components/base/Alert";
import withAuth from '../components/HOC/withAuth'

const subscriptions = ({ subscriptionsWithVideos, serverError }) => {
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "index"));
    }
  }, []);

  return (
    <div>
      {!subscriptionsWithVideos.length && (
        <Alert className="font-semibold">
          No Subscriptions at the moment .
          <Link href="/">
            <a className="ml-1 text-blue-500">Explore</a>
          </Link>
        </Alert>
      )}
      {subscriptionsWithVideos.map(subscription => {
        return (
          <div key={subscription._id}>
            <SubscriptionVideoItem subscription={subscription} />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async context => {
  let subscriptionsWithVideos = [];
  let serverError = null;
  try {
    const { data } = await axios.get("/subscriptions/videos");
    subscriptionsWithVideos = data.subscriptionsWithVideos;
  } catch (err) {
    serverError = serializeServerError(err);
  }
  return {
    props: {
      subscriptionsWithVideos,
      serverError,
    },
  };
};

export default withAuth(subscriptions);
