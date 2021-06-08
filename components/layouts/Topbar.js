import { useState } from "react";
import Link from "next/link";
import Avatar from "../base/Avatar";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import ClickAwayListener from "react-click-away-listener";

const Topbar = ({ setSidebarClosed }) => {
  // ui
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // redux
  const authUser = useSelector(state => state.authReducer.authUser);
  const dispatch = useDispatch();

  return (
    <>
      <div className="top-bar bg-white shadow px-8 py-3 grid grid-cols-12 z-50 sticky top-0">
        <div className="col-span-2 flex items-center ">
          <div className="mr-6">
            <button className="focus:outline-none" onClick={() => setSidebarClosed(prevVal => !prevVal)}>
              <i className="fa fa-bars text-gray-500 fa-lg"></i>
            </button>
          </div>
          <div>
            <Link href="/">
              <a className="flex items-center ">
                <img src="/logo.png" width="32" height="32" className="" />
                <h1 className="font-bold text-xl  ml-1 tracking-tighter invisible lg:visible">NexTube</h1>
              </a>
            </Link>
          </div>
        </div>
        <div className="col-span-10 flex items-center">
          <form className="hidden md:flex">
            <input type="text" placeholder="Search" className="border border-gray py-2 px-2 w-80 ml-8 xl:ml-0 xl:w-128 focus:outline-none focus:ring-1" />
            <button className="border-t border-r border-b border-0 border-gray py-2 px-6 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-1 ">
              <i className="fa fa-search text-gray-500"></i>
            </button>
          </form>
          <div className="flex items-center ml-auto">
            <a href="">
              <i className="fa fa-upload text-gray-500 mr-8"></i>
            </a>
            {authUser ? (
              <div className="relative">
                <div>
                  <button type="button" onClick={() => setAccountDropdownOpen(true)} className="transition ease-out duration-100  max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <Avatar src={authUser.avatar} className="w-8" />
                  </button>
                </div>
                {accountDropdownOpen && (
                  <ClickAwayListener onClickAway={() => setAccountDropdownOpen(false)}>
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
                        Your Profile
                      </a>

                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">
                        Settings
                      </a>
                      <hr className="my-2" />
                      <a onClick={() => dispatch(logout())} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                        Sign out
                      </a>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <a>
                    <i className="fa fa-sign-in-alt text-gray-500 mr-8"></i>
                  </a>
                </Link>
                <Link href="/signup">
                  <a>
                    <i className="fa fa-user-plus text-gray-500 mr-8"></i>
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Topbar.prototype = {
  setSidebarClosed: PropTypes.func.isRequired,
};

export default Topbar;
