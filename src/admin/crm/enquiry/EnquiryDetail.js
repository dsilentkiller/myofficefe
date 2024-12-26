


import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
import { fetchFollowById } from "../../redux/slice/crm/followSlice";
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
  // const enquiry= useSelector((state) => state.enquiries.enquiry);
  // Redux states
  const {
    list:Enquiry=[],
    loading: enquiryLoading, error: enquiryError } = useSelector(
    (state) => state.enquiries || {}
  );
  //   const {
//     enquiry,
//     loading: enquiryLoading,
//     error: enquiryError,
//   } = useSelector((state) => state.enquiries || {});
  // const {
  //   list: follows = [],
  //   isLoading: followsLoading,
  //   fetchError: followsError,
  // } = useSelector((state) => state.follows || {});

  // Fetch enquiry and follow-ups on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchEnquiryById(id)); // Fetch enquiry
      // dispatch(fetchFollowById(id)); // Fetch follow-ups for this enquiry
    }
  }, [id, dispatch]);

  // const filteredFollows = follows.filter(
  //   (follow) => follow.enquiry_id != null && Number(follow.enquiry_id) === Number(id)
  // );

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

  // Loading and error handling
  // if (enquiryLoading || followsLoading) return <div>Loading...</div>;
  // if (enquiryError) return <div>Error: {enquiryError}</div>;
  // if (followsError) return <div>Error: {followsError}</div>;

  // Check if enquiry is undefined or null
  if (!Enquiry) {
    return <div>No enquiry found.</div>;
  }

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
                <Button variant="contained" color="primary" fullWidth component={Link} to={`/update/${Enquiry.id}`}>
                  Edit Enquiry
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" color="secondary" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
                  Back to Enquiries
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="contained" color="primary" fullWidth component={Link} to={`/dashboard/crm/client`}>
                  Convert to Client
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" color="error" fullWidth component={Link} to={`/dashboard/crm/enquiry`}>
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
                <Typography variant="body1"><strong>Customer Name:</strong> {Enquiry.customer_name}</Typography>
                <Typography variant="body1"><strong>Gender:</strong> {Enquiry.gender}</Typography>
                <Typography variant="body1"><strong>Department:</strong> {Enquiry.department_name}</Typography>
                <Typography variant="body1"><strong>Designation:</strong> {Enquiry.designation_name}</Typography>
                <Typography variant="body1"><strong>Enquiry History:</strong> {Enquiry.history}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Category:</strong> {Enquiry.category_name}</Typography>
                <Typography variant="body1"><strong>Primary Phone:</strong> {Enquiry.pri_phone}</Typography>
                <Typography variant="body1"><strong>Secondary Phone:</strong> {Enquiry.sec_phone}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {Enquiry.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Province:</strong> {Enquiry.province_name}</Typography>
                <Typography variant="body1"><strong>District:</strong> {Enquiry.district_name}</Typography>
                <Typography variant="body1"><strong>Municipality:</strong> {Enquiry.municipality_name}</Typography>
                <Typography variant="body1"><strong>Street Address:</strong> {Enquiry.street_address}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1"><strong>Estimated Budget:</strong> {Enquiry.estimated_amount}</Typography>
                <Typography variant="body1"><strong>Temporary Address:</strong> {Enquiry.sec_address}</Typography>
                <Typography variant="body1"><strong>Enquiry Date:</strong> {formatDateTime(Enquiry.created)}</Typography>
                <Typography variant="body1"><strong>Next Follow-up Date:</strong> {formatDateTime(Enquiry.next_follow_up_date)}</Typography>

                 {/* <Typography variant="body1" sx={{ mt: 2 }}><strong>Enquiry History:</strong> {Enquiry.history}</Typography> */}
              </Grid>
            </Grid>

          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default EnquiryDetail;








