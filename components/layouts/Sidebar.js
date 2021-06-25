import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import SidebarItem from "../base/SidebarItem";
import SidebarHeading from "../base/SidebarHeading";

const Sidebar = () => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);

  // Subscriptions
  const [showMoreSubscriptions, setShowMoreSubscriptions] = useState(false);
  const shownSubscriptionsNumber = showMoreSubscriptions ? authUser.subscriptions.length : 1;
  const hiddenSubscriptionsNumber = authUser?.subscriptions.length - shownSubscriptionsNumber;

  const renderShowMoreLessSubscriptionsButtons = () => {
    return (
      <div
        onClick={() => setShowMoreSubscriptions(prevVal => !prevVal)}
        className="flex items-center py-3 px-6 mb-2 cursor-pointer transition hover:bg-gray-100 dark:hover:bg-darkGray"
      >
        <i
          className={`fa-lg fa fa-fw  mr-6 text-gray-600 ${
            showMoreSubscriptions ? "fa-caret-up" : "fa-caret-down"
          }`}
        ></i>
        <span className="text-sm capitalize">
          {showMoreSubscriptions ? "Show Less" : `Show ${hiddenSubscriptionsNumber} More`}
        </span>
      </div>
    );
  };

  const { sidebarOpen } = useTheme();
  const router = useRouter();

  return (
    <div
      className={`sidebar pb-6 bg-white dark:bg-lighterBlack  shadow-lg h-screen top-16 overflow-hidden hover:overflow-auto has-cool-scrollbar transition-all duration-75 z-40 ${
        !sidebarOpen && "-ml-80"
      }
      ${router.pathname == "/videos/[id]" ? "fixed w-66" : "fixed w-66 lg:sticky lg:w-80"}`}
    >
      <div className="mb-6 text-black dark:text-gray-200">
        {/* Home */}
        <SidebarItem title="Home" pathname="/" icon="fa fa-home" />
        <SidebarItem title="Trending" pathname="/er" icon="fa fa-fire" />
        <SidebarItem title="Subscriptions" pathname="/subscriptions" icon="fa fa-list" />

        {/* Library */}
        <SidebarHeading title="Library" />
        <SidebarItem title="Subscriptions" pathname="/reer" icon="fa fa-list" />
        <SidebarItem title="Watch Later" pathname="/er" icon="fa fa-clock" />
        <SidebarItem title="Liked Videos" pathname="/er" icon="fa fa-thumbs-up" />

        {/* Subscriptions */}

        <SidebarHeading title="Subscriptions" />
        {authUser.subscriptions.slice(0, shownSubscriptionsNumber).map(({ subscribedTo }) => (
          <SidebarItem
            key={subscribedTo.id}
            title={subscribedTo.channelName}
            pathname="/reer"
            avatar={subscribedTo.avatar}
          />
        ))}
        {authUser.subscriptions.length > 1 && renderShowMoreLessSubscriptionsButtons()}

        {/* More */}
        <SidebarHeading title="More" />
        <SidebarItem title="Settings" pathname="/er" icon="fa fa-cog" />
        <SidebarItem title="Help" pathname="/er" icon="fa fa-question-circle" />
      </div>

      <div className="px-6 text-sm text-gray-600 dark:text-gray-200">&copy; 2020 NexTube, LLC</div>
    </div>
  );
};

export default Sidebar;
