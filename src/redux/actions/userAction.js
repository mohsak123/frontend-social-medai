import { notifyError, notifySuccess } from "../../utils/Toastify/Toastify";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  UPLOAD_PROFILE_IMG_REQUEST,
  UPLOAD_PROFILE_IMG_SUCCESS,
  UPLOAD_PROFILE_IMG_FAIL,
  UPLOAD_BANNER_IMG_REQUEST,
  UPLOAD_BANNER_IMG_SUCCESS,
  UPLOAD_BANNER_IMG_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
} from "../constants/userConstants";

import axios from "axios";

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST });

    const data = await axios.get(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/${id}`
    );

    dispatch({ type: USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_FAIL, payload: error });
  }
};

export const updateUserProfile = (id, username, bio) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const data = await axios.put(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/${id}`,
      { username, bio },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.data });

    setTimeout(() => {
      window.location.href = `/profile/${id}`;
    }, 2000);

    notifySuccess(data.data.message);
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error });

    notifyError(error.response.data.message);
  }
};

export const updatePassword = (id, password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const data = await axios.put(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/${id}`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.data });

    notifySuccess(data.data.message);

    setTimeout(() => {
      window.location.href = `/profile/${id}`;
    }, 2500);
  } catch (error) {
    notifyError(error.response.data.message);
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response });
  }
};

export const uploadProfileImg = (profileImage) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_PROFILE_IMG_REQUEST });

    const data = await axios.post(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/profile-photo-upload`,
      profileImage,
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

    dispatch({ type: UPLOAD_PROFILE_IMG_SUCCESS, payload: data.data });
  } catch (error) {
    notifyError(error.response.data.message);
    dispatch({ type: UPLOAD_PROFILE_IMG_FAIL, payload: error });
  }
};

export const uploadBannerImg = (bannerImage) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_BANNER_IMG_REQUEST });

    const data = await axios.post(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/banner-photo-upload`,
      bannerImage,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    dispatch({ type: UPLOAD_BANNER_IMG_SUCCESS, payload: data.data });

    notifySuccess(data.data.message);

    setTimeout(() => {
      window.location.reload();
    }, 2500);
  } catch (error) {
    dispatch({ type: UPLOAD_BANNER_IMG_FAIL, payload: error });

    notifyError(error.response.data.message);
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACCOUNT_REQUEST });

    const data = await axios.delete(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-social-media")}`,
        },
      }
    );

    console.log(data);

    notifySuccess(data.data.message);

    localStorage.removeItem("token-social-media", data.data.token);
    localStorage.removeItem("user-id-social-media", data.data._id);

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);

    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: data.data });
  } catch (error) {
    notifyError(error.response.data.message);
    dispatch({ type: DELETE_ACCOUNT_FAIL, payload: error });
  }
};
