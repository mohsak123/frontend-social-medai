import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "../../redux/actions/commentsAction";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { notifyWarning } from "../../utils/Toastify/Toastify";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import moment from "moment";
import swal from "sweetalert";
import Loader from "./../../utils/Loader/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Comments = ({ post }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();

  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [open, setOpen] = useState(false);

  const commentSubmitHandler = () => {
    if (comment === "") {
      return notifyWarning("please write something");
    }
    dispatch(createNewComment(comment, params.id));
  };

  const handleClickOpen = (comment) => {
    setSelectedComment(comment);
    setEditedComment(comment.text);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComment(null);
    setEditedComment("");
  };

  const editSubmitHandler = () => {
    if (selectedComment) {
      if (selectedComment.text === editedComment) {
        return notifyWarning("please edit your comment");
      }
      dispatch(updateComment(selectedComment._id, editedComment));
    }
    handleClose();
  };

  const deleteCommentHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(id));
      } else {
        swal("Your comment is safe!");
      }
    });
  };

  const { loadingCreateComment } = useSelector((state) => state.createComment);
  const { loadingUpdateComment } = useSelector((state) => state.updateComment);
  const { loadingDeleteComment } = useSelector((state) => state.deleteComment);

  return (
    <Box>
      {loadingCreateComment === true ||
      loadingUpdateComment === true ||
      loadingDeleteComment === true ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: {
              xs: "calc(100vh - 145px)",
              sm: "calc(100vh - 156px)",
            },
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: "10px", sm: "15px" },
            }}
          >
            <textarea
              placeholder="Add comments"
              className="add-comment-input"
              style={{
                backgroundColor: theme.palette.mainColor.input,
                color: theme.palette.text.primary,
                borderColor: theme.palette.mainColor.borderInput,
              }}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <Button
              sx={{
                textTransform: "capitalize",
                color: "white",
                backgroundColor: theme.palette.success.main,
                fontSize: { xs: "16px", sm: "18px" },
                height: { xs: "50px", sm: "55px" },
                padding: "2px 0px",
                width: { xs: "80px", sm: "100px" },
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
              onClick={() => commentSubmitHandler()}
            >
              Submit
            </Button>
          </Box>
          <Box>
            {post?.comments
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    backgroundColor:
                      localStorage.getItem("socialMode") === "light"
                        ? grey[300]
                        : grey[800],
                    mt: 3,
                    padding: "0.77rem 1.2rem",
                    borderRadius: "16px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        color: theme.palette.primary.dark,
                        fontWeight: "bold",
                      }}
                    >
                      {comment.username}
                    </Typography>

                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        fontStyle: "italic",
                        fontWeight: "600",
                        color:
                          localStorage.getItem("socialMode") === "light"
                            ? grey[700]
                            : grey[500],
                        fontSize: "14px",
                      }}
                    >
                      {moment(comment?.createdAt).fromNow()}
                    </Typography>
                  </Box>

                  <Typography
                    component="p"
                    variant="p"
                    sx={{
                      mt: 0.8,
                      mb: 0.8,
                      fontWeight: 500,
                      letterSpacing: "0.3px",
                      fontSize: "18px",
                      wordWrap: "break-word",
                    }}
                  >
                    {comment.text}
                  </Typography>

                  {localStorage.getItem("user-id-social-media") ===
                  comment.user ? (
                    <Box
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <IconButton
                        sx={{
                          mr: 0.3,
                        }}
                        onClick={() => handleClickOpen(comment)}
                      >
                        <EditIcon
                          sx={{
                            color: theme.palette.success.dark,
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteCommentHandler(comment._id)}
                      >
                        <DeleteIcon
                          sx={{
                            color: theme.palette.error.dark,
                          }}
                        />
                      </IconButton>

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
                        <DialogTitle>{"Edit Your Comment"}</DialogTitle>
                        <DialogContent
                          sx={{
                            padding: { xs: "10px 12px", sm: "20px 24px" },
                          }}
                        >
                          <textarea
                            placeholder="Edit comment"
                            className="add-comment-input"
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            style={{
                              width: "100%",
                              height: "150px",
                              padding: "10px",
                              borderRadius: "8px",
                              borderColor: theme.palette.mainColor.borderInput,
                              backgroundColor: theme.palette.mainColor.input,
                              color: theme.palette.text.primary,
                            }}
                          ></textarea>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            sx={{
                              color: theme.palette.error.dark,
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            sx={{
                              color: theme.palette.success.dark,
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                            onClick={editSubmitHandler}
                          >
                            Save
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  ) : null}
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Comments;
