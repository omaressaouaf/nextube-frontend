import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleServerError } from "../store/actions/uiActions";
import Link from "next/link";
import Alert from "../components/base/Alert";
import HistorySidebar from "../components/history/HistorySidebar";
import HistoriesPerDayItem from "../components/history/HistoriesPerDayItem";
import { serializeServerError } from "../global/helpers";
import withAuth from "../components/HOC/withAuth";
import { setHistories } from "../store/actions/historiesActions";
import { useRouter } from "next/router";

const history = ({ historiesPerDay, serverError }) => {
  // redux
  const historiesPerDayRedux = useSelector(state => state.historiesReducer.historiesPerDay);
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "history"));
    }
    dispatch(setHistories(historiesPerDay));
  }, [router.query]);

  return (
    <div className="mt-2">
      <p className="font-semibold mb-6">Watch History</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-2 order-2 md:order-1">
          {!historiesPerDayRedux.length && (
            <Alert variant="gray" className="font-semibold">
              No History For Now .
              <Link href="/">
                <a className="ml-1 text-blue-500">Explore</a>
              </Link>
            </Alert>
          )}
          {historiesPerDayRedux.map(historiesItem => {
            return (
              <HistoriesPerDayItem key={historiesItem.updatedAtDay} historiesItem={historiesItem} />
            );
          })}
        </div>
        <div className="order-1 md:order-2">
          <HistorySidebar />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async context => {
  let historiesPerDay = [];
  let serverError = null;
  try {
    const { query } = context.query;
    const { data } = query
      ? await axios.get(`/histories/search`, { params: { query } })
      : await axios.get("/histories/");
    historiesPerDay = data.historiesPerDay;
  } catch (err) {
    serverError = serializeServerError(err);
  }
  return {
    props: {
      historiesPerDay,
      serverError,
    },
  };
};

export default withAuth(history);
