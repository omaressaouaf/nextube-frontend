import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "../base/Avatar";

export default function Sidebar({ sidebarClosed, setSidebarClosed }) {
  const [menuItems] = useState({
    home: [
      {
        title: "Home",
        icon: "fa fa-home",
        pathname: "/",
      },
      {
        title: "Trending",
        icon: "fa fa-fire",
        pathname: "/trending",
      },
      {
        title: "Subscriptions",
        icon: "fa fa-list",
        pathname: "/subscribtions",
      },
    ],
    library: [
      {
        title: "Subscriptions",
        icon: "fa fa-folder-plus",
        pathname: "/subscribtions",
      },
      {
        title: "Watch Later",
        icon: "fa fa-clock",
        pathname: "/watchlater",
      },
      {
        title: "Liked Videos",
        icon: "fa fa-thumbs-up",
        pathname: "/likedvideos",
      },
    ],
    subscribtions: [
      {
        title: "John doe",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        pathname: "/john",
      },
      {
        title: "Show 120 more",
        icon: "fa fa-chevron-down",
        pathname: "/subscribtions",
      },
    ],
    more: [
      {
        title: "Settings",
        icon: "fa fa-cog",
        pathname: "/settings",
      },
      {
        title: "Help",
        icon: "fa fa-question-circle",
        pathname: "/help",
      },
    ],
  });
  const router = useRouter();

  return (
    <>
      {/* sidebar Start */}
      <div
        className={`sidebar pb-6 bg-white shadow-lg h-screen top-16 overflow-hidden hover:overflow-auto has-cool-scrollbar transition-all duration-75 z-40 ${sidebarClosed && "-ml-80"}
      ${router.pathname == "/videos/[id]" ? "fixed w-66" : "fixed w-66 lg:sticky lg:w-80"}`}
      >
        {Object.keys(menuItems).map(key => {
          return (
            <div className="mb-6">
              {key != "home" && <div className="uppercase px-6  text-sm mb-4">{key}</div>}
              {menuItems[key].map(item => {
                return (
                  <Link href={item.pathname}>
                    <a className={`flex items-center py-3 px-6 mb-2 text-black transition ${router.pathname == item.pathname ? "bg-gray-200" : "hover:bg-gray-100"}`}>
                      {item.image ? <Avatar className="w-7 mr-6" /> : <i className={`fa-lg fa-fw  mr-6 ${item.icon} ${router.pathname == item.pathname ? "text-red-600" : "text-gray-600"}`}></i>}
                      <span className="font-semibold  text-sm">{item.title}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          );
        })}
        <div className="px-6 text-sm text-gray-600er">&copy; 2020 NexTube, LLC</div>
      </div>
      {/* sidebar End */}
    </>
  );
}
