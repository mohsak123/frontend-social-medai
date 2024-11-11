import React, { useDebugValue, useEffect } from "react";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getAllUsers } from "../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { styled } from "@mui/material/styles";

const Users = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { loadingUsers, users } = useSelector((state) => state.allUsers);

  const columns = [
    { field: "id", headerName: "ID", width: 209, flex: 1 },
    {
      field: "username",
      headerName: "User name",
      width: 180,
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 260,
      editable: true,
      flex: 1.5,
    },
    {
      field: "bio",
      headerName: "Bio",
      width: 200,
      editable: true,
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      type: "boolean",
      width: 80,
      align: "center",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "verified",
      headerName: "Verify",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 80,
      flex: 1,
      align: "center",
      headerAlign: "left",
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      flex: 1.2,
      align: "center",
      headerAlign: "left",
      renderCell: (params) =>
        moment(params.value).format("YYYY-MM-DD HH:mm:ss"), // Adjust the format as needed
    },
  ];

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-footerContainer": {
      justifyContent: "center", // Center pagination controls
      backgroundColor: theme.palette.background.default, // Background color
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select": {
      color: theme.palette.primary.main, // Text color for page size options
      fontWeight: "bold", // Make it bold
      marginTop: "16px", // Add top margin to the footer
    },
  }));

  return (
    <Box
      sx={{
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: { xs: "56px", sm: "64px" },
        py: 3,
        pl: 2,
        pr: 2,
        minHeight: {
          xs: "calc(100vh - 56px - 56px)",
          sm: "calc(100vh - 60px - 64px)",
        },
      }}
    >
      <Box
        sx={{
          height: {
            xs: "calc(100vh - 56px - 56px - 48px)",
            sm: "calc(100vh - 60px - 64px - 48px)",
          },
          width: "100%",
        }}
      >
        <DataGrid
          rows={users ? users : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          components={{
            Pagination: GridPagination,
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;
