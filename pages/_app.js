import "../styles/globals.css";
import "nprogress/nprogress.css";
import "../bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import Head from "next/head";
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

  return (
    <>
      {authPending && <div id="preloader"></div>}
      <Component {...pageProps} />
    </>
  );
}

export default withStore(MyApp);
