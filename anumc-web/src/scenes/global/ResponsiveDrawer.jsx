import * as React from "react";

import { Divider, AppBar, Box } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import IconButton from "@mui/material/IconButton";
import TerrainIcon from "@mui/icons-material/Terrain";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Content from "../Content";
import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import BackgroundLetterAvatars from "./Avatar";

const drawerWidth = 200;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  function handleDrawerClose() {
    setMobileOpen(false);
    setIsClosing(true);
  }

  function handleDrawerTransitionEnd() {
    setIsClosing(false);
  }

  function handleDrawerToggle() {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  }

  const drawer = (
    <div>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <BackgroundLetterAvatars />

          <img
            src="images/anumcTextLogo.png"
            alt="anumc logo"
            style={{
              width: "100px",
              height: "auto",
            }}
          ></img>
        </Box>
      </Toolbar>

      <Divider />
      <List>
        <ListItem key={"inbox"}>
          <ListItemButton component={Link} to="/inbox">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"inbox"} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} to="/trip-calendar">
            <ListItemIcon>
              <TerrainIcon />
            </ListItemIcon>
            <ListItemText primary={"Trips"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "white",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <PageTitle />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="sideBar"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
            paper: {
              sx: {
                backgroundColor: " #f3f5f8",
              },
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          slotProps={{
            paper: {
              sx: {
                backgroundColor: " #f3f5f8",
              },
            },
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Content />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
