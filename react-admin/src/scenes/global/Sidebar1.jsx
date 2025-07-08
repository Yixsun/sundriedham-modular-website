import React from "react";
import {
  Drawer,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";

export default function ResponsiveDrawer() {
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  const drawerWidth = isSmallScreen ? 60 : 240;

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={isSmallScreen ? "center" : "flex-start"}
        padding={2}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: 32,
            height: 32,
            marginRight: isSmallScreen ? 0 : 8,
          }}
        />
        {!isSmallScreen && (
          <Typography variant="h6" noWrap>
            AppName
          </Typography>
        )}
      </Box>

      {/* Optional: Sidebar items */}
    </Drawer>
  );
}
