import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serializeServerError } from "../../global/helpers";
import { handleServerError } from "../../store/actions/uiActions";
import Link from "next/link";
import Alert from "../../components/base/Alert";
import Divider from "../../components/base/Divider";
import VideoItemWide from "../../components/videos/VideoItemWide";
import { useRouter } from "next/router";
import MetaData from "../../components/layouts/MetaData";

const search = ({ videos, serverError }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "search"));
    }
  }, []);
  return (
    <div className="mt-2">
      <MetaData title="Search" />
      <p className="font-semibold mb-6">
        Search Results for <span className="text-blue-500">'{router.query.query}'</span>
      </p>
      <Divider />
      {!videos.length && (
        <Alert variant="gray" className="font-semibold">
          No Results Found .Try different keywords or
          <Link href="/videos/upload">
            <a className="ml-1 text-blue-500">Upload your own</a>
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
    const { query } = context.query;
    const { data } = await axios.get("/videos/search", { params: { query } });

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

export default search;
