import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

// Add props: features = { crm: true, hrm: false, customer: true }, theme = "default" or "blue"
const Sidebar = ({ activeSection, features = {}, theme = "default" }) => {
  const isABCdomain = window.location.hostname === "abc.localhost3000.com";

  const colors = {
    default: {
      bg: "#2C3E50",
      text: "#BDC3C7",
      active: "#1ABC9C",
      hover: "#16A085",
    },
    blue: {
      bg: "#0D47A1",
      text: "#E3F2FD",
      active: "#1976D2",
      hover: "#1565C0",
    },
  };

  const currentTheme = colors[theme] || colors.default;

  const navItemStyle = (sectionKey) => ({
    color: currentTheme.text,
    fontSize: "16px",
    padding: "10px 16px",
    backgroundColor: activeSection === sectionKey ? currentTheme.active : currentTheme.bg,
    "&:hover": {
      backgroundColor: currentTheme.hover,
      color: "#FFFFFF",
    },
    borderRadius: "8px",
    marginBottom: "10px",
  });

  const iconStyle = {
    color: currentTheme.text,
  };

  return (
    <aside>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: currentTheme.bg,
            color: currentTheme.text,
          },
        }}
      >
        <div style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF" }}>
              Myoffice
            </Typography>
          </Link>
        </div>

        {/* User Info */}
        {isABCdomain && (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link to="/dashboard/profile" style={{ textDecoration: "none" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center" }}>
                <PersonIcon sx={{ marginRight: 1 }} />
                Paaru
              </Typography>
            </Link>
          </div>
        )}
        <Divider sx={{ backgroundColor: currentTheme.hover }} />

        {/* Navigation */}
        <List>
          <ListItem button component={Link} to="/dashboard" sx={navItemStyle("dashboard")}>
            <ListItemIcon sx={iconStyle}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {features.crm && (
            <ListItem button component={Link} to="/dashboard/crm" sx={navItemStyle("crm")}>
              <ListItemIcon sx={iconStyle}>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="CRM" />
            </ListItem>
          )}

          {features.customer && (
            <ListItem button component={Link} to="/dashboard/customer" sx={navItemStyle("customer")}>
              <ListItemIcon sx={iconStyle}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Customer" />
            </ListItem>
          )}

          {features.hrm && (
            <ListItem button component={Link} to="/dashboard/hrm" sx={navItemStyle("hrm")}>
              <ListItemIcon sx={iconStyle}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="HRM" />
            </ListItem>
          )}

          <ListItem button component={Link} to="/dashboard/setup" sx={navItemStyle("settings")}>
            <ListItemIcon sx={iconStyle}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </aside>
  );
};

export default Sidebar;


// new sidebar Sidebar.js doing great work
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Collapse,
//   IconButton,
//   Button,
//   Typography,
// } from "@mui/material";
// import { Dashboard as DashboardIcon, Person as PersonIcon, ExpandLess, ExpandMore } from "@mui/icons-material";
// // Add props :feature ={crmLtrue,hrm:true,customer:true},theme "default"or blue
// const Sidebar = () => {
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const toggleUserMenu = () => {
//     setUserMenuOpen(!userMenuOpen);
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//           backgroundColor: "#2c3e50", // Dark background color
//           color: "#ecf0f1", // Light text color for good contrast
//         },
//       }}
//     >
//       <div style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <Link to="/dashboard" className="brand-link">
//           <img
//             src="dist/img/AdminLTELogo.png"
//             alt="AdminLTE Logo"
//             style={{
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               marginBottom: "10px",
//             }}
//           />
//           <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>
//             Myoffice
//           </Typography>
//         </Link>
//       </div>

//       <Divider />

//       <List>
//         {/* Dashboard Item with Button Styling */}
//         <ListItem
//           button
//           component={Link}
//           to="/dashboard"
//           sx={{
//             color: "#ffffff", // Text color
//             fontSize: "34px", // Font size
//             padding: "10px 16px",
//             backgroundColor: "#3498db", // Dashboard button color
//             "&:hover": {
//               backgroundColor: "#2980b9", // Darken on hover
//             },
//             borderRadius: "8px",
//             marginBottom: "10px",
//           }}
//         >
//           <ListItemIcon sx={{ color: "#ffffff" }}>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" sx={{ color: "#ffffff" }} />
//         </ListItem>

//         {/* Customer Menu with Button Styling */}
//         <ListItem
//           button
//           onClick={toggleUserMenu}
//           sx={{
//             color: "#ffffff", // Text color
//             fontSize: "16px", // Font size
//             padding: "10px 16px",
//             backgroundColor: "#e74c3c", // Customer button color
//             "&:hover": {
//               backgroundColor: "#c0392b", // Darken on hover
//             },
//             borderRadius: "8px",
//             marginTop: "10px",
//           }}
//         >
//           <ListItemIcon >
//             <PersonIcon />
//           </ListItemIcon>
//           <ListItemText primary="Customer" component={Link} to="/dashboard/customer/" sx={{ color: "#ffffff" }} />
//           {/* {userMenuOpen ? <ExpandLess sx={{ color: "#ffffff" }} /> : <ExpandMore sx={{ color: "#ffffff" }} />} */}
//         </ListItem>




//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
//old sidebar


// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// const LeftSidebar = () => {
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const toggleUserMenu = () => {
//     setUserMenuOpen(!userMenuOpen);
//   };

//   return (
//     <aside className="main-sidebar sidebar-dark-primary elevation-4">
//       <div className="sidebar">
//         <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//           <div className="info">
//             <Link to="/" className="d-block">
//               User Name
//             </Link>
//           </div>
//         </div>

//         <nav className="mt-2">
//           <ul
//             className="nav nav-pills nav-sidebar flex-column"
//             data-widget="treeview"
//             role="menu"
//             data-accordion="false"
//           >
//             <li className="nav-item">
//               <Link to="#" className="nav-link active">
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>
//                   Dashboard
//                   <i className="right fas fa-angle-left"></i>
//                 </p>
//               </Link>
//             </li>

//             {/* User */}
//             <li className={`nav-item ${userMenuOpen ? "menu-open" : ""}`}>
//               <Link to="/dashboard/customer/" className="nav-link" onClick={toggleUserMenu}>
//                 <i className="nav-icon fas fa-user"></i>
//                     <p>Customer</p>
//               </Link>
//               <ul
//                 className="nav nav-treeview"
//                 style={{ display: userMenuOpen ? "block" : "none" }}
//               >



//                 {/* <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <Link to="#" className="nav-link">
//                       <i className="far fa-circle nav-icon"></i>
//                       <p>Employee</p>
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="#" className="nav-link">
//                       <i className="far fa-circle nav-icon"></i>
//                       <p>Customer</p>
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="#" className="nav-link">
//                       <i className="far fa-circle nav-icon"></i>
//                       <p>User</p>
//                     </Link>
//                   </li>
//                 </ul> */}

//                 {/* <li className="nav-item">
//                 <Link to="shift" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Shift
//                     {/* <span className="right badge badge-danger">New</span> */}
//                 {/* </p>
//                 </Link>
//               </li>  */}
//                 {/* <li className="nav-item">
//                   <Link to="#" className="nav-link">
//                     <i className="far fa-circle nav-icon"></i>
//                     <p>Customer</p>
//                   </Link>
//                 </li> */}
//                 {/* <li className="nav-item">
//                   <Link to="#" className="nav-link">
//                     <i className="far fa-circle nav-icon"></i>
//                     <p>User</p>
//                   </Link>
//                 </li> */}
//               </ul>
//             </li>

//             {/* Leave */}
//             {/* Other menu items... */}
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default LeftSidebar;
