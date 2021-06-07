import "../styles/globals.css";
import "nprogress/nprogress.css";
import "../bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import withStore from "../components/HOC/withStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "../store/actions/authActions";

function MyApp({ Component, pageProps }) {
  const authPending = useSelector(state => state.authReducer.authPending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  if (authPending) return <h2>Auth Pending ....</h2>;
  return <Component {...pageProps} />;
}

export default withStore(MyApp);
