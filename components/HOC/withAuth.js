import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import { onServer } from "../../global/helpers";

const withAuth = WrappedComponent => {
  return props => {
    const [authPending, authUser] = useSelector(state => [
      state.authReducer.authPending,
      state.authReducer.authUser,
    ]);

    if (authPending) return null;

    if (!authUser) {
      Router.replace("/signin");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
