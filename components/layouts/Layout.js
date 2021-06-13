import Head from "next/head";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ title, children }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode && "dark"}`}>
      <Head>
        <title>{title && `${title} -`} NexTube </title>
        <meta name="description" content="A video streaming app where you can share your videos" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="bg-gray-100 dark:bg-lightBlack h-min-screen">
        <Topbar />

        <div className="body-wrapper flex ">
          <Sidebar />

          <div className="content container mx-auto px-10 py-5 flex-grow min-h-screen dark:text-gray-200">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.prototype = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default Layout;
