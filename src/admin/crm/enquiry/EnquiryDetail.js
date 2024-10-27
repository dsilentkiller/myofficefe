import React, { useEffect } from "react";
import {
  fetchEnquiryById,
  // selectEnquiryById,
} from "../../redux/slice/crm/enquirySlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { selectEnquiryById } from "../../redux/selectors"; // Import the memoized selector

const Enquiry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch enquiry by ID
  useEffect(() => {
    dispatch(fetchEnquiryById(id));
  }, [dispatch, id]);

  // Use the memoized selector to get the enquiry by ID
  // const enquiry = useSelector((state) => selectEnquiryById(state, id));

  const enquiry = useSelector((state) => state.enquiries || {});
  // const loading = enquiriesState.loading || false;
  // const error = enquiriesState.error || null;

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className="container mt-4"
      style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
    >
      <h3 className="mb-4 text-end" style={{ fontWeight: "500" }}>
        Enquiry Details
      </h3>

      <div className="row">
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Customer Name</h6>
          <p>{enquiry?.customer_name}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Phone</h6>
          <p>{enquiry?.pri_phone}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Email</h6>
          <p>{enquiry?.email}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Category</h6>
          <p>{enquiry?.category}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Estimated Amount</h6>
          <p>{enquiry?.estimated_amount}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Enquiry Purpose</h6>
          <p>{enquiry?.enquiry_purpose}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Known By</h6>
          <p>{enquiry?.known_by}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Gender</h6>
          <p>{enquiry?.gender}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Secondary Phone</h6>
          <p>{enquiry?.sec_phone}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Province</h6>
          <p>{enquiry?.province}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">District</h6>
          <p>{enquiry?.district}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Municipality</h6>
          <p>{enquiry?.municipality}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Ward No.</h6>
          <p>{enquiry?.ward_no}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Tole Name</h6>
          <p>{enquiry?.tole_name}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Organization Name</h6>
          <p>{enquiry?.organization_name}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Department</h6>
          <p>{enquiry?.department}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Designation</h6>
          <p>{enquiry?.designation}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">Enquiry Date</h6>
          <p>{enquiry?.created}</p>
        </div>
        <div className="col-md-3 mb-3">
          <h6 className="text-muted">History</h6>
          <p>{enquiry?.history}</p>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;

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
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Customer Name</h6>
//           <p>{enquiry.customer_name}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Phone</h6>
//           <p>{enquiry.pri_phone}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Email</h6>
//           <p>{enquiry.email}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Category</h6>
//           <p>{enquiry.category}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Estimated Amount</h6>
//           <p>{enquiry.estimated_amount}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Enquiry Purpose</h6>
//           <p>{enquiry.enquiry_purpose}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Known By</h6>
//           <p>{enquiry.known_by}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Gender</h6>
//           <p>{enquiry.gender}</p>
//         </div>
//       </div>

//       {/* Additional details */}
//       <div className="row">
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Secondary Phone</h6>
//           <p>{enquiry.sec_phone}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Province</h6>
//           <p>{enquiry.province}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">District</h6>
//           <p>{enquiry.district}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Municipality</h6>
//           <p>{enquiry.municipality}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Ward No.</h6>
//           <p>{enquiry.ward_no}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Tole Name</h6>
//           <p>{enquiry.tole_name}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Organization Name</h6>
//           <p>{enquiry.organization_name}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Department</h6>
//           <p>{enquiry.department}</p>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Designation</h6>
//           <p>{enquiry.designation}</p>
//         </div>
//         <div className="col-md-3 mb-3">
//           <h6 className="text-muted">Enquiry Date</h6>
//           <p>{enquiry.created}</p>
//         </div>
//         <div className="col-md-3 mb-3">
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
