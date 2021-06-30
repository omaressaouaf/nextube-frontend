import PropTypes from "prop-types";
import VideoItemWide from "../videos/VideoItemWide";
import { formatDateHour } from "../../global/helpers";
import { useDispatch, useSelector } from "react-redux";
import { deleteHistory } from "../../store/actions/historiesActions";

const HistoryItem = ({ history: { video, updatedAt } }) => {
  // redux
  const loading = useSelector(state => state.uiReducer.loadings[`HistoryItem${video._id}`]);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteHistory(video._id));
  };
  return (
    <div key={video._id} className="group max-w-5xl mb-4">
      <p className="text-xs text-gray-800 dark:text-gray-400 mb-5">
        <i className="fa fa-clock text-blue-500 mr-2"></i>
        Started Watching at {formatDateHour(updatedAt)}
      </p>
      <div className="flex">
        <VideoItemWide video={video} idField="_id" />
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

HistoryItem.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HistoryItem;
