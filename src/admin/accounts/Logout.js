import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";

const Logout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Modal state (open or close)
  const [openToast, setOpenToast] = useState(false); // Toast message state

  // Function to open the modal when logout is clicked
  const handleClickOpen = () => {
    setOpen(true); // Open the confirmation modal
  };

  // Function to close the modal if the user cancels
  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  // Function to handle the logout process
  const handleLogout = () => {
    // Remove JWT tokens and vendor information from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("vendor_name"); // Also remove vendor name

    // Close the modal
    setOpen(false);

    // Show the success toast message
    setOpenToast(true);

    // Redirect to the login page after a short delay (for the toast to show)
    setTimeout(() => {
      navigate("/login");
    }, 1500); // Delay for 1.5 seconds to allow the toast to be visible
  };

  // Function to close the toast
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {/* Button to trigger the logout confirmation dialog */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        startIcon={<ExitToAppIcon />}
        sx={{ marginBottom: 2 }}
      >
        Logout
      </Button>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Are you sure you want to log out? You will be redirected to the login page.
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* Button to cancel the logout */}
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>

          {/* Button to confirm logout */}
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar (Toast Message) for logout success */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000} // Automatically hide after 3 seconds
        onClose={handleCloseToast}
      >
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: "100%" }}>
          Logout successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Logout;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
// import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";

// const Logout = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false); // Modal state (open or close)
//   const [openToast, setOpenToast] = useState(false); // Toast message state

//   // Function to open the modal when logout is clicked
//   const handleClickOpen = () => {
//     setOpen(true); // Open the confirmation modal
//   };

//   // Function to close the modal if the user cancels
//   const handleClose = () => {
//     setOpen(false); // Close the modal
//   };

//   // Function to handle the logout process
//   const handleLogout = () => {
//     // Remove tokens from localStorage
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");

//     // Close the modal
//     setOpen(false);

//     // Show the success toast message
//     setOpenToast(true);

//     // Redirect to the login page after a short delay (for the toast to show)
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500); // Delay for 1.5 seconds to allow the toast to be visible
//   };

//   // Function to close the toast
//   const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         flexDirection: "column",
//       }}
//     >
//       {/* Button to trigger the logout confirmation dialog */}
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleClickOpen}
//         startIcon={<ExitToAppIcon />}
//         sx={{ marginBottom: 2 }}
//       >
//         Logout
//       </Button>

//       {/* Logout Confirmation Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle sx={{ textAlign: 'center' }}>Confirm Logout</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" sx={{ textAlign: 'center' }}>
//             Are you sure you want to log out? You will be redirected to the login page.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           {/* Button to cancel the logout */}
//           <Button onClick={handleClose} color="secondary" variant="outlined">
//             Cancel
//           </Button>

//           {/* Button to confirm logout */}
//           <Button onClick={handleLogout} color="primary" variant="contained">
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar (Toast Message) for logout success */}
//       {/* <Snackbar
//         open={openToast}
//         autoHideDuration={3000} // Automatically hide after 3 seconds
//         onClose={handleCloseToast}
//       >
//         <Alert onClose={handleCloseToast} severity="success" sx={{ width: "100%" }}>
//           Logout successfully!
//         </Alert>
//       </Snackbar> */}
//     </Box>
//   );
// };

// export default Logout;

