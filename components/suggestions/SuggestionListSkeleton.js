import Skeleton from "react-loading-skeleton";
import { useTheme } from "../../context/ThemeContext";

const SuggestionListSkeleton = () => {
  const { darkMode } = useTheme();

  return [1, 2, 3, 4, 5, 6].map(skeleton => {
    return (

        <div className="flex mb-2 w-auto overflow-hidden" key={skeleton}>
          <div className="flex mb-2">
            <Skeleton width={180} height={90} />
          </div>

          <div className="ml-2">
            <div className="flex mb-2">
              <div className="mb-2 w-full text-black dark:text-gray-200 font-semibold">
                <Skeleton height={10} width={200} />
              </div>
            </div>

            <div className="text-sm">
              <div className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:gray-200">
                <Skeleton height={10} width={70} />
              </div>
            </div>
            <div className="text-sm dark:text-gray-400">
              <Skeleton height={10} width={120} />
            </div>
          </div>
        </div>
    );
  });
};

export default SuggestionListSkeleton;
