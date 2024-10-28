import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import registerLogin from "../../images/register-login.png";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "./../../utils/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = ({ drawerWidth }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [typeInput, setTypeInput] = useState("password");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    dispatch(loginUser(email, password));
    setEmail("");
    setPassword("");
  };

  const { loading } = useSelector((state) => state.login);

  const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?=.{8,}).*$/;

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
        <Stack
          flexDirection="row"
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
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
                fontSize: "45px",
              }}
            >
              Login
            </Typography>

            <input
              className="input-login"
              placeholder="email"
              type="email"
              style={{
                backgroundColor: theme.palette.mainColor.input,
                borderColor: Boolean(errors.email)
                  ? "red"
                  : theme.palette.mainColor.borderInput,
                color: theme.palette.text.primary,
              }}
              error={Boolean(errors.email)}
              {...register("email", {
                required: true,
                pattern: regEmail,
                onChange: (e) => {
                  setEmail(e.target.value);
                },
              })}
            />

            {errors.email && (
              <Typography
                variant="div"
                component="div"
                sx={{
                  textAlign: "left",
                  width: { xs: "82%", sm: "472px" },
                  fontSize: "12px",
                  color: "#d32f2f",
                  margin: "3px 14px 0px",
                }}
              >
                Email is required
              </Typography>
            )}

            <Box
              sx={{
                position: "relative",
              }}
              className="box-login"
            >
              <input
                className="input-login-password"
                placeholder="password"
                type={typeInput}
                maxLength="20"
                style={{
                  backgroundColor: theme.palette.mainColor.input,
                  borderColor: Boolean(errors.password)
                    ? "red"
                    : theme.palette.mainColor.borderInput,
                  color: theme.palette.text.primary,
                  width: "100%",
                }}
                error={Boolean(errors.password)}
                {...register("password", {
                  required: true,
                  pattern: regPassword,
                  minLength: 8,
                  onChange: (e) => {
                    setPassword(e.target.value);
                  },
                })}
              />

              {typeInput === "password" ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "0",
                    top: "50%",
                    transform:
                      Boolean(errors.password) === true
                        ? "translate(-10px,-80%)"
                        : "translate(-10px,-30%)",
                  }}
                  onClick={() => setTypeInput("text")}
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
                    transform:
                      Boolean(errors.password) === true
                        ? "translate(-10px,-80%)"
                        : "translate(-10px,-30%)",
                  }}
                  onClick={() => setTypeInput("password")}
                >
                  <VisibilityIcon
                    sx={{
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              )}

              {errors.password && (
                <Typography
                  variant="div"
                  component="div"
                  sx={{
                    textAlign: "left",
                    // width: { xs: "90%", sm: "472px" },
                    fontSize: "12px",
                    color: "#d32f2f",
                    margin: "3px 14px 0px",
                  }}
                >
                  Password is required & min 8 and Contain lower and upper
                  letter and Punctuation characters
                </Typography>
              )}
            </Box>

            <button
              className="button-login"
              style={{
                backgroundColor: theme.palette.primary.dark,
              }}
            >
              Login
            </button>
            <Typography
              component="p"
              variant="p"
              sx={{
                fontSize: "15px",
                mt: 1,
                fontStyle: "italic",
              }}
            >
              don't you have account?
              <Typography
                component="span"
                variant="span"
                sx={{
                  ml: 0.5,
                  color: theme.palette.primary.dark,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Typography>
            </Typography>
          </Typography>
          <Box
            sx={{
              flex: { md: "6", lg: "5" },
              height: "100%",
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: "linear-gradient(to right, #42a5f5 , #3f51b5)",
            }}
          >
            <Avatar
              src={registerLogin}
              sx={{
                borderRadius: "0",
                width: "100%",
                height: "auto",
              }}
              className="image-login"
            />
          </Box>
          <ToastContainer />
        </Stack>
      )}
    </Box>
  );
};

export default Login;
