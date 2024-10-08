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

export const getCommentsReducer = (state = { comments: {} }, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS_REQUEST:
      return {
        loading: true,
        comments: {},
      };

    case GET_ALL_COMMENTS_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };

    case GET_ALL_COMMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createCommentReducer = (state = { comment: null }, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return {
        loadingCreateComment: true,
        comment: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        loadingCreateComment: false,
        comment: action.payload,
      };

    case CREATE_COMMENT_FAIL:
      return {
        loadingCreateComment: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_REQUEST:
      return {
        loadingUpdateComment: true,
        comment: {},
      };

    case UPDATE_COMMENT_SUCCESS:
      return {
        loadingUpdateComment: false,
        comment: action.payload,
      };

    case UPDATE_COMMENT_FAIL:
      return {
        loadingUpdateComment: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteCommentReducer = (state = { comment: null }, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return {
        loadingDeleteComment: true,
        comment: null,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        loadingDeleteComment: false,
        comment: action.payload,
      };

    case DELETE_COMMENT_FAIL:
      return {
        loadingDeleteComment: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
