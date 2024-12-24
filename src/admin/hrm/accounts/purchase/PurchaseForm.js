import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

const PurchaseForm = ({ onSubmit }) => {
  const [purchaseData, setPurchaseData] = useState({
    client_id: "",
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const handleChange = (e) => {
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(purchaseData);
  };

  return (
    <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
      {/* <div className="container-fluid"> */}
      {/* <div className="card"> */}
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Project Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group">
              <label>Client ID</label>
              <input
                type="text"
                className="form-control"
                name="client_id"
                value={purchaseData.client_id}
                onChange={handleChange}
                placeholder="Enter Client ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                name="project_name"
                value={purchaseData.project_name}
                onChange={handleChange}
                placeholder="Enter Project Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={purchaseData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="start_date"
                value={purchaseData.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="end_date"
                value={purchaseData.end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                value={purchaseData.status}
                onChange={handleChange}
                required
              >
                <option value="0">Completed</option>
                <option value="1">Pending</option>
                <option value="2">Doing</option>
                <option value="3">Start</option>
                <option value="4">Planning</option>
              </select>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
