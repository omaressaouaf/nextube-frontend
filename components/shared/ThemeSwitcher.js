import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
       {
           darkMode
           ?<i onClick={toggleDarkMode} className="fa fa-lightbulb text-white mr-8"></i>
           :<i onClick={toggleDarkMode} className="fa fa-moon mr-8"></i>
       }
    </>
  );
};

export default ThemeSwitcher;
