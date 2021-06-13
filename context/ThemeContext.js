import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../global/helpers";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sidebarLessPathnames = ["/videos/[id]"];
    if (window.screen.width < 800 || sidebarLessPathnames.includes(router.pathname)) {
      setSidebarOpen(false);
    }
  }, [router.pathname]);


  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevVal => !prevVal);
    saveToLocalStorage("darkMode", !darkMode);
  };

  useEffect(() => {
    setDarkMode(() => getFromLocalStorage("darkMode"));
  }, []);

  return <ThemeContext.Provider value={{ sidebarOpen, setSidebarOpen, darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};
