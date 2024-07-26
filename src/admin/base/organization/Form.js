import React, { useState } from "react";
import axios from "axios";

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    zone: "",
    district: "",
    pri_phone: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    municipality: "",
    ward_no: "",
    tole_name: "",
    pan_vat: "",
    registration_no: "",
    phone: "",
    currency: "",
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
      // await axios.post("/api/organizations/", formData);
      // Reset the form after successful submission
      setFormData({
        name: "",
        province: "",
        zone: "",
        district: "",
        pri_phone: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        municipality: "",
        ward_no: "",
        tole_name: "",
        pan_vat: "",
        registration_no: "",
        phone: "",
        currency: "",
      });
      alert("Organization created successfully!");
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };
  return (
    <div className="section">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Add Organization</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                {/* Organization Name */}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Organization Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* phone */}
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Add other form fields similarly */}
                {/* Example: */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="department" className="form-label">
                    Department:
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="designation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="salary" className="form-label">
                    Salary
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
