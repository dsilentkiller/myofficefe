import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
import "../../css/Table.css";

const EnquiryDetail = () => {
  const { id } = useParams(); // Get the enquiry ID from the URL parameters
  const dispatch = useDispatch();

  // Get enquiry data and loading state from Redux store
  const { currentEnquiry, loading, error } = useSelector(
    (state) => state.enquiries
  );

  useEffect(() => {
    // Dispatch the fetchEnquiryById action to fetch the enquiry data
    dispatch(fetchEnquiryById(id));
  }, [id, dispatch]);

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentEnquiry) {
    return <div>No enquiry found with this ID.</div>;
  }

  // Helper function to format date as a readable string
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
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="card">
            <div className="card-header text-center">
              <h4 className="card-title">Enquiry Details</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {/* First row of 4 columns */}
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Customer Name:</strong>
                    <span>{currentEnquiry.customer_name}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Enquiry Date:</strong>
                    <span>{formatDateTime(currentEnquiry.created)}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Next Follow-up Date:</strong>
                    <span>
                      {formatDateTime(currentEnquiry.next_follow_up_date)}
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Category:</strong>
                    <span>{currentEnquiry.category_name}</span>
                  </div>
                </div>

                {/* Second row of 4 columns */}
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Department:</strong>
                    <span>{currentEnquiry.department_name}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Designation:</strong>
                    <span>{currentEnquiry.designation_name}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Primary Phone:</strong>
                    <span>{currentEnquiry.pri_phone}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Secondary Phone:</strong>
                    <span>{currentEnquiry.sec_phone}</span>
                  </div>
                </div>

                {/* Third row of 4 columns */}
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Email:</strong>
                    <span>{currentEnquiry.email}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Gender:</strong>
                    <span>{currentEnquiry.gender}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Province:</strong>
                    <span>{currentEnquiry.province_name}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>District:</strong>
                    <span>{currentEnquiry.district_name}</span>
                  </div>
                </div>

                {/* Fourth row of 4 columns */}
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Municipality:</strong>
                    <span>{currentEnquiry.municipality_name}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Ward No:</strong>
                    <span>{currentEnquiry.ward_no}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Tole Name:</strong>
                    <span>{currentEnquiry.tole_name}</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Estimated Budget:</strong>
                    <span>{currentEnquiry.estimated_amount}</span>
                  </div>
                </div>

                {/* Known By Field */}
                <div className="col-md-4">
                  <div className="detail-row">
                    <strong>Known By:</strong>
                    <span>{currentEnquiry.known_by}</span>
                  </div>
                </div>
              </div>

              {/* History field - scrollable */}
              <div className="row">
                <div className="col-12">
                  <div className="detail-row">
                    <strong>Enquiry History:</strong>
                    <div className="history-box">
                      <p>{currentEnquiry.history}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="text-center mt-4">
                <Link
                  to={`/dashboard/crm/enquiry/update/${currentEnquiry.id}`}
                  className="btn btn-primary"
                >
                  Edit Enquiry
                </Link>
                <Link
                  to={`/dashboard/crm/enquiry`}
                  className="btn btn-secondary ml-2"
                >
                  Back to Enquiries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetail;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import "../../css/Table.css";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";

// import { useDispatch, useSelector } from "react-redux";

// const EnquiryDetail = () => {
//   const { id } = useParams(); // Get the enquiry ID from the URL parameters
//   const dispatch = useDispatch();
//   const [enquiry, setEnquiry] = useState(null); // To store enquiry data
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   // Accessing enquiry state from Redux store
//   const { currentEnquiry, loading, error } = useSelector(
//     (state) => state.enquiries
//   );

//   // Fetch the enquiry details by ID
//   // Fetch the enquiry details by ID
//   useEffect(() => {
//     dispatch(fetchEnquiryById(id)); // Dispatch the action to fetch enquiry by ID
//   }, [id, dispatch]); // Re-fetch if the ID changes

//   // Loading and error handling
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!enquiry) {
//     return <div>No enquiry found with this ID.</div>;
//   }

//   // Helper function to format date as a readable string
//   const formatDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//     };
//     return new Intl.DateTimeFormat("en-US", options).format(
//       new Date(dateString)
//     );
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           <div className="card-header">
//             <h4 className="card-title">Enquiry Details</h4>
//           </div>
//           <div className="card-body">
//             <div className="detail-container">
//               <div className="detail-row">
//                 <strong>Customer Name: </strong>
//                 <span>{enquiry.customer_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Enquiry Date: </strong>
//                 <span>{formatDateTime(enquiry.created)}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Next Follow-up Date: </strong>
//                 <span>{formatDateTime(enquiry.next_follow_up_date)}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Category: </strong>
//                 <span>{enquiry.category_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Department: </strong>
//                 <span>{enquiry.department_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Designation: </strong>
//                 <span>{enquiry.designation_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Primary Phone: </strong>
//                 <span>{enquiry.pri_phone}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Secondary Phone: </strong>
//                 <span>{enquiry.sec_phone}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Email: </strong>
//                 <span>{enquiry.email}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Gender: </strong>
//                 <span>{enquiry.gender}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Province: </strong>
//                 <span>{enquiry.province_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>District: </strong>
//                 <span>{enquiry.district_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Municipality: </strong>
//                 <span>{enquiry.municipality_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Ward No: </strong>
//                 <span>{enquiry.ward_no}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Tole Name: </strong>
//                 <span>{enquiry.tole_name}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Estimated Budget: </strong>
//                 <span>{enquiry.estimated_amount}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Known By: </strong>
//                 <span>{enquiry.known_by}</span>
//               </div>
//               <div className="detail-row">
//                 <strong>Enquiry History: </strong>
//                 <p>{enquiry.history}</p>
//               </div>
//               <div className="button-container">
//                 <Link to={`/update/${enquiry.id}`} className="btn btn-primary">
//                   Edit Enquiry
//                 </Link>
//                 <Link to={`/enquiry`} className="btn btn-secondary ml-2">
//                   Back to Enquiries
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnquiryDetail;

// import React, { useEffect } from "react";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// const EnquiryDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const enquiry = useSelector((state) => state.enquiries.selectedEnquiry);

//   const loading = useSelector((state) => state.enquiries.loading);
//   const error = useSelector((state) => state.enquiries.error);

//   useEffect(() => {
//     console.log("Fetching enquiry with ID:", id);
//     dispatch(fetchEnquiryById(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (enquiry) {
//       console.log("Fetched enquiry:", enquiry);
//     }
//     console.log("Current state:", { loading, error, enquiry });
//   }, [enquiry, loading, error]);

//   if (loading) return <p>Loading enquiry details...</p>;
//   if (error) {
//     console.log("Error fetching enquiry:", error);
//     return <p>Error: {error.detail || "An unknown error occurred."}</p>;
//   }
//   if (!enquiry) return <p>No enquiry found!</p>;
//   return (
//     <div
//       className="container mt-4"
//       style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
//     >
//       <h3 className="mb-4 text-end" style={{ fontWeight: "500" }}>
//         Enquiry Details
//       </h3>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Customer Name</h6>
//           <p>{enquiry.customer_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Phone</h6>
//           <p>{enquiry.pri_phone}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Email</h6>
//           <p>{enquiry.email}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Category</h6>
//           <p>{enquiry.category_name}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Estimated Amount</h6>
//           <p>{enquiry.estimated_amount}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Enquiry Purpose</h6>
//           <p>{enquiry.enquiry_purpose}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Known By</h6>
//           <p>{enquiry.known_by}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Gender</h6>
//           <p>{enquiry.gender}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Secondary Phone</h6>
//           <p>{enquiry.sec_phone}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Province</h6>
//           <p>{enquiry.province_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">District</h6>
//           <p>{enquiry.district_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Municipality</h6>
//           <p>{enquiry.municipality_name}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Ward No.</h6>
//           <p>{enquiry.ward_no}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Tole Name</h6>
//           <p>{enquiry.tole_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Organization Name</h6>
//           <p>{enquiry.organization_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Department</h6>
//           <p>{enquiry.department_name}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Designation</h6>
//           <p>{enquiry.designation_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Enquiry Date</h6>
//           <p>{enquiry.created}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">History</h6>
//           <p>{enquiry.history}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnquiryDetail;

// import React, { useEffect, useState } from "react";
// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// const Enquiry = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const enquiriesState = useSelector((state) => state.enquiries || {});
//   const loading = enquiriesState.loading || false;
//   const error = enquiriesState.error || null;
//   const navigate = useNavigate();

//   // Fetch enquiry by ID
//   useEffect(() => {
//     dispatch(fetchEnquiryById(id));
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const enquiry = enquiriesState.enquiries || {};
//   console.log("enquiry", enquiry);

//   return (
//     <div
//       className="container mt-4"
//       style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
//     >
//       <h3 className="mb-4 text-end" style={{ fontWeight: "500" }}>
//         Enquiry Details
//       </h3>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Customer Name</h6>
//           <p>{enquiry.customer_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Phone</h6>
//           <p>{enquiry.pri_phone}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Email</h6>
//           <p>{enquiry.email}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Category</h6>
//           <p>{enquiry.category}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Estimated Amount</h6>
//           <p>{enquiry.estimated_amount}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Enquiry Purpose</h6>
//           <p>{enquiry.enquiry_purpose}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Known By</h6>
//           <p>{enquiry.known_by}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Gender</h6>
//           <p>{enquiry.gender}</p>
//         </div>
//       </div>

//       {/* Additional details */}
//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Secondary Phone</h6>
//           <p>{enquiry.sec_phone}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Province</h6>
//           <p>{enquiry.province}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">District</h6>
//           <p>{enquiry.district}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Municipality</h6>
//           <p>{enquiry.municipality}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Ward No.</h6>
//           <p>{enquiry.ward_no}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Tole Name</h6>
//           <p>{enquiry.tole_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Organization Name</h6>
//           <p>{enquiry.organization_name}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Department</h6>
//           <p>{enquiry.department}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Designation</h6>
//           <p>{enquiry.designation}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">Enquiry Date</h6>
//           <p>{enquiry.created}</p>
//         </div>
//         <div className="col-md-4 mb-3">
//           <h6 className="text-muted">History</h6>
//           <p>{enquiry.history}</p>
//         </div>
//       </div>

//       <h4 className="mt-5 text-center">Follow-up History</h4>
//       {/* {enquiry.followups && enquiry.followups.length > 0 ? (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Note</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {enquiry.followups.map((followup, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{followup.note}</td>
//                 <td>{followup.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No follow-up history available</p>
//       )} */}
//     </div>
//   );
// };

// export default Enquiry;

//not fetch ed data

// import React, { useEffect, useState } from "react";

// import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import EnquiryDelete from "./EnquiryDelete";
// // import { toast, ToastContainer } from "react-toastify";
// const Enquiry = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const enquiriesState = useSelector((state) => state.enquiries || {});
//   const loading = enquiriesState.loading || false;
//   const error = enquiriesState.error || null;
//   const navigate = useNavigate();

//   const [enquiryToDelete, setEnquiryToDelete] = useState(null);

//   // Fetch enquiry by ID
//   useEffect(() => {
//     dispatch(fetchEnquiryById(id));
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const enquiry = enquiriesState.enquiries || {};

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4 text-center">Enquiry Details</h3>
//       <div className="row">
//         <div className="col-md-4">
//           <h5>Customer Name</h5>
//           <p>{enquiry.customer_name}</p>
//         </div>
//         <div className="col-md-4">
//           <h5>Phone</h5>
//           <p>{enquiry.pri_phone}</p>
//         </div>
//         <div className="col-md-4">
//           <h5>Email</h5>
//           <p>{enquiry.email}</p>
//         </div>
//       </div>
//       {/* Additional details... */}
//       <h4 className="mt-5 text-center">Follow-up History</h4>
//       const followups = enquiry.followups || [];
//       {/* {followups.length > 0 ? ( */}
//       {/* // Render follow-up table */}
//       {/* // ) : ( */}
//       <p>No follow-up history</p>
//       {/* )} */}
//     </div>
//   );
// };

// export default Enquiry;
