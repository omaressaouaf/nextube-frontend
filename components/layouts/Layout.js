import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MetaData from "./MetaData";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import HomeKeywords from "../videos/HomeKeywords";
import { useRouter } from "next/router";

const Layout = ({ children }) => {

  const { darkMode } = useTheme();

  const router = useRouter();

  return (
    <div className={`${darkMode && "dark"}`}>
      <MetaData />

      <div className="bg-gray-100 dark:bg-lightBlack h-min-screen">
        <Topbar />

        <div className="body-wrapper flex">
          <Sidebar />
          <div className="overflow-hidden flex-grow">
            {router.pathname === "/" && <HomeKeywords />}
            <div className="content container mx-auto px-10 py-5 min-h-screen dark:text-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
