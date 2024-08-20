import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { addEmployee } from "../../../redux/actions/employeeActions";
import axios from "axios";

const EmployeeForm = ({ addEmployee }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [formData, setFormData] = useState({
    name: "",
    employee_type: "",
    role: "",
    date_issued: "",
    province: "",
    zone: "",
    district: "",
    municipality: "",
    ward_no: "",
    tole_name: "",
    pri_phone: "",
    sec_phone: "",
    email: "",
    gender: "",
    dob: "",
    department: "",
    designation: "",
    salary: "",
    supervisor_name: "",
    joining_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addEmployee(formData);
  //   alert("Employee created successfully!");
  // };
  // api
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
    <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
      {/* <div className="container-fluid"> */}
      <div className="card">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggle("1")}
            >
              General Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggle("2")}
            >
              Address
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => toggle("3")}
            >
              Company Info
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="card">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                  <h5 className="navbar-brand">Add Employee</h5>
                  <div className="navbar-nav ml-auto">
                    <Link to="employee/list/" className="nav-link btn btn-info">
                      <h5>Employee List</h5>
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
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
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="date_issued">Date Issued:</label>
                        <input
                          type="date"
                          id="date_issued"
                          name="date_issued"
                          value={formData.date_issued}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="pri_phone">Primary Phone:</label>
                        <input
                          type="text"
                          id="pri_phone"
                          name="pri_phone"
                          value={formData.pri_phone}
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
                        <label htmlFor="sec_phone">Secondary Phone:</label>
                        <input
                          type="text"
                          id="sec_phone"
                          name="sec_phone"
                          value={formData.sec_phone}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
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
                    </div>
                    <div className="col-md-4">
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
                    </div>
                  </div>

                  <div className="row">
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
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => toggle("2")}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </TabPane>

          <TabPane tabId="2">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="province">Province:</label>
                        <input
                          type="text"
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
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
                      </div>
                    </div>
                    <div className="col-md-4">
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
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="municipality">Municipality:</label>
                        <input
                          type="text"
                          id="municipality"
                          name="municipality"
                          value={formData.municipality}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="ward_no">Ward No:</label>
                        <input
                          type="text"
                          id="ward_no"
                          name="ward_no"
                          value={formData.ward_no}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="tole_name">Tole Name:</label>
                        <input
                          type="text"
                          id="tole_name"
                          name="tole_name"
                          value={formData.tole_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => toggle("3")}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </TabPane>

          <TabPane tabId="3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
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
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="designation">Designation:</label>
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
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="salary">Salary:</label>
                        <input
                          type="number"
                          id="salary"
                          name="salary"
                          value={formData.salary}
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
                        <label htmlFor="supervisor_name">
                          Supervisor Name:
                        </label>
                        <input
                          type="text"
                          id="supervisor_name"
                          name="supervisor_name"
                          value={formData.supervisor_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="joining_date">Joining Date:</label>
                        <input
                          type="date"
                          id="joining_date"
                          name="joining_date"
                          value={formData.joining_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Add Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
      {/* </div> */}
    </div>
  );
};

export default EmployeeForm;

// export default connect(null, { addEmployee })(EmployeeForm);

// // added mapstatetoprops  for redux api
// const mapStateToProps = (state) => ({
//   employeeState: state.employee,
// });
// export default connect(mapStateToProps, { addEmployee })(EmployeeForm);
