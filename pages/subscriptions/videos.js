import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Divider from "../../components/base/Divider";
import SubscriptionVideoItem from "../../components/subscriptions/SubscriptionVideoItem";
import { serializeServerError } from "../../global/helpers";
import { handleServerError } from "../../store/actions/uiActions";
import Link from "next/link";
import Alert from "../../components/base/Alert";
import withAuth from "../../components/HOC/withAuth";

const SubscriptionsVideosPage = ({ subscriptionsVideos, serverError }) => {
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "index"));
    }
  }, []);

  return (
    <div className="relative mt-2">
      <div className="absolute right-0">
        <Link href="/subscriptions">
          <a className="uppercase font-semibold text-blue-600">Manage</a>
        </Link>
      </div>
      {!subscriptionsVideos.length && (
        <Alert variant="gray" className="font-semibold">
          No Subscriptions at the moment .
          <Link href="/">
            <a className="ml-1 text-blue-500">Explore</a>
          </Link>
        </Alert>
      )}
      {subscriptionsVideos.map(subscription => {
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
  let subscriptionsVideos = [];
  let serverError = null;
  try {
    const { data } = await axios.get("/subscriptions/videos");
    subscriptionsVideos = data.subscriptionsVideos;
  } catch (err) {
    serverError = serializeServerError(err);
  }
  return {
    props: {
      subscriptionsVideos,
      serverError,
    },
  };
};

export default withAuth(SubscriptionsVideosPage);
