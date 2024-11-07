import { notifySuccess, notifyError } from "../../utils/Toastify/Toastify";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
} from "../constants/authConstants";

import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const data = await axios.post(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/auth/login`,
      {
        email,
        password,
      }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem("token-social-media", data.data.token);
    localStorage.setItem("user-id-social-media", data.data._id);

    notifySuccess(data.data.message);

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });

    if (error.response.status === 400) {
      return notifyError(error.response.data.message);
    }

    if (error.response.status === 404) {
      return notifyError(error.response.data.message);
    }
  }
};

export const registerUser =
  (username, email, password, bio) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const data = await axios.post(
        `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/auth/register`,
        {
          username,
          email,
          password,
          bio,
        }
      );

      dispatch({ type: REGISTER_SUCCESS, payload: data });

      notifySuccess(data.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error });
      notifyError(error.response.data.message);
    }
  };

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("token-social-media");
  localStorage.removeItem("user-id-social-media");
  notifySuccess("Logout user is successfully");
  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
};

export const verifyEmail = (emailToken) => async (dispatch) => {
  try {
    console.log(emailToken);
    console.log(typeof emailToken);
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    const data = await axios.post(
      `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/auth/verifyEmail`,
      {
        emailToken,
      }
    );

    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: VERIFY_EMAIL_FAIL, payload: error.response });
  }
};
