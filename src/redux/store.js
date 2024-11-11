import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import {
  createPostReducer,
  deletePostReducer,
  getCommentsForOnePostReducer,
  postsReducer,
  singlePostReducer,
  toggleLikeReducer,
  updatePhotoPostReducer,
  updatePostReducer,
} from "../redux/reducers/postsReducer";
import {
  allUsersReducer,
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
import {
  loginReducer,
  registerReducer,
  verifyEmailReducer,
} from "./reducers/authReducer";

const reducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  verifyEmail: verifyEmailReducer,
  posts: postsReducer,
  post: singlePostReducer,
  getCommentsForOnePost: getCommentsForOnePostReducer,
  createPost: createPostReducer,
  updatePost: updatePostReducer,
  updatePhotoPost: updatePhotoPostReducer,
  toggleLike: toggleLikeReducer,
  updatePassword: updatePasswordReducer,
  deletePost: deletePostReducer,
  allUsers: allUsersReducer,
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
