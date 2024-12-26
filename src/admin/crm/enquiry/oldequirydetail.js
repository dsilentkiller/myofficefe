


// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
// } from "@mui/material";

// const EnquiryDetail = () => {
//   const { id } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();
//   const { currentEnquiry, loading, error } = useSelector((state) => state.enquiries);
//   console.log('current enquiry', currentEnquiry)
//   // const currentEnquiry = useSelector((state) => state.enquiries.currentEnquiry);
//    console.log('Redux state currentEnquiry:', currentEnquiry);

//   // Fetch enquiry on mount or when the id changes
//   useEffect(() => {
//     if (id && !currentEnquiry) {
//       dispatch(fetchEnquiryById(id));
//       console.log('currentEnquiry',currentEnquiry)
//     }
//   }, [id, dispatch, currentEnquiry]);
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error: {error}</div>;
//   // }

//   if (!currentEnquiry || Object.keys(currentEnquiry).length === 0) {
//     return <div>No enquiry found.</div>;
//   }
//   // If loading, show loading spinner
//   if (loading) {
//     return (
//       <div className="content-wrapper">
//         <div className="container" style={{ textAlign: "center" }}>
//           <CircularProgress />
//           <Typography variant="h6">Loading...</Typography>
//         </div>
//       </div>
//     );
//   }

//   // If there's an error, show error message
//   if (error) {
//     return (
//       <div className="content-wrapper">
//         <div className="container" style={{ textAlign: "center" }}>
//           <Typography variant="h6" color="error">Error: {error}</Typography>
//         </div>
//       </div>
//     );
//   }

//   // If enquiry not found, show "No enquiry found" message
//   if (!currentEnquiry || Object.keys(currentEnquiry).length === 0) {
//     return (
//       <div className="content-wrapper">
//         <div className="container" style={{ textAlign: "center" }}>
//           <Typography variant="h6" color="error">No enquiry found.</Typography>
//         </div>
//       </div>
//     );
//   }

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

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         {/* Header Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h4" component="div">
//               Enquiry Details
//             </Typography>
//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullWidth component={Link} to={`/update/${currentEnquiry.id}`}>
//                   Edit Enquiry
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="secondary" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Back to Enquiries
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullWidth component={Link} to={`/dashboard/crm/client`}>
//                   Convert to Client
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="error" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Mark as Lost
//                 </Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* Enquiry Details Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Customer Name:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.customer_name || "N/A"}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Gender:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.gender || "N/A"}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Department:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.department_name || "N/A"}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Designation:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.designation_name || "N/A"}</Typography>
//               </Grid>
//             </Grid>

//             <Typography variant="body1" sx={{ mt: 2 }}>
//               <strong>Enquiry History:</strong> {currentEnquiry.history || "N/A"}
//             </Typography>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default EnquiryDetail;




// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
// } from "@mui/material";

// const EnquiryDetail = () => {
//   const { id } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();
//   const currentEnquiry = useSelector((state) => state.enquiries.currentEnquiry || {});
//   // const error = useSelector((state) => state.enquiries.error);
//   // Ensure enquiry exists
//   if (!currentEnquiry || Object.keys(currentEnquiry).length === 0) {
//     return <div>No enquiry found.</div>;
//   }

//   // Fetch enquiry on mount
//   useEffect(() => {
//     if (id) {
//       console.log("Fetching enquiry by ID:", id);
//       dispatch(fetchEnquiryById(id)) // Fetch enquiry by ID
//         .unwrap()
//         .then((data) => console.log("enquiry fetched:", data))
//         .catch((error) => console.log("Error fetching enquiry:", error));
//     }

//   }, [id, dispatch]);

//   // Ensure enquiry exists
//   if (!currentEnquiry) {
//     return <div>No enquiry found.</div>;
//   }

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

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         {/* Header Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h4" component="div">
//               Enquiry Details
//             </Typography>
//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullWidth component={Link} to={`/update/${currentEnquiry.id}`}>
//                   Edit Enquiry
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="secondary" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Back to Enquiries
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullWidth component={Link} to={`/dashboard/crm/client`}>
//                   Convert to Client
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="error" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Mark as Lost
//                 </Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         Enquiry Details Section
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Customer Name:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.customer_name || "N/A"}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Gender:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.gender || "N/A"}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Department:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.department_name || "N/A"}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Typography variant="body1"><strong>Designation:</strong></Typography>
//                 <Typography variant="body2">{currentEnquiry.designation_name || "N/A"}</Typography>
//               </Grid>
//             </Grid>

            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Category:</strong></Typography>
                <Typography variant="body2">{Enquiry.category_name || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Primary Phone:</strong></Typography>
                <Typography variant="body2">{Enquiry.pri_phone || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Secondary Phone:</strong></Typography>
                <Typography variant="body2">{Enquiry.sec_phone || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Email:</strong></Typography>
                <Typography variant="body2">{Enquiry.email || "N/A"}</Typography>
              </Grid>
            </Grid> */}

            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Province:</strong></Typography>
                <Typography variant="body2">{Enquiry.province_name || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>District:</strong></Typography>
                <Typography variant="body2">{Enquiry.district_name || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Municipality:</strong></Typography>
                <Typography variant="body2">{Enquiry.municipality_name || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Street Address:</strong></Typography>
                <Typography variant="body2">{Enquiry.street_address || "N/A"}</Typography>
              </Grid>
            </Grid> */}

            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Estimated Budget:</strong></Typography>
                <Typography variant="body2">{Enquiry.estimated_amount || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Temporary Address:</strong></Typography>
                <Typography variant="body2">{Enquiry.sec_address || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Enquiry Date:</strong></Typography>
                <Typography variant="body2">{formatDateTime(Enquiry.created)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body1"><strong>Next Follow-up Date:</strong></Typography>
                <Typography variant="body2">{formatDateTime(Enquiry.next_follow_up_date)}</Typography>
              </Grid>
            </Grid> */}

            {/* <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Enquiry History:</strong> {currentEnquiry.history || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnquiryDetail; */}




// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const EnquiryDetail = () => {
//   const { id } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();

//   // Redux states
//   const {
//     Enquiry,
//     loading: enquiryLoading,
//     error: enquiryError,
//   } = useSelector((state) => state.enquiries || {});
//   const {
//     list: follows = [],
//     isLoading: followsLoading,
//     fetchError: followsError,
//   } = useSelector((state) => state.follows || {});

//   // Fetch enquiry and follow-ups on mount
//   useEffect(() => {
//     if (id) {
//       console.log("Dispatching fetchEnquiryById and fetchFollowById with ID:", id);
//       dispatch(fetchEnquiryById(id)); // Fetch enquiry
//       // dispatch(fetchFollowById(id)); // Fetch follow-ups for this enquiry
//     }
//   }, [id, dispatch]);

//   const filteredFollows = follows.filter(
//     (follow) => follow.enquiry_id != null && Number(follow.enquiry_id) === Number(id)
//   );

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
//   if (enquiryLoading || followsLoading) return <div>Loading...</div>;
//   if (enquiryError) return <div>Error: {enquiryError}</div>;
//   if (followsError) return <div>Error: {followsError}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         {/* Header Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h4" component="div">
//               Enquiry Details
//             </Typography>
//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullWidth component={Link} to={`/update/${Enquiry.id}`}>
//                   Edit Enquiry
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="secondary" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Back to Enquiries
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullWidth component={Link} to={`/dashboard/crm/client`}>
//                   Convert to Client
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="error" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Mark as Lost
//                 </Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* Enquiry Details Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Customer Name:</strong> {Enquiry.customer_name}</Typography>
//                 <Typography variant="body1"><strong>Gender:</strong> {Enquiry.gender}</Typography>
//                 <Typography variant="body1"><strong>Department:</strong> {Enquiry.department_name}</Typography>
//                 <Typography variant="body1"><strong>Designation:</strong> {Enquiry.designation_name}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Category:</strong> {Enquiry.category_name}</Typography>
//                 <Typography variant="body1"><strong>Primary Phone:</strong> {Enquiry.pri_phone}</Typography>
//                 <Typography variant="body1"><strong>Secondary Phone:</strong> {Enquiry.sec_phone}</Typography>
//                 <Typography variant="body1"><strong>Email:</strong> {Enquiry.email}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Province:</strong> {Enquiry.province_name}</Typography>
//                 <Typography variant="body1"><strong>District:</strong> {Enquiry.district_name}</Typography>
//                 <Typography variant="body1"><strong>Municipality:</strong> {Enquiry.municipality_name}</Typography>
//                 <Typography variant="body1"><strong>Street Address:</strong> {Enquiry.street_address}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Estimated Budget:</strong> {Enquiry.estimated_amount}</Typography>
//                 <Typography variant="body1"><strong>Temporary Address:</strong> {Enquiry.sec_address}</Typography>
//                 <Typography variant="body1"><strong>Enquiry Date:</strong> {formatDateTime(Enquiry.created)}</Typography>
//                 <Typography variant="body1"><strong>Next Follow-up Date:</strong> {formatDateTime(Enquiry.next_follow_up_date)}</Typography>
//               </Grid>
//             </Grid>
//             <Typography variant="body1" sx={{ mt: 2 }}><strong>Enquiry History:</strong> {Enquiry.history}</Typography>
//           </CardContent>
//         </Card>

        {/* Follow-Up Section */}
        {/* <Card>
          <CardContent>
            <Typography variant="h5">Follow-Ups</Typography>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Button variant="contained" color="info" component={Link} to="/dashboard/crm/follow/create">
                  Add Follow
                </Button>
              </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table aria-label="follow-ups table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Follow By</TableCell>
                    <TableCell>Next Follow-Up</TableCell>
                    <TableCell>Last Follow-Up</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFollows.length > 0 ? (
                    filteredFollows.map((follow, index) => (
                      <TableRow key={follow.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{follow.follow_by}</TableCell>
                        <TableCell>{formatDateTime(follow.due_date)}</TableCell>
                        <TableCell>{formatDateTime(follow.created)}</TableCell>
                        <TableCell>{follow.remark}</TableCell>
                        <TableCell>
                          <Button variant="outlined" color="info" component={Link} to={`/follow/${follow.id}`}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>No follow-ups found for this Enquiry.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card> */}
//       </div>
//     </div>
//   );
// };

// export default EnquiryDetail;






// import { Grid, Box, Typography, TextField, Select, MenuItem, Card, CardContent, Button, InputLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
// import { DatePicker } from '@mui/lab';
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// // import "../../css/enquirydetail.css";
// const EnquiryDetail = () => {
//     const { id } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();

//   // Redux states
//   const {
//     enquiry,
//     loading: enquiryLoading,
//     error: enquiryError,
//   } = useSelector((state) => state.enquiries || {});
//   useEffect(() => {
//     console.log("Current Enquiry from Redux:", enquiry);
//   }, [enquiry]);

//   const {
//     list: follows = [],
//     isLoading: followsLoading,
//     fetchError: followsError,
//   } = useSelector((state) => state.follows || {});

//   // Fetch enquiry and follow-ups on mount
//   useEffect(() => {
//     if (id) {
//       console.log(
//         "Dispatching fetchEnquiryById and fetchFollowById with ID:",
//         id
//       );
//       dispatch(fetchEnquiryById(id)); // Fetch enquiry
//       dispatch(fetchFollowById(id)); // Fetch follow-ups for this enquiry
//     }
//   }, [id, dispatch]);

//   // Filter the follows based on enquiry_id
//   const filteredFollows = follows.filter(
//     (follow) =>
//       follow.enquiry_id != null && Number(follow.enquiry_id) === Number(id)
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

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Enquiry Details
//       </Typography>

//       <Card sx={{ marginBottom: 2 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Customer Details
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Customer Name"
//                 value={Enquiry.customer_name || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Category</InputLabel>
//                 <Select value={Enquiry.category || ''} label="Category" disabled>
//                   {/* Add MenuItems dynamically */}
//                   <MenuItem value="1">Category 1</MenuItem>
//                   <MenuItem value="2">Category 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Organization Name"
//                 value={Enquiry.organization_name || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Department</InputLabel>
//                 <Select value={Enquiry.department || ''} label="Department" disabled>
//                   {/* Add MenuItems dynamically */}
//                   <MenuItem value="1">Department 1</MenuItem>
//                   <MenuItem value="2">Department 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Designation</InputLabel>
//                 <Select value={Enquiry.designation || ''} label="Designation" disabled>
//                   {/* Add MenuItems dynamically */}
//                   <MenuItem value="1">Designation 1</MenuItem>
//                   <MenuItem value="2">Designation 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card sx={{ marginBottom: 2 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Contact Details
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Primary Phone"
//                 value={Enquiry.pri_phone || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Secondary Phone"
//                 value={Enquiry.sec_phone || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 value={Enquiry.email || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl component="fieldset">
//                 <Typography variant="body1">Gender</Typography>
//                 <RadioGroup row value={Enquiry.gender || 'male'} disabled>
//                   <FormControlLabel value="male" control={<Radio />} label="Male" />
//                   <FormControlLabel value="female" control={<Radio />} label="Female" />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card sx={{ marginBottom: 2 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Address Details
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Street Address"
//                 value={Enquiry.street_address || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Secondary Address"
//                 value={Enquiry.sec_address || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Province</InputLabel>
//                 <Select value={Enquiry.province || ''} label="Province" disabled>
//                   <MenuItem value="1">Province 1</MenuItem>
//                   <MenuItem value="2">Province 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>District</InputLabel>
//                 <Select value={Enquiry.district || ''} label="District" disabled>
//                   <MenuItem value="1">District 1</MenuItem>
//                   <MenuItem value="2">District 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Municipality</InputLabel>
//                 <Select value={Enquiry.municipality || ''} label="Municipality" disabled>
//                   <MenuItem value="1">Municipality 1</MenuItem>
//                   <MenuItem value="2">Municipality 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card sx={{ marginBottom: 2 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Enquiry Purpose & Follow-Up
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Estimated Amount"
//                 value={Enquiry.estimated_amount || 0}
//                 variant="outlined"
//                 disabled
//                 type="number"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Enquiry Purpose"
//                 value={Enquiry.enquiry_purpose || ''}
//                 variant="outlined"
//                 multiline
//                 rows={4}
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Known By"
//                 value={Enquiry.known_by || ''}
//                 variant="outlined"
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <DatePicker
//                 label="Next Follow-Up Date"
//                 value={Enquiry.next_follow_up_date || null}
//                 onChange={() => {}}
//                 renderInput={(props) => <TextField {...props} fullWidth />}
//                 disabled
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             History
//           </Typography>
//           <TextField
//             fullWidth
//             label="History"
//             value={Enquiry.history || ''}
//             variant="outlined"
//             multiline
//             rows={4}
//             disabled
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default EnquiryDetail;




// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// import "../../css/enquirydetail.css";

// const EnquiryDetail = () => {
//   const { id } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();

//   // Redux states
//   const {
//     enquiry,
//     loading: enquiryLoading,
//     error: enquiryError,
//   } = useSelector((state) => state.enquiries || {});
//   useEffect(() => {
//     console.log("Current Enquiry from Redux:", enquiry);
//   }, [enquiry]);

//   const {
//     list: follows = [],
//     isLoading: followsLoading,
//     fetchError: followsError,
//   } = useSelector((state) => state.follows || {});

//   // Fetch enquiry and follow-ups on mount
//   useEffect(() => {
//     if (id) {
//       console.log(
//         "Dispatching fetchEnquiryById and fetchFollowById with ID:",
//         id
//       );
//       dispatch(fetchEnquiryById(id)); // Fetch enquiry
//       dispatch(fetchFollowById(id)); // Fetch follow-ups for this enquiry
//     }
//   }, [id, dispatch]);

//   // Filter the follows based on enquiry_id
//   const filteredFollows = follows.filter(
//     (follow) =>
//       follow.enquiry_id != null && Number(follow.enquiry_id) === Number(id)
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
//   if (enquiryLoading || followsLoading) return <div>Loading...</div>;
//   if (enquiryError) return <div>Error: {enquiryError}</div>;
//   if (followsError) return <div>Error: {followsError}</div>;

//   // Make sure enquiry is loaded before trying to access its properties
//   if (!enquiry) {
//     console.log(
//       "Enquiry data is not available, enquiry:",
//       enquiry
//     );
//     return <div>No enquiry found.</div>;
//   }
//   return (
//     <div className="content-wrapper ">
//       <div className="row justify-content-center">
//         <div className="container-fluid">
//           <div className="card-header text-black">
//             <h4 className="card-title">Enquiry Details</h4>
            // <div className="row left mt-4">
            //   <div className="col-md-12 text-center">
            //     <Link
            //       to={`/update/${Enquiry.id}`}
            //       className="btn btn-primary"
            //     >
            //       Edit Enquiry
            //     </Link>
            //     <Link
            //       to={`/dashboard/crm/enquiry`}
            //       className="btn btn-secondary ml-2"
            //     >
            //       Back to Enquiries
            //     </Link>
            //     <Link
            //       to={`/dashboard/crm/client`}
            //       className="btn btn-primary ml-2"
            //     >
            //       Convert to client
            //     </Link>
            //     <Link
            //       to={`/dashboard/crm/enquiry`}
            //       className="btn btn-danger ml-2"
            //     >
            //       Mark as lost
            //     </Link>
            //   </div>
//             </div>
//           </div>

//           {/* First Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Customer Name:</strong> {Enquiry.customer_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Gender:</strong> {Enquiry.gender}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Department:</strong> {Enquiry.department_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Designation:</strong> {Enquiry.designation_name}
//               </p>
//             </div>
//           </div>

//           {/* Second Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Category:</strong> {Enquiry.category_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Primary Phone:</strong> {Enquiry.pri_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Secondary Phone:</strong> {Enquiry.sec_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Email:</strong> {Enquiry.email}
//               </p>
//             </div>
//           </div>

//           {/* Third Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Province:</strong> {Enquiry.province_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>District:</strong> {Enquiry.district_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Municipality:</strong>{" "}
//                 {Enquiry.municipality_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Street Address:</strong> {Enquiry.street_address}
//               </p>
//             </div>
//           </div>

//           {/* Fifth Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Estimated Budget:</strong>{" "}
//                 {Enquiry.estimated_amount}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Temporary Address:</strong> {Enquiry.sec_address}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Enquiry Date:</strong>{" "}
//                 {formatDateTime(Enquiry.created)}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Next Follow-up Date:</strong>{" "}
//                 {formatDateTime(Enquiry.next_follow_up_date)}
//               </p>
//             </div>
//           </div>

//           {/* Sixth Column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Enquiry History:</strong>
//               </p>
//               <p>{Enquiry.history}</p>
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
//                     <td colSpan="6">No follow-ups found for this Enquiry.</td>
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

// export default EnquiryDetail;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// import "../../css/enquirydetail.css";

// const EnquiryDetail = () => {
//   const { id } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();

//   // Redux states
//   const {
//     Enquiry,
//     loading: enquiryLoading,
//     error: enquiryError,
//   } = useSelector((state) => state.enquiries || {});
//   const {
//     list: follows = [],
//     isLoading: followsLoading,
//     fetchError: followsError,
//   } = useSelector((state) => state.follows || {});

//   // // Fetch enquiry and follow-ups on mount
//   useEffect(() => {
//     if (id) {
//       console.log(
//         "Dispatching fetchEnquiryById and fetchFollowById with ID:",
//         id
//       );
//       dispatch(fetchEnquiryById(id)); // Fetch enquiry
//       dispatch(fetchFollowById(id)); // Fetch follow-ups for this enquiry
//     }
//   }, [id, dispatch]);

//   const filteredFollows = follows.filter(
//     (follow) =>
//       follow.enquiry_id != null && Number(follow.enquiry_id) === Number(id)
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
//   if (enquiryLoading || followsLoading) return <div>Loading...</div>;
//   if (enquiryError) return <div>Error: {enquiryError}</div>;
//   if (followsError) return <div>Error: {followsError}</div>;

//   // if (!enquiry) return <div>No enquiry found.</div>;

//   return (
//     <div className="content-wrapper ">
//       <div className="row justify-content-center">
//         <div className="container-fluid">
//           <div className="card-header  text-black">
//             <h4 className="card-title">Enquiry Details</h4>
//             <div className="row left mt-4">
//               <div className="col-md-12 text-center">
//                 <Link
//                   to={`/update/${Enquiry.id}`}
//                   className="btn btn-primary"
//                 >
//                   Edit Enquiry
//                 </Link>
//                 <Link
//                   to={`/dashboard/crm/enquiry`}
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
//                   to={`/dashboard/crm//enquiry`}
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
//                 <strong>Customer Name:</strong> {Enquiry.customer_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Gender:</strong> {Enquiry.gender}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Department:</strong> {Enquiry.department_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Designation:</strong> {Enquiry.designation_name}
//               </p>
//             </div>
//           </div>

//           {/* Second Column */}

//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Category:</strong> {Enquiry.category_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Primary Phone:</strong> {Enquiry.pri_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Secondary Phone:</strong> {Enquiry.sec_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Email:</strong> {Enquiry.email}
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
//                 <strong>Province:</strong> {Enquiry.province_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>District:</strong> {Enquiry.district_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Municipality:</strong>{" "}
//                 {Enquiry.municipality_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>street address:</strong> {Enquiry.street_address}
//               </p>
//             </div>
//           </div>
//           {/* fifth column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Estimated Budget:</strong>{" "}
//                 {Enquiry.estimated_amount}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>temporary address:</strong> {Enquiry.sec_address}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Enquiry Date:</strong>{" "}
//                 {formatDateTime(Enquiry.created)}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Next Follow-up Date:</strong>{" "}
//                 {formatDateTime(Enquiry.next_follow_up_date)}
//               </p>
//             </div>
//           </div>
//           {/* sixth column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Enquiry History:</strong>
//               </p>
//               <p>{Enquiry.history}</p>
//             </div>
//           </div>
//         </div>

//         {/* Enquiry History */}

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
//                   <td colSpan="6">No follow-ups found for this Enquiry.</td>
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

// export default EnquiryDetail;
