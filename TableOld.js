import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    IconButton,
    Tooltip,
    Checkbox,
    InputBase,
    Button,
    Typography,
    Box,
  } from "@mui/material";
  import {
    Search,
    ArrowUpward,
    ArrowDownward,
    ArrowForward,
    ArrowBack,
    Edit,
    Delete,
    Visibility,
    FileUpload,
    FileDownload,
    Add,
    Add as AddIcon,
    Search as SearchIcon,
    PictureAsPdf as PdfIcon,
    TableChart as TableIcon,
    FileDownload as ExcelIcon,
    CheckCircle as CheckCircleIcon,
  } from "@mui/icons-material";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import "../css/Table.css";
  import { toast } from "react-toastify";
  
  import jsPDF from "jspdf";
  import autoTable from "jspdf-autotable";
  
  import * as XLSX from "xlsx";
  
  const GeneralTable = ({
    title,
    columns = [],
    data = [],
    onEdit,
    onDelete,
    onView,
    onAdd,
  }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });
  
    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  
    const handleSort = (field) => {
      const isAscending =
        sortConfig.field === field && sortConfig.direction === "asc";
      setSortConfig({ field, direction: isAscending ? "desc" : "asc" });
    };
  
    const exportPDF = () => {
      try {
        const doc = new jsPDF();
        doc.text(`${title}`, 10, 10);
        autoTable(doc, {
          head: [columns.map((col) => col.label)],
          body: data.map((row) => columns.map((col) => row[col.field])),
        });
        const fileName = `${title.toLowerCase().replace(/\s+/g, "_")}.pdf`;
        doc.save(fileName);
        toast.success("File downloaded successfully as PDF!");
      } catch (error) {
        toast.error("Error downloading file as PDF.");
      }
    };
  
    const exportExcel = () => {
      try {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, title);
        const fileName = `${title.toLowerCase().replace(/\s+/g, "_")}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        toast.success("File downloaded successfully as Excel!");
      } catch (error) {
        toast.error("Error downloading file as Excel.");
      }
    };
  
    const importFile = (e) => {
      try {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          console.log("Imported Data:", sheetData);
          toast.success("File imported successfully!");
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        toast.error("Error importing file.");
      }
    };
  
    const formatDateTime = (dateString) => {
      if (!dateString) return "";
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      return new Intl.DateTimeFormat("en-US", options).format(
        new Date(dateString)
      );
    };
  
    const handleSelectRow = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };
  
    const filteredData = data.filter((row) =>
      columns.some((col) => String(row[col.field]).toLowerCase().includes(search))
    );
  
    const sortedData = filteredData.sort((a, b) => {
      const { field, direction } = sortConfig;
      if (!field) return 0;
      return direction === "asc"
        ? String(a[field]).localeCompare(String(b[field]))
        : String(b[field]).localeCompare(String(a[field]));
    });
  
    return (
      <div
        className="content-wrapper"
        style={{
         
          // maxHeight: "650px", // adjust height as needed
          // overflowY: "auto",
          // overflowX: "hidden",
          border: "2px solid #ddd",
          borderRadius: "4px",
          // padding:"16px"
          // marginBottom: 2, // to reduce gap before pagination
          // }}
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Typography
            left
            variant="h6"
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              color: "#333",
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
          <div className="navbar-nav ml-auto">
            <Box
              sx={{
                display: "flex",
                position: "static",
                alignItems: "center",
                gap: 2,
              }}
            >
              <InputBase
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                startAdornment={<Search />}
              />
              <Tooltip title="Export as PDF">
                <IconButton onClick={exportPDF}>
                  <FileDownload />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export as Excel">
                <IconButton onClick={exportExcel}>
                  <FileDownload />
                </IconButton>
              </Tooltip>
              <Tooltip title="Import File">
                <IconButton component="label">
                  <FileUpload />
                  <input type="file" hidden onChange={importFile} />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={onAdd}
                sx={{ bgcolor: "primary.main", color: "white" }}
              >
                Add
              </Button>
            </Box>
          </div>
        </nav>
        {/* <div className="table-container"> */}
  
        <Table
          sx={{
            maxHeight: "400px", // adjust height as needed
            // overflowY: "auto",
            // overflowX: "hidden",
            // border: "2px solid #ddd",
            // borderRadius: "1px",
            // borderCollapse: "collapse",
          }}
        >
          <TableHead>
            <TableRow 
            // sx={{ borderBottom: "2px solid #ddd" }}
            >
              <TableCell
                sx={{
                  borderRight: "1px solid #ddd",
                  borderTop: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                }}
              >
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < data.length
                  }
                  checked={selectedRows.length === data.length}
                  onChange={(e) =>
                    setSelectedRows(e.target.checked ? data.map((d) => d.id) : [])
                  }
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    borderBottom: "2px solid #ddd",
                    borderRight: "1px solid #ddd",
                    borderLeft: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  <div onClick={() => handleSort(col.field)}>
                    {col.label}
                    {sortConfig.field === col.field &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      ))}
                  </div>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  borderBottom: "2px solid #ddd",
                  borderRight: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          
          </TableHead>
          <TableBody 
           sx={{
          //   display: "block", // Makes tbody block level
            maxHeight: "400px", // Limit height for scrolling
          //   // overflowY: "auto", // Vertical scroll
          //   // overflowX: "auto", // Horizontal scroll
          }}
          >
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  sx={{ textAlign: "center", color: "gray" }}
                >
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      borderBottom: "1px solid #ddd",
                      borderLeft: "1px solid #ddd",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell
                        key={col.field}
                        sx={{ borderRight: "1px solid #ddd" }}
                      >
                        {row[col.field]}
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        borderRight: "1px solid #ddd",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <Tooltip title="View">
                        <IconButton onClick={() => onView(row)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => onEdit(row)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => onDelete(row)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
  
        </Table>
  
     
      <Box
          sx={{
            position: "sticky",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #e0e0e0",
            zIndex: 1,
          }}
        >
      <TablePagination
            component="div"
            count={sortedData.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) =>
              setRowsPerPage(parseInt(e.target.value, 10))
            }
            rowsPerPageOptions={[]}
      />
      
        </Box> 
      </div>
    );
  };
  
  export default GeneralTable;
  
  // import {
  //   Table,
  //   TableHead,
  //   TableBody,
  //   TableRow,
  //   TableCell,
  //   TablePagination,
  //   IconButton,
  //   Tooltip,
  //   Checkbox,
  //   InputBase,
  //   Button,
  //   Typography,
  //   Box,
  // } from "@mui/material";
  // import {
  //   Search,
  //   ArrowUpward,
  //   ArrowDownward,
  //   ArrowForward,
  //   ArrowBack,
  //   Edit,
  //   Delete,
  //   Visibility,
  //   FileUpload,
  //   FileDownload,
  //   Add,
  //   Add as AddIcon,
  //   Search as SearchIcon,
  //   PictureAsPdf as PdfIcon,
  //   TableChart as TableIcon,
  //   FileDownload as ExcelIcon,
  //   CheckCircle as CheckCircleIcon
  // } from "@mui/icons-material";
  // import axios from "axios";
  // import { useState, useEffect } from "react";
  // // import EnquiryForm from "./EnquiryForm";
  // import "../css/Table.css";
  // import { toast } from "react-toastify";
  
  // import jsPDF from "jspdf";
  // import autoTable from "jspdf-autotable";
  
  // import * as XLSX from "xlsx";
  
  // const GeneralTable = ({
  //   title,
  //   columns = [],
  //   data = [],
  //   onEdit,
  //   onDelete,
  //   onView,
  //   onAdd,
  
  // }) => {
  //   const [search, setSearch] = useState("");
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const [selectedRows, setSelectedRows] = useState([]);
  //   const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });
  
  //   const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  
  //   const handleSort = (field) => {
  //     const isAscending = sortConfig.field === field && sortConfig.direction === "asc";
  //     setSortConfig({ field, direction: isAscending ? "desc" : "asc" });
  //   };
  
  //   const exportPDF = () => {
  //     try {
  //       const doc = new jsPDF();
  //       doc.text(`${title}`, 10, 10);
  //       autoTable(doc, {
  //         head: [columns.map((col) => col.label)],
  //         body: data.map((row) => columns.map((col) => row[col.field])),
  //       });
  //       const fileName = `${title.toLowerCase().replace(/\s+/g, "_")}.pdf`;
  //       doc.save(fileName);
  //       toast.success("File downloaded successfully as PDF!");
  //     } catch (error) {
  //       toast.error("Error downloading file as PDF.");
  //     }
  //   };
  
  //   const exportExcel = () => {
  //     try {
  //       const worksheet = XLSX.utils.json_to_sheet(data);
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(workbook, worksheet, title);
  //       const fileName = `${title.toLowerCase().replace(/\s+/g, "_")}.xlsx`;
  //       XLSX.writeFile(workbook, fileName);
  //       toast.success("File downloaded successfully as Excel!");
  //     } catch (error) {
  //       toast.error("Error downloading file as Excel.");
  //     }
  //   };
  
  //   const importFile = (e) => {
  //     try {
  //       const file = e.target.files[0];
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         const data = new Uint8Array(event.target.result);
  //         const workbook = XLSX.read(data, { type: "array" });
  //         const sheetName = workbook.SheetNames[0];
  //         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  //         // Handle imported data (you can pass it to the parent component or process it here)
  //         console.log("Imported Data:", sheetData);
  //         toast.success("File imported successfully!");
  //       };
  //       reader.readAsArrayBuffer(file);
  //     } catch (error) {
  //       toast.error("Error importing file.");
  //     }
  //   };
  
  //   //########### Helper function to format date as a readable string ###############
  //   const formatDateTime = (dateString) => {
  //     if (!dateString) return "";
  //     const options = {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: false,
  //     };
  //     return new Intl.DateTimeFormat("en-US", options).format(
  //       new Date(dateString)
  //     );
  //   };
  
  //   const handleSelectRow = (id) => {
  //     setSelectedRows((prev) =>
  //       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
  //     );
  //   };
  
  //   // Filter data based on search and columns
  //   const filteredData = data.filter((row) =>
  //     columns.some((col) =>
  //       String(row[col.field]).toLowerCase().includes(search)
  //     )
  //   );
  
  //   // Sort the filtered data
  //   const sortedData = filteredData.sort((a, b) => {
  //     const { field, direction } = sortConfig;
  //     if (!field) return 0;
  //     return direction === "asc"
  //       ? String(a[field]).localeCompare(String(b[field]))
  //       : String(b[field]).localeCompare(String(a[field]));
  //   });
  //   return (
  //     <div className="card-body">
  //     <div className="table-container">
  //       <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //         <Typography left variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#333', flexGrow: 1 }}>{title}</Typography>
  //         <div className="navbar-nav ml-auto">
  //           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  //             <InputBase
  //               placeholder="Search..."
  //               value={search}
  //               onChange={handleSearch}
  //               startAdornment={<Search />}
  //             />
  //             <Tooltip title="Export as PDF">
  //               <IconButton onClick={exportPDF}>
  //                 <FileDownload />
  //               </IconButton>
  //             </Tooltip>
  //             <Tooltip title="Export as Excel">
  //               <IconButton onClick={exportExcel}>
  //                 <FileDownload />
  //               </IconButton>
  //             </Tooltip>
  //             <Tooltip title="Import File">
  //               <IconButton component="label">
  //                 <FileUpload />
  //                 <input type="file" hidden onChange={importFile} />
  //               </IconButton>
  //             </Tooltip>
  //             <Button
  //               variant="contained"
  //               startIcon={<Add />}
  //               onClick={onAdd}
  //               sx={{ bgcolor: "primary.main", color: "white" }}
  //             >
  //               Add
  //             </Button>
  //           </Box>
  //         </div>
  //       </nav>
  //       <Table sx={{ borderCollapse: "collapse", marginRight:"5px", border: "2px solid #ddd", borderRadius: "4px" }}>
  
  //         <TableHead>
  //           <TableRow sx={{ borderBottom: "2px solid #ddd" }}>
  //             <TableCell sx={{ borderRight: "1px solid #ddd", borderTop: "1px solid #ddd", borderLeft: "1px solid #ddd" }}>
  //               <Checkbox
  //                 indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
  //                 checked={selectedRows.length === data.length}
  //                 onChange={(e) =>
  //                   setSelectedRows(e.target.checked ? data.map((d) => d.id) : [])
  //                 }
  //               />
  //             </TableCell>
  //             {columns.map((col) => (
  //               <TableCell
  //                 key={col.field}
  //                 sx={{
  //                   borderBottom: "2px solid #ddd",
  //                   borderRight: "1px solid #ddd",
  //                   borderLeft: "1px solid #ddd",
  //                   fontWeight: "bold",
  //                 }}
  //               >
  //                 <div onClick={() => handleSort(col.field)}>
  //                   {col.label}
  //                   {sortConfig.field === col.field &&
  //                     (sortConfig.direction === "asc" ? (
  //                       <ArrowUpward fontSize="small" />
  //                     ) : (
  //                       <ArrowDownward fontSize="small" />
  //                     ))}
  //                 </div>
  //               </TableCell>
  //             ))}
  //             <TableCell sx={{ borderBottom: "2px solid #ddd", borderRight: "1px solid #ddd", borderLeft: "1px solid #ddd" }}>Actions</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {sortedData
  //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //             .map((row) => (
  //               <TableRow
  //                 key={row.id}
  //                 hover
  //                 sx={{
  //                   borderBottom: "1px solid #ddd",
  //                   borderLeft: "1px solid #ddd",
  //                   borderRight: "1px solid #ddd",
  //                 }}
  //               >
  //                 <TableCell
  //                   sx={{ borderRight: "1px solid #ddd" }}
  //                 >
  //                   <Checkbox
  //                     checked={selectedRows.includes(row.id)}
  //                     onChange={() => handleSelectRow(row.id)}
  //                   />
  //                 </TableCell>
  //                 {columns.map((col) => (
  //                   <TableCell
  //                     key={col.field}
  //                     sx={{ borderRight: "1px solid #ddd" }}
  //                   >
  //                     {row[col.field]}
  //                   </TableCell>
  //                 ))}
  //                 <TableCell
  //                   sx={{
  //                     borderRight: "1px solid #ddd",
  //                     borderBottom: "1px solid #ddd",
  //                   }}
  //                 >
  //                   <Tooltip title="View">
  //                     <IconButton onClick={() => onView(row)}>
  //                       <Visibility />
  //                     </IconButton>
  //                   </Tooltip>
  //                   <Tooltip title="Edit">
  //                     <IconButton onClick={() => onEdit(row)}>
  //                       <Edit />
  //                     </IconButton>
  //                   </Tooltip>
  //                   <Tooltip title="Delete">
  //                     <IconButton onClick={() => onDelete(row)}>
  //                       <Delete />
  //                     </IconButton>
  //                   </Tooltip>
  //                 </TableCell>
  
  //              </TableRow>
  //             ))}
  //         </TableBody>
  //       </Table>
  //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
  //             <TablePagination
  //               component="div"
  //               count={sortedData.length}
  //               page={page}
  //               onPageChange={(e, newPage) => setPage(newPage)}
  //               rowsPerPage={rowsPerPage}
  //               onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
  //                 />
  
  //       </Box>
  //     </div>
  //     </div>
  //   );
  // };
  
  // export default GeneralTable;
  
  //   return (
  //     <div className="table-container">
  //       <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //         {/* <Box sx={{ textAlign: 'left', fontWeight: 'bold', color: '#333',  display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
  //           <Typography left variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#333', flexGrow: 1 }}>{title}</Typography>
  //           <div className="navbar-nav ml-auto">
  //           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  //             <InputBase
  //               placeholder="Search..."
  //               value={search}
  //               onChange={handleSearch}
  //               startAdornment={<Search />}
  //             />
  //              <Tooltip title="Export as PDF">
  //             <IconButton onClick={exportPDF}>
  //               <FileDownload />
  //             </IconButton>
  //           </Tooltip>
  //           <Tooltip title="Export as Excel">
  //             <IconButton onClick={exportExcel}>
  //               <FileDownload />
  //             </IconButton>
  //           </Tooltip>
  //           <Tooltip title="Import File">
  //             <IconButton component="label">
  //               <FileUpload />
  //               <input type="file" hidden onChange={importFile} />
  //             </IconButton>
  //           </Tooltip>
  //             {/* <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
  //               Add
  //             </Button> */}
  //             <Button
  //             variant="contained"
  //             startIcon={<Add />}
  //             onClick={onAdd}
  //             sx={{ bgcolor: "primary.main", color: "white" }}
  //           >
  //             Add
  //           </Button>
  //           </Box>
  //           </div>
  //         {/* </Box> */}
  //       </nav>
  //       <Table sx={{ borderCollapse: "collapse", border: "2px solid #ddd" }}>
  //         <TableHead>
  //           {/* <TableRow> */}
  //           <TableRow sx={{ borderBottom: "2px solid #ddd" }}>
  //             <TableCell sx={{ borderRight: "1px solid #ddd" }}>
  //               <Checkbox
  //                 indeterminate={
  //                   selectedRows.length > 0 && selectedRows.length < data.length
  //                 }
  //                 checked={selectedRows.length === data.length}
  //                 onChange={(e) =>
  //                   setSelectedRows(e.target.checked ? data.map((d) => d.id) : [])
  //                 }
  //               />
  //             </TableCell>
  //             {columns.map((col) => (
  //               <TableCell key={col.field}>
  //                 <div onClick={() => handleSort(col.field)}>
  //                   {col.label}
  //                   {sortConfig.field === col.field &&
  //                     (sortConfig.direction === "asc" ? (
  //                       <ArrowUpward fontSize="small" />
  //                     ) : (
  //                       <ArrowDownward fontSize="small" />
  //                     ))}
  //                 </div>
  //               </TableCell>
  //             ))}
  //            <TableCell sx={{ borderBottom: "2px solid #ddd" }}>Actions</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {sortedData
  //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //             .map((row) => (
  //               <TableRow key={row.id} hover sx={{
  //                 borderBottom: "1px solid #ddd",
  //               }}>
  //                 <TableCell  sx={{ borderRight: "1px solid #ddd" }}>
  //                   <Checkbox
  //                     checked={selectedRows.includes(row.id)}
  //                     onChange={() => handleSelectRow(row.id)}
  //                   />
  //                 </TableCell>
  //                 {columns.map((col) => (
  //                   <TableCell key={col.field}  sx={{ borderRight: "1px solid #ddd" }}>{row[col.field]}</TableCell>
  //                 ))}
  //                <TableCell
  //                   sx={{
  //                     borderRight: "1px solid #ddd",
  //                     borderBottom: "1px solid #ddd",
  //                   }}
  //                 >
  //                   <Tooltip title="View">
  //                     <IconButton onClick={() => onView(row)}>
  //                       <Visibility />
  //                     </IconButton>
  //                   </Tooltip>
  //                   <Tooltip title="Edit">
  //                     <IconButton onClick={() => onEdit(row)}>
  //                       <Edit />
  //                     </IconButton>
  //                   </Tooltip>
  //                   <Tooltip title="Delete">
  //                     <IconButton onClick={() => onDelete(row)}>
  //                       <Delete />
  //                     </IconButton>
  //                   </Tooltip>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //         </TableBody>
  //       </Table>
  //       <TablePagination
  //         component="div"
  //         count={sortedData.length}
  //         page={page}
  //         onPageChange={(e, newPage) => setPage(newPage)}
  //         rowsPerPage={rowsPerPage}
  //         onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
  //       />
  //     </div>
  //   );
  // };
  
  // export default GeneralTable;
  
  //########## old table ############
  // import React, { useState } from "react";
  // import {
  //   IconButton,
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
  //   TablePagination,
  //   Tooltip,
  //   TextField,
  //   Typography,
  //   Button,
  // } from "@mui/material";
  // import {
  //   Search as SearchIcon,
  //   PictureAsPdf as PdfIcon,
  //   TableChart as TableIcon,
  //   FileDownload as ExcelIcon,
  //   ArrowUpward,
  //   ArrowDownward,
  // } from "@mui/icons-material";
  // import jsPDF from "jspdf";
  // import autoTable from "jspdf-autotable";
  // import * as XLSX from "xlsx";
  
  // const GeneralTable = ({
  //   title,
  //   data,
  //   columns,
  //   actions,
  //   onExportExcel,
  //   onExportPDF,
  //   onSearch,
  //   onRowAction,
  //   rowsPerPageOptions = [5, 10, 25],
  // }) => {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [sortOrder, setSortOrder] = useState("asc");
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  
  //   const handleSearch = (e) => {
  //     const value = e.target.value;
  //     setSearchTerm(value);
  //     if (onSearch) onSearch(value);
  //   };
  
  //   const filteredData = data.filter((item) =>
  //     Object.values(item)
  //       .join(" ")
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  //   );
  
  //   const sortedData = [...filteredData].sort((a, b) => {
  //     // const key = columns[0].field;
  //     // if (sortOrder === "asc") {
  //     //   return a[key]?.localeCompare(b[key]);
  //     // } else {
  //     //   return b[key]?.localeCompare(a[key]);
  //     // }
  //   // });
  //   // const sortedData = [...filteredData].sort((a, b) => {
  //     const nameA = a.project_name || ""; // Default to an empty string if null/undefined
  //     const nameB = b.project_name || ""; // Default to an empty string if null/undefined
  
  //     if (sortOrder === "asc") {
  //       return nameA.localeCompare(nameB);
  //     } else {
  //       return nameB.localeCompare(nameA);
  //     }
  //   });
  
  //   const handleSort = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  
  //   const handleChangePage = (event, newPage) => setPage(newPage);
  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };
  
  //   return (
  //     <div>
  //       <Typography variant="h6">{title}</Typography>
  //       <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
  //         <TextField
  //           label="Search"
  //           variant="outlined"
  //           size="small"
  //           value={searchTerm}
  //           onChange={handleSearch}
  //           InputProps={{
  //             endAdornment: (
  //               <IconButton>
  //                 <SearchIcon />
  //               </IconButton>
  //             ),
  //           }}
  //         />
  //         <div>
  //           <Button variant="outlined" startIcon={<ExcelIcon />} onClick={onExportExcel || exportExcel}>
  //             Export Excel
  //           </Button>
  //           <Button variant="outlined" startIcon={<PdfIcon />} onClick={onExportPDF || exportPDF}>
  //             Export PDF
  //           </Button>
  //         </div>
  //       </div>
  //       <TableContainer>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               {columns.map((col) => (
  //                 <TableCell key={col.field}>
  //                   {col.label}
  //                   {col.sortable && (
  //                     <IconButton size="small" onClick={handleSort}>
  //                       {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
  //                     </IconButton>
  //                   )}
  //                 </TableCell>
  //               ))}
  //               {actions && <TableCell>Actions</TableCell>}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
  //               <TableRow key={index}>
  //                 {columns.map((col) => (
  //                   <TableCell key={col.field}>{row[col.field]}</TableCell>
  //                 ))}
  //                 {actions && (
  //                   <TableCell>
  //                     {actions.map((action) => (
  //                       <Tooltip key={action.label} title={action.label}>
  //                         <IconButton onClick={() => onRowAction(action.key, row)}>
  //                           {action.icon}
  //                         </IconButton>
  //                       </Tooltip>
  //                     ))}
  //                   </TableCell>
  //                 )}
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <TablePagination
  //         component="div"
  //         count={sortedData.length}
  //         page={page}
  //         onPageChange={handleChangePage}
  //         rowsPerPage={rowsPerPage}
  //         onRowsPerPageChange={handleChangeRowsPerPage}
  //       />
  //     </div>
  //   );
  // };
  
  // export default GeneralTable;
  