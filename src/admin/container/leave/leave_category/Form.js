import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LeaveCategoryForm() {
  const [formData, setFormData] = useState({
    category_name: "",
    leave_type: "",
    status: "",
    leave_day: "",
    max_leave_duration: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // api
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/leave_category/",
          formData
        );
        console.log(response.data);
        alert("Leave created successfully!");
        // You can reset the form or navigate to another page here
      } catch (error) {
        console.error("There was an error creating the Leave!", error);
        alert("Failed to create Leave.");
      }
    };
    return (
      <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
        <div className="card">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <h5 className="navbar-brand">Add Leave Category</h5>
              <div className="navbar-nav ml-auto">
                <Link to="dashboard/leave/list/">
                  <h5>Leave Category List</h5>
                </Link>
              </div>
            </div>
          </nav>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="category_name"> Category Name:</label>
                    <input
                      type="text"
                      id="category_name"
                      name="category_name"
                      value={formData.category_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                {/* status */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="status">status:</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select status</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                {/* leave type */}
                {/* status */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="staus">leave_type:</label>
                    <select
                      id="leave_type"
                      name="leave_type"
                      value={formData.leave_type}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select leave type</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* leave day */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="leave_day">Leave day:</label>
                    <input
                      type="text"
                      id="leave_day"
                      name="leave_day"
                      value={formData.leave_day}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                {/* max leave duration */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="max_leave_duration">
                      max leave duration:
                    </label>
                    <input
                      type="text"
                      id="max_leave_duration"
                      name="max_leave_duration"
                      value={formData.max_leave_duration}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="leave_day">leave_day:</label>
                    <input
                      type="text"
                      id="leave_day"
                      name="leave_day"
                      value={formData.leave_day}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="max_leave_duration">
                      max_leave_duration:
                    </label>
                    <input
                      type="text"
                      id="max_leave_duration"
                      name="max_leave_duration"
                      value={formData.max_leave_duration}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Add Leave Category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
