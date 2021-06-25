import { axios } from "../../global/bootstrap";
import { clearLoading, handleServerError, setLoading } from "./uiActions";
import { authActionTypes } from "./types";
import { fireToast } from "../../global/helpers";

export const setAuthData =
  ({ user, accessToken, accessTokenEndDate }) =>
  dispatch => {
    dispatch({
      type: authActionTypes.SET_AUTH,
      payload: {
        user: user,
        accessToken: accessToken,
        accessTokenEndDate: accessTokenEndDate,
      },
    });

    // axios.defaults.headers.common["Authorization"] =
    //   typeof accessToken === "undefined" || !accessToken ? undefined : `Bearer ${accessToken}`;
  };

export const refreshToken = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put("/auth/refreshtoken");
      dispatch(setAuthData(data));
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
    dispatch(setAuthData(data));
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const logout = () => async dispatch => {
  try {
    axios.put("/auth/logout");
    dispatch(setAuthData({}));
    delete axios.defaults.headers.common["Authorization"];
  } catch (err) {
    fireToast("error", "Could not log you out ! try again");
  }
};
