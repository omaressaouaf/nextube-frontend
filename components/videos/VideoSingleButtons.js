import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike, toggleDislike } from "../../store/actions/videosActions";
import { validateFeelingsVariable } from "../../global/helpers";
import { toggleWatchLater } from "../../store/actions/watchLatersActions";
import Modal from "../base/Modal";
import { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const VideoSingleButtons = ({ video }) => {
  // redux
  const [authUser, watchLaterLoading] = useSelector(state => [
    state.authReducer.authUser,
    state.uiReducer.loadings[`WatchLaterItem${video.id}`],
  ]);
  const dispatch = useDispatch();

  const handleToggleLike = () => {
    dispatch(toggleLike(video.id));
  };
  const handleToggleDislike = () => {
    dispatch(toggleDislike(video.id));
  };

  const handleToggleWatchLater = () => {
    dispatch(toggleWatchLater(video.id));
  };

  const feltByAuthUser = feelings => {
    if (video[feelings]?.length) {
      validateFeelingsVariable(feelings);
      for (const userId of video[feelings]) {
        if (userId === authUser?.id) return true;
      }
    }
    return false;
  };

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const sharedUrl = `${window.location.protocol}//${window.location.host}/videos/${video.id}`;

  return (
    <>
      {authUser && (
        <>
          <button
            onClick={handleToggleLike}
            className={`${feltByAuthUser("likes") && "text-blue-500"} focus:outline-none`}
          >
            <i className="fa fa-thumbs-up fa-lg"></i> {video?.likes?.length}
          </button>
          <button
            onClick={handleToggleDislike}
            className={`${feltByAuthUser("dislikes") && "text-blue-500"} focus:outline-none`}
          >
            <i className="fa fa-thumbs-down fa-lg"></i> {video?.dislikes?.length}
          </button>
          <button
            onClick={handleToggleWatchLater}
            disabled={watchLaterLoading}
            className={`${video.isWatchLater && "text-blue-500"} focus:outline-none`}
          >
            <i className={`fa fa-lg ${watchLaterLoading ? "fa-spinner fa-spin" : "fa-clock"}`}></i>{" "}
            Later
          </button>
        </>
      )}
      <button onClick={() => setShareModalOpen(true)} className="focus:outline-none">
        <i className="fa fa-share fa-lg"></i> Share
      </button>
      <Modal
        title="Share on Social Media"
        setModalOpen={setShareModalOpen}
        modalOpen={shareModalOpen}
      >
        <div className="flex align-center justify-around py-10">
          <FacebookShareButton url={sharedUrl}>
            <FacebookIcon size={36} />
          </FacebookShareButton>
          <WhatsappShareButton url={sharedUrl}>
            <WhatsappIcon size={36} />
          </WhatsappShareButton>
          <TwitterShareButton url={sharedUrl}>
            <TwitterIcon size={36} />
          </TwitterShareButton>
        </div>
      </Modal>
    </>
  );
};

VideoSingleButtons.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoSingleButtons;
