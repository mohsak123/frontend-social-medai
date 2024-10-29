import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "./CreatePost.css";
import { useTheme } from "@emotion/react";
import postCover from "../../images/post-cover.jpg";
import createPostImg from "../../images/create-post2.png";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/postsAction";
import { useForm } from "react-hook-form";
import Loader from "./../../utils/Loader/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import { notifyWarning } from "../../utils/Toastify/Toastify";

const CreatePost = ({ drawerWidth }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const initialPartnerState = {
    image: {
      name: "",
      type: "",
    },
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postPhoto, setPostPhoto] = useState(initialPartnerState);
  const [file, setFile] = useState(null); // Add file state
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];

    if (postPhoto.image.name !== "") {
      if (validImageTypes.includes(image.type)) {
        dispatch(createPost(title, description, postPhoto?.image));
        reset();
        setPostPhoto(initialPartnerState);
        setImage(null);
      } else {
        return notifyWarning("The file is not image");
      }
    } else {
      dispatch(createPost(title, description, postPhoto?.image));
      reset();
      setPostPhoto(initialPartnerState);
      setImage(null);
    }

    console.log(image);
  };

  const { loading } = useSelector((state) => state.createPost);

  // Added handleFileChange function
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setImage(selectedFile);
    setPostPhoto((prevPostPhoto) => ({
      ...prevPostPhoto,
      image: { ...prevPostPhoto.image, type: selectedFile?.type },
    })); // Set the postPhoto state

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setPostPhoto((prevPostPhoto) => ({
            ...prevPostPhoto,
            image: { ...prevPostPhoto.image, name: base64 },
          }));
        }
        console.log(true);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const cancelImage = () => {
    setFile("");
    setImage(null);
    setPostPhoto((prevPostPhoto) => ({
      ...prevPostPhoto,
      image: { ...prevPostPhoto.image, type: "" },
    }));

    setPostPhoto((prevPostPhoto) => ({
      ...prevPostPhoto,
      image: { ...prevPostPhoto.image, name: "" },
    }));
  };

  return (
    <Box
      sx={{
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: { xs: "56px", sm: "64px" },
        py: 2,
        pl: 2,
        pr: 2,
        minHeight: {
          xs: "calc(100vh - 56px - 56px)",
          sm: "calc(100vh - 60px - 64px)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading === true ? (
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              flex: "6",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              flexDirection: "column",
            }}
            className="left-side"
          >
            <Typography
              component="h3"
              variant="h3"
              sx={{
                fontStyle: "italic",
                fontSize: "45px",
                textAlign: "center",
              }}
            >
              Create Post
            </Typography>

            <Typography
              component="form"
              variant="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
                width: "100%",
                mt: 1,
              }}
            >
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <input
                  placeholder="title"
                  style={{
                    backgroundColor: theme.palette.mainColor.input,
                    color: theme.palette.text.primary,
                    borderColor: Boolean(errors.title)
                      ? "red"
                      : theme.palette.mainColor.borderInput,
                  }}
                  className="create-post-input"
                  error={Boolean(errors.title)}
                  {...register("title", {
                    required: true,
                    minLength: 1,
                    maxLength: 256,
                    onChange: (e) => {
                      setTitle(e.target.value);
                    },
                  })}
                />

                {errors.title && (
                  <Typography
                    variant="div"
                    component="div"
                    className="create-post-error"
                    sx={{
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#d32f2f",
                      margin: "auto",
                      padding: "0 10px",
                    }}
                  >
                    title is required & min 1 & max 256
                  </Typography>
                )}
              </Box>

              <Box sx={{ width: "100%", textAlign: "center", mt: 1 }}>
                <textarea
                  placeholder="description"
                  className="create-post-input textarea"
                  style={{
                    backgroundColor: theme.palette.mainColor.input,
                    color: theme.palette.text.primary,
                    borderColor: Boolean(errors.description)
                      ? "red"
                      : theme.palette.mainColor.borderInput,
                  }}
                  error={Boolean(errors.description)}
                  {...register("description", {
                    required: true,
                    minLength: 3,
                    onChange: (e) => {
                      setDescription(e.target.value);
                    },
                  })}
                ></textarea>

                {errors.description && (
                  <Typography
                    variant="div"
                    component="div"
                    className="create-post-error"
                    sx={{
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#d32f2f",
                      margin: "auto",
                      padding: "0 10px",
                    }}
                  >
                    Description is required & min 3
                  </Typography>
                )}
              </Box>

              <label
                htmlFor="post-img"
                style={{
                  marginTop: "8px",
                  cursor: "pointer",
                }}
                className="create-post-input-file"
              >
                <Avatar
                  src={image === null ? postCover : URL.createObjectURL(image)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              </label>

              {postPhoto.image.name !== "" ? (
                <button
                  className="delete-post-btn"
                  style={{
                    backgroundColor: theme.palette.error.main,
                  }}
                  onClick={cancelImage}
                >
                  Remove Img
                </button>
              ) : null}

              <input
                id="post-img"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleFileChange(e);
                  e.target.value = null;
                }} // Use handleFileChange here
              />
              <button
                className="create-post-btn"
                style={{
                  backgroundColor: theme.palette.primary.dark,
                }}
              >
                Create Post
              </button>
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="right-side"
          >
            <Avatar
              src={createPostImg}
              sx={{
                borderRadius: "0",
                width: "100%",
                height: "auto",
              }}
              className="create-post-img"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CreatePost;
