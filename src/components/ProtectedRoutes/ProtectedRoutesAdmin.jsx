import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "./../../utils/Loader/Loader";

export default function ProtectedRoutesAdmin() {
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token-dentist-clinic");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_MONGO_DB_CLUSTER}/auth/${localStorage.getItem(
          "userId-dentist-clinic"
        )}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem(
              "token-dentist-clinic"
            )}`,
          },
        }
      )
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  console.log(user);

  const drawerWidth = 240;

  return token ? (
    user === "" ? (
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
      </Box>
    ) : user.is_staff === true ? (
      <Outlet />
    ) : (
      <Navigate to={"/"} replace={true} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
