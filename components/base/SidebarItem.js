import PropTypes from "prop-types";
import Link from "next/link";
import Avatar from "../base/Avatar";
import { useRouter } from "next/router";

const SidebarItem = ({ title, pathname, avatar, icon }) => {
  const router = useRouter();

  return (
    <Link href={pathname}>
      <a
        className={`flex items-center py-3 px-6 mb-2  transition ${
          router.pathname == pathname
            ? "bg-gray-200 dark:bg-darkGray"
            : "hover:bg-gray-100 dark:hover:bg-darkGray"
        }`}
      >
        {avatar && <Avatar src={avatar} size={37} className="mr-4" />}
        {icon && (
          <i
            className={`fa-lg fa-fw mr-6 ${icon} ${
              router.pathname == pathname ? "text-red-600 dark:text-gray-200" : "text-gray-600"
            }`}
          ></i>
        )}

        <span className="font-semibold text-sm">{title}</span>
      </a>
    </Link>
  );
};

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  icon: PropTypes.string,
};

export default SidebarItem;
