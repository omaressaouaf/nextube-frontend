import PropTypes from "prop-types";

const Avatar = ({ className, src }) => {
  return (
    <img
      src={
        src ||
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      }
      alt="avatar"
      className={`rounded-full  ${className}`}
    />
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};

export default Avatar;
