import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateAgo } from "../../global/helpers";
import { fetchVideo } from "../../store/actions/videosActions";
import Avatar from "../base/Avatar";
import VideoSingleSkeleton from "./VideoSingleSkeleton";
import ShowMore from "react-show-more";
import PropTypes from "prop-types";
import VideoSingleButtons from "./VideoSingleButtons";
import SubscriptionButton from "./SubscriptionButton";

const VideoSingle = ({ videoId }) => {
  // redux
  const dispatch = useDispatch();
  const video = useSelector(state => state.videosReducer.video);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchVideo(videoId)).then(() => setLoading(false));
  }, [videoId]);

  return (
    <div className="video-single mt-2">
      <div className="video-details">
        <video key={video.id} className="w-full mb-5" controls autoPlay>
          {!loading && (
            <source
              src={`http://localhost:5000/videos/stream/${video.filename}`}
              type="video/mp4"
            />
          )}
        </video>
        {loading ? (
          <VideoSingleSkeleton />
        ) : (
          <>
            <h2 className="mb-3 font-semibold">{video.title}</h2>
            <div className="mb-5 lg:mb-0 text-sm text-gray-600 dark:text-gray-400">
              {video.viewsCount} views &middot; {formatDateAgo(video.createdAt)}
            </div>
            <div className="flex items-center justify-end gap-4 text-gray-500 dark:text-gray-400 uppercase text-sm">
              <VideoSingleButtons video={video} />
            </div>

            <hr className="my-5 dark:border-darkGray" />
            <div className="video-description flex items-start flex-wrap md:flex-nowrap  justify-between">
              <div className="flex items-start order-2 md:order-1 w-full">
                <Avatar src={video.user.avatar} className=" w-12 mr-3 mt-1" />
                <div className="text-sm mt-1">
                  <a href="#" className="font-semibold text-sm capitalize">
                    {video.user.channelName}
                    <i className="fa fa-check-circle text-blue-500 ml-2"></i>
                  </a>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {video.user.subscribersCount} subscribers
                  </p>
                  <div className="mt-5">
                    <ShowMore
                      lines={2}
                      more="Show more"
                      less="Show less"
                      anchorClass="flex mt-4 uppercase text-xs text-gray-700 dark:text-gray-300 font-semibold"
                    >
                      {video.description}
                    </ShowMore>
                  </div>
                </div>
              </div>
              <SubscriptionButton userId={video.user.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

VideoSingle.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoSingle;
