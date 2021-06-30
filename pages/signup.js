import Link from "next/link";
import { useRouter } from "next/router";
import AuthCard from "../components/auth/AuthCard";
import Button from "../components/base/Button";
import TextField from "../components/base/TextField";
import MetaData from "../components/layouts/MetaData";
import withGuest from "../components/HOC/withGuest";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/authActions";
import * as yup from "yup";
import useValidation from "../hooks/useValidation";
import Alert from "../components/base/Alert";

const signup = () => {
  // redux
  const dispatch = useDispatch();
  const [loading, serverError] = useSelector(state => [
    state.uiReducer.loadings.signup,
    state.uiReducer.serverErrors.signup,
  ]);

  // form validation
  const { registerInput, wrapHandleSubmit, errors } = useValidation({
    channelName: yup.string().required("Channel name is required"),
    email: yup.string().required("Email is required").email("Enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    passwordConfirm: yup
      .string()
      .required("Confirmation is required")
      .oneOf([yup.ref("password")], "Password and Confirmation must match"),
  });

  const router = useRouter();
  const handleSubmit = ({ channelName, email, password }) => {
    dispatch(register(channelName, email, password, router));
  };

  return (
    <AuthCard title="Create an account">
      <MetaData title="Register" />
      <form
        onSubmit={wrapHandleSubmit(handleSubmit)}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <div className="space-y-5">
          {serverError && (
            <Alert className="bg-red-600" icon="fa fa-info-circle">
              {serverError}
            </Alert>
          )}
          <div>
            <TextField
              {...registerInput("channelName")}
              error={errors.channelName ? true : false}
              helperText={errors.channelName && errors.channelName.message}
              type="text"
              placeholder="Enter Channel name"
            />
          </div>
          <div>
            <TextField
              {...registerInput("email")}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
              type="text"
              placeholder="Enter Email address"
            />
          </div>
          <div>
            <TextField
              {...registerInput("password")}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <div>
            <TextField
              {...registerInput("passwordConfirm")}
              error={errors.passwordConfirm ? true : false}
              helperText={errors.passwordConfirm && errors.passwordConfirm.message}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/signin">
              <a className="font-medium text-blue-600 hover:text-blue-500">Already a member?</a>
            </Link>
          </div>
        </div>
        <div>
          <Button type="submit" className="btn-red w-full" disabled={loading}>
            {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}
            Register
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default withGuest(signup);
