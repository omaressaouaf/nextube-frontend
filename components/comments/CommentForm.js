import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, updateComment } from "../../store/actions/commentsActions";
import Avatar from "../base/Avatar";
import Button from "../base/Button";
import PropTypes from "prop-types";
import { fireToast } from "../../global/helpers";

const CommentForm = ({ formMode, setFormMode, comment, parentCommentId }) => {
  // redux
  const [authUser, loading] = useSelector(state => [
    state.authReducer.authUser,
    state.uiReducer.loadings[formMode === "edit" ? `CommentItem${comment.id}` : `CommentForm${parentCommentId}`],
  ]);
  const dispatch = useDispatch();

  const [content, setContent] = useState(formMode === "edit" ? comment.content : "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!authUser) return fireToast("info", "Please Login First");
    if (formMode === "edit") {
      dispatch(
        updateComment({
          content,
          commentId: comment.id,
        })
      ).then(() => setFormMode("add"));
    } else {
      // in case of add . the parentComment is used to verify wheter we are adding a normal comment or a reply
      dispatch(addComment({ content, parentCommentId })).then(() => {
        setContent("");
        if (formMode !== "add") {
          setFormMode("add");
        }
      });
    }
  };
  return (
    <>
      <div
        className={`comments-form flex items-start mt-6 ${
          formMode === "reply" ? "max-w-4xl ml-auto" : "w-full"
        }`}
      >
        <Avatar className={`mr-3 mt-1 ${formMode === "reply" ? "w-8" : "w-10"}`} />
        <form className="w-full" onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="flex-grow transition w-full bg-transparent resize-none	border-b dark:border-darkGray focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 placeholder-opacity-5"
            placeholder="Write a public comment"
            rows="2"
          ></textarea>
          <div className="flex mt-2 justify-end">
            {formMode !== "add" && (
              <Button type="button" onClick={() => setFormMode("add")} className="btn-red mr-2">
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={!content.trim().length || loading} className="btn-blue">
              {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}
              {
                {
                  add: "Comment",
                  edit: "Save",
                  reply: "Reply",
                }[formMode]
              }
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

CommentForm.propTypes = {
  formMode: PropTypes.oneOf(["add", "edit", "reply"]),
  setFormMode: PropTypes.func,
  comment: PropTypes.object,
  parentCommentId: PropTypes.string,
};

export default CommentForm;
