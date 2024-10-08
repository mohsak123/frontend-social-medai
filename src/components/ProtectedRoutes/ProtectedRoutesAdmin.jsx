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
    ) : user.is_staff === true ? (
      <Outlet />
    ) : (
      <Navigate to={"/"} replace={true} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
