import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowById,
  deleteFollow,
} from "../../redux/slice/crm/followSlice"; // Adjust paths as needed
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const FollowDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Follow-up ID from URL:", id); // Log to confirm if `id` is correct
  // Get the current follow-up from Redux state
  const currentFollow = useSelector((state) => state.follows.currentFollow);

  const isLoading = useSelector((state) => state.follows.isLoading);
  const error = useSelector((state) => state.follows.error);

  console.log("Current Follow Data:", currentFollow);

  useEffect(() => {
    if (id) {
      dispatch(fetchFollowById({ id }));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteFollow(id))
      .unwrap()
      .then(() => {
        navigate("/dashboard/crm/follow"); // Redirect after deletion
      })
      .catch((error) => {
        console.error("Delete failed", error);
      });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Follow-up Details
      </Typography>

      {currentFollow ? (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                      Enquiry: {currentFollow.customer_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Followed By:</strong> {currentFollow.follow_by}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Due Date:</strong> {currentFollow.due_date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Status:</strong> {currentFollow.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Notes:</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentFollow.notes || "No notes available."}
                    </Typography>
                  </Grid>

                  {/* Action Buttons */}
                  {/* <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        fullWidth
                        onClick={() =>
                          navigate(`/dashboard/crm/follow/edit/${id}`)
                        } // Navigate to edit page
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        fullWidth
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          Follow-up details not found.
        </Typography>
      )}
    </Box>
  );
};

export default FollowDetail;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFollowById } from "../../redux/slice/crm/followSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { Row, Col, Container, Button, Alert } from "react-bootstrap";

// const FollowDetail = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");

//   const { id } = useParams();

//   // Get currentFollow, loading, and error states from Redux store
//   const { currentFollow, loading, error } = useSelector(
//     (state) => state.follows
//   );
//   // getting follow
//   const follow = useSelector((state) => state.follows.currentFollow);
//   //getting single id
//   useEffect(() => {
//     if (id) {
//       console.log("Fetching follow by ID:", id);
//       dispatch(fetchFollowById(id))
//         .unwrap()
//         .then((data) => console.log("follow fetched:", data))
//         .catch((error) => console.log("Error fetching follow:", error));
//     }
//   }, [dispatch, id]);
//   // This single useEffect is sufficient to observe updates to currentFollow
//   useEffect(() => {
//     if (currentFollow) {
//       console.log("Follow data received:", currentFollow);
//       setStatus(currentFollow.status);
//     }
//   }, [currentFollow]);
//   //check data received
//   useEffect(() => {
//     if (follow) {
//       console.log("follow data received:", follow); // Debugging purpose
//       setStatus(follow.status);
//     }
//   }, [follow]);
//   //handle status change
//   // const handleStatusChange = (e) => {
//   //   setStatus(e.target.value);
//   // };
//   // handle status update
//   // const handleStatusUpdate = () => {
//   //   if (status === follow.status) {
//   //     toast.info("No change in status.");
//   //     return;
//   //   }

//   return (
//     <Container className="mt-5 p-4 shadow-sm bg-light rounded">
//       <h3 className="text-center mb-4">Follow-Up Details</h3>
//       {loading ? (
//         <p className="text-center">Loading Follow-Up Details...</p>
//       ) : error ? (
//         <Alert variant="danger" className="text-center">
//           Error: {error}
//         </Alert>
//       ) : currentFollow ? (
//         <div className="p-3">
//           <Row className="mb-3">
//             <Col md={6}>
//               <strong>Enquiry ID:</strong> {currentFollow.enquiry || "N/A"}
//             </Col>
//             <Col md={6}>
//               <strong>Followed By:</strong> {currentFollow.follow_by || "N/A"}
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col md={6}>
//               <strong>Due Date:</strong> {currentFollow.due_date || "N/A"}
//             </Col>
//             <Col md={6}>
//               <strong>Remark:</strong> {currentFollow.remark || "N/A"}
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col>
//               <strong>Notes:</strong> {currentFollow.notes || "N/A"}
//             </Col>
//           </Row>
//           <div className="text-center mt-4">
//             <Button
//               variant="secondary"
//               onClick={() => navigate("/dashboard/crm/follow")}
//             >
//               Back to Follow List
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center">No Follow-Up Details found.</p>
//       )}
//     </Container>
//   );
// };

// export default FollowDetail;
