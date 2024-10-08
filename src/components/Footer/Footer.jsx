import React from "react";
import { Box, useTheme } from "@mui/material";

const Footer = ({ drawerWidth }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: { xs: "56px", sm: "60px" },
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        ml: { xs: 0, md: `${drawerWidth}px` },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontStyle: "italic",
        fontSize: { xs: "14px", sm: "16px" },
      }}
    >
      Made By Mohammed Shakokah &copy; 2024
    </Box>
  );
};

export default Footer;
