import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvince, createProvince } from "../../redux/slice/provinceSlice";
import "../../../admin/css/Table.css"; // Make sure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import { Link } from "react-router-dom";
const ProvinceList = () => {
  const [newProvinceName, setNewProvinceName] = useState("");
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

  // Show success or error messages based on status
  useEffect(() => {
    if (createStatus === "succeeded") {
      alert("Province created successfully!");
      dispatch(fetchProvince());
    } else if (createStatus === "failed") {
      alert(`Error: ${createError?.message || "An error occurred"}`);
    }
  }, [createStatus, createError, dispatch]);

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

