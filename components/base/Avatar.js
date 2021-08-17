import PropTypes from "prop-types";
import Image from "next/image";

const Avatar = ({ className = "", src, size = 50, ...restProps }) => {
  return (
    <div className={className}>
      <Image
        src={src}
        alt="avatar"
        className="rounded-full object-cover"
        layout="fixed"
        width={size}
        height={size}
        {...restProps}
      />
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.number,
};

export default Avatar;
