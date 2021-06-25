import "nprogress/nprogress.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/globals.css";
import "../global/bootstrap";
import withStore from "../components/HOC/withStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuthData } from "../store/actions/authActions";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "../components/layouts/Layout";
import App from "next/app";
import { axios } from "../global/bootstrap";
import { onServer } from "../global/helpers";

const MyApp = ({ Component, pageProps, authData }) => {
  // redux
  const authPending = useSelector(state => state.authReducer.authPending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthData(authData));
  }, []);
  return (
    <ThemeProvider>
      <Layout>
        {authPending && <div id="preloader"></div>}
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  const { req, res } = appContext.ctx;
  let authData = {};

  /* refresh token on
   1. page reload
   2. when navigating to a page that has getServerSideProps and the axios auth header is undefined or malformed (Bearer undefined )
   3. auth header end date(access token) expired
     README : server memory glitch : due to the server keeping the auth headerS even after page refresh the auth header will be something like Bearer undefined )
  */

  if (onServer()) {
    /* first refresh set axios auth headers back to undefined */
    if (!req.url.startsWith("/_next/data")) {
      axios.defaults.headers.common["Authorization"] = undefined;
      axios.defaults.headers.common["Authorization-End-Date"] = undefined;
    }
    const axiosAuthHeader = axios.defaults.headers.common["Authorization"];
    const axiosAuthEndDateHeader = axios.defaults.headers.common["Authorization-End-Date"];
    if (
      typeof axiosAuthHeader === "undefined" ||
      axiosAuthHeader === "Bearer undefined" ||
      (axiosAuthEndDateHeader && axiosAuthEndDateHeader - 10000 <= Date.now())
    ) {
      try {
        const apiRes = await fetch("http://localhost:5000/auth/refreshtoken", {
          method: "put",
          headers: { cookie: req.headers.cookie },
          credentials: "include",
        });
        /* forward the cookie sent by express from next js server to the client */
        res.setHeader("Set-Cookie", apiRes.headers.get("set-cookie") ?? "");
        const data = await apiRes.json();
        /* set axios default in the server because the axios instance header in the server is not the same as client(different memories) */
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        axios.defaults.headers.common["Authorization-End-Date"] = data.accessTokenEndDate;

        authData = data;
      } catch (err) {}
    }
  }
  return { ...appProps, authData };
};

export default withStore(MyApp);
