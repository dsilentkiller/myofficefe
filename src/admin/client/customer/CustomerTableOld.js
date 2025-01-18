
//this work fine best code ever
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

} from "../../redux/slice/customer/customerSlice";
import "react-phone-input-2/lib/style.css";

import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid, Typography, Box } from "@mui/material";

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
// ##added
const [filteredDistricts, setFilteredDistricts] = useState([]);
const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
  // Fetch districts when a province is selected
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

  // Handle changes in selection
  // const handleProvinceChange = (event) => {
  //   setSelectedProvince(event.target.value);
  // };

  // const handleDistrictChange = (event) => {
  //   setSelectedDistrict(event.target.value);
  // };

  // const handleMunicipalityChange = (event) => {
  //   setSelectedMunicipality(event.target.value);
  // };


// Update districts when province changes
useEffect(() => {
  if (formData.province) {
    setFilteredDistricts(districts.filter(district => district.provinceId === formData.province));
  } else {
    setFilteredDistricts([]);
  }
}, [formData.province, districts]);

// Update municipalities when district changes
useEffect(() => {
  if (formData.district) {
    setFilteredMunicipalities(municipalities.filter(municipality => municipality.districtId === formData.district));
  } else {
    setFilteredMunicipalities([]);
  }
}, [formData.district, municipalities]);

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

  // Update districts when province changes
  useEffect(() => {
    if (formData.province) {
      setFilteredDistricts(districts.filter((district) => district.provinceId === formData.province));
    } else {
      setFilteredDistricts([]);
    }
  }, [formData.province, districts]);

  // Update municipalities when district changes
  useEffect(() => {
    if (formData.district) {
      setFilteredMunicipalities(municipalities.filter((municipality) => municipality.districtId === formData.district));
    } else {
      setFilteredMunicipalities([]);
    }
  }, [formData.district, municipalities]);

//###
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
  // Handle form submission (optional)
    // console.log('Form submitted with:', {
    //   province: selectedProvince,
    //   district: selectedDistrict,
    //   municipality: selectedMunicipality,
    // })
  
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
          toast.error(`Failed to update customer: ${error.message || "An error occurred"}`);
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
          toast.error(`Failed to create customer: ${error.message || "An error occurred"}`);
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
                      to="/dashboard/customer/customer-list/"
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
            {/* <div className="card">
              <div className="card-body">
                <form>
                  <div className="row mt-3">
                    <h5 className="btn btn-info mb-2">Permanent Address</h5>
                  </div>
                  <div className="row"> */}
                    {/* Permanent Address Fields */}

                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="province">Province:</label>
                        <select
                          id="province"
                          name="province"
                          value={formData.province} */}
                          {/* // onChange={handleInputChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              province: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        >
                          <option value="">Select province</option>

                          {provinces.length > 0 ? (
                            provinces.map((province) => (
                              <option key={province.id} value={province.id}>
                                {province.name}
                              </option>
                            ))
                          ) : (
                            <option value="">No provinces available</option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* district */}
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="district">District:</label>
                        <select
                          id="district"
                          name="district"
                          value={formData.district}
                          // onChange={handleInputChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              district: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        >
                          <option value="">Select District</option>
                          {districts.length > 0 ? (
                            districts.map((district) => (
                              <option key={district.id} value={district.id}>
                                {district.name}
                              </option>
                            ))
                          ) : (
                            <option value="">no districts is available</option>
                          )}
                        </select>
                      </div>
                    </div> */} 

                  {/* municipality */}

                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="municipality">Municipality:</label>
                        <select
                          id="municipality"
                          name="municipality"
                          value={formData.municipality}
                          // onChange={handleInputChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              municipality: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        >
                          <option value="">Select Municipality</option>
                          {municipalities.length > 0 ? (
                            municipalities.map((municipality) => (
                              <option
                                key={municipality.id}
                                value={municipality.id}
                              >
                                {municipality.name}
                              </option>
                            ))
                          ) : (
                            <option value="">
                              no municipalities available
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    {/* street */}
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="street_address">street address:</label>
                        <input
                          type="text"
                          id="street_address"
                          name="street_address"
                          value={formData.street_address}
                          // onChange={handleInputChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              street_address: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                      </div>
                    </div> */}

                    {/* sec_address */}
                    {/* <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="sec_address">Additional address:</label>
                        <input
                          type="text"
                          id="sec_address"
                          name="sec_address"
                          value={formData.sec_address}
                          // onChange={handleInputChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sec_address: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div> */} 


{/* 
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
    </TabPane>  */}
      <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>Permanent Address</Typography>
      <form>
        <Grid container spacing={2}>
          {/* Province Field */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Province</InputLabel>
              <Select
                label="Province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="">
                  <em>Select Province</em>
                </MenuItem>
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* District Field */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!formData.province}>
              <InputLabel>District</InputLabel>
              <Select
                label="District"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="">
                  <em>Select District</em>
                </MenuItem>
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No districts available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Municipality Field */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!formData.district}>
              <InputLabel>Municipality</InputLabel>
              <Select
                label="Municipality"
                name="municipality"
                value={formData.municipality}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="">
                  <em>Select Municipality</em>
                </MenuItem>
                {filteredMunicipalities.length > 0 ? (
                  filteredMunicipalities.map((municipality) => (
                    <MenuItem key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No municipalities available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Street Address */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Street Address"
              name="street_address"
              value={formData.street_address}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Additional Address */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Additional Address"
              name="sec_address"
              value={formData.sec_address}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("Next Step")} // Replace with actual next step function
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
    </TabPane>

          <TabPane tabId="3">
            <div className="card">
              <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* organization name */}
                        <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="name">Organization name :</label>
                              <input
                                type="text"
                                id="organization_name"
                                name="organization_name"
                                value={formData.organization_name}
                                // onChange={handleInputChange}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    organization_name: e.target.value,
                                  })
                                }
                                className="form-control"
                                required
                              />
                            </div>
                        </div>

                      {/* category */}
                            <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="category">categories </label>
                                        <select
                                          id="category"
                                          name="category"
                                          value={formData.category}
                                          onChange={handleInputChange}
                                          className="form-control"
                                          required
                                        >
                                          <option value="">Select categories</option>
                                          {categories.length > 0 ? (
                                            categories.map((category) => (
                                              <option key={category.id} value={category.id}>
                                                {category.category_name}
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
                                    <label htmlFor="department">Departments:</label>
                                    <select
                                      id="department"
                                      name="department"
                                      value={formData.department}
                                      // onChange={handleInputChange}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          department: e.target.value,
                                        })
                                      }
                                      className="form-control"
                                      required
                                    >
                                      <option value="">Select department</option>
                                      {departments.length > 0 ? (
                                        departments.map((department) => (
                                          <option key={department.id} value={department.id}>
                                            {department.name}
                                          </option>
                                        ))
                                      ) : (
                                        <option value="">no departments available</option>
                                      )}
                                    </select>
                                  </div>
                              </div>

                      {/* designation  */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="designation">Designations:</label>
                          <select
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            // onChange={handleInputChange}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                designation: e.target.value,
                              })
                            }
                            className="form-control"
                            required
                          >
                            <option value="">Select designation</option>
                            {designations && designations.length > 0 ? (
                              designations.map((designation) => (
                                <option
                                  key={designation.id}
                                  value={designation.id}
                                >
                                  {designation.name}
                                </option>
                              ))
                            ) : (
                              <option value="">No designations available</option>
                            )}
                          </select>
                        </div>
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
      </div>
    // </div>
  );
};

export default CustomerForm;
//#########

  // const createStatus = useSelector((state) => state.customers.createStatus);
  // const updateStatus = useSelector((state) => state.customers.updateStatus);
  // const createError = useSelector((state) => state.customers.createError);
  // const updateError = useSelector((state) => state.customers.updateError);
// const formData = useSelector((state) => state.customers.currentcustomer);
  // added select district by province name
  // const handleProvinceChange = (provinceId) => {
  //   setFormData((prev) => ({ ...prev, province: provinceId, district: "" }));
  // };

  // const handleDistrictChange = (districtId) => {
  //   setFormData((prev) => ({ ...prev, district: districtId }));
  // };
  // Toggle function for switching tabs

  // Retrieve data from the store
//#####
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
//     sec_address: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     gender: "",
//     // address
//     province: "",
//     zone: "",
//     district: "",
//     municipality: "",
//     street_address: "",
//     //temprary address
//     temp_province: "",
//     temp_zone: "",
//     temp_district: "",
//     temp_municipality: "",
//     temp_street_address: "",
//     // organization
//     organization_name: "",
//     department: "",
//     designation: "",
//   });

//   const handleInputChange = (e) => {
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//             <label htmlFor="employee_type">sec_address:</label>
//             <input
//               type="text"
//               id="sec_address"
//               name="sec_address"
//               value={formData.sec_address}
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//       // street_address
//       case 14:
//         return (
//           <div className="form-group">
//             <label htmlFor="district">Ward No:</label>
//             <input
//               type="text"
//               id="street_address"
//               name="street_address"
//               value={formData.street_address}
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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
//               onChange={handleInputChange}
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


###########################################################################
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import customerForm from "./customerForm";
import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
import "../../css/Table.css";
import { Link, useNavigate } from "react-router-dom";
import CustomerDelete from "./CustomerDelete";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Paper,
  Box,
  Typography,
  Container,
  Toolbar,
  Button,
  TextField,
  IconButton,
} from "@mui/material";

const CustomerTable = () => {

  // const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const maxHistoryLength = 100; // Maximum characters to show for history
    // const maxEnquiryPurposeLength = 100;
    //fetching customers data and save into customers
  const customers = useSelector((state) => state.customers?.list || []);


  //fetching customers data into table
  useEffect(() => {
    dispatch(fetchCustomers());
        //live search handling
  }, [dispatch]);
  //checking in console whether data is passed or not
  useEffect(() => {
    console.log("Fetched customers:", customers);
  }, [customers]);
//filter data fetch in table for searching function
useEffect(() => {
  const timer = setTimeout(() => {
    if (searchTerm.trim()) {
      setFilteredCustomers(
        customers.filter((customer) =>
          customer.customer_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCustomers(customers);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm, customers]);

    // // Helper function to format date as a readable string
    // const formatDateTime = (dateString) => {
    //   if (!dateString) return "";
    //   const options = {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //     hour12: false,
    //   };
    //   return new Intl.DateTimeFormat("en-US", options).format(
    //     new Date(dateString)
    //   );
    // };

    // Helper function to check if the next follow-up date is tomorrow
    // const isTomorrow = (dateString) => {
    //   const now = new Date();
    //   const tomorrow = new Date(now.setDate(now.getDate() + 1));
    //   const nextFollowUp = new Date(dateString);

    //   // Set time to midnight for comparison
    //   tomorrow.setHours(0, 0, 0, 0);
    //   nextFollowUp.setHours(0, 0, 0, 0);

    //   return tomorrow.getTime() === nextFollowUp.getTime();
    // };

    // handle in page number
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1); // Reset to first page when items per page changes
    };

    const paginatedCustomers = filteredCustomers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );


    // Truncate the history text to maxHistoryLength
    const truncateHistory = (history) => {
      if (history && history.length > maxHistoryLength) {
        return history.substring(0, maxHistoryLength) + "..."; // Add ellipsis
      }
      return history;
    };
    //enquiry purpose
    // const truncateEnquiryPurpose = (enquiry_purpose) => {
    //   if (enquiry_purpose && enquiry_purpose.length > maxEnquiryPurposeLength) {
    //     return enquiry_purpose.substring(0, maxEnquiryPurposeLength) + "..."; // Add ellipsis
    //   }
    //   return enquiry_purpose;
    // };
    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    // if (error) {
    //   return <div>Error loading enquiries: {error.message}</div>;
    // }
    //--- handle searchitem in a table ----
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
    //--converting first letter  capital
    const formatName = (name) => {
      if (!name) return "";
      return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    };


  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              {/* <div className="container-fluid"> */}
                <h5 className="navbar-brand">Customer List</h5>
                <div className="navbar-nav ml-auto">
                  {/* <Link to="/dashboard/customer/create"  className="nav-Link btn btn-info"> */}

                  {/* </Link> */}
                  <form
                    method="get"
                    action="/customer/search/"
                    className="form-inline ml-3"
                  >
                    {/* <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="searchTerm"
                        className="form-control"
                        placeholder="Search Mockups, Logos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        required
                      />
                      <div className="input-group-append">
                        <Link type="submit" className="btn btn-info">
                          Search
                        </Link>
                      </div> */}
                    {/* </div> */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Search Customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ marginRight: 2 }}
            />
             <Button
                   to="/dashboard/customer/create"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}

            >
              Add Customer
            </Button>
             </Box>
                  </form>
                {/* </div> */}
              </div>
            </nav>
            {/* heading end */}
            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>organization </th>
                              <th>joining date</th>
                              <th>history</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCustomers.length > 0 ? (
                              filteredCustomers.map((customer,index) => (
                                <tr key={customer.id}>
                                   <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                  <td>{formatName(customer.customer_name)}</td>
                                  <td>{customer.pri_phone}</td>
                                  <td>{customer.email}</td>
                                  <td>{formatName(customer.organization_name)}</td>
                                  <td>{customer.joining_date}</td>
                                  <td>
                            {/* Display truncated history */}
                            <p>{truncateHistory(customer.history)}</p>
                          </td>
                                  {/* <td>{customer.street_address}</td> */}
                                  <td>
                                    <Link className="btn btn-primary col-mt-2" to ={`/dashboard/customer/update/${customer.id}`}>
                                      Edit
                                    </Link>

                                    <Link className="btn btn-info col-mt-1" to={`/dashboard/customer/detail/${customer.id}`}>
                                      View
                                    </Link>

                                    <Link
                              onClick={() => setCustomerToDelete(customer.id)}
                              className="btn btn-danger col-mt-1"
                            >
                              Delete
                            </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No customers found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             {/* <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={filteredCustomers.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}

            <div className="pagination-wrapper">
              <div className="pagination-controls">
                <div className="pagination-info">
                  <label htmlFor="itemsPerPage">Items per page:</label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-Link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &laquo;
                      </Link>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-Link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-Link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        &raquo;
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {customerToDelete !== null && (
          <CustomerDelete
            id={customerToDelete}
            onClose={() => setCustomerToDelete(null)}
          />
        )}

      </div>
     </div>
  );
};

export default CustomerTable;













// import React from "react";
// // import axios from "axios";
// import { useState, useEffect } from "react";
// // import customerForm from "./customerForm";
// import "../../css/Table.css";
// // import { fetchCustomer } from "../../redux/slice/crm/customerSlice";
// import {  useDispatch } from "react-redux"; // Correct import
// import { Link, useNavigate } from "react-router-dom";
// // import customerDelete from "./customerDelete";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";
// // // import { saveAs } from "file-saver";
// // import * as XLSX from "xlsx";

// const CustomerTable = () => {

//   const [customers, setCustomers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [itemsPerPage, setItemsPerPage] = useState(10);
//   // const [totalPages, setTotalPages] = useState(1);
//   // const [searchTerm, setSearchTerm] = useState("");
//   // const [filteredCustomers, setFilteredCustomers] = useState([]);
//   // const [customerToDelete, setCustomerToDelete] = useState(null);
//   // const maxHistoryLength = 100; // Maximum characters to show for history
//   // const maxCustomerPurposeLength = 100;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//     //live search handling
//   //   if (searchTerm) {
//   //     setFilteredCustomers(
//   //       customers.filter((customer) =>
//   //         customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
//   //       )
//   //     );
//   //   } else {
//   //     setFilteredCustomers(customers);
//   //   }
//   // }, [currentPage, itemsPerPage, searchTerm, customers]);

//   // useEffect(() => {
//   //   dispatch(fetchCustomer()); // Fetch customers using the dispatched action
//   // }, [dispatch]);

//   // Helper function to format date as a readable string
//   // const formatDateTime = (dateString) => {
//   //   if (!dateString) return "";
//   //   const options = {
//   //     year: "numeric",
//   //     month: "2-digit",
//   //     day: "2-digit",
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //     second: "2-digit",
//   //     hour12: false,
//   //   };
//   //   return new Intl.DateTimeFormat("en-US", options).format(
//   //     new Date(dateString)
//   //   );
//   // };

//   // Helper function to check if the next follow-up date is tomorrow
//   // const isTomorrow = (dateString) => {
//   //   const now = new Date();
//   //   const tomorrow = new Date(now.setDate(now.getDate() + 1));
//   //   const nextFollowUp = new Date(dateString);
//   //   // Set time to midnight for comparison
//   //   tomorrow.setHours(0, 0, 0, 0);
//   //   nextFollowUp.setHours(0, 0, 0, 0);
//   //   return tomorrow.getTime() === nextFollowUp.getTime();
//   // };

//   // handle in page number
//   // const handlePageChange = (pageNumber) => {
//   //   setCurrentPage(pageNumber);
//   // };

//   // const handleItemsPerPageChange = (event) => {
//   //   setItemsPerPage(Number(event.target.value));
//   //   setCurrentPage(1); // Reset to first page when items per page changes
//   // };
//   // Truncate the history text to maxHistoryLength
//   // const truncateHistory = (history) => {
//   //   if (history && history.length > maxHistoryLength) {
//   //     return history.substring(0, maxHistoryLength) + "..."; // Add ellipsis
//   //   }
//   //   return history;
//   // };
//   //customer purpose
//   // const truncateCustomerPurpose = (customer_purpose) => {
//   //   if (customer_purpose && customer_purpose.length > maxCustomerPurposeLength) {
//   //     return customer_purpose.substring(0, maxCustomerPurposeLength) + "..."; // Add ellipsis
//   //   }
//   //   return customer_purpose;
//   // };
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error loading customers: {error.message}</div>;
//   // }
//   //--- handle searchitem in a table ----
//   // const handleSearchChange = (e) => {
//   //   setSearchTerm(e.target.value);
//   // };
//   //--converting first letter  capital
//   // const formatName = (name) => {
//   //   if (!name) return "";
//   //   return name
//   //     .split(" ")
//   //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//   //     .join(" ");
//   // };

//   // if (isLoading) return <div>Loading...</div>;
//   // if (error) return <div>Error: {error}</div>;
// //   const exportToExcel = () => {
// //     const worksheet = XLSX.utils.json_to_sheet(
// //       customers.map((customer) => ({
// //         ID: customer.id,
// //         Name: customer.customer_name,

// //         category: customer.category_name,
// //        personal_email: customer.cpersonal_email,
// //         organization_name: customer.organization_name,
// //         pri_phone: customer.pri_phone,
// //         sec_phone: customer.sec_phone,
// //         customer_type: customer.customer_type,
// //         work_type: customer.work_type,
// //         company_email: customer.company_email,
// //         work_status: customer.work_status,
// //         designation: customer.designation_name,
// //         gender: customer.gender,
// //         province: customer.province_name,
// //         district: customer.district_name,
// //         municipality: customer.municipality_name,
// //         street_address: customer.street_address,
// //        sec_address: customer.sec_address,
// //         estimated_amount: customer.estimated_amount,
// //         enquiry_purpose: customer.enquiry_purpose,
// //         known_by: customer.known_by,
// //         created: customer.created,
// //         history: customer.history,
// //       }))
// //     );
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Designations");
// //     XLSX.writeFile(workbook, "customers.xlsx");
// //   };
// // //   const exportToPDF = () => {
// //     const doc = new jsPDF();
// //     doc.text("customers List", 20, 10);
// //     const tableColumn = ["ID", "Name"];
// //     const tableRows = customers.map((customer) => [
// //       customer.id,
// //     customer.customer_name,
// //  customer.category_name,
// //     customer.cpersonal_email,
// //   customer.organization_name,
// //        customer.pri_phone,
// //       customer.sec_phone,
// //     customer.customer_type,
// //        customer.work_type,
// //       customer.company_email,
// //  customer.work_status,
// //     customer.designation_name,
// // customer.gender,
// //       customer.province_name,
// //       customer.district_name,
// //        customer.municipality_name,
// //        customer.street_address,
// //      customer.sec_address,
// //      customer.estimated_amount,
// //     customer.enquiry_purpose,
// //    customer.known_by,
// //       customer.created,
// //   customer.history,
// //     ]);
// //     autoTable(doc, {
// //       head: [tableColumn],
// //       body: tableRows,
// //       startY: 20,
// //     });
// //     doc.save("customers.pdf");
// //   };
//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Customer List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="/dashboard/customer/create" className="nav-Link btn btn-info">
//                     <h5>Add Customer</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/customer/search/"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div className="input-group-append">
//                         <Link type="submit" className="btn btn-info">
//                           Search
//                         </Link>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         <table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Name</th>
//                               <th>Phone</th>
//                               <th>Email</th>
//                               <th>organization </th>
//                               <th>joining date</th>
//                               <th>street address</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {customers.length > 0 ? (
//                               customers.map((customer) => (
//                                 <tr key={customer.id}>
//                                   <td>{customer.id}</td>
//                                   <td>{customer.customer_name}</td>
//                                   <td>{customer.pri_phone}</td>
//                                   <td>{customer.email}</td>
//                                   <td>{customer.organization}</td>
//                                   <td>{customer.joining_date}</td>
//                                   <td>{customer.street_address}</td>
//                                   <td>
//                                     <Link to ={`/customer/update/${customer.id}`}>
//                                       Edit
//                                     </Link>
//                                     |
//                                     <Link to={`/customer/detail/${customer.id}`}>
//                                       View
//                                     </Link>
//                                     |
//                                     <Link to={`/customer/delete/${customer.id}`}>
//                                       Delete
//                                     </Link>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="8">No customers found</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerTable;

