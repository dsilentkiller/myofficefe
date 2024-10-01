import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchworking,
  updateworking,
  deleteworking,
  updateStatus,
  updateError,
} from "../../redux/slice/base/workingSlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import Deleteworking from "./WorkingDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const WorkingList = () => {
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
    isLoading,
    error,
    deleteStatus,
    deleteError,
  } = useSelector((state) => state.municipalities);

  useEffect(() => {
    dispatch(fetchworking());
  }, [dispatch]);

  // To update item in the table
  const handleEdit = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  // Handle update item in working table
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateworking({ id: editId, name: newName }));
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
    dispatch(deleteworking(id))
      .unwrap()
      .then(() => {
        toast.success("working deleted successfully!");
        setworkingToDelete(null); // Close the modal after successful deletion
        dispatch(fetchworking()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete working: ${
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Working List</h5>
                <div className="navbar-nav ml-auto">
                  <a href="/Working/create" className="nav-link btn btn-info">
                    <h5>Add Working</h5>
                  </a>
                  <form
                    method="get"
                    action="/Working/search"
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="q"
                        className="form-control"
                        placeholder="Search Mockups, Logos..."
                        onChange={handleSearchChange}
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
                                  <td>{working.id}</td>
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

export default WorkingList;
