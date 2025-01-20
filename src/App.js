import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./utils/navbar/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";
import PostDetails from "./pages/PostDetails/PostDetails";
import EditProfile from "./pages/Profile/EditProfile";
import EditPassword from "./pages/Profile/EditPassword";
import ProtectedRoutesUser from "./components/ProtectedRoutes/ProtectedRoutesUser";
import ProtectedRoutesAuth from "./components/ProtectedRoutes/ProtectedRoutesAuth";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Users from "./pages/Admin/Users/Users";
import GroupIcon from "@mui/icons-material/Group";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("socialMode")
      ? localStorage.getItem("socialMode")
      : "light"
  );

  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  console.log(mode);

  localStorage.setItem("socialMode", mode);

  const theme = createTheme({
    palette: {
      mode: mode,

      ...(mode === "light"
        ? {
            mainColor: {
              input: "whitesmoke",
              borderInput: "#bbb",
            },
          }
        : {
            mainColor: {
              input: "#2c2b2bde",
              borderInput: "white",
            },
          }),
    },
  });

  const drawerWidth = 240;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar mode={mode} setMode={setMode} />
          <Routes>
            <Route path="/" element={<Home drawerWidth={drawerWidth} />} />

            <Route
              path="/verifyEmail/:token"
              element={<VerifyEmail drawerWidth={drawerWidth} />}
            />

            <Route element={<ProtectedRoutesAuth />}>
              <Route
                path="/register"
                element={<Register drawerWidth={drawerWidth} />}
              />

              <Route
                path="/login"
                element={<Login drawerWidth={drawerWidth} />}
              />
            </Route>

            <Route element={<ProtectedRoutesUser />}>
              <Route
                path="/createPost"
                element={<CreatePost drawerWidth={drawerWidth} />}
              />

              <Route
                path="/profile/:id"
                element={<Profile drawerWidth={drawerWidth} />}
              />

              <Route
                path="/profile/edit/:id"
                element={<EditProfile drawerWidth={drawerWidth} />}
              />

              <Route
                path="/profile/editpassword/:id"
                element={<EditPassword drawerWidth={drawerWidth} />}
              />

              <Route
                path="/userprofile/:id"
                element={<UserProfile drawerWidth={drawerWidth} />}
              />

              <Route
                path="/post/:id"
                element={<PostDetails drawerWidth={drawerWidth} />}
              />
            </Route>

            <Route
              path="/dashboard/users"
              element={<Users drawerWidth={drawerWidth} />}
            />
          </Routes>
          <Footer drawerWidth={drawerWidth} />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
