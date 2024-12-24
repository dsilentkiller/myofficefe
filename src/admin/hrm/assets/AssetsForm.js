import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function AssetsForm() {
  const [formData, setFormData] = useState({
    assets_name: "",
    serial_num: "",
    status: "",
    created: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/employees",
        formData
      );
      console.log(response.data);
      alert("Employee created successfully!");
      // You can reset the form or navigate to another page here
    } catch (error) {
      console.error("There was an error creating the employee!", error);
      alert("Failed to create employee.");
    }
  };

  return (
    <div>
      <div className="card">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <h5 className="navbar-brand">Add Assets</h5>
            <div className="navbar-nav ml-auto">
              <Link to="/dashboard/assets/list/">
                <h5>Assets List</h5>
              </Link>
            </div>
          </div>
        </nav>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="name"> Assets Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.assets_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="serial_num">Assets Name :</label>
                  <input
                    type="number"
                    id="serial_num"
                    name="serial_num"
                    value={formData.serial_num}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="created">Created</label>
                  <input
                    type="date"
                    id="created"
                    name="created"
                    value={formData.created}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="description">description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div> */}
              {/* </div> */}

              {/* <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div> */}
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssetsForm;
