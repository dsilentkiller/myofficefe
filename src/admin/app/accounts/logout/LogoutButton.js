// src/components/common/LogoutButton.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slice/admin/accounts/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Snackbar, Alert } from "@mui/material";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleClickOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    setOpenToast(true);
    setOpenDialog(false);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
// Function to open the confirmation dialog
  // const handleClickOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  // Function to close the confirmation dialog
  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  // Function to handle the logout process
  // const handleLogout = () => {
  //   // Remove tokens and perform logout
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("refresh_token");
  //   dispatch(logout());

  //   // Show toast message
  //   setOpenToast(true);

  //   // Close the dialog and redirect to login page after 1.5 seconds
  //   setOpenDialog(false);
  //   setTimeout(() => {
  //     navigate("/login");
  //   }); // 1.5 second delay to allow toast to appear
  // };

  // Function to close the toast message
  // const handleCloseToast = () => {
  //   setOpenToast(false);
  // };


  const handleCloseToast = () => setOpenToast(false);

    // Helper function to get CSRF token from cookies
  // const getCookie = (name) => {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== "") {
  //     const cookies = document.cookie.split(";");
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       if (cookie.substring(0, name.length + 1) === name + "=") {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // };

  return (
    <>
      <Button
        onClick={handleClickOpenDialog}
        color="primary"
        variant="text"
        sx={{ textTransform: "none" }}
      >
        Logout
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: "center" }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Are you sure you want to log out? You will be redirected to the login page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openToast} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: "100%" }}>
          Logout successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LogoutButton;
