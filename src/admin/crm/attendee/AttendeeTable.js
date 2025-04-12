import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
import { toast } from "react-toastify";
import "../../css/Table.css";
import AttendeeDelete from "./AttendeeDelete";
import { deleteAttendee } from "../../redux/slice/crm/attendeeSlice";

const AttendeeTable = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [attendeeToDelete, setAttendeeToDelete] = useState(null);
  const deleteError = useSelector((state) => state.attendee?.deleteError);
  const { list: attendees = [], fetchError } = useSelector(
    (state) => state.attendees || {}
  );

  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  const handleDelete = (id) => {
    setAttendeeToDelete(id); // Show modal
  };
  const confirmDelete = (id) => {
    dispatch(deleteAttendee(id))
      .unwrap()
      .then(() => {
        toast.success("attendee deleted successfully!");
        setAttendeeToDelete(null);
        dispatch(fetchAttendees());
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete attendee: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };
  const filteredAttendees = attendees.filter((attendee) =>
    attendee.attendee_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="card">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <h5 className="navbar-brand">Attendee Table</h5>
              <div className="navbar-nav ml-auto">
                <Link to="create" className="nav-link btn btn-primary">
                  <h5>Add Attendee</h5>
                </Link>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="form-inline ml-3"
                >
                  <div className="input-group">
                    <input
                      type="search"
                      id="default-search"
                      name="search_term"
                      value={searchTerm}
                      className="form-control"
                      placeholder="Search attendees..."
                      onChange={(e) => setSearchTerm(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </nav>
          <div className="card-body">
            <div className="table-container">
              {fetchError && <p className="text-danger">{fetchError}</p>}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Purpose</th>
                    <th>Organization Name</th>
                    <th>Organization Detail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendees.length > 0 ? (
                    filteredAttendees.map((attendee, index) => (
                      <tr key={`${attendee.id}-${index}`}>
                        <td>{index + 1}</td>
                        <td>{attendee.attendee_name}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.pri_phone}</td>
                        <td>{attendee.purpose}</td>
                        <td>{attendee.organization_name}</td>
                        <td>{attendee.organization_detail}</td>
                        <td>
                          <Link
                            to={`attendee/update/${attendee.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/dashboard/crm/attendee/detail/${attendee.id}`}
                            className="btn btn-info btn-sm"
                          >
                            View
                          </Link>
                          <Link
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleDelete(attendee.id)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No attendees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {attendeeToDelete !== null && (
              <AttendeeDelete
                id={attendeeToDelete}
                onClose={() => setAttendeeToDelete(null)}
                onConfirm={() => confirmDelete(attendeeToDelete)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   fetchAttendees,
//   deleteAttendee,
// } from "../../redux/slice/crm/attendeeSlice";
// import { toast } from "react-toastify";
// import "../../css/Table.css";
// import AttendeeDelete from "./AttendeeDelete";

// const AttendeeTable = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [attendeeToDelete, setAttendeeToDelete] = useState(null);

//   const { list: attendees = [], fetchError } = useSelector(
//     (state) => state.attendees || {}
//   );

//   useEffect(() => {
//     dispatch(fetchAttendees());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setAttendeeToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteAttendee(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Attendee deleted successfully!");
//         setAttendeeToDelete(null); // Close modal
//         dispatch(fetchAttendees()); // Refresh list
//       })
//       .catch((error) => {
//         toast.error(`Failed to delete attendee: ${error.message}`);
//       });
//   };

//   const filteredAttendees = attendees.filter((attendee) =>
//     attendee.attendee_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Attendee Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add Attendee</h5>
//                 </Link>
//                 <form
//                   onSubmit={(e) => e.preventDefault()}
//                   className="form-inline ml-3"
//                 >
//                   <div className="input-group">
//                     <input
//                       type="search"
//                       id="default-search"
//                       name="search_term"
//                       value={searchTerm}
//                       className="form-control"
//                       placeholder="Search attendees..."
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </nav>
//           <div className="card-body">
//             <div className="table-container">
//               {fetchError && <p className="text-danger">{fetchError}</p>}
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Purpose</th>
//                     <th>Organization Name</th>
//                     <th>Organization Detail</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAttendees.length > 0 ? (
//                     filteredAttendees.map((attendee, index) => (
//                       <tr key={`${attendee.id}-${index}`}>
//                         {" "}
//                         {/* Unique key */}
//                         {/* Unique key for each row */}
//                         <td>{index + 1}</td>
//                         <td>{attendee.attendee_name}</td>
//                         <td>{attendee.email}</td>
//                         <td>{attendee.pri_phone}</td>
//                         <td>{attendee.purpose}</td>
//                         <td>{attendee.organization_name}</td>
//                         <td>{attendee.organization_detail}</td>
//                         <td>
//                           <Link
//                             to={`/dashboard/crm/attendee/update/${attendee.id}`}
//                             className="btn btn-warning btn-sm"
//                           >
//                             Edit
//                           </Link>
//                           <Link
//                             to={`/dashboard/crm/attendee/detail/${attendee.id}`}
//                             className="btn btn-info btn-sm"
//                           >
//                             View
//                           </Link>
//                           <Link
//                             className="btn btn-danger btn-sm ml-2"
//                             onClick={() => handleDelete(attendee.id)}
//                           >
//                             Delete
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="text-center">
//                         No attendees found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {attendeeToDelete && (
//               <AttendeeDelete
//                 id={attendeeToDelete}
//                 onClose={() => setAttendeeToDelete(null)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendeeTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   fetchAttendees,
//   deleteAttendee,
// } from "../../redux/slice/crm/attendeeSlice";
// import { toast } from "react-toastify";
// import "../../css/Table.css";
// import AttendeeDelete from "./AttendeeDelete";

// const AttendeeTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [attendeeToDelete, setAttendeeToDelete] = useState(null);

//   // Access state from Redux
//   const updateStatus = useSelector((state) => state.attendees?.updateStatus);
//   const updateError = useSelector((state) => state.attendees?.updateError);

//   const fetchError = useSelector((state) => state.attendees.fetchError);
//   const {
//     list: attendees = [],
//     isLoading,
//     error,
//     deleteError,
//   } = useSelector((state) => state.attendees || {});

//   useEffect(() => {
//     dispatch(fetchAttendees());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setAttendeeToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteAttendee(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Attendee deleted successfully!");
//         setAttendeeToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchAttendees()); // Refresh the list only once
//       })
//       .catch((error) => {
//         toast.error(
//           `Failed to delete attendee: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };

//   const formatName = (attendee_name) => {
//     if (!attendee_name) return "";
//     return attendee_name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const sortedAttendees = [...attendees].sort((a, b) =>
//     a.attendee_name.localeCompare(b.attendee_name)
//   );

//   const filteredAttendees = sortedAttendees.filter((attendee) =>
//     attendee.attendee_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Attendee Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add Attendee</h5>
//                 </Link>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                   }}
//                   className="form-inline ml-3"
//                 >
//                   <div className="input-group">
//                     <input
//                       type="search"
//                       id="default-search"
//                       name="search_term"
//                       value={searchTerm}
//                       className="form-control"
//                       placeholder="Search attendees..."
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </nav>
//           <div className="card-body">
//             <div className="table-container">
//               {fetchError && <p className="text-danger">{fetchError}</p>}
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Purpose</th>
//                     <th>Organization Name</th>
//                     <th>Organization Detail</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAttendees.length > 0 ? (
//                     filteredAttendees.map((attendee, index) => (
//                       <tr key={attendee.id}>
//                         <td>{index + 1}</td>
//                         <td>{attendee.attendee_name}</td>
//                         <td>{attendee.email}</td>
//                         <td>{attendee.pri_phone}</td>
//                         <td>{attendee.purpose}</td>
//                         <td>{attendee.organization_name}</td>
//                         <td>{attendee.organization_detail}</td>
//                         <td>
//                           <Link
//                             to={`/dashboard/crm/attendee/update/${attendee.id}`}
//                             className="btn btn-warning btn-sm"
//                           >
//                             Edit
//                           </Link>
//                           <span></span>
//                           <Link
//                             to={`/dashboard/crm/attendee/detail/${attendee.id}`}
//                             className="btn btn-info btn-sm"
//                           >
//                             View
//                           </Link>
//                           <span></span>
//                           <Link
//                             className="btn btn-danger btn-sm ml-2"
//                             onClick={() => handleDelete(attendee.id)}
//                           >
//                             Delete
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="text-center">
//                         No attendees found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             {/* Delete Confirmation Modal */}
//             {attendeeToDelete !== null && (
//               <AttendeeDelete
//                 id={attendeeToDelete}
//                 onClose={() => setAttendeeToDelete(null)}
//                 onConfirm={() => confirmDelete(attendeeToDelete)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendeeTable;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   fetchAttendees,
//   deleteAttendee,
// } from "../../redux/slice/crm/attendeeSlice";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import "../../css/Table.css";

// const AttendeeTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [attendeeToDelete, setAttendeeToDelete] = useState(null);

//   // Access state from Redux
//   const updateStatus = useSelector((state) => state.attendees?.updateStatus);
//   const updateError = useSelector((state) => state.attendees?.updateError);

//   const fetchError = useSelector((state) => state.attendees.fetchError);
//   const {
//     list: attendees = [], // Default to empty array if undefined
//     isLoading,
//     error,
//     deleteError,
//   } = useSelector((state) => state.attendees || {});

//   // fetching attendees data from attendees list
//   useEffect(() => {
//     dispatch(fetchAttendees());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setAttendeeToDelete(id);
//     // Don't re-fetch attendees here, let the confirmation trigger it
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteAttendee(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Attendee deleted successfully!");
//         setAttendeeToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchAttendees()); // Refresh the list only once
//       })
//       .catch((error) => {
//         toast.error(
//           `Failed to delete attendee: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };

//   //--converting first letter  capital
//   const formatName = (attendee_name) => {
//     if (!attendee_name) return "";
//     return attendee_name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };
//   // Filter categories for search term
//   const filteredAttendees = attendees.filter((attendee) =>
//     attendee.attendee_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content-wrapper">
//       {/* <div className="col-mg-12"> */}
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Attendee Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add Attendee</h5>
//                 </Link>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                   }}
//                   className="form-inline ml-3"
//                 >
//                   <div className="input-group">
//                     <input
//                       type="search"
//                       id="default-search"
//                       name="search_term"
//                       value={searchTerm}
//                       className="form-control"
//                       placeholder="Search attendees..."
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </nav>
//           <div className="card-body">
//             <div className="table-container">
//               {fetchError && <p className="text-danger">{fetchError}</p>}
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>purpose</th>
//                     <th>Organization Name</th>
//                     <th>organization detail</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAttendees.length > 0 ? (
//                     filteredAttendees.map((attendee, index) => (
//                       <tr key={attendee.id}>
//                         <td>{index + 1}</td>
//                         <td>{attendee.attendee_name}</td>
//                         <td>{attendee.email}</td>
//                         <td>{attendee.pri_phone}</td>
//                         <td>{attendee.purpose}</td>
//                         <td>{attendee.organization_name}</td>
//                         <td>{attendee.organization_detail}</td>
//                         <td>
//                           <Link
//                             to={`/dashboard/crm/attendee/update/${attendee.id}`}
//                             className="btn btn-warning btn-sm"
//                           >
//                             Edit
//                           </Link>

//                           <span></span>
//                           <Link
//                             to={`/dashboard/crm/attendee/detail/${attendee.id}`}
//                             className="btn btn-info btn-sm"
//                           >
//                             View
//                           </Link>
//                           <span></span>
//                           <Link
//                             className="btn btn-danger btn-sm ml-2"
//                             onClick={() => handleDelete(attendee.id)}
//                           >
//                             Delete
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="text-center">
//                         No attendees found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default AttendeeTable;
