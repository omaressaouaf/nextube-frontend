import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSuggestions } from "../../store/actions/videosActions";
import PropTypes from "prop-types";
import SuggestionItem from "./SuggestionItem";
import SuggestionListSkeleton from "./SuggestionListSkeleton";

const SuggestionList = ({ videoId }) => {
  // redux
  const [suggestions, loading] = useSelector(state => [state.videosReducer.suggestions, state.uiReducer.loadings.SuggestionList]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuggestions(videoId));
  }, []);

  if (loading) return <SuggestionListSkeleton />;
  return suggestions.map(video => {
    return <SuggestionItem key={video.id} video={video} />;
  });
};

SuggestionList.prototype = {
  videoId: PropTypes.number.isRequired,
};

export default SuggestionList;
