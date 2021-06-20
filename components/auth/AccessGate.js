import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

const AccessGate = ({ abilityName, payload, children }) => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);

  const [abilities] = useState({
    "modify-comment": comment => {
      return authUser.id === comment.user.id;
    },
  });

  const can = (abilityName, payload) => {
    if (!authUser) return false;
    if (abilities[abilityName]) return abilities[abilityName](...payload);
    return false;
  };

  if (can(abilityName, payload)) return <>{children}</>;

  return null;
};

AccessGate.defaultProps = {
  payload: null,
};
AccessGate.propTypes = {
  abilityName: PropTypes.string,
  payload: PropTypes.array,
  children: PropTypes.any.isRequired,
};

export default AccessGate;
