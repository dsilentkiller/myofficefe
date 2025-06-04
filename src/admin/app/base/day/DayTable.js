// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDays,
//   updateDay,
//   deleteDay,
// } from "../../../../redux/slice/admin/base/daySlice";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import DayDelete from "./DayDelete";
// import { toast } from "react-toastify";
// import "../../../css/table/Table.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar";

// const DayTable = () => {
//   const dispatch = useDispatch();
//   const [editId, setEditId] = useState(null);
//   const [formState, setFormState] = useState({ day_name: ""});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dayToDelete, setDayToDelete] = useState(null);
//   // priority_order: "", is_active: true 

//   // const { list: days = [], isLoading = false, error = null, updateStatus, updateError, deleteError } =
//   //   useSelector((state) => state.days || {});
//   // const days = useSelector((state) => state.days.list); // ✅ This is the correct array
//   const {
//     list: days,
//     updateError,
//     deleteError,
//     isLoading,
//     error,
//   } = useSelector((state) => state.days);
//   console.log("days:", days);


//   useEffect(() => {
//     dispatch(fetchDays());
//   }, [dispatch]);

//   const handleEdit = (day) => {
//     setEditId(day.id);
//     setFormState({
//       name: day.day_name || "",
//       // priority_order: day.priority_order || 0,
//       // is_active: day.is_active ?? true,
//     });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateDay({ id: editId, ...formState }))
//         .unwrap()
//         .then(() => {
//           toast.success("Day updated successfully!");
//           setEditId(null);
//           setFormState({ name: "" });
//         })
//         .catch((err) => {
//           toast.error(`Update failed: ${err.message || updateError}`);
//         });
//     }
//   };

//   const handleDelete = (id) => setDayToDelete(id);

//   const confirmDelete = (id) => {
//     dispatch(deleteDay(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Day deleted successfully!");
//         setDayToDelete(null);
//         dispatch(fetchDays());
//       })
//       .catch((error) => {
//         toast.error(`Delete failed: ${error.message || deleteError}`);
//       });
//   };

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);

//   const formatName = (name) =>
//     name
//       ?.split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       days.map(({ id, name, priority_order, is_active }) => ({
//         ID: id,
//         Name: name,
//         PriorityOrder: priority_order,
//         IsActive: is_active ? "Yes" : "No",
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Days");
//     XLSX.writeFile(workbook, "Days.xlsx");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Day List", 20, 10);
//     autoTable(doc, {
//       head: [["ID", "Name", "Priority Order", "Active"]],
//       body: days.map((d) => [d.id, d.name, d.priority_order, d.is_active ? "Yes" : "No"]),
//       startY: 20,
//     });
//     doc.save("Days.pdf");
//   };

//   const importExcelHandler = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       console.log("Imported Excel Data:", jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-lg-11">
//         <div className="card">
//           <TableActionNavbar
//             style={{ position: "relative", zIndex: 10, marginTop: "80px" }}
//             title="Day List"
//             addLink="create"
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             onExportExcel={exportToExcel}
//             onExportPDF={exportToPDF}
//             onImportExcel={importExcelHandler}
//           />
//           <div className="card-body">
//             <div className="overflow-auto max-h-[450px]">
//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : error ? (
//                 <p>Error: {error}</p>
//               ) : (
//                 <div className="table-container">
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Priority</th>
//                         <th>Active</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {days
//                         .filter((day) =>
//                           day.name?.toLowerCase().includes(searchTerm.toLowerCase())
//                         )
//                         .map((day, index) => (
//                           <tr key={day.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {editId === day.id ? (
//                                 <input
//                                   value={formState.name}
//                                   onChange={(e) =>
//                                     setFormState({ ...formState, name: e.target.value })
//                                   }
//                                 />
//                               ) : (
//                                 formatName(day.name)
//                               )}
//                             </td>
//                             <td>
//                               {editId === day.id ? (
//                                 <input
//                                   type="number"
//                                   value={formState.priority_order}
//                                   onChange={(e) =>
//                                     setFormState({
//                                       ...formState,
//                                       priority_order: parseInt(e.target.value),
//                                     })
//                                   }
//                                 />
//                               ) : (
//                                 day.priority_order
//                               )}
//                             </td>
//                             <td>
//                               {editId === day.id ? (
//                                 <input
//                                   type="checkbox"
//                                   checked={formState.is_active}
//                                   onChange={(e) =>
//                                     setFormState({
//                                       ...formState,
//                                       is_active: e.target.checked,
//                                     })
//                                   }
//                                 />
//                               ) : day.is_active ? (
//                                 "Yes"
//                               ) : (
//                                 "No"
//                               )}
//                             </td>
//                             <td>
//                               {editId === day.id ? (
//                                 <button onClick={handleUpdate} className="btn btn-success btn-sm">
//                                   Save
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={() => handleEdit(day)}
//                                   className="btn btn-primary btn-sm"
//                                 >
//                                   <FaEdit />
//                                 </button>
//                               )}
//                               <button
//                                 onClick={() => handleDelete(day.id)}
//                                 className="btn btn-danger btn-sm ms-2"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>

//           {dayToDelete !== null && (
//             <DayDelete
//               id={dayToDelete}
//               onClose={() => setDayToDelete(null)}
//               onConfirm={() => confirmDelete(dayToDelete)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayTable;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDays,
  updateDay,
  deleteDay,
  // updateStatus,
  // updateError,
} from "../../../../redux/slice/admin/base/daySlice";

import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import DayDelete from "./DayDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../../css/table/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { createSelector } from "reselect";
import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar";


const DayTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dayToDelete, setDayToDelete] = useState(null);



  const deleteError = useSelector((state) => state.days?.deleteError || null);
  const isLoading = useSelector((state) => state.days?.isLoading || false);
  const error = useSelector((state) => state.days?.error || null);

  // const days = useSelector((state) => state.days?.list || []);
  // const days = useSelector((state) => state.days?.data?.list || []);

  const days = useSelector((state) => state.days?.list || []);

  console.log("Days state:", days);
  console.log("Type of days:", typeof days);
  console.log("Is Array:", Array.isArray(days));

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

  useEffect(() => {
    dispatch(fetchDays());
  }, [dispatch]);

  // To update item in the table
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  // Handle update item in day table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateDay({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // Handle delete confirmation
  const handleDelete = (id) => {
    setDayToDelete(id); // Set the day ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteDay(id))
      .unwrap()
      .then(() => {
        toast.success("day deleted successfully!");
        setDayToDelete(null); // Close the modal after successful deletion
        dispatch(fetchDays()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete day: ${error.message || deleteError || "Unknown error"
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
      days.map((day) => ({
        ID: day.id,
        Name: day.day_name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "days");
    XLSX.writeFile(workbook, "days.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("days List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = days.map((day) => [day.id, day.name]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("days.pdf");
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
            <TableActionNavbar
              style={{ position: "relative", zIndex: 10, marginTop: "80px" }}
              title="Day List"
              addLink="create"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onExportExcel={exportToExcel}
              onExportPDF={exportToPDF}
              onImportExcel={importExcelHandler}
            />

            {/* </nav> */}

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

                              {/* <tbody>
                                {(days || [])
                                  .filter((day) =>
                                    day.name
                                      ?.toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                                  )
                                  .map((day, index) => (
                                    <tr key={day.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {editId === day.id ? (
                                          <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) =>
                                              setNewName(e.target.value)
                                            }
                                          />
                                        ) : (
                                          formatName(day.name || "") // Default to empty string if name is null
                                        )}
                                      </td>
                                      <td>
                                        {editId === day.id ? (
                                          <button
                                            onClick={handleUpdate}
                                            className="btn btn-success"
                                          >
                                            Save
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() =>
                                              handleEdit(day.id, day.name || "")
                                            }
                                            className="btn btn-primary"
                                          >
                                            <FaEdit />
                                          </button>
                                        )}
                                        <span> </span>
                                        <button
                                          onClick={() => handleDelete(day.id)}
                                          className="btn btn-danger"
                                        >
                                          <FaTrash />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody> */}
                              {Array.isArray(days) && days.length > 0 ? (
                                days.map((day, index) => (
                                  <tr key={day.id}>
                                    <td>{index + 1}</td>
                                    <td>{day.day_name}</td>
                                    <td>
                                      {editId === day.id ? (
                                        <input
                                          type="text"
                                          value={newName}
                                          onChange={(e) => setNewName(e.target.value)}
                                        />
                                      ) : (
                                        formatName(day.day_name || "")
                                      )}
                                    </td>
                                    <td>
                                      {editId === day.id ? (
                                        <button onClick={handleUpdate} className="btn btn-success">Save</button>
                                      ) : (
                                        <button onClick={() => handleEdit(day.id, day.day_name || "")} className="btn btn-primary">
                                          <FaEdit />
                                        </button>
                                      )}
                                      <button onClick={() => handleDelete(day.id)} className="btn btn-danger">
                                        <FaTrash />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr><td colspan="3">No data available</td></tr>
                              )}

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
            {dayToDelete !== null && (
              <DayDelete
                id={dayToDelete}
                onClose={() => setDayToDelete(null)}
                onConfirm={() => confirmDelete(dayToDelete)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DayTable;
