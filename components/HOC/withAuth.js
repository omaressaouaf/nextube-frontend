import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const [authPending, authUser] = useSelector(state => [state.authReducer.authPending, state.authReducer.authUser]);

      const router = useRouter();
      if (!authPending && !authUser) {
        router.replace("/signin");
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
