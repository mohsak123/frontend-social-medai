import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const token = localStorage.getItem("token-social-media");

  return token ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
