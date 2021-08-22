import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/base/Avatar";
import SubscriptionButton from "../../components/subscriptions/SubscriptionButton";
import { fireToast, formatDateNormal } from "../../global/helpers";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../base/Button";
import { updateAvatar } from "../../store/actions/settingsActions";
import { useState } from "react";
import { useEffect } from "react";

const ChannelTopBar = ({ user }) => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);
  const dispatch = useDispatch();

  const router = useRouter();
  const tabsItems = [
    {
      title: "Home",
      pathname: `/channels/${user.channelName}`,
      route: "/channels/[channelName]",
    },
  ];
  if (authUser && authUser.id === user.id) {
    tabsItems.push({ title: "Studio", pathname: `/videos/studio`, route: "/studio" });
    tabsItems.push({ title: "Settings", pathname: `/settings`, route: "/settings" });
  }

  const [userAvatar, setUserAvatar] = useState(user.avatar);
  useEffect(() => {
    setUserAvatar(user.avatar);
  }, [user]);
  const avatarIsValid = file => {
    return file && (file.type == "image/jpeg" || file.type == "image/png");
  };

  const handleAvatarChange = e => {
    const selectedFile = e.target.files[0];
    if (!avatarIsValid(selectedFile)) return fireToast("error", "Avatar must be jpg or png");

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    dispatch(updateAvatar(formData))
      .then(newAvatar => setUserAvatar(newAvatar))
      .catch(() => {});
    e.target.value = "";
  };
  return (
    <div className="channel-topbar mb-8 min-w-full shadow bg-white dark:bg-lighterBlack">
      <div className="flex flex-col pt-10 px-12 space-y-4 md:space-y-0 md:flex-row items-end md:items-center justify-between">
        <div className=" flex items-center gap-2">
          <div className="group relative">
            <Avatar src={userAvatar} size={120} className="mr-2" />
            {authUser && authUser.id === user.id && (
              <>
                <label
                  htmlFor="file-avatar"
                  className="cursor-pointer absolute bottom-2 right-0 bg-red-600 text-white p-2 flex items-center justify-center rounded-full"
                >
                  <i className="fa fa-pencil-alt"></i>
                </label>
                <input
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="file-avatar"
                  type="file"
                />
              </>
            )}
          </div>

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
                  <Button variant="blue">
                    <i className="fa fa-sliders-h mr-2"></i> Manage Videos
                  </Button>
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
                item.pathname === router.asPath || item.route === router.route
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
