import { useDispatch, useSelector } from "react-redux";
import { deleteAllWatchLaters } from "../../store/actions/watchLatersActions";
import Button from "../base/Button";
import Divider from "../base/Divider";
import { fireConfirm } from "../../global/helpers";
import Link from "next/link";
import Image from "next/image";

const WatchLaterSidebar = () => {
  // redux
  const [watchLaters, deleteLoading] = useSelector(state => [
    state.watchLatersReducer.watchLaters,
    state.uiReducer.loadings.WatchLaterSidebarDelete,
  ]);
  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    fireConfirm(() => {
      dispatch(deleteAllWatchLaters());
    });
  };

  return (
    <div className="bg-gray-200 dark:bg-black px-10 py-6 -mt-20 -mr-16 w-full xl:min-h-screen xl:fixed">
      {watchLaters[0] && (
        <div className="relative text-gray-600 w-72 2xl:w-full ">
          <Link href={`/videos/${watchLaters[0].video.id}`}>
            <a className="relative w-auto">
              <Image
                placeholder="blur"
                blurDataURL={watchLaters[0].video.thumbnail}
                width={340}
                height={200}
                src={watchLaters[0].video.thumbnail}
                className="mb-1 hover:opacity-75 transition-opacity"
                alt="thumbnail"
              />

              <div className="absolute w-full opacity-90 bottom-1  p-2  text-xs font-semibold bg-lightBlack text-gray-200 rounded-sm text-center">
                <i className="fa fa-play mr-2"></i>
                Play First
              </div>
            </a>
          </Link>
          <h1 className="text-lg my-4 font-semibold text-gray-900 dark:text-gray-200">
            Watch Later
          </h1>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">
            {watchLaters.length} video(s) &middot;{" "}
            <span className="px-1 py-0.5 rounded bg-gray-300 text-gray-700 dark:text-gray-400 dark:bg-darkGray">
              <i className="fa fa-lock"></i> Private
            </span>
          </p>

        </div>
      )}

      {watchLaters.length > 0 && (
        <div className="mt-10 px-1">
          <Button onClick={handleDeleteAll} disabled={deleteLoading} variant="red">
            {deleteLoading ? (
              <i className="fa fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fa fa-trash mr-2"></i>
            )}
            <span className="font-semibold">Clear All Watch List</span>
          </Button>
        </div>
      )}
 
    </div>
  );
};

export default WatchLaterSidebar;
