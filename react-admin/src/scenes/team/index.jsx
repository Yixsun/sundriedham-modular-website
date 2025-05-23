import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { alignBox } from "@nivo/core";

const rowHeight = 50;

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  function backgroundColor(value) {
    if (value === "admin") {
      return colors.greenAccent[600];
    } else if (value === "manager") {
      return colors.greenAccent[700];
    } else {
      return colors.greenAccent[700];
    }
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerNameName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Box
            minHeight={`${rowHeight}px`}
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
      },
    },
  ];

  return (
    <Box m={"20px"}>
      <Header title={"TEAM"} subtitle={"Managing the Team Members"}></Header>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnSeparator": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataTeam}
          columns={columns}
          getRowHeight={() => rowHeight}
        />
      </Box>
    </Box>
  );
};

export default Team;
