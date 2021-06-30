import { useRouter } from "next/router";
import { useState } from "react";

const VideoCategories = () => {
  const [categories] = useState([
    {
      name: "music",
      icon: "fa fa-music",
      iconColor: "text-yellow-500",
    },
    {
      name: "gaming",
      icon: "fa fa-dice-d20",
      iconColor: "text-yellow-600",
    },
    {
      name: "sports",
      icon: "fa fa-table-tennis",
      iconColor: "text-blue-500",
    },
  ]);

  const router = useRouter();
  const handleSelectCategory = categoryName => {
    router.replace({
      pathname: "/videos/trending",
      query: { category: categoryName },
    });
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center space-x-5 space-y-5 md:space-y-0  mb-8">
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            onClick={() => handleSelectCategory(category.name)}
            className={` pl-7 pr-36 py-7 rounded bg-white hover:bg-gray-200 dark:bg-lighterBlack dark:hover:bg-black transition-all duration-200 cursor-pointer ${
              index === 0 && "ml-5 md:ml-0"
            }
            ${category.name === router.query.category && "bg-gray-200 dark:bg-black "}
            `}
          >
            <div>
              <i className={`${category.icon} fa-2x ${category.iconColor}`}></i>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize mt-4">
                {category.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoCategories;
