import axios from "axios";
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

// axios defaults
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// axios refresh token
let pendingRequestsQueue = [];
let isRefreshing = false;

const onRefreshed = newAccessToken => {
  pendingRequestsQueue.map(cb => cb(newAccessToken));
  pendingRequestsQueue = [];
};

axios.interceptors.response.use(
  res => res,
  async error => {
    try {
      const originalRequest = error.config;

      if (error.response.data.message === "access token expired") {
        const retrial = new Promise(resolve => {
          pendingRequestsQueue.push(newAccessToken => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(axios(originalRequest));
          });
        });

        if (!isRefreshing) {
          isRefreshing = true;
          const newAccessToken = await store.dispatch(refreshToken());
          isRefreshing = false;
          onRefreshed(newAccessToken);
        }

        return retrial;
      }
      return Promise.reject(error);
    } catch {
      return Promise.reject(error);
    }
  }
);
