import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { addEmployee } from "../../../redux/actions/employeeActions";
import axios from "axios";

const EmployeeForm = ({ addEmployee }) => {
  const [activeTab, setActiveTab] = useState("1");
  // const [departments, setDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [designations, setDesignations] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [municipalities, setMunicipalities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    employee_type: "",
    role: "",
    date_issued: "",

    department: "",
    zone: "",
    district: "",
    municipality: "",

    street_address: "",

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

  function handleSameAddress(event) {
    if (event.target.checked) {
      setFormData({
        ...formData,
        temp_department: formData.department,
        temp_zone: formData.zone,
        temp_district: formData.district,
        temp_municipality: formData.municipality,
        temp_sec_address: formData.sec_address,
        temp_street_address: formData.street_address,
      });
    // } else {
    //   setFormData({
    //     ...formData,
    //     temp_department: "",
    //     temp_zone: "",
    //     temp_district: "",
    //     temp_municipality: "",
    //     temp_sec_address: "",
    //     temp_street_address: "",
    //   });
    }
  }
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/setup/department/"
        );
        if (Array.isArray(response.data)) {
          setDepartments(response.data); // Set departments if response.data is an array
        } else if (Array.isArray(response.data.departments)) {
          setDepartments(response.data.departments); // Handle nested array if necessary
        } else {
          console.error("Unexpected data format", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the departments!", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/setup/designation/"
        );
        setDesignations(response.data);
      } catch (error) {
        console.error("There was an error fetching the designations!", error);
      }
    };

    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/setup/districts/"
        );
        console.log(response.data); // Check the structure of the response

        // Assuming the response should be an array or have an array inside it
        if (Array.isArray(response.data)) {
          setDistricts(response.data);
        } else if (Array.isArray(response.data.districts)) {
          setDistricts(response.data.districts);
        } else {
          console.error("Unexpected data format", response.data);
        }
      } catch (error) {
        console.error("Error fetching districts", error);
      }
    };

    const fetchMunicipalities = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/setup/municipalities/"
        );
        console.log(response.data); // Inspect the response data
        if (Array.isArray(response.data)) {
          setMunicipalities(response.data); // Set municipalities if response.data is an array
        } else if (Array.isArray(response.data.municipalities)) {
          setMunicipalities(response.data.municipalities); // Handle nested array if necessary
        } else {
          console.error("Unexpected data format", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the municipalities!", error);
      }
    };

    fetchDepartments();
    fetchDesignations();
    fetchDistricts();
    fetchMunicipalities();
  }, []);




  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/employee/create/",
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
                    <Link to="dashboard/user/employee">
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
                  <div className="row mt-3">
                    <h5 className="btn btn-info mb-2">Permanent Address</h5>
                  </div>
                  <div className="row">
                    {/* Permanent Address Fields */}

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="province">Province:</label>
                        <select
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select province</option>
                          {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>


                    {/* district */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="district">District:</label>
                        <select
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select District</option>
                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* municuipality */}
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="municipality">Municipality:</label>
                        <select
                          id="municipality"
                          name="municipality"
                          value={formData.municipality}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Municipality</option>
                          {municipalities.map((municipality) => (
                            <option
                              key={municipality.id}
                              value={municipality.id}
                            >
                              {municipality.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/*  */}

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="sec_address">Temporary address</label>
                        <input
                          type="text"
                          id="sec_address"
                          name="sec_address"
                          value={formData.sec_address}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                  </div>

                  {/* "Same as Permanent Address" Checkbox */}
                  <div className="form-group mt-3">
                    <input
                      type="checkbox"
                      id="sameAddressCheckbox"
                      onChange={handleSameAddress}
                    />
                    <label htmlFor="sameAddressCheckbox" className="ml-2">
                      Same as Permanent Address
                    </label>
                  </div>

                  {/* Temporary Address Fields */}
                  <div className="row mt-3">
                    <h5 className="btn btn-info mb-2">Temporary Address</h5>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_department">department:</label>
                        <select
                          id="temp_department"
                          name="temp_department"
                          value={formData.temp_department}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select department</option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_zone">Zone:</label>
                        <select
                          id="temp_zone"
                          name="temp_zone"
                          value={formData.temp_zone}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Zone</option>
                          {zones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_district">District:</label>
                        <select
                          id="temp_district"
                          name="temp_district"
                          value={formData.temp_district}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select District</option>
                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_municipality">Municipality:</label>
                        <select
                          id="temp_municipality"
                          name="temp_municipality"
                          value={formData.temp_municipality}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Municipality</option>
                          {municipalities.map((municipality) => (
                            <option
                              key={municipality.id}
                              value={municipality.id}
                            >
                              {municipality.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_sec_address">Ward No:</label>
                        <input
                          type="text"
                          id="temp_sec_address"
                          name="temp_sec_address"
                          value={formData.temp_sec_address}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_street_address">Tole Name:</label>
                        <input
                          type="text"
                          id="temp_street_address"
                          name="temp_street_address"
                          value={formData.temp_street_address}
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
                        <label htmlFor="department">Departments:</label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select department</option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </select>
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
