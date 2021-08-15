import { forwardRef } from "react";
import PropTypes from "prop-types";

const Select = forwardRef(({ className, options, ...otherProps }, ref) => {
  return (
    <div className="relative inline-block w-full text-gray-700">
      <select
        ref={ref}
        {...otherProps}
        className={`w-full px-3 py-2 shadow-sm border border-gray-300 placeholder-gray-500 text-sm text-gray-900 dark:bg-lightBlack dark:border-darkGray dark:text-gray-200 rounded-md focus:outline-none focus:ring-1 ${className}`}
      >
        {options}
      </select>
    </div>
  );
});

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.node.isRequired,
};

export default Select;
