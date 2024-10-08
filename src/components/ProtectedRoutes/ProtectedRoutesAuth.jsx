import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import Loader from "./../../utils/Loader/Loader";

export default function ProtectedRoutesAuth() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token-social-media");
  const navigate = useNavigate();
  const location = useLocation(); // لاستخدام الموقع الحالي

  useEffect(() => {
    // إذا كان token موجودًا، جلب بيانات المستخدم
    if (token) {
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
    }
  }, [token, navigate]);

  // إذا كان المستخدم مسجل دخوله وحاول زيارة login أو register، إعادة توجيهه إلى الصفحة الرئيسية
  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/" replace={true} />;
  }

  // إذا كان المستخدم غير مسجل ويريد الوصول إلى صفحات محمية غير login أو register
  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace={true} />;
  }

  // إذا كان المستخدم مسجل الدخول
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
    // المستخدم غير مسجل الدخول ويحاول الدخول إلى صفحات login أو register
    <Outlet />
  );
}
