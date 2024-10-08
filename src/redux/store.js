import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import {
  createPostReducer,
  deletePostReducer,
  postsReducer,
  singlePostReducer,
  updatePhotoPostReducer,
  updatePostReducer,
} from "../redux/reducers/postsReducer";
import {
  deleteAccountReducer,
  updatePasswordReducer,
  updateUserProfileReducer,
  uploadImgBannerReducer,
  uploadImgProfileReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  createCommentReducer,
  deleteCommentReducer,
  getCommentsReducer,
  updateCommentReducer,
} from "./reducers/commentsReducer";
import { loginReducer, registerReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  posts: postsReducer,
  post: singlePostReducer,
  createPost: createPostReducer,
  updatePost: updatePostReducer,
  updatePhotoPost: updatePhotoPostReducer,
  updatePassword: updatePasswordReducer,
  deletePost: deletePostReducer,
  user: userReducer,
  updateUserProfile: updateUserProfileReducer,
  uploadImgProfile: uploadImgProfileReducer,
  uploadImgBanner: uploadImgBannerReducer,
  deleteAccount: deleteAccountReducer,
  comments: getCommentsReducer,
  createComment: createCommentReducer,
  deleteComment: deleteCommentReducer,
  updateComment: updateCommentReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  // composeWithDevTools(applyMiddleware(...middleware))
  applyMiddleware(...middleware)
);

export default store;
