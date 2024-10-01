import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDepartments,
  fetchDesignations,
  fetchProvinces,
  fetchDistricts,
  fetchMunicipalities,
} from "../../redux/slice/crm/enquirySlice";

const EnquiryForm = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [categories, setcategories] = useState([]);

  // const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);

  // const [districts, setDistricts] = useState([]);

  const {
    // provinces,

    designations,
    departments,
    municipalities = [],

    provinces,
    districts,
    // zones: [],
    loading,
    error,
  } = useSelector((state) => state.enquiry);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customer_name: "",
    category: "",
    // category: "",
    department: "",
    designation: "",
    pri_phone: "",
    sec_phone: "",
    email: "",
    gender: "",

    province: "",
    zone: "",
    district: "",
    municipality: "",
    ward_no: "",
    tole_name: "",

    estimated_amount: "",
    enquiry_purpose: "",
    known_by: "",
    created: "",
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
        category: formData.department,
        temp_zone: formData.zone,
        temp_district: formData.district,
        temp_municipality: formData.municipality,
        temp_ward_no: formData.ward_no,
        temp_tole_name: formData.tole_name,
      });
    } else {
      setFormData({
        ...formData,
        category: "",
        temp_zone: "",
        temp_district: "",
        temp_municipality: "",
        temp_ward_no: "",
        temp_tole_name: "",
      });
    }
  }
  // Redux state

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchDistricts());
    // dispatch(fetch)
    dispatch(fetchDesignations());
    dispatch(fetchDepartments());
    dispatch(fetchMunicipalities());
  }, [dispatch]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/employee/new/",
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
                  <h5 className="navbar-brand">Add Enquiry</h5>
                  <div className="navbar-nav ml-auto">
                    <Link to="dashboard/crm/enquiry">
                      <h5>Enquiry Table</h5>
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* customer name */}
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
                    {/* enquory type */}
                    {/* <div className="col-md-4"> */}
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="category">enquiry type</label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select enquiry type</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="category">Enquiry Type</label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Enquiry Type</option>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))
                          ) : (
                            <option value="">No categories available</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="estimated_amount">
                          estimated_amount:
                        </label>
                        <input
                          type="number"
                          id="estimated_amount"
                          name="estimated_amount"
                          value={formData.estimated_amount}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      {/* departmebt */}

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="enquiry_purpose">
                            enquiry_purpose:
                          </label>
                          <input
                            type="number"
                            id="enquiry_purpose"
                            name="enquiry_purpose"
                            value={formData.enquiry_purpose}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      {/* known by */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="known_by">known_by:</label>
                          <input
                            type="number"
                            id="known_by"
                            name="known_by"
                            value={formData.known_by}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      {/* gender */}
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
                    {/* pri phone */}
                    <div className="row">
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
                      {/* </div> */}
                      {/* sec phone */}

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
                      {/* email */}
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

                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="zone">Zone:</label>
                        <select
                          id="zone"
                          name="zone"
                          value={formData.zone}
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
                    </div> */}
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

                    {/* <div className="col-md-4">
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
                          {Array.isArray(municipalities) &&
                          municipalities.length > 0 ? (
                            municipalities.map((municipality) => (
                              <option
                                key={municipality.id}
                                value={municipality.id}
                              >
                                {municipality.name}
                              </option>
                            ))
                          ) : (
                            <option>No municipalities available</option>
                          )}
                        </select>
                      </div>
                    </div> */}
                    {/*ward no  */}
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
                    {/* tole name */}
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
                  {/* <div className="row mt-3">
                    <h5 className="btn btn-info mb-2">Temporary Address</h5>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_zone">Zone:</label>
                        <select
                          id="temp_zone"
                          name="temp_zone"
                          value={formData.temp_zone}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                    </div> */}
                  {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_ward_no">Ward No:</label>
                        <input
                          type="text"
                          id="temp_ward_no"
                          name="temp_ward_no"
                          value={formData.temp_ward_no}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* Temporary Address Fields */}
                  {/* <div className="row mt-3">
                    <h5 className="btn btn-info mb-2">Temporary Address</h5>
                  </div>

                  <div className="row">
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
                    </div> */}
                  {/* <div className="col-md-4">
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
                  </div> */}

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
                        <label htmlFor="organization_name">
                          Organization name:
                        </label>
                        <input
                          type="text"
                          id="organization_name"
                          name="organization_name"
                          value={formData.organization_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
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
                      {/* designation */}

                      <div className="form-group">
                        <label htmlFor="designation">Designations:</label>
                        <select
                          id="designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select designation</option>
                          {designations.map((designation) => (
                            <option key={designation.id} value={designation.id}>
                              {designation.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="created">Enquiry date</label>
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

export default EnquiryForm;
