import React from "react";
import PropTypes from "prop-types";

const TextField = React.forwardRef(({ className, error, helperText, helperTextColor, textarea, ...otherProps }, ref) => {
  const classes = `w-full px-3 py-2 shadow-sm border border-gray-300 placeholder-gray-500 text-sm text-gray-900 rounded-md focus:outline-none focus:ring-1 ${error ? "focus:ring-red-500" : "focus:ring-indigo-500  "} ${className}`;

  return (
    <>
      {textarea ? <textarea rows="5" ref={ref} {...otherProps} className={classes}></textarea> : <input ref={ref} {...otherProps} className={classes} />}
      {helperText && <span className={`text-xs ml-1 ${error ? "text-red-600" : helperTextColor}`}>{helperText}</span>}
    </>
  );
});

TextField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  helperTextColor: PropTypes.string,
  textarea: PropTypes.bool,
};

export default TextField;
