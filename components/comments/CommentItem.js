import Avatar from "../base/Avatar";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchReplies } from "../../store/actions/commentsActions";
import { formatDateAgo } from "../../global/helpers";
import ClipLoader from "react-spinners/ClipLoader";
import CommentForm from "./CommentForm";
import AccessGate from "../auth/AccessGate";

const CommentItem = ({ comment }) => {
  // redux
  const [currentCommentReplies, authUser, loading] = useSelector(state => {
    const currentCommentReplies = state.commentsReducer.comments.filter(
      comm => comm.parentComment === comment.id
    );

    return [
      currentCommentReplies,
      state.authReducer.authUser,
      state.uiReducer.loadings[`CommentItem${comment.id}`],
    ];
  });
  const dispatch = useDispatch();

  // Comment Actions
  const [formMode, setFormMode] = useState("add");

  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: comment.id, parentCommentId: comment.parentComment }));
  };

  const handleEditComment = () => {
    setFormMode("edit");
  };

  const handleReplyToComment = () => {
    setFormMode("reply");
  };

  // Replies
  const [showReplies, setShowReplies] = useState(false);
  const toggleShowReplies = async () => {
    if (!showReplies && !currentCommentReplies.length) {
      await dispatch(fetchReplies(comment.id));
    }
    setShowReplies(prevVal => !prevVal);
  };

  useEffect(() => {
    if (!currentCommentReplies.length) {
      setShowReplies(false);
    }
  }, [currentCommentReplies]);

  const renderShowHideRepliesButton = () => {
    return (
      <span
        onClick={toggleShowReplies}
        className="text-sm text-blue-500 font-semibold cursor-pointer"
      >
        {showReplies ? (
          <>
            <i className="fa fa-caret-up mr-1"></i> Hide
          </>
        ) : (
          <>
            <i className="fa fa-caret-down mr-1"></i> View
          </>
        )}{" "}
        {comment.repliesCount} {comment.repliesCount > 1 ? "Replies" : "Reply"}
      </span>
    );
  };

  const renderReplies = () => {
    return (
      <div className="border-l border-gray-700 border-opacity-25 dark:border-opacity-25 dark:border-gray-200 pl-5">
        {currentCommentReplies.map(reply => {
          return <CommentItem comment={reply} key={reply.id} />;
        })}
      </div>
    );
  };
  return (
    <>
      {formMode === "edit" ? (
        <CommentForm formMode={formMode} setFormMode={setFormMode} comment={comment} />
      ) : (
        <div>
          <div className="flex items-start mt-6 w-full">
            <Avatar className={`${comment.parentComment ? "w-7 mt-0" : "w-10 mt-1"} mr-3`} />
            <div className="flex-grow text-sm">
              <p className="font-semibold mb-1 capitalize">
                {comment.user.channelName}{" "}
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  {formatDateAgo(comment.createdAt)}
                </span>
              </p>
              <p className=" whitespace-pre-wrap">{comment.content}</p>

              <div className="comment-buttons flex items-center mt-3 gap-4 text-xs">
                {authUser && (
                  <>
                    <button
                      onClick={handleReplyToComment}
                      className="text-gray-600 dark:text-gray-400 font-semibold focus:outline-none uppercase"
                    >
                      <i className="fa fa-reply"></i>
                    </button>
                    <AccessGate abilityName="modify-comment" payload={[comment]}>
                      <button
                        onClick={handleEditComment}
                        className="text-blue-500 font-semibold focus:outline-none uppercase "
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        onClick={handleDeleteComment}
                        disabled={loading}
                        className="text-red-500 font-semibold focus:outline-none uppercase"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </AccessGate>
                  </>
                )}

                {loading && <ClipLoader color="gray" size={15} />}
              </div>
            </div>
          </div>
          {formMode === "reply" && (
            <CommentForm
              formMode={formMode}
              setFormMode={setFormMode}
              parentCommentId={comment.id}
            />
          )}
          {comment.repliesCount > 0 && (
            <div className="ml-12 my-4">
              {renderShowHideRepliesButton()}
              {showReplies && renderReplies()}
            </div>
          )}
        </div>
      )}
    </>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
