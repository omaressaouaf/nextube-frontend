import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serializeServerError } from "../../global/helpers";
import { handleServerError } from "../../store/actions/uiActions";
import Link from "next/link";
import Alert from "../../components/base/Alert";
import VideoItemWide from "../../components/videos/VideoItemWide";

const trending = ({ videos, serverError }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "trending"));
    }
  }, []);
  return (
    <div className="mt-2">
      <div className="flex flex-wrap md:flex-nowrap items-center space-x-5 space-y-5 md:space-y-0  mb-8">
        <div className="ml-5 md:ml-0 pl-7 pr-36 py-7 rounded bg-white hover:bg-gray-200 dark:bg-lighterBlack dark:hover:bg-black transition-all duration-200 cursor-pointer">
          <div className="">
            <i className="fa fa-music fa-2x text-yellow-500"></i>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Music</p>
          </div>
        </div>
        <div className="pl-7 pr-36 py-7 rounded bg-white hover:bg-gray-200 dark:bg-lighterBlack dark:hover:bg-black transition-all duration-200 cursor-pointer">
          <div className="">
            <i className="fa fa-dice-d20 fa-2x text-yellow-600"></i>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Gaming</p>
          </div>
        </div>
        <div className="pl-7 pr-36 py-7 rounded bg-white hover:bg-gray-200 dark:bg-lighterBlack dark:hover:bg-black transition-all duration-200 cursor-pointer">
          <div className="">
            <i className="fa fa-table-tennis fa-2x text-blue-500"></i>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Sports</p>
          </div>
        </div>
      </div>

      <p className="font-semibold mb-6">Trending videos</p>

      {!videos.length && (
        <Alert className="font-semibold">
          No videos from the members .
          <Link href="/videos/upload">
            <a className="ml-1 text-blue-500">Upload now</a>
          </Link>
        </Alert>
      )}
      {videos.map(video => {
        return (
          <div key={video.id} className="max-w-5xl mb-4">
            <VideoItemWide video={video} idField="id" key={video.id} />
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async context => {
  let videos = [];
  let serverError = null;
  try {
    const { data } = await axios.get("/videos/trending");
    videos = data.videos;
  } catch (err) {
    serverError = serializeServerError(err);
  }
  return {
    props: {
      videos,
      serverError,
    },
  };
};

export default trending;
