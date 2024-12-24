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

    district: "",
    municipality: "",
    street_address: "",
    sec_address: "",

    //other
    // product_name: "", //customer product name  select from list
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
        temp_street_address: formData.street_address,
        temp_sec_address: formData.sec_address,
      });
    } else {
      setFormData({
        ...formData,
        temp_province: "",
        temp_zone: "",
        temp_district: "",
        temp_municipality: "",
        temp_street_address: "",
        temp_sec_address: "",
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
                    <Link
                      to="/admin/customer/"
                      className="nav-link btn btn-info"
                    >
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
                      </div>
                    </div>
                  </div> */}

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
                        <label htmlFor="street_address">Ward No:</label>
                        <input
                          type="text"
                          id="street_address"
                          name="street_address"
                          value={formData.street_address}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="sec_address">Tole Name:</label>
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

                  {/* temporary address */}
          <div className="row">
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
                        <label htmlFor="street_address">Ward No:</label>
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
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="sec_address">Tole Name:</label>
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
                        <label htmlFor="street_address">Ward No:</label>
                        <input
                          type="text"
                          id="street_address"
                          name="street_address"
                          value={formData.street_address}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="sec_address">temp address </label>
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
                        <label htmlFor="temp_street_address">Ward No:</label>
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
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="temp_sec_address">Tole Name:</label>
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
                      Add customer
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
old data isnot display
 
import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slice/crm/categorySlice";
import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
import { fetchDesignations } from "../../redux/slice/base/designationSlice";
import { fetchDistricts } from "../../redux/slice/base/districtSlice";
import { fetchMunicipalities } from "../../redux/slice/base/municipalitySlice";
import { fetchProvinces } from "../../redux/slice/base/provinceSlice";
import classnames from "classnames";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
import {
  createCustomer,
  fetchCustomerByIdUpdate,
  fetch,
  fetchCustomerByIdUpdateCustomerByIdUpdate,
} from "../../redux/slice/customer/customerSlice";
import "react-phone-input-2/lib/style.css";

const CustomerForm = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { id } = useParams(); // Get the customer ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState({ toggle: false });
  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [formData, setFormData] = useState({
            customer_name: "",
            customer_type: "",
            pri_phone: "",
            sec_phone: "",
            email: "",
            gender: "",
            organization_name: "",
            category:"",
            department: "",
            designation: "",
            joining_date: "",
            estimated_budget:"",
            province: "",
            district: "",
            municipality: "",
            street_address: "",
            sec_address: "",
            work_status:"",
            history:"",
  })
  //Similarly, memoize other selectors for municipalities, departments, and designations.

  const { list: provinces } = useSelector((state) => state.provinces);
  const { list: categories } = useSelector((state) => state.categories);
  const { list: districts } = useSelector((state) => state.districts);
  const { list: municipalities } = useSelector((state) => state.municipalities);
  const { list: departments } = useSelector((state) => state.departments);
  const { list: designations } = useSelector((state) => state.designations);
  const customers = useSelector((state) => state.customers.list || []);
    
  // Retrieve data from the store
  const customerToUpdate = useSelector(
    (state) => state.customers.customerToUpdate
  );

  useEffect(() => {
    console.log("Current customer State:", customerToUpdate);
  }, [customerToUpdate]);
 // Retrieve data from the store

  

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerByIdUpdate(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProvinces());
    dispatch(fetchDistricts());
    dispatch(fetchDesignations());
    dispatch(fetchDepartments());
    dispatch(fetchMunicipalities());
  }, [dispatch]);
  useEffect(() => {
    console.log("Provinces:", provinces);
    console.log("Districts:", districts);
    // console.log("Municipalities:", municipalities);
  }, [provinces, districts]);
// pri_phone number validate
const validatePhoneNumber = (value) => {
  const phoneLength = value.replace(/\D/g, "").length;
  if (phoneLength >= 10 && phoneLength <= 17) {
    setPhoneValid(true);
  } else {
    setPhoneValid(false);
  }
  setFormData({ ...formData, pri_phone: value });
};
// sec phone valid

const validateSecPhoneNumber = (value) => {
  const phoneLength = value.replace(/\D/g, "").length;
  if (phoneLength >= 10 && phoneLength <= 17) {
    setPhoneValid(true);
  } else {
    setPhoneValid(false);
  }
  setFormData({ ...formData, sec_phone: value });
};
  // current customer

  useEffect(() => {
    if (customerToUpdate && id) {
      setFormData({
        customer_name: customerToUpdate.customer_name || "",
        category: customerToUpdate.category || "",
        organization_name: customerToUpdate.organization_name || "",
        department: customerToUpdate.department || "",
        designation: customerToUpdate.designation || "",
        pri_phone: customerToUpdate.pri_phone || "",
        sec_phone: customerToUpdate.sec_phone || "",
        email: customerToUpdate.email || "",
        gender: customerToUpdate.gender || "",
        province: customerToUpdate.province || "",
        district: customerToUpdate.district || "",
        municipality: customerToUpdate.municipality || "",

        street_address: customerToUpdate.street_address || "",
        sec_address: customerToUpdate.sec_address || "",
        estimated_amount: customerToUpdate.estimated_amount || "",
        problem: customerToUpdate.problem || "",
        known_by: customerToUpdate.known_by || "",
        created: customerToUpdate.created || "",
        next_follow_up_date: customerToUpdate.next_follow_up_date || "",
        history: customerToUpdate.history || "",
      });
    } else if (!customerToUpdate && id) {
      toast.error("Failed to load customer details for update.");
    }
  }, [customerToUpdate, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.customer_name || !formData.category || !formData.pri_phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!phoneValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const formDataToSubmit = {
      ...formData,
      category: formData.category,
      department: formData.department,
      designation: formData.designation,
      province: formData.province,
      district: formData.district,
      municipality: formData.municipality,
    };

    if (id) {
      dispatch(fetchCustomerByIdUpdate({ id, ...formDataToSubmit }))
        .unwrap()
        .then(() => {
          toast.success("Customer updated successfully!");
          navigate("/dashboard/customer/customer-list/"); // navigate to customer list or details
        })
        .catch((error) => {
          toast.error(Failed to update customer: ${error.message || "An error occurred"});
        });
    } else {
      dispatch(createCustomer(formDataToSubmit))
        .unwrap()
        .then(() => {
          toast.success("Customer created successfully!");
          setFormData({
            customer_name: "",
            customer_type: "",
            pri_phone: "",
            sec_phone: "",
            email: "",
            gender: "",
            organization_name: "",
            department: "",
            designation: "",
            joining_date: "",
            province: "",
            district: "",
            municipality: "",
            street_address: "",
            sec_address: ""
          });
          navigate("/dashboard/customer/customer-list/"); // navigate to customer list or details
        })
        .catch((error) => {
          toast.error(Failed to create customer: ${error.message || "An error occurred"});
        });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  return (
    <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
  
      
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
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {/* customer type */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="gender">Customer type:</label>
                        <select
                          id="customer_type"
                          name="customer_type"
                          value={formData.customer_type}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select customer type</option>
                          <option value="permanent">permanent</option>
                          <option value="temporary">temporary</option>
                          <option value="contract">contract</option>
                          <option value="saas">saas</option>
                        </select>
                      </div>
                    </div>

                     {/* Phone Field */}
                    {/* <div className="row"> */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="pri_phone">Phone:</label>
                        <PhoneInput
                          country={"np"} // Country code for Nepal
                          value={formData.pri_phone}
                          onChange={validatePhoneNumber}
                          inputStyle={{
                            width: "100%",
                            borderColor: phoneValid ? "green" : "red",
                            backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
                          }}
                        />
                        {!phoneValid && (
                          <p style={{ color: "red" }}>
                            Please enter a valid phone number between 10 and 15
                            digits.
                          </p>
                        )}
                      </div>
                      {/* </div> */}
                      {errors.pri_phone && <p>{errors.pri_phone}</p>}
                    </div>

                    {/* sec phone */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="sec_phone">Contact no:</label>
                        <PhoneInput
                          country={"np"} // Country code for Nepal
                          value={formData.sec_phone}
                          onChange={validateSecPhoneNumber}
                          inputStyle={{
                            width: "100%",
                            borderColor: phoneValid ? "green" : "red",
                            backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
                          }}
                        />
                        {!phoneValid && (
                          <p style={{ color: "red" }}>
                            Please enter a valid phone number between 10 and 15
                            digits.
                          </p>
                        )}
                      </div>
                      {/* </div> */}
                      {errors.sec_phone && <p>{errors.sec_phone}</p>}
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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

                  
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="estimated_budget">estimated_budget:</label>
                        <input
                          type="number"
                          id="estimated_budget"
                          name="estimated_budget"
                          value={formData.estimated_budget}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* work status */}         

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="joining_date">Joining Date:</label>
                        <input
                          type="date"
                          id="joining_date"
                          name="joining_date"
                          value={formData.joining_date}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="work_status">Status</label>
                        <select
                          id="work_status"
                          name="work_status"
                          value={formData.work_status}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select status</option>
                          <option value="new">new</option>
                          <option value="pending">pending</option>
                          <option value="completed">completed</option>
                          <option value="active">active</option>
                          <option value="issue">Issue</option>
                          <option value="terminated ">terminated by force</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>


                    {/* history */}

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="history">
                         history:
                        </label>
                        <textarea
                          type="text"
                          id="history"
                          name="history"
                          value={formData.history}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>


                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Add customer
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