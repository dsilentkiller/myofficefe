import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProvince,
  createProvince,
  updateStatus,
  updateError,
} from "../../redux/slice/provinceSlice";
import "../../../admin/css/Table.css"; // Make sure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProvinceList = () => {
  const [newProvinceName, setNewProvinceName] = useState("");
  // Access updateStatus state property
  const updateStatus = useSelector((state) => state.districts.updateStatus);
  const updateError = useSelector((state) => state.districts.updateError);
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [provinceToDelete, setProvinceToDelete] = useState(null);
  const dispatch = useDispatch();

  // Select state from Redux store
  const {
    list: provinces,
    isLoading,
    error,
    createStatus,
    createError,
  } = useSelector((state) => state.provinces);

  // Handle form submission
  const handleAddProvince = (e) => {
    e.preventDefault();
    if (newProvinceName.trim() === "") {
      alert("Please enter a valid province name");
      return;
    }
    dispatch(createProvince({ name: newProvinceName.trim() }));
    setNewProvinceName(""); // Clear input field after submission
  };

  // Fetch provinces when the component mounts
  useEffect(() => {
    dispatch(fetchProvince());
  }, [dispatch]);

  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Show success or error messages based on status
  useEffect(() => {
    if (createStatus === "succeeded") {
      alert("Province created successfully!");
      dispatch(fetchProvince());
    } else if (createStatus === "failed") {
      alert(`Error: ${createError?.message || "An error occurred"}`);
    }
  }, [createStatus, createError, dispatch]);

  //-----update status toast--------
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Province updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update province: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, updateError]);

  //------------ this is filtered provincename  in search table ---------
  useEffect(() => {
    if (searchTerm) {
      setFilteredProvinces(
        provinces.filter((province) =>
          province.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProvinces(provinces);
    }
  }, [searchTerm, provinces]);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h5 className="dashboard-title mx-20" style={{ color: "black" }}>
              Province List
            </h5>
            <div className="text-right">
              <form onSubmit={handleAddProvince} className="input-group">
                <input
                  type="text"
                  value={newProvinceName}
                  onChange={(e) => setNewProvinceName(e.target.value)}
                  placeholder="Enter province name"
                  required
                  aria-label="New Province Name"
                />
                <button type="submit" disabled={createStatus === "loading"}>
                  {createStatus === "loading" ? "Adding..." : "Add Province"}
                </button>
              </form>
              {createStatus === "failed" && (
                <p className="error">
                  Error: {createError?.message || "An error occurred"}
                </p>
              )}
            </div>
            <form className="form-inline ml-3">
              <div className="input-group">
                <input
                  type="search"
                  id="default-search"
                  name="search_term"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
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

          <div className="card-body">
            {isLoading ? (
              <p>Loading provinces...</p>
            ) : error ? (
              <p className="error">
                Error: {error?.message || "An error occurred"}
              </p>
            ) : (
              <div className="table-container">
                <div className="table-wrapper">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provinces.length > 0 ? (
                        provinces.map((province, index) => (
                          <tr key={province.id}>
                            <td>{index + 1}</td>
                            <td>{province.name}</td>
                            <td>
                              <Link
                                to={`update/${province.id}`}
                                className="action-button edit"
                              >
                                <FaEdit /> Edit
                              </Link>
                              <span> | </span>
                              <Link
                                to={`delete/${province.id}`}
                                className="action-button delete"
                              >
                                <FaTrash /> Delete
                              </Link>
                            </td>

                            <td>
                              {editId === province.id ? (
                                <button
                                  onClick={handleUpdate}
                                  className="btn btn-success"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleEdit(province.id, province.name)
                                  }
                                  className="btn btn-primary"
                                >
                                  <FaEdit />
                                </button>
                              )}
                              <span> </span>
                              <button
                                onClick={() => setProvinceToDelete(province.id)}
                                className="btn btn-danger"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No provinces found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvinceList;
