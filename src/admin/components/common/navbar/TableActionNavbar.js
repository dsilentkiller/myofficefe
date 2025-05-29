// components/common/TableActionNavbar.jsx
//mobile responsive
import {
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Link } from "react-router-dom";

const TableActionNavbar = ({
  title = "Table",
  addLink = "create",
  searchTerm,
  setSearchTerm,
  onExportExcel,
  onExportPDF,
  onImportExcel,
  showAddButton = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems={isMobile ? "flex-start" : "center"}
      justifyContent="space-between"
      flexWrap="wrap"
      gap={isMobile ? 1 : 0}
      padding="0.5rem 1rem"
      sx={{ background: "#f5f5f5", zIndex: 1 }}
    >
      {/* Title */}
      <h5 style={{ margin: 0 }}>{title}</h5>

      {/* Actions */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={1}
        alignItems={isMobile ? "stretch" : "center"}
        width={isMobile ? "100%" : "auto"}
      >
        {/* Add Button */}
        {showAddButton && (
          <Tooltip title="Add">
            <IconButton
              component={Link}
              to={addLink}
              color="primary"
              sx={{ border: "1px solid #ccc", alignSelf: isMobile ? "flex-start" : "center" }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* Search Field */}
        <TextField
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          fullWidth={isMobile}
          sx={{ width: isMobile ? "100%" : 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Export Excel */}
        <Tooltip title="Export Excel">
          <IconButton color="info" onClick={onExportExcel}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>

        {/* Export PDF */}
        <Tooltip title="Export PDF">
          <IconButton color="info" onClick={onExportPDF}>
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>

        {/* Import Excel */}
        <Tooltip title="Import Excel">
          <IconButton
            component="label"
            sx={{
              backgroundColor: "#3f51b5",
              color: "white",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
              "&:active": {
                backgroundColor: "#9e9e9e",
              },
            }}
          >
            <FileUploadIcon />
            <input
              type="file"
              hidden
              accept=".xlsx, .xls"
              onChange={onImportExcel}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default TableActionNavbar;

// import {
//   IconButton,
//   InputAdornment,
//   TextField,
//   Box,
//   Stack,
//   Tooltip,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import SearchIcon from "@mui/icons-material/Search";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { Link } from "react-router-dom";

// const TableActionNavbar = ({
//   title = "Table",
//   addLink = "create",
//   searchTerm,
//   setSearchTerm,
//   onExportExcel,
//   onExportPDF,
//   onImportExcel,
//   showAddButton = true,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

//   return (
//     <Box
//       display="flex"
//       flexDirection={isMobile ? "column" : "row"}
//       alignItems={isMobile ? "flex-start" : "center"}
//       justifyContent="space-between"
//       flexWrap="wrap"
//       gap={isMobile ? 1 : 0}
//       padding="0.5rem 1rem"
//       sx={{ background: "#f5f5f5", zIndex: 1 }}
//     >
//       {/* Title */}
//       <h5 style={{ margin: 0 }}>{title}</h5>

//       {/* Actions */}
//       <Stack
//         direction={isMobile ? "column" : "row"}
//         spacing={1}
//         alignItems={isMobile ? "stretch" : "center"}
//         width={isMobile ? "100%" : "auto"}
//       >
//         {/* Add Button */}
//         {showAddButton && (
//           <Tooltip title="Add">
//             <IconButton
//               component={Link}
//               to={addLink}
//               color="primary"
//               sx={{ border: "1px solid #ccc", alignSelf: isMobile ? "flex-start" : "center" }}
//             >
//               <AddCircleOutlineIcon />
//             </IconButton>
//           </Tooltip>
//         )}

//         {/* Search Field */}
//         <TextField
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search"
//           fullWidth={isMobile}
//           sx={{ width: isMobile ? "100%" : 200 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Export Excel */}
//         <Tooltip title="Export Excel">
//           <IconButton color="info" onClick={onExportExcel}>
//             <FileDownloadIcon />
//           </IconButton>
//         </Tooltip>

//         {/* Export PDF */}
//         <Tooltip title="Export PDF">
//           <IconButton color="info" onClick={onExportPDF}>
//             <PictureAsPdfIcon />
//           </IconButton>
//         </Tooltip>

//         {/* Import Excel */}
//         <Tooltip title="Import Excel">
//           <IconButton
//             component="label"
//             sx={{
//               backgroundColor: "#3f51b5",
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "#303f9f",
//               },
//               "&:active": {
//                 backgroundColor: "#9e9e9e",
//               },
//             }}
//           >
//             <FileUploadIcon />
//             <input
//               type="file"
//               hidden
//               accept=".xlsx, .xls"
//               onChange={onImportExcel}
//             />
//           </IconButton>
//         </Tooltip>
//       </Stack>
//     </Box>
//   );
// };

// export default TableActionNavbar;


// import {
//   IconButton,
//   InputAdornment,
//   TextField,
//   Box,
//   Stack,
//   Tooltip,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import SearchIcon from "@mui/icons-material/Search";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { Link } from "react-router-dom";

// const TableActionNavbar = ({
//   title = "Table",
//   addLink = "create",
//   searchTerm,
//   setSearchTerm,
//   onExportExcel,
//   onExportPDF,
//   onImportExcel,
//   showAddButton = true,
// }) => {
//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="space-between"
//       flexWrap="wrap"
//       padding="0.5rem 1rem"
//       sx={{ background: "#f5f5f5", zIndex: 1 }}
//     >
//       {/* Left: Title */}
//       <h5 style={{ margin: 0 }}>{title}</h5>

//       {/* Right: Actions */}
//       <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
//         {/* Add */}
//         {showAddButton && (
//           <Tooltip title="Add">
//             <IconButton
//               component={Link}
//               to={addLink}
//               color="primary"
//               sx={{ border: "1px solid #ccc" }}
//             >
//               <AddCircleOutlineIcon />
//             </IconButton>
//           </Tooltip>
//         )}

//         {/* Search */}
//         <TextField
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder={`Search`}
//           sx={{ width: 200 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Export Excel */}
//         <Tooltip title="Export Excel">
//           <IconButton color="info" onClick={onExportExcel}>
//             <FileDownloadIcon />
//           </IconButton>
//         </Tooltip>

//         {/* Export PDF */}
//         <Tooltip title="Export PDF">
//           <IconButton color="info" onClick={onExportPDF}>
//             <PictureAsPdfIcon />
//           </IconButton>
//         </Tooltip>

//         {/* Import Excel */}
//        <Tooltip title="Import Excel">
//           <IconButton
//             component="label"
//             sx={{
//               backgroundColor: "#3f51b5",
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "#303f9f",
//               },
//               "&:active": {
//                 backgroundColor: "#9e9e9e", // grey color on click
//               },
//             }}
//           >
//             <FileUploadIcon />
//             <input
//               type="file"
//               hidden
//               accept=".xlsx, .xls"
//               onChange={onImportExcel}
//             />
//           </IconButton>
//         </Tooltip>

//       </Stack>
//     </Box>
//   );
// };

// export default TableActionNavbar;

// import React from "react";
// import { Button, InputAdornment, TextField } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import SearchIcon from "@mui/icons-material/Search";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { Link } from "react-router-dom";

// const TableActionNavbar = ({
//   title = "Table",
//   addLink = "create",
//   searchTerm,
//   setSearchTerm,
//   onExportExcel,
//   onExportPDF,
//   onImportExcel,
//   showAddButton = true,
// }) => {
//   return (
//     // <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <h5 className="navbar-brand">{title}</h5>

//           <div className="d-flex align-items-center" style={{ gap: "1rem", maxWidth: "600px" }}>
//           {showAddButton && (
//             <Button
//               variant="contained"
//               component={Link}
//               to={addLink}
//               color="primary"
//               startIcon={<AddCircleOutlineIcon />}
//             >
//               Add
//             </Button>
//           )}
//         </div>

//         {/* Search */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//           className="form-inline ml-3"
//         >
//           <TextField
//             name="search"
//             value={searchTerm}
//             className="form-control"
//             placeholder={`Search ${title.toLowerCase()}...`}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: 250 }}
//           />
//         </form>

//         {/* Action Buttons */}
//         <div className="form-inline ml-4" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-30">
//             <li className="nav-item">
//               <Button
//                 variant="outlined"
//                 color="info"
//                 startIcon={<FileDownloadIcon />}
//                 onClick={onExportExcel}
//               >
//                 Export Excel
//               </Button>
//             </li>
//             <li className="nav-item">
//               <Button
//                 variant="outlined"
//                 color="info"
//                 startIcon={<PictureAsPdfIcon />}
//                 onClick={onExportPDF}
//               >
//                 Export PDF
//               </Button>
//             </li>
//             <li className="nav-item">
//               <Button
//                 variant="contained"
//                 sx={{
//                   marginLeft: 1,
//                   marginRight: 1,
//                   backgroundColor: "#3f51b5",
//                   color: "white",
//                   "&:hover": {
//                     backgroundColor: "#303f9f",
//                   },
//                 }}
//                 component="label"
//                 startIcon={<FileUploadIcon />}
//               >
//                 Import Excel
//                 <input
//                   type="file"
//                   accept=".xlsx, .xls"
//                   hidden
//                   onChange={onImportExcel}
//                 />
//               </Button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     // </nav>
//   );
// };

// export default TableActionNavbar;
