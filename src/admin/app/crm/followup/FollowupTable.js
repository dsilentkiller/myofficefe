import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchFollows, deleteFollow } from "../../../../redux/slice/admin/crm/followSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Button,
  IconButton,
  TextField,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import FollowDelete from "./FollowDelete";
import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
const FollowTable = ({ followId }) => {
  // sending followId to the FollowTable component because you want to display follow-up records related only to that specific enquir

  console.log("checkeeeeeeeeeeeeeeeeeeeeee", followId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [followToDelete, setFollowToDelete] = useState(null);
  const [filteredFollows, setFilteredFollows] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedRows, setExpandedRows] = useState({});

  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [searchTerm, setSearchTerm] = useState("");
  const [follows, setFollows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchError = useSelector((state) => state.follows?.fetchError);
  const {
    // list: follows = [],
    isLoading,
    deleteError,
  } = useSelector((state) => state.follows || {});

  useEffect(() => {
    dispatch(fetchFollows());
  }, [dispatch]);

  useEffect(() => {
    if (followId) {
      // Fetch follow-ups for the specific follow

      // dispatch(fetchFollowupByEnquiryId(followId));
      console.log("Fetching follow-ups for Enquiry ID:", followId);
    }
  }, [followId, dispatch]);
  // Filter follows by followId
  useEffect(() => {
    if (follows && followId) {
      const filtered = follows.filter(
        (follow) => follow.follow_id === followId
      );
      setFilteredFollows(filtered);
      console.log("filter data ....", filtered);
    }
  }, [follows, followId]);
  useEffect(() => {
    if (searchTerm) {
      setFilteredFollows(
        follows.filter((follow) =>
          follow.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredFollows(follows);
    }
  }, [searchTerm, follows]);

  const handleDelete = (id) => {
    setFollowToDelete(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteFollow(id))
      .unwrap()
      .then(() => {
        setFollowToDelete(null);
        dispatch(fetchFollows());
      })
      .catch((error) => {
        toast.error(
          `Failed to delete follow: ${error.message || deleteError || "Unknown error"
          }`
        );
      });
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const getDueDateClass = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysDifference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    if (daysDifference <= 0) return "due-soon";
    if (daysDifference <= 7) return "due-very-soon";
    return "";
  };

  const truncateNotes = (notes) => {
    if (notes && notes.length > 90) {
      return notes.substring(0, 90) + "...";
    }
    return notes;
  };
  const truncateRemark = (remark) => {
    if (remark && remark.length > 90) {
      return remark.substring(0, 90) + "...";
    }
    return remark;
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sorting logic for the customer name
  const sortedFollows = [...filteredFollows].sort((a, b) => {
    const nameA = (a?.customer_name || "").toLowerCase(); // Safe fallback to empty string if undefined or null
    const nameB = (b?.customer_name || "").toLowerCase(); // Same here
    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle expand/collapse for rows with the same customer name
  const handleExpandRow = (customerName) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [customerName]: !prevState[customerName],
    }));
  };
  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  //########### importing excel file #############
  const importExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const formattedRows = parsedData.map((row, index) => ({
        id: index + 1,
        name: row.Name || "Unknown",
        dueDate: row.DueDate || "2024-12-31",
        status: row.Status || "Pending",
      }));
      setFollows((prevRows) => [...prevRows, ...formattedRows]);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      importExcel(event);
      toast.success("Excel file imported successfully!");
    } else {
      toast.error("Please select a valid Excel file!");
    }
  };

  const importExcelHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Parsed Excel Data:", jsonData);
      // TODO: Dispatch to Redux or send to API for DB import
    };

    reader.readAsArrayBuffer(file);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };
  // export to excel;
  if (error) return <div>Error: {error}</div>;
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      follows.map((follow) => ({
        ID: follow.id,
        Name: follow.customer_name,

        category: follow.follow_by,
        due_date: follow.due_date,

        remark: follow.remark,

        notes: follow.notes,
        created: follow.created,

      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
    XLSX.writeFile(workbook, "follows.xlsx");
  };
  //export to pdf
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("follows List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = follows.map((follow) => [
      follow.id,
      follow.customer_name,

      follow.due_date,

      follow.remark,

      follow.notes,
      follow.created,

    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("follows.pdf");
  };
  console.log("*****", sortedFollows);

  return (
    <>


      <div className="card">


        <TableActionNavbar
          style={{ position: "relative", zIndex: 10, marginTop: 0 }}
          title="Enquiry List"
          addLink="create"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // handleSearchChange={handleSearchChange}
          handleFileChange={handleFileChange}
          onExportExcel={exportToExcel}
          onExportPDF={exportToPDF}
          onImportExcel={importExcelHandler}
        />


        <div className="card-body">
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 400, overflowX: "auto" }}
          >
            {isLoading && <p>Loading...</p>}
            {fetchError && (
              <p className="text-danger">
                {fetchError.detail || fetchError.message || "An error occurred."}
              </p>
            )}
            {!isLoading && !fetchError && (
              <Table aria-label="follow table" sx={{ minWidth: 650 }}>
                <TableHead
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                      Name
                      <Tooltip title="Sort">
                        <IconButton onClick={toggleSortOrder}>
                          {sortOrder === "asc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Follow by</TableCell>
                    <TableCell>Next Follow Up Date</TableCell>
                    <TableCell>Last Followup At</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedFollows.length > 0 ? (
                    sortedFollows.map((follow, index) => {
                      const isExpanded = expandedRows[follow.customer_name];
                      return (
                        <React.Fragment key={follow.id}>
                          {/* Toggle Row */}
                          {index === 0 ||
                            sortedFollows[index - 1].customer_name !==
                            follow.customer_name ? (
                            <>
                              <TableRow
                                onClick={() =>
                                  handleExpandRow(follow.customer_name)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <TableCell
                                  colSpan={8}
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {follow.customer_name} {isExpanded ? "▲" : "▼"}
                                </TableCell>
                              </TableRow>
                              {isExpanded &&
                                sortedFollows
                                  .filter(
                                    (f) =>
                                      f.customer_name === follow.customer_name
                                  )
                                  .map((followItem, subIndex) => (
                                    <TableRow key={followItem.id}>
                                      <TableCell>{subIndex + 1}</TableCell>
                                      <TableCell>
                                        {followItem.customer_name}
                                      </TableCell>
                                      <TableCell>
                                        {formatName(followItem.follow_by)}
                                      </TableCell>
                                      <TableCell
                                        className={getDueDateClass(
                                          followItem.due_date
                                        )}
                                      >
                                        {formatDateTime(followItem.due_date)}
                                      </TableCell>
                                      <TableCell>
                                        {formatDateTime(followItem.created)}
                                      </TableCell>
                                      <TableCell>
                                        {truncateRemark(followItem.remark)}
                                      </TableCell>
                                      <TableCell>
                                        {truncateNotes(followItem.notes)}
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="outlined"
                                          color="warning"
                                          onClick={() =>
                                            navigate(
                                              `/dashboard/crm/follow/update/${followItem.id}`
                                            )
                                          }
                                          size="small"
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          color="info"
                                          onClick={() =>
                                            navigate(
                                              `/dashboard/crm/follow/detail/${followItem.id}`
                                            )
                                          }
                                          size="small"
                                        >
                                          View
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          color="error"
                                          onClick={() =>
                                            handleDelete(followItem.id)
                                          }
                                          size="small"
                                        >
                                          Delete
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                            </>
                          ) : null}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan="8" align="center">
                        No follows found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {followToDelete && (
            <FollowDelete
              id={followToDelete}
              onClose={() => setFollowToDelete(null)}
            />
          )}
        </div>
      </div>

    </>
  );
};

export default FollowTable;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Tooltip,
//   Toolbar,Typography
// } from "@mui/material";
// import { ArrowUpward, ArrowDownward , Add as AddIcon,} from "@mui/icons-material";
// import FollowDelete from "./FollowDelete";
// import { AppBar,TextField, Button, IconButton } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";

// const FollowTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);
//   const [filteredFollows, setFilteredFollows] = useState([]);
//   const [sortOrder, setSortOrder] = useState("asc");

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

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//   };

//   const getDueDateClass = (dueDate) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const daysDifference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

//     if (daysDifference <= 0) return "due-soon";
//     if (daysDifference <= 7) return "due-very-soon";
//     return "";
//   };

//   const truncateRemark = (remark) => {
//     if (remark && remark.length > 90) {
//       return remark.substring(0, 90) + "...";
//     }
//     return remark;
//   };

//   const truncateNotes = (notes) => {
//     if (notes && notes.length > 90) {
//       return notes.substring(0, 90) + "...";
//     }
//     return notes;
//   };

//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredFollows(
//         follows.filter((follow) =>
//           follow.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredFollows(follows);
//     }
//   }, [searchTerm, follows]);

//   const sortFollows = () => {
//     const sortedFollows = [...filteredFollows].sort((a, b) => {
//       const nameA = a.customer_name.toLowerCase();
//       const nameB = b.customer_name.toLowerCase();
//       if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
//       if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });
//     setFilteredFollows(sortedFollows);
//   };

//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     sortFollows();
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="card">
//           {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//               <h5 className="navbar-brand">Follow Table</h5>
//               <div className="navbar-nav ml-auto">
//                 <Link to="create" className="nav-link btn btn-primary">
//                   Add Follow
//                 </Link>
//                 <TextField
//                   label="Search follows..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   className="ml-3"
//                 />
//               </div>
//             </div>
//           </nav> */}
//     <AppBar position="static" color="gray">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Follow Table
//         </Typography>
//         <div className="navbar-nav ml-auto">
//                     <Button
//                           variant="contained"
//                           color="primary"
//                           startIcon={<AddIcon />}
//                           component={Link}
//                           to="create"
//                           sx={{ marginRight: 2 }}
//                         >
//                           Add Followup
//                         </Button>
//                   </div>
//         <TextField
//           label="Search follows..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           variant="outlined"
//           size="small"
//           sx={{ backgroundColor: "white", marginRight: 2 ,width: 250 }}
//           InputProps={{
//                         endAdornment: (
//                           <IconButton>
//                             <SearchIcon />
//                           </IconButton>
//                         ),
//                       }}
//         />

//       </Toolbar>
//     </AppBar>

//           <div className="card-body">
//             <TableContainer component={Paper}>
//               {isLoading && <p>Loading...</p>}
//               {fetchError && <p className="text-danger">{fetchError}</p>}
//               {!isLoading && !fetchError && (
//                 <Table aria-label="follow table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>#</TableCell>
//                       <TableCell>
//                         Name
//                         <Tooltip title="Sort">
//                           <IconButton onClick={toggleSortOrder}>
//                             {sortOrder === "asc" ? (
//                               <ArrowDownward />
//                             ) : (
//                               <ArrowUpward />
//                             )}
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell>Follow by</TableCell>
//                       <TableCell>Next Follow Up Date</TableCell>
//                       <TableCell>Last Followup At</TableCell>
//                       <TableCell>Remark</TableCell>
//                       <TableCell>Notes</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredFollows.length > 0 ? (
//                       filteredFollows.map((follow, index) => (
//                         <TableRow key={follow.id}>
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell>{follow.customer_name}</TableCell>
//                           <TableCell>{formatName(follow.follow_by)}</TableCell>
//                           <TableCell
//                             className={getDueDateClass(follow.due_date)}
//                           >
//                             {formatDateTime(follow.due_date)}
//                           </TableCell>
//                           <TableCell>{formatDateTime(follow.created)}</TableCell>
//                           <TableCell>{truncateRemark(follow.remark)}</TableCell>
//                           <TableCell>{truncateNotes(follow.notes)}</TableCell>
//                           <TableCell>
//                             <Button
//                               variant="outlined"
//                               color="warning"
//                               onClick={() =>
//                                 navigate(
//                                   `/dashboard/crm/follow/update/${follow.id}`,
//                                   { state: { follow } }
//                                 )
//                               }
//                               size="small"
//                             >
//                               Edit
//                             </Button>
//                             <Button
//                               variant="outlined"
//                               color="info"
//                               onClick={() =>
//                                 navigate(`/dashboard/crm/follow/detail/${follow.id}`)
//                               }
//                               size="small"
//                             >
//                               View
//                             </Button>
//                             <Button
//                               variant="outlined"
//                               color="error"
//                               onClick={() => handleDelete(follow.id)}
//                               size="small"
//                             >
//                               Delete
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan="8" align="center">
//                           No follows found.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               )}
//             </TableContainer>
//             {followToDelete && (
//               <FollowDelete
//                 id={followToDelete}
//                 onClose={() => setFollowToDelete(null)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowTable;

//old fine working table

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import "../../css/Table.css";
// import FollowDelete from "./FollowDelete";

// const FollowTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);
//   const [filteredFollows, setFilteredFollows] = useState([]);

//   const fetchError = useSelector((state) => state.follows?.fetchError);
//   const maxRemarkLength = 90; // Maximum characters to show for remark
//   const maxNotesLength = 90;
//   const {
//     list: follows = [],
//     isLoading,
//     deleteError,
//   } = useSelector((state) => state.follows || {});

//   useEffect(() => {
//     dispatch(fetchFollows());
//     console.log(follows);
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setFollowToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteFollow(id))
//       .unwrap()
//       .then(() => {
//         // toast.success("Follow deleted successfully!");
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

//   // Highlight the nearest due date
//   const getDueDateClass = (dueDate) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const daysDifference = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

//     if (daysDifference <= 0) return "due-soon"; // Past due
//     if (daysDifference <= 7) return "due-very-soon"; // Due within a week
//     return "";
//   };
//   // Truncate the remark text to maxremarkLength
//   const truncateRemark = (remark) => {
//     if (remark && remark.length > maxRemarkLength) {
//       return remark.substring(0, maxRemarkLength) + "..."; // Add ellipsis
//     }
//     return remark;
//   };

//   //
//   // Truncate the notes text to maxnotesLength
//   const truncateNotes = (notes) => {
//     if (notes && notes.length > maxNotesLength) {
//       return notes.substring(0, maxNotesLength) + "..."; // Add ellipsis
//     }
//     return notes;
//   };

//   useEffect(() => {
//     //live search handling
//     if (searchTerm) {
//       setFilteredFollows(
//         follows.filter((follow) =>
//           follow.follow_id.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredFollows(follows);
//     }
//   }, [searchTerm, follows]);

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
//               {isLoading && <p>Loading...</p>}
//               {fetchError && <p className="text-danger">{fetchError}</p>}
//               {!isLoading && !fetchError && (
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Follow by</th>
//                       <th>next follow up date</th>
//                       <th>last followup at</th>
//                       <th>Remark</th>
//                       <th>Notes</th>

//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredFollows.length > 0 ? (
//                       filteredFollows.map((follow, index) => (
//                         <tr key={follow.id}>
//                           <td>{index + 1}</td>
//                           <td>{follow.customer_name}</td>
//                           <td>{formatName(follow.follow_by)}</td>
//                           <td className={getDueDateClass(follow.due_date)}>
//                             {formatDateTime(follow.due_date)}
//                           </td>
//                           <td>{formatDateTime(follow.created)}</td>
//                           <td>{truncateRemark(follow.remark)}</td>
//                           <td>{truncateNotes(follow.notes)}</td>

//                           <td>
//                             <button
//                               onClick={() =>
//                                 navigate(
//                                   `/dashboard/crm/follow/update/${follow.id}`,
//                                   {
//                                     state: { follow },
//                                   }
//                                 )
//                               }
//                               className="btn btn-warning btn-sm"
//                             >
//                               Edit
//                             </button>
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
//                         <td colSpan="9" className="text-center">
//                           No follows found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//             {followToDelete && (
//               <FollowDelete
//                 id={followToDelete}
//                 onClose={() => setFollowToDelete(null)}
//               />
//             )}
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
//   const FilteredFollows = follows
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
//                     {ilteredFollows.length > 0 ? (
//                       FilteredFollows.map((follow, index) => (
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
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchFollows, deleteFollow } from "../../redux/slice/crm/followSlice";
// import { toast } from "react-toastify";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Tooltip,
//   Button,
//   IconButton,
//   TextField,
//   AppBar,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { ArrowUpward, ArrowDownward, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
// import FollowDelete from "./FollowDelete";
// const FollowTable = ({ followId }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [followToDelete, setFollowToDelete] = useState(null);
//   const [filteredFollows, setFilteredFollows] = useState([]);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [expandedRows, setExpandedRows] = useState({});

//   const fetchError = useSelector((state) => state.follows?.fetchError);
//   const { list: follows = [], isLoading, deleteError } = useSelector((state) => state.follows || {});

//   useEffect(() => {
//     dispatch(fetchFollows());
//   }, [dispatch]);

//   // Filter follows by followId
//   useEffect(() => {
//     if (follows && followId) {
//       const filtered = follows.filter(follow => follow.follow_id === followId);
//       setFilteredFollows(filtered);
//     }
//   }, [follows, followId]);

//   // Sorting logic for the customer name
//   const sortedFollows = [...filteredFollows].sort((a, b) => {
//     const nameA = a.customer_name.toLowerCase();
//     const nameB = b.customer_name.toLowerCase();
//     if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
//     if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });

//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   const handleExpandRow = (customerName) => {
//     setExpandedRows((prevState) => ({
//       ...prevState,
//       [customerName]: !prevState[customerName],
//     }));
//   };

//   return (
//     <div className="content-wrapper">
//       <TableContainer component={Paper} sx={{ maxHeight: 400, overflowX: "auto" }}>
//         {isLoading && <p>Loading...</p>}
//         {fetchError && <p className="text-danger">{fetchError}</p>}
//         {!isLoading && !fetchError && (
//           <Table aria-label="follow table" sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>#</TableCell>
//                 <TableCell>
//                   Name
//                   <Tooltip title="Sort">
//                     <IconButton onClick={toggleSortOrder}>
//                       {sortOrder === "asc" ? <ArrowDownward /> : <ArrowUpward />}
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//                 <TableCell>Follow by</TableCell>
//                 <TableCell>Next Follow Up Date</TableCell>
//                 <TableCell>Last Followup At</TableCell>
//                 <TableCell>Remark</TableCell>
//                 <TableCell>Notes</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sortedFollows.length > 0 ? (
//                 sortedFollows.map((follow, index) => {
//                   const isExpanded = expandedRows[follow.customer_name];
//                   return (
//                     <React.Fragment key={follow.id}>
//                       {/* Toggle Row */}
//                       {index === 0 || sortedFollows[index - 1].customer_name !== follow.customer_name ? (
//                         <>
//                           <TableRow onClick={() => handleExpandRow(follow.customer_name)} style={{ cursor: "pointer" }}>
//                             <TableCell colSpan={8} sx={{ fontWeight: "bold" }}>
//                               {follow.customer_name} {isExpanded ? "▲" : "▼"}
//                             </TableCell>
//                           </TableRow>
//                           {isExpanded &&
//                             sortedFollows
//                               .filter((f) => f.customer_name === follow.customer_name)
//                               .map((followItem, subIndex) => (
//                                 <TableRow key={followItem.id}>
//                                   <TableCell>{subIndex + 1}</TableCell>
//                                   <TableCell>{followItem.customer_name}</TableCell>
//                                   <TableCell>{followItem.follow_by}</TableCell>
//                                   <TableCell>{followItem.due_date}</TableCell>
//                                   <TableCell>{followItem.created}</TableCell>
//                                   <TableCell>{followItem.remark}</TableCell>
//                                   <TableCell>{followItem.notes}</TableCell>
//                                   <TableCell>
//                                     <Button variant="outlined" color="warning" onClick={() => navigate(`/dashboard/crm/follow/update/${followItem.id}`)} size="small">
//                                       Edit
//                                     </Button>
//                                     <Button variant="outlined" color="info" onClick={() => navigate(`/dashboard/crm/follow/detail/${followItem.id}`)} size="small">
//                                       View
//                                     </Button>
//                                     {/* <Button variant="outlined" color="error" onClick={() => handleDelete(followItem.id)} size="small"> */}
//                                       {/* Delete
//                                     </Button> */}
//                                   </TableCell>
//                                 </TableRow>
//                               ))}
//                         </>
//                       ) : null}
//                     </React.Fragment>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan="8" align="center">
//                     No follow-ups found for this follow.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         )}
//       </TableContainer>
//     </div>
//   );
// };

// export default FollowTable;
