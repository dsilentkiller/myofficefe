import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDesignations,
  updateDesignation,
  deleteDesignation,
} from "../../../../redux/slice/admin/base/designationSlice";
import "../../../../admin/css/table/Table.css";
import DesignationDelete from "./DesignationDelete";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar"


import { IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';

const DesignationTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [designationToDelete, setDesignationToDelete] = useState(null);

  // Access state from Redux
  const updateStatus = useSelector((state) => state.designations?.updateStatus);
  const updateError = useSelector((state) => state.designations?.updateError);
  const {
    list: designations = [],
    isLoading,
    error,

  } = useSelector((state) => state.designations || {});

  useEffect(() => {
    dispatch(fetchDesignations()).then((response) => console.log(response));
  }, [dispatch]);

  //----refresh table after delete the item from table ---
  useEffect(() => {
    // Refetch data after deletion or update
    if (designationToDelete === null) {
      dispatch(fetchDesignations());
    }
  }, [designationToDelete, dispatch]);
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateDesignation({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Designations updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update designation: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, updateError]);




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

  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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
        dispatch(fetchDesignations());
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete designation: ${error.message || "Unknown error"}`
        );
      });
  };


  // Filter categories for search term

  const filteredDesignations = designations?.filter((designation) => {
    //   console.log(categories);
    // console.log("**");
    return designation?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      designations.map((designation) => ({
        ID: designation.id,
        Name: designation.name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
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

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">


            <TableActionNavbar
              style={{ position: "relative", zIndex: 10, marginTop: "80px" }}
              title="Designation List"
              addLink="create"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onExportExcel={exportToExcel}
              onExportPDF={exportToPDF}
              onImportExcel={importExcelHandler}
            />



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
                                {filteredDesignations.map(
                                  (designation, index) => (
                                    <tr key={designation?.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {editId === designation.id ? (
                                          <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) =>
                                              setNewName(e.target.value)
                                            }
                                          />
                                        ) : (
                                          formatName(designation?.name || "")
                                        )}
                                      </td>
                                      <td>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                          {editId === designation.id ? (
                                            <IconButton color="success" onClick={handleUpdate}>
                                              <Save fontSize="small" />
                                            </IconButton>
                                          ) : (
                                            <IconButton
                                              color="primary"
                                              onClick={() => handleEdit(designation.id, designation.name || "")}
                                            >
                                              <Edit fontSize="small" />
                                            </IconButton>
                                          )}
                                          <IconButton color="error" onClick={() => handleDelete(designation.id)}>
                                            <Delete fontSize="small" />
                                          </IconButton>
                                        </div>
                                      </td>


                                    </tr>
                                  )
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
            </div>

            {designationToDelete !== null && (
              <DesignationDelete
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
// import DesignationDelete from "./DesignationDelete";
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
//   const [searchTerm, setSearchTerm] = useState("");
//   const [designationToDelete, setDesignationToDelete] = useState(null);
//   // Access updateStatus state property
//   const updateStatus = useSelector((state) => state.designations.updateStatus);
//   const updateError = useSelector((state) => state.designations.updateError);
//   const {
//     list: designations,
//     isLoading,
//     error,
//     deleteStatus,
//     deleteError,
//   } = useSelector((state) => state.designations || {});

//   useEffect(() => {
//     dispatch(fetchDesignation());
//   }, [dispatch]);

//   // To update item in the table
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };

//   // Handle update item in designation table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateDesignation({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };
//   //-----update status toast--------
//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("designations updated successfully!");
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
//     setDesignationToDelete(id); // Set the designation ID to trigger the modal
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteDesignation(id))
//       .unwrap()
//       .then(() => {
//         toast.success("designation deleted successfully!");
//         setDesignationToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchDesignation()); // Refresh the list
//       })
//       .catch((error) => {
//         // Handle and log the error more robustly
//         console.error("Delete Error:", error);
//         toast.error(
//           `Failed to delete designation: ${
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
//                 <h5 className="navbar-brand">designation List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-primary">
//                     <h5>Add designation</h5>
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
//                     </div>
//                   </form>
//                 </div>

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
//                           // <div className="card-body">
//                           <div className="table-container">
//                             <table className="table table-bordered">
//                               <thead>
//                                 <tr>
//                                   <th>#</th>
//                                   <th>Name</th>
//                                   <th>Action</th>
//                                 </tr>
//                               </thead>
//                               {/* <tbody>
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
//                               </tbody> */}

//                               <tbody>
//                                 {designations
//                                   .filter((designation) =>
//                                     designation.name
//                                       ?.toLowerCase()
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
//                                           formatName(designation.name || "") // Default to empty string if name is null
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
//                                                 designation.name || ""
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
//             {designationToDelete !== null && (
//               <DesignationDelete
//                 id={designationToDelete}
//                 onClose={() => setDesignationToDelete(null)}
//                 onConfirm={() => confirmDelete(designationToDelete)}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignationTable;
