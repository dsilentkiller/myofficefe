import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Paper, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchCustomerById } from "../../redux/slice/customer/customerSlice"; // Assuming you have a slice for customer
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CustomerDetail = () => {
  const { id } = useParams(); // Fetch the customer ID from the URL
  const dispatch = useDispatch();
  
  // State to hold customer data
  const [customerData, setCustomerData] = useState(null);
  
  // Redux selector to get customer data
  const customer = useSelector((state) => state.customers.customerToView);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id))
        .unwrap()
        .then((data) => setCustomerData(data))
        .catch((error) => toast.error(`Failed to fetch customer details: ${error.message}`));
    }
  }, [id, dispatch]);

  if (!customerData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>
      
      <Paper sx={{ padding: 3, marginBottom: 2 }}>
        <Grid container spacing={3}>
          {/* Profile Image */}
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              src={customerData.image || "/default-image.jpg"}
              alt={customerData.customer_name}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>

          {/* Customer Info */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              {customerData.customer_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {customerData.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {customerData.pri_phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Secondary Phone:</strong> {customerData.sec_phone || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* General Info */}
      <Paper sx={{ padding: 3, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Customer Type:</strong> {customerData.customer_type}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Category:</strong> {customerData.category ? customerData.category.name : "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Work Status:</strong> {customerData.work_status}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Joining Date:</strong> {new Date(customerData.joining_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>History:</strong> {customerData.history || "N/A"}
        </Typography>
      </Paper>

      {/* Personal Details */}
      <Paper sx={{ padding: 3, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Personal Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Gender:</strong> {customerData.gender}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Organization:</strong> {customerData.organization_name || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Department:</strong> {customerData.department ? customerData.department.name : "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Designation:</strong> {customerData.designation ? customerData.designation.name : "N/A"}
        </Typography>
      </Paper>

      {/* Address Info */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Address Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Province:</strong> {customerData.province ? customerData.province.name : "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>District:</strong> {customerData.district ? customerData.district.name : "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Municipality:</strong> {customerData.municipality ? customerData.municipality.name : "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Street Address:</strong> {customerData.street_address || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Secondary Address:</strong> {customerData.sec_address || "N/A"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CustomerDetail;

//###########2 nd page
// import React from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
// } from '@mui/material';

// const CustomerDetail = () => {
//   return (
//     <div className='content-wrapper'>
//     <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ marginBottom: '1.5rem', color: '#3f51b5', fontWeight: 'bold' }}>
//         Customer Details
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Contact Information */}
//         <Grid item xs={12} md={6}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Contact Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Customer Name" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth select label="Customer Type" variant="outlined">
//                     <MenuItem value="Individual">Individual</MenuItem>
//                     <MenuItem value="Business">Business</MenuItem>
//                     <MenuItem value="permanent">permanent</MenuItem>
//                     <MenuItem value="temporary">temporary</MenuItem>
//                     <MenuItem value="contract">contract</MenuItem>
//                     <MenuItem value="saas">saas</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Primary Phone" variant="outlined" />
//                   {/* <PhoneInput
//                           country={"np"} // Country code for Nepal
//                           value={formData.pri_phone}
//                           onChange={validatePhoneNumber}
//                           inputStyle={{
//                             width: "100%",
//                             borderColor: phoneValid ? "green" : "red",
//                             backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                           }}
//                         />
//                         {!phoneValid && (
//                           <p style={{ color: "red" }}>
//                             Please enter a valid phone number between 10 and 15
//                             digits.
//                           </p>
//                         )}
//                          </div>
//                       {/* </div> */}
//                       {/* {errors.pri_phone && <p>{errors.pri_phone}</p>}
//                     </div> */} 
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Secondary Phone" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Email" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth select label="Gender" variant="outlined">
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Work Information */}
//         <Grid item xs={12} md={6}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Work Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Organization Name" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Category" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Department" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Designation" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Joining Date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Estimated Budget" variant="outlined" />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Address Information */}
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Address Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="Province" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="District" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="Municipality" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Street Address" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Secondary Address" variant="outlined" />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Additional Information */}
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Additional Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth select label="Work Status" variant="outlined">
//                     <MenuItem value="Active">Active</MenuItem>
//                     <MenuItem value="Inactive">Inactive</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="History" variant="outlined" multiline rows={4} />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Actions */}
//       <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
//         <Button variant="contained" color="primary" sx={{ marginRight: '1rem' }}>
//           Save
//         </Button>
//         <Button variant="outlined" color="secondary">
//           Cancel
//         </Button>
//       </Box>
//     </Box>
//     </div>
//   );
// };

// export default CustomerDetail;


//#############first page
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCustomerById } from "../../redux/slice/customer/customerSlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// // import "../../css/Customerdetail.css";

// const CustomerDetail = () => {
//   const { id } = useParams(); // Customer ID from URL
//   const dispatch = useDispatch();

//   // Redux states
//   const {
//     currentCustomer,
//     loading: CustomerLoading,
//     error: CustomerError,
//   } = useSelector((state) => state.enquiries || {});
//   const {
//     list: follows = [],
//     isLoading: followsLoading,
//     fetchError: followsError,
//   } = useSelector((state) => state.follows || {});

//   // Fetch Customer and follow-ups on mount
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchCustomerById(id)); // Fetch Customer
//       dispatch(fetchFollowById(id)); // Fetch follow-ups for this Customer
//       console.log("Fetching Customer and follow-ups for ID:", id);
//     }
//   }, [id, dispatch]);
//   //checking data
//   console.log("Follows Data:", follows);
//   console.log("Current Customer ID:", id);

//   // this is for string
//   // Updated filter logic
//   const filteredFollows = follows.filter(
//     (follow) => String(follow.Customer_id) === id
//   );
//   console.log("Filtered Follows:", filteredFollows);

//   // this is for number
//   // const filteredFollows = follows.filter(
//   //   (follow) => follow.Customer_id === Number(id)
//   // );

//   // Filter follows directly in the component render
//   // const filteredFollows = follows.filter(
//   //   (follow) =>
//   //     follow.Customer_id === Number(id) || follow.Customer === Number(id)
//   // );

//   // Helper function to format date as readable string
//   const formatDateTime = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     }).format(new Date(dateString));
//   };

//   // Loading and error handling
//   if (CustomerLoading || followsLoading) return <div>Loading...</div>;
//   if (CustomerError) return <div>Error: {CustomerError}</div>;
//   if (followsError) return <div>Error: {followsError}</div>;

//   if (!currentCustomer) return <div>No Customer found.</div>;

//   return (
//     <div className="content-wrapper ">
//       <div className="row justify-content-center">
//         <div className="container-fluid">
//           <div className="card-header  text-black">
//             <h4 className="card-title">Customer Details</h4>
//             <div className="row left mt-4">
//               <div className="col-md-12 text-center">
//                 <Link
//                   to={`/update/${currentCustomer.id}`}
//                   className="btn btn-primary"
//                 >
//                   Edit Customer
//                 </Link>
//                 <Link
//                   to={`/dashboard/crm/Customer`}
//                   className="btn btn-secondary ml-2"
//                 >
//                   Back to Enquiries
//                 </Link>
//                 <Link
//                   to={`/dashboard/crm/client`}
//                   className="btn btn-primary ml-2"
//                 >
//                   convert to client
//                 </Link>
//                 <Link
//                   to={`/dashboard/crm//Customer`}
//                   className="btn btn-danger ml-2"
//                 >
//                   Mark as lost
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* First Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Customer Name:</strong> {currentCustomer.customer_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Gender:</strong> {currentCustomer.gender}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Department:</strong> {currentCustomer.department_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Designation:</strong> {currentCustomer.designation_name}
//               </p>
//             </div>
//           </div>

//           {/* Second Column */}

//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Category:</strong> {currentCustomer.category_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Primary Phone:</strong> {currentCustomer.pri_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Secondary Phone:</strong> {currentCustomer.sec_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Email:</strong> {currentCustomer.email}
//               </p>
//             </div>
//           </div>
//           {/* third column */}
//           {/* <div className="row">



//           </div> */}

//           {/* fourth Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Province:</strong> {currentCustomer.province_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>District:</strong> {currentCustomer.district_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Municipality:</strong>{" "}
//                 {currentCustomer.municipality_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>street address:</strong> {currentCustomer.street_address}
//               </p>
//             </div>
//           </div>
//           {/* fifth column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Estimated Budget:</strong>{" "}
//                 {currentCustomer.estimated_amount}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>temporary address:</strong> {currentCustomer.sec_address}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Customer Date:</strong>{" "}
//                 {formatDateTime(currentCustomer.created)}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Next Follow-up Date:</strong>{" "}
//                 {formatDateTime(currentCustomer.next_follow_up_date)}
//               </p>
//             </div>
//           </div>
//           {/* sixth column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Customer History:</strong>
//               </p>
//               <p>{currentCustomer.history}</p>
//             </div>
//           </div>
//         </div>

//         {/* Customer History */}

//         {/* Action Buttons */}
//       </div>
//       {/* Follow Table */}
//       <div className="card mt-4">
//         <div className="card-header">
//           <h4 className="card-title">Follow-Ups</h4>
//           <div className="navbar-nav ml-auto">
//             <Link to="/dashboard/crm/follow/create">
//               <h5 className=" btn btn-info"> Add Follow </h5>
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 {/* <th> name</th> */}
//                 <th>Follow By</th>
//                 <th>Next Follow-Up</th>
//                 <th>Last Follow-Up</th>
//                 <th>Remark</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredFollows.length > 0 ? (
//                 filteredFollows.map((follow, index) => (
//                   <tr key={follow.id}>
//                     <td>{index + 1}</td>
//                     {/* <td>name</td> */}
//                     <td>{follow.follow_by}</td>
//                     <td>{formatDateTime(follow.due_date)}</td>
//                     <td>{formatDateTime(follow.created)}</td>
//                     <td>{follow.remark}</td>
//                     {/* <td>Add Edit/View/Delete actions</td> */}
//                     {/* Add action buttons */}
//                     <Link
//                       to={`/follow/${follow.id}`}
//                       className="btn btn-info btn-sm"
//                     >
//                       View
//                     </Link>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6">
//                     No follow-ups found for this currentCustomer.
//                   </td>
//                 </tr>
//               )}
//               {/* <button onClick={handleConvertToLead}>Convert to Lead</button> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchcustomerById } from "../../redux/slice/crm/customerSlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// import "../../css/customerdetail.css";

// const CustomerDetail = () => {
//   const { id } = useParams(); // customer ID from URL
//   const dispatch = useDispatch();

//   // Redux states
//   const {
//     currentCustomer,
//     loading: customerLoading,
//     error: customerError,
//   } = useSelector((state) => state.enquiries || {});
//   useEffect(() => {
//     console.log("Current customer from Redux:", currentCustomer);
//   }, [currentCustomer]);

//   const {
//     list: follows = [],
//     isLoading: followsLoading,
//     fetchError: followsError,
//   } = useSelector((state) => state.follows || {});

//   // Fetch customer and follow-ups on mount
//   useEffect(() => {
//     if (id) {
//       console.log(
//         "Dispatching fetchcustomerById and fetchFollowById with ID:",
//         id
//       );
//       dispatch(fetchcustomerById(id)); // Fetch customer
//       dispatch(fetchFollowById(id)); // Fetch follow-ups for this customer
//     }
//   }, [id, dispatch]);

//   // Filter the follows based on customer_id
//   const filteredFollows = follows.filter(
//     (follow) =>
//       follow.customer_id != null && Number(follow.customer_id) === Number(id)
//   );
//   console.log("Filtered Follows:", filteredFollows);

//   // Helper function to format date as readable string
//   const formatDateTime = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     }).format(new Date(dateString));
//   };

//   // Loading and error handling
//   if (customerLoading || followsLoading) return <div>Loading...</div>;
//   if (customerError) return <div>Error: {customerError}</div>;
//   if (followsError) return <div>Error: {followsError}</div>;

//   // Make sure currentCustomer is loaded before trying to access its properties
//   if (!currentCustomer) {
//     console.log(
//       "customer data is not available, currentCustomer:",
//       currentCustomer
//     );
//     return <div>No customer found.</div>;
//   }
//   return (
//     <div className="content-wrapper ">
//       <div className="row justify-content-center">
//         <div className="container-fluid">
//           <div className="card-header text-black">
//             <h4 className="card-title">customer Details</h4>
//             <div className="row left mt-4">
//               <div className="col-md-12 text-center">
//                 <Link
//                   to={`/update/${currentCustomer.id}`}
//                   className="btn btn-primary"
//                 >
//                   Edit customer
//                 </Link>
//                 <Link
//                   to={`/dashboard/crm/customer`}
//                   className="btn btn-secondary ml-2"
//                 >
//                   Back to customers
//                 </Link>
//                 {/* <Link
//                   to={`/dashboard/crm/client`}
//                   className="btn btn-primary ml-2"
//                 >
//                   Convert to client
//                 </Link> */}
//                 <Link
//                   to={`/dashboard/crm/customer`}
//                   className="btn btn-danger ml-2"
//                 >
//                   Mark as lost
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* First Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Customer Name:</strong> {currentCustomer.customer_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Gender:</strong> {currentCustomer.gender}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Department:</strong> {currentCustomer.department_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Designation:</strong> {currentCustomer.designation_name}
//               </p>
//             </div>
//           </div>

//           {/* Second Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Category:</strong> {currentCustomer.category_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Primary Phone:</strong> {currentCustomer.pri_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Secondary Phone:</strong> {currentCustomer.sec_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Email:</strong> {currentCustomer.email}
//               </p>
//             </div>
//           </div>

//           {/* Third Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Province:</strong> {currentCustomer.province_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>District:</strong> {currentCustomer.district_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Municipality:</strong>{" "}
//                 {currentCustomer.municipality_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Street Address:</strong>{" "}
//                 {currentCustomer.street_address}
//               </p>
//             </div>
//           </div>

//           {/* Fifth Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Estimated Budget:</strong>{" "}
//                 {currentCustomer.estimated_amount}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Temporary Address:</strong>{" "}
//                 {currentCustomer.sec_address}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>customer Date:</strong>{" "}
//                 {formatDateTime(currentCustomer.created)}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Next Follow-up Date:</strong>{" "}
//                 {formatDateTime(currentCustomer.next_follow_up_date)}
//               </p>
//             </div>
//           </div>

//           {/* Sixth Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>customer History:</strong>
//               </p>
//               <p>{currentCustomer.history}</p>
//             </div>
//           </div>
//         </div>

//         {/* Follow Table */}
//         <div className="card mt-4">
//           <div className="card-header">
//             <h4 className="card-title">Follow-Ups</h4>
//             <div className="navbar-nav ml-auto">
//               <Link to="/dashboard/crm/follow/create">
//                 <h5 className=" btn btn-info"> Add Follow </h5>
//               </Link>
//             </div>
//           </div>
//           <div className="card-body">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Follow By</th>
//                   <th>Next Follow-Up</th>
//                   <th>Last Follow-Up</th>
//                   <th>Remark</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredFollows.length > 0 ? (
//                   filteredFollows.map((follow, index) => (
//                     <tr key={follow.id}>
//                       <td>{index + 1}</td>
//                       <td>{follow.follow_by}</td>
//                       <td>{formatDateTime(follow.due_date)}</td>
//                       <td>{formatDateTime(follow.created)}</td>
//                       <td>{follow.remark}</td>
//                       <Link
//                         to={`/follow/${follow.id}`}
//                         className="btn btn-info btn-sm"
//                       >
//                         View
//                       </Link>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6">No follow-ups found for this customer.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;
