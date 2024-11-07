import { notifyError, notifySuccess } from "../../utils/Toastify/Toastify";
import {
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
} from "../constants/commentsConstants";

import axios from "axios";
import { getCommentsForOnePost } from "./postsAction";

export const getAllComments = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_COMMENTS_REQUEST });

    const data = await axios.get(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/comments`
    );

    dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: data.data.comments });
  } catch (error) {
    dispatch({ type: GET_ALL_COMMENTS_FAIL, payload: error });
  }
};

export const createNewComment = (text, postId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });

    const data = await axios.post(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/comments`,
      { text, postId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    // console.log(data);

    if (data.status === 201) {
      notifySuccess(data.data.message);
    }
    await dispatch(getCommentsForOnePost(postId));

    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data.comment });
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAIL, payload: error });
  }
};

export const updateComment = (id, text, postId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COMMENT_REQUEST });

    const data = await axios.put(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/comments/comment/${id}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    notifySuccess(data.data.message);

    dispatch(getCommentsForOnePost(postId));

    dispatch({
      type: UPDATE_COMMENT_SUCCESS,
      payload: data.data.updatedComment,
    });
  } catch (error) {
    notifyError(error.response.data.message);

    dispatch({ type: UPDATE_COMMENT_FAIL, payload: error });
  }
};

export const deleteComment = (id, postId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    const data = await axios.delete(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/comments/comment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    notifySuccess(data.data.message);

    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);

    dispatch(getCommentsForOnePost(postId));

    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data.data.message });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response.data.message,
    });

    notifyError(error.response.data.message);
  }
};
