

import { useState } from "react";
import { Link } from "react-router-dom"; // Use Link to route
// import Footer from "../admin/components/footer/Footer";
// import DefaultHeader from "../admin/components/navbar/DefaultHeader";
// import Sidebar from "./components/sidebar/Sidebar";
import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import { AccountCircle, People, Work } from "@mui/icons-material"; // Icons for CRM, Clients, HRM

const AdminDashboard = () => {
  const [enquiriesCount, setEnquiriesCount] = useState(30);
  const [clientsCount, setClientsCount] = useState(40);
  const [hrCount, setHrCount] = useState(10); // For example, HR staff count

  return (
    <>

      <div className="flex-grow-1 bg-light">


        <div className="content-wrapper mt-6 marginTop:20">
          <div className="row" style={{ padding: "0 20px" }}>
            {/* Enquiries Card */}
            <Box className="col-lg-3 col-md-4 col-6 mb-4">
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardActionArea
                  component={Link}
                  to="/dashboard/crm"
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}
                >
                  {/* <CardActionArea component={Link} to="/dashboard/crm/enquiry/" sx={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}> */}
                  <CardContent sx={{ textAlign: "center", padding: "16px" }}>
                    <AccountCircle sx={{ fontSize: 40, color: "#FFB74D" }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, marginTop: 2, color: "#FFB74D" }}>
                      {enquiriesCount}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, marginTop: 1, color: "#FFB74D" }}>
                      CRM
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>



            {/* Clients Card */}
            <Box className="col-lg-3 col-md-4 col-6 mb-4">
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardActionArea component={Link} to="/dashboard/customer/customer-list/" sx={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                  <CardContent sx={{ textAlign: "center", padding: "16px" }}>
                    <People sx={{ fontSize: 40, color: "#EF5350" }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, marginTop: 2, color: "#EF5350" }}>
                      {clientsCount}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, marginTop: 1, color: "#EF5350" }}>
                      Clients
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>

            {/* HR Card */}
            <Box className="col-lg-3 col-md-4 col-6 mb-4">
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardActionArea component={Link} to="/dashboard/hrm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                  <CardContent sx={{ textAlign: "center", padding: "16px" }}>
                    <Work sx={{ fontSize: 40, color: "#64B5F6" }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, marginTop: 2, color: "#64B5F6" }}>
                      {hrCount}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, marginTop: 1, color: "#64B5F6" }}>
                      HRM
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </div>
        </div>


      </div>
    </>

  );
};

export default AdminDashboard;

//second changes design working
// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Use Link to route
// import Footer from "../admin/components/footer/Footer";
// import DefaultHeader from "../admin/components/navbar/DefaultHeader";
// import Sidebar from "./components/sidebar/Sidebar";

// const AdminDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10); // For example, HR staff count

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <Sidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row">
//               {/* Enquiries Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4 "style={{ paddingLeft: "100px" }} >
//                 <div className="small-box text-bg-warning shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{enquiriesCount}</h3>
//                     <p>CRM</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/crm" // Example path for enquiries module
//                     className="small-box-footer link-dark link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Clients Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4" style={{ paddingLeft: "100px"}}>
//                 <div className="small-box text-bg-danger shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{clientsCount}</h3>
//                     <p>Clients</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"></path>
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/customer/customer-list/" // Example path for clients module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* HR Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>HRM</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/hrm" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// #############old dashbaord ##############
// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Use Link to route
// import Footer from "../admin/components/footer/Footer";
// import DefaultHeader from "../admin/components/navbar/DefaultHeader";
// import Sidebar from "./components/sidebar/Sidebar";

// const AdminDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10); // For example, HR staff count

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <Sidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row">
//               {/* Enquiries Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4 "style={{ paddingLeft: "100px" }} >
//                 <div className="small-box text-bg-warning shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{enquiriesCount}</h3>
//                     <p>CRM</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/crm/enquiry/" // Example path for enquiries module
//                     className="small-box-footer link-dark link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Clients Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4" style={{ paddingLeft: "100px"}}>
//                 <div className="small-box text-bg-danger shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{clientsCount}</h3>
//                     <p>Clients</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"></path>
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/customer/list" // Example path for clients module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* HR Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>HRM</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/hrm" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



//#####old dashboard end###############

