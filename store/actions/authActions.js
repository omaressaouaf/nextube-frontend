import axios from "axios";
import { clearLoading, setLoading, setServerErrors } from "./uiActions";
import { authActionTypes } from "./types";

export const refreshToken = () => async dispatch => {
  try {
    const { data } = await axios.put("/auth/refreshtoken");
    dispatch({
      type: authActionTypes.SET_AUTH_USER,
      payload: {
        user: data.user,
        accessToken: data.accessToken,
      },
    });
    axios.defaults.headers.common["Authorization"] = data.accessToken;
  } catch (err) {
    dispatch({
      type: authActionTypes.SET_AUTH_USER,
      payload: {
        user: null,
        accessToken: null,
      },
    });
  }
};

export const register = (channelName, email, password , router) => async dispatch => {
  try {
    dispatch(setLoading("signup"));
    await axios.post("/auth/register", { channelName, email, password });
    router.push('/signin')
  } catch (err) {
    dispatch(setServerErrors("signup", err.response.data.message));
  } finally {
    dispatch(clearLoading("signup"));
  }
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch(setLoading("signin"));
    const { data } = await axios.post("/auth/login", { email, password });
    dispatch({
      type: authActionTypes.SET_AUTH_USER,
      payload: {
        user: data.user,
        accessToken: data.accessToken,
      },
    });
    axios.defaults.headers.common["Authorization"] = data.accessToken;
  } catch (err) {
    dispatch(setServerErrors("signin", err.response.data.message));
  } finally {
    dispatch(clearLoading("signin"));
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.put("/auth/logout");
    dispatch({
      type: authActionTypes.SET_AUTH_USER,
      payload: {
        user: null,
        accessToken: null,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
