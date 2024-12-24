import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMunicipalities,
  updateMunicipality,
  deleteMunicipality,
} from "../../redux/slice/base/municipalitySlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteMunicipality from "./Delete";
import { toast } from "react-toastify";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { fetchDistricts } from "../../redux/slice/base/districtSlice";
// import { fetchdistricts } from "../../redux/slice/base/districtSlice";

import "../../../admin/css/Table.css";
// import DeleteDistrict from "./DeleteDistrict"; // Adjust the path as needed

const MunicipalityTable = () => {
  const dispatch = useDispatch();
  const {
    list: municipalities,

    deleteError,
  } = useSelector((state) => state.municipalities);
  const [editId, setEditId] = useState(null);
  const [newMunicipalityName, setNewMunicipalityName] = useState("");
  const [newDistrictName, setNewDistrictName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalityToDelete, setMunicipalityToDelete] = useState(null);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [districtToDelete, setDistrictToDelete] = useState(null);

  const districts = useSelector((state) => state.districts.list);
  const isLoading = useSelector((state) => state.districts.isLoading);
  const error = useSelector((state) => state.districts.error);
  useEffect(() => {
    console.log("Districts from Redux state:", districts);
  }, [districts]);

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchDistricts());
  }, [dispatch]);
  // #---------handle edit district (both district and municipality)
  const handleEdit = (id, name, district) => {
    setEditId(id);
    setNewMunicipalityName(name);
    setNewDistrictName(district);
  };
  //---- Handle update district (both district name and municipality) ---
  const handleUpdate = (e) => {
    e.preventDefault();

    // Find the districtId based on the district name
    const districtId =
      districts &&
      districts.find((district) => district.name === newDistrictName)?.id;

    if (editId !== null && districtId) {
      dispatch(
        updateMunicipality({
          id: editId,
          name: newMunicipalityName,
          districtId: districtId, // Send the district ID
        })
      )
        .unwrap()
        .then((response) => {
          console.log("Update response:", response); // Log the response here
          toast.success("Municipality updated successfully!");
          setEditId(null);
          setNewMunicipalityName("");
          setNewDistrictName(""); // Reset after update
        })
        .catch((error) => {
          console.error("Failed to update municipality:", error);
          toast.error(`Failed to update municipality: ${error.message}`);
        });
    } else {
      toast.error("Please select a valid district");
    }
  };

  const handleDelete = (id) => {
    setMunicipalityToDelete(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteMunicipality(id))
      .unwrap()
      .then(() => {
        toast.success("Municipality deleted successfully!");
        setMunicipalityToDelete(null);
        dispatch(fetchMunicipalities());
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete municipality: ${
            error?.message || deleteError?.message || "Unknown error"
          }`
        );
      });
  };
  //-- Formatting name (capitalizing first letter) ---
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredMunicipalities(
        (municipalities || []).filter((municipality) =>
          //     municipality.name &&
          //     municipality.name.toLowerCase().includes(searchTerm.toLowerCase())
          {
            // Ensure district.name and district.province are defined before calling toLowerCase()
            const municipalityName = municipality.name
              ? municipality.name.toLowerCase()
              : "";
            const districtName = municipality.district
              ? municipality.district.toLowerCase()
              : "";

            return (
              municipalityName.includes(searchTerm.toLowerCase()) ||
              districtName.includes(searchTerm.toLowerCase())
            );
          }
        )
      );
    } else {
      setFilteredMunicipalities(municipalities);
    }
  }, [searchTerm, municipalities]);
  useEffect(() => {
    if (searchTerm) {
      setFilteredDistricts(
        municipalities.filter((municipality) => {
          // Ensure district.name and district.district are defined before calling toLowerCase()
          const municipalityName = municipality.name
            ? municipality.name.toLowerCase()
            : "";
          const districtName = municipality.district
            ? municipality.district.toLowerCase()
            : "";

          return (
            districtName.includes(searchTerm.toLowerCase()) ||
            districtName.includes(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredDistricts(municipalities);
    }
  }, [searchTerm, municipalities]);

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Municipalities municipalities", 20, 10);

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
                <h5 className="navbar-brand">Municipality municipalities</h5>
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
                    </div>
                  </form>
                </div>

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
                          <p>Error: {error?.message || "Unknown error"}</p>
                        ) : (
                          <div className="table-container">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Municipality</th>
                                  <th>District</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredMunicipalities.length > 0 ? (
                                  filteredMunicipalities.map(
                                    (municipality, index) => (
                                      <tr key={municipality.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                          {editId === municipality.id ? (
                                            <input
                                              type="text"
                                              value={newMunicipalityName}
                                              onChange={(e) =>
                                                setNewMunicipalityName(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          ) : (
                                            municipality.name
                                          )}
                                        </td>
                                        <td>
                                          {editId === municipality.id ? (
                                            <select
                                              value={newDistrictName || ""}
                                              onChange={(e) =>
                                                setNewDistrictName(
                                                  e.target.value
                                                )
                                              }
                                              className="form-control"
                                            >
                                              <option value="">
                                                Select district
                                              </option>
                                              {districts &&
                                                districts.map((district) => (
                                                  <option
                                                    key={district.id}
                                                    value={district.name}
                                                  >
                                                    {district.name}
                                                  </option>
                                                ))}
                                            </select>
                                          ) : (
                                            formatName(
                                              municipality.district_name || ""
                                            ) // Handle undefined safely
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
                                                  municipality.name,
                                                  municipality.district
                                                )
                                              }
                                              className="btn btn-primary"
                                            >
                                              <FaEdit />
                                            </button>
                                          )}

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
                                    )
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan="3">
                                      No municipalities found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Delete Confirmation Modal */}
              {/* <DeleteMunicipality
                id={municipalityToDelete}
                onConfirm={confirmDelete}
                onClose={() => setMunicipalityToDelete(null)}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {municipalityToDelete !== null && (
        <deleteMunicipality
          id={municipalityToDelete}
          onClose={() => setMunicipalityToDelete(null)}
        />
      )}
    </div>
  );
};

export default MunicipalityTable;

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

// const Municipalitymunicipalities = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector(
//     (state) => state.municipalities.updateStatus
//   ); // Corrected state access
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newMunicipality, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);

//   const {
//     municipalities: municipalities,
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
//                 <h5 className="navbar-brand">Municipality municipalities</h5>
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

// export default Municipalitymunicipalities;

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

// const Municipalitymunicipalities = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector(
//     (state) => state.municipalities.updateStatus
//   ); // Corrected state access
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newMunicipality, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);

//   const {
//     municipalities: municipalities,
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
//         dispatch(fetchMunicipality()); // Refresh the municipalities
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
//                 <h5 className="navbar-brand">Municipality municipalities</h5>
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

// export default Municipalitymunicipalities;

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

// const Municipalitymunicipalities = () => {
//   const dispatch = useDispatch();

//   // Access updateStatus state property
//   const updateStatus = useSelector(
//     (state) => state.municipalities.updateStatus
//   ); // Corrected state access
//   const updateError = useSelector((state) => state.municipalities.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newMunicipality, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [municipalityToDelete, setMunicipalityToDelete] = useState(null);
//   // const [searchTerm, setSearchTerm] = useState("");
//   const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
//   // const [municipalitieToDelete, setmunicipalitieToDelete] = useState(null);
//   const {
//     municipalities: municipalities,
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
//                 <h5 className="navbar-brand">Municipality municipalities</h5>
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

// export default Municipalitymunicipalities;

//v2
