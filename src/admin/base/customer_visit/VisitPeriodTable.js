import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVisitPeriod,
  updateVisitPeriod,
  DeleteVisitPeriod,
  updateStatus,
  updateError,
} from "../../redux/slice/municipalitySlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import DeleteVisitPeriod from "./Delete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const VisitPeriodTable = () => {
  const [visitperiods, setVisitPeriods] = useState([]);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [visitperiodToDelete, setVisitPeriodToDelete] = useState(null);
  // Access updateStatus state property
  const updateStatus = useSelector((state) => state.visitperiods.updateStatus);
  const updateError = useSelector((state) => state.visitperiods.updateError);
  const {
    list,
    isLoading,
    error,
    deleteStatus,
    deleteError,
  } = useSelector((state) => state.visitperiods);

  useEffect(() => {
    dispatch(fetchVisitPeriod());
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
      dispatch(updateVisitPeriod({ id: editId, name: newName }));
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
    setvisitperiodToDelete(id); // Set the municipality ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteMunicipality(id))
      .unwrap()
      .then(() => {
        toast.success("Municipality deleted successfully!");
        setvisitperiodToDelete(null); // Close the modal after successful deletion
        dispatch(fetchMunicipality()); // Refresh the list
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

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Customer Visit List</h5>
                <div className="navbar-nav ml-auto">
                  <a
                    href="/visitperiod/create"
                    className="nav-link btn btn-info"
                  >
                    <h5>Add customer visit</h5>
                  </a>
                  <form
                    method="get"
                    action="/customervisit/search"
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="q"
                        className="form-control"
                        placeholder="Search Mockups, Logos..."
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

            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>visitperiod</th>
                              <th>created</th>

                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visitperiods.length > 0 ? (
                              visitperiods.map((visitperiod, index) => (
                                <tr key={visitperiods.id}>
                                  <td>{index + 1}</td>
                                  <td>{visitperiods.visitperiods}</td>
                                  <td>{visitperiods.created}</td>
                                  <td>
                                    {editId === visitperiod.id ? (
                                      <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) =>
                                          setNewName(e.target.value)
                                        }
                                      />
                                    ) : (
                                      formatName(visitperiod.name)
                                    )}
                                  </td>
                                  <td>
                                    {editId === visitperiod.id ? (
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
                                            visitperiod.id,
                                            visitperiod.name
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
                                        handleDelete(visitperiod.id)
                                      }
                                      className="btn btn-danger"
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No visitperiodss found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Delete Confirmation Modal */}
              {visitperiodToDelete !== null && (
                <DeleteVisitPeriod
                  id={visitperiodToDelete}
                  onClose={() => setVisitPeriodToDelete(null)}
                  onConfirm={() => confirmDelete(visitperiodToDelete)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPeriodTable;
