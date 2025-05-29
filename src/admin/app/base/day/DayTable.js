import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDays,
  updateDay,
  deleteDay,
  // updateStatus,
  // updateError,
} from "../../../../redux/slice/admin/base/daySlice";
// import { Link } from "react-router-dom";
// Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import DayDelete from "./DayDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../../css/table/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar";
const DayTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dayToDelete, setDayToDelete] = useState(null);
  // Access updateStatus state property
  // const updateStatus = useSelector((state) => state.days.updateStatus);
  const updateStatus = useSelector((state) => state.schedule?.updateStatus || null);

  const updateError = useSelector((state) => state.days?.updateError || null);
  // // const list = useSelector(state => (state.days ? state.days.list : []));
  // const list = useSelector(state => (state.days ? state.days.list : []));
  const daysState = useSelector(state => state.days || { list: [], isLoading: false, error: null });
  const { list: days, isLoading, error, createStatus, deleteError } = daysState;



  // const {
  //   list: days,
  //   isLoading,
  //   error,
  //  createStatus,
  //   deleteError,
  // } = useSelector((state) => state.days?.list|| {});

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
  //-----update status toast--------
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("days updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(`Failed to update day: ${updateError || "Unknown error"}`);
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
        Name: day.name,
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
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
            <TableActionNavbar
              style={{ position: "relative", zIndex: 10, marginTop: "80px" }}
              title="DDay List"
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

                              <tbody>
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
    </div>
  );
};

export default DayTable;
