import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  deleteAccount,
  getUserProfile,
  uploadBannerImg,
  uploadProfileImg,
} from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import PostCardProfile from "../../components/Card/PostCardProfile";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../utils/Loader/Loader";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./Profile.css";
import { grey } from "@mui/material/colors";
import { notifyWarning } from "./../../utils/Toastify/Toastify";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile = ({ drawerWidth }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const initialProfileState = {
    image: {
      name: "",
      type: "",
    },
  };

  const [profileImg, setProfileImg] = useState(initialProfileState);
  const [bannerImg, setBannerImg] = useState(null);

  const [fileProfile, setFileProfile] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);

  const [fileBanner, setFileBanner] = useState(null);
  const [imageBanner, setImageBanner] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile(params.id));
  }, [params.id, dispatch]);

  const { loading, user } = useSelector((state) => state.user);

  const { loadingUploadProfileImg } = useSelector(
    (state) => state.uploadImgProfile
  );

  const { loadingUploadImgBanner } = useSelector(
    (state) => state.uploadImgBanner
  );

  const { loadingDelete } = useSelector((state) => state.deleteAccount);

  const uploadProfilePhotoHandler = () => {
    if (profileImg.image.name === "") {
      return notifyWarning("No File Provided");
    }

    // dispatch(uploadProfileImg(formData));

    setProfileImg(initialProfileState);
  };

  const uploadBannerPhotoHandler = () => {
    if (bannerImg === null) {
      return notifyWarning("No File Provided");
    }

    const formData = new FormData();

    formData.append("bannerImage", bannerImg);

    dispatch(uploadBannerImg(formData));

    setBannerImg(null);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAccount(params.id));
      } else {
        swal("Your account is safe!");
      }
    });
  };

  // Added handleFileChange function
  const handleFileProfileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setImageProfile(selectedFile);
    setProfileImg((prevProfileImg) => ({
      ...prevProfileImg,
      image: { ...prevProfileImg.image, type: selectedFile?.type },
    })); // Set the postPhoto state

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFileProfile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setProfileImg((prevProfileImg) => ({
            ...prevProfileImg,
            image: { ...prevProfileImg.image, name: base64 },
          }));
        }
        console.log(true);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const cancelProfielImage = () => {
    setFileProfile("");
    setImageProfile(null);
    setProfileImg((prevProfileImg) => ({
      ...prevProfileImg,
      image: { ...prevProfileImg.image, type: "" },
    }));

    setProfileImg((prevProfileImg) => ({
      ...prevProfileImg,
      image: { ...prevProfileImg.image, name: "" },
    }));
  };

  return (
    <Box
      sx={{
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: { xs: "56px", sm: "64px" },
        minHeight: {
          xs: "calc(100vh - 56px - 56px)",
          sm: "calc(100vh - 60px - 64px)",
        },
        py: 2,
        pl: 1.5,
        pr: 1.5,
      }}
    >
      {loading === true ||
      loadingDelete === true ||
      loadingUploadProfileImg === true ||
      loadingUploadImgBanner === true ||
      loadingDelete === true ? (
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
        <div>
          <Box
            sx={{
              position: "relative",
            }}
          >
            {/* banner photo */}
            <div style={{ position: "relative" }}>
              <Avatar
                className="banner-img-profile"
                src={
                  bannerImg ? URL.createObjectURL(bannerImg) : user?.banner?.url
                }
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  borderRadius: "5px",
                  width: "100%",
                  height: { xs: "225px", sm: "350px" },
                  objectFit: "cover",
                }}
              />

              {bannerImg !== null ? (
                <CancelIcon
                  sx={{
                    position: "absolute",
                    left: "100%",
                    top: "0%",
                    transform: "translate(-80%,-25%)",
                    zIndex: "100",
                    color: "red",
                    backgroundColor: "#eee",
                    borderRadius: "50%",
                    width: { xs: "35px", sm: "40px" },
                    height: { xs: "35px", sm: "40px" },
                    border: "1px solid #aaa",
                    cursor: "pointer",
                  }}
                  onClick={() => setBannerImg(null)}
                />
              ) : null}

              {user?.id === localStorage.getItem("user-id-social-media") ? (
                <div>
                  <label for="banner-img">
                    <CameraAltIcon
                      sx={{
                        position: "absolute",
                        left: "0%",
                        transform: {
                          xs: "translateX(10%)",
                          sm: "translateX(38%)",
                        },
                        top: { xs: "75%", sm: "80%" },
                        backgroundColor: "white",
                        width: { xs: "38px", sm: "43px" },
                        height: { xs: "35px", sm: "40px" },
                        padding: "5px",
                        borderRadius: "50%",
                        color: "black",
                        border: "2px solid gray",
                        cursor: "pointer",
                      }}
                    />
                  </label>

                  <Button
                    sx={{
                      textTransform: "none",
                      fontWeight: "600",
                      backgroundColor:
                        localStorage.getItem("socialMode") === "light"
                          ? "white"
                          : grey[100],
                      color: "#1d2d3d",
                      padding: "0",
                      position: "absolute",
                      left: "0%",
                      transform: {
                        xs: "translateX(20%)",
                        sm: "translateX(10%)",
                      },
                      top: { xs: "90%", sm: "91.5%" },
                      "&:hover": {
                        backgroundColor: "#1d2d3d",
                        color: "white",
                      },
                      border: "1px solid #aaa",
                    }}
                    onClick={uploadBannerPhotoHandler}
                  >
                    Upload
                  </Button>

                  <input
                    id="banner-img"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setBannerImg(e.target.files[0]);
                      e.target.value = null;
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div
              style={{
                position: "relative",
              }}
            >
              <Avatar
                className="profilePhoto-img-profile"
                src={
                  imageProfile
                    ? URL.createObjectURL(imageProfile)
                    : user?.profilePhoto
                }
                sx={{
                  position: "absolute",
                  width: { xs: "135px", sm: "175px", md: "200px" },
                  height: { xs: "135px", sm: "175px", md: "200px" },
                  left: "50%",
                  transform: "translate(-50%,-80%)",
                  objectFit: "contain",
                  border: "3px solid gray",
                  backgroundColor: "#bdbdbd",
                }}
              />

              {imageProfile !== null ? (
                <CancelIcon
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "0%",
                    transform: {
                      xs: "translate(-160%,-1.5%)",
                      sm: "translate(-200%,0%)",
                    },
                    zIndex: "100",
                    color: "red",
                    backgroundColor: "#eee",
                    borderRadius: "50%",
                    width: { xs: "35px", sm: "40px" },
                    height: { xs: "35px", sm: "40px" },
                    border: "1px solid #aaa",
                    cursor: "pointer",
                  }}
                  onClick={(e) => setProfileImg(null)}
                />
              ) : null}

              <label for="profile-img">
                <CameraAltIcon
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: { xs: "translateX(40%)", sm: "translateX(75%)" },
                    top: "-8%",
                    backgroundColor: "white",
                    width: { xs: "38px", sm: "43px" },
                    height: { xs: "35px", sm: "40px" },
                    padding: "5px",
                    borderRadius: "50%",
                    color: "black",
                    border: "2px solid gray",
                    cursor: "pointer",
                  }}
                />
              </label>

              <Button
                sx={{
                  textTransform: "none",
                  fontWeight: "600",
                  backgroundColor:
                    localStorage.getItem("socialMode") === "light"
                      ? "white"
                      : grey[100],
                  color: "#1d2d3d",
                  padding: "0",
                  position: "absolute",
                  left: "50%",
                  transform: { xs: "translateX(90%)", sm: "translateX(125%)" },
                  top: "50%",
                  "&:hover": {
                    backgroundColor: "#1d2d3d",
                    color: "white",
                  },
                  border: "1px solid #aaa",
                }}
                onClick={uploadProfilePhotoHandler}
              >
                Upload
              </Button>

              <input
                id="profile-img"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setProfileImg(e.target.files[0]);
                  e.target.value = null;
                }}
              />
            </div>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 3.5, sm: 4 },
              fontSize: { xs: "30px", sm: "50px" },
            }}
          >
            {user?.username}
          </Box>

          <Box
            sx={{
              textAlign: "center",
              fontSize: { xs: "16px", sm: "22px" },
              fontStyle: "italic",
            }}
          >
            {user?.bio}
          </Box>

          <Box
            sx={{
              textAlign: "center",
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              flexWrap: "wrap",
            }}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: theme.palette.success.dark,
                width: { xs: "49%", sm: "200px" },
                fontSize: { xs: "13px" },
                "&:hover": {
                  backgroundColor: theme.palette.success.main,
                },
              }}
              onClick={() => navigate(`/profile/edit/${params.id}`)}
            >
              Edit Profile
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: theme.palette.success.dark,
                width: { xs: "49%", sm: "200px" },
                fontSize: { xs: "13px" },
                "&:hover": {
                  backgroundColor: theme.palette.success.main,
                },
              }}
              onClick={() => navigate(`/profile/editpassword/${params.id}`)}
            >
              Edit Password
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: theme.palette.error.dark,
                width: { xs: "49%", sm: "200px" },
                fontSize: { xs: "13px" },
                "&:hover": {
                  backgroundColor: theme.palette.error.main,
                },
              }}
              onClick={(e) => handleDeleteAccount(e)}
            >
              Delete Account
            </Button>
          </Box>

          <Box>
            {user?.posts?.length !== 0 ? (
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  mt: { xs: 3.5, sm: 5 },
                  textAlign: "center",
                  fontSize: { xs: "24px", sm: "48px" },
                  fontStyle: "italic",
                }}
              >
                {user?.id === localStorage.getItem("user-id-social-media")
                  ? "MY POSTS"
                  : `${user?.username} Posts`}
              </Typography>
            ) : null}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 1.8, sm: 2.5 },
              }}
            >
              {user?.posts.map((post, index) => (
                <PostCardProfile key={index} post={post} user={user} />
              ))}
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Profile;
