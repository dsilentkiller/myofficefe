import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import customerForm from "./customerForm";
import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
import "../../css/table/Table.css";
import { Link, useNavigate } from "react-router-dom";
import CustomerDelete from "./CustomerDelete";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { convertEnquiryToCustomer } from "../../redux/slice/customer/customerSlice";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Paper,
  Box,
  Typography,
  Container,
  Toolbar,
  Button,
  TextField,
  IconButton,
} from "@mui/material";

const CustomerTable = () => {
  // const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const maxHistoryLength = 100; // Maximum characters to show for history
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [enquiries, setEnquiries] = useState([]);

  const maxEnquiryPurposeLength = 100;
  // const maxcustomerPurposeLength = 100;
  //fetching customers data and save into customers
  const customers = useSelector((state) => state.customers?.list || []);

  const handleConvertEnquiry = (enquiryId) => {
    dispatch(convertEnquiryToCustomer(enquiryId))
      .then(() => {
        // After conversion, fetch the updated customer list
        dispatch(fetchCustomers());
      })
      .catch((error) => {
        console.error("Conversion failed:", error);
      });
  };

  //fetching customers data into table
  useEffect(() => {
    dispatch(fetchCustomers());
    //live search handling
  }, [dispatch]);
  //checking in console whether data is passed or not
  useEffect(() => {
    console.log("Fetched customers:", customers);
  }, [customers]);
  useEffect(() => {
    console.log("Current Customer List after conversion:", customers);
  }, [customers]);

  //filter data fetch in table for searching function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        setFilteredCustomers(
          customers.filter((customer) =>
            customer.customer_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredCustomers(customers);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, customers]);

  // // Helper function to format date as a readable string
  // const formatDateTime = (dateString) => {
  //   if (!dateString) return "";
  //   const options = {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: false,
  //   };
  //   return new Intl.DateTimeFormat("en-US", options).format(
  //     new Date(dateString)
  //   );
  // };

  // Helper function to check if the next follow-up date is tomorrow
  const isTomorrow = (dateString) => {
    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    const nextFollowUp = new Date(dateString);

    // Set time to midnight for comparison
    tomorrow.setHours(0, 0, 0, 0);
    nextFollowUp.setHours(0, 0, 0, 0);

    return tomorrow.getTime() === nextFollowUp.getTime();
  };

  // handle in page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Truncate the history text to maxHistoryLength
  const truncateHistory = (history) => {
    if (history && history.length > maxHistoryLength) {
      return history.substring(0, maxHistoryLength) + "..."; // Add ellipsis
    }
    return history;
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
  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //--converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const truncateEnquiryPurpose = (enquiry_purpose) => {
    if (enquiry_purpose && enquiry_purpose.length > maxEnquiryPurposeLength) {
      return enquiry_purpose.substring(0, maxEnquiryPurposeLength) + "..."; // Add ellipsis
    }
    return enquiry_purpose;
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

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            {/* heading */}

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <h5 className="navbar-brand">Customer List</h5>
              <div className="navbar-nav ml-auto">
                <form
                  method="get"
                  action="/customer/search/"
                  className="form-inline ml-3"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      variant="outlined"
                      label="Search Customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      size="small"
                      sx={{ marginRight: 2 }}
                    />
                    <Button
                      to="/dashboard/customer/create"
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      component={Link}
                    >
                      Add Customer
                    </Button>
                  </Box>
                </form>
                {/* </div> */}
              </div>
            </nav>
            {/* heading end */}
            <div className="card-body">
              <div className="table-container">
                <table className="table table-bordered">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < customers.length
                          }
                          checked={
                            customers.length > 0 &&
                            selected.length === customers.length
                          }
                        />
                      </TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "name"}
                          direction={order}
                          onClick={() => handleSortRequest("name")}
                        >
                          Customer Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        customer Date
                      </TableCell>
                      {/* <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Next Follow Up Date
                                                                    <TableSortLabel
                                                                              active={sortConfig.key === "due_date"}
                                                                              direction={sortConfig.direction}
                                                                              onClick={() => handleSort("due_date")}>
                                                                   </TableSortLabel>
                                                                   </TableCell>*/}
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        Category
                      </TableCell>
                      <TableCell>Organization</TableCell>

                      <TableCell
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        Department
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        Designation
                      </TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        Street Address
                      </TableCell>
                      {/* <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Budget</TableCell> */}
                      {/* <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>customer Purpose</TableCell> */}

                      {/* <TableCell>Joining Date</TableCell> */}
                      <TableCell> History</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer, index) => {
                        const isRedMark = isTomorrow(
                          customer.next_follow_up_date
                        );
                        return (
                          <TableRow key={customer.id} hover>
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{formatName(customer.customer_name)}</td>
                            <td>{formatDateTime(customer.created)}</td>
                            {/* <td
                                        style={{
                                          backgroundColor: isRedMark
                                            ? "red"
                                            : "transparent",
                                          color: isRedMark ? "white" : "black",
                                        }}
                                      >
                                        {formatDateTime(customer.next_follow_up_date)}
                                      </td>*/}
                            <td>{customer.category_name}</td>
                            <td>{formatName(customer.organization_name)}</td>
                            <td>{formatName(customer.department_name)}</td>
                            <td>{formatName(customer.designation_name)}</td>

                            <td>{customer.pri_phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.street_address}</td>
                            {/* <td>{formatName(customer.tole_name)}</td> */}
                            {/* <td>{customer.estimated_amount}</td> */}
                            {/* <td>
                                      {truncateEnquiryPurpose(customer.enquiry_purpose)}
                                    </td> */}

                            {/* <td>{customer.joining_date}</td> */}
                            <td>
                              {/* Display truncated history */}
                              <p>{truncateHistory(customer.history)}</p>
                            </td>
                            {/* <td>{customer.street_address}</td> */}
                            <td>
                              <Link
                                className="btn btn-primary col-mt-2"
                                to={`/dashboard/customer/update/${customer.id}`}
                              >
                                Edit
                              </Link>

                              <Link
                                className="btn btn-info col-mt-1"
                                to={`/dashboard/customer/detail/${customer.id}`}
                              >
                                View
                              </Link>

                              <Link
                                onClick={() => setCustomerToDelete(customer.id)}
                                className="btn btn-danger col-mt-1"
                              >
                                Delete
                              </Link>
                            </td>
                          </TableRow>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8">No customers found</td>
                      </tr>
                    )}
                  </TableBody>
                </table>
              </div>
            </div>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredCustomers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {customerToDelete !== null && (
          <CustomerDelete
            id={customerToDelete}
            onClose={() => setCustomerToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerTable;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableSortLabel,
//   Checkbox,
//   Paper,
//   Box,
//   Typography,
//   Container,
//   Toolbar,
//   Button,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
// import { Link, useNavigate } from "react-router-dom";

// const CustomerTable = () => {
// const [order, setOrder] = useState("asc");
// const [orderBy, setOrderBy] = useState("name");
// const [selected, setSelected] = useState([]);
// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(10);
// const [searchTerm, setSearchTerm] = useState("");
// const [filteredCustomers, setFilteredCustomers] = useState([]);
// const customers = useSelector((state) => state.customers?.list || []);
// const dispatch = useDispatch();
// const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   useEffect(() => {
//     if (searchTerm.trim()) {
//       setFilteredCustomers(
//         customers.filter((customer) =>
//           customer.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredCustomers(customers);
//     }
//   }, [searchTerm, customers]);

// const handleSortRequest = (property) => {
//   const isAscending = orderBy === property && order === "asc";
//   setOrder(isAscending ? "desc" : "asc");
//   setOrderBy(property);
// };

// const handleChangePage = (event, newPage) => {
//   setPage(newPage);
// };

// const handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(parseInt(event.target.value, 10));
//   setPage(0);
// };

//   const displayedCustomers = [...filteredCustomers]
//     .sort((a, b) => {
//       if (orderBy === "name") {
//         return order === "asc"
//           ? a.customer_name.localeCompare(b.customer_name)
//           : b.customer_name.localeCompare(a.customer_name);
//       }
//       return 0;
//     })
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Container
//     maxWidth="xl"
//     sx={{
//       height: "100vh", // Makes it cover the full height
//       overflow: "auto", // Enables scrolling
//       padding: 2,
//       backgroundColor: "background.paper",
//       borderRadius: 2,
//     }}
//   >
//     <Paper sx={{ width: "100%", height: "100%", overflow: "auto" }}>
//     <Box
//           p={2}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h5" component="div">
//             Customer List
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <TextField
//               variant="outlined"
//               placeholder="Search Customers..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               size="small"
//               sx={{ marginRight: 2 }}
//             />
//             <IconButton color="primary" size="large">
//               <SearchIcon />
//             </IconButton>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<AddIcon />}
//               component={Link}
//               to="/dashboard/customer/create"
//             >
//               Add Customer
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       <Paper elevation={3} sx={{ overflow: "auto", height: "calc(100% - 150px)" }}>
//         <TableContainer sx={{ maxHeight: "100%" }}>
//           <Table stickyHeader>
// <TableHead>
//   <TableRow>
//     <TableCell padding="checkbox">
//       <Checkbox
//         indeterminate={
//           selected.length > 0 && selected.length < customers.length
//         }
//         checked={
//           customers.length > 0 && selected.length === customers.length
//         }
//       />
//     </TableCell>
//     <TableCell>#</TableCell>
//     <TableCell>
//       <TableSortLabel
//         active={orderBy === "name"}
//         direction={order}
//         onClick={() => handleSortRequest("name")}
//       >
//         Name
//       </TableSortLabel>
//     </TableCell>
//     <TableCell>Phone</TableCell>
//     <TableCell>Email</TableCell>
//     <TableCell>Organization</TableCell>
//     <TableCell>Joining Date</TableCell>
//     <TableCell>Actions</TableCell>
//   </TableRow>
// </TableHead>
//             <TableBody>
//               {displayedCustomers.map((customer, index) => (
// <TableRow key={customer.id} hover>
//   <TableCell padding="checkbox">
//     <Checkbox />
//   </TableCell>
//   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//   <TableCell>{customer.customer_name}</TableCell>
//   <TableCell>{customer.pri_phone}</TableCell>
//   <TableCell>{customer.email}</TableCell>
//   <TableCell>{customer.organization_name}</TableCell>
//   <TableCell>{customer.joining_date}</TableCell>
//   <TableCell>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       color="primary"
//                       onClick={() => navigate(`/dashboard/customer/update/${customer.id}`)}
//                       sx={{ marginRight: 1 }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => navigate(`/dashboard/customer/detail/${customer.id}`)}
//                     >
//                       View
//                     </Button>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       color="danger"
//                       onClick={() => navigate(`/dashboard/customer/delete/${customer.id}`)}
//                     >
//                       delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
// <TablePagination
//   rowsPerPageOptions={[10, 25, 50]}
//   component="div"
//   count={filteredCustomers.length}
//   rowsPerPage={rowsPerPage}
//   page={page}
//   onPageChange={handleChangePage}
//   onRowsPerPageChange={handleChangeRowsPerPage}
// />

//       </Paper>

//     </Container>
//   );
// };

// export default CustomerTable;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableSortLabel,
//   Checkbox,
//   Paper,
//   Box,
//   Typography,
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// // import customerForm from "./customerForm";
// import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
// import "../../css/Table.css";
// import { Link, useNavigate } from "react-router-dom";
// import CustomerDelete from "./CustomerDelete";

// const CustomerTable = () => {
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("name");
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [customerToDelete, setCustomerToDelete] = useState(null);
//   const maxHistoryLength = 100; // Maximum characters to show for history

//   const customers = useSelector((state) => state.customers?.list || []);
// //fetching customers data into table
//   useEffect(() => {
//     dispatch(fetchCustomers());
//         //live search handling
//   }, [dispatch]);
//   //checking in console whether data is passed or not
//   useEffect(() => {
//     console.log("Fetched customers:", customers);
//   }, [customers]);
//   // Live search functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchTerm.trim()) {
//         setFilteredCustomers(
//           customers.filter((customer) =>
//             customer.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//         );
//       } else {
//         setFilteredCustomers(customers);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm, customers]);

//   const handleSortRequest = (property) => {
//     const isAscending = orderBy === property && order === "asc";
//     setOrder(isAscending ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = customers.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   const sortedCustomers = [...filteredCustomers].sort((a, b) => {
//     if (orderBy === "name") {
//       return order === "asc"
//         ? a.customer_name.localeCompare(b.customer_name)
//         : b.customer_name.localeCompare(a.customer_name);
//     }
//     return 0;
//   });

//   const displayedCustomers = sortedCustomers.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Container
//   maxWidth="lg"
//   sx={{
//     padding: 2,
//     backgroundColor: 'background.paper',
//     borderRadius: 2,
//   }}
// >
//     <Paper>
//       <Box p={2}>
//         <Typography variant="h6">Customer List</Typography>
//       </Box>
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   indeterminate={
//                     selected.length > 0 && selected.length < customers.length
//                   }
//                   checked={
//                     customers.length > 0 && selected.length === customers.length
//                   }
//                   onChange={handleSelectAllClick}
//                 />
//               </TableCell>
//               <TableCell>#</TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === "name"}
//                   direction={order}
//                   onClick={() => handleSortRequest("name")}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Organization</TableCell>
//               <TableCell>Joining Date</TableCell>
//               <TableCell>History</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedCustomers.map((customer, index) => {
//               const isItemSelected = isSelected(customer.id);
//               return (
//                 <TableRow
//                   key={customer.id}
//                   hover
//                   onClick={(event) => handleClick(event, customer.id)}
//                   role="checkbox"
//                   aria-checked={isItemSelected}
//                   selected={isItemSelected}
//                 >
//                   <TableCell padding="checkbox">
//                     <Checkbox checked={isItemSelected} />
//                   </TableCell>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{customer.customer_name}</TableCell>
//                   <TableCell>{customer.pri_phone}</TableCell>
//                   <TableCell>{customer.email}</TableCell>
//                   <TableCell>{customer.organization_name}</TableCell>
//                   <TableCell>{customer.joining_date}</TableCell>
//                   <TableCell>{customer.history}</TableCell>
//                   <TableCell>
//                     <button to ={`/dashboard/customer/update/${customer.id}`}>Edit</button>
//                     <button to={`/dashboard/customer/detail/${customer.id}`}>View</button>
//                     <button  onClick={() => setCustomerToDelete(customer.id)}
//                               className="btn btn-danger col-mt-1">Delete</button>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={filteredCustomers.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//     </Container>
//   );
// };

// export default CustomerTable;
