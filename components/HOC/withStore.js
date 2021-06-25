import { Provider } from "react-redux";
import store from "../../store";

const withStore = WrappedComponent => {
  const StoreWrapper = ({ children, ...props }) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props}>{children}</WrappedComponent>
      </Provider>
    );
  };
  StoreWrapper.getInitialProps = WrappedComponent.getInitialProps;

  return StoreWrapper;
};

export default withStore;
