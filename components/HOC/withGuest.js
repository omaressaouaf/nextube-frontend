import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const authUser = useSelector(state => state.authReducer.authUser);
      const router = useRouter();
      if (authUser) {
        router.replace("/");
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
