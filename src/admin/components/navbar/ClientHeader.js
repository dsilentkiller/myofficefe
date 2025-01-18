import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Button } from "@mui/material";
import { Person as PersonIcon, Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";

const ClientHeader = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <AppBar position="sticky" sx={{ backgroundColor: "#fff", color: "#000", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left section with navigation links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="customer-list" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              startIcon={<PersonIcon />}
              sx={{
                color: "#000",
                textTransform: "none",
                fontWeight: 600,
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#1ABC9C",
                  color: "#fff",
                },
              }}
            >
              Customer
            </Button>
          </Link>
        </Box>

        {/* Right section with search */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleSearch}
            sx={{ color: "#000", marginRight: 1 }}
          >
            <SearchIcon />
          </IconButton>

          {/* Search Input */}
          {searchOpen && (
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: "4px", padding: "4px 8px" }}>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  width: 200,
                  paddingLeft: 1,
                }}
              />
              <IconButton onClick={toggleSearch} sx={{ padding: 0, color: "#000" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>

      </nav>
    </div>
  );
};
export default ClientHeader;

// ###old navbar #######
// import React from "react";
// import { Link } from "react-router-dom";
// const ClientHeader = () => {
//   return (
//     <div>
//       <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//         {/* <!-- Left navbar links --> */}
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link to="customer-list" className="nav-link" >
//               <p>Customer</p>
//             </Link>
//           </li>
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="customer" className="nav-link">
//               customer
//             </Link>
//           </li> */}
//           {/* FOLLOWUP */}
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="follow" className="nav-link">
//               Followup
//             </Link>
//           </li> */}
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="project" className="nav-link">
//               project
//             </Link>
//           </li> */}
//           {/* enquiry */}
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="attendee" className="nav-link">
//               Attendees
//             </Link>
//           </li> */}
//           {/* enquiry */}
//           {/* <li className="nav-item d-none d-sm-inline-block">
//             <Link to="event" className="nav-link">
//               Event
//             </Link>
//           </li>*/}
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
// export default ClientHeader;

