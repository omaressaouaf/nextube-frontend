import PropTypes from "prop-types";

const variantClasses = {
  blue: "text-white bg-blue-600 focus:ring-blue-200",
  red: "text-white bg-red-600 focus:ring-red-200",
  gray: "text-gray-700 bg-gray-300 focus:ring-gray-200",
};

const Button = ({ className, variant, children, ...otherProps }) => {
  return (
    <button
      className={`${variantClasses[variant]} text-sm uppercase px-5 py-2 rounded-sm shadow-md transition-all focus:outline-none focus:ring-2 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-default ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["red", "blue", "gray"]).isRequired,
  children: PropTypes.any,
};

export default Button;
