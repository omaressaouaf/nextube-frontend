import useValidation from "../../hooks/useValidation";
import Alert from "../base/Alert";
import Button from "../base/Button";
import TextField from "../base/TextField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../store/actions/settingsActions";

const PasswordForm = () => {
  // redux
  const [authUser, loading, serverError] = useSelector(state => [
    state.authReducer.authUser,
    state.uiReducer.loadings["PasswordForm"],
    state.uiReducer.serverErrors.PasswordForm,
  ]);
  const dispatch = useDispatch();

  // form validation
  const { registerInput, wrapHandleSubmit, errors, reset } = useValidation({
    schema: {
      currentPassword: yup
        .string()
        .required("Current Password is required")
        .min(8, "Password should at least be 8 characters"),
      newPassword: yup
        .string()
        .required("New Password is required")
        .min(8, "Password should at least be 8 characters"),
      newPasswordConfirmation: yup
        .string()
        .required("Confirmation is required")
        .oneOf([yup.ref("newPassword")], "Confirmation must match new Password"),
    },
  });

  const handleSubmit = data => {
    dispatch(updatePassword(data))
      .then(() => reset())
      .catch(() => {});
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
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <div className="mt-1 rounded-md">
                <TextField
                  {...registerInput("currentPassword")}
                  type="password"
                  error={errors.currentPassword ? true : false}
                  helperText={errors.currentPassword && errors.currentPassword.message}
                  placeholder="Enter Current Password"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium mb-2">New Password</label>
              <div className="mt-1 rounded-md">
                <TextField
                  {...registerInput("newPassword")}
                  type="password"
                  error={errors.newPassword ? true : false}
                  helperText={errors.newPassword && errors.newPassword.message}
                  placeholder="Enter New Password"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Confirmation</label>
              <div className="mt-1 rounded-md">
                <TextField
                  {...registerInput("newPasswordConfirmation")}
                  type="password"
                  error={errors.newPasswordConfirmation ? true : false}
                  helperText={
                    errors.newPasswordConfirmation && errors.newPasswordConfirmation.message
                  }
                  placeholder="Enter New Password Confirmation"
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

export default PasswordForm;
