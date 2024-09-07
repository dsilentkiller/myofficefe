import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerVisitPeriodForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/customer-visit-periods/", { name });
      setName(""); // Clear the input field after submission
      alert("Municipality created successfully!");
      history.push("/municipalities"); // Redirect to the municipality list
    } catch (error) {
      console.error("Error adding municipality:", error);
      setError("Failed to create municipality. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Add Municipality</h4>
            </div>
            <div className="card-body">
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Customer visit period
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerVisitPeriodForm;
