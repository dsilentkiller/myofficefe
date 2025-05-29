import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
  Grid,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

import DescriptionIcon from '@mui/icons-material/Description'; // Excel replacement
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF replacement

// import DescriptionIcon from '@mui/icons-material/Description'; // Excel replacement
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF replacement
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import DescriptionIcon from '@mui/icons-material/Description'; // Excel replacement
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF replacement
// import { Link } from 'react-router-dom'; // If using React Router


const EnquiryNavbar = ({
  searchTerm,
  handleSearchChange,
  exportToExcel,
  exportToPDF,
  handleFileChange,
}) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        width: "100%",       // full width of parent container
        maxWidth: "100%",    // ensure no overflow beyond dashboard container
        boxSizing: "border-box", // include padding in width calculation
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        {/* Title */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" fontWeight="bold" color="#333">
            Enquiry Table
          </Typography>
        </Grid>

        {/* Buttons and Search */}
        <Grid item xs={12} md={10}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            useFlexGap
          >
            {/* Add Enquiry Button */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="create"
            >
              Add Enquiry
            </Button>

            {/* Search Input */}
            <TextField
              variant="outlined"
              size="small"
              label="Search Enquiries..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />

            {/* Export Buttons */}
            <Button
              variant="outlined"
              color="info"
              onClick={exportToExcel}
              startIcon={<DescriptionIcon />} // Excel export
              // startIcon={<ExcelIcon />}
            >
              Export Excel
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={exportToPDF}
              // startIcon={<PdfIcon />}
               startIcon={<PictureAsPdfIcon />} // PDF export
              // startIcon={<DescriptionIcon />}

            >
              Export PDF
            </Button>

            {/* Import Button */}
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                backgroundColor: "#3f51b5",
                color: "white",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Import Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnquiryNavbar;



// old design

// import React from "react";
// import { Link } from "react-router-dom";
// import "../../../App.css";
// import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
// import { Search, Category, Event } from "@mui/icons-material";
// import FollowTable from "../../crm/followup/FollowupTable";
// import MeetingUpdateTable from "../../crm/meetingupdate/MeetingTable";

// const EnquiryNavbar = () => {
//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* <!-- Left navbar links --> */}
//         {/* <ul className="navbar-nav">
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="category/list" className="nav-link">
//               Leave Category
//             </Link>
//           </li>
//           <li className="nav-item d-none d-sm-inline-block">
//             <Link to="list" className="nav-link">
//               Leave
//             </Link>
//           </li>
//         </ul> */}

//         {/* <!-- Right navbar links --> */}
//         {/* <ul className="navbar-nav ml-auto"> */}
//           {/* <!-- Navbar Search --> */}
//           {/* <li className="nav-item">
//             <Link
//               className="nav-link"
//               data-widget="navbar-search"
//               to="#"
//               role="button"
//             >
//               <i className="fas fa-search"></i>
//             </Link>
//           </li> */}
//         {/* </ul> */}
//          {/* MUI AppBar for the header */}
//       <AppBar position="sticky">
//         <Toolbar>
//           {/* Left section of the header */}
//           {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Leave Management
//           </Typography> */}

//           <Button
//             color="inherit"
//             startIcon={<MeetingUpdateTable/>}
//             component={Link}
//             to="/dashboard/crm/enquiry/detail/"
//           >
//            meeting update
//           </Button>

//       * <Button
//             color="inherit"
//             startIcon={<FollowTable />}
//             component={Link}
//             to="/dashboard/crm/enquiry/detail/follow/"
//           >
//             follow up
//           </Button>

//           {/* Right section of the header (search) */}
//           <IconButton color="inherit">
//             <Search />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       </nav>
//     </div>
//   );
// };
// export default EnquiryNavbar;

// import React, { useState } from "react";
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
// import {AccountBox} from '@mui/icons-material';
// import MeetingUpdateTable from "../../crm/meetingupdate/MeetingUpdateTable";

// import { Link } from "react-router-dom";

// const EnquiryNavbar = () => {
//   const [activeButton, setActiveButton] = useState("");

//   const menuItems = [
//     { name: "follow", title: "follow", icon: <DistrictIcon /> },
//     { name: "event", title: "event", icon: <ProvinceIcon /> },
//     { name: "meetingupdates/", title: "meeting update", icon: <MeetingUpdateTable /> },
//     // { name: "designation", title: "Designation", icon: <DesignationIcon /> },
//     // { name: "department", title: "Department", icon: <DepartmentIcon /> },
//     // { name: "grade", title: "Grade", icon: <GradeIcon /> },
//     // { name: "working", title: "Working", icon: <WorkingIcon /> },
//     // { name: "day", title: "Day", icon: <DayIcon /> },
//     // { name: "tax", title: "Tax", icon: <TaxIcon /> },
//     // { name: "organization/create", title: "Organization", icon: <AccountBox /> },
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
//                 to={`/dashboard/crm/enquiry/detail/${item.name}`}
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
//                 startIcon={item.icon} // Include the icon here
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

// export default EnquiryNavbar;
