import React, { useState } from "react";
import axios from "axios";

const ZoneForm = () => {
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
      // Send a POST request to create a new zone
      await axios.post("http://127.0.0.1:8000/api/setup/zones/", formData);
      // Clear form fields after submission
      setFormData({
        name: "",
      });
      // Optionally, you can add a success message or redirect the user
    } catch (error) {
      console.error("Error creating zone:", error);
      // Optionally, you can display an error message to the user
    }
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
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* You can add more fields here based on your requirements */}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneForm;
