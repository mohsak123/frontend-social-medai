import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { updatePassword } from "../../redux/actions/userAction";
import { useParams } from "react-router-dom";
import { notifyWarning } from "../../utils/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "./../../utils/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const EditPassword = ({ drawerWidth }) => {
  const theme = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [typeNewPassword, setTypeNewPassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

  const params = useParams();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    if (newPassword.trim() !== confirmPassword.trim()) {
      return notifyWarning("New password and confirm password are not equal");
    }

    dispatch(updatePassword(params.id, newPassword));
    reset();
  };

  const { loadingUpdatePassword } = useSelector(
    (state) => state.updatePassword
  );

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
      {loadingUpdatePassword === true ? (
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
          onSubmit={handleSubmit(onSubmit)}
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
              fontSize: { xs: "4.5vmax", sm: "45px" },
            }}
          >
            Edit Password
          </Typography>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <TextField
              className="input-update"
              placeholder="new password"
              type={typeNewPassword}
              sx={{
                backgroundColor: theme.palette.mainColor.input,
                borderColor: theme.palette.mainColor.borderInput,
                color: theme.palette.text.primary,
                mt: 1,
              }}
              error={Boolean(errors.newPassword)}
              helperText={
                Boolean(errors.newPassword)
                  ? "New password is required & min 8 character"
                  : null
              }
              {...register("newPassword", {
                required: true,
                minLength: 8,
                onChange: (e) => {
                  setNewPassword(e.target.value);
                },
              })}
            />

            {typeNewPassword === "password" ? (
              <IconButton
                sx={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translate(-10px,-38%)",
                }}
                onClick={() => setTypeNewPassword("text")}
              >
                <VisibilityOffIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translate(-10px,-38%)",
                }}
                onClick={() => setTypeNewPassword("password")}
              >
                <VisibilityIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              position: "relative",
            }}
          >
            <TextField
              className="input-update"
              placeholder="confirm password"
              type={typeConfirmPassword}
              sx={{
                backgroundColor: theme.palette.mainColor.input,
                borderColor: theme.palette.mainColor.borderInput,
                color: theme.palette.text.primary,
                mt: 4,
              }}
              error={Boolean(errors.confirmPassword)}
              helperText={
                Boolean(errors.confirmPassword)
                  ? "confirm password is required & min 8 character"
                  : null
              }
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
                onChange: (e) => {
                  setConfirmPassword(e.target.value);
                },
              })}
            />

            {typeConfirmPassword === "password" ? (
              <IconButton
                sx={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translate(-10px,-12%)",
                }}
                onClick={() => setTypeConfirmPassword("text")}
              >
                <VisibilityOffIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translate(-10px,-12%)",
                }}
                onClick={() => setTypeConfirmPassword("password")}
              >
                <VisibilityIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </IconButton>
            )}
          </Box>

          <button
            className="button-update"
            type="submit"
            style={{
              backgroundColor: theme.palette.primary.dark,
              marginTop: "30px",
            }}
          >
            Save Changes
          </button>
        </Typography>
      )}
    </Box>
  );
};

export default EditPassword;
