
import Sidebar from "../components/common/sidebar/Sidebar";
import AdminDefaultHeader from "../components/common/navbar/AdminDefaultHeader";
import Footer from "../components/common/footer/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* Sidebar */}
      <Box sx={{ width: 240, flexShrink: 0, bgcolor: "#f4f4f4" }}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        
        {/* Header */}
        <AdminDefaultHeader />

        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;


// import Sidebar from "../app/components/sidebar/Sidebar";
// import AdminDefaultHeader from "../app/components/navbar/default/AdminDefaultHeader";
// import Footer from "../app/components/footer/Footer";
// import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import "../admin/css/crm/layout/AdminDashboardLayout.css";  // Import the CSS file for styling



// #latest
// const AdminDashboardLayout = () => {
//   return (
//      <div className="content-wrapper">
//     <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      
//       {/* Global header */}
//       <div className="default-header">
//         <AdminDefaultHeader />
//       </div>

//       {/* Sidebar + Main content */}
//       <Box sx={{ display: "flex", flex: 1 }}>
//         <div className="sidebar">
//           <Sidebar />
//         </div>

//         <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
//           {/* This will render nested routes like SetupDashboard */}
//           <Outlet />
//         </Box>
//       </Box>

//       {/* Footer */}
//       <div className="footer">
//         <Footer />
//       </div>
//     </Box>
//     </div>
//   );
// };

// export default AdminDashboardLayout;

// const AdminDashboardLayout = () => {
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
//       {/* Global header */}
//       <div className="default-header">
//         <DefaultHeader />
//       </div>

//       {/* Dashboard layout for different components */}
//       <Box sx={{ display: "flex", flex: 1 }}>
//         <div className="sidebar">
//           <Sidebar />
//         </div>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Outlet />
//         </Box>
//       </Box>

//       {/* Global footer */}
//       <div className="footer">
//         <Footer />
//       </div>
//     </Box>
//   );
// };

// export default AdminDashboardLayout;

// import React from "react";
// import Sidebar from "./components/sidebar/Sidebar";
// import DefaultHeader from "../admin/components/navbar/DefaultHeader";
// import Footer from "../admin/components/footer/Footer";
// import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";

// const AdminDashboardLayout = ({ children }) => {
//   return (
//     // global header
//     <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
//       <DefaultHeader />
// {/* dashboard for all different components */}
//       <Box sx={{ display: "flex", flex: 1 }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Outlet/>
//         </Box>
//       </Box>
// {/* global footer  */}
//       <Footer />
//     </Box>
//   );
// };

// export default AdminDashboardLayout;
