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
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
} from "../constants/userConstants";

export const allUsersReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        loadingUsers: true,
        users: null,
      };

    case ALL_USERS_SUCCESS:
      return {
        loadingUsers: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        loadingUsers: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        user: null,
        loading: true,
        isAuthenticated: false,
      };
    case USER_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case USER_FAIL:
      return {
        loading: false,
        message: action.payload,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const updateUserProfileReducer = (
  state = { updateUser: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        loadingUpdateProfile: true,
        updateUser: {},
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        loadingUpdateProfile: false,
        updateUser: action.payload,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        loadingUpdateProfile: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updatePasswordReducer = (state = { newPassword: {} }, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        loadingUpdatePassword: true,
        newPassword: {},
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        loadingUpdatePassword: false,
        newPassword: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        loadingUpdatePassword: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const uploadImgProfileReducer = (state = { profileImg: {} }, action) => {
  switch (action.type) {
    case UPLOAD_PROFILE_IMG_REQUEST:
      return {
        loadingUploadProfileImg: true,
        profileImg: {},
      };

    case UPLOAD_PROFILE_IMG_SUCCESS:
      return {
        loadingUploadProfileImg: false,
        profileImg: action.payload,
      };

    case UPLOAD_PROFILE_IMG_FAIL:
      return {
        loadingUploadProfileImg: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const uploadImgBannerReducer = (state = { bannerImg: {} }, action) => {
  switch (action.type) {
    case UPLOAD_BANNER_IMG_REQUEST:
      return {
        loadingUploadImgBanner: true,
        bannerImg: {},
      };

    case UPLOAD_BANNER_IMG_SUCCESS:
      return {
        loadingUploadImgBanner: false,
        bannerImg: action.payload,
      };

    case UPLOAD_BANNER_IMG_FAIL:
      return {
        loadingUploadImgBanner: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteAccountReducer = (state = { deleteUser: {} }, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_REQUEST:
      return {
        loadingDelete: true,
        deleteUser: {},
      };

    case DELETE_ACCOUNT_SUCCESS:
      return {
        loadingDelete: false,
        deleteUser: action.payload,
      };

    case DELETE_ACCOUNT_FAIL:
      return {
        loadingDelete: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
