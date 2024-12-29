
// new sidebar
import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, UserIcon,ListItemText, Divider, Typography,Box } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Drawer
      variant="permanent"
      sx={{
        width: 140,
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
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ marginRight: 1, color: "#FFFFFF" }} /> {/* User Icon */}
          Paaru Rawal
        </Typography>
      </Link>
    </div>
      <Divider sx={{ backgroundColor: "#34495E" }} />
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
            backgroundColor: "#34495E", // Default background
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#BDC3C7" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "#BDC3C7" }} />
        </ListItem>

        {/* CRM */}
        <ListItem
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
            backgroundColor: "#34495E", // Default background
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#BDC3C7" }}>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="CRM" sx={{ color: "#BDC3C7" }} />
        </ListItem>

        {/* Customer */}
        <ListItem
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
            backgroundColor: "#34495E", // Default background
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#BDC3C7" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Customer" sx={{ color: "#BDC3C7" }} />
        </ListItem>
        {/* hrm */}
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
            backgroundColor: "#34495E", // Default background
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#BDC3C7" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="HRM" sx={{ color: "#BDC3C7" }} />
        </ListItem>
        {/* Project */}
        <ListItem
          button
          component={Link}
          to="/dashboard/project"
          sx={{
            color: "#BDC3C7",
            fontSize: "16px",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
              color: "#FFFFFF",
            },
            backgroundColor: "#34495E", // Default background
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#BDC3C7" }}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Project" sx={{ color: "#BDC3C7" }} />
        </ListItem>

        {/* notice */}
        <ListItem
          button
          component={Link}
          to="/dashboard/notice"
          sx={{
            color: "#BDC3C7",
            fontSize: "16px",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
              color: "#FFFFFF",
            },
            backgroundColor: "#34495E", // Default background
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#BDC3C7" }}>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Notice" sx={{ color: "#BDC3C7" }} />
        </ListItem>

        {/* Settings */}
        <ListItem
          button
          component={Link}
          to="/dashboard/settings"
          sx={{
            color: "#BDC3C7",
            fontSize: "16px",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#1ABC9C",
              color: "#FFFFFF",
            },
            backgroundColor: "#34495E", // Default background
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

export default Sidebar;




//old route#########################################

// import React from "react";
// import { Link } from "react-router-dom";
// const Sidebar = () => {
//   return (
//     <div>
//       <aside className="main-sidebar sidebar-dark-primary elevation-4">
//         {/* <!-- Brand Logo --> */}
//         <Link to="/dashboard" className="brand-link">
//           {/* <img
//             src="dist/img/AdminLTELogo.png"
//             alt="AdminLTE Logo"
//             className="brand-image img-circle elevation-3"
//             // style="opacity: .8"
//           /> */}
//           <span className="brand-text font-weight-light">Myoffice</span>
//         </Link>

//         {/* <!-- Sidebar --> */}
//         <div className="sidebar">
//           {/* <!-- Sidebar user panel (optional) --> */}
//           <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//             <div className="image">
//               {/* <img
//                 src="dist/img/user2-160x160.jpg"
//                 className="img-circle elevation-2"
//                 alt="User Image"
//               /> */}
//             </div>
//             <div className="info">
//               <Link to="#" className="d-block">
//                 Paaru Rawal
//               </Link>
//             </div>
//           </div>

//           {/* <!-- SidebarSearch Form --> */}
//           {/* <div className="form-inline">
//             <div className="input-group" data-widget="sidebar-search">
//               <input
//                 className="form-control form-control-sidebar"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-sidebar">
//                   <i className="fas fa-search fa-fw"></i>
//                 </button>
//               </div>
//             </div>
//           </div> */}

//           {/* <!-- Sidebar Menu --> */}
//           <nav className="mt-2">
//             <ul
//               className="nav nav-pills nav-sidebar flex-column"
//               data-widget="treeview"
//               role="menu"
//               data-accordion="false"
//             >
//               {/* <!-- Add icons to the links using the .nav-icon class
//                with font-awesome or any other icon font library --> */}
//               <li className="nav-item menu-open">
//                 <Link to="/dashboard" className="nav-link active">
//                   <i className="nav-icon fas fa-tachometer-alt"></i>
//                   <p>
//                     Dashboard
//                     {/* <i className="right fas fa-angle-left"></i> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* <li className="nav-item">
//                 <Link to="pages/loaner" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>

//                 </Link>
//               </li> */}
//               <li className="nav-item">
//                 <Link to="/dashboard/crm/" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     CRM
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* clients */}

//             {/* <li className="nav-item">
//                 <Link to="/dashboard/customer/list/" className="nav-link">
//                 <i className="nav-icon fas fa-user"></i>
//                   <p>
//                   customer
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   {/* </p>
//                 </Link>
//               </li>  */}
//               <li className="nav-item">
//                 <Link to="/dashboard/customer/" className="nav-link">
//                   <i className="nav-icon fas fa-user"></i>
//                   <p>
//                     Customer
//                     {/* <i className="fas fa-angle-left right"></i> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* leave */}
//               {/* <li className="nav-item">
//                 <Link to="/dashboard/leave" className="nav-link">
//                 <i className="nav-icon fas fa-user"></i>
//                   <p>
//                    leave */}
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   {/* </p>
//                 </Link>
//               </li> */}
//               {/* assets */}
//               <li className="nav-item">
//                 <Link to="/dashboard/assets" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Assets
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* Attendance */}
//               <li className="nav-item">
//                 <Link to="/dashboard/attendance" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Attendance
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* task */}
//               <li className="nav-item">
//                 <Link to="/dashboard/tax" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Tax
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* project */}
//               <li className="nav-item">
//                 <Link to="/dashboard/project" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Project
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* notice */}
//               <li className="nav-item">
//                 <Link to="/dashboard/notice" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Notice
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* setup */}
//               <li className="nav-item">
//                 <Link to="/dashboard/setup/" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Setup
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>

//               {/* settings */}
//               <li className="nav-item">
//                 <Link to="/dashboard/settings" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Settings
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//           {/* <!-- /.sidebar-menu --> */}
//         </div>
//         {/* <!-- /.sidebar --> */}
//       </aside>
//     </div>
//   );
// };
// export default Sidebar;
//old route end #############################

// import React from "react";
// import { Link } from "react-router-dom";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
// import { Dashboard, Person, Work, AccessAlarm, Settings, Assignment } from "@mui/icons-material";
// import { makeStyles } from "@mui/styles";
// import { useTheme } from "@mui/material/styles";

// const useStyles = makeStyles((theme) => ({
//   sidebar: {
//     width: 240,
//     flexShrink: 0,
//     backgroundColor: theme.palette.primary.main, // Set primary color for the sidebar
//   },
//   sidebarPaper: {
//     width: 240,
//     backgroundColor: theme.palette.primary.main,
//   },
//   activeLink: {
//     backgroundColor: theme.palette.secondary.main, // Active link color
//     '&:hover': {
//       backgroundColor: theme.palette.secondary.dark, // Hover effect
//     },
//   },
//   link: {
//     textDecoration: 'none',
//   },
//   icon: {
//     color: 'white',
//   },
//   listItemText: {
//     color: 'white', // White text for better visibility
//   },
//   userPanel: {
//     backgroundColor: theme.palette.primary.dark,
//     padding: theme.spacing(2),
//     color: 'white',
//     textAlign: 'center',
//   },
//   brandText: {
//     fontWeight: 'bold',
//     fontSize: '1.3rem',
//     color: 'white',
//   },
// }));

// const Sidebar = () => {
//   const classes = useStyles();
//   const theme = useTheme();

//   return (
//     <Drawer
//       variant="permanent"
//       className={classes.sidebar}
//       classes={{ paper: classes.sidebarPaper }}
//     >
//       {/* User Panel */}
//       <Box className={classes.userPanel}>
//         <Typography variant="h6">Paaru Rawal</Typography>
//       </Box>

//       {/* Brand Logo */}
//       <Box className={classes.userPanel}>
//         <Link to="/dashboard" className={classes.link}>
//           <Typography className={classes.brandText}>Myoffice</Typography>
//         </Link>
//       </Box>

//       {/* Sidebar Menu */}
//       <List>
//         <Link to="/dashboard" className={classes.link}>
//           <ListItem button className={classes.activeLink}>
//             <ListItemIcon>
//               <Dashboard className={classes.icon} />
//             </ListItemIcon>
//             <ListItemText className={classes.listItemText} primary="Dashboard" />
//           </ListItem>
//         </Link>

//         <Link to="/dashboard/crm" className={classes.link}>
//           <ListItem button>
//             <ListItemIcon>
//               <Assignment className={classes.icon} />
//             </ListItemIcon>
//             <ListItemText className={classes.listItemText} primary="CRM" />
//           </ListItem>
//         </Link>

//         <Link to="/dashboard/customer" className={classes.link}>
//           <ListItem button>
//             <ListItemIcon>
//               <Person className={classes.icon} />
//             </ListItemIcon>
//             <ListItemText className={classes.listItemText} primary="Customer" />
//           </ListItem>
//         </Link>

//         <Link to="/dashboard/assets" className={classes.link}>
//           <ListItem button>
//             <ListItemIcon>
//               <Work className={classes.icon} />
//             </ListItemIcon>
//             <ListItemText className={classes.listItemText} primary="Assets" />
//           </ListItem>
//         </Link>

//         <Link to="/dashboard/attendance" className={classes.link}>
//           <ListItem button>
//             <ListItemIcon>
//               <AccessAlarm className={classes.icon} />
//             </ListItemIcon>
//             <ListItemText className={classes.listItemText} primary="Attendance" />
//           </ListItem>
//         </Link>

//         <Link to="/dashboard/settings" className={classes.link}>
//           <ListItem button>
//             <ListItemIcon>
//               <Settings className={classes.icon} />
//             </ListItemIcon>
//             <ListItemText className={classes.listItemText} primary="Settings" />
//           </ListItem>
//         </Link>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;


// old sidebar######
// import React from "react";
// import { Link } from "react-router-dom";
// const Sidebar = () => {
//   return (
//     <div>
//       <aside className="main-sidebar sidebar-dark-primary elevation-4">
//         {/* <!-- Brand Logo --> */}
//         <Link to="/dashboard" className="brand-link">
//           {/* <img
//             src="dist/img/AdminLTELogo.png"
//             alt="AdminLTE Logo"
//             className="brand-image img-circle elevation-3"
//             // style="opacity: .8"
//           /> */}
//           <span className="brand-text font-weight-light">Myoffice</span>
//         </Link>

//         {/* <!-- Sidebar --> */}
//         <div className="sidebar">
//           {/* <!-- Sidebar user panel (optional) --> */}
//           <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//             <div className="image">
//               {/* <img
//                 src="dist/img/user2-160x160.jpg"
//                 className="img-circle elevation-2"
//                 alt="User Image"
//               /> */}
//             </div>
//             <div className="info">
//               <Link to="#" className="d-block">
//                 Paaru Rawal
//               </Link>
//             </div>
//           </div>

//           {/* <!-- SidebarSearch Form --> */}
//           {/* <div className="form-inline">
//             <div className="input-group" data-widget="sidebar-search">
//               <input
//                 className="form-control form-control-sidebar"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-sidebar">
//                   <i className="fas fa-search fa-fw"></i>
//                 </button>
//               </div>
//             </div>
//           </div> */}

//           {/* <!-- Sidebar Menu --> */}
//           <nav className="mt-2">
//             <ul
//               className="nav nav-pills nav-sidebar flex-column"
//               data-widget="treeview"
//               role="menu"
//               data-accordion="false"
//             >
//               {/* <!-- Add icons to the links using the .nav-icon class
//                with font-awesome or any other icon font library --> */}
//               <li className="nav-item menu-open">
//                 <Link to="/dashboard" className="nav-link active">
//                   <i className="nav-icon fas fa-tachometer-alt"></i>
//                   <p>
//                     Dashboard
//                     {/* <i className="right fas fa-angle-left"></i> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* <li className="nav-item">
//                 <Link to="pages/loaner" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>

//                 </Link>
//               </li> */}
//               <li className="nav-item">
//                 <Link to="/dashboard/crm/" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     CRM
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* clients */}

//             {/* <li className="nav-item">
//                 <Link to="/dashboard/customer/list/" className="nav-link">
//                 <i className="nav-icon fas fa-user"></i>
//                   <p>
//                   customer
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   {/* </p>
//                 </Link>
//               </li>  */}
//               <li className="nav-item">
//                 <Link to="/dashboard/customer/" className="nav-link">
//                   <i className="nav-icon fas fa-user"></i>
//                   <p>
//                     Customer
//                     {/* <i className="fas fa-angle-left right"></i> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* leave */}
//               {/* <li className="nav-item">
//                 <Link to="/dashboard/leave" className="nav-link">
//                 <i className="nav-icon fas fa-user"></i>
//                   <p>
//                    leave */}
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   {/* </p>
//                 </Link>
//               </li> */}
//               {/* assets */}
//               <li className="nav-item">
//                 <Link to="/dashboard/assets" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Assets
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* Attendance */}
//               <li className="nav-item">
//                 <Link to="/dashboard/attendance" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Attendance
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* task */}
//               <li className="nav-item">
//                 <Link to="/dashboard/tax" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Tax
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* project */}
//               <li className="nav-item">
//                 <Link to="/dashboard/project" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Project
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* notice */}
//               <li className="nav-item">
//                 <Link to="/dashboard/notice" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Notice
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//               {/* setup */}
//               <li className="nav-item">
//                 <Link to="setup/" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Setup
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>

//               {/* settings */}
//               <li className="nav-item">
//                 <Link to="/dashboard/settings" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Settings
//                     {/* <span className="right badge badge-danger">New</span> */}
//                   </p>
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//           {/* <!-- /.sidebar-menu --> */}
//         </div>
//         {/* <!-- /.sidebar --> */}
//       </aside>
//     </div>
//   );
// };
// export default Sidebar;
