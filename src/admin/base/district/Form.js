import React, { useState } from "react";
import axios from "axios";

const DistrictForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
  });

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new district
      await axios.post("/api/districts/", formData);
      // Clear form fields after submission
      setFormData({
        name: "",
      });
      // Optionally, you can add a success message or redirect the user
    } catch (error) {
      console.error("Error creating district:", error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="content-wrapper">
      <div class="section">
        <div class="container">
          <div class="container-fluid">
            <div class="card">
              <div class="card-header">
                <h4>Add District</h4>
              </div>
              <div class="card-body">
                <div class="form group row">
                  <div class="col-md-8">
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />

                      <button type="submit">save me</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictForm;
