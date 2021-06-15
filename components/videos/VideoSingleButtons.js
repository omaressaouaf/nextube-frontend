import PropTypes from "prop-types";
import { useSelector , useDispatch } from "react-redux";
import {  toggleLike, toggleDislike } from "../../store/actions/videosActions";
import { validateFeelingsVariable } from "../../global/helpers";


const VideoSingleButtons = ({ video }) => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);
  const dispatch = useDispatch();

  const handleToggleLike = () => {
    dispatch(toggleLike(video.id));
  };
  const handleToggleDislike = () => {
    dispatch(toggleDislike(video.id));
  };

  const feltByAuthUser = feelings => {
    validateFeelingsVariable(feelings);
    for (const userId of video[feelings]) {
      if (userId === authUser?.id) return true;
    }
    return false;
  };
  return (
    <>
      <button onClick={handleToggleLike} className={`${feltByAuthUser("likes") && "text-blue-500"} focus:outline-none`}>
        <i className="fa fa-thumbs-up fa-lg"></i> {video.likes.length}
      </button>
      <button onClick={handleToggleDislike} className={`${feltByAuthUser("dislikes") && "text-blue-500"} focus:outline-none`}>
        <i className="fa fa-thumbs-down fa-lg"></i> {video.dislikes.length}
      </button>
      <button className="focus:outline-none">
        <i className="fa fa-share fa-lg"></i> Share
      </button>
      <button className="focus:outline-none">
        <i className="fa fa-clock fa-lg"></i> Later
      </button>
    </>
  );
};

VideoSingleButtons.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoSingleButtons;
