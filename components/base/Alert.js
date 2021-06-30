import PropTypes from "prop-types";

const variantClasses = {
  red: "text-white bg-red-600",
  gray: "text-black dark:text-white",
};

const Alert = ({ className, variant, icon, children }) => {
  return (
    <div
      className={`${variantClasses[variant]} text-sm px-6 py-4 border-0 rounded relative mb-4 shadow-md ${className} `}
    >
      {icon && (
        <span className="text-xl inline-block mr-5 align-middle">
          <i className={icon} />
        </span>
      )}
      <span className="inline-block align-middle mr-8">{children}</span>
    </div>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["red", "gray"]).isRequired,
  icon: PropTypes.string,
  children: PropTypes.any,
};

export default Alert;
