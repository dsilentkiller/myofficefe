import React from "react";
import { Button, TextField, IconButton } from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "../../../../css/crm/components/navbar/categoryNavbar.css";

const CategoryNavbar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="category-navbar">
      <Typography variant="h6" className="category-title">
        Category List
      </Typography>

      <div className="category-actions">
        <Link to="create" className="add-link">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Category
          </Button>
        </Link>

        <TextField
          className="search-field"
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default CategoryNavbar;
// const CategoryNavbar = ({ searchTerm, onSearchChange }) => {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
//           <Typography
//           variant="h6"
//           style={{ textAlign: "left", fontWeight: "bold", flexGrow: 1 }}
//         >
//           Category List
//         </Typography>
//         <Link to="create" style={{ textDecoration: "none" }}>
//             <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             >
//             Add Category
//             </Button>
//         </Link>

//       <TextField
//         variant="outlined"
//         size="small"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={onSearchChange}
//         InputProps={{
//           endAdornment: (
//             <IconButton>
//               <SearchIcon />
//             </IconButton>
//           ),
//         }}
//       />
//     </div>
//   );
// };

// export default CategoryNavbar;


// // src/pages/components/navbar/CategoryNavbar.jsx

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// const CategoryNavbar = ({ searchTerm, onSearchChange }) => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
        // <Typography
        //   variant="h6"
        //   style={{ textAlign: "left", fontWeight: "bold", flexGrow: 1 }}
        // >
        //   Category List
        // </Typography>

//         <div className="navbar-nav ml-auto" style={{ display: "flex", alignItems: "center" }}>
//           <Link to="create" style={{ textDecoration: "none" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<AddIcon />}
//               style={{ marginRight: "16px" }}
//             >
//               Add Category
//             </Button>
//           </Link>

//           <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
//             <TextField
//               variant="outlined"
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={onSearchChange}
//               InputProps={{
//                 endAdornment: (
//                   <IconButton>
//                     <SearchIcon />
//                   </IconButton>
//                 ),
//               }}
//               sx={{ width: 250 }}
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default CategoryNavbar;
