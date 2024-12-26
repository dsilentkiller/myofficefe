



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import customerForm from "./customerForm";
import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
import "../../css/Table.css";
import { Link, useNavigate } from "react-router-dom";
import CustomerDelete from "./CustomerDelete";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
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
    // const maxEnquiryPurposeLength = 100;
    //fetching customers data and save into customers
  const customers = useSelector((state) => state.customers?.list || []);


  //fetching customers data into table
  useEffect(() => {
    dispatch(fetchCustomers());
        //live search handling
  }, [dispatch]);
  //checking in console whether data is passed or not
  useEffect(() => {
    console.log("Fetched customers:", customers);
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
    // const isTomorrow = (dateString) => {
    //   const now = new Date();
    //   const tomorrow = new Date(now.setDate(now.getDate() + 1));
    //   const nextFollowUp = new Date(dateString);

    //   // Set time to midnight for comparison
    //   tomorrow.setHours(0, 0, 0, 0);
    //   nextFollowUp.setHours(0, 0, 0, 0);

    //   return tomorrow.getTime() === nextFollowUp.getTime();
    // };

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
    //enquiry purpose
    // const truncateEnquiryPurpose = (enquiry_purpose) => {
    //   if (enquiry_purpose && enquiry_purpose.length > maxEnquiryPurposeLength) {
    //     return enquiry_purpose.substring(0, maxEnquiryPurposeLength) + "..."; // Add ellipsis
    //   }
    //   return enquiry_purpose;
    // };
    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    // if (error) {
    //   return <div>Error loading enquiries: {error.message}</div>;
    // }
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


  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              {/* <div className="container-fluid"> */}
                <h5 className="navbar-brand">Customer List</h5>
                <div className="navbar-nav ml-auto">
                  {/* <Link to="/dashboard/customer/create"  className="nav-Link btn btn-info"> */}

                  {/* </Link> */}
                  <form
                    method="get"
                    action="/customer/search/"
                    className="form-inline ml-3"
                  >
                    {/* <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="searchTerm"
                        className="form-control"
                        placeholder="Search Mockups, Logos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        required
                      />
                      <div className="input-group-append">
                        <Link type="submit" className="btn btn-info">
                          Search
                        </Link>
                      </div> */}
                    {/* </div> */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Search Customers..."
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
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>organization </th>
                              <th>joining date</th>
                              <th>history</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCustomers.length > 0 ? (
                              filteredCustomers.map((customer,index) => (
                                <tr key={customer.id}>
                                   <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                  <td>{formatName(customer.customer_name)}</td>
                                  <td>{customer.pri_phone}</td>
                                  <td>{customer.email}</td>
                                  <td>{formatName(customer.organization_name)}</td>
                                  <td>{customer.joining_date}</td>
                                  <td>
                            {/* Display truncated history */}
                            <p>{truncateHistory(customer.history)}</p>
                          </td>
                                  {/* <td>{customer.street_address}</td> */}
                                  <td>
                                    <Link className="btn btn-primary col-mt-2" to ={`/dashboard/customer/update/${customer.id}`}>
                                      Edit
                                    </Link>

                                    <Link className="btn btn-info col-mt-1" to={`/dashboard/customer/detail/${customer.id}`}>
                                      View
                                    </Link>

                                    <Link
                              onClick={() => setCustomerToDelete(customer.id)}
                              className="btn btn-danger col-mt-1"
                            >
                              Delete
                            </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No customers found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             {/* <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={filteredCustomers.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}

            <div className="pagination-wrapper">
              <div className="pagination-controls">
                <div className="pagination-info">
                  <label htmlFor="itemsPerPage">Items per page:</label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-Link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &laquo;
                      </Link>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-Link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-Link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        &raquo;
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
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













// import React from "react";
// // import axios from "axios";
// import { useState, useEffect } from "react";
// // import customerForm from "./customerForm";
// import "../../css/Table.css";
// // import { fetchCustomer } from "../../redux/slice/crm/customerSlice";
// import {  useDispatch } from "react-redux"; // Correct import
// import { Link, useNavigate } from "react-router-dom";
// // import customerDelete from "./customerDelete";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";
// // // import { saveAs } from "file-saver";
// // import * as XLSX from "xlsx";

// const CustomerTable = () => {

//   const [customers, setCustomers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [itemsPerPage, setItemsPerPage] = useState(10);
//   // const [totalPages, setTotalPages] = useState(1);
//   // const [searchTerm, setSearchTerm] = useState("");
//   // const [filteredCustomers, setFilteredCustomers] = useState([]);
//   // const [customerToDelete, setCustomerToDelete] = useState(null);
//   // const maxHistoryLength = 100; // Maximum characters to show for history
//   // const maxCustomerPurposeLength = 100;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//     //live search handling
//   //   if (searchTerm) {
//   //     setFilteredCustomers(
//   //       customers.filter((customer) =>
//   //         customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
//   //       )
//   //     );
//   //   } else {
//   //     setFilteredCustomers(customers);
//   //   }
//   // }, [currentPage, itemsPerPage, searchTerm, customers]);

//   // useEffect(() => {
//   //   dispatch(fetchCustomer()); // Fetch customers using the dispatched action
//   // }, [dispatch]);

//   // Helper function to format date as a readable string
//   // const formatDateTime = (dateString) => {
//   //   if (!dateString) return "";
//   //   const options = {
//   //     year: "numeric",
//   //     month: "2-digit",
//   //     day: "2-digit",
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //     second: "2-digit",
//   //     hour12: false,
//   //   };
//   //   return new Intl.DateTimeFormat("en-US", options).format(
//   //     new Date(dateString)
//   //   );
//   // };

//   // Helper function to check if the next follow-up date is tomorrow
//   // const isTomorrow = (dateString) => {
//   //   const now = new Date();
//   //   const tomorrow = new Date(now.setDate(now.getDate() + 1));
//   //   const nextFollowUp = new Date(dateString);
//   //   // Set time to midnight for comparison
//   //   tomorrow.setHours(0, 0, 0, 0);
//   //   nextFollowUp.setHours(0, 0, 0, 0);
//   //   return tomorrow.getTime() === nextFollowUp.getTime();
//   // };

//   // handle in page number
//   // const handlePageChange = (pageNumber) => {
//   //   setCurrentPage(pageNumber);
//   // };

//   // const handleItemsPerPageChange = (event) => {
//   //   setItemsPerPage(Number(event.target.value));
//   //   setCurrentPage(1); // Reset to first page when items per page changes
//   // };
//   // Truncate the history text to maxHistoryLength
//   // const truncateHistory = (history) => {
//   //   if (history && history.length > maxHistoryLength) {
//   //     return history.substring(0, maxHistoryLength) + "..."; // Add ellipsis
//   //   }
//   //   return history;
//   // };
//   //customer purpose
//   // const truncateCustomerPurpose = (customer_purpose) => {
//   //   if (customer_purpose && customer_purpose.length > maxCustomerPurposeLength) {
//   //     return customer_purpose.substring(0, maxCustomerPurposeLength) + "..."; // Add ellipsis
//   //   }
//   //   return customer_purpose;
//   // };
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error loading customers: {error.message}</div>;
//   // }
//   //--- handle searchitem in a table ----
//   // const handleSearchChange = (e) => {
//   //   setSearchTerm(e.target.value);
//   // };
//   //--converting first letter  capital
//   // const formatName = (name) => {
//   //   if (!name) return "";
//   //   return name
//   //     .split(" ")
//   //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//   //     .join(" ");
//   // };

//   // if (isLoading) return <div>Loading...</div>;
//   // if (error) return <div>Error: {error}</div>;
// //   const exportToExcel = () => {
// //     const worksheet = XLSX.utils.json_to_sheet(
// //       customers.map((customer) => ({
// //         ID: customer.id,
// //         Name: customer.customer_name,

// //         category: customer.category_name,
// //        personal_email: customer.cpersonal_email,
// //         organization_name: customer.organization_name,
// //         pri_phone: customer.pri_phone,
// //         sec_phone: customer.sec_phone,
// //         customer_type: customer.customer_type,
// //         work_type: customer.work_type,
// //         company_email: customer.company_email,
// //         work_status: customer.work_status,
// //         designation: customer.designation_name,
// //         gender: customer.gender,
// //         province: customer.province_name,
// //         district: customer.district_name,
// //         municipality: customer.municipality_name,
// //         street_address: customer.street_address,
// //        sec_address: customer.sec_address,
// //         estimated_amount: customer.estimated_amount,
// //         enquiry_purpose: customer.enquiry_purpose,
// //         known_by: customer.known_by,
// //         created: customer.created,
// //         history: customer.history,
// //       }))
// //     );
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
// //     XLSX.writeFile(workbook, "customers.xlsx");
// //   };
// // //   const exportToPDF = () => {
// //     const doc = new jsPDF();
// //     doc.text("customers List", 20, 10);
// //     const tableColumn = ["ID", "Name"];
// //     const tableRows = customers.map((customer) => [
// //       customer.id,
// //     customer.customer_name,
// //  customer.category_name,
// //     customer.cpersonal_email,
// //   customer.organization_name,
// //        customer.pri_phone,
// //       customer.sec_phone,
// //     customer.customer_type,
// //        customer.work_type,
// //       customer.company_email,
// //  customer.work_status,
// //     customer.designation_name,
// // customer.gender,
// //       customer.province_name,
// //       customer.district_name,
// //        customer.municipality_name,
// //        customer.street_address,
// //      customer.sec_address,
// //      customer.estimated_amount,
// //     customer.enquiry_purpose,
// //    customer.known_by,
// //       customer.created,
// //   customer.history,
// //     ]);
// //     autoTable(doc, {
// //       head: [tableColumn],
// //       body: tableRows,
// //       startY: 20,
// //     });
// //     doc.save("customers.pdf");
// //   };
//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Customer List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="/dashboard/customer/create" className="nav-Link btn btn-info">
//                     <h5>Add Customer</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/customer/search/"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div className="input-group-append">
//                         <Link type="submit" className="btn btn-info">
//                           Search
//                         </Link>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         <table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Name</th>
//                               <th>Phone</th>
//                               <th>Email</th>
//                               <th>organization </th>
//                               <th>joining date</th>
//                               <th>street address</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {customers.length > 0 ? (
//                               customers.map((customer) => (
//                                 <tr key={customer.id}>
//                                   <td>{customer.id}</td>
//                                   <td>{customer.customer_name}</td>
//                                   <td>{customer.pri_phone}</td>
//                                   <td>{customer.email}</td>
//                                   <td>{customer.organization}</td>
//                                   <td>{customer.joining_date}</td>
//                                   <td>{customer.street_address}</td>
//                                   <td>
//                                     <Link to ={`/customer/update/${customer.id}`}>
//                                       Edit
//                                     </Link>
//                                     |
//                                     <Link to={`/customer/detail/${customer.id}`}>
//                                       View
//                                     </Link>
//                                     |
//                                     <Link to={`/customer/delete/${customer.id}`}>
//                                       Delete
//                                     </Link>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="8">No customers found</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerTable;

