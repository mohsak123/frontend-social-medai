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

export const loginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const registerReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const logOut = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        loading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const verifyEmailReducer = (state = { verify: {} }, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return {
        loadingVerify: true,
        verify: {},
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        loadingVerify: false,
        verify: action.payload,
      };
    case VERIFY_EMAIL_FAIL:
      return {
        loadingVerify: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
