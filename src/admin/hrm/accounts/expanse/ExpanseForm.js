import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ExpanseForm = ({ onSubmit }) => {
  const [expanseData, setExpanseData] = useState({
    purchased_date: "",
    emp_name: "",
    category_name: "",
    amount_spent: "",
    purpose: "",
    description: "",
    designation: "",
    department: "",
    status: "pending",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setExpanseData({
      ...expanseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expanseData);
    history.push("/admin/expanse");
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Expanse Form</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label>Purchased Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="purchased_date"
              value={expanseData.purchased_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Employee Name</label>
            <input
              type="text"
              className="form-control"
              name="emp_name"
              value={expanseData.emp_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              name="category_name"
              value={expanseData.category_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount Spent</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="amount_spent"
              value={expanseData.amount_spent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Purpose</label>
            <input
              type="text"
              className="form-control"
              name="purpose"
              value={expanseData.purpose}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={expanseData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              name="designation"
              value={expanseData.designation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={expanseData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={expanseData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="not approved">Not Approved</option>
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
  );
};

export default ExpanseForm;
