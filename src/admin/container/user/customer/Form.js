import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { addEmployee } from "../../../redux/actions/employeeActions";
import axios from "axios";

const CustomerForm = ({ addEmployee }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [formData, setFormData] = useState({
    //genral information
    customer_name: "",
    customer_type: "", //permanent , project , give_software_name
    pri_phone: "",
    sec_phone: "",
    email: "",
    gender: "",
    age: "",
    department: "",
    designation: "",
    joining_date: "",

    //permanent address
    province: "",
    zone: "",
    district: "",
    municipality: "",
    ward_no: "",
    tole_name: "",
    //temprary address
    temp_province: "",
    temp_zone: "",
    temp_district: "",
    temp_municipality: "",
    temp_ward_no: "",
    temp_tole_name: "",

    //other
    product_name: "", //customer product name  select from list
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
        temp_province: formData.province,
        temp_zone: formData.zone,
        temp_district: formData.district,
        temp_municipality: formData.municipality,
        temp_ward_no: formData.ward_no,
        temp_tole_name: formData.tole_name,
      });
    } else {
      setFormData({
        ...formData,
        temp_province: "",
        temp_zone: "",
        temp_district: "",
        temp_municipality: "",
        temp_ward_no: "",
        temp_tole_name: "",
      });
    }
  }

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
        "http://127.0.0.1:8000/customer/",
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
                  <h5 className="navbar-brand">Add Customer</h5>
                  <div className="navbar-nav ml-auto">
                    <Link to="customer/list/" className="nav-link btn btn-info">
                      <h5>Customer List</h5>
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Customer Name:</label>
                        <input
                          type="text"
                          id="customer_name"
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-4">
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
                    </div> */}
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

          {/* <TabPane tabId="2">
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

                  {/* temporary address */}
          {/* <div className="row">
                    <div className="row">
                      <h5 className="btn btn-info"> Temporary Address</h5>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="province">Province:</label>
                        <input
                          type="text"
                          id="temp_province"
                          name="temp_province"
                          value={formData.temp_province}
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
                          id="temp_zone"
                          name="temp_zone"
                          value={formData.temp_zone}
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
                          id="temp_district"
                          name="temp_district"
                          value={formData.temp_district}
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
                          id="temp_municipality"
                          name="temp_municipality"
                          value={formData.temp_municipality}
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
                          id="temp_ward_no"
                          name="temp_ward_no"
                          value={formData.temp_ward_no}
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
                          id="temp_tole_name"
                          name="temp_tole_name"
                          value={formData.temp_tole_name}
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
          </TabPane> */}

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
                        <label htmlFor="temp_province">Province:</label>
                        <input
                          type="text"
                          id="temp_province"
                          name="temp_province"
                          value={formData.temp_province}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_zone">Zone:</label>
                        <input
                          type="text"
                          id="temp_zone"
                          name="temp_zone"
                          value={formData.temp_zone}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_district">District:</label>
                        <input
                          type="text"
                          id="temp_district"
                          name="temp_district"
                          value={formData.temp_district}
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
                        <label htmlFor="temp_municipality">Municipality:</label>
                        <input
                          type="text"
                          id="temp_municipality"
                          name="temp_municipality"
                          value={formData.temp_municipality}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_ward_no">Ward No:</label>
                        <input
                          type="text"
                          id="temp_ward_no"
                          name="temp_ward_no"
                          value={formData.temp_ward_no}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_tole_name">Tole Name:</label>
                        <input
                          type="text"
                          id="temp_tole_name"
                          name="temp_tole_name"
                          value={formData.temp_tole_name}
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

export default CustomerForm;

// export default connect(null, { addEmployee })(EmployeeForm);

// // added mapstatetoprops  for redux api
// const mapStateToProps = (state) => ({
//   employeeState: state.employee,
// });
// export default connect(mapStateToProps, { addEmployee })(EmployeeForm);

// import React, { useState } from "react";

// export default function CustomerForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     joining_date: "",
//     customer_type: "",
//     name: "",
//     tole_name: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     gender: "",
//     // address
//     province: "",
//     zone: "",
//     district: "",
//     municipality: "",
//     ward_no: "",
//     //temprary address
//     temp_province: "",
//     temp_zone: "",
//     temp_district: "",
//     temp_municipality: "",
//     temp_ward_no: "",
//     // organization
//     organization_name: "",
//     department: "",
//     designation: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     alert("Customer created successfully!");
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="form-group">
//             <label htmlFor="employee_type">Customer Type:</label>
//             <input
//               type="text"
//               id="employee_type"
//               name="employee_type"
//               value={formData.employee_type}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case3
//       case 3:
//         return (
//           <div className="form-group">
//             <label htmlFor="joining_date">Joining_date:</label>
//             <input
//               type="date"
//               id="date"
//               name="joining_date"
//               value={formData.joining_date}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case4
//       case 4:
//         return (
//           <div className="form-group">
//             <label htmlFor="employee_type">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case5
//       case 5:
//         return (
//           <div className="form-group">
//             <label htmlFor="employee_type">tole_name:</label>
//             <input
//               type="text"
//               id="tole_name"
//               name="tole_name"
//               value={formData.tole_name}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case6
//       case 6:
//         return (
//           <div className="form-group">
//             <label htmlFor="employee_type">Primary Phone:</label>
//             <input
//               type="text"
//               id="pri_phone"
//               name="pri_phone"
//               value={formData.pri_phone}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case7
//       case 7:
//         return (
//           <div className="form-group">
//             <label htmlFor="sec_phone">Contact no:</label>
//             <input
//               type="text"
//               id="sec_phone"
//               name="sec_phone"
//               value={formData.sec_phone}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );

//       // case 8
//       case 8:
//         return (
//           <div className="form-group">
//             <label htmlFor="email">Email :</label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case9
//       case 9:
//         return (
//           <div className="form-group">
//             <label htmlFor="gender">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="form-control"
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="IT">Male</option>
//               <option value="Finance">Female</option>
//             </select>
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );

//       // case10
//       case 10:
//         return (
//           <div className="form-group">
//             <label htmlFor="province">Province</label>
//             <input
//               type="text"
//               id="province"
//               name="province"
//               value={formData.province}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case11
//       case 11:
//         return (
//           <div className="form-group">
//             <label htmlFor="zone">Zone:</label>
//             <input
//               type="text"
//               id="zone"
//               name="zone"
//               value={formData.zone}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case12
//       case 12:
//         return (
//           <div className="form-group">
//             <label htmlFor="district">District:</label>
//             <input
//               type="text"
//               id="district"
//               name="district"
//               value={formData.district}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // minicipality
//       case 13:
//         return (
//           <div className="form-group">
//             <label htmlFor="district">Municipality:</label>
//             <input
//               type="text"
//               id="municipality"
//               name="municipality"
//               value={formData.municipality}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // ward_no
//       case 14:
//         return (
//           <div className="form-group">
//             <label htmlFor="district">Ward No:</label>
//             <input
//               type="text"
//               id="ward_no"
//               name="ward_no"
//               value={formData.ward_no}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case15
//       case 15:
//         return (
//           <div className="form-group">
//             <label htmlFor="organization_name">organization_name:</label>
//             <input
//               type="text"
//               id="organization_name"
//               name="organization_name"
//               value={formData.organization_name}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case16
//       case 16:
//         return (
//           <div className="form-group">
//             <label htmlFor="department">Department:</label>
//             <input
//               type="text"
//               id="department"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );
//       // case17
//       case 17:
//         return (
//           <div className="form-group">
//             <label htmlFor="organization_name">designation:</label>
//             <input
//               type="text"
//               id="designation"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//             <button onClick={prevStep} className="btn btn-secondary mt-2 mr-2">
//               Previous
//             </button>
//             <button onClick={nextStep} className="btn btn-primary mt-2">
//               Next
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create Customer</h2>
//       <form onSubmit={handleSubmit}>{renderStep()}</form>
//     </div>
//   );
// }
