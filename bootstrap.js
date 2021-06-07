import axios from "axios";
import Router from "next/router";
import nProgress from "nprogress";
import store from './store'
import { clearServerErrors } from "./store/actions/uiActions";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete",() => {
    store.dispatch(clearServerErrors())
    nProgress.done()
});
Router.events.on("routeChangeError", nProgress.done);

axios.defaults.withCredentials = true
axios.defaults.baseURL= "http://localhost:5000"
