import Alert from "../components/base/Alert";
import axios from "axios";
import { serializeServerError } from "../global/helpers";
import VideoItem from "../components/videos/VideoItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleServerError } from "../store/actions/uiActions";
import Link from "next/link";

const Home = ({ videos, serverError }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "index"));
    }
  }, []);

  return (
    <div>
      {/* <p className="font-semibold mb-6">Recommended videos</p> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">
        {!videos.length && (
          <Alert variant="gray" className="font-semibold w-128">
            No videos from the members .
            <Link href="/videos/upload">
              <a className="ml-1 text-blue-500">Upload now</a>
            </Link>
          </Alert>
        )}
        {videos.map(video => {
          return <VideoItem video={video} key={video.id} />;
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async context => {
  let videos = [];
  let serverError = null;
  try {
    const { data } = await axios.get("/videos");
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

export default Home;
