import React from "react";
import { useState, useEffect } from "react";
import "../../css/table/Table.css";
import {  useDispatch } from "react-redux"; // Correct import
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import EnquiryDelete from "./EnquiryDelete";
import { useSelector } from 'react-redux';

import * as XLSX from "xlsx";
import { AppBar, Toolbar, Typography, TextField, IconButton, Button } from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableIcon,
  FileDownload as ExcelIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";
import {
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Snackbar,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast } from "react-toastify";
import { fetchLostEnquiries } from "../../redux/slice/crm/enquirySlice"; // Assuming you have this act
const LostEnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const maxHistoryLength = 100; // Maximum characters to show for history
  const maxEnquiryPurposeLength = 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
 const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [customers, setCustomers] = useState([]);  // State for customer list


// Access lost enquiries from Redux store
const lostEnquiries = useSelector((state) => state.enquiries.lostEnquiries);

// if (lostEnquiries.length === 0) {
//   return <div>No lost enquiries found.</div>;
// }
// const loading = useSelector((state) => state.enquiries.loading);
// const error = useSelector((state) => state.enquiries.error);

// useEffect(() => {
//   dispatch(fetchLostEnquiries()); // Fetch lost enquiries when the component mounts
// }, [dispatch]);

  console.log("Enquiry:", lostEnquiries);
  const handleConvertToCustomer = (enquiryId, newCustomer) => {
    setFilteredEnquiries((prevEnquiries) =>
      prevEnquiries.filter((enquiry) => enquiry.id !== enquiryId)
    );
    // Update the customers state
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    // Remove the enquiry from the filtered enquiries list
    setFilteredEnquiries((prevEnquiries) =>
      prevEnquiries.filter((e) => e.id !== enquiryId)
    );
    // Show success message
    setMessage('Enquiry converted to customer successfully!');
    setOpenSnackbar(true);
  };
  
 

  // On page load or data fetch, ensure filteredEnquiries has data
  // useEffect(() => {
  //   // Fetch data from your backend or API and populate `enquiries`
  //   // After fetching, filter the lost enquiries as well
  //   const fetchedEnquiries = []; // Assume you fetch your enquiry data here
  //   setEnquiries(fetchedEnquiries);

  //   // Set the filteredEnquiries (optional: to display all at first)
  //   setFilteredEnquiries(fetchedEnquiries);

  //   // Initialize lost enquiries
  //   const lostEnquiries = fetchedEnquiries.filter(
  //     (enquiry) => enquiry.status === "Lost"
  //   );
  //   setFilteredEnquiries(lostEnquiries);
  // }, []);



  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
 //########### importing excel file #############
 const importExcel = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(sheet);

    const formattedRows = parsedData.map((row, index) => ({
      id: index + 1,
      name: row.Name || "Unknown",
      dueDate: row.DueDate || "2024-12-31",
      status: row.Status || "Pending",
    }));
    setEnquiries((prevRows) => [...prevRows, ...formattedRows]);
  };
  reader.readAsArrayBuffer(file);
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    importExcel(event);
    toast.success("Excel file imported successfully!");
  } else {
    toast.error("Please select a valid Excel file!");
  }
};
//########### Helper function to format date as a readable string ###############
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

  // ################ Helper function to check if the next follow-up date is tomorrow################
  const isTomorrow = (dateString) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Reset time to midnight
    const nextFollowUp = new Date(dateString);
    nextFollowUp.setHours(0, 0, 0, 0); // Reset time to midnight

    return tomorrow.getTime() === nextFollowUp.getTime();
  };
//################# pagination handle#############
const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  // ######### Calculate the rows to be displayed based on the current page and items per page###
  const paginatedRows = filteredEnquiries.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  // Truncate the history text to maxHistoryLength
  const truncateHistory = (history) => {
    if (history && history.length > maxHistoryLength) {
      return history.substring(0, maxHistoryLength) + "..."; // Add ellipsis
    }
    return history;
  };
  //##### truncate enquiry purpose######################
  const truncateEnquiryPurpose = (enquiry_purpose) => {
    if (enquiry_purpose && enquiry_purpose.length > maxEnquiryPurposeLength) {
      return enquiry_purpose.substring(0, maxEnquiryPurposeLength) + "..."; // Add ellipsis
    }
    return enquiry_purpose;
  };

//############# sorting by customer name##############
  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };


  //###############  handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //##############converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
// ### handle sort
const handleSort = (key) => {
  const direction =
    sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

  const sortedRows = [...enquiries].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  setSortConfig({ key, direction });
  setEnquiries(sortedRows);
};

  // export to excel;
  // if (error) return <div>Error: {error}</div>;
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      enquiries.map((enquiry) => ({
        ID: enquiry.id,
        Name: enquiry.customer_name,

        category: enquiry.category_name,
        organization_name: enquiry.organization_name,
        department: enquiry.department_name,
        designation: enquiry.designation_name,
        pri_phone: enquiry.pri_phone,
        sec_phone: enquiry.sec_phone,
        email: enquiry.email,
        gender: enquiry.gender,

        province: enquiry.province_name,
        // zone:enquiry.
        district: enquiry.district_name,
        municipality: enquiry.municipality_name,
        ward_no: enquiry.ward_no,
        tole_name: enquiry.tole_name,

        estimated_amount: enquiry.estimated_amount,
        enquiry_purpose: enquiry.enquiry_purpose,
        known_by: enquiry.known_by,
        created: enquiry.created,
        history: enquiry.history,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "enquires lost");
    XLSX.writeFile(workbook, "enquiries lost .xlsx");
  };
//export to pdf
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("lost enquiries List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = enquiries.map((enquiry) => [
      enquiry.id,
      enquiry.customer_name,
      enquiry.category,
      enquiry.organization_name,
      enquiry.department,
      enquiry.designation,
      enquiry.pri_phone,
      enquiry.sec_phone,
      enquiry.email,
      enquiry.gender,
      enquiry.province_name,
      enquiry.district_name,
      enquiry.municipality_name,
      enquiry.ward_no,
      enquiry.tole_name,
      enquiry.estimated_amount,
      enquiry.enquiry_purpose,
      enquiry.known_by,
      enquiry.created,
      enquiry.history,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("lost enquiries.pdf");
  };

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="card">
          {/* heading */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

               {/* Enquiry Table Title */}
                <Typography left variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#333', flexGrow: 1 }}>
                  Enquiry Table
                </Typography>

                <div className="navbar-nav ml-auto">
                        <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="create"
                  sx={{ marginRight: 2 }}
                >
                  Add Enquiry
                </Button>

                      {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
          <TextField
            variant="outlined"
            size="small"
             label="Search Enquiries..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: 250 }}
          />
        </div>

        {/* Export Buttons */}
        <Button
          variant="outlined"
          color="info"
          startIcon={<ExcelIcon />}
          onClick={exportToExcel}
          sx={{ marginRight: 1 }}
        >
          Export Excel
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<PdfIcon />}
          onClick={exportToPDF}
        >
          Export PDF
        </Button>
            <Button
                variant="contained"  // You can also use "outlined" if you prefer
                // component="label"
                sx={{
                  marginBottom: '8px',
                  marginLeft:1,
                  marginRight: 1,
                  backgroundColor: '#3f51b5',  // Your custom color
                  color: 'white',  // Text color
                  '&:hover': {
                    backgroundColor: '#303f9f',  // Darker shade on hover
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <UploadFileIcon sx={{ marginRight: 1 }} />
                Import Excel
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  hidden
                  onChange={handleFileChange}  // Call the function to handle file import
                />
              </Button>
              </div>

        </div>
          </nav>
          {/* heading end */}
          <div className="card-body">
            <div className="table-container">
              <table className="table table-bordered">
                 {/* Snackbar for Toast Notification */}
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                  message={message}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
                <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>#</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Customer Name   <TableSortLabel
                          active={sortConfig.key === "customer_name"}
                          direction={sortConfig.direction}
                          onClick={() => handleSort("customer_name")}
                        ></TableSortLabel>

                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Enquiry Date</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Next Follow Up Date
                      <TableSortLabel
                                active={sortConfig.key === "due_date"}
                                direction={sortConfig.direction}
                                onClick={() => handleSort("due_date")}>
                     </TableSortLabel>
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Category</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Department</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Designation</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Phone</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Email</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Gender</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Province</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>District</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Municipality</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Street Address</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Budget</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Enquiry Purpose</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Known By</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>History</TableCell>
                      <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                <tbody>
                {filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enquiry, index) => {
                      // Check if next follow-up date is tomorrow
                      const isRedMark = isTomorrow(enquiry.next_follow_up_date);
                      return (
                        <tr key={enquiry.id}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{formatName(enquiry.customer_name)}</td>

                          <td>{formatDateTime(enquiry.created)}</td>
                          <td
                            style={{
                              backgroundColor: isRedMark
                                ? "red"
                                : "transparent",
                              color: isRedMark ? "white" : "black",
                            }}
                          >
                            {formatDateTime(enquiry.next_follow_up_date)}
                          </td>
                          <td>{enquiry.category_name}</td>
                          <td>{formatName(enquiry.department_name)}</td>
                          <td>{formatName(enquiry.designation_name)}</td>
                          <td>{enquiry.pri_phone}</td>
                          {/* <td>{enquiry.sec_phone}</td> */}
                          <td>{enquiry.email}</td>
                          <td>{enquiry.gender}</td>
                          <td>{formatName(enquiry.province_name)}</td>
                          <td>{formatName(enquiry.district_name)}</td>
                          <td>{formatName(enquiry.municipality_name)}</td>
                          <td>{enquiry.street_address}</td>
                          {/* <td>{formatName(enquiry.tole_name)}</td> */}
                          <td>{enquiry.estimated_amount}</td>
                          <td>
                            {truncateEnquiryPurpose(enquiry.enquiry_purpose)}
                          </td>
                          <td>{enquiry.known_by}</td>

                          <td>
                            {/* Display truncated history */}
                            <p>{truncateHistory(enquiry.history)}</p>
                          </td>

                          <TableCell>
                          <IconButton
                            color="primary"
                            href={`/dashboard/crm/enquiry/update/${enquiry.id}`}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                        color="info"
                        href={`/dashboard/crm/enquiry/detail/${enquiry.id}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setEnquiryToDelete(enquiry.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Button
                              variant="contained"
                              color="success"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => handleConvertToCustomer(enquiry.id)}
                            >
                              Convert to Customer
                            </Button>
                    </TableCell>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="17">No lost enquiries found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

           {/* Pagination */}
           <TablePagination
              rowsPerPageOptions={[10, 25, 50,100]}
              component="div"
              count={filteredEnquiries.length}
              rowsPerPage={itemsPerPage}
              page={currentPage - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {enquiryToDelete !== null && (
          <EnquiryDelete
            id={enquiryToDelete}
            onClose={() => setEnquiryToDelete(null)}
          />
        )}
      </div>

    </div>
  );
};

export default LostEnquiryTable;
