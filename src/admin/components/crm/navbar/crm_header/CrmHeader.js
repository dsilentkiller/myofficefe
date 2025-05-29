
//this is new navbarwith perfect design and mobile responsive navbar.
import "../../../../css/crm/components/navbar/crmHeader.css";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Category as CategoryIcon,
  Assignment as AssignmentIcon,
  FollowTheSigns as FollowTheSignsIcon,
  Event as EventIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Category", icon: <CategoryIcon />, path: "/dashboard/crm/category/" },
  { label: "Enquiry", icon: <AssignmentIcon />, path: "/dashboard/crm/enquiry" },
  { label: "Followup", icon: <FollowTheSignsIcon />, path: "/dashboard/crm/follow" },
  { label: "Project", icon: <AssignmentIcon />, path: "/dashboard/crm/project/" },
  { label: "Event", icon: <EventIcon />, path: "/dashboard/crm/event/" },
  { label: "Meeting Update", icon: <AssignmentIcon />, path: "/dashboard/crm/meetings/" },
  { label: "Quotation", icon: <AssignmentIcon />, path: "/dashboard/crm/quotations/" },
  { label: "Proposal", icon: <AssignmentIcon />, path: "/dashboard/crm/proposals" },
];

const CrmHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawer = (
    <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
      <List>
        {navLinks.map((link) => (
          <ListItem button key={link.label} component={Link} to={link.path}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CRM Dashboard
          </Typography>

          {/* Navigation Links (Hide on Mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    marginRight: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton color="inherit">{link.icon}</IconButton>
                  {link.label}
                </Link>
              ))}
            </Box>
          )}

          {/* Search Box */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            {/* <SearchIcon /> */}
            <InputBase
              placeholder="Search"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
                paddingX: 1,
                paddingY: 0.5,
                marginLeft: 1,
                width: isMobile ? "100px" : "200px",
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default CrmHeader;

//without mobile responsive design
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import CategoryIcon from "@mui/icons-material/Category";
// import EventIcon from "@mui/icons-material/Event";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
// const CrmHeader = () => {
//   return (
//     <div>
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           {/* Mobile Menu Icon (optional) */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* App title (if any) */}
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             CRM Dashboard
//           </Typography>

//           {/* Left Navbar Links */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Link
//               to="/dashboard/crm/category/"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <CategoryIcon />
//               </IconButton>
//               Category
//             </Link>

//             <Link
//               to="/dashboard/crm/enquiry"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <AssignmentIcon />
//               </IconButton>
//               Enquiry
//             </Link>

//             <Link
//               to="/dashboard/crm/follow"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <FollowTheSignsIcon />
//               </IconButton>
//               Followup
//             </Link>

//             <Link
//               to="/dashboard/crm/project/"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <AssignmentIcon />
//               </IconButton>
//               Project
//             </Link>

//             <Link
//               to="/dashboard/crm/event/"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <EventIcon />
//               </IconButton>
//               Event
//             </Link>
//             {/* quotation */}
//             <Link
//               to="/dashboard/crm/meetings/"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <AssignmentIcon />
//               </IconButton>
//               Meeting Update
//             </Link>

//             {/* quotation */}
//             <Link
//               to="/dashboard/crm/quotations/"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <AssignmentIcon />
//               </IconButton>
//               Quotation
//             </Link>
//             {/* quotation */}
//             <Link
//               to="/dashboard/crm/proposals"
//               style={{
//                 color: "inherit",
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color="inherit">
//                 <AssignmentIcon />
//               </IconButton>
//               Proposal
//             </Link>
//           </Box>

//           {/* Right Navbar Search */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton color="inherit">
//               <SearchIcon />
//             </IconButton>
//             <input
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "4px",
//                 padding: "5px 10px",
//                 marginRight: "10px",
//                 border: "none",
//                 outline: "none",
//               }}
//             />
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default CrmHeader;
// const CrmHeader = () => {
//   return (
//     <div className="content-area">
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }} className="crm-icon-btn">
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: "#1565c0" }}>
//             CRM Dashboard
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", fontWeight: 700 }}>
//             <Link to="/dashboard/crm/category/" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <CategoryIcon />
//               </IconButton>
//               Category
//             </Link>

//             <Link to="/dashboard/crm/enquiry" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <AssignmentIcon />
//               </IconButton>
//               Enquiry
//             </Link>

//             <Link to="/dashboard/crm/follow" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <FollowTheSignsIcon />
//               </IconButton>
//               Followup
//             </Link>

//             <Link to="/dashboard/crm/project/" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <AssignmentIcon />
//               </IconButton>
//               Project
//             </Link>

//             <Link to="/dashboard/crm/event/" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <EventIcon />
//               </IconButton>
//               Event
//             </Link>

//             <Link to="/dashboard/crm/meetings/" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <AssignmentIcon />
//               </IconButton>
//               Meeting Update
//             </Link>

//             <Link to="/dashboard/crm/quotations/" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <AssignmentIcon />
//               </IconButton>
//               Quotation
//             </Link>

//             <Link to="/dashboard/crm/proposals" className="crm-link">
//               <IconButton className="crm-icon-btn" size="small">
//                 <AssignmentIcon />
//               </IconButton>
//               Proposal
//             </Link>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton className="crm-icon-btn" size="small">
//               <SearchIcon />
//             </IconButton>
//             <input
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "4px",
//                 padding: "5px 10px",
//                 marginRight: "10px",
//                 border: "none",
//                 outline: "none",
//               }}
//             />
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default CrmHeader;


// import React from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu"; // Icon for menu (if needed for mobile)
// import SearchIcon from "@mui/icons-material/Search"; // Icon for search
// import CategoryIcon from "@mui/icons-material/Category"; // Icon for Category
// import EventIcon from "@mui/icons-material/Event"; // Icon for Event
// import AssignmentIcon from "@mui/icons-material/Assignment"; // Icon for Enquiry
// import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns"; // Icon for Followup
// import "../../../"
// import "../../css/crm/components/navbar/crmHeader.css"
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   InputBase,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import CategoryIcon from "@mui/icons-material/Category";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
// import EventIcon from "@mui/icons-material/Event";
// import SearchIcon from "@mui/icons-material/Search";

// import { Link } from "react-router-dom";

// const menuLinks = [
//   { to: "/dashboard/crm/category/", label: "Category", icon: <CategoryIcon /> },
//   { to: "/dashboard/crm/enquiry", label: "Enquiry", icon: <AssignmentIcon /> },
//   { to: "/dashboard/crm/follow", label: "Followup", icon: <FollowTheSignsIcon /> },
//   { to: "/dashboard/crm/project/", label: "Project", icon: <AssignmentIcon /> },
//   { to: "/dashboard/crm/event/", label: "Event", icon: <EventIcon /> },
//   { to: "/dashboard/crm/meetings/", label: "Meeting Update", icon: <AssignmentIcon /> },
//   { to: "/dashboard/crm/quotations/", label: "Quotation", icon: <AssignmentIcon /> },
//   { to: "/dashboard/crm/proposals", label: "Proposal", icon: <AssignmentIcon /> },
// ];

// const professionalBlue = "#1565c0";

// const CrmHeader = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const iconButtonSx = {
//     bgcolor: professionalBlue,
//     color: "white",
//     borderRadius: "50%",
//     p: 1,
//     mr: 1,
//     "&:hover": {
//       bgcolor: "#0d3c75",
//     },
//   };

//   return (
//     <>
//       <AppBar position="static" color="default" sx={{ boxShadow: "none" }}>
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             bgcolor: "#fff",
//             px: { xs: 1, sm: 3 },
//             py: { xs: 1, sm: 1.5 },
//           }}
//         >
//           {isMobile && (
//             <IconButton
//               edge="start"
//               aria-label="menu"
//               onClick={() => setDrawerOpen(true)}
//               sx={iconButtonSx}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}

//           <Typography
//             variant="h6"
//             sx={{
//               flexGrow: 1,
//               fontWeight: 700,
//               color: professionalBlue,
//               textAlign: isMobile ? "center" : "left",
//               mr: isMobile ? 0 : 2,
//             }}
//           >
//             CRM Dashboard
//           </Typography>

//           {!isMobile && (
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               {menuLinks.map(({ to, label, icon }) => (
//                 <Link
//                   key={label}
//                   to={to}
//                   style={{
//                     color: professionalBlue,
//                     textDecoration: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: 700,
//                     fontSize: "1rem",
//                     marginRight: "20px",
//                   }}
//                 >
//                   <IconButton size="small" sx={iconButtonSx}>
//                     {icon}
//                   </IconButton>
//                   {label}
//                 </Link>
//               ))}
//             </Box>
//           )}

//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton size="small" sx={iconButtonSx}>
//               <SearchIcon />
//             </IconButton>
//             <InputBase
//               placeholder="Search"
//               inputProps={{ "aria-label": "search" }}
//               sx={{
//                 bgcolor: "#fff",
//                 borderRadius: 1,
//                 px: 1.5,
//                 py: 0.5,
//                 ml: 1,
//                 width: { xs: 100, sm: 200 },
//                 border: "1px solid #ccc",
//               }}
//             />
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         ModalProps={{ keepMounted: true }}
//       >
//         <Box
//           sx={{ width: 250 }}
//           role="presentation"
//           onClick={() => setDrawerOpen(false)}
//           onKeyDown={() => setDrawerOpen(false)}
//         >
//           <List>
//             {menuLinks.map(({ to, label, icon }) => (
//               <ListItemButton
//                 key={label}
//                 component={Link}
//                 to={to}
//                 sx={{ color: professionalBlue }}
//               >
//                 <ListItemIcon sx={{ color: professionalBlue }}>{icon}</ListItemIcon>
//                 <ListItemText primary={label} sx={{ fontWeight: 700 }} />
//               </ListItemButton>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default CrmHeader;

// import React from "react";



// const CrmHeader = () => {
//   return (
//     <div className="content-area">
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           {/* Mobile Menu Icon (optional) */}
//           <IconButton
//             edge="start"
//             color= "#1565c0"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* App title (if any) */}
//           <Typography variant="h6" sx={{ flexGrow: 1,color:"#1565c0" ,fontWeight:700}}>
//             CRM Dashboard
//           </Typography>

//           {/* Left Navbar Links */}
//           <Box sx={{ display: "flex", alignItems: "center",fontWeight: 700 }}>
//             <Link
//               to="/dashboard/crm/category/"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <CategoryIcon />
//               </IconButton>
//               Category
//             </Link>

//             <Link
//               to="/dashboard/crm/enquiry"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <AssignmentIcon />
//               </IconButton>
//               Enquiry
//             </Link>

//             <Link
//               to="/dashboard/crm/follow"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <FollowTheSignsIcon />
//               </IconButton>
//               Followup
//             </Link>

//             <Link
//               to="/dashboard/crm/project/"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <AssignmentIcon />
//               </IconButton>
//               Project
//             </Link>

//             <Link
//               to="/dashboard/crm/event/"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <EventIcon />
//               </IconButton>
//               Event
//             </Link>
//             {/* quotation */}
//             <Link
//               to="/dashboard/crm/meetings/"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <AssignmentIcon />
//               </IconButton>
//               Meeting Update
//             </Link>

//             {/* quotation */}
//             <Link
//               to="/dashboard/crm/quotations/"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <AssignmentIcon />
//               </IconButton>
//               Quotation
//             </Link>
//             {/* quotation */}
//             <Link
//               to="/dashboard/crm/proposals"
//               style={{
//                 color:  "#1565c0" ,
//                 textDecoration: "none",
//                 marginRight: "20px",
//               }}
//             >
//               <IconButton color= "#1565c0" >
//                 <AssignmentIcon />
//               </IconButton>
//               Proposal
//             </Link>
//           </Box>

//           {/* Right Navbar Search */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton color= "#1565c0" >
//               <SearchIcon />
//             </IconButton>
//             <input
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "4px",
//                 padding: "5px 10px",
//                 marginRight: "10px",
//                 border: "none",
//                 outline: "none",
//               }}
//             />
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default CrmHeader;

