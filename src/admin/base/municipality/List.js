import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMunicipalities,
  updateMunicipality,
  deleteMunicipality,
  updateStatus,
  updateError,
} from "../../redux/slice/base/municipalitySlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import DeleteMunicipality from "./Delete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const MunicipalityList = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalityToDelete, setMunicipalityToDelete] = useState(null);
  // Access updateStatus state property
  const updateStatus = useSelector(
    (state) => state.municipalities.updateStatus
  );
  const updateError = useSelector((state) => state.municipalities.updateError);
  const {
    list: municipalities,
    isLoading,
    error,
    deleteStatus,
    deleteError,
  } = useSelector((state) => state.municipalities);

  useEffect(() => {
    dispatch(fetchMunicipalities());
  }, [dispatch]);

  // To update item in the table
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  // Handle update item in Municipality table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateMunicipality({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };
  //-----update status toast--------
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("municipalities updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update municipalitie: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, updateError]);
  //--converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // Handle delete confirmation
  const handleDelete = (id) => {
    setMunicipalityToDelete(id); // Set the municipality ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteMunicipality(id))
      .unwrap()
      .then(() => {
        toast.success("Municipality deleted successfully!");
        setMunicipalityToDelete(null); // Close the modal after successful deletion
        dispatch(fetchMunicipalities()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete municipality: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };
  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      municipalities.map((municipality) => ({
        ID: municipality.id,
        Name: municipality.name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Municipalities");
    XLSX.writeFile(workbook, "municipalities.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Municipalities List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = municipalities.map((municipality) => [
      municipality.id,
      municipality.name,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("municipalities.pdf");
  };

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Municipality List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-primary">
                    <h5>Add Municipality</h5>
                  </Link>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSearchTerm(e.target.q.value);
                    }}
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      search
                      <input
                        type="search"
                        id="default-search"
                        name="search_term"
                        value={searchTerm}
                        className="form-control"
                        placeholder="Search Municipalities..."
                        onChange={handleSearchChange}
                        required
                      />
                      {/* <div className="input-group-append"> */}
                      {/* <button type="submit" className="btn btn-info">
                          Search
                        </button> */}
                      {/* </div> */}
                    </div>
                  </form>
                </div>

                {/* <div className="form-inline ml-4" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-30">
                    <li className="nav-item">
                      <button
                        id="municipalityTable"
                        className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                      >
                        <i className="fas fa-file-csv"></i>
                      </button>
                    </li>
                    {/* Add other export buttons here */}
                {/* </ul>
                </div>
              </div>
            </nav> */}
                <div className="form-inline ml-4" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-30">
                    <li className="nav-item">
                      <button
                        id="exportExcel"
                        className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                        onClick={exportToExcel}
                      >
                        Export Excel
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        id="exportPDF"
                        className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                        onClick={exportToPDF}
                      >
                        Export PDF
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error: {error}</p>
                        ) : (
                          // <div className="card-body">
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
                                {municipalities
                                  .filter((municipality) =>
                                    municipality.name
                                      .toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                                  )
                                  .map((municipality, index) => (
                                    <tr key={municipality.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {editId === municipality.id ? (
                                          <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) =>
                                              setNewName(e.target.value)
                                            }
                                          />
                                        ) : (
                                          formatName(municipality.name)
                                        )}
                                      </td>
                                      <td>
                                        {editId === municipality.id ? (
                                          <button
                                            onClick={handleUpdate}
                                            className="btn btn-success"
                                          >
                                            Save
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() =>
                                              handleEdit(
                                                municipality.id,
                                                municipality.name
                                              )
                                            }
                                            className="btn btn-primary"
                                          >
                                            <FaEdit />
                                          </button>
                                        )}
                                        <span> </span>
                                        <button
                                          onClick={() =>
                                            handleDelete(municipality.id)
                                          }
                                          className="btn btn-danger"
                                        >
                                          <FaTrash />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                          // </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            {municipalityToDelete !== null && (
              <DeleteMunicipality
                id={municipalityToDelete}
                onClose={() => setMunicipalityToDelete(null)}
                onConfirm={() => confirmDelete(municipalityToDelete)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MunicipalityList;

//2 import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMunicipality,
//   updateMunicipality,
//   deleteMunicipality,
// } from "../../redux/slice/municipalitySlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import DeleteMunicipality from "./Delete";

// const MunicipalityList = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector(
//     (state) => state.municipalities.updateStatus
//   ); // Corrected state access
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);

//   const {
//     list: municipalities,
//     isLoading,
//     error,
//   } = useSelector((state) => state.municipalities);

//   useEffect(() => {
//     dispatch(fetchMunicipality());
//   }, [dispatch]);

//   // To update item in the table
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Handle update item in Municipality table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateMunicipality({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };

//   // Handle delete confirmation
//   const handleDelete = (id) => {
//     setMunicipalityToDelete(id); // Update the state to show the modal
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Municipality List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Municipality</h5>
//                   </Link>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       setSearchTerm(e.target.q.value);
//                     }}
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Municipalities..."
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

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item">
//                       <button
//                         id="municipalityTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>

//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         {isLoading ? (
//                           <p>Loading...</p>
//                         ) : error ? (
//                           <p>Error: {error}</p>
//                         ) : (
//                           <table className="table table-bordered">
//                             <thead>
//                               <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {municipalities
//                                 .filter((municipality) =>
//                                   municipality.name
//                                     .toLowerCase()
//                                     .includes(searchTerm.toLowerCase())
//                                 )
//                                 .map((municipality, index) => (
//                                   <tr key={municipality.id}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                       {editId === municipality.id ? (
//                                         <input
//                                           type="text"
//                                           value={newName}
//                                           onChange={(e) =>
//                                             setNewName(e.target.value)
//                                           }
//                                         />
//                                       ) : (
//                                         municipality.name
//                                       )}
//                                     </td>
//                                     <td>
//                                       {editId === municipality.id ? (
//                                         <button
//                                           onClick={handleUpdate}
//                                           className="btn btn-success"
//                                         >
//                                           Save
//                                         </button>
//                                       ) : (
//                                         <button
//                                           onClick={() =>
//                                             handleEdit(
//                                               municipality.id,
//                                               municipality.name
//                                             )
//                                           }
//                                           className="btn btn-primary"
//                                         >
//                                           <FaEdit />
//                                         </button>
//                                       )}
//                                       <span> </span>
//                                       <button
//                                         onClick={() =>
//                                           handleDelete(municipality.id)
//                                         }
//                                         className="btn btn-danger"
//                                       >
//                                         <FaTrash />
//                                       </button>
//                                     </td>
//                                   </tr>
//                                 ))}
//                             </tbody>
//                           </table>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Delete Confirmation Modal */}
//             {municipalityToDelete !== null && (
//               <DeleteMunicipality
//                 id={municipalityToDelete}
//                 onClose={() => setMunicipalityToDelete(null)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MunicipalityList;

//v22 final
// import { toast } from "react-toastify";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMunicipality,
//   updateMunicipality,
//   deleteMunicipality,
// } from "../../redux/slice/municipalitySlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import DeleteMunicipality from "./Delete";

// const MunicipalityList = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector(
//     (state) => state.municipalities.updateStatus
//   ); // Corrected state access
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);

//   const {
//     list: municipalities,
//     isLoading,
//     error,
//   } = useSelector((state) => state.municipalities);

//   useEffect(() => {
//     dispatch(fetchMunicipality());
//   }, [dispatch]);

//   // To update item in the table
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Handle update item in Municipality table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateMunicipality({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };

//   // Handle delete confirmation
//   const handleDelete = (id) => {
//     setMunicipalityToDelete(id); // Set the municipality ID to trigger the modal
//   };
//   const confirmDelete = (id) => {
//     dispatch(deleteMunicipality(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Municipality deleted successfully!");
//         setMunicipalityToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchMunicipality()); // Refresh the list
//       })
//       .catch((error) => {
//         // Handle and log the error more robustly
//         console.error("Delete Error:", error);
//         toast.error(
//           `Failed to delete municipality: ${error.message || "Unknown error"}`
//         );
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Municipality List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Municipality</h5>
//                   </Link>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       setSearchTerm(e.target.q.value);
//                     }}
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Municipalities..."
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

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item">
//                       <button
//                         id="municipalityTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>

//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         {isLoading ? (
//                           <p>Loading...</p>
//                         ) : error ? (
//                           <p>Error: {error}</p>
//                         ) : (
//                           <table className="table table-bordered">
//                             <thead>
//                               <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {municipalities
//                                 .filter((municipality) =>
//                                   municipality.name
//                                     .toLowerCase()
//                                     .includes(searchTerm.toLowerCase())
//                                 )
//                                 .map((municipality, index) => (
//                                   <tr key={municipality.id}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                       {editId === municipality.id ? (
//                                         <input
//                                           type="text"
//                                           value={newName}
//                                           onChange={(e) =>
//                                             setNewName(e.target.value)
//                                           }
//                                         />
//                                       ) : (
//                                         municipality.name
//                                       )}
//                                     </td>
//                                     <td>
//                                       {editId === municipality.id ? (
//                                         <button
//                                           onClick={handleUpdate}
//                                           className="btn btn-success"
//                                         >
//                                           Save
//                                         </button>
//                                       ) : (
//                                         <button
//                                           onClick={() =>
//                                             handleEdit(
//                                               municipality.id,
//                                               municipality.name
//                                             )
//                                           }
//                                           className="btn btn-primary"
//                                         >
//                                           <FaEdit />
//                                         </button>
//                                       )}
//                                       <span> </span>
//                                       <button
//                                         onClick={() =>
//                                           handleDelete(municipality.id)
//                                         }
//                                         className="btn btn-danger"
//                                       >
//                                         <FaTrash />
//                                       </button>
//                                     </td>
//                                   </tr>
//                                 ))}
//                             </tbody>
//                           </table>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Delete Confirmation Modal */}
//             {municipalityToDelete !== null && (
//               <DeleteMunicipality
//                 id={municipalityToDelete}
//                 onClose={() => setMunicipalityToDelete(null)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MunicipalityList;

//v1
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMunicipality,
//   updateMunicipality,
//   deleteMunicipality,
// } from "../../redux/slice/municipalitySlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import DeleteMunicipality from "./Delete";

// const MunicipalityList = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector(
//     (state) => state.municipalities.updateStatus
//   ); // Corrected state access
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);
//   // const [searchTerm, setSearchTerm] = useState("");
//   const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
//   // const [municipalitieToDelete, setmunicipalitieToDelete] = useState(null);
//   const {
//     list: municipalities,
//     isLoading,
//     error,
//   } = useSelector((state) => state.municipalities);

//   useEffect(() => {
//     dispatch(fetchMunicipality());
//   }, [dispatch]);

//   // To update item in the table
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Handle update item in Municipality table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateMunicipality({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };
//   //--converting first letter  capital
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Handle delete confirmation
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this municipality?")) {
//       dispatch(deleteMunicipality(id));
//     }
//   };
//   //------------ this is filtered municipalitie name  in search table ---------
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredMunicipalities(
//         municipalities.filter((municipalitie) =>
//           municipalitie.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredMunicipalities(municipalities);
//     }
//   }, [searchTerm, municipalities]);
//   //----refresh table after delete the item from table ---
//   useEffect(() => {
//     // Refetch data after deletion or update
//     if (municipalityToDelete === null) {
//       dispatch(fetchMunicipality());
//     }
//   }, [municipalityToDelete, dispatch]);

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Municipality List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Municipality</h5>
//                   </Link>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       setSearchTerm(e.target.q.value);
//                     }}
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Municipalities..."
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

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item">
//                       <button
//                         id="municipalityTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>

//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         {isLoading ? (
//                           <p>Loading...</p>
//                         ) : error ? (
//                           <p>Error: {error}</p>
//                         ) : (
//                           <table className="table table-bordered">
//                             <thead>
//                               <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {/* {filteredMunicipalities
//                                 .filter((municipality) =>
//                                   municipality.name
//                                     .toLowerCase()
//                                     .includes(searchTerm.toLowerCase())
//                                 ) */}
//                                 {filteredMunicipalities.length > 0 ? (
//                       filteredMunicipalities.map((municipality, index) => (
//                                   <tr key={municipality.id}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                       {editId === municipality.id ? (
//                                         <input
//                                           type="text"
//                                           value={newName}
//                                           onChange={(e) =>
//                                             setNewName(e.target.value)
//                                           }
//                                         />
//                                       ) : (
//                                         formatName(municipality.name)
//                                       )}
//                                     </td>
//                                     <td>
//                                       {editId === municipality.id ? (
//                                         <button
//                                           onClick={handleUpdate}
//                                           className="btn btn-success"
//                                         >
//                                           Save
//                                         </button>
//                                       ) : (
//                                         <button
//                                           onClick={() =>
//                                             handleEdit(
//                                               municipality.id,
//                                               municipality.name
//                                             )
//                                           }
//                                           className="btn btn-primary"
//                                         >
//                                           <FaEdit />
//                                         </button>
//                                       )}
//                                       <span> </span>
//                                       <button
//                                         onClick={() =>
//                                           setMunicipalityToDelete(municipality.id)
//                                         }
//                                         className="btn btn-danger"
//                                       >
//                                         <FaTrash />
//                                       </button>
//                                     </td>
//                                   </tr>
//                                 ))
//                               ) : (
//                                 <tr>
//                                   <td colSpan="3">No municipalities found</td>
//                                 </tr>
//                               )}

//                             </tbody>
//                           </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             {/* Delete Confirmation Modal */}
//             {municipalityToDelete !== null && (
//               <DeleteMunicipality
//                 id={municipalityToDelete}
//                 onClose={() => setMunicipalityToDelete(null)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MunicipalityList;

//v2

{
  /* 
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   fetchMunicipality,
//   updateMunicipality,
//   deleteMunicipality,
// } from "../../redux/slice/municipalitySlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// // import "../../../admin/css/Table.css"; // Make sure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import { useState } from "react";

// const MunicipalityList = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector((state) => state.municipalities.updateStatus);
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);
//   const {
//     list: municipalities,
//     isLoading,
//     error,
//   } = useSelector((state) => state.municipalities);
//   useEffect(() => {
//     dispatch(fetchMunicipality());
//   }, [dispatch]);

//   //---to update item in a table --
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };
//   //----to handle update item in Municipality table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateMunicipality({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };
//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Municipality List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Municipality</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="search"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Mockups, Logos..."
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

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item">
//                       <button
//                         id="municipalityTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */
}
//                   </ul>
//                 </div>
//               </div>
//             </nav>

//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         {isLoading ? (
//                           <p>Loading...</p>
//                         ) : error ? (
//                           <p>Error: {error}</p>
//                         ) : (
//                           <table className="table table-bordered">
//                             <thead>
//                               <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Created</th>
//                                 <th>Updated</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {municipalities.length > 0 ? (
//                                 municipalities.map((municipality,index) => (
//                                   <tr key={municipality.id}>
//                                     <td>{index + 1} </td>
//                                     <td>{municipality.name}</td>
//                                     {/* <td>{municipality.created}</td> */}
//                                     {/* <td>{municipality.updated}</td> */}
//                                     {/* <td>
//                                       <Link to={`update/${municipality.id}`}>
//                                         <FaEdit />
//                                       </Link>
//                                       |
//                                       {/* <Link to={`detail/${municipality.id}`}>
//                                         View
//                                       </Link> */}

//                                     {/* <Link to={`delete/${municipality.id}`}>
//                                         <FaTrash />
//                                       </Link>
//                                     </td> */}
//                                     {/* <td> */}
//                                     <td>
//                             {editId === municipality.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(municipality.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === municipality.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(municipality.id, municipality.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <button
//                               onClick={() => setMunicipalityToDelete(municipality.id)}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No municipalities found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//         </div>

//       {/* Delete Confirmation Modal */}
//       {municipalityToDelete !== null && (
//         <DeleteMunicipality
//           id={municipalityToDelete}
//           onClose={() => setMunicipalityToDelete(null)}
//         />
//       )}
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default MunicipalityList;
