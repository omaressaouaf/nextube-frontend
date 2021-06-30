import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serializeServerError } from "../../global/helpers";
import { handleServerError } from "../../store/actions/uiActions";
import Link from "next/link";
import Alert from "../../components/base/Alert";
import VideoItemWide from "../../components/videos/VideoItemWide";
import VideoCategories from "../../components/videos/VideoCategories";

const trending = ({ videos, serverError }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "trending"));
    }
  }, []);
  return (
    <div className="mt-2">
     <VideoCategories />

      <p className="font-semibold mb-6">Trending videos</p>

      {!videos.length && (
        <Alert variant="gray" className="font-semibold">
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
    const { category } = context.query;
    const { data } = category
      ? await axios.get("/videos/trending", { params: { category } })
      : await axios.get("/videos/trending");
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
