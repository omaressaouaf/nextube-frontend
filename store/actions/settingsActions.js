import axios from "axios";
import { fireToast } from "../../global/helpers";
import { setAuthData } from "./authActions";
import { clearLoading, clearServerErrors, handleServerError, setLoading } from "./uiActions";

export const updateProfile =
  ({ channelName, email }) =>
  async dispatch => {
    const component = "ProfileForm";
    try {
      dispatch(clearServerErrors());
      dispatch(setLoading(component));
      const { data } = await axios.put("/settings/profile", { channelName, email });
      dispatch(setAuthData(data));
      fireToast("success", "Profile Saved successfully");
    } catch (err) {
      dispatch(handleServerError(err, component));
    } finally {
      dispatch(clearLoading(component));
    }
  };
