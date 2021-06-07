import PropTypes from "prop-types";

const Alert = ({ className, icon, children }) => {
  return (
    <div class={`text-white text-sm px-6 py-4 border-0 rounded relative mb-4 shadow-md ${className} `}>
      {icon && (
        <span class="text-xl inline-block mr-5 align-middle">
          <i class={icon} />
        </span>
      )}
      <span class="inline-block align-middle mr-8">{children}</span>
    </div>
  );
};

Alert.prototype = {
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.any,
};

export default Alert;
