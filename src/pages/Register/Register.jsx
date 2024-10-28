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
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "./../../utils/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = ({ drawerWidth }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [typeInput, setTypeInput] = useState("password");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    dispatch(registerUser(username, email, password, bio));

    reset();
  };

  const { loading } = useSelector((state) => state.register);

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
        overflowX: "hidden",
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
              Register
            </Typography>

            <input
              className="input-register"
              placeholder="username"
              type="text"
              style={{
                backgroundColor: theme.palette.mainColor.input,
                borderColor: Boolean(errors.bio)
                  ? "red"
                  : theme.palette.mainColor.borderInput,
                color: theme.palette.text.primary,
              }}
              error={Boolean(errors.username)}
              {...register("username", {
                required: true,
                minLength: 8,
                onChange: (e) => {
                  setUsername(e.target.value);
                },
              })}
            />

            {errors.username && (
              <Typography
                variant="div"
                component="div"
                sx={{
                  textAlign: "left",
                  width: "472px",
                  fontSize: "12px",
                  color: "#d32f2f",
                  margin: "3px 14px 0px",
                }}
              >
                Username is required & min 8
              </Typography>
            )}

            <input
              className="input-register"
              placeholder="email"
              type="email"
              style={{
                backgroundColor: theme.palette.mainColor.input,
                borderColor: Boolean(errors.bio)
                  ? "red"
                  : theme.palette.mainColor.borderInput,
                color: theme.palette.text.primary,
                mt: 1,
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
                  width: "472px",
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
              className="box-register"
            >
              <input
                className="input-register-password"
                placeholder="password"
                maxLength="20"
                type={typeInput}
                style={{
                  backgroundColor: theme.palette.mainColor.input,
                  borderColor: Boolean(errors.bio)
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
                    width: "472px",
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

            <textarea
              placeholder="bio"
              className="input-register textarea"
              error={Boolean(errors.bio)}
              {...register("bio", {
                required: true,
                minLength: 1,
                maxLength: 256,
                onChange: (e) => {
                  setBio(e.target.value);
                },
              })}
              style={{
                backgroundColor: theme.palette.mainColor.input,
                borderColor: Boolean(errors.bio)
                  ? "red"
                  : theme.palette.mainColor.borderInput,
                color: theme.palette.text.primary,
              }}
            ></textarea>

            {errors.bio && (
              <Typography
                variant="div"
                component="div"
                sx={{
                  textAlign: "left",
                  width: "472px",
                  fontSize: "12px",
                  color: "#d32f2f",
                  margin: "3px 14px 0px",
                }}
              >
                Bio is required & min 1 & max 256
              </Typography>
            )}
            <button
              className="button-register"
              style={{
                backgroundColor: theme.palette.primary.dark,
                marginTop: "16px",
              }}
            >
              Register
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
              already have account?
              <Typography
                component="span"
                variant="span"
                sx={{
                  ml: 0.5,
                  color: theme.palette.primary.dark,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Login
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
              className="image-register"
            />
          </Box>
          <ToastContainer />
        </Stack>
      )}
    </Box>
  );
};

export default Register;
