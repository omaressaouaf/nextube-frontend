import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../global/helpers";
import {SkeletonTheme} from "react-loading-skeleton";
import withStore from "../components/HOC/withStore";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = withStore(({ children }) => {
  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarClosedByUser, setSidebarClosedByUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sidebarLessPathnames = ["/videos/[id]", "/signin", "/signup"];
    if (!sidebarClosedByUser) {
      setSidebarOpen(window.screen.width > 800 && !sidebarLessPathnames.includes(router.pathname));
    }
  }, [router.pathname]);

  const toggleSidebarOpen = () => {
    setSidebarOpen(prevVal => {
      setSidebarClosedByUser(prevVal);
      return !prevVal;
    });
  };

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevVal => !prevVal);
    saveToLocalStorage("darkMode", !darkMode);
  };

  useEffect(() => {
    setDarkMode(() => getFromLocalStorage("darkMode"));
  }, []);

  return (
    <ThemeContext.Provider value={{ sidebarOpen, toggleSidebarOpen, darkMode, toggleDarkMode }}>
      <SkeletonTheme color={darkMode ? "#383838" : "#d1d1d1"} highlightColor={darkMode ? "#383838" : "#bfbdbd"}>
        {children}
      </SkeletonTheme>
    </ThemeContext.Provider>
  );
})
