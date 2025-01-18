import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryById} from "../../redux/slice/crm/enquirySlice";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
import { fetchCustomers, createCustomer} from "../../redux/slice/customer/customerSlice";

import { updateEnquiryStatus } from "../../redux/slice/crm/enquirySlice";  // Assuming updateEnquiryStatus is the correct action
import MeetingUpdateTable from "../meetingupdate/MeetingUpdateTable";

import { toast } from "react-toastify";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const EnquiryDetail = () => {
  const { id } = useParams(); // Enquiry ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();  // To handle navigation

  const { selectedEnquiry, loading, error } = useSelector((state) => state.enquiries);
  const{conversionStatus,conversionError,message} =useSelector((state)=>state.customers)


  console.log("Selected Enquiry from Redux:", selectedEnquiry);
  // Fetch enquiry and follow-ups on mount
  useEffect(() => {
    if (id) {
      // dispatch(lostEnquiries)
      dispatch(fetchEnquiryById(id)); // Fetch enquiry
    }
  }, [id, dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!selectedEnquiry) {
    return <div>No enquiry found.</div>;
  }

  // Helper function to format date as readable string
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateString));
  };
//mark as lost client
// const handleMarkAsLost = () => {
//   if (selectedEnquiry && selectedEnquiry.id) {
//     dispatch(updateEnquiryStatus({ id: selectedEnquiry.id, status: "lost" }))
//       .then(() => {
//         // Navigate to the Lost Enquiry table after marking as lost
//         toast.success("Enquiry marked as lost!");
//         navigate("/dashboard/crm/enquiry/lost-enquiry/");  // Navigate to Lost Enquiries page
//       })
//       .catch((error) => {
//         toast.error("Failed to mark the enquiry as lost. Please try again.");
//       });
//   }
// };
const handleMarkAsLost = () => {
  if (selectedEnquiry && selectedEnquiry.id) {
    dispatch(updateEnquiryStatus({ id: selectedEnquiry.id, status: "lost" }))
      .then(() => {
        // Navigate to the Lost Enquiries page after marking as lost
        toast.success("Enquiry marked as lost!");
        navigate("/dashboard/crm/enquiry/lost-enquiry/");  // Navigate to Lost Enquiries page
      })
      .catch((error) => {
        toast.error("Failed to mark the enquiry as lost. Please try again.");
      });
  }
};

//  // Sample function to mark an enquiry as lost
//  const handleMarkAsLost = (enquiryId) => {
//   const updatedEnquiries = enquiries.map((enquiry) =>
//     enquiry.id === enquiryId ? { ...enquiry, status: "Lost" } : enquiry
//   );
  
//   // Update enquiries state
//   setEnquiries(updatedEnquiries);

//   // Filter lost enquiries and update filteredEnquiries
//   const updatedLostEnquiries = updatedEnquiries.filter(
//     (enquiry) => enquiry.status === "Lost"
//   );
//   setLostEnquiries(updatedLostEnquiries);

//   // If you want the filteredEnquiries to show only lost enquiries, you can update it here
//   setFilteredEnquiries(updatedLostEnquiries);
// };

  //handle convert to client
  // const handleConvertToClient = () => {
  //   if (selectedEnquiry && selectedEnquiry.id) {
  //     dispatch(updateEnquiryStatus({ id: selectedEnquiry.id, status: "client" }))
  //       .then(() => {
  //         dispatch(createCustomer({ customer: selectedEnquiry }));  // Add the converted customer to the list
  //         dispatch(fetchCustomers());  // Refetch customer list
  //         navigate("/dashboard/customer/customer-list"); // Navigate to Customer Table
  //       });
  //   }
  // };
  // Handle Convert to Client
  const handleConvertToClient = () => {
    if (selectedEnquiry && selectedEnquiry.id) {
      // Update the enquiry status to "client"
      dispatch(updateEnquiryStatus({ id: selectedEnquiry.id, status: "client" }))
        .then(() => {
          // Create customer from the enquiry
          dispatch(createCustomer({ customer: selectedEnquiry }))
            .then(() => {
              // Refetch customers and display success toast
              dispatch(fetchCustomers());
              toast.success("Customer successfully converted!", {
                autoClose: 2000,  // Close the toast after 2 seconds
              });
              navigate("/dashboard/customer/customer-list"); // Navigate to customer list
            })
            .catch((error) => {
              // Display error toast if customer creation fails
              toast.error("Error creating customer. Please try again.", {
                autoClose: 2000,
              });
            });
        })
        .catch((error) => {
          // Display error toast if enquiry status update fails
          toast.error("Error updating enquiry status. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
    }
  };
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        {/* Header Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              Enquiry Details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={3}>
                <Button variant="contained" color="primary" fullWidth component={Link} to={`/update/${selectedEnquiry.id}`}>
                  Edit Enquiry
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" color="secondary" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
                  Back to Enquiries
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>

          {/* Display enquiry details here */}




            <Button variant="contained" color="primary" fullWidth component={Link} to={`/dashboard/crm/client`} onClick={handleConvertToClient}
                disabled={conversionStatus === "loading"}
                 >
                {conversionStatus === "loading" ? "Converting..." : "Convert to Client"}
                  {/* Show success message */}
                  {conversionStatus === "succeeded" && <p style={{ color: "green" }}>{message}</p>}
                  {/* Show error message */}
                  {conversionStatus === "failed" && <p style={{ color: "red" }}>{conversionError}</p>}
                 {message && <p style={{ color: 'green' }}>{message}</p>}
                 {error && <p style={{ color: 'red' }}>{error}</p>}
            </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" color="error" fullWidth component={Link} to={`/dashboard/crm/enquiry`} onClick={handleMarkAsLost}>
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

                 {/* <Typography variant="body1" sx={{ mt: 2 }}><strong>Enquiry History:</strong> {selectedEnquiry.history}</Typography> */}
              </Grid>
            </Grid>

          </CardContent>
        </Card>


      </div>
      <div className="container-fluid">
        {/* Enquiry details and actions here */}

        {/* Mark as Lost and Convert to Client buttons here */}

        {/* Render Meeting Update Table below */}
        <MeetingUpdateTable />
        <p>meeting table</p>
      </div>
    </div>
  );
};

export default EnquiryDetail;








