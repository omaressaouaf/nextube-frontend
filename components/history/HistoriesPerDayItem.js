import Divider from "../base/Divider";
import { formatDateDay } from "../../global/helpers";
import PropTypes from "prop-types";
import HistoryItem from "./HistoryItem";
import FlipMove from "react-flip-move";
import { forwardRef } from "react";

const FlipHistoryItem = forwardRef((props, ref) => (
  <div ref={ref}>
    <HistoryItem {...props} />
  </div>
));
const HistoriesPerDayItem = ({ historiesItem }) => {
  return (
    <div>
      <p className="font-semibold mb-6 text-sm">{formatDateDay(historiesItem.updatedAtDay)}</p>
      <FlipMove>
        {historiesItem.histories.map(history => {
          return <FlipHistoryItem key={history.video._id} history={history} />;
        })}
      </FlipMove>
      <Divider />
    </div>
  );
};

HistoriesPerDayItem.propTypes = {
  historiesItem: PropTypes.object.isRequired,
};

export default HistoriesPerDayItem;
