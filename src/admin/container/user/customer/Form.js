import React, { useState } from "react";

export default function CustomerForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    joining_date: "",
    customer_type: "",
    name: "",
    tole_name: "",
    pri_phone: "",
    sec_phone: "",
    email: "",
    gender: "",
    // address
    province: "",
    zone: "",
    district: "",
    municipality: "",
    ward_no: "",
    // organization
    organization_name: "",
    department: "",
    designation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Customer created successfully!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <label htmlFor="employee_type">Customer Type:</label>
            <input
              type="text"
              id="employee_type"
              name="employee_type"
              value={formData.employee_type}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case3
      case 3:
        return (
          <div className="form-group">
            <label htmlFor="joining_date">Joining_date:</label>
            <input
              type="date"
              id="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case4
      case 4:
        return (
          <div className="form-group">
            <label htmlFor="employee_type">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case5
      case 5:
        return (
          <div className="form-group">
            <label htmlFor="employee_type">tole_name:</label>
            <input
              type="text"
              id="tole_name"
              name="tole_name"
              value={formData.tole_name}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case6
      case 6:
        return (
          <div className="form-group">
            <label htmlFor="employee_type">Primary Phone:</label>
            <input
              type="text"
              id="pri_phone"
              name="pri_phone"
              value={formData.pri_phone}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case7
      case 7:
        return (
          <div className="form-group">
            <label htmlFor="sec_phone">Contact no:</label>
            <input
              type="text"
              id="sec_phone"
              name="sec_phone"
              value={formData.sec_phone}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );

      // case 8
      case 8:
        return (
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case9
      case 9:
        return (
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Gender</option>
              <option value="IT">Male</option>
              <option value="Finance">Female</option>
            </select>
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );

      // case10
      case 10:
        return (
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case11
      case 11:
        return (
          <div className="form-group">
            <label htmlFor="zone">Zone:</label>
            <input
              type="text"
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case12
      case 12:
        return (
          <div className="form-group">
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // minicipality
      case 13:
        return (
          <div className="form-group">
            <label htmlFor="district">Municipality:</label>
            <input
              type="text"
              id="municipality"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // ward_no
      case 14:
        return (
          <div className="form-group">
            <label htmlFor="district">Ward No:</label>
            <input
              type="text"
              id="ward_no"
              name="ward_no"
              value={formData.ward_no}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case15
      case 15:
        return (
          <div className="form-group">
            <label htmlFor="organization_name">organization_name:</label>
            <input
              type="text"
              id="organization_name"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case16
      case 16:
        return (
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );
      // case17
      case 17:
        return (
          <div className="form-group">
            <label htmlFor="organization_name">designation:</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
              Previous
            </button>
            <button onClick={nextStep} className="btn btn-primary mt-2">
              Next
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>{renderStep()}</form>
    </div>
  );
}
