import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistrict, updateDistrict } from "../../redux/slice/districtSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../../admin/css/Table.css";
// import debounce from "lodash/debounce"; // If you installed lodash
import { searchDistrict } from "../../redux/slice/districtSlice";

const DistrictList = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //fiter district for search item
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const { list, isLoading, error } = useSelector((state) => state.districts);
  // fetching data from backend
  useEffect(() => {
    dispatch(fetchDistrict());
  }, [dispatch]);

  //editing data in a table
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };
  //handling update in table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateDistrict({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };
//search item  by filtering  live search
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
 


  //search handle
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  //name capitalized
  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
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
                  <Link to="create" className="nav-link btn btn-info">
                    <h5>Add district</h5>
                  </Link>
                  <form
                    // onSubmit={handleSearchChange}
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="search_term "
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        required
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-info">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
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
                  {list.length > 0 ? (
                    list.map((district, index) => (
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
                            district.name
                          )}
                        </td>
                        <td>
                          {editId === district.id ? (
                            <button onClick={handleUpdate}>Save</button>
                          ) : (
                            <button
                              onClick={() =>
                                handleEdit(district.id, district.name)
                              }
                            >
                              <FaEdit />
                            </button>
                          )}
                          <span> | </span>
                          <Link
                            to={`delete/${district.id}`}
                            className="action-button delete"
                          >
                            <FaTrash style={{ cursor: "pointer" }} />
                          </Link>
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
  );
};

export default DistrictList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDistrict, searchDistrict } from "../../redux/slice/districtSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// import debounce from "lodash/debounce"; // If you installed lodash

// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const { list, isLoading, error } = useSelector((state) => state.districts);

//   // Debounced search
//   const debouncedSearch = debounce((term) => {
//     dispatch(searchDistrict(term));
//   }, 500); // Adjust delay as needed

//   useEffect(() => {
//     if (searchTerm) {
//       debouncedSearch(searchTerm);
//     } else {
//       dispatch(fetchDistrict());
//     }
//   }, [searchTerm, dispatch]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     debouncedSearch(searchTerm);
//   };

//   const formatName = (name) => {
//     if (!name) return "";
//     return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
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
//                   <form onSubmit={handleSearch} className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term "
//                         className="form-control"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
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
//                   {list.length > 0 ? (
//                     list.map((district, index) => (
//                       <tr key={district.id}>
//                         <td>{index + 1}</td>
//                         <td>{formatName(district.name)}</td>
//                         <td>
//                           <Link
//                             to={`update/${district.id}`}
//                             className="action-button edit"
//                           >
//                             <FaEdit />
//                           </Link>
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
