import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDesignation,
  updateDesignation,
  deleteDesignation,
} from "../../redux/slice/designationSlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import DeleteDesignation from "./Delete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import * as XLSX from "xlsx";

const DesignationTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [designationToDelete, setDesignationToDelete] = useState(null);
  // Fetching the designations from the Redux store
  const {
    list: designations,
    isLoading,
    error,
    fetchStatus,
    fetchError,
  } = useSelector((state) => state.designations);

  // const { designations, fetchStatus, fetchError } = useSelector(
  //   (state) => state.designations
  // );

  // Dispatch the fetchDesignations action on component mount
  useEffect(() => {
    dispatch(fetchDesignation());
  }, [dispatch]);

  // Handle any fetch errors
  useEffect(() => {
    if (fetchStatus === "failed") {
      toast.error(
        `Error: ${fetchError.message || "Failed to fetch designations"}`
      );
    }
  }, [fetchStatus, fetchError]);

  if (fetchStatus === "loading") {
    return <p>Loading designations...</p>;
  }

  if (fetchStatus === "failed") {
    return (
      <p className="text-danger">
        Failed to load designations. Please try again later.
      </p>
    );
  }

  if (!designations || designations.length === 0) {
    return <p>No designations available.</p>;
  }
  // useEffect(() => {
  //   dispatch(fetchDesignation());
  // }, [dispatch]);

  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(
        updateDesignation({
          id: editId,
          name: newName,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Designation updated successfully!");
        })
        .catch((error) => {
          if (error.message.includes("already exists")) {
            toast.error(
              "Designation name already exists. Please choose a different name."
            );
          } else {
            toast.error(
              `Failed to update designation: ${
                error.message || "Unknown error"
              }`
            );
          }
        });

      setEditId(null);
      setNewName("");
    }
  };

  const handleDelete = (id) => {
    setDesignationToDelete(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteDesignation(id))
      .unwrap()
      .then(() => {
        toast.success("Designation deleted successfully!");
        setDesignationToDelete(null);
        dispatch(fetchDesignation());
      })
      .catch((error) => {
        toast.error(
          `Failed to delete designation: ${error.message || "Unknown error"}`
        );
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      designations.map((designation) => ({
        ID: designation.id,
        Name: designation.name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "designations");
    XLSX.writeFile(workbook, "designations.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Designations List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = designations.map((designation) => [
      designation.id,
      designation.name,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("designations.pdf");
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Designation List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-primary">
                    <h5>Add Designation</h5>
                  </Link>
                  <form className="form-inline ml-3">
                    <div className="input-group">
                      <input
                        type="search"
                        value={searchTerm}
                        className="form-control"
                        placeholder="Search designations..."
                        onChange={handleSearchChange}
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </nav>

            <div className="card-body">
              <div className="form-inline ml-4">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button
                      className="nav-link bg-info px-1 py-1 text-sm"
                      onClick={exportToExcel}
                    >
                      Export Excel
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link bg-info px-1 py-1 text-sm"
                      onClick={exportToPDF}
                    >
                      Export PDF
                    </button>
                  </li>
                </ul>
              </div>

              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : designations.length > 0 ? (
                <div className="table-container">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Designation</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {designations
                        .filter((designation) =>
                          designation.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((designation, index) => (
                          <tr key={designation.id}>
                            <td>{index + 1}</td>
                            <td>
                              {editId === designation.id ? (
                                <input
                                  type="text"
                                  value={newName}
                                  onChange={(e) => setNewName(e.target.value)}
                                />
                              ) : (
                                formatName(designation.name)
                              )}
                            </td>
                            <td>
                              {editId === designation.id ? (
                                <button
                                  onClick={handleUpdate}
                                  className="btn btn-success"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleEdit(designation.id, designation.name)
                                  }
                                  className="btn btn-primary"
                                >
                                  <FaEdit />
                                </button>
                              )}
                              <span> </span>
                              <button
                                onClick={() => handleDelete(designation.id)}
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
              ) : (
                <p>No Designations found.</p>
              )}
            </div>

            {/* Delete Confirmation Modal */}
            {designationToDelete !== null && (
              <DeleteDesignation
                id={designationToDelete}
                onClose={() => setDesignationToDelete(null)}
                onConfirm={() => confirmDelete(designationToDelete)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignationTable;

// //v2
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDesignation,
//   updateDesignation,
//   deleteDesignation,
//   updateStatus,
//   updateError,
// } from "../../redux/slice/designationSlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import DeleteDesignation from "./Delete";
// import { toast } from "react-toastify"; // Import toast for error messages
// import "../../css/Table.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// const DesignationTable = () => {
//   const dispatch = useDispatch();
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   // const [newDepartment, setNewDepartment] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [DesignationToDelete, setDesignationToDelete] = useState(null);
//   // Access updateStatus state property
//   const updateStatus = useSelector((state) => state.designations.updateStatus);
//   const updateError = useSelector((state) => state.designations.updateError);
//   const {
//     list: designations,
//     isLoading,
//     error,
//     deleteStatus,
//     deleteError,
//   } = useSelector((state) => state.designations);

//   useEffect(() => {
//     dispatch(fetchDesignation());
//   }, [dispatch]);

//   // To update item in the table
//   const handleEdit = (id, name, department) => {
//     setEditId(id);
//     setNewName(name);
//     // setNewDepartment(department);
//   };

//   // Handle update item in Designation table
//   // const handleUpdate = (e) => {
//   //   e.preventDefault();
//   //   if (editId !== null) {
//   //     dispatch(
//   //       updateDesignation({
//   //         id: editId,
//   //         name: newName,
//   //         // department: newDepartment,
//   //       })
//   //     );
//   //     setEditId(null);
//   //     setNewName("");
//   //   }
//   // };
//   //for duplicate check
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(
//         updateDesignation({
//           id: editId,
//           name: newName,
//         })
//       )
//         .unwrap()
//         .then(() => {
//           toast.success("Designation updated successfully!");
//         })
//         .catch((error) => {
//           if (error.message.includes("already exists")) {
//             toast.error(
//               "Designation name already exists. Please choose a different name."
//             );
//           } else {
//             toast.error(
//               `Failed to update designation: ${
//                 error.message || "Unknown error"
//               }`
//             );
//           }
//         });

//       setEditId(null);
//       setNewName("");
//     }
//   };

//   //-----update status toast--------
//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("Designation updated successfully!");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Failed to update designation: ${updateError || "Unknown error"}`
//       );
//     }
//   }, [updateStatus, updateError]);
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
//     setDesignationToDelete(id); // Set the Designation ID to trigger the modal
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteDesignation(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Designation deleted successfully!");
//         setDesignationToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchDesignation()); // Refresh the list
//       })
//       .catch((error) => {
//         // Handle and log the error more robustly
//         console.error("Delete Error:", error);
//         toast.error(
//           `Failed to delete Designation: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };
//   //--- handle searchitem in a table ----
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   // Export to Excel
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       designations.map((designation) => ({
//         ID: designation.id,
//         Name: designation.name,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "designations");
//     XLSX.writeFile(workbook, "designations.xlsx");
//   };

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("designations List", 20, 10);

//     const tableColumn = ["ID", "Name"];
//     const tableRows = designations.map((designation) => [
//       designation.id,
//       designation.name,
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 20,
//     });
//     doc.save("designations.pdf");
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Designation List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add Designation</h5>
//                   </Link>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       setSearchTerm(e.target.q.value);
//                     }}
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       search
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term"
//                         value={searchTerm}
//                         className="form-control"
//                         placeholder="Search designations..."
//                         onChange={handleSearchChange}
//                         required
//                       />
//                       {/* <div className="input-group-append"> */}
//                       {/* <button type="submit" className="btn btn-info">
//                           Search
//                         </button> */}
//                       {/* </div> */}
//                     </div>
//                   </form>
//                 </div>

//                 {/* <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item">
//                       <button
//                         id="DesignationTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                 {/* </ul>
//                 </div>
//               </div>
//             </nav> */}
//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item">
//                       <button
//                         id="exportExcel"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                         onClick={exportToExcel}
//                       >
//                         Export Excel
//                       </button>
//                     </li>
//                     <li className="nav-item">
//                       <button
//                         id="exportPDF"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                         onClick={exportToPDF}
//                       >
//                         Export PDF
//                       </button>
//                     </li>
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
//                           // {designations && designations.length > 0 ?
//                           // <div className="card-body">
//                           <div className="table-container">
//                             <table className="table table-bordered">
//                               <thead>
//                                 <tr>
//                                   <th>#</th>
//                                   <th>Designation </th>
//                                   {/* <th>Department</th> */}
//                                   <th>Action</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {designations
//                                   .filter((designation) =>
//                                     designation.name
//                                       .toLowerCase()
//                                       .includes(searchTerm.toLowerCase())
//                                   )
//                                   .map((designation, index) => (
//                                     <tr key={designation.id}>
//                                       <td>{index + 1}</td>
//                                       <td>
//                                         {editId === designation.id ? (
//                                           <input
//                                             type="text"
//                                             value={newName}
//                                             onChange={(e) =>
//                                               setNewName(e.target.value)
//                                             }
//                                           />
//                                         ) : (
//                                           formatName(designation.name)
//                                         )}
//                                       </td>

//                                       <td>
//                                         {editId === designation.id ? (
//                                           <button
//                                             onClick={handleUpdate}
//                                             className="btn btn-success"
//                                           >
//                                             Save
//                                           </button>
//                                         ) : (
//                                           <button
//                                             onClick={() =>
//                                               handleEdit(
//                                                 designation.id,
//                                                 designation.name
//                                                 // designation.department
//                                               )
//                                             }
//                                             className="btn btn-primary"
//                                           >
//                                             <FaEdit />
//                                           </button>
//                                         )}
//                                         <span> </span>
//                                         <button
//                                           onClick={() =>
//                                             handleDelete(designation.id)
//                                           }
//                                           className="btn btn-danger"
//                                         >
//                                           <FaTrash />
//                                         </button>
//                                       </td>
//                                     </tr>
//                                   ))}
//                               </tbody>
//                             </table>
//                           </div>
//                           // </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Delete Confirmation Modal */}
//             {DesignationToDelete !== null && (
//               <DeleteDesignation
//                 id={DesignationToDelete}
//                 onClose={() => setDesignationToDelete(null)}
//                 onConfirm={() => confirmDelete(DesignationToDelete)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignationTable;
//v1
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDesignation,
//   updateDesignation,
//   deleteDesignation,
//   updateStatus,
//   updateError,
// } from "../../redux/slice/designationSlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import DeleteDesignation from "./Delete";
// import { toast } from "react-toastify"; // Import toast for error messages
// import "../../css/Table.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

// const DesignationTable = () => {
//   const dispatch = useDispatch();
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [newDepartment, setNewDepartment] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [DesignationToDelete, setDesignationToDelete] = useState(null);

//   const updateStatus = useSelector((state) => state.designations.updateStatus);
//   const updateError = useSelector((state) => state.designations.updateError);

//   const {
//     list: designations,
//     isLoading,
//     error,
//     deleteStatus,
//     deleteError,
//   } = useSelector((state) => state.designations);

//   useEffect(() => {
//     dispatch(fetchDesignation());
//   }, [dispatch]);

//   // To update item in the table
//   const handleEdit = (id, name, department) => {
//     setEditId(id);
//     setNewName(name);
//     setNewDepartment(department); // Fixing the department value update
//   };

//   // Handle update item in Designation table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(
//         updateDesignation({
//           id: editId,
//           name: newName,
//           department: newDepartment,
//         })
//       );
//       setEditId(null);
//       setNewName("");
//       setNewDepartment("");
//     }
//   };

//   // Update status toast
//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("Designation updated successfully!");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Failed to update designation: ${updateError || "Unknown error"}`
//       );
//     }
//   }, [updateStatus, updateError]);

//   // Capitalize first letter of each word in the name
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Handle delete confirmation
//   const handleDelete = (id) => {
//     setDesignationToDelete(id);
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteDesignation(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Designation deleted successfully!");
//         setDesignationToDelete(null);
//         dispatch(fetchDesignation());
//       })
//       .catch((error) => {
//         console.error("Delete Error:", error);
//         toast.error(
//           `Failed to delete designation: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Export to Excel
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       designations.map((designation) => ({
//         ID: designation.id,
//         Name: designation.name,
//         Department: designation.department,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
//     XLSX.writeFile(workbook, "designations.xlsx");
//   };

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Designations List", 20, 10);

//     const tableColumn = ["ID", "Name", "Department"];
//     const tableRows = designations.map((designation) => [
//       designation.id,
//       designation.name,
//       designation.department,
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 20,
//     });
//     doc.save("designations.pdf");
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Designation List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add Designation</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         className="form-control"
//                         placeholder="Search designations..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                       />
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>

//             <div className="form-inline ml-4">
//               <ul className="navbar-nav">
//                 <li className="nav-item">
//                   <button
//                     className="nav-link btn btn-info"
//                     onClick={exportToExcel}
//                   >
//                     Export Excel
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     className="nav-link btn btn-info"
//                     onClick={exportToPDF}
//                   >
//                     Export PDF
//                   </button>
//                 </li>
//               </ul>
//             </div>

//             <div className="card-body">
//               <div className="table-responsive">
//                 {isLoading ? (
//                   <p>Loading...</p>
//                 ) : error ? (
//                   <p>Error: {error}</p>
//                 ) : (
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Designation</th>
//                         <th>Department</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {designations
//                         .filter((designation) =>
//                           designation.name
//                             .toLowerCase()
//                             .includes(searchTerm.toLowerCase())
//                         )
//                         .map((designation, index) => (
//                           <tr key={designation.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {editId === designation.id ? (
//                                 <input
//                                   type="text"
//                                   value={newName}
//                                   onChange={(e) => setNewName(e.target.value)}
//                                 />
//                               ) : (
//                                 formatName(designation.name)
//                               )}
//                             </td>
//                             <td>
//                               {editId === designation.id ? (
//                                 <input
//                                   type="text"
//                                   value={newDepartment}
//                                   onChange={(e) =>
//                                     setNewDepartment(e.target.value)
//                                   }
//                                 />
//                               ) : (
//                                 designation.department
//                               )}
//                             </td>
//                             <td>
//                               {editId === designation.id ? (
//                                 <button
//                                   onClick={handleUpdate}
//                                   className="btn btn-success"
//                                 >
//                                   Save
//                                 </button>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() =>
//                                       handleEdit(
//                                         designation.id,
//                                         designation.name,
//                                         designation.department
//                                       )
//                                     }
//                                     className="btn btn-primary"
//                                   >
//                                     <FaEdit />
//                                   </button>
//                                   <button
//                                     onClick={() => handleDelete(designation.id)}
//                                     className="btn btn-danger"
//                                   >
//                                     <FaTrash />
//                                   </button>
//                                 </>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>

//             {DesignationToDelete !== null && (
//               <DeleteDesignation
//                 id={DesignationToDelete}
//                 onClose={() => setDesignationToDelete(null)}
//                 onConfirm={() => confirmDelete(DesignationToDelete)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignationTable;
