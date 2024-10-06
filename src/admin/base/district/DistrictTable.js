import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDistricts,
  updateDistrict,
  updateError,
  updateStatus,
} from "../../redux/slice/base/districtSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../../admin/css/Table.css";
import DeleteDistrict from "./DeleteDistrict"; // Adjust the path as need

const DistrictList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.districts);
  console.log(list);
  // Access updateStatus state property
  const updateStatus = useSelector((state) => state.districts.updateStatus);
  const updateError = useSelector((state) => state.districts.updateError);
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [districtToDelete, setDistrictToDelete] = useState(null);
  // const navigate = useNavigate();
  //-----Fetching data from database o api call using fetchDistrict  -------------
  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

  // const handleAddDistrict = () => {
  //   navigate("create");
  // };

  //-----update status toast--------
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("District updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update district: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, updateError]);

  //------------ this is filtered district name  in search table ---------
  useEffect(() => {
    if (searchTerm) {
      setFilteredDistricts(
        list.filter((district) =>
          district.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDistricts(list);
    }
  }, [searchTerm, list]);
  //----refresh table after delete the item from table ---
  useEffect(() => {
    // Refetch data after deletion or update
    if (districtToDelete === null) {
      dispatch(fetchDistricts());
    }
  }, [districtToDelete, dispatch]);
  //---to update item in a table --
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };
  //----to handle update item in district table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateDistrict({ id: editId, name: newName }));
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">District List</h5>
                <div className="navbar-nav ml-auto">
                  <Link
                    to="create"
                    className="nav-link btn btn-primary"
                    // onClick={handleAddDistrict}
                  >
                    <h5>Add District</h5>
                  </Link>
                  <form className="form-inline ml-3">
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="search_term"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        required
                      />
                      {/* <div className="input-group-append">
                        <button type="submit" className="btn btn-info">
                          Search
                        </button>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </nav>
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
                    {filteredDistricts.length > 0 ? (
                      filteredDistricts.map((district, index) => (
                        <tr key={district.id}>
                          <td>{index + 1}</td>
                          <td>
                            {editId === district.id ? (
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                              />
                            ) : (
                              formatName(district.name)
                            )}
                          </td>
                          <td>
                            {editId === district.id ? (
                              <button
                                onClick={handleUpdate}
                                className="btn btn-success"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleEdit(district.id, district.name)
                                }
                                className="btn btn-primary"
                              >
                                <FaEdit />
                              </button>
                            )}
                            <span> </span>
                            <button
                              onClick={() => setDistrictToDelete(district.id)}
                              className="btn btn-danger"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No districts found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {districtToDelete !== null && (
        <DeleteDistrict
          id={districtToDelete}
          onClose={() => setDistrictToDelete(null)}
        />
      )}
    </div>
  );
};

export default DistrictList;

//2
// // // components/DistrictList.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDistrict, updateDistrict } from "../../redux/slice/districtSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// import DeleteDistrict from "./DeleteDistrict"; // Adjust the path as needed
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../css/delete.css";
// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.districts);

//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const [districtToDelete, setDistrictToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchDistrict());
//   }, [dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredDistricts(
//         list.filter((district) =>
//           district.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredDistricts(list);
//     }
//   }, [searchTerm, list]);

//   // useEffect(() => {
//   //   if (updateStatus === "succeeded") {
//   //     toast.success("District updated successfully!");
//   //   } else if (updateStatus === "failed") {
//   //     toast.error(
//   //       `Failed to update district: ${updateError || "Unknown error"}`
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
//       dispatch(updateDistrict({ id: editId, name: newName }));
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
//                 <h5 className="navbar-brand">District List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add District</h5>
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
//                     {filteredDistricts.length > 0 ? (
//                       filteredDistricts.map((district, index) => (
//                         <tr key={district.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === district.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(district.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === district.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(district.id, district.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <button
//                               onClick={() => setDistrictToDelete(district.id)}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No districts found</td>
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
//       {districtToDelete !== null && (
//         <DeleteDistrict
//           id={districtToDelete}
//           onClose={() => setDistrictToDelete(null)}
//         />
//       )}

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default DistrictList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDistrict, updateDistrict } from "../../redux/slice/districtSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// import DeleteDistrict from "./DeleteDistrict"; // Adjust the path as needed

// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.districts);

//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const [districtToDelete, setDistrictToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchDistrict());
//   }, [dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredDistricts(
//         list.filter((district) =>
//           district.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredDistricts(list);
//     }
//   }, [searchTerm, list]);

//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateDistrict({ id: editId, name: newName }));
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
//                 <h5 className="navbar-brand">District List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add District</h5>
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
//                     {filteredDistricts.length > 0 ? (
//                       filteredDistricts.map((district, index) => (
//                         <tr key={district.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === district.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(district.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === district.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(district.id, district.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <button
//                               onClick={() => setDistrictToDelete(district.id)}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No districts found</td>
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
//       {districtToDelete !== null && (
//         <DeleteDistrict
//           id={districtToDelete}
//           onClose={() => setDistrictToDelete(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default DistrictList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDistrict,
//   updateDistrict,
//   searchDistrict,
// } from "../../redux/slice/districtSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";

// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.districts);

//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDistricts, setFilteredDistricts] = useState([]);

//   // Fetch districts from backend on component mount
//   useEffect(() => {
//     dispatch(fetchDistrict());
//   }, [dispatch]);

//   // Handle edit button click, enabling editing mode
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Handle save button click, updating district name
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateDistrict({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };

//   // Filter districts based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredDistricts(
//         list.filter((district) =>
//           district.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredDistricts(list);
//     }
//   }, [searchTerm, list]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Format district name with capitalization for each word
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
//                 <h5 className="navbar-brand">District List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add District</h5>
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
//                     {filteredDistricts.length > 0 ? (
//                       filteredDistricts.map((district, index) => (
//                         <tr key={district.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === district.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(district.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === district.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(district.id, district.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <Link
//                               to={`delete/${district.id}`}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </Link>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No districts found</td>
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

// export default DistrictList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDistrict, updateDistrict } from "../../redux/slice/districtSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// // import debounce from "lodash/debounce"; // If you installed lodash
// import { searchDistrict } from "../../redux/slice/districtSlice";

// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   //fiter district for search item
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const { list, isLoading, error } = useSelector((state) => state.districts);
//   // fetching data from backend
//   useEffect(() => {
//     dispatch(fetchDistrict());
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
//       dispatch(updateDistrict({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };
//   //search item  by filtering  live search
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredDistricts(
//         list.filter((district) =>
//           district.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredDistricts(list);
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
//                 <h5 className="navbar-brand">District List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add district</h5>
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
//                   {filteredDistricts.length > 0 ? (
//                     filteredDistricts.map((district, index) => (
//                       <tr key={district.id}>
//                         <td>{index + 1}</td>
//                         <td>
//                           {editId === district.id ? (
//                             <input
//                               type="text"
//                               value={newName}
//                               onChange={(e) => setNewName(e.target.value)}
//                             />
//                           ) : (
//                             formatName(district.name)
//                           )}
//                         </td>
//                         <td>
//                           {editId === district.id ? (
//                             <button onClick={handleUpdate}>Save</button>
//                           ) : (
//                             <button
//                               onClick={() =>
//                                 handleEdit(district.id, district.name)
//                               }
//                             >
//                               <FaEdit />
//                             </button>
//                           )}
//                           <span> | </span>
//                           <Link
//                             to={`delete/${district.id}`}
//                             className="action-button delete"
//                           >
//                             <FaTrash style={{ cursor: "pointer" }} />
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3">No districts found</td>
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

// export default DistrictList;
