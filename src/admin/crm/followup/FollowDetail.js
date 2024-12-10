import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowById } from "../../redux/slice/crm/followSlice";
import { useParams } from "react-router-dom";

const FollowDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentFollow, isLoading, error } = useSelector(
    (state) => state.follows
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchFollowById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("currentFollow data:", currentFollow);
  }, [currentFollow]);

  useEffect(() => {
    if (id) {
      console.log("Fetching follow by ID:", id);
      dispatch(fetchFollowById(id))
        .unwrap()
        .then((data) => console.log("follow fetched:", data)) // This should log the data
        .catch((error) => console.log("Error fetching follow:", error));
    }
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Follow-Up Detail</h2>
      {currentFollow ? (
        <div>
          <p>
            <strong>Enquiry:</strong> {currentFollow.enquiry}
          </p>
          <p>
            <strong>Followed By:</strong> {currentFollow.follow_by}
          </p>
          <p>
            <strong>Due Date:</strong> {currentFollow.due_date}
          </p>
          <p>
            <strong>Remark:</strong> {currentFollow.remark}
          </p>
          <p>
            <strong>Notes:</strong> {currentFollow.notes}
          </p>
        </div>
      ) : (
        <p>No follow-up data available.</p>
      )}
    </div>
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
