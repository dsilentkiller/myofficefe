import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import {
  LocationCity as DistrictIcon,
  Map as ProvinceIcon,
  Business as MunicipalityIcon,
  Work as DesignationIcon,
  Apartment as DepartmentIcon,
  Grading as GradeIcon,
  AccessTime as WorkingIcon,
  Today as DayIcon,
  AttachMoney as TaxIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {AccountBox} from '@mui/icons-material';

import { Link } from "react-router-dom";

const SetupHeader = () => {
  const [activeButton, setActiveButton] = useState("");

  const menuItems = [
    { name: "district", title: "District", icon: <DistrictIcon /> },
    { name: "province", title: "Province", icon: <ProvinceIcon /> },
    { name: "municipality", title: "Municipality", icon: <MunicipalityIcon /> },
    { name: "designation", title: "Designation", icon: <DesignationIcon /> },
    { name: "department", title: "Department", icon: <DepartmentIcon /> },
    { name: "grade", title: "Grade", icon: <GradeIcon /> },
    { name: "working", title: "Working", icon: <WorkingIcon /> },
    { name: "day", title: "Day", icon: <DayIcon /> },
    { name: "tax", title: "Tax", icon: <TaxIcon /> },
    { name: "organization/detail", title: "Organization", icon: <AccountBox /> },
  ];

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
          <Toolbar>
            {/* Left Navigation Buttons */}
            {menuItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={`/dashboard/setup/${item.name}`}
                onClick={() => setActiveButton(item.name)}
                sx={{
                  color: activeButton === item.name ? "white" : "black",
                  backgroundColor: activeButton === item.name ? "#3f51b5" : "transparent",
                  marginRight: 2,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: activeButton === item.name ? "#3f51b5" : "rgba(0, 0, 0, 0.1)",
                  },
                }}
                startIcon={item.icon} // Include the icon here
              >
                {item.title}
              </Button>
            ))}

            {/* Right Search Icon */}
            <IconButton
              color="inherit"
              sx={{ marginLeft: "auto" }}
              onClick={() => console.log("Search clicked")}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
    </nav>
  );
};

export default SetupHeader;


// import React from "react";
// import { useState } from "react";
// import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
// import {
//   LocationCity as DistrictIcon,
//   Map as ProvinceIcon,
//   Business as MunicipalityIcon,
//   Work as DesignationIcon,
//   Apartment as DepartmentIcon,
//   Grading as GradeIcon,
//   AccessTime as WorkingIcon,
//   Today as DayIcon,
//   AttachMoney as TaxIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// const SetupHeader = () => {
//   const [activeButton, setActiveButton] = useState("");
//   // const location = useLocation();
//   const menuItems = [
//     { name: "district", title: "District", icon: <DistrictIcon /> },
//     { name: "province", title: "Province", icon: <ProvinceIcon /> },
//     { name: "municipality", title: "Municipality", icon: <MunicipalityIcon /> },
//     { name: "designation", title: "Designation", icon: <DesignationIcon /> },
//     { name: "department", title: "Department", icon: <DepartmentIcon /> },
//     { name: "grade", title: "Grade", icon: <GradeIcon /> },
//     { name: "working", title: "Working", icon: <WorkingIcon /> },
//     { name: "day", title: "Day", icon: <DayIcon /> },
//     { name: "tax", title: "Tax", icon: <TaxIcon /> },
//   ];

//   return (
//     <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
//           <Toolbar>
//             {/* Left Navigation Buttons */}
//             {menuItems.map((item) => (
//               <Button
//                 key={item.name}
//                 component={Link}
//                 to={`/dashboard/setup/${item.name}`}
//                 onClick={() => setActiveButton(item.name)}
//                 sx={{
//                   color: activeButton === item.name ? "white" : "black",
//                   backgroundColor: activeButton === item.name ? "#3f51b5" : "transparent",
//                   marginRight: 2,
//                   textTransform: "capitalize",
//                   fontWeight: "bold",
//                   "&:hover": {
//                     backgroundColor: activeButton === item.name ? "#3f51b5" : "rgba(0, 0, 0, 0.1)",
//                   },
//                 }}
//               >
//                 {item.title}
//               </Button>
//             ))}

//             {/* Right Search Icon */}
//             <IconButton
//               color="inherit"
//               sx={{ marginLeft: "auto" }}
//               onClick={() => console.log("Search clicked")}
//             >
//               <SearchIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//     </nav>
//   );
// };

// export default SetupHeader;



//############ old setup header ###########
// import React from "react";
// import { Link } from "react-router-dom";
// import "../../../App.css";

// const SetupHeader = () => {
//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* <!-- Left navbar links --> */}
//         <ul className="navbar-nav">
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="country" className="nav-link">
//               Country
//             </Link>
//           </li> */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="district" className="nav-link">
//               District
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="province" className="nav-link">
//               Province
//             </Link>
//           </li>
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="zone" className="nav-link">
//               Zone
//             </Link>
//           </li> */}
//           {/* enquiry */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="municipality" className="nav-link">
//               Municipality
//             </Link>
//           </li>

//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="designation" className="nav-link">
//               designation
//             </Link>
//           </li>
//           {/* enquiry */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="department" className="nav-link">
//               Department
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="grade" className="nav-link">
//               Grade
//             </Link>
//           </li>
//           {/* enquiry */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="working" className="nav-link">
//               Working
//             </Link>
//           </li>
//           {/* day */}
//           {/* enquiry */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="day" className="nav-link">
//               Day
//             </Link>
//           </li>
//           {/* tax */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="tax" className="nav-link">
//               Tax
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
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };
// export default SetupHeader;
