import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
} from "../../redux/actions/userAction";
import { useTheme } from "@emotion/react";
import "./EditProfile.css";
import { notifyWarning } from "../../utils/Toastify/Toastify";
import Loader from "../../utils/Loader/Loader";

const EditProfile = ({ drawerWidth }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  // Fetch user profile when component mounts
  useEffect(() => {
    dispatch(getUserProfile(params.id));
  }, [params.id, dispatch]);

  const { user, loading } = useSelector((state) => state.user);

  const { loadingUpdateProfile } = useSelector(
    (state) => state.updateUserProfile
  );

  // Set the initial username and bio when the user data is available
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setBio(user.bio);
      setUserState(user);
    }
  }, [user]);

  // Local state to hold the updated username and bio
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [userState, setUserState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === userState.username && bio === userState.bio) {
      return notifyWarning("Pleas Edit Something");
    }

    dispatch(updateUserProfile(params.id, username, bio));
  };

  console.log(loadingUpdateProfile);

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loadingUpdateProfile === true ? (
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
        <Typography
          variant="form"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: { xs: "12", md: "6", lg: "8" },
            height: "100%",
          }}
        >
          <Typography
            component="h3"
            variant="h3"
            sx={{
              fontStyle: "italic",
              fontSize: "45px",
            }}
          >
            Edit Profile
          </Typography>
          <input
            className="input-update"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              backgroundColor: theme.palette.mainColor.input,
              borderColor: theme.palette.mainColor.borderInput,
              color: theme.palette.text.primary,
            }}
          />

          <textarea
            className="input-update textarea"
            placeholder="bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{
              backgroundColor: theme.palette.mainColor.input,
              borderColor: theme.palette.mainColor.borderInput,
              color: theme.palette.text.primary,
            }}
          />
          <button
            className="button-update"
            type="submit"
            style={{
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            Save Changes
          </button>
        </Typography>
      )}
    </Box>
  );
};

export default EditProfile;
