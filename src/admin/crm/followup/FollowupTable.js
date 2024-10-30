import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
import { toast } from "react-toastify";
import "../../css/Table.css";
import FollowDelete from "./FollowDelete";

const FollowTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [followToDelete, setFollowToDelete] = useState(null);
  const fetchError = useSelector((state) => state.follows?.fetchError);

  const {
    list: follows = [],
    isLoading,
    deleteError,
  } = useSelector((state) => state.follows || {});

  useEffect(() => {
    dispatch(fetchFollows());
  }, [dispatch]);

  const handleDelete = (id) => {
    setFollowToDelete(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteFollow(id))
      .unwrap()
      .then(() => {
        toast.success("Follow deleted successfully!");
        setFollowToDelete(null);
        dispatch(fetchFollows());
      })
      .catch((error) => {
        toast.error(
          `Failed to delete follow: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };

  // Format name for better readability
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Format date and time for better readability
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Highlight the nearest due date
  const getDueDateClass = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysDifference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (daysDifference <= 0) return "due-soon"; // Past due
    if (daysDifference <= 7) return "due-very-soon"; // Due within a week
    return "";
  };

  // Filter and sort follows by created date (latest first)
  const sortedFollows = follows
    .filter((follow) =>
      follow.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="card">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <h5 className="navbar-brand">Follow Table</h5>
              <div className="navbar-nav ml-auto">
                <Link to="create" className="nav-link btn btn-primary">
                  <h5>Add Follow</h5>
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
                      placeholder="Search follows..."
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
              {isLoading ? (
                <p>Loading...</p>
              ) : fetchError ? (
                <p className="text-danger">{fetchError}</p>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Follow by</th>
                      <th>Due Date</th>
                      <th>Remark</th>
                      <th>Notes</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedFollows.length > 0 ? (
                      sortedFollows.map((follow, index) => (
                        <tr key={follow.id}>
                          <td>{index + 1}</td>
                          <td>{follow.name}</td>
                          <td>{formatName(follow.follow_by)}</td>
                          <td className={getDueDateClass(follow.due_date)}>
                            {formatDateTime(follow.due_date)}
                          </td>
                          <td>{follow.remark}</td>
                          <td>{follow.notes}</td>
                          <td>{formatDateTime(follow.created)}</td>
                          <td>{formatDateTime(follow.updated)}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/crm/follow/update/${follow.id}`,
                                  {
                                    state: { follow },
                                  }
                                )
                              }
                              className="btn btn-warning btn-sm"
                            >
                              Edit
                            </button>
                            <span> </span>
                            <Link
                              to={`/dashboard/crm/follow/detail/${follow.id}`}
                              className="btn btn-info btn-sm"
                            >
                              View
                            </Link>
                            <span> </span>
                            <button
                              className="btn btn-danger btn-sm ml-2"
                              onClick={() => handleDelete(follow.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No follows found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {followToDelete && (
              <FollowDelete
                id={followToDelete}
                onClose={() => setFollowToDelete(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import "../../css/Table.css";

// const FollowTable = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);
//   const fetchError = useSelector((state) => state.follows?.fetchError);

//   const {
//     list: follows = [],
//     isLoading,
//     deleteError,
//   } = useSelector((state) => state.follows || {});

//   useEffect(() => {
//     dispatch(fetchFollows());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setFollowToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteFollow(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Follow deleted successfully!");
//         setFollowToDelete(null);
//         dispatch(fetchFollows());
//       })
//       .catch((error) => {
//         toast.error(
//           `Failed to delete follow: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };
//   const getDueDateClass = (dueDate) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const daysDifference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

//     if (daysDifference === 0) return "due-today"; // Add for today’s date
//     if (daysDifference < 0) return "due-soon"; // Past due
//     if (daysDifference <= 7) return "due-very-soon"; // Due within a week
//     return "";
//   };

//   // Format name for better readability
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Format date and time for better readability
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//   };

//   // Sort follows by created date (latest first)
//   const sortedFollows = follows
//     .filter((follow) =>
//       follow.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => new Date(b.created) - new Date(a.created));

//   // Highlight the nearest due date
//   const getDueDateClass = (dueDate) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const daysDifference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

//     if (daysDifference <= 0) return "due-soon"; // Past due
//     if (daysDifference <= 7) return "due-very-soon"; // Due within a week
//     return "";
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Follow Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add Follow</h5>
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
//                       placeholder="Search follows..."
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
//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : fetchError ? (
//                 <p className="text-danger">{fetchError}</p>
//               ) : (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Follow by</th>
//                       <th>Due Date</th>
//                       <th>Remark</th>
//                       <th>Notes</th>
//                       <th>Created</th>
//                       <th>Updated</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sortedFollows.length > 0 ? (
//                       sortedFollows.map((follow, index) => (
//                         <tr key={follow.id}>
//                           <td>{index + 1}</td>
//                           <td>{follow.name}</td>
//                           <td>{formatName(follow.follow_by)}</td>
//                           <td className={getDueDateClass(follow.due_date)}>
//                             {formatDateTime(follow.due_date)}
//                           </td>
//                           <td>{follow.remark}</td>
//                           <td>{follow.notes}</td>
//                           <td>{formatDateTime(follow.created)}</td>
//                           <td>{formatDateTime(follow.updated)}</td>
//                           <td>
//                             <Link
//                               to={`/dashboard/crm/follow/update/${follow.id}`}
//                               className="btn btn-warning btn-sm"
//                             >
//                               Edit
//                             </Link>
//                             <span> </span>
//                             <Link
//                               to={`/dashboard/crm/follow/detail/${follow.id}`}
//                               className="btn btn-info btn-sm"
//                             >
//                               View
//                             </Link>
//                             <span> </span>
//                             {/* <button
//                               className="btn btn-danger btn-sm ml-2"
//                               onClick={() => handleDelete(follow.id)}
//                             >
//                               Delete
//                             </button> */}

//                             <button
//                               className="btn btn-danger btn-sm ml-2"
//                               onClick={() => confirmDelete(follow.id)} // Call confirmDelete directly
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="9" className="text-center">
//                           No follows found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import "../../css/Table.css";

// const FollowTable = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);
//   const fetchError = useSelector((state) => state.follows?.fetchError);

//   const {
//     list: follows = [],
//     isLoading,
//     deleteError,
//   } = useSelector((state) => state.follows || {});

//   useEffect(() => {
//     dispatch(fetchFollows());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setFollowToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteFollow(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Follow deleted successfully!");
//         setFollowToDelete(null);
//         dispatch(fetchFollows());
//       })
//       .catch((error) => {
//         toast.error(
//           `Failed to delete follow: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };

//   // Format name for better readability
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Format date and time for better readability
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//   };

//   const filteredFollows = follows.filter((follow) =>
//     follow.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Follow Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add Follow</h5>
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
//                       placeholder="Search follows..."
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
//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : fetchError ? (
//                 <p className="text-danger">{fetchError}</p>
//               ) : (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>follow by</th>
//                       <th>Due Date</th>
//                       <th>Remark</th>
//                       <th>Notes</th>
//                       <th>Created</th>
//                       <th>Updated</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredFollows.length > 0 ? (
//                       filteredFollows.map((follow, index) => (
//                         <tr key={follow.id}>
//                           <td>{index + 1}</td>
//                           <td>{follow.name}</td>
//                           <td>{follow.follow_by}</td>
//                           <td>{formatDateTime(follow.due_date)}</td>
//                           <td>{follow.remark}</td>
//                           <td>{follow.notes}</td>
//                           <td>{formatDateTime(follow.created)}</td>
//                           <td>{formatDateTime(follow.updated)}</td>
//                           <td>
//                             <Link
//                               to={`/dashboard/crm/follow/update/${follow.id}`}
//                               className="btn btn-warning btn-sm"
//                             >
//                               Edit
//                             </Link>
//                             <span> </span>
//                             <Link
//                               to={`/dashboard/crm/follow/detail/${follow.id}`}
//                               className="btn btn-info btn-sm"
//                             >
//                               View
//                             </Link>
//                             <span> </span>
//                             <button
//                               className="btn btn-danger btn-sm ml-2"
//                               onClick={() => handleDelete(follow.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="8" className="text-center">
//                           No follows found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import "../../css/Table.css";

// const FollowTable = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);

//   // const updateStatus = useSelector((state) => state.follows?.updateStatus);
//   // const updateError = useSelector((state) => state.follows?.updateError);
//   const fetchError = useSelector((state) => state.follows?.fetchError);

//   const {
//     list: follows = [],
//     isLoading,
//     error,
//     deleteError,
//   } = useSelector((state) => state.follows || {});
//   console.log(follows);

//   useEffect(() => {
//     console.log("Dispatching fetchFollow...");
//     dispatch(fetchFollows());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setFollowToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteFollow(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Follow deleted successfully!");
//         setFollowToDelete(null);
//         dispatch(fetchFollows());
//       })
//       .catch((error) => {
//         toast.error(
//           `Failed to delete follow: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };

//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const filteredFollows = follows.filter((follow) =>
//     follow.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   // Debugging filteredFollows output:
//   console.log("Filtered follows:", filteredFollows);

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Follow Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add Follow</h5>
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
//                       placeholder="Search follows..."
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
//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : fetchError ? (
//                 <p className="text-danger">{fetchError}</p>
//               ) : (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>follow by</th>
//                       <th>Due Date</th>
//                       <th>Remark</th>
//                       <th>Notes</th>
//                       <th>Created</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredFollows.length > 0 ? (
//                       filteredFollows.map((follow, index) => (
//                         <tr key={follow.id}>
//                           <td>{index + 1}</td>
//                           <td>{follow.name}</td>
//                           <td>{formatName(follow.followup_by)}</td>
//                           <td>{follow.due_date}</td>
//                           <td>{follow.remark}</td>
//                           <td>{follow.notes}</td>
//                           <td>{follow.created}</td>
//                           {/* <td>{follow.updated}</td> */}
//                           <td>
//                             <Link
//                               to={`/dashboard/crm/follow/update/${follow.id}`}
//                               className="btn btn-warning btn-sm"
//                             >
//                               Edit
//                             </Link>
//                             <span> </span>
//                             <Link
//                               to={`/dashboard/crm/follow/detail/${follow.id}`}
//                               className="btn btn-info btn-sm"
//                             >
//                               View
//                             </Link>
//                             <span> </span>
//                             <button
//                               className="btn btn-danger btn-sm ml-2"
//                               onClick={() => handleDelete(follow.id)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="8" className="text-center">
//                           No follows found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowTable;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   fetchFollow,
//   deleteFollow,
//   fetchFollowById,
// } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import "../../css/Table.css";

// const FollowTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);

//   // Access state from Redux

//   const updateStatus = useSelector((state) => state.follows?.updateStatus);
//   const updateError = useSelector((state) => state.follows?.updateError);
//   const fetchError = useSelector((state) => state.follows?.fetchError);

//   const {
//     list: follows = [], // Default to empty array if undefined
//     isLoading,
//     error,
//     deleteError,
//   } = useSelector((state) => state.follows || {});

//   // fetching follows data from follows list
//   useEffect(() => {
//     dispatch(fetchFollow());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setFollowToDelete(id);
//     // Don't re-fetch follows here, let the confirmation trigger it
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteFollow(id))
//       .unwrap()
//       .then(() => {
//         toast.success("follow deleted successfully!");
//         setFollowToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchFollow()); // Refresh the list only once
//       })
//       .catch((error) => {
//         toast.error(
//           `Failed to delete follow: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };

//   //--converting first letter  capital
//   const formatName = (followup_by) => {
//     if (!followup_by) return "";
//     return followup_by
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };
//   // Filter categories for search term
//   const filteredfollows = follows.filter((follow) =>
//     follow.followup_by?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content-wrapper">
//       {/* <div className="col-mg-12"> */}
//       <div className="row justify-content-center">
//         <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">follow Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   <h5>Add follow</h5>
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
//                       placeholder="Search follows..."
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
//                     <th>due_date</th>
//                     <th>remark</th>
//                     <th>notes</th>
//                     <th>created</th>
//                     <th>updated</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredfollows.length > 0 ? (
//                     filteredfollows.map((follow, index) => (
//                       <tr key={follow.id}>
//                         <td>{index + 1}</td>
//                         <td>{follow.followup_by}</td>
//                         <td>{follow.due_date}</td>
//                         <td>{follow.remark}</td>
//                         <td>{follow.notes}</td>
//                         <td>{follow.created}</td>
//                         <td>{follow.updated}</td>
//                         <td>
//                           <Link
//                             to={`/dashboard/crm/follow/update/${follow.id}`}
//                             className="btn btn-warning btn-sm"
//                           >
//                             Edit
//                           </Link>

//                           <span></span>
//                           <Link
//                             to={`/dashboard/crm/follow/detail/${follow.id}`}
//                             className="btn btn-info btn-sm"
//                           >
//                             View
//                           </Link>
//                           <span></span>
//                           <button
//                             className="btn btn-danger btn-sm ml-2"
//                             onClick={() => handleDelete(follow.id)}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="text-center">
//                         No follows found.
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

// export default FollowTable;
