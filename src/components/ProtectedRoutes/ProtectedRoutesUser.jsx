import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader/Loader";

export default function ProtectedRoutesUser() {
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token-social-media");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/users/profile/${localStorage.getItem(
          "user-id-social-media"
        )}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem(
              "token-social-media"
            )}`,
          },
        }
      )
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return token ? (
    user === "" ? (
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
      <Outlet />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
