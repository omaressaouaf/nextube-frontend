import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleServerError } from "../store/actions/uiActions";
import Link from "next/link";
import Alert from "../components/base/Alert";
import WatchLaterSidebar from "../components/watchlaters/WatchLaterSidebar";
import { serializeServerError } from "../global/helpers";
import withAuth from "../components/HOC/withAuth";
import MetaData from "../components/layouts/MetaData";
import { useState } from "react";
import { setWatchLaters } from "../store/actions/watchLatersActions";
import WatchLaterItem from "../components/watchlaters/WatchLaterItem";

const watchLater = ({ watchLaters, serverError }) => {
  // redux
  const watchLatersRedux = useSelector(state => state.watchLatersReducer.watchLaters);
  const dispatch = useDispatch();

  const [watchLatersToRender, setWatchLatersToRender] = useState([...watchLaters]);

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "watchLater"));
    }
    dispatch(setWatchLaters(watchLaters));
    return () => {
      dispatch(setWatchLaters([]));
    };
  }, []);

  useEffect(() => {
    setWatchLatersToRender([...watchLatersRedux]);
  }, [watchLatersRedux]);

  return (
    <div className="mt-2">
      <MetaData title="Watch Later" />
      <p className="font-semibold mb-6">Watch Later</p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="col-span-2 order-2 xl:order-1">
          {!watchLatersToRender.length && (
            <Alert variant="gray" className="font-semibold">
              No Watch later videos For Now .
              <Link href="/">
                <a className="ml-1 text-blue-500">Explore</a>
              </Link>
            </Alert>
          )}
          {watchLatersToRender.map(watchLater => {
            return <WatchLaterItem watchLater={watchLater} key={watchLater.id} />;
          })}
        </div>
        {watchLatersToRender.length > 0 && (
          <div className="order-1 xl:order-2">
            <WatchLaterSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async context => {
  let watchLaters = [];
  let serverError = null;
  try {
    const { data } = await axios.get("/watchlaters");
    watchLaters = data.watchLaters;
  } catch (err) {
    serverError = serializeServerError(err);
  }
  return {
    props: {
      watchLaters,
      serverError,
    },
  };
};

export default withAuth(watchLater);
