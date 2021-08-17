import axios from "axios";
import nProgress from "nprogress";
import { fireToast } from "../../global/helpers";
import { setAuthData } from "./authActions";
import { clearLoading, clearServerErrors, handleServerError, setLoading } from "./uiActions";

export const updateProfile = profileData => async dispatch => {
  const component = "ProfileForm";
  try {
    dispatch(clearServerErrors());
    dispatch(setLoading(component));
    const { data } = await axios.put("/settings/profile", profileData);
    dispatch(setAuthData(data));
    fireToast("success", "Profile Saved successfully");
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const updatePassword =
  ({ currentPassword, newPassword }) =>
  dispatch => {
    return new Promise(async (resolve, reject) => {
      const component = "PasswordForm";
      try {
        dispatch(clearServerErrors());
        dispatch(setLoading(component));
        await axios.put("/settings/password", { currentPassword, newPassword });
        fireToast("success", "Password Updated successfully");
        resolve();
      } catch (err) {
        dispatch(handleServerError(err, component));
        reject();
      } finally {
        dispatch(clearLoading(component));
      }
    });
  };

export const updateAvatar = formData => dispatch => {
  return new Promise(async (resolve, reject) => {
    const component = "ChannelTopBar";
    try {
      nProgress.start();
      const { data } = await axios.put("/settings/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8;",
        },
      });

      dispatch(setAuthData(data));
      fireToast("success", "Avatar Updated successfully");
      resolve(data.user.avatar);
    } catch (err) {
      dispatch(handleServerError(err, component));
      reject();
    } finally {
      nProgress.done();
    }
  });
};
