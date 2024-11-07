import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./VerifyEmail.css";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../redux/actions/authAction";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const VerifyEmail = ({ drawerWidth }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loadingVerify, verify, error } = useSelector(
    (state) => state.verifyEmail
  );
  const navigate = useNavigate();
  const params = useParams();

  // Timer state
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    dispatch(verifyEmail(params.token));
  }, [dispatch, params]);

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Clear interval on unmount
      return () => clearInterval(intervalId);
    } else {
      // Timer reached 0, navigate to another page or perform another action
      navigate("/login");
    }
  }, [timer, navigate]);

  return (
    <Box
      sx={{
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: { xs: "56px", sm: "64px" },
        height: {
          xs: "calc(100vh - 56px - 56px)",
          sm: "calc(100vh - 60px - 64px)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {loadingVerify === true ? (
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
        <Stack alignItems="center">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "22px", sm: "48px" },
            }}
          >
            {error ? error.data : verify?.message}
          </Typography>
          {error ? (
            <ErrorOutlineIcon
              sx={{
                fontSize: { xs: "60px", sm: "100px" },
                mt: 1,
                color: theme.palette.error.dark,
              }}
            />
          ) : (
            <CheckCircleOutlinedIcon
              sx={{
                fontSize: { xs: "60px", sm: "100px" },
                mt: 1,
                color: theme.palette.success.dark,
              }}
              className="success"
            />
          )}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "primary.main",
                marginTop: 2,
              }}
            >
              Redirecting to login in {timer} seconds...
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default VerifyEmail;
