import axios from "axios";
import { clearLoading, handleServerError, setLoading } from "../actions/uiActions";
import { commentsActionTypes } from "./types";

export const fetchComments = videoId => async dispatch => {
  const component = "CommentList";
  try {
    dispatch(setLoading(component));

    const { data } = await axios.get(`/videos/${videoId}/comments`);

    dispatch({
      type: commentsActionTypes.SET_COMMENTS,
      payload: data.comments,
    });
  } catch (err) {
    dispatch(handleServerError(err, component));
  } finally {
    dispatch(clearLoading(component));
  }
};

export const addComment =
  ({ content, parentCommentId }) =>
  (dispatch, getState) => {
    return new Promise(async resolve => {
      const component = "CommentForm";
      try {
        dispatch(setLoading(component));

        const videoId = getState().videosReducer.video.id;

        const { data } = await axios.post(`/videos/${videoId}/comments`, {
          content,
          parentCommentId,
        });

        dispatch({
          type: commentsActionTypes.ADD_COMMENT,
          payload: data.newComment,
        });
        resolve();
      } catch (err) {
        dispatch(handleServerError(err, component));
      } finally {
        dispatch(clearLoading(component));
      }
    });
  };

export const deleteComment =
  ({ commentId, parentCommentId }) =>
  async (dispatch, getState) => {
    const component = `CommentItem${commentId}`;
    try {
      dispatch(setLoading(component));

      const videoId = getState().videosReducer.video.id;

      await axios.delete(`/videos/${videoId}/comments/${commentId}`);

      dispatch({
        type: commentsActionTypes.DELETE_COMMENT,
        payload: { commentId, parentCommentId },
      });
    } catch (err) {
      dispatch(handleServerError(err, component));
    } finally {
      dispatch(clearLoading(component));
    }
  };

export const updateComment =
  ({ content, commentId }) =>
  (dispatch, getState) => {
    return new Promise(async resolve => {
      const component = "CommentForm";
      try {
        dispatch(setLoading(component));

        const videoId = getState().videosReducer.video.id;

        const { data } = await axios.put(`/videos/${videoId}/comments/${commentId}`, { content });

        dispatch({
          type: commentsActionTypes.UPDATE_COMMENT,
          payload: data.updatedComment,
        });
        resolve();
      } catch (err) {
        dispatch(handleServerError(err, component));
      } finally {
        dispatch(clearLoading(component));
      }
    });
  };

export const fetchReplies = commentId => (dispatch, getState) => {
  return new Promise(async resolve => {
    const component = `CommentItem${commentId}`;
    try {
      dispatch(setLoading(component));

      const videoId = getState().videosReducer.video.id;

      const { data } = await axios.get(`/videos/${videoId}/comments/${commentId}/replies`);
      dispatch({
        type: commentsActionTypes.SET_REPLIES,
        payload: data.replies,
      });
      resolve();
    } catch (err) {
      dispatch(handleServerError(err, component));
    } finally {
      dispatch(clearLoading(component));
    }
  });
};
