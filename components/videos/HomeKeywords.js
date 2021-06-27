import { useTheme } from "../../context/ThemeContext";

const HomeKeywords = () => {
  const { darkMode } = useTheme();
  const keywords = [
    "Laravel",
    "Music",
    "Javascript",
    "Movies",
    "Sales",
    "Jazz",
    "Android Studio",
    "Chill-out-music",
    "Cryptocurrency",
    "Javascript",
    "Penn & Teller",
    "Functions",
    "Guitar",
  ];
  return (
    <div className="keywords min-w-full flex justify-start  bg-white dark:bg-lighterBlack border-b border-t dark:border-darkGray px-8 py-3 shadow z-40">
      <div className="flex-shrink-0 bg-black text-white dark:bg-gray-100 dark:text-gray-800 px-4 py-1 mr-3 rounded-full border border-gray-300 hover:opacity-30 transition-all duration-500 cursor-pointer">
        All
      </div>
      {keywords.map((keyword , index) => {
        return (
          <div
            key={index}
            className="flex-shrink-0 bg-gray-100 border border-gray-300 dark:bg-darkGray dark:hover:bg-opacity-30 dark:text-gray-200 dark:border-gray-500 px-4 py-1 mr-3 rounded-full  hover:bg-gray-200 transition-all duration-500 cursor-pointer"
          >
            {keyword}
          </div>
        );
      })}
      <div
        className={`absolute inline  right-0 top-17  px-10 h-11  bg-white dark:bg-lighterBlack backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 cursor-pointer ${
          darkMode ? "next-btn-black-shadow" : "next-btn-white-shadow"
        }`}
      >
        <i className="fa fa-angle-right dark:text-gray-200 mt-2"></i>
      </div>
    </div>
  );
};

export default HomeKeywords;
