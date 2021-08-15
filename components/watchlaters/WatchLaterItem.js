import PropTypes from "prop-types";
import VideoItemWide from "../videos/VideoItemWide";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchLater } from "../../store/actions/watchLatersActions";

const WatchLaterItem = ({ watchLater: { video } }) => {
  // redux
  const loading = useSelector(state => state.uiReducer.loadings[`WatchLaterItem${video.id}`]);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(toggleWatchLater(video.id));
  };
  return (
    <div key={video.id} className="group max-w-5xl mb-4">
      <div className="flex">
        <VideoItemWide video={video} idField="id" />
        <div
          onClick={handleDelete}
          className={`ml-auto -mt-2 font-light ${!loading && "hidden group-hover:block"}`}
        >
          <i
            className={`fa ${
              loading ? "fa-spinner fa-spin" : "fa-times"
            } fa-lg text-gray-600 cursor-pointer`}
          ></i>
        </div>
      </div>
    </div>
  );
};

WatchLaterItem.propTypes = {
  watchLater: PropTypes.object.isRequired,
};

export default WatchLaterItem;
