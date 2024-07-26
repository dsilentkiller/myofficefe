import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerVisitPeriodForm = () => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.post("/api/customer-visit-periods/", { name });
    //   setName(""); // Clear the input field after submission
    //   alert("Customer visit period added successfully!");
    // } catch (error) {
    //   console.error("Error adding customer visit period:", error);
    // }
  };

  return (
  
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Add Customer Visit Period</h4>
            </div>
            <div className="card-body">
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
                  Add Visit Period
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
