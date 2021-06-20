import { commentsActionTypes } from "../actions/types";

const initialState = {
  comments: [],
};

export default function commentsReducer(state = initialState, { type, payload }) {
  let modifiedComments = null;
  switch (type) {
    case commentsActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case commentsActionTypes.SET_REPLIES:
      return {
        ...state,
        comments: [...payload, ...state.comments],
      };
    case commentsActionTypes.ADD_COMMENT:
      modifiedComments = [...state.comments];
      const currentCommentReplies = modifiedComments.filter(
        comm => comm.parentComment === payload.parentComment
      );
      // add the comment to the array if it's replies are shown or it's a root comment
      if (currentCommentReplies.length || !modifiedComments.parentComment) {
        modifiedComments.unshift(payload);
      }
      modifiedComments = modifiedComments.map(comment =>
        comment.id === payload.parentComment
          ? { ...comment, repliesCount: comment.repliesCount + 1 }
          : comment
      );

      return {
        ...state,
        comments: modifiedComments,
      };
    case commentsActionTypes.DELETE_COMMENT:
      modifiedComments = [...state.comments];
      modifiedComments = modifiedComments.filter(comment => comment.id !== payload.commentId);
      modifiedComments = modifiedComments.map(comment =>
        comment.id === payload.parentCommentId
          ? { ...comment, repliesCount: comment.repliesCount - 1 }
          : comment
      );
      return {
        ...state,
        comments: modifiedComments,
      };
    case commentsActionTypes.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => (comment.id === payload.id ? payload : comment)),
      };
    default:
      return state;
  }
}
