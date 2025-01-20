import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "./../../utils/Loader/Loader";

export default function ProtectedRoutesAdmin() {
  const [user, setUser] = useState(null); // Start as null to differentiate between "loading" and "not loaded"
  const [loading, setLoading] = useState(true); // Separate loading state
  const navigate = useNavigate();

  const token = localStorage.getItem("token-dentist-clinic");
  const userId = localStorage.getItem("userId-dentist-clinic");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_MONGO_DB_CLUSTER}/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, token, userId]);

  const drawerWidth = 240;

  if (loading) {
    // Show loader while fetching user data
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
    );
  }

  if (!user?.isAdmin) {
    // Redirect if user is not an admin
    return <Navigate to="/" replace />;
  }

  // Render protected routes for admin
  return <Outlet />;
}
