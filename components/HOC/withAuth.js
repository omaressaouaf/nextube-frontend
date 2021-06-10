import Router from "next/router";
import { useSelector } from "react-redux";

const withAuth = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const [authPending, authUser] = useSelector(state => [state.authReducer.authPending, state.authReducer.authUser]);

      if (!authPending && !authUser) {
        Router.replace("/signin");
        return null;
      }
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
