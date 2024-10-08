import React from "react";
import "./Loader.css";
import { Typography, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();

  return (
    <div id="page">
      <div id="container">
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <Typography
          component="div"
          variant="div"
          sx={{
            color:
              theme.palette.mode === "light"
                ? theme.palette.common.black
                : theme.palette.common.white,
          }}
        >
          loading
        </Typography>
      </div>
    </div>
  );
};

export default Loader;
