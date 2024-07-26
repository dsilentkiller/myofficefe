import React, { useState } from "react";
import axios from "axios";

const WorkingForm = () => {
  // State to manage form data
  const [name, setName] = useState("");
  const [working_days, setWorkingDays] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to backend to create a new Working
      await axios.post("/api/working/", { name: working_days });

      // Clear form after successful submission
      setWorkingDays("");
      alert("Working created successfully!");
    } catch (error) {
      console.error("Error creating Working:", error);
      alert("Error creating Working. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Add Working Days</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Day Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    className="form-control"
                    onChange={(e) => setWorkingDays(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Working Day:</label>
                  <input
                    type="text"
                    id="working_days"
                    value={working_days}
                    className="form-control"
                    onChange={(e) => setWorkingDays(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Working Day
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingForm;
