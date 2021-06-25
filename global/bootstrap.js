import Axios from "axios";
import Router from "next/router";
import NProgress from "nprogress";
import store from "../store";
import { refreshToken } from "../store/actions/authActions";
import { clearServerErrors } from "../store/actions/uiActions";

// Nprogress config
NProgress.configure({ trickleRate: 0.05, trickleSpeed: 20 });
Router.events.on("routeChangeStart", NProgress.inc);
Router.events.on("routeChangeComplete", () => {
  store.dispatch(clearServerErrors());
  NProgress.done();
});
Router.events.on("routeChangeError", NProgress.done);

// Axios instance with defaults
export const axios = Axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// axios refresh token
axios.interceptors.request.use(async config => {
  try {
    const accessTokenEndDate = store.getState().authReducer.accessTokenEndDate;
    if (
      accessTokenEndDate &&
      accessTokenEndDate - 5000 <= Date.now() &&
      config.url != "/auth/refreshtoken"
    ) {
      const newAccessToken = await store.dispatch(refreshToken());
      const modifiedConfig = {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${newAccessToken}` },
      };
      return modifiedConfig;
    }
  } finally {
    return config;
  }
});
