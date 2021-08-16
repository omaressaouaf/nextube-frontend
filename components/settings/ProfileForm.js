import useValidation from "../../hooks/useValidation";
import Alert from "../base/Alert";
import Button from "../base/Button";
import TextField from "../base/TextField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/actions/settingsActions";

const ProfileForm = () => {
  // redux
  const [authUser, loading, serverError] = useSelector(state => [
    state.authReducer.authUser,
    state.uiReducer.loadings["ProfileForm"],
    state.uiReducer.serverErrors.ProfileForm,
  ]);
  const dispatch = useDispatch();

  // form validation
  const { registerInput, wrapHandleSubmit, errors } = useValidation({
    schema: {
      channelName: yup.string().required("Channel Name is required"),
      email: yup.string().required("Email is required"),
    },
    defaultValues: {
      channelName: authUser.channelName,
      email: authUser.email,
    },
  });

  const handleSubmit = data => {
    dispatch(updateProfile(data));
  };

  return (
    <form onSubmit={wrapHandleSubmit(handleSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white dark:bg-lighterBlack space-y-6 sm:p-6">
          {serverError && (
            <Alert variant="red" icon="fa fa-info-circle">
              {serverError}
            </Alert>
          )}

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Channel Name</label>
              <div className="mt-1 rounded-md">
                <TextField
                  {...registerInput("channelName")}
                  error={errors.channelName ? true : false}
                  helperText={errors.channelName && errors.channelName.message}
                  placeholder="Enter Channel Name"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="mt-1 rounded-md">
                <TextField
                  {...registerInput("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email && errors.email.message}
                  placeholder="Enter Email"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-darkGray text-right sm:px-6">
          <Button disabled={loading} type="submit" variant="blue">
            {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
