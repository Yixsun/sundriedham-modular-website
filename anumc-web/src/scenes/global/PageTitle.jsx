import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";

const PageTitle = function () {
  const location = useLocation();
  function getPageTitle(pathname) {
    switch (pathname) {
      case "/inbox":
        return "Inbox";
      case "/trip-calendar":
        return "Trips and activities available";
      default:
        return "Hi";
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography variant="h6" noWrap component="div" color="black">
        {getPageTitle(location.pathname)}
      </Typography>
      {location.pathname === "/trip-calendar" && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="create-trip"
          sx={{ background: "black" }}
        >
          + New
        </Button>
      )}
    </Box>
  );
};

export default PageTitle;
