
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryById, convertToCustomer, updateEnquiryStatus } from "../../redux/slice/crm/enquirySlice";
import {FollowupByEnquiryId,fetchFollows} from "../../redux/slice/crm/followSlice";
import { toast } from "react-toastify";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs, Tab
} from "@mui/material";
import FollowTable from "../followup/FollowupTable";
import MeetingUpdateTable from "../../crm/meetingupdate/MeetingUpdateTable";
import FilterFollowTable from "../table/FilterFollowTable";
// import FollowupTable from ".."
// import {MeetingUpdateTable} from "../../crm/meetingupdate/MeetingUpdateTable"
// import { fetchMeetingUpdates } from "../../redux/slice/crm/meetingUpdateSlice";

const EnquiryDetail = () => {
  // const { enquiryId } = useParams(); // Enquiry ID from URL
  // const { enquiryId } = useParams(); // Enquiry ID from URL
  const { id: enquiryId } = useParams(); // Rename enquiryId to enquiryId

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0); // Track active tab
    const [filteredFollows, setFilteredFollows] = useState([]);

  const { selectedEnquiry, loading, error } = useSelector((state) => state.enquiries);
  // const { follows } = useSelector((state) => state.follows.list || { follows: [] });
  // console.log('follows',follows)
  const { list: follows = [], isLoading, deleteError } = useSelector((state) => state.follows || {}); // call all follos data
  const filtered = follows.filter(follow => Number(follow.enquiry_id) === Number(enquiryId));
  console.log('filtered1',filtered)



  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    dispatch(fetchFollows()).then(() => {
      console.log("Follow-ups fetched successfully.");
    });
  }, [dispatch]);

  useEffect(() => {
    if (follows.length > 0 && enquiryId) {
      const filtered = follows.filter(follow => {
        return Number(follow.enquiry_id) === Number(enquiryId); // Ensure this is correct
      });

       // Update the filteredFollows state
    setFilteredFollows(filtered);
      console.log("Filtered Follows:", filtered); // You are already doing this
    }
  }, [follows, enquiryId]);

  // useEffect(() => {
  //   console.log("Fetched Follows:", follows);
  //   console.log("Enquiry ID from URL:", enquiryId);

  //   if (follows.length > 0 && enquiryId) {
  //     const filtered = follows.filter(follow => {
  //       console.log(`Checking follow-up with enquiry_id: ${follow.enquiry_id}`);
  //       return Number(follow.enquiry_id) === Number(enquiryId); // Convert both to numbers
  //     });

  //     console.log("Filtered Follows:", filtered);
  //     setFilteredFollows(filtered);
  //   }
  // }, [follows, enquiryId]);


  useEffect(() => {
    if (enquiryId) {
       dispatch(fetchFollows());
      // Dispatch actions only if 'enquiryId' (enquiryId) is available
      dispatch(fetchEnquiryById(enquiryId));  // Fetch enquiry details
      console.log('Dispatching FollowupByEnquiryId with enquiryId:', enquiryId);
      dispatch(FollowupByEnquiryId(enquiryId));  // Fetch follow-ups for this enquiry

      console.log('Dispatching FollowupByEnquiryId with enquiryId:', enquiryId);

    }
  }, [enquiryId, dispatch]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!selectedEnquiry) {
    return <div>No enquiry found. Please try again.</div>;
  }

  const formatDateTime = (dateNumber) => {
    if (!dateNumber) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateNumber));
  };

  const handleMarkAsLost = () => {
    if (selectedEnquiry && selectedEnquiry.enquiryId) {
      dispatch(updateEnquiryStatus({ enquiryId: selectedEnquiry.enquiryId, status: "lost" }))
        .then(() => {
          toast.success("Enquiry marked as lost!");
          navigate("/dashboard/crm/enquiry/lost-enquiry/");
        })
        .catch(() => {
          toast.error("Failed to mark the enquiry as lost. Please try again.");
        });
    }
  };

  const handleConvertToClient = () => {
    if (selectedEnquiry && selectedEnquiry.enquiryId) {
      dispatch(updateEnquiryStatus({ enquiryId: selectedEnquiry.enquiryId, status: "client" }))
        .then(() => {
          dispatch(convertToCustomer(selectedEnquiry.enquiryId))
            .then(() => {
              toast.success("Customer successfully converted!");
              navigate("/dashboard/customer/customer-list");
            })
            .catch(() => {
              toast.error("Error converting enquiry to customer. Please try again.");
            });
        })
        .catch(() => {
          toast.error("Error updating enquiry status. Please try again.");
        });
    }
  };



  console.log('88888',selectedEnquiry)
  console.log('hhhhh',follows)

  return (
    <div className="content-wrapper">
      <div className="container-fluenquiryId">
        {/* Header Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              Enquiry Details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={3}>
                <Button variant="contained" color="primary" fullwidth component={Link} to={`/update/${selectedEnquiry.enquiryId}`}>
                  Edit Enquiry
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" color="secondary" fullwidth component={Link} to={`/dashboard/crm/enquiry`}>
                  Back to Enquiries
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="contained" color="primary" fullwidth onClick={handleConvertToClient}>
                  Convert to Client
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" color="error" fullwidth onClick={handleMarkAsLost}>
                  Mark as Lost
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Enquiry Details Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Customer Name:</strong> {selectedEnquiry.customer_name}</Typography>
                <Typography variant="body1"><strong>Gender:</strong> {selectedEnquiry.gender}</Typography>
                <Typography variant="body1"><strong>Department:</strong> {selectedEnquiry.department_name}</Typography>
                <Typography variant="body1"><strong>Designation:</strong> {selectedEnquiry.designation_name}</Typography>
                <Typography variant="body1"><strong>Enquiry History:</strong> {selectedEnquiry.history}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Category:</strong> {selectedEnquiry.category_name}</Typography>
                <Typography variant="body1"><strong>Primary Phone:</strong> {selectedEnquiry.pri_phone}</Typography>
                <Typography variant="body1"><strong>Secondary Phone:</strong> {selectedEnquiry.sec_phone}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {selectedEnquiry.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Province:</strong> {selectedEnquiry.province_name}</Typography>
                <Typography variant="body1"><strong>District:</strong> {selectedEnquiry.district_name}</Typography>
                <Typography variant="body1"><strong>Municipality:</strong> {selectedEnquiry.municipality_name}</Typography>
                <Typography variant="body1"><strong>Street Address:</strong> {selectedEnquiry.street_address}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Estimated Budget:</strong> {selectedEnquiry.estimated_amount}</Typography>
                <Typography variant="body1"><strong>Temporary Address:</strong> {selectedEnquiry.sec_address}</Typography>
                <Typography variant="body1"><strong>Enquiry Date:</strong> {formatDateTime(selectedEnquiry.created)}</Typography>
                <Typography variant="body1"><strong>Next Follow-up Date:</strong> {formatDateTime(selectedEnquiry.next_follow_up_date)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="Follow-up" />
              <Tab label="Meeting Update" />
              <Tab label="Event" />
            </Tabs>
          </CardContent>
        </Card>

        {/* Tab Content */}
        {tabIndex === 0 && (
    <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h5">Follow-up Details</Typography>

      {/* Debugging: Show all follow-ups */}
      <Typography variant="body2">Total Follow-ups: {follows.length}</Typography>
      <Typography variant="body2">Filtered Follow-ups: {filteredFollows.length}</Typography>
      <Typography variant="body2">Enquiry ID: {enquiryId}</Typography>

      {/* Debugging: Log the follows and filteredFollows */}
      {console.log("All Follows1:", follows)}
      {console.log("Filtered Follows1:", filteredFollows)}

      {filteredFollows.length > 0 ? (
        <FilterFollowTable follows={follows} />
      ) : (
        <Typography>No follow-ups available.</Typography>
      )}
    </CardContent>
  </Card>
        )}



        {tabIndex === 1 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5">Meeting Update</Typography>
              <MeetingUpdateTable enquiryId={enquiryId} />
            </CardContent>
          </Card>
        )}

        {/* {tabIndex === 2 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5">Event Details</Typography>
              <EventTable enquiryId={enquiryId} />
            </CardContent>
          </Card>
        )} */}
      </div>


         {/* Render Follow-up Table */}
         {/* {filteredFollows.length > 0 ? (
  <FollowTable followups={filteredFollows} />
) : (
  <p>No follow-ups available for this enquiry.</p>
)}
🔹 This ensures that Follow */}
</div>


  );
};

export default EnquiryDetail;




  {/* Render Follow-up Table for additional follow-ups */}
        {/* <FollowTable enquiryId={selectedEnquiry.enquiryId} follows={filteredFollows} /> */}
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEnquiryById,convertToCustomer} from "../../redux/slice/crm/enquirySlice";
// import {removeEnquiryFromList} from "../../redux/slice/crm/enquirySlice"
// // import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// import { fetchCustomers, createCustomer} from "../../redux/slice/customer/customerSlice";
// import FollowTable from "../followup/FollowupTable";
// import { updateEnquiryStatus } from "../../redux/slice/crm/enquirySlice";  // Assuming updateEnquiryStatus is the correct action
// import MeetingUpdateTable from "../meetingupdate/MeetingUpdateTable";
// import { FollowupByEnquiryId } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
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
//   const { enquiryId } = useParams(); // Enquiry ID from URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();  // To handle navigation

//   const { selectedEnquiry, loading, error } = useSelector((state) => state.enquiries);
//   const{conversionStatus,conversionError,message} =useSelector((state)=>state.customers)
// // In EnquiryDetail.js
// const { follows } = useSelector((state) => state.followups || { follows: [] });  // Default to empty array if undefined

//   // dispatch(convertToCustomer(selectedEnquiry.enquiryId)).then((customer) => {
//   //   console.log('Converted to customer:', customer);  // Log this
//   //   dispatch(removeEnquiryFromList({ enquiryId: selectedEnquiry.enquiryId }));
//   // });


//   console.log("Selected Enquiry from Redux:", selectedEnquiry);
//   // Fetch enquiry and follow-ups on mount
//   useEffect(() => {
//     if (enquiryId) {
//       // dispatch(lostEnquiries)
//       dispatch(fetchEnquiryById(enquiryId)); // Fetch enquiry
//       dispatch(FollowupByEnquiryId(enquiryId)); // Fetch follow-ups for this enquiry
//       // console.log("Fetching follow-ups for Enquiry ID:", enquiryId);

//     }
//   }, [enquiryId, dispatch]);
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{`Error: ${error}`}</div>;
//   }


//   if (!selectedEnquiry) {
//     return <div>No enquiry found. Please try again.</div>;
//   }

//   // Helper function to format date as readable string
//   const formatDateTime = (dateNumber) => {
//     if (!dateNumber) return "N/A";
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     }).format(new Date(dateNumber));
//   };


// const handleMarkAsLost = () => {
//   if (selectedEnquiry && selectedEnquiry.enquiryId) {
//     dispatch(updateEnquiryStatus({ enquiryId: selectedEnquiry.enquiryId, status: "lost" }))
//       .then(() => {
//         // Navigate to the Lost Enquiries page after marking as lost
//         toast.success("Enquiry marked as lost!");
//         navigate("/dashboard/crm/enquiry/lost-enquiry/");  // Navigate to Lost Enquiries page
//       })
//       .catch((error) => {
//         toast.error("Failed to mark the enquiry as lost. Please try again.");
//       });
//   }
// };

// //  // Sample function to mark an enquiry as lost
// //  const handleMarkAsLost = (enquiryId) => {
// //   const updatedEnquiries = enquiries.map((enquiry) =>
// //     enquiry.enquiryId === enquiryId ? { ...enquiry, status: "Lost" } : enquiry
// //   );

// //   // Update enquiries state
// //   setEnquiries(updatedEnquiries);

// //   // Filter lost enquiries and update filteredEnquiries
// //   const updatedLostEnquiries = updatedEnquiries.filter(
// //     (enquiry) => enquiry.status === "Lost"
// //   );
// //   setLostEnquiries(updatedLostEnquiries);

// //   // If you want the filteredEnquiries to show only lost enquiries, you can update it here
// //   setFilteredEnquiries(updatedLostEnquiries);
// // };



//   const handleConvertToClient = () => {
//     if (selectedEnquiry && selectedEnquiry.enquiryId) {
//       // First, update the enquiry status to 'client'
//       dispatch(updateEnquiryStatus({ enquiryId: selectedEnquiry.enquiryId, status: "client" }))
//         .then(() => {
//           // Then convert the enquiry to customer
//           dispatch(convertToCustomer(selectedEnquiry.enquiryId))
//             .then(() => {
//               // Show success toast and navigate to customer list
//               toast.success("Customer successfully converted!", {
//                 autoClose: 2000,
//               });
//               navigate("/dashboard/customer/customer-list");
//             })
//             .catch((error) => {
//               toast.error("Error converting enquiry to customer. Please try again.", {
//                 autoClose: 2000,
//               });
//             });
//         })
//         .catch((error) => {
//           toast.error("Error updating enquiry status. Please try again.", {
//             position: toast.POSITION.TOP_RIGHT,
//             autoClose: 3000,
//           });
//         });
//     }
//   };


//   return (
//     <div className="content-wrapper">
//       <div className="container-fluenquiryId">
//         {/* Header Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h4" component="div">
//               Enquiry Details
//             </Typography>
//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="contained" color="primary" fullwidth component={Link} to={`/update/${selectedEnquiry.enquiryId}`}>
//                   Edit Enquiry
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="secondary" fullwidth component={Link} to={`/dashboard/crm/enquiry`}>
//                   Back to Enquiries
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>

//           {/* Display enquiry details here */}




//             <Button variant="contained" color="primary" fullwidth component={Link} to={`/dashboard/customer/customer-list`} onClick={handleConvertToClient}
//                 disabled={conversionStatus === "loading"}
//                  >
//                 {conversionStatus === "loading" ? "Converting..." : "Convert to Client"}
//                   {/* Show success message */}
//                   {conversionStatus === "succeeded" && <p style={{ color: "green" }}>{message}</p>}
//                   {/* Show error message */}
//                   {conversionStatus === "failed" && <p style={{ color: "red" }}>{conversionError}</p>}
//                  {message && <p style={{ color: 'green' }}>{message}</p>}
//                  {error && <p style={{ color: 'red' }}>{error}</p>}
//             </Button>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Button variant="outlined" color="error" fullwidth component={Link} to={`/dashboard/crm/enquiry`} onClick={handleMarkAsLost}>
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
//                 <Typography variant="body1"><strong>Customer Name:</strong> {selectedEnquiry.customer_name}</Typography>
//                 <Typography variant="body1"><strong>Gender:</strong> {selectedEnquiry.gender}</Typography>
//                 <Typography variant="body1"><strong>Department:</strong> {selectedEnquiry.department_name}</Typography>
//                 <Typography variant="body1"><strong>Designation:</strong> {selectedEnquiry.designation_name}</Typography>
//                 <Typography variant="body1"><strong>Enquiry History:</strong> {selectedEnquiry.history}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Category:</strong> {selectedEnquiry.category_name}</Typography>
//                 <Typography variant="body1"><strong>Primary Phone:</strong> {selectedEnquiry.pri_phone}</Typography>
//                 <Typography variant="body1"><strong>Secondary Phone:</strong> {selectedEnquiry.sec_phone}</Typography>
//                 <Typography variant="body1"><strong>Email:</strong> {selectedEnquiry.email}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Province:</strong> {selectedEnquiry.province_name}</Typography>
//                 <Typography variant="body1"><strong>District:</strong> {selectedEnquiry.district_name}</Typography>
//                 <Typography variant="body1"><strong>Municipality:</strong> {selectedEnquiry.municipality_name}</Typography>
//                 <Typography variant="body1"><strong>Street Address:</strong> {selectedEnquiry.street_address}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <Typography variant="body1"><strong>Estimated Budget:</strong> {selectedEnquiry.estimated_amount}</Typography>
//                 <Typography variant="body1"><strong>Temporary Address:</strong> {selectedEnquiry.sec_address}</Typography>
//                 <Typography variant="body1"><strong>Enquiry Date:</strong> {formatDateTime(selectedEnquiry.created)}</Typography>
//                 <Typography variant="body1"><strong>Next Follow-up Date:</strong> {formatDateTime(selectedEnquiry.next_follow_up_date)}</Typography>

//                  {/* <Typography variant="body1" sx={{ mt: 2 }}><strong>Enquiry History:</strong> {selectedEnquiry.history}</Typography> */}
//               </Grid>
//             </Grid>

//           </CardContent>
//         </Card>


//       </div>

        // {/* Render Follow-up Table */}
        // <h2>Follow-ups for {selectedEnquiry.customer_name}</h2>
        // {follows.length > 0 ? (
        //   <FollowTable followups={follows} />
        // ) : (
        //   <p>No follow-ups available.</p>
        // )}
//       {/* <div className="container-fluenquiryId"> */}
//         {/* Enquiry details and actions here */}

//         {/* Mark as Lost and Convert to Client buttons here */}

//         {/* Render Meeting Update Table below */}
//         {/* <MeetingUpdateTable />
//         <p>meeting table</p>
//        </div> */}
//         {/* Render Follow Table for the specific enquiry ID */}
//         {/* <FollowTable enquiryId={enquiryId} /> */}
//         {/* Pass the enquiryId to the FollowTable component */}
//         {/* <FollowTable enquiryId={selectedEnquiry.enquiryId} /> */}
//           {/* Follow-up Table */}
//       {/* <h2>Follow-ups for {selectedEnquiry.customer_name}</h2>
//       <FollowTable followups={follows} /> */}
//     </div>
//   );
// };

// export default EnquiryDetail;








