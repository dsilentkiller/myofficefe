
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../../../redux/slice/admin/accounts/authSlice"; // Import logout action
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button, InputBase, Box, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, ExitToApp as LogoutIcon } from "@mui/icons-material";
import LogoutButton from "../../../app/accounts/logout/LogoutButton";

const AdminDefaultHeader = () => {

  return (
    <>
      {/* <div className="content-wrapper"> */}
      {/* <nav className="main-header navbar navbar-expand navbar-white navbar-light"> */}
      <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: 3, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="primary" edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="#" style={{ textDecoration: "none", color: "#000" }}>
              <Button color="inherit">Contact</Button>
            </Link>
          </Box>

          {/* Center Section */}
          <Box sx={{ flexGrow: 2, display: "flex", alignItems: "center", borderRadius: 1, backgroundColor: "#f0f0f0", px: 2 }}>
            <IconButton sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
              <SearchIcon />
            </IconButton>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" inputProps={{ "aria-label": "search" }} />
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
      {/* </div> */}
    </>
  );
};

export default AdminDefaultHeader;




// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/slice/admin/accounts/authSlice"; // Adjust path as needed

// import "../../css/crm/layout/AdminDashboardLayout.css"
// import { Link, useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Button,
//   InputBase,
//   Box,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   ExitToApp as LogoutIcon,
// } from "@mui/icons-material";
// import { useTheme, useMediaQuery } from "@mui/material";


// const DefaultHeader = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State to control the dialog and toast visibility
//   const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
//   const [openToast, setOpenToast] = useState(false); // For the toast message
// const theme = useTheme();
// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Function to open the confirmation dialog
//   const handleClickOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   // Function to close the confirmation dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   // Function to handle the logout process
//   const handleLogout = () => {
//     // Remove tokens and perform logout
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     dispatch(logout());

//     // Show toast message
//     setOpenToast(true);

//     // Close the dialog and redirect to login page after 1.5 seconds
//     setOpenDialog(false);
//     setTimeout(() => {
//       navigate("/login");
//     }); // 1.5 second delay to allow toast to appear
//   };

//   // Function to close the toast message
//   const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   // Helper function to get CSRF token from cookies
//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//       const cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === name + "=") {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   return (
//     <div className="default-header">
//    <AppBar
//         position="static"
//          sx={{
//         backgroundColor: "#fff",
//         boxShadow: 3,
//         height: "64px",
//         display: "flex",
//         justifyContent: "center",

//         // zIndex: (theme) => theme.zIndex.drawer + 1, // Always above drawer
//         // width: "calc(100% - 240px)", // Adjust if your sidebar width is 240px
//         ml: "216px", // Same as sidebar width
//   }}
//         >
//           <Toolbar
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             {/* Left section - Menu and Links */}
//           <Box
//             sx={{
//               flexGrow: isMobile ? 1 : 2,
//               display: "flex",
//               alignItems: "center",
//               borderRadius: 1,
//               backgroundColor: "#f0f0f0",
//               px: 2,
//               mx: isMobile ? 1 : 4,
//             }}
//           >

//               <IconButton color="primary" edge="start" sx={{ mr: 2 }}>
//                 <MenuIcon />
//               </IconButton>
//               <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
//                 <Button color="inherit">Home</Button>
//               </Link>
//               <Link to="#" style={{ textDecoration: "none", color: "#000" }}>
//                 <Button color="inherit">Contact</Button>
//               </Link>
//             </Box>

//             {/* Center section - Search */}
//             <Box
//               sx={{
//                 flexGrow: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 borderRadius: 1,
//                 backgroundColor: "#f0f0f0",
//                 px: 2,
//               }}
//             >
//               <IconButton sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
//                 <SearchIcon />
//               </IconButton>
//               <InputBase
//                 sx={{ ml: 1, flex: 1 }}
//                 placeholder="Search"
//                 inputProps={{ "aria-label": "search" }}
//               />
//             </Box>

//             {/* Right section - Logout Button */}
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Button
//                 // startIcon={<LogoutIcon />}
//                 onClick={handleClickOpenDialog} // Open the confirmation dialog
//                 color="primary"
//                 variant="text"
//                 sx={{ textTransform: "none" }}
//               >
//                 Logout
//               </Button>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       {/* </div> */}

//       {/* Logout Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle sx={{ textAlign: "center" }}>Confirm Logout</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" sx={{ textAlign: "center" }}>
//             Are you sure you want to log out? You will be redirected to the
//             login page.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleCloseDialog}
//             color="secondary"
//             variant="outlined"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleLogout} color="primary" variant="contained">
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar (Toast Message) for logout success */}
//       <Snackbar
//         open={openToast}
//         autoHideDuration={3000}
//         onClose={handleCloseToast}
//       >
//         <Alert
//           onClose={handleCloseToast}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           Logout successfully!
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default DefaultHeader;



















// import React, { useState } from "react";
// import { useDispatch } from "react-redux"; // Import dispatch
// import { logout } from "../../../redux/slice/admin/crm/accountSlice"; // Import logout action
// import { Link, useNavigate } from "react-router-dom";
// import { AppBar, Toolbar, IconButton, Button, InputBase, Box, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
// import { Menu as MenuIcon, Search as SearchIcon, ExitToApp as LogoutIcon } from "@mui/icons-material";

// const DefaultHeader = () => {
//   const dispatch = useDispatch(); // Initialize dispatch
//   const navigate = useNavigate();
// // State to control the dialog and toast visibility
// const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
// const [openToast, setOpenToast] = useState(false); // For the toast message
// // Function to open the confirmation dialog
// const handleClickOpenDialog = () => {
//   setOpenDialog(true);
// };

// // Function to close the confirmation dialog
// const handleCloseDialog = () => {
//   setOpenDialog(false);
// };

//   const handleLogout = () => {
//     // Clear tokens and logout
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     dispatch(logout());
//     // Show toast message
//     setOpenToast(true);

//     // Close the dialog and redirect to login page after 1.5 seconds
//     setOpenDialog(false);
//     setTimeout(() => {
//       navigate("/login");
//     }, 15000); // 1.5 second delay to allow toast to appear
//   };

//    // Function to close the toast message
//    const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   // Helper function to get CSRF token from cookies
//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//       const cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === name + "=") {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: 3 }}>
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             {/* Left section - Menu and Links */}
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton color="primary" edge="start" sx={{ mr: 2 }}>
//                 <MenuIcon />
//               </IconButton>
//               <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
//                 <Button color="inherit">Home</Button>
//               </Link>
//               <Link to="#" style={{ textDecoration: "none", color: "#000" }}>
//                 <Button color="inherit">Contact</Button>
//               </Link>
//             </Box>

//             {/* Center section - Search */}
//             <Box sx={{ flexGrow: 2, display: "flex", alignItems: "center", borderRadius: 1, backgroundColor: "#f0f0f0", px: 2 }}>
//               <IconButton sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
//                 <SearchIcon />
//               </IconButton>
//               <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" inputProps={{ "aria-label": "search" }} />
//             </Box>

//             {/* Right section - Logout Button */}
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Link to="/logout" style={{ textDecoration: "none", color: "#000" }}>
//               <Button
//                 startIcon={<LogoutIcon />}
//                 onClick={handleLogout} // Ensure this is properly wired
//                 color="primary"
//                 variant="text"
//                 sx={{ textTransform: "none" }} // Ensure text transformation is correct
//               >
//                 Logout
//               </Button>
//               </Link>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </nav>
//     </div>
//   );
// };

// export default DefaultHeader;

//old  default header
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const DefaultHeader = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/logout/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": getCookie("csrftoken"), // CSRF token
//         },
//         credentials: "include", // This is important for sessions
//       });

//       if (response.ok) {
//         navigate("/login"); // Redirect to login page
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   // Helper function to get CSRF token from cookies
//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//       const cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === name + "=") {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* Left navbar links */}
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="pushmenu"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-bars"></i>
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="index3.html" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="#" className="nav-link">
//               Contact
//             </Link>
//           </li>
//         </ul>

//         {/* Right navbar links */}
//         <ul className="navbar-nav ml-auto">
//           {/* Navbar Search */}
//           <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="navbar-search"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-search"></i>
//             </Link>
//             <div className="navbar-search-block">
//               <form className="form-inline">
//                 <div className="input-group input-group-sm">
//                   <input
//                     className="form-control form-control-navbar"
//                     type="search"
//                     placeholder="Search"
//                     aria-label="Search"
//                   />
//                   <div className="input-group-append">
//                     <button className="btn btn-navbar" type="submit">
//                       <i className="fas fa-search"></i>
//                     </button>
//                     <button
//                       className="btn btn-navbar"
//                       type="button"
//                       data-widget="navbar-search"
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </li>

//           {/* Logout Button */}
//           <li className="nav-item">
//             <button className="nav-link btn" onClick={handleLogout}>
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default DefaultHeader;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// const DefaultHeader = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("api/logout/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token
//         },
//         credentials: "include",
//       });

//       if (response.ok) {
//         navigate("/login"); // Redirect to login page
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };
//   // Helper function to get CSRF token from cookies
//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//       const cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === name + "=") {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* <!-- Left navbar links --> */}
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="pushmenu"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-bars"></i>
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="index3.html" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="#" className="nav-link">
//               Contact
//             </Link>
//           </li>
//         </ul>

//         {/* <!-- Right navbar links --> */}
//         <ul className="navbar-nav ml-auto">
//           {/* <!-- Navbar Search --> */}
//           <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="navbar-search"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-search"></i>
//             </Link>
//             <div className="navbar-search-block">
//               <form className="form-inline">
//                 <div className="input-group input-group-sm">
//                   <input
//                     className="form-control form-control-navbar"
//                     type="search"
//                     placeholder="Search"
//                     aria-label="Search"
//                   />
//                   <div className="input-group-append">
//                     <button className="btn btn-navbar" type="submit">
//                       <i className="fas fa-search"></i>
//                     </button>
//                     <button
//                       className="btn btn-navbar"
//                       type="button"
//                       data-widget="navbar-search"
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </li>

//           {/* Logout Button */}
//           <li className="nav-item">
//             <button className="nav-link btn" onClick={handleLogout}>
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };
// export default DefaultHeader;
