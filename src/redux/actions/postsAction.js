import axios from "axios";

import { notifyError, notifySuccess } from "./../../utils/Toastify/Toastify";
import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  SINGLE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  UPDATE_PHOTO_POST_REQUEST,
  UPDATE_PHOTO_POST_SUCCESS,
  UPDATE_PHOTO_POST_FAIL,
} from "../constants/postsConstants";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/posts`
    );
    dispatch({ type: POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_FAIL, payload: error.response.data.message });
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_POST_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/posts/post/${id}`
    );

    dispatch({ type: SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_POST_FAIL, payload: error });
  }
};

export const createPost =
  (title, description, postPhoto) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_POST_REQUEST });

      const data = await axios.post(
        `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/posts/post`,
        { title, description, postPhoto },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token-social-media"
            )}`,
          },
        }
      );
      notifySuccess(data.data.message);

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);

      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_POST_FAIL, payload: error });
    }
  };

export const updatePost = (id, title, description) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const data = await axios.put(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/posts/post/${id}`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    notifySuccess(data.data.message);

    setTimeout(() => {
      window.location.reload();
    }, 2500);

    dispatch({ type: UPDATE_POST_SUCCESS, payload: data.data });
  } catch (error) {
    notifyError(error.response.data.message);
    dispatch({ type: UPDATE_POST_FAIL, payload: error });
  }
};

export const updatePhotoPost = (id, postImage) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PHOTO_POST_REQUEST });

    const data = await axios.put(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/posts/update-image/${id}`,
      { postImage },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    dispatch({ type: UPDATE_PHOTO_POST_SUCCESS, payload: data.data });

    notifySuccess(data.data.message);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
    // notifyError(error.response.data.message);
    dispatch({ type: UPDATE_PHOTO_POST_FAIL, payload: error });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const data = await axios.delete(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/posts/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    dispatch({ type: DELETE_POST_SUCCESS, payload: data.data });

    notifySuccess(data.data.message);

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  } catch (error) {
    notifyError(error.response.data.message);

    dispatch({ type: DELETE_POST_FAIL, payload: error });
  }
};
