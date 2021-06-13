import PropTypes from "prop-types";

const Button = ({ className, children, ...otherProps }) => {
  return (
    <button
      className={`text-white text-sm uppercase px-5 py-2 rounded-sm shadow-md transition-all focus:outline-none focus:ring-2 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-default ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

Button.prototype = {
  className: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Button;
