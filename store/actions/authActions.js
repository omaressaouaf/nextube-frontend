import axios from "axios";
import { clearLoading, handleServerError, setLoading } from "./uiActions";
import { authActionTypes } from "./types";
import { fireToast } from "../../global/helpers";

export const refreshToken = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put("/auth/refreshtoken");
      dispatch({
        type: authActionTypes.SET_AUTH,
        payload: {
          user: data.user,
          accessToken: data.accessToken,
          accessTokenEndDate: data.accessTokenEndDate,
        },
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
      resolve(data.accessToken);
    } catch (err) {
      dispatch({
        type: authActionTypes.SET_AUTH,
        payload: {
          user: null,
          accessToken: null,
          accessTokenEndDate: null,
        },
      });
      reject();
    }
  });
};

export const register = (channelName, email, password, router) => async dispatch => {
  const component = "signup";
  try {
    dispatch(setLoading(component));
    await axios.post("/auth/register", { channelName, email, password });
    router.push("/signin");
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const login = (email, password) => async dispatch => {
  const component = "signin";
  try {
    dispatch(setLoading(component));
    const { data } = await axios.post("/auth/login", { email, password });
    dispatch({
      type: authActionTypes.SET_AUTH,
      payload: {
        user: data.user,
        accessToken: data.accessToken,
        accessTokenEndDate: data.accessTokenEndDate,
      },
    });
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.put("/auth/logout");
    dispatch({
      type: authActionTypes.SET_AUTH,
      payload: {
        user: null,
        accessToken: null,
        accessTokenEndDate: null,
      },
    });
  } catch (err) {
    fireToast("error", "Could not log you out ! try again");
  }
};
