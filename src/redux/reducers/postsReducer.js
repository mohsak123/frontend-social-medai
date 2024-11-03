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
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAIL,
  GET_COMMENTS_FOR_POST_REQUEST,
  GET_COMMENTS_FOR_POST_SUCCESS,
  GET_COMMENTS_FOR_POST_FAIL,
} from "../constants/postsConstants";

export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singlePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case SINGLE_POST_REQUEST:
      return {
        loading: true,
        post: {},
      };

    case SINGLE_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };

    case SINGLE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getCommentsForOnePostReducer = (
  state = { comments: [] },
  action
) => {
  switch (action.type) {
    case GET_COMMENTS_FOR_POST_REQUEST:
      return {
        loadingCommentsForOnePost: true,
        comments: [],
      };
    case GET_COMMENTS_FOR_POST_SUCCESS:
      return {
        loadingCommentsForOnePost: false,
        comments: action.payload,
      };
    case GET_COMMENTS_FOR_POST_FAIL:
      return {
        loadingCommentsForOnePost: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        loading: true,
        post: {},
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case CREATE_POST_FAIL:
      return {
        lading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return {
        loadingUpdatePost: true,
        post: {},
      };

    case UPDATE_POST_SUCCESS:
      return {
        loadingUpdatePost: false,
        post: action.payload,
      };

    case UPDATE_POST_FAIL:
      return {
        loadingUpdatePost: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updatePhotoPostReducer = (state = { photoPost: {} }, action) => {
  switch (action.type) {
    case UPDATE_PHOTO_POST_REQUEST:
      return {
        loadingPostPhoto: true,
        photoPost: {},
      };

    case UPDATE_PHOTO_POST_SUCCESS:
      return {
        loadingPostPhoto: false,
        photoPost: action.payload,
      };

    case UPDATE_PHOTO_POST_FAIL:
      return {
        loadingPostPhoto: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deletePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return {
        loadingDeletePost: true,
        post: {},
      };

    case DELETE_POST_SUCCESS:
      return {
        loadingDeletePost: false,
        post: action.payload,
      };

    case DELETE_POST_FAIL:
      return {
        loadingDeletePost: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const toggleLikeReducer = (state = { like: {} }, action) => {
  switch (action.type) {
    case TOGGLE_LIKE_REQUEST:
      return {
        loadingLike: true,
        like: {},
      };

    case TOGGLE_LIKE_SUCCESS:
      return {
        loadingLike: false,
        like: action.payload,
      };

    case TOGGLE_LIKE_FAIL:
      return {
        loadingLike: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
