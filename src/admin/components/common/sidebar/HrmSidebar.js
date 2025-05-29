import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
} from "@mui/icons-material";

const HrmSidebar = ({ activeSection }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#2C3E50", // Dark background color
            color: "#ECF0F1", // Light text color
          },
        }}
      >
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF" }}>
              Myoffice
            </Typography>
          </Link>
        </div>

        {/* User Panel */}
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Link to="/dashboard/profile" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PersonIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> {/* User Icon */}
              Paaru Rawal
            </Typography>
          </Link>
        </div>
        <Divider sx={{ backgroundColor: "#34495E" }} />

        {/* Sidebar Navigation */}
        <List>
          {/* Dashboard */}
          <ListItem
            button
            component={Link}
            to="/dashboard"
            sx={{
              color: "#BDC3C7",
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": {
                backgroundColor: "#1ABC9C",
                color: "#FFFFFF",
              },
              backgroundColor: activeSection === "dashboard" ? "#1ABC9C" : "#34495E", // Active background color
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon sx={{ color: "#BDC3C7" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: "#BDC3C7" }} />
          </ListItem>

          {/* HRM Section */}
          <ListItem
            button
            component={Link}
            to="/dashboard/hrm"
            sx={{
              color: "#BDC3C7",
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": {
                backgroundColor: "#1ABC9C",
                color: "#FFFFFF",
              },
              backgroundColor: activeSection === "hrm" ? "#1ABC9C" : "#34495E", // Active background color
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon sx={{ color: "#BDC3C7" }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="HRM" sx={{ color: "#BDC3C7" }} />
          </ListItem>

          {/* CRM Section */}
          {/* <ListItem
            button
            component={Link}
            to="/dashboard/crm"
            sx={{
              color: "#BDC3C7",
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": {
                backgroundColor: "#1ABC9C",
                color: "#FFFFFF",
              },
              backgroundColor: "#34495E",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon sx={{ color: "#BDC3C7" }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="CRM" sx={{ color: "#BDC3C7" }} />
          </ListItem> */}

          {/* Customer Section */}
          {/* <ListItem
            button
            component={Link}
            to="/dashboard/customer"
            sx={{
              color: "#BDC3C7",
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": {
                backgroundColor: "#1ABC9C",
                color: "#FFFFFF",
              },
              backgroundColor: "#34495E",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon sx={{ color: "#BDC3C7" }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Customer" sx={{ color: "#BDC3C7" }} />
          </ListItem> */}

          {/* Settings Section */}
          <ListItem
            button
            component={Link}
            to="/dashboard/setup"
            sx={{
              color: "#BDC3C7",
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": {
                backgroundColor: "#1ABC9C",
                color: "#FFFFFF",
              },
              backgroundColor: "#34495E",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon sx={{ color: "#BDC3C7" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: "#BDC3C7" }} />
          </ListItem>
        </List>
      </Drawer>
    </aside>
  );
};

export default HrmSidebar;




// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// const HrmSidebar = ({ activeSection }) => {
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
//             {/* Dashboard */}
//             <li className="nav-item">
//               <Link
//                 to="#"
//                 className={`nav-link ${
//                   activeSection === "dashboard" ? "active" : ""
//                 }`}
//               >
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>
//                   Dashboard
//                   {/* <i className="right fas fa-angle-left"></i> */}
//                 </p>
//               </Link>
//             </li>

//             {/* Employee */}
//             <li className="nav-item">
//               <Link
//                 to="/dashboard/hrm/employee"
//                 className={`nav-link ${
//                   activeSection === "employee" ? "active text-primary" : ""
//                 }`}
//               >
//                 <i className={`nav-icon fas fa-user`}></i> {/* Employee Icon */}
//                 <p>Employee</p>
//               </Link>
//             </li>

//             {/* Add other sections */}
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default HrmSidebar;


// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// const HrmSidebar = () => {
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const toggleUserMenu = () => {
//     setUserMenuOpen(!userMenuOpen);
//   };

//   return (
//     <aside className="main-sidebar sidebar-dark-primary elevation-4">
//       <div className="sidebar">
//         <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//            <div className="info">
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
//               <Link to="#" className="nav-link" onClick={toggleUserMenu}>
//                 <i className="nav-icon fas fa-user"></i>
//                 <p>
//                   User
//                   <i className="fas fa-angle-left right"></i>
//                 </p>
//               </Link>
//               <ul
//                 className="nav nav-treeview"
//                 style={{ display: userMenuOpen ? "block" : "none" }}
//               >
//                 <li className="nav-item">
//                   <Link to="employee-list/" className="nav-link">
//                     {/* Update anchor tag to Link */}
//                     <i className="far fa-circle nav-icon"></i>
//                     <p>Employee</p>
//                   </Link>
//                 </li>

//               </ul>
//             </li>

//             {/* Leave */}

//           </ul>
//         </nav>
//       </div>
//      </aside>
//   );
// };

// export default HrmSidebar;


     {/* <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Customer</p>
                  </Link>
                </li> */}

                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Employee</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Customer</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>User</p>
                    </Link>
                  </li>
                </ul> */}

                {/* <li className="nav-item">
                <Link to="shift" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Shift
                    {/* <span className="right badge badge-danger">New</span> */}
                {/* </p>
                </Link>
              </li>  */}
                {/* <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Customer</p>
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>User</p>
                  </Link>
                </li> */}
