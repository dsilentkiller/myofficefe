import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar";
import {
  fetchWorkings,
  updateWorking,
  deleteWorking,
  // updateStatus,
  // updateError,
} from "../../../../redux/slice/admin/base/workingSlice";
// import WorkingForm from "./WorkingForm"
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import Deleteworking from "./WorkingDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../../css/table/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const WorkingTable = () => {
  // State to store the list of Workings
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [workingToDelete, setworkingToDelete] = useState(null);
  // Access updateStatus state property
  const updateStatus = useSelector((state) => state.districts.updateStatus);
  const updateError = useSelector((state) => state.districts.updateError);
  const {
    list: municipalities,
    // isLoading,
    // error,
    // deleteStatus,
    deleteError,
  } = useSelector((state) => state.municipalities);

  useEffect(() => {
    dispatch(fetchWorkings());
  }, [dispatch]);

  // To update item in the table
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
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
  // Handle update item in working table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateWorking({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };
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
    setworkingToDelete(id); // Set the working ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteWorking(id))
      .unwrap()
      .then(() => {
        toast.success("working deleted successfully!");
        setworkingToDelete(null); // Close the modal after successful deletion
        dispatch(fetchWorkings()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete working: ${error.message || deleteError || "Unknown error"
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
      municipalities.map((working) => ({
        ID: working.id,
        Name: working.name,
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
    const tableRows = municipalities.map((working) => [
      working.id,
      working.name,
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
            {/* heading */}



            <TableActionNavbar
              style={{ position: "relative", zIndex: 10, marginTop: "80px" }}
              title="working day List"
              addLink="create"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onExportExcel={exportToExcel}
              onExportPDF={exportToPDF}
              onImportExcel={importExcelHandler}
            />

            {/* heading end */}
            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        <table className="table table-bordered">
                          <thead>
                            <th>#</th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Action</th>
                          </thead>
                          <tbody>
                            {municipalities
                              .filter((working) =>
                                working.name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              )
                              .map((working, index) => (
                                <tr key={working.id}>
                                  <td>{index + 1}</td>

                                  <td>{working.name}</td>
                                  <td>{working.created}</td>
                                  <td>{working.updated}</td>
                                  <td>
                                    {editId === working.id ? (
                                      <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) =>
                                          setNewName(e.target.value)
                                        }
                                      />
                                    ) : (
                                      formatName(working.name)
                                    )}
                                  </td>
                                  <td>
                                    {editId === working.id ? (
                                      <button
                                        onClick={handleUpdate}
                                        className="btn btn-success"
                                      >
                                        Save
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleEdit(working.id, working.name)
                                        }
                                        className="btn btn-primary"
                                      >
                                        <FaEdit />
                                      </button>
                                    )}
                                    <span> </span>
                                    <button
                                      onClick={() => handleDelete(working.id)}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingTable;
