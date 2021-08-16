import Alert from "../../components/base/Alert";
import axios from "axios";
import { serializeServerError } from "../../global/helpers";
import VideoItem from "../../components/videos/VideoItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleServerError } from "../../store/actions/uiActions";
import ChannelTopBar from "../../components/channels/ChannelTopBar";
import MetaData from "../../components/layouts/MetaData";

const Channel = ({ user, videos, serverError }) => {
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError, "Channel"));
    }
  }, []);

  return (
    <>
      <MetaData title={user.channelName} />
      <ChannelTopBar user={user} />
      <div className="container mx-auto px-10 py-5">
        <p className="font-semibold mb-6">Uploads</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">
          {!videos.length && (
            <Alert variant="gray" className="font-semibold w-128">
              No videos from this channel
            </Alert>
          )}
          {videos.map(video => {
            return <VideoItem video={video} key={video.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async context => {
  let serverError = null;
  try {
    const { data } = await axios.get(`/channels/${context.params.channelName}`);
    var { user, videos } = data;
  } catch (err) {
    serverError = serializeServerError(err);
  }
  return {
    props: {
      user,
      videos,
      serverError,
    },
  };
};

export default Channel;
