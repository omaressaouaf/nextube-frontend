import { Provider } from "react-redux";
import store from "../../store";

const withStore = WrappedComponent => {
  return props => (
    <Provider store={store}>
      <WrappedComponent {...props} />
    </Provider>
  );
};

export default withStore;
