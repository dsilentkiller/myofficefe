import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  updateDepartment,
  deleteDepartment,
  // updateStatus,
  // updateError,
} from "../../redux/slice/base/departmentSlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import DepartmentDelete from "./DepartmentDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const DepartmentTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  // Access updateStatus state property
  const updateStatus = useSelector((state) => state.departments.updateStatus);
  const updateError = useSelector((state) => state.departments.updateError);
  const {
    list: departments,
    isLoading,
    error,
    // deleteStatus,
    deleteError,
  } = useSelector((state) => state.departments || {});

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // To update item in the table
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  // Handle update item in department table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateDepartment({ id: editId, name: newName }));
      setEditId(null);
      setNewName("");
    }
  };
  //-----update status toast--------
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("departments updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update department: ${updateError || "Unknown error"}`
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
    setDepartmentToDelete(id); // Set the department ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteDepartment(id))
      .unwrap()
      .then(() => {
        toast.success("department deleted successfully!");
        setDepartmentToDelete(null); // Close the modal after successful deletion
        dispatch(fetchDepartments()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete department: ${
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
      departments.map((department) => ({
        ID: department.id,
        Name: department.name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "departments");
    XLSX.writeFile(workbook, "departments.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("departments List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = departments.map((department) => [
      department.id,
      department.name,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("departments.pdf");
  };

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">department List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-primary">
                    <h5>Add department</h5>
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
                        placeholder="Search departments..."
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
                                {departments
                                  .filter((department) =>
                                    department.name
                                      ?.toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                                  )
                                  .map((department, index) => (
                                    <tr key={department.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {editId === department.id ? (
                                          <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) =>
                                              setNewName(e.target.value)
                                            }
                                          />
                                        ) : (
                                          formatName(department.name || "") // Default to empty string if name is null
                                        )}
                                      </td>
                                      <td>
                                        {editId === department.id ? (
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
                                                department.id,
                                                department.name || ""
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
                                            handleDelete(department.id)
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
            {departmentToDelete !== null && (
              <DepartmentDelete
                id={departmentToDelete}
                onClose={() => setDepartmentToDelete(null)}
                onConfirm={() => confirmDelete(departmentToDelete)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentTable;
