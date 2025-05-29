import React, { useEffect, useState } from "react";
import {
  IconButton,
  Collapse,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  Tooltip,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  TablePagination,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Add as AddIcon,
  Search as SearchIcon,
  ImportExport as ImportExportIcon,
  PictureAsPdf as PdfIcon,
  FileDownload as CsvIcon,
} from "@mui/icons-material";
import { ExpandMore, ExpandLess, Edit, Delete, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductQuotations, fetchServiceQuotations } from "../../../../redux/slice/admin/crm/quotationSlice";
import { useNavigate, Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";

const QuotationTable = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTable, setActiveTable] = useState("product"); // State to toggle between Product and Service tables
  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const products = useSelector((state) => state.quotations?.products || []);
  const services = useSelector((state) => state.quotations?.services || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductQuotations()); // Fetch product quotations
    dispatch(fetchServiceQuotations()); // Fetch service quotations
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRowAction = (actionKey, id) => {
    if (actionKey === "edit") {
      navigate(`/dashboard/crm/quotation/product/update/${id}`);
      // navigate(`/dashboard/crm/quotation/${activeTable}-quotation/update/${rowData.id}`);
    } else if (actionKey === "delete") {
      // Handle delete logic
    } else if (actionKey === "view") {
      navigate(`/dashboard/crm/quotation/product/detail/${id}`);
    }
  };

  // Mapping Product Quotations
  // Mapping Product Quotations
  const formattedProductQuotations = products.map((quotation, index) => ({
    index: index + 1,
    customer_name: quotation.selection_type === 'customer' ? quotation.customer_name : 'N/A',
    enquiry_name: quotation.selection_type === 'enquiry' ? quotation.enquiry_name : 'N/A',
    quotation_date: quotation.quotation_date,
    tax_percentage: `${quotation.tax_percentage}%`,
    discount_percentage: `${quotation.discount_percentage}%`,
    total_amount: `$${quotation.total_amount}`,
    products: quotation.products, // Nested table for products
  }));
  // Mapping Service Quotations
  // Mapping Service Quotations
  const formattedServiceQuotations = services.map((quotation, index) => ({
    index: index + 1,
    customer_name: quotation.selection_type === 'customer' ? quotation.customer_name : 'N/A',
    enquiry_name: quotation.selection_type === 'enquiry' ? quotation.enquiry_name : 'N/A',
    quotation_date: quotation.quotation_date,
    tax_percentage: `${quotation.tax_percentage}%`,
    discount_percentage: `${quotation.discount_percentage}%`,
    total_amount: `$${quotation.total_amount}`,
    services: quotation.services, // Nested table for services
  }));
  // Filter quotations based on search term
  const filteredQuotations = (activeTable === "product" ? formattedProductQuotations : formattedServiceQuotations).filter((quotation) => {
    const enquiryName = String(quotation.enquiry_name || "").toLowerCase();
    const customerName = String(quotation.customer_name || "").toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      enquiryName.includes(lowerCaseSearchTerm) ||
      customerName.includes(lowerCaseSearchTerm) ||
      String(quotation.quotation_date).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(quotation.tax_percentage).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(quotation.discount_percentage).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(quotation.total_amount).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(quotation.net_amount).toLowerCase().includes(lowerCaseSearchTerm)
    );
  });


  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Quotations Report", 20, 20);
    doc.autoTable({
      head: [
        ['#', 'Enquiry Name', 'Quotation Date', 'Tax (%)', 'Discount (%)', 'Total Amount ($)', 'Subtotal ($)', 'Net Amount ($)']
      ],
      body: filteredQuotations.map(quotation => [
        quotation.index,
        quotation.customer_name,
        quotation.quotation_date,
        quotation.tax_percentage,
        quotation.discount_percentage,
        quotation.total_amount,
        // quotation.subtotal,
        quotation.net_amount,
      ]),
    });
    doc.save("quotations.pdf");
  };


  return (
    <div className="content-wrapper" style={{ display: "flex", justifyContent: "center", flexDirection: "column", overflow: "hidden" }}>
      <AppBar position="static" color="gray">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {activeTable === "product" ? "Product" : "Service"} Quotation Table
          </Typography>

          <Button variant={activeTable === "product" ? "contained" : "outlined"} onClick={() => setActiveTable("product")}>
            Product Quotations
          </Button>
          <Button variant={activeTable === "service" ? "contained" : "outlined"} onClick={() => setActiveTable("service")} sx={{ marginRight: 1.5 }}>
            Service Quotations
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to={`/dashboard/crm/quotation/create`}
            sx={{ marginRight: 2 }}
          >
            Add Quotation
          </Button>
          <TextField
            label="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white", marginRight: 2, width: 250 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {/* Export buttons moved to the header */}
          <Button onClick={exportToPDF} startIcon={<PdfIcon />} variant="contained" sx={{ marginLeft: 1.5 }}>
            {/* Export PDF */}
          </Button>
          <CSVLink
            data={filteredQuotations}
            headers={[
              { label: "Enquiry Name", key: "enquiry_name" },
              { label: "Quotation Date", key: "quotation_date" },
              { label: "Tax (%)", key: "tax_percentage" },
              { label: "Discount (%)", key: "discount_percentage" },
              { label: "Total Amount ($)", key: "total_amount" },
              // { label: "Subtotal ($)", key: "subtotal" },

            ]}
            filename="quotations.csv"
          >
            <Button startIcon={<CsvIcon />} variant="contained" sx={{ marginLeft: 1.5 }}>
              {/* Export CSV */}
            </Button>
          </CSVLink>
        </Toolbar>
      </AppBar>

      {/* Table Toggle */}
      {/* <div style={{ margin: "10px" }}>
        <Button variant={activeTable === "product" ? "contained" : "outlined"} onClick={() => setActiveTable("product")}>
          Product Quotations
        </Button>
        <Button variant={activeTable === "service" ? "contained" : "outlined"} onClick={() => setActiveTable("service")}>
          Service Quotations
        </Button>
      </div> */}

      {/* Table Container */}
      <TableContainer component={Paper} sx={{ tableLayout: "fixed", maxHeight: 1000, overflowX: "auto", marginTop: 2, border: "1px solid #ccc", flexGrow: 1, overflowY: "auto" }}>
        <div style={{ overflowX: "auto", maxHeight: "400px" }}>
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
              <TableRow style={{ backgroundColor: "#6200ea", color: "white" }}>
                <TableCell style={{ color: "white" }}>#</TableCell>
                <TableCell style={{ color: "white" }}>Enquiry Name</TableCell>
                <TableCell style={{ color: "white" }}>Quotation Date</TableCell>
                <TableCell style={{ color: "white" }}>Tax (%)</TableCell>
                <TableCell style={{ color: "white" }}>Discount (%)</TableCell>
                <TableCell style={{ color: "white" }}>Total Amount ($)</TableCell>
                {/* <TableCell style={{ color: "white" }}>Subtotal ($)</TableCell> */}

                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuotations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quotation) => (
                <React.Fragment key={quotation.index}>
                  <TableRow style={{ backgroundColor: "#f4f4f9" }}>
                    {/* Regular Table Cells */}
                    <TableCell>{quotation.index}</TableCell>
                    <TableCell>{quotation.enquiry_name || "N/A"}</TableCell>
                    <TableCell>{quotation.quotation_date}</TableCell>
                    <TableCell>{quotation.tax_percentage}</TableCell>
                    <TableCell>{quotation.discount_percentage}</TableCell>
                    <TableCell>{quotation.total_amount}</TableCell>
                    <TableCell>
                      {/* Action Buttons */}
                      <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => toggleRow(quotation.index)} color="primary">
                        {expandedRows[quotation.index] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {/* Collapsible Details for Product or Service */}
                  {expandedRows[quotation.index] && (
                    <TableRow style={{ backgroundColor: "#e3f2fd" }}>
                      <TableCell colSpan={9} style={{ padding: "10px 0" }}>
                        <Collapse in={expandedRows[quotation.index]} timeout="auto" unmountOnExit>
                          <Table size="small" style={{ width: "50%", margin: "0 auto" }}>
                            <TableHead>
                              <TableRow style={{ backgroundColor: "#bb86fc" }}>
                                <TableCell>{activeTable === "product" ? "Product Name" : "Service Name"}</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price ($)</TableCell>
                                <TableCell>Total ($)</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(activeTable === "product" ? quotation.products : quotation.services).length > 0 ? (
                                (activeTable === "product" ? quotation.products : quotation.services).map((item, idx) => (
                                  <TableRow key={idx} style={{ backgroundColor: "#ffffff" }}>
                                    <TableCell>{item.product_name || item.service_name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <TableCell>${item.total}</TableCell>
                                    <TableCell>
                                      <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
                                        <Edit />
                                      </IconButton>
                                      <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
                                        <Delete />
                                      </IconButton>
                                      <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
                                        <Visibility />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} style={{ textAlign: "center", color: "#6200ea" }}>
                                    No {activeTable === "product" ? "Products" : "Services"} Found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>

          </Table>
        </div>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredQuotations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default QuotationTable;



//export pdf and excel is atbutton
// import React, { useEffect, useState } from "react";
// import {
//   IconButton,
//   Collapse,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   Paper,
//   Tooltip,
//   Button,
//   TextField,
//   AppBar,
//   Toolbar,
//   Typography,
//   TablePagination,
// } from "@mui/material";
// import {
//   ArrowUpward,
//   ArrowDownward,
//   Add as AddIcon,
//   Search as SearchIcon,
//   ImportExport as ImportExportIcon,
//   PictureAsPdf as PdfIcon,
//   FileDownload as CsvIcon,
// } from "@mui/icons-material";
// import { ExpandMore, ExpandLess, Edit, Delete, Visibility } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductQuotations, fetchServiceQuotations } from "../../../../redux/slice/crm/quotationSlice";
// import { useNavigate, Link } from "react-router-dom";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";

// const QuotationTable = () => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTable, setActiveTable] = useState("product"); // State to toggle between Product and Service tables
//   const [page, setPage] = useState(0); // Pagination state
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

//   const products = useSelector((state) => state.quotations?.products || []);
//   const services = useSelector((state) => state.quotations?.services || []);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchProductQuotations()); // Fetch product quotations
//     dispatch(fetchServiceQuotations()); // Fetch service quotations
//   }, [dispatch]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page on rows per page change
//   };

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleRowAction = (actionKey, rowData) => {
//     if (actionKey === "edit") {
//       navigate(`/dashboard/crm/quotation/${activeTable}-quotation/update/${rowData.id}`);
//     } else if (actionKey === "delete") {
//       // Handle delete logic
//     } else if (actionKey === "view") {
//       navigate(`/dashboard/crm/quotation/${activeTable}-quotation/detail/${rowData.id}`);
//     }
//   };

//   // Mapping Product Quotations
//   const formattedProductQuotations = products.map((quotation, index) => ({
//     index: index + 1,
//     customer_name: quotation.customer_name || "N/A",
//     quotation_date: quotation.quotation_date,
//     tax_percentage: `${quotation.tax_percentage}%`,
//     discount_percentage: `${quotation.discount_percentage}%`,
//     total_amount: `$${quotation.total_amount}`,
//     subtotal: `$${quotation.subtotal || "N/A"}`,
//     net_amount: `$${quotation.net_amount}`,
//     products: quotation.products, // Nested table for products
//   }));

//   // Mapping Service Quotations
//   const formattedServiceQuotations = services.map((quotation, index) => ({
//     index: index + 1,
//     customer_name: quotation.customer_name || "N/A",
//     quotation_date: quotation.quotation_date,
//     tax_percentage: `${quotation.tax_percentage}%`,
//     discount_percentage: `${quotation.discount_percentage}%`,
//     total_amount: `$${quotation.total_amount}`,
//     subtotal: `$${quotation.subtotal || "N/A"}`,
//     net_amount: `$${quotation.net_amount}`,
//     services: quotation.services, // Nested table for services
//   }));

//   // Filter quotations based on search term
//   const filteredQuotations = (activeTable === "product" ? formattedProductQuotations : formattedServiceQuotations).filter((quotation) => {
//     // Ensure that `customer_name` is a string and handle potential null or undefined values
//     const enquiryName = String(quotation.customer_name || "").toLowerCase(); // Convert to string and handle null/undefined
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();

//     // Filter based on all fields
//     return (
//       enquiryName.includes(lowerCaseSearchTerm) ||
//       String(quotation.quotation_date).toLowerCase().includes(lowerCaseSearchTerm) ||
//       String(quotation.tax_percentage).toLowerCase().includes(lowerCaseSearchTerm) ||
//       String(quotation.discount_percentage).toLowerCase().includes(lowerCaseSearchTerm) ||
//       String(quotation.total_amount).toLowerCase().includes(lowerCaseSearchTerm) ||
//       String(quotation.subtotal).toLowerCase().includes(lowerCaseSearchTerm) ||
//       String(quotation.net_amount).toLowerCase().includes(lowerCaseSearchTerm)
//     );
//   });

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Quotations Report", 20, 20);
//     doc.autoTable({ html: "#quotation-table" });
//     doc.save("quotations.pdf");
//   };

//   return (
//     <div className="content-wrapper col-md-11 col-ms-11" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
//       <AppBar position="static" color="gray">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             {activeTable === "product" ? "Product" : "Service"} Quotation Table
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             component={Link}
//             to={`/dashboard/crm/quotation/${activeTable}-quotation/create`}
//             sx={{ marginRight: 2 }}
//           >
//             Add Quotation
//           </Button>
//           <TextField
//             label="Search quotations..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             variant="outlined"
//             size="small"
//             sx={{ backgroundColor: "white", marginRight: 2, width: 250 }}
//             InputProps={{
//               endAdornment: (
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Toolbar>
//       </AppBar>

//       {/* Table Toggle */}
//       <div style={{ margin: "10px" }}>
//         <Button variant={activeTable === "product" ? "contained" : "outlined"} onClick={() => setActiveTable("product")}>
//           Product Quotations
//         </Button>
//         <Button variant={activeTable === "service" ? "contained" : "outlined"} onClick={() => setActiveTable("service")}>
//           Service Quotations
//         </Button>
//       </div>

//       {/* Table Container */}
//       <TableContainer component={Paper} sx={{ maxHeight: 600, overflowX: "auto", marginTop: 2, border: "1px solid #ccc" }}>
//         <div style={{ overflowX: "auto", maxHeight: "400px" }}>
//           <Table sx={{ borderCollapse: "collapse" }}>
//             <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
//               <TableRow style={{ backgroundColor: "#6200ea", color: "white" }}>
//                 <TableCell style={{ color: "white" }}>#</TableCell>
//                 <TableCell style={{ color: "white" }}>Enquiry Name</TableCell>
//                 <TableCell style={{ color: "white" }}>Quotation Date</TableCell>
//                 <TableCell style={{ color: "white" }}>Tax (%)</TableCell>
//                 <TableCell style={{ color: "white" }}>Discount (%)</TableCell>
//                 <TableCell style={{ color: "white" }}>Total Amount ($)</TableCell>
//                 <TableCell style={{ color: "white" }}>Subtotal ($)</TableCell>
//                 <TableCell style={{ color: "white" }}>Net Amount ($)</TableCell>
//                 <TableCell style={{ color: "white" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredQuotations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quotation) => (
//                 <React.Fragment key={quotation.index}>
//                   <TableRow style={{ backgroundColor: "#f4f4f9" }}>
//                     <TableCell>{quotation.index}</TableCell>
//                     <TableCell>{quotation.customer_name}</TableCell>
//                     <TableCell>{quotation.quotation_date}</TableCell>
//                     <TableCell>{quotation.tax_percentage}</TableCell>
//                     <TableCell>{quotation.discount_percentage}</TableCell>
//                     <TableCell>{quotation.total_amount}</TableCell>
//                     <TableCell>{quotation.subtotal}</TableCell>
//                     <TableCell>{quotation.net_amount}</TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
//                         <Edit />
//                       </IconButton>
//                       <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
//                         <Delete />
//                       </IconButton>
//                       <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => toggleRow(quotation.index)} color="primary">
//                         {expandedRows[quotation.index] ? <ExpandLess /> : <ExpandMore />}
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>

//                   {/* Collapsible Details */}
//                   {expandedRows[quotation.index] && (
//                     <TableRow style={{ backgroundColor: "#e3f2fd" }}>
//                       <TableCell colSpan={9} style={{ padding: "10px 0" }}>
//                         <Collapse in={expandedRows[quotation.index]} timeout="auto" unmountOnExit>
//                           <Table size="small" style={{ width: "50%", margin: "0 auto" }}>
//                             <TableHead>
//                               <TableRow style={{ backgroundColor: "#bb86fc" }}>
//                                 <TableCell>{activeTable === "product" ? "Product Name" : "Service Name"}</TableCell>
//                                 <TableCell>Quantity</TableCell>
//                                 <TableCell>Price ($)</TableCell>
//                                 <TableCell>Total ($)</TableCell>
//                                 <TableCell>Action</TableCell>
//                               </TableRow>
//                             </TableHead>
//                             <TableBody>
//                               {(activeTable === "product" ? quotation.products : quotation.services).length > 0 ? (
//                                 (activeTable === "product" ? quotation.products : quotation.services).map((item, idx) => (
//                                   <TableRow key={idx} style={{ backgroundColor: "#ffffff" }}>
//                                     <TableCell>{item.product_name || item.service_name}</TableCell>
//                                     <TableCell>{item.quantity}</TableCell>
//                                     <TableCell>${item.price}</TableCell>
//                                     <TableCell>${item.total}</TableCell>
//                                     <TableCell>
//                                       <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
//                                         <Edit />
//                                       </IconButton>
//                                       <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
//                                         <Delete />
//                                       </IconButton>
//                                       <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
//                                         <Visibility />
//                                       </IconButton>
//                                     </TableCell>
//                                   </TableRow>
//                                 ))
//                               ) : (
//                                 <TableRow>
//                                   <TableCell colSpan={5} style={{ textAlign: "center", color: "#6200ea" }}>
//                                     No {activeTable === "product" ? "Products" : "Services"} Found
//                                   </TableCell>
//                                 </TableRow>
//                               )}
//                             </TableBody>
//                           </Table>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </TableContainer>

//       {/* Pagination Controls */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={filteredQuotations.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       {/* Export buttons */}
//       <div style={{ marginTop: "20px" }}>
//         <Button onClick={exportToPDF} startIcon={<PdfIcon />} variant="contained" sx={{ marginRight: 2 }}>
//           Export PDF
//         </Button>
//         <CSVLink
//           data={filteredQuotations}
//           headers={[
//             { label: "Enquiry Name", key: "customer_name" },
//             { label: "Quotation Date", key: "quotation_date" },
//             { label: "Tax (%)", key: "tax_percentage" },
//             { label: "Discount (%)", key: "discount_percentage" },
//             { label: "Total Amount ($)", key: "total_amount" },
//             { label: "Subtotal ($)", key: "subtotal" },
//             { label: "Net Amount ($)", key: "net_amount" },
//           ]}
//           filename="quotations.csv"
//         >
//           <Button startIcon={<CsvIcon />} variant="contained">
//             Export CSV
//           </Button>
//         </CSVLink>
//       </div>
//     </div>
//   );
// };

// export default QuotationTable;


//old working well
// import React, { useEffect, useState } from "react";
// import {
//   IconButton,
//   Collapse,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   Paper,
//   Tooltip,
//   Button,
//   TextField,
//   AppBar,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { ArrowUpward, ArrowDownward, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
// import { ExpandMore, ExpandLess, Edit, Delete, Visibility } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductQuotations, fetchServiceQuotations } from "../../../../redux/slice/crm/quotationSlice";
// import { useNavigate, Link } from "react-router-dom";

// const QuotationTable = () => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTable, setActiveTable] = useState("product"); // State to toggle between Product and Service tables
//   const products = useSelector((state) => state.quotations?.products || []);
//   const services = useSelector((state) => state.quotations?.services || []);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchProductQuotations()); // Fetch product quotations
//     dispatch(fetchServiceQuotations()); // Fetch service quotations
//   }, [dispatch]);

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleRowAction = (actionKey, rowData) => {
//     if (actionKey === "edit") {
//       navigate(`/dashboard/crm/quotation/${activeTable}-quotation/update/${rowData.id}`);
//     } else if (actionKey === "delete") {
//       // Handle delete logic
//     } else if (actionKey === "view") {
//       navigate(`/dashboard/crm/quotation/${activeTable}-quotation/detail/${rowData.id}`);
//     }
//   };

//   // Mapping Product Quotations
//   const formattedProductQuotations = products.map((quotation, index) => ({
//     index: index + 1,
//     customer_name: quotation.customer_name || "N/A",
//     quotation_date: quotation.quotation_date,
//     tax_percentage: `${quotation.tax_percentage}%`,
//     discount_percentage: `${quotation.discount_percentage}%`,
//     total_amount: `$${quotation.total_amount}`,
//     subtotal: `$${quotation.subtotal || "N/A"}`,
//     net_amount: `$${quotation.net_amount}`,
//     products: quotation.products, // Nested table for products
//   }));

//   // Mapping Service Quotations
//   const formattedServiceQuotations = services.map((quotation, index) => ({
//     index: index + 1,
//     customer_name: quotation.customer_name || "N/A",
//     quotation_date: quotation.quotation_date,
//     tax_percentage: `${quotation.tax_percentage}%`,
//     discount_percentage: `${quotation.discount_percentage}%`,
//     total_amount: `$${quotation.total_amount}`,
//     subtotal: `$${quotation.subtotal || "N/A"}`,
//     net_amount: `$${quotation.net_amount}`,
//     services: quotation.services, // Nested table for services
//   }));

//   return (
//     <div className="content-wrapper col-md-11 col-ms-11">
//       <AppBar position="static" color="gray">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             {activeTable === "product" ? "Product" : "Service"} Quotation Table
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             component={Link}
//             to={`/dashboard/crm/quotation/${activeTable}-quotation/create`}
//             sx={{ marginRight: 2 }}
//           >
//             Add Quotation
//           </Button>
//           <TextField
//             label="Search quotations..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             variant="outlined"
//             size="small"
//             sx={{ backgroundColor: "white", marginRight: 2, width: 250 }}
//             InputProps={{
//               endAdornment: (
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Toolbar>
//       </AppBar>

//       {/* Table Toggle */}
//       <div style={{ margin: "10px" }}>
//         <Button variant={activeTable === "product" ? "contained" : "outlined"} onClick={() => setActiveTable("product")}>
//           Product Quotations
//         </Button>
//         <Button variant={activeTable === "service" ? "contained" : "outlined"} onClick={() => setActiveTable("service")}>
//           Service Quotations
//         </Button>
//       </div>

//       {/* Table Container */}
//       <TableContainer component={Paper} sx={{ maxHeight: 600, overflowX: "auto", marginTop: 2, border: "1px solid #ccc" }}>
//         <Table sx={{ borderCollapse: "collapse" }}>
//           <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
//             <TableRow style={{ backgroundColor: "#6200ea", color: "white" }}>
//               <TableCell style={{ color: "white" }}>#</TableCell>
//               <TableCell style={{ color: "white" }}>Enquiry Name</TableCell>
//               <TableCell style={{ color: "white" }}>Quotation Date</TableCell>
//               <TableCell style={{ color: "white" }}>Tax (%)</TableCell>
//               <TableCell style={{ color: "white" }}>Discount (%)</TableCell>
//               <TableCell style={{ color: "white" }}>Total Amount ($)</TableCell>
//               <TableCell style={{ color: "white" }}>Subtotal ($)</TableCell>
//               <TableCell style={{ color: "white" }}>Net Amount ($)</TableCell>
//               <TableCell style={{ color: "white" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(activeTable === "product" ? formattedProductQuotations : formattedServiceQuotations).length > 0 ? (
//               (activeTable === "product" ? formattedProductQuotations : formattedServiceQuotations).map((quotation, index) => (
//                 <React.Fragment key={quotation.index}>
//                   <TableRow style={{ backgroundColor: "#f4f4f9" }}>
//                     <TableCell>{quotation.index}</TableCell>
//                     <TableCell>{quotation.customer_name}</TableCell>
//                     <TableCell>{quotation.quotation_date}</TableCell>
//                     <TableCell>{quotation.tax_percentage}</TableCell>
//                     <TableCell>{quotation.discount_percentage}</TableCell>
//                     <TableCell>{quotation.total_amount}</TableCell>
//                     <TableCell>{quotation.subtotal}</TableCell>
//                     <TableCell>{quotation.net_amount}</TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
//                         <Edit />
//                       </IconButton>
//                       <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
//                         <Delete />
//                       </IconButton>
//                       <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => toggleRow(quotation.index)} color="primary">
//                         {expandedRows[quotation.index] ? <ExpandLess /> : <ExpandMore />}
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>

//                   {/* Collapsible Details */}
//                   {expandedRows[quotation.index] && (
//                     <TableRow style={{ backgroundColor: "#e3f2fd" }}>
//                       <TableCell colSpan={9} style={{ padding: "10px 0" }}>
//                         <Collapse in={expandedRows[quotation.index]} timeout="auto" unmountOnExit>
//                           <Table size="small" style={{ width: "50%", margin: "0 auto" }}>
//                             <TableHead>
//                               <TableRow style={{ backgroundColor: "#bb86fc" }}>
//                                 <TableCell>{activeTable === "product" ? "Product Name" : "Service Name"}</TableCell>
//                                 <TableCell>Quantity</TableCell>
//                                 <TableCell>Price ($)</TableCell>
//                                 <TableCell>Total ($)</TableCell>
//                                 <TableCell>Action</TableCell>
//                               </TableRow>
//                             </TableHead>
//                             <TableBody>
//                               {(activeTable === "product" ? quotation.products : quotation.services).length > 0 ? (
//                                 (activeTable === "product" ? quotation.products : quotation.services).map((item, idx) => (
//                                   <TableRow key={idx} style={{ backgroundColor: "#ffffff" }}>
//                                     <TableCell>{item.product_name || item.service_name}</TableCell>
//                                     <TableCell>{item.quantity}</TableCell>
//                                     <TableCell>${item.price}</TableCell>
//                                     <TableCell>${item.total}</TableCell>
//                                     <TableCell>
//                                       <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
//                                         <Edit />
//                                       </IconButton>
//                                       <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
//                                         <Delete />
//                                       </IconButton>
//                                       <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
//                                         <Visibility />
//                                       </IconButton>
//                                     </TableCell>
//                                   </TableRow>
//                                 ))
//                               ) : (
//                                 <TableRow>
//                                   <TableCell colSpan={5} style={{ textAlign: "center", color: "#6200ea" }}>
//                                     No {activeTable === "product" ? "Products" : "Services"} Found
//                                   </TableCell>
//                                 </TableRow>
//                               )}
//                             </TableBody>
//                           </Table>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </React.Fragment>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={9} style={{ textAlign: "center" }}>
//                   No Quotations Available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default QuotationTable;
