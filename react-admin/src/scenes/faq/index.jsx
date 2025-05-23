import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../../theme";

const FAQ = () => {
  function backgroundColor(value) {
    if (value === "admin") {
      return colors.greenAccent[600];
    } else if (value === "manager") {
      return colors.greenAccent[700];
    } else {
      return colors.greenAccent[700];
    }
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const value = "admin";
  return (
    <Box
      minHeight={"100vh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={backgroundColor(value)}
        borderRadius="4px"
      >
        {value === "admin" && <AdminPanelSettingsOutlinedIcon />}
        {value === "manager" && <SecurityOutlinedIcon />}
        {value === "user" && <LockOpenOutlinedIcon />}
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default FAQ;
