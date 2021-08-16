import { useSelector } from "react-redux";
import Avatar from "../../components/base/Avatar";
import SubscriptionButton from "../../components/subscriptions/SubscriptionButton";
import { formatDateNormal } from "../../global/helpers";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../base/Button";

const ChannelTopBar = ({ user }) => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);

  const router = useRouter();
  const tabsItems = [
    {
      title: "Home",
      pathname: `/channels/${user.channelName}`,
    },
  ];
  if (authUser && authUser.id === user.id) {
    tabsItems.push({ title: "Studio", pathname: `/videos/studio` });
    tabsItems.push({ title: "Settings", pathname: `/settings` });
  }

  return (
    <div className="channel-topbar mb-8 min-w-full shadow bg-white dark:bg-lighterBlack">
      <div className="flex flex-col pt-10 px-12 space-y-4 md:space-y-0 md:flex-row items-end md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar src={user.avatar} width={90} height={90} className="mr-2" />

          <div>
            <div className="text-gray-800 dark:text-gray-200 font-semibold">
              {user.channelName}
              <i className="fa fa-check-circle transition text-blue-500 ml-2 mr-1"></i>
            </div>
            <div className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:gray-200">
              {user.subscribersCount} subscribers &middot; Joined On{" "}
              {formatDateNormal(user.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center">
          {authUser &&
            (authUser?.id !== user.id ? (
              <SubscriptionButton userId={user.id} />
            ) : (
              <Link href="/videos/studio">
                <a>
                  <Button variant="blue">Manage Videos</Button>
                </a>
              </Link>
            ))}
        </div>
      </div>
      <div className="tabs flex items-center gap-8 px-12 pt-7">
        {tabsItems.map(item => {
          return (
            <div
              key={item.pathname}
              className={`py-2 px-4 dark:text-gray-50 dark:border-gray-400 uppercase text-sm font-semibold ${
                item.pathname == router.asPath
                  ? "border-b-2 border-gray-600 text-gray-800"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Link href={item.pathname}>
                <a>{item.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ChannelTopBar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ChannelTopBar;
