import { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../store/actions/commentsActions";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import FlipMove from "react-flip-move";

const FlipCommentItem = forwardRef((props, ref) => (
  <div ref={ref}>
    <CommentItem {...props} />
  </div>
));
function CommentList({ videoId }) {
  // redux
  const [comments, authUser, loading] = useSelector(state => [
    state.commentsReducer.comments,
    state.authReducer.authUser,
    state.uiReducer.loadings.CommentList,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(videoId));
  }, [videoId]);

  return (
    <>
      <p className="text-gray-800 dark:text-gray-200">10 Comments</p>
      {authUser && (
        <div className="comments-form">
          <CommentForm formMode="add" />
        </div>
      )}
      {loading ? (
        <div className="w-full text-center mt-5">
          <ClipLoader color="gray" size={50} />
        </div>
      ) : (
        <>
          {!comments.length && (
            <h2 className="ml-2 mt-8 text-center mb-5 text-gray-800 font-semibold dark:text-gray-200">
              No Comments for this video
            </h2>
          )}
          <FlipMove enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
            {comments.map(comment => {
              return (
                !comment.parentComment && <FlipCommentItem comment={comment} key={comment.id} />
              );
            })}
          </FlipMove>
        </>
      )}
    </>
  );
}

CommentList.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default CommentList;
