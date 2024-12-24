import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryById } from "../../redux/slice/crm/enquirySlice";
import { fetchFollowById } from "../../redux/slice/crm/followSlice";
import "../../css/enquirydetail.css";

const EnquiryDetail = () => {
  const { id } = useParams(); // Enquiry ID from URL
  const dispatch = useDispatch();

  // Redux states
  const {
    currentEnquiry,
    loading: enquiryLoading,
    error: enquiryError,
  } = useSelector((state) => state.enquiries || {});
  useEffect(() => {
    console.log("Current Enquiry from Redux:", currentEnquiry);
  }, [currentEnquiry]);

  const {
    list: follows = [],
    isLoading: followsLoading,
    fetchError: followsError,
  } = useSelector((state) => state.follows || {});

  // Fetch enquiry and follow-ups on mount
  useEffect(() => {
    if (id) {
      console.log(
        "Dispatching fetchEnquiryById and fetchFollowById with ID:",
        id
      );
      dispatch(fetchEnquiryById(id)); // Fetch enquiry
      dispatch(fetchFollowById(id)); // Fetch follow-ups for this enquiry
    }
  }, [id, dispatch]);

  // Filter the follows based on enquiry_id
  const filteredFollows = follows.filter(
    (follow) =>
      follow.enquiry_id != null && Number(follow.enquiry_id) === Number(id)
  );
  console.log("Filtered Follows:", filteredFollows);

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
  if (enquiryLoading || followsLoading) return <div>Loading...</div>;
  if (enquiryError) return <div>Error: {enquiryError}</div>;
  if (followsError) return <div>Error: {followsError}</div>;

  // Make sure currentEnquiry is loaded before trying to access its properties
  if (!currentEnquiry) {
    console.log(
      "Enquiry data is not available, currentEnquiry:",
      currentEnquiry
    );
    return <div>No enquiry found.</div>;
  }
  return (
    <div className="content-wrapper ">
      <div className="row justify-content-center">
        <div className="container-fluid">
          <div className="card-header text-black">
            <h4 className="card-title">Enquiry Details</h4>
            <div className="row left mt-4">
              <div className="col-md-12 text-center">
                <Link
                  to={`/update/${currentEnquiry.id}`}
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
                <Link
                  to={`/dashboard/crm/client`}
                  className="btn btn-primary ml-2"
                >
                  Convert to client
                </Link>
                <Link
                  to={`/dashboard/crm/enquiry`}
                  className="btn btn-danger ml-2"
                >
                  Mark as lost
                </Link>
              </div>
            </div>
          </div>

          {/* First Column */}
          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Customer Name:</strong> {currentEnquiry.customer_name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Gender:</strong> {currentEnquiry.gender}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Department:</strong> {currentEnquiry.department_name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Designation:</strong> {currentEnquiry.designation_name}
              </p>
            </div>
          </div>

          {/* Second Column */}
          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Category:</strong> {currentEnquiry.category_name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Primary Phone:</strong> {currentEnquiry.pri_phone}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Secondary Phone:</strong> {currentEnquiry.sec_phone}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Email:</strong> {currentEnquiry.email}
              </p>
            </div>
          </div>

          {/* Third Column */}
          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Province:</strong> {currentEnquiry.province_name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>District:</strong> {currentEnquiry.district_name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Municipality:</strong>{" "}
                {currentEnquiry.municipality_name}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Street Address:</strong> {currentEnquiry.street_address}
              </p>
            </div>
          </div>

          {/* Fifth Column */}
          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Estimated Budget:</strong>{" "}
                {currentEnquiry.estimated_amount}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Temporary Address:</strong> {currentEnquiry.sec_address}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Enquiry Date:</strong>{" "}
                {formatDateTime(currentEnquiry.created)}
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <strong>Next Follow-up Date:</strong>{" "}
                {formatDateTime(currentEnquiry.next_follow_up_date)}
              </p>
            </div>
          </div>

          {/* Sixth Column */}
          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Enquiry History:</strong>
              </p>
              <p>{currentEnquiry.history}</p>
            </div>
          </div>
        </div>

        {/* Follow Table */}
        <div className="card mt-4">
          <div className="card-header">
            <h4 className="card-title">Follow-Ups</h4>
            <div className="navbar-nav ml-auto">
              <Link to="/dashboard/crm/follow/create">
                <h5 className=" btn btn-info"> Add Follow </h5>
              </Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Follow By</th>
                  <th>Next Follow-Up</th>
                  <th>Last Follow-Up</th>
                  <th>Remark</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFollows.length > 0 ? (
                  filteredFollows.map((follow, index) => (
                    <tr key={follow.id}>
                      <td>{index + 1}</td>
                      <td>{follow.follow_by}</td>
                      <td>{formatDateTime(follow.due_date)}</td>
                      <td>{formatDateTime(follow.created)}</td>
                      <td>{follow.remark}</td>
                      <Link
                        to={`/follow/${follow.id}`}
                        className="btn btn-info btn-sm"
                      >
                        View
                      </Link>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No follow-ups found for this Enquiry.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetail;

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
//     currentEnquiry,
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

//   // if (!currentEnquiry) return <div>No enquiry found.</div>;

//   return (
//     <div className="content-wrapper ">
//       <div className="row justify-content-center">
//         <div className="container-fluid">
//           <div className="card-header  text-black">
//             <h4 className="card-title">Enquiry Details</h4>
//             <div className="row left mt-4">
//               <div className="col-md-12 text-center">
//                 <Link
//                   to={`/update/${currentEnquiry.id}`}
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
//                 <strong>Customer Name:</strong> {currentEnquiry.customer_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Gender:</strong> {currentEnquiry.gender}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Department:</strong> {currentEnquiry.department_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Designation:</strong> {currentEnquiry.designation_name}
//               </p>
//             </div>
//           </div>

//           {/* Second Column */}

//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Category:</strong> {currentEnquiry.category_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Primary Phone:</strong> {currentEnquiry.pri_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Secondary Phone:</strong> {currentEnquiry.sec_phone}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Email:</strong> {currentEnquiry.email}
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
//                 <strong>Province:</strong> {currentEnquiry.province_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>District:</strong> {currentEnquiry.district_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Municipality:</strong>{" "}
//                 {currentEnquiry.municipality_name}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>street address:</strong> {currentEnquiry.street_address}
//               </p>
//             </div>
//           </div>
//           {/* fifth column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Estimated Budget:</strong>{" "}
//                 {currentEnquiry.estimated_amount}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>temporary address:</strong> {currentEnquiry.sec_address}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Enquiry Date:</strong>{" "}
//                 {formatDateTime(currentEnquiry.created)}
//               </p>
//             </div>
//             <div className="col-md-3">
//               <p>
//                 <strong>Next Follow-up Date:</strong>{" "}
//                 {formatDateTime(currentEnquiry.next_follow_up_date)}
//               </p>
//             </div>
//           </div>
//           {/* sixth column */}
//           <div className="row">
//             <div className="col-md-3">
//               <p>
//                 <strong>Enquiry History:</strong>
//               </p>
//               <p>{currentEnquiry.history}</p>
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
