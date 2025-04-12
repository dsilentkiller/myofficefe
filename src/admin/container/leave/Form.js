import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LeaveForm() {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    leave_category: "",
    leave_period: "",
    status: "",
    allocated_day: "",
    is_approved: "",
    default_days: "",
    reason: "",
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
          "http://127.0.0.1:8000/leave/",
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
              <h5 className="navbar-brand">Add Leave </h5>
              <div className="navbar-nav ml-auto">
                <Link to="leave/list">
                  <h5>Leave List</h5>
                </Link>
              </div>
            </div>
          </nav>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    {/* start date */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="start_date">Start Date :</label>
                        <input
                          type="date"
                          id="start_date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {/* end date  */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="end_date">End Date </label>
                        <input
                          type="date"
                          id="end_date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* leave category*/}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="status">leave_category</label>
                        <select
                          id="leave_category"
                          name="leave_category"
                          value={formData.leave_category}
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

                    {/* leave period */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="<name"> Leave Period :</label>
                        <input
                          type="text"
                          id="leave_period"
                          name="leave_period"
                          value={formData.leave_period}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* status */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                      <option value="start">start</option>
                    </select>
                  </div>
                </div>
                {/* allocated day */}
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="allocated_day">Allocated day:</label>
                      <input
                        type="text"
                        id="allocated_day"
                        name="allocated_day"
                        value={formData.allocated_day}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  {/* default days */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="default_days">default days</label>
                      <input
                        type="text"
                        id="default_days"
                        name="default_days"
                        value={formData.default_days}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  {/* reason */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="reason">reason:</label>
                      <input
                        type="text"
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="is_approved">Is Approved:</label>
                      <select
                        id="is_approved"
                        name="is_approved"
                        value={formData.is_approved}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Approval Status</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Add Leave
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
