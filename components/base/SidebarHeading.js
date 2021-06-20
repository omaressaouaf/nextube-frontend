import PropTypes from "prop-types";

const SidebarHeading = ({ title }) => {
  return <div className="uppercase px-6 text-sm my-5">{title}</div>;
};

SidebarHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SidebarHeading;
