import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProvince,
  updateProvince,
  deleteProvince,
  fetchProvinces, // Import the delete action correctly
} from "../../redux/slice/base/provinceSlice";
import DeleteProvince from "./DeleteProvince";
import "../../../admin/css/table/Table.css"; // Make sure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const ProvinceList = () => {
  const [newProvinceName, setNewProvinceName] = useState("");
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [provinceToDelete, setProvinceToDelete] = useState(null);
  const dispatch = useDispatch();
  const { list, isLoading, error, deleteError } = useSelector(
    (state) => state.provinces
  );
  console.log(list);
  // Access updateStatus state property
  const updateStatus = useSelector((state) => state.provinces.updateStatus);
  const updateError = useSelector((state) => state.provinces.updateError);
  //
  //-----Fetching data from database o api call using fetchprovince  -------------
  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  // const handleAddprovince = () => {
  //   navigate("create");
  // };

  //-----update status toast--------
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("province updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update province: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, updateError]);

  //------------ this is filtered province name  in search table ---------
  useEffect(() => {
    if (searchTerm) {
      setFilteredProvinces(
        list.filter((province) =>
          province.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProvinces(list);
    }
  }, [searchTerm, list]);
  //----refresh table after delete the item from table ---
  useEffect(() => {
    // Refetch data after deletion or update
    if (provinceToDelete === null) {
      dispatch(fetchProvinces());
    }
  }, [provinceToDelete, dispatch]);
  //---to update item in a table --
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };
  //----to handle update item in province table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateProvince({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };
  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //--converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // delete province
  const handleDelete = (id) => {
    setProvinceToDelete(id); // Set the category ID to trigger the modal
  };
  // confirm delete
  const confirmDelete = (id) => {
    dispatch(deleteProvince(id))
      .unwrap()
      .then(() => {
        toast.success("category deleted successfully!");
        setProvinceToDelete(null); // Close the modal after successful deletion
        dispatch(fetchProvinces()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete category: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* <nav className="main-header navbar navbar-expand navbar-white navbar-light"> */}
            {/* <!-- Left navbar links --> */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                padding: 2,
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: 1,
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Province List
              </Typography>

              {/* Add Province Button */}
              <Link
                to="create"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Add Province
                </Button>
              </Link>

              {/* Search Bar */}
              <Box>
                <TextField
                  id="default-search"
                  name="search_term"
                  placeholder="Search..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
            {/* </nav> */}
            <div className="card-body">
              <div className="table-container">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProvinces.length > 0 ? (
                      filteredProvinces.map((province, index) => (
                        // {list.length > 0 ? (
                        //   list.map((province, index) => (
                        <tr key={province.id}>
                          <td>{index + 1}</td>
                          <td>
                            {editId === province.id ? (
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                              />
                            ) : (
                              formatName(province.name || "")
                            )}
                          </td>
                          <td>
                            {editId === province.id ? (
                              <button
                                onClick={handleUpdate}
                                className="btn btn-success"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleEdit(province.id, province.name || "")
                                }
                                className="btn btn-primary"
                              >
                                <FaEdit />
                              </button>
                            )}
                            <span> </span>
                            <button
                              onClick={() => handleDelete(province.id)}
                              className="btn btn-danger"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No provinces found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {provinceToDelete !== null && (
                <DeleteProvince
                  id={provinceToDelete}
                  onClose={() => setProvinceToDelete(null)}
                  onConfirm={() => confirmDelete(provinceToDelete)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {provinceToDelete !== null && (
        <deleteProvince
          id={provinceToDelete}
          onClose={() => setProvinceToDelete(null)}
        />
      )}
    </div>
  );
};

export default ProvinceList;

//2
// // // components/provinceList.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchprovince, updateprovince } from "../../redux/slice/provinceSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// import Deleteprovince from "./Deleteprovince"; // Adjust the path as needed
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../css/delete.css";
// const provinceList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.provinces);

//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredprovinces, setFilteredprovinces] = useState([]);
//   const [provinceToDelete, setprovinceToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchprovince());
//   }, [dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredprovinces(
//         list.filter((province) =>
//           province.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredprovinces(list);
//     }
//   }, [searchTerm, list]);

//   // useEffect(() => {
//   //   if (updateStatus === "succeeded") {
//   //     toast.success("province updated successfully!");
//   //   } else if (updateStatus === "failed") {
//   //     toast.error(
//   //       `Failed to update province: ${updateError || "Unknown error"}`
//   //     );
//   //   }
//   // }, [updateStatus, updateError]);

//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateprovince({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">province List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add province</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term"
//                         className="form-control"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="table-container">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredprovinces.length > 0 ? (
//                       filteredprovinces.map((province, index) => (
//                         <tr key={province.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === province.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(province.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === province.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(province.id, province.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <button
//                               onClick={() => setprovinceToDelete(province.id)}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No provinces found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {provinceToDelete !== null && (
//         <Deleteprovince
//           id={provinceToDelete}
//           onClose={() => setprovinceToDelete(null)}
//         />
//       )}

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default provinceList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchprovince, updateprovince } from "../../redux/slice/provinceSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// import Deleteprovince from "./Deleteprovince"; // Adjust the path as needed

// const provinceList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.provinces);

//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredprovinces, setFilteredprovinces] = useState([]);
//   const [provinceToDelete, setprovinceToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchprovince());
//   }, [dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredprovinces(
//         list.filter((province) =>
//           province.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredprovinces(list);
//     }
//   }, [searchTerm, list]);

//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateprovince({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">province List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add province</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term"
//                         className="form-control"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="table-container">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredprovinces.length > 0 ? (
//                       filteredprovinces.map((province, index) => (
//                         <tr key={province.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === province.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(province.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === province.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(province.id, province.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <button
//                               onClick={() => setprovinceToDelete(province.id)}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No provinces found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {provinceToDelete !== null && (
//         <Deleteprovince
//           id={provinceToDelete}
//           onClose={() => setprovinceToDelete(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default provinceList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchprovince,
//   updateprovince,
//   searchprovince,
// } from "../../redux/slice/provinceSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";

// const provinceList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.provinces);

//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredprovinces, setFilteredprovinces] = useState([]);

//   // Fetch provinces from backend on component mount
//   useEffect(() => {
//     dispatch(fetchprovince());
//   }, [dispatch]);

//   // Handle edit button click, enabling editing mode
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Handle save button click, updating province name
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateprovince({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };

//   // Filter provinces based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredprovinces(
//         list.filter((province) =>
//           province.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredprovinces(list);
//     }
//   }, [searchTerm, list]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Format province name with capitalization for each word
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Display loading or error message if applicable
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">province List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add province</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term"
//                         className="form-control"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="table-container">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredprovinces.length > 0 ? (
//                       filteredprovinces.map((province, index) => (
//                         <tr key={province.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === province.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(province.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === province.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(province.id, province.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <Link
//                               to={`delete/${province.id}`}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </Link>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No provinces found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default provinceList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchprovince, updateprovince } from "../../redux/slice/provinceSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// // import debounce from "lodash/debounce"; // If you installed lodash
// import { searchprovince } from "../../redux/slice/provinceSlice";

// const provinceList = () => {
//   const dispatch = useDispatch();
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   //fiter province for search item
//   const [filteredprovinces, setFilteredprovinces] = useState([]);
//   const { list, isLoading, error } = useSelector((state) => state.provinces);
//   // fetching data from backend
//   useEffect(() => {
//     dispatch(fetchprovince());
//   }, [dispatch]);

//   //editing data in a table
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };
//   //handling update in table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateprovince({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };
//   //search item  by filtering  live search
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredprovinces(
//         list.filter((province) =>
//           province.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredprovinces(list);
//     }
//   }, [searchTerm, list]);

//   //search handle
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   //name capitalized first word
//   // const formatName = (name) => {
//   //   if (!name) return "";
//   //   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
//   // };
//   //name capitalised of second Word
//   const formatName = (name) => {
//     if (!name) return "";

//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">province List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add province</h5>
//                   </Link>
//                   <form
//                     // onSubmit={handleSearchChange}
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term "
//                         className="form-control"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         // onChange={(e) => setSearchTerm(e.target.value)}
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="table-container">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredprovinces.length > 0 ? (
//                     filteredprovinces.map((province, index) => (
//                       <tr key={province.id}>
//                         <td>{index + 1}</td>
//                         <td>
//                           {editId === province.id ? (
//                             <input
//                               type="text"
//                               value={newName}
//                               onChange={(e) => setNewName(e.target.value)}
//                             />
//                           ) : (
//                             formatName(province.name)
//                           )}
//                         </td>
//                         <td>
//                           {editId === province.id ? (
//                             <button onClick={handleUpdate}>Save</button>
//                           ) : (
//                             <button
//                               onClick={() =>
//                                 handleEdit(province.id, province.name)
//                               }
//                             >
//                               <FaEdit />
//                             </button>
//                           )}
//                           <span> | </span>
//                           <Link
//                             to={`delete/${province.id}`}
//                             className="action-button delete"
//                           >
//                             <FaTrash style={{ cursor: "pointer" }} />
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3">No provinces found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default provinceList;

//   // Select state from Redux store
//   const {
//     list: provinces,
//     isLoading,
//     error,
//     createStatus,
//     createError,
//     updateStatus,
//     updateError,
//   } = useSelector((state) => state.provinces);

//   // Handle form submission
//   const handleAddProvince = (e) => {
//     e.preventDefault();
//     if (newProvinceName.trim() === "") {
//       alert("Please enter a valid province name");
//       return;
//     }
//     dispatch(createProvince({ name: newProvinceName.trim() }));
//     setNewProvinceName(""); // Clear input field after submission
//   };

//   // Fetch provinces when the component mounts
//   useEffect(() => {
//     dispatch(fetchProvince());
//   }, [dispatch]);

//   // Handle search functionality
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Show success or error messages based on status
//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Province created successfully!");
//       dispatch(fetchProvince());
//     } else if (createStatus === "failed") {
//       toast.error(`Error: ${createError?.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError, dispatch]);

//   // Update status toast
//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("Province updated successfully!");
//       setEditId(null); // Reset editId after successful update
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Failed to update province: ${updateError || "Unknown error"}`
//       );
//     }
//   }, [updateStatus, updateError]);

//   // Handle update item in the province table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null && newName.trim() !== "") {
//       dispatch(updateProvince({ id: editId, name: newName }));
//     } else {
//       toast.error("Please enter a valid name.");
//     }
//   };

//   // Handle deleting a province
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this province?")) {
//       dispatch(deleteProvince(id)); // Dispatch the delete action
//       setProvinceToDelete(null); // Reset the state
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Format name to capitalize first letter
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Filter provinces based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredProvinces(
//         provinces.filter((province) =>
//           province.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredProvinces(provinces);
//     }
//   }, [searchTerm, provinces]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row">
//         <div className="card">
//           <div className="card-header">
//             <h5 className="dashboard-title mx-20" style={{ color: "black" }}>
//               Province List
//             </h5>
//             <div className="text-right">
//               <form onSubmit={handleAddProvince} className="input-group">
//                 <input
//                   type="text"
//                   value={newProvinceName}
//                   onChange={(e) => setNewProvinceName(e.target.value)}
//                   placeholder="Enter province name"
//                   required
//                   aria-label="New Province Name"
//                 />
//                 <button type="submit" disabled={createStatus === "loading"}>
//                   {createStatus === "loading" ? "Adding..." : "Add Province"}
//                 </button>
//               </form>
//             </div>
//             <form className="form-inline ml-3">
//               <div className="input-group">
//                 <input
//                   type="search"
//                   id="default-search"
//                   name="search_term"
//                   className="form-control"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   required
//                 />
//                 <div className="input-group-append">
//                   <button type="submit" className="btn btn-info">
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>

//           <div className="card-body">
//             {isLoading ? (
//               <p>Loading provinces...</p>
//             ) : error ? (
//               <p className="error">
//                 Error: {error?.message || "An error occurred"}
//               </p>
//             ) : (
//               <div className="table-container">
//                 <div className="table-wrapper">
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProvinces.length > 0 ? (
//                         filteredProvinces.map((province, index) => (
//                           <tr key={province.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {editId === province.id ? (
//                                 <input
//                                   type="text"
//                                   value={newName}
//                                   onChange={(e) => setNewName(e.target.value)}
//                                 />
//                               ) : (
//                                 formatName(province.name)
//                               )}
//                             </td>
//                             <td>
//                               {editId === province.id ? (
//                                 <button
//                                   onClick={handleUpdate}
//                                   className="btn btn-success"
//                                 >
//                                   Save
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={() =>
//                                     handleEdit(province.id, province.name)
//                                   }
//                                   className="btn btn-primary"
//                                 >
//                                   <FaEdit />
//                                 </button>
//                               )}
//                               <span> </span>
//                               <button
//                                 onClick={() => handleDelete(province.id)} // Corrected delete handling
//                                 className="btn btn-danger"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="3">No provinces found</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProvinceList;
