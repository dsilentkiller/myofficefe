
// import React from 'react';
// import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const HrmDashboard = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <Grid container spacing={4} justifyContent="center">
//       {/* Leave Card */}
//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ maxWidth: 345 }}>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Leave
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Manage employee leaves and approvals.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ marginTop: 2 }}
//               onClick={() => handleNavigation('leave/list')}
//             >
//               Go to Leave Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Assets Card */}
//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ maxWidth: 345 }}>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Assets
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Manage company assets.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ marginTop: 2 }}
//               onClick={() => handleNavigation('assets')}
//             >
//               Go to Assets Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Employee Card */}
//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ maxWidth: 345 }}>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Employee
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               View employee details and management.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ marginTop: 2 }}
//               onClick={() => handleNavigation('employee')}
//             >
//               Go to Employee Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Shift Card */}
//       <Grid item xs={12} sm={6} md={3}>
//         <Card sx={{ maxWidth: 345 }}>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Shift
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Manage employee shifts and schedules.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ marginTop: 2 }}
//               onClick={() => handleNavigation('/dashboard/hrm/shift')}
//             >
//               Go to Shift Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default HrmDashboard;

//new dashboard
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import DefaultHeader from "../components/navbar/DefaultHeader";
import HrmSidebar from "../components/sidebar/HrmSidebar";
import { Outlet } from 'react-router-dom';
import HrmNavbar from "../components/navbar/Hrmheader";

import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import { AccountCircle, People, Work, CalendarToday, AttachMoney, Business, Build , People as EmployeeIcon, Storage as AdditionalAssetIcon } from "@mui/icons-material"; // Icons for different sections
// import "../css/hrmDashboard.css"
const HrmDashboard = () => {
  // Static data for demonstration purposes (can be dynamic as needed)
  const [enquiriesCount, setEnquiriesCount] = useState(30);
  const [clientsCount, setClientsCount] = useState(40);
  const [hrCount, setHrCount] = useState(10);

  return (
    <div className="container-wrapper">
      <div className="d-flex min-h-screen bg-light">
        <HrmSidebar />
        <div className="flex-grow-1 bg-light">
    
          <div className="flex flex-col">
            <HrmNavbar/>
          </div>

          <div className="content-wrapper mt-6">
            <div className="row justify-content-center">
              {/* Employee Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="employee/employee-list" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <People style={{ fontSize: 40 }} />
                        <Typography variant="h6">{hrCount}</Typography>
                        <Typography variant="body2" color="textPrimary">Employees</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>

              </div>  */}

              {/* Leave Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="leave" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <CalendarToday style={{ fontSize: 40 }} />
                        <Typography variant="h6">{enquiriesCount}</Typography>
                        <Typography variant="body2" color="textSecondary">Leave</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div> */}

              {/* Assets Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="/dashboard/customer/list" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <Business style={{ fontSize: 40 }} />
                        <Typography variant="h6">{clientsCount}</Typography>
                        <Typography variant="body2" color="textSecondary">Assets</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div> */}

              {/* Attendance Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="/dashboard/hr" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <Work style={{ fontSize: 40 }} />
                        <Typography variant="h6">{hrCount}</Typography>
                        <Typography variant="body2" color="textSecondary">Attendance</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div> */}

              {/* Tasks Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="/dashboard/hr" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <Build style={{ fontSize: 40 }} />
                        <Typography variant="h6">{hrCount}</Typography>
                        <Typography variant="body2" color="textSecondary">Tasks</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div> */}

              {/* Payroll Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="/dashboard/payroll" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <AttachMoney style={{ fontSize: 40 }} />
                        <Typography variant="h6">{hrCount}</Typography>
                        <Typography variant="body2" color="textSecondary">Payroll</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div> */}

              {/* Shifts Card */}
              {/* <div className="col-lg-1 col-md-2 col-4 mb-4">
                <Link to="/dashboard/shifts" className="card-link">
                  <Card className="card-sm">
                    <CardActionArea>
                      <CardContent className="text-center">
                        <Work style={{ fontSize: 40 }} />
                        <Typography variant="h6">{hrCount}</Typography>
                        <Typography variant="body2" color="textSecondary">Shifts</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div> */}
                {/* Employee Card */}
        {/* <Box item xs={12} sm={6} md={3}>
          <Card component={Link} to="/dashboard/hrm/employee" className="card-link">
            <CardContent className="card-content">
              <EmployeeIcon fontSize="large" color="primary" />
              <Typography variant="h5" gutterBottom>
                Employees
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View and manage employees
              </Typography>
            </CardContent>
          </Card>
        </Box> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {/* <Outlet /> This will render the nested routes */}
    </div>
  );
};

export default HrmDashboard;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/footer/Footer";
// import DefaultHeader from "../components/navbar/DefaultHeader";
// import HrmSidebar from "../components/sidebar/HrmSidebar";
// import { Outlet } from 'react-router-dom';

// import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
// import { AccountCircle, People, Work, CalendarToday, AttachMoney, Business, Build } from "@mui/icons-material"; // Icons for different sections

// const HrmDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10);

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <HrmSidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row justify-content-center">
//               {/* Employee Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="employee" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea>
//                       <CardContent className="text-center">
//                         <People style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{hrCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Employees</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>

//               {/* Leave Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="leave" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea>
//                       <CardContent className="text-center">
//                         <CalendarToday style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{enquiriesCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Leave Requests</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>

//               {/* Assets Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="/dashboard/customer/list" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea>
//                       <CardContent className="text-center">
//                         <Business style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{clientsCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Assets</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>

//               {/* Attendance Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea>
//                       <CardContent className="text-center">
//                         <Work style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{hrCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Attendance</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>

//               {/* Tasks Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea>
//                       <CardContent className="text-center">
//                         <Build style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{hrCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Tasks</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>

//               {/* Payroll Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="/dashboard/payroll" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea>
//                       <CardContent className="text-center">
//                         <AttachMoney style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{hrCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Payroll</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>

//               {/* Shifts Card */}
//               <div className="col-lg-1 col-md-2 col-4 mb-4">
//                 <Link to="/dashboard/shifts" className="card-link">
//                   <Card className="card-sm">
//                     <CardActionArea >
//                       <CardContent className="text-center"  to="/dashboard/shifts">
//                         <Work style={{ fontSize: 40 }} />
//                         <Typography variant="h6">{hrCount}</Typography>
//                         <Typography variant="body2" color="textSecondary">Shifts</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <Outlet /> {/* This will render the nested routes */}
//     </div>
//   );
// };

// export default HrmDashboard;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/footer/Footer";
// import DefaultHeader from "../components/navbar/DefaultHeader";
// import HrmSidebar from "../components/sidebar/HrmSidebar";
// import { Outlet } from 'react-router-dom';

// import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
// import { AccountCircle, People, Work } from "@mui/icons-material"; // Icons for CRM, Clients, HRM
// const HrmDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10);

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <HrmSidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row justify-content-center">
//               {/* Employee Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="employee" className="card-link">
//                   <div className="small-box bg-primary shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-users fa-2x mb-3"></i> {/* Employee Icon */}
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Employees</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Leave Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="leave" className="card-link">
//                   <div className="small-box bg-warning shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-calendar-alt fa-2x mb-3"></i> {/* Leave Icon */}
//                       <h2>{enquiriesCount}</h2>
//                       <p className="fw-bold">Leave Requests</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>


//               {/* Assets Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/customer/list" className="card-link">
//                   <div className="small-box bg-danger shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-boxes fa-2x mb-3"></i> {/* Assets Icon */}
//                       <h2>{clientsCount}</h2>
//                       <p className="fw-bold">Assets</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Attendance Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-info shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-clock fa-2x mb-3"></i> {/* Attendance Icon */}
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Attendance</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Tasks Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-success shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-tasks fa-2x mb-3"></i> {/* Tasks Icon */}
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Tasks</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//                            {/* Payroll Card */}
//                            <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/payroll" className="card-link">
//                   <div className="small-box bg-secondary shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-dollar-sign fa-2x mb-3"></i> {/* Payroll Icon */}
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Payroll</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Shifts Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/shifts" className="card-link">
//                   <div className="small-box bg-dark shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-briefcase fa-2x mb-3"></i> {/* Shift Icon */}
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Shifts</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Setup Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-secondary shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <i className="fas fa-cogs fa-2x mb-3"></i> {/* Setup Icon */}
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Setup</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//        <Outlet />     {/* //This will render the nested routes */}
//         </div>
//       </div>
//       <Footer />

//     </div>
//   );
// };

// export default HrmDashboard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/footer/Footer";
// import DefaultHeader from "../components/navbar/DefaultHeader";
// import HrmSidebar from "../components/sidebar/HrmSidebar";

// const HrmDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10);

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <HrmSidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row justify-content-center">
//               {/* Employee Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-primary shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Employees</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Leave Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/crm/enquiry/" className="card-link">
//                   <div className="small-box bg-warning shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <h2>{enquiriesCount}</h2>
//                       <p className="fw-bold">Leave Requests</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Assets Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/customer/list" className="card-link">
//                   <div className="small-box bg-danger shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <h2>{clientsCount}</h2>
//                       <p className="fw-bold">Assets</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Attendance Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-info shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Attendance</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Tasks Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-success shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Tasks</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Setup Card */}
//               <div className="col-lg-3 col-md-4 col-6 mb-4">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-secondary shadow-lg rounded-lg p-4">
//                     <div className="inner text-center">
//                       <h2>{hrCount}</h2>
//                       <p className="fw-bold">Setup</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HrmDashboard;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/footer/Footer";
// import DefaultHeader from "../components/navbar/DefaultHeader";
// import HrmSidebar from "../components/sidebar/HrmSidebar";

// const HrmDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10);

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <HrmSidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row justify-content-center">
//               {/* Employee Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-primary shadow-lg rounded">
//                     <div className="inner text-center">
//                       <h3>{hrCount}</h3>
//                       <p>Employees</p>
//                     </div>
//                     <svg
//                       className="small-box-icon"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path d="M18 12c0 2.78-2.22 5-5 5s-5-2.22-5-5 2.22-5 5-5 5 2.22 5 5zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z"></path>
//                     </svg>
//                   </div>
//                 </Link>
//               </div>

//               {/* Leave Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <Link to="/dashboard/crm/enquiry/" className="card-link">
//                   <div className="small-box bg-warning shadow-lg rounded">
//                     <div className="inner text-center">
//                       <h3>{enquiriesCount}</h3>
//                       <p>Leave Requests</p>
//                     </div>
//                     <svg
//                       className="small-box-icon"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path d="M6 3h12c.55 0 1 .45 1 1v16c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1z"></path>
//                       <path d="M9 6h6v12H9z"></path>
//                     </svg>
//                   </div>
//                 </Link>
//               </div>

//               {/* Assets Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <Link to="/dashboard/customer/list" className="card-link">
//                   <div className="small-box bg-danger shadow-lg rounded">
//                     <div className="inner text-center">
//                       <h3>{clientsCount}</h3>
//                       <p>Assets</p>
//                     </div>
//                     <svg
//                       className="small-box-icon"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path d="M12 1v2h6.5l-9 9-2-2 9-9H12z"></path>
//                       <path d="M4 10v4h4v6H4v2h12v-2h-4v-6h4v-4H4z"></path>
//                     </svg>
//                   </div>
//                 </Link>
//               </div>

//               {/* Attendance Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-info shadow-lg rounded">
//                     <div className="inner text-center">
//                       <h3>{hrCount}</h3>
//                       <p>Attendance</p>
//                     </div>
//                     <svg
//                       className="small-box-icon"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path d="M7 9h10V7H7v2zm0 4h10v-2H7v2z"></path>
//                     </svg>
//                   </div>
//                 </Link>
//               </div>

//               {/* Tasks Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-success shadow-lg rounded">
//                     <div className="inner text-center">
//                       <h3>{hrCount}</h3>
//                       <p>Tasks</p>
//                     </div>
//                     <svg
//                       className="small-box-icon"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path d="M4 3h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"></path>
//                     </svg>
//                   </div>
//                 </Link>
//               </div>

//               {/* Setup Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <Link to="/dashboard/hr" className="card-link">
//                   <div className="small-box bg-secondary shadow-lg rounded ractangular">
//                     <div className="inner text-center">
//                       <h3>{hrCount}</h3>
//                       <p>Setup</p>
//                     </div>
//                     <svg
//                       className="small-box-icon"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path d="M16 0v2H8V0H6v2H4c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1h-2V0h-2v2H8V0H6v2H4c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"></path>
//                     </svg>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HrmDashboard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Use Link to route
// import Footer from "../components/footer/Footer";
// import DefaultHeader from "../components/navbar/DefaultHeader";
// import HrmSidebar from "../components/sidebar/HrmSidebar";

// const HrmDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10); // For example, HR staff count

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <HrmSidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row justify-content-center ">
//               {/* added */}



// {/* ended */}
//               {/* Employee Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <div className="small-box bg-primary shadow-lg rounded">
//                   <div className="inner text-center">
//                     <h3>{hrCount}</h3>
//                     <p>Employees</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M18 12c0 2.78-2.22 5-5 5s-5-2.22-5-5 2.22-5 5-5 5 2.22 5 5zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/hr"
//                     className="small-box-footer link-light link-underline-opacity-0"
//                   >
//                     More info <i className="bi bi-arrow-right-circle"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Leave Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <div className="small-box bg-warning shadow-lg rounded">
//                   <div className="inner text-center">
//                     <h3>{enquiriesCount}</h3>
//                     <p>Leave Requests</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M6 3h12c.55 0 1 .45 1 1v16c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1z"></path>
//                     <path d="M9 6h6v12H9z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/crm/enquiry/"
//                     className="small-box-footer link-dark link-underline-opacity-0"
//                   >
//                     More info <i className="bi bi-arrow-right-circle"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Assets Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <div className="small-box bg-danger shadow-lg rounded">
//                   <div className="inner text-center">
//                     <h3>{clientsCount}</h3>
//                     <p>Assets</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M12 1v2h6.5l-9 9-2-2 9-9H12z"></path>
//                     <path d="M4 10v4h4v6H4v2h12v-2h-4v-6h4v-4H4z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/customer/list"
//                     className="small-box-footer link-light link-underline-opacity-0"
//                   >
//                     More info <i className="bi bi-arrow-right-circle"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Attendance Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <div className="small-box bg-info shadow-lg rounded">
//                   <div className="inner text-center">
//                     <h3>{hrCount}</h3>
//                     <p>Attendance</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M7 9h10V7H7v2zm0 4h10v-2H7v2z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/hr"
//                     className="small-box-footer link-light link-underline-opacity-0"
//                   >
//                     More info <i className="bi bi-arrow-right-circle"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Tasks Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <div className="small-box bg-success shadow-lg rounded">
//                   <div className="inner text-center">
//                     <h3>{hrCount}</h3>
//                     <p>Tasks</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M4 3h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/hr"
//                     className="small-box-footer link-light link-underline-opacity-0"
//                   >
//                     More info <i className="bi bi-arrow-right-circle"></i>
//                   </Link>
//                 </div>
//               </div>

//               {/* Setup Card */}
//               <div className="col-lg-2 col-md-3 col-6 mb-3">
//                 <div className="small-box bg-secondary shadow-lg rounded">
//                   <div className="inner text-center">
//                     <h3>{hrCount}</h3>
//                     <p>Setup</p>
//                   </div>
//                   <svg
//                     className="small-box-icon"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path d="M16 0v2H8V0H6v2H4c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1h-2V0h-2v2H8V0H6v2H4c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1h-2V0h-2v2H8V0H6v2H4c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"></path>
//                   </svg>
//                   <Link
//                     to="/dashboard/hr"
//                     className="small-box-footer link-light link-underline-opacity-0"
//                   >
//                     More info <i className="bi bi-arrow-right-circle"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HrmDashboard

// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Use Link to route
// import Footer from "../components/footer/Footer";
// import DefaultHeader from "../components/navbar/DefaultHeader";

// import HrmSidebar from "../components/sidebar/HrmSidebar";

// const HrmDashboard = () => {
//   // Static data for demonstration purposes (can be dynamic as needed)
//   const [enquiriesCount, setEnquiriesCount] = useState(30);
//   const [clientsCount, setClientsCount] = useState(40);
//   const [hrCount, setHrCount] = useState(10); // For example, HR staff count

//   return (
//     <div className="container-wrapper">
//       <div className="d-flex min-h-screen bg-light">
//         <HrmSidebar />
//         <div className="flex-grow-1 bg-light">
//           <div className="flex flex-col">
//             <DefaultHeader />
//           </div>

//           <div className="content-wrapper mt-6">
//             <div className="row">
//             <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>employee</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/* leave Card */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3 "style={{ paddingLeft: "100px" }} >
//                 <div className="small-box text-bg-warning shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{enquiriesCount}</h3>
//                     <p>leave</p>
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
//               <div className="col-lg-2 col-md-3 col-6 mb-3" style={{ paddingLeft: "100px"}}>
//                 <div className="small-box text-bg-danger shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{clientsCount}</h3>
//                     <p>assets</p>
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

//               {/* attendance */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>attendance</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/* notice */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>notice</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/* task */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>task</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/* payroll */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>payroll</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/*shift */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>shift</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/* setup */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>setup</p>
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
//                     to="/dashboard/hr" // Example path for HR module
//                     className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
//                   >
//                     More info <i className="bi bi-link-45deg"></i>
//                   </Link>
//                 </div>
//               </div>
//               {/* recruitment */}
//               <div className="col-lg-3 col-md-3 col-3 mb-3" style={{ paddingLeft: "100px" }}>
//                 <div className="small-box text-bg-info shadow-lg rounded">
//                   <div className="inner">
//                     <h3>{hrCount}</h3>
//                     <p>recruitment</p>
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
//                     to="/dashboard/hr" // Example path for HR module
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

// export default HrmDashboard;
