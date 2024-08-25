import React, { useState } from "react";
import { Link } from "react-router-dom";

function ShiftForm() {
  const [shiftData, setShiftData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    lunch_start: "",
    lunch_out: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data to the backend
    console.log(shiftData);
  };

  return (
    <div
      className="shift-form-container"
      style={{ padding: "20px", backgroundColor: "#f8f9fa" }}
    >
      <h2 style={{ color: "#d9534f" }}>Add New Shift</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shift Name:</label>
          <input
            type="text"
            name="name"
            value={shiftData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={shiftData.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            value={shiftData.end_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Lunch Start:</label>
          <input
            type="datetime-local"
            name="lunch_start"
            value={shiftData.lunch_start}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Lunch End:</label>
          <input
            type="datetime-local"
            name="lunch_out"
            value={shiftData.lunch_out}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={shiftData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#5cb85c",
            color: "#fff",
            padding: "10px 20px",
          }}
        >
          Add Shift
        </button>
      </form>
      <Link
        to="/shift-list"
        style={{ display: "block", marginTop: "20px", color: "#d9534f" }}
      >
        View Shift List
      </Link>
    </div>
  );
}

export default ShiftForm;
