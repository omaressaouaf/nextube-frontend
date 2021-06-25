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

  /* refresh token on page reload or when navigating to a page that has getServerSideProps and the axios auth header is undefined or malformed due to server memory glitch (because even if we set the axios auth header in the client it will be undefined in the server (different memories) so we set it in the server as well. but due to the server keeping the auth header even after page refresh the auth header will be something like Bearer undefined ) */

  const axiosAuthHeader = axios.defaults.headers.common["Authorization"];
  if (
    onServer() &&
    (typeof axiosAuthHeader === "undefined" || axiosAuthHeader === "Bearer undefined")
  ) {
    try {
      const apiRes = await fetch("http://localhost:5000/auth/refreshtoken", {
        method: "put",
        headers: { cookie: req.headers.cookie },
        credentials: "include",
      });
      // forward the cookie sent by express from next js server to the client
      res.setHeader("Set-Cookie", apiRes.headers.get("set-cookie") ?? "");
      const data = await apiRes.json();
      // set axios default in the server because the axios instance header in the server is not the same as client(different memories)
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

      authData = data;
    } catch (err) {}
  }
  return { ...appProps, authData };
};

export default withStore(MyApp);
