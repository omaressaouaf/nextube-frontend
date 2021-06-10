import "nprogress/nprogress.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/globals.css";
import "../global/bootstrap";
import Head from "next/head";
import withStore from "../components/HOC/withStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "../store/actions/authActions";

function MyApp({ Component, pageProps }) {
  const authPending = useSelector(state => state.authReducer.authPending);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") dispatch(refreshToken());
  }, []);

  return (
    <>
      <Head>
        <title>NexTube</title>
        <meta name="description" content="A video streaming app where you can share your videos" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {authPending && <div id="preloader"></div>}
      <Component {...pageProps} />
    </>
  );
}

export default withStore(MyApp);
