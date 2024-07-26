import React, { useState } from "react";
import axios from "axios";

const DayForm = () => {
  // State to manage form data
  const [dayName, setdayName] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to backend to create a new day
      await axios.post("/api/days/", { name: dayName });

      // Clear form after successful submission
      setdayName("");
      alert("day created successfully!");
    } catch (error) {
      console.error("Error creating day:", error);
      alert("Error creating day. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Add Working Day</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Working Day Name:</label>
                  <input
                    type="text"
                    id="dayName"
                    value={dayName}
                    className="form-control"
                    onChange={(e) => setdayName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Day
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayForm;
