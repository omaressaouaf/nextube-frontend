import "@fortawesome/fontawesome-free/css/all.css";
import Layout from "../components/layouts/Layout";
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import "../styles/globals.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete", nProgress.done);
Router.events.on("routeChangeError", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
