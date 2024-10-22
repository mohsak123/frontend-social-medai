import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getSinglePost,
  updatePhotoPost,
  updatePost,
} from "../../redux/actions/postsAction";
import Comments from "../../components/Comments/Comments";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./PostDetails.css";
import Loader from "../../utils/Loader/Loader";
import swal from "sweetalert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostDetails = ({ drawerWidth }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const [postImage, setPostImage] = useState(null);

  const handleClickOpen = () => {
    setSelectedPost(post);
    setEditedTitle(post.title);
    setEditedDescription(post.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const UpdatePostHandler = () => {
    handleClose();
    dispatch(updatePost(params.id, editedTitle, editedDescription));
  };

  const updatePhotoPostHandler = () => {
    const formData = new FormData();

    formData.append("postImage", postImage);

    dispatch(updatePhotoPost(params.id, formData));

    setPostImage(null);
  };

  useEffect(() => {
    dispatch(getSinglePost(params.id));
  }, [dispatch, params.id]);

  const deletePostHandler = (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(params.id));
      } else {
        swal("Your post is safe!");
      }
    });
  };

  const { loading, post } = useSelector((state) => state.post);

  console.log(post);

  const { loadingUpdatePost } = useSelector((state) => state.updatePost);

  const { loadingPostPhoto } = useSelector((state) => state.updatePhotoPost);

  const { loadingDeletePost } = useSelector((state) => state.deletePost);

  const { loadingCreateComment } = useSelector((state) => state.createComment);

  const { loadingUpdateComment } = useSelector((state) => state.updateComment);

  const { loadingDeleteComment } = useSelector((state) => state.deleteComment);

  return (
    <Box
      sx={{
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: { xs: "56px", sm: "64px" },
        py: 3,
        pl: 2,
        pr: 2,
        minHeight: {
          xs: "calc(100vh - 56px - 56px)",
          sm: "calc(100vh - 60px - 64px)",
        },
      }}
    >
      {loading === true ||
      loadingUpdatePost === true ||
      loadingPostPhoto ||
      loadingDeletePost ||
      loadingCreateComment ||
      loadingUpdateComment ||
      loadingDeleteComment ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: {
              xs: "calc(100vh - 160px)",
              sm: "calc(100vh - 172px)",
            },
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-paper": {
                width: "700px",
                maxWidth: "100%",
                margin: { xs: "16px", sm: "32px" },
              },
            }}
          >
            <DialogTitle>{"Edit Your Post"}</DialogTitle>
            <DialogContent
              sx={{
                padding: { xs: "10px 12px", sm: "20px 24px" },
              }}
            >
              <DialogContentText id="alert-dialog-slide-description">
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-post-input"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: theme.palette.mainColor.input,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.mainColor.borderInput,
                    outline: "none",
                    fontSize: "18px",
                  }}
                />

                <textarea
                  placeholder="Edit comment"
                  className="edit-post-textarea"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  style={{
                    width: "100%",
                    height: "150px",
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: theme.palette.mainColor.borderInput,
                    backgroundColor: theme.palette.mainColor.input,
                    color: theme.palette.text.primary,
                    marginTop: "16px",
                    fontSize: "18px",
                  }}
                ></textarea>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  fontSize: "18px",
                  color: theme.palette.error.dark,
                  fontWeight: "600",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  fontSize: "18px",
                  color: theme.palette.success.dark,
                  fontWeight: "600",
                }}
                onClick={UpdatePostHandler}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Post Details */}
          {post?.postPhoto !== "" || postImage !== null ? (
            <Box
              sx={{
                width: { xs: "100%", lg: "800px" },
                mx: "auto",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  height: { xs: "200px", sm: "350px", lg: "400px" },
                  borderRadius: "5px",
                  overflow: "hidden",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.4)",
                }}
              >
                <img
                  src={
                    postImage ? URL.createObjectURL(postImage) : post?.postPhoto
                  }
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              {postImage ? (
                <Box sx={{}}>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.success.dark,
                      position: "absolute",
                      padding: "5px 3px",
                      borderRadius: "8px",
                      color: "white",
                      width: "100px",
                      left: "100%",
                      transform: "translate(-110%,-120%)",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      "&:hover": {
                        backgroundColor: theme.palette.success.main,
                      },
                    }}
                    onClick={updatePhotoPostHandler}
                  >
                    Save
                  </Button>

                  <Button
                    sx={{
                      backgroundColor: theme.palette.error.dark,
                      position: "absolute",
                      padding: "5px 3px",
                      borderRadius: "8px",
                      color: "white",
                      width: "100px",
                      left: "100%",
                      transform: "translate(-220%,-120%)",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      "&:hover": {
                        backgroundColor: theme.palette.error.main,
                      },
                    }}
                    onClick={() => setPostImage(null)}
                  >
                    Remove
                  </Button>
                </Box>
              ) : null}
            </Box>
          ) : null}

          <Box
            sx={{
              width: { xs: "100%", lg: "800px" },
              mx: "auto",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                fontSize: { xs: "32px", sm: "40px", md: "48px" },
                mt: 1,
                wordWrap: "break-word",
              }}
            >
              {post?.title}
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: { xs: "18px", sm: "21px" },
                textAlign: { xs: "center", sm: "left" },
                lineHeight: "1.8",
                color: theme.palette.text.primary,
                mt: 2,
                wordWrap: "break-word",
              }}
            >
              {post?.description}
            </Typography>

            {post?.user === localStorage.getItem("user-id-social-media") ? (
              <Box
                sx={{
                  mt: 2,
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "end" },
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  onClick={handleClickOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.success.dark,
                    padding: "8px 10px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    transition: "0.3s",
                    width: { xs: "48%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: theme.palette.success.main,
                    },
                  }}
                >
                  <EditIcon
                    sx={{
                      color: "white",
                      fontSize: "18px",
                      mr: 0.2,
                    }}
                  />
                  <Typography
                    component="p"
                    variant="p"
                    sx={{
                      fontWeight: "500",
                      pl: 0.3,
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    UPDATE
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: theme.palette.success.dark,
                    padding: "8px 10px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    transition: "0.3s",
                    width: { xs: "48%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: theme.palette.success.main,
                    },
                  }}
                >
                  <label
                    for="post-img"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <EditIcon
                      sx={{
                        color: "white",
                        fontSize: "18px",
                        mr: 0.2,
                      }}
                    />
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        fontWeight: "500",
                        pl: 0.3,
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      EDIT PHOTO
                    </Typography>
                  </label>

                  <input
                    type="file"
                    id="post-img"
                    style={{
                      display: "none",
                    }}
                    onChange={(e) => {
                      setPostImage(e.target.files[0]);
                      e.target.value = null;
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.error.dark,
                    padding: "8px 10px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    transition: "0.3s",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                    },
                  }}
                  onClick={(e) => deletePostHandler(e)}
                >
                  <DeleteIcon
                    sx={{ color: "white", fontSize: "18px", mr: 0.2 }}
                  />
                  <Typography
                    component="p"
                    variant="p"
                    sx={{
                      fontWeight: "500",
                      pl: 0.3,
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    DELETE
                  </Typography>
                </Box>
              </Box>
            ) : null}
          </Box>

          <Box
            sx={{
              width: { xs: "100%", lg: "800px" },
              mx: "auto",
              mt: 3,
            }}
          >
            <Comments post={post} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostDetails;
