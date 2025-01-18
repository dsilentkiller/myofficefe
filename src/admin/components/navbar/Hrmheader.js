import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import {
  People as EmployeeIcon,
  CalendarToday,
  Business,
  Work,
  AttachMoney,
  Build,
} from "@mui/icons-material";

const HrmNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const menuItems = [
    {
      title: "Employees",
      icon: <EmployeeIcon fontSize="small" />, // Icon for Employees
      link: "/dashboard/hrm/employee/employee-list",
    },
    {
      title: "Leave",
      icon: <CalendarToday fontSize="small" />, // Icon for Leave
      link: "/dashboard/hrm/leave",
    },
    {
      title: "Assets",
      icon: <Business fontSize="small" />, // Icon for Assets
      link: "/dashboard/hrm/asset/list",
    },
    {
      title: "Attendance",
      icon: <Work fontSize="small" />, // Icon for Attendance
      link: "/dashboard/attendance",
    },
    {
      title: "Tasks",
      icon: <Build fontSize="small" />, // Icon for Tasks
      link: "/dashboard/tasks",
    },
    {
      title: "Payroll",
      icon: <AttachMoney fontSize="small" />, // Icon for Payroll
      link: "/dashboard/payroll",
    },
  ];

  const handleMenuOpen = (event, button) => {
    setAnchorEl(event.currentTarget);
    setActiveButton(button);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveButton(null);
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <Box display="flex" alignItems="center" bgcolor="lightgray" p={2}>
      {menuItems.map((item, index) => (
        <Box key={index} mx={1}>
          {item.subMenu ? (
            <>
              <Button
                startIcon={item.icon}
                onClick={(e) => handleMenuOpen(e, item.title)}
                variant={activeButton === item.title ? "contained" : "outlined"}
                color={activeButton === item.title ? "primary" : "default"}
              >
                {item.title}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={activeButton === item.title}
                onClose={handleMenuClose}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <MenuItem key={subIndex} component={Link} to={subItem.link} onClick={handleMenuClose}>
                    {subItem.icon} {subItem.title}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button
              startIcon={item.icon}
              component={Link}
              to={item.link}
              variant={activeButton === item.title ? "contained" : "outlined"}
              color={activeButton === item.title ? "primary" : "default"}
              onClick={() => setActiveButton(item.title)}
            >
              {item.title}
            </Button>
          )}
        </Box>
      ))}
    </Box>
    </nav>
  );
};

export default HrmNavbar;

// import React from "react";
// import { Link } from "react-router-dom";
// const HrmHeader = () => {
//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* <!-- Left navbar links --> */}
//         <ul className="navbar-nav">
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="list" className="nav-link">
//               Leave
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="shift-list/" className="nav-link">
//               Shift
//             </Link>
//           </li>
//           {/* FOLLOWUP */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="follow" className="nav-link">
//               Followup
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="/dashboard/hrm/employee" className="nav-link">
//               employee
//             </Link>
//           </li>
//           {/* enquiry */}
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="attendee" className="nav-link">
//               Attendees
//             </Link>
//           </li> */}
//           {/* enquiry */}
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="event" className="nav-link">
//               Event
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
//         </ul>
//       </nav>
//     </div>
//   );
// };
// export default HrmHeader;
