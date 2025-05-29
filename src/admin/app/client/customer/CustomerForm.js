
//this work fine best code ever
import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../../../redux/slice/admin/crm/categorySlice";
import { fetchDepartments } from "../../../../redux/slice/admin/base/departmentSlice";
import { fetchDesignations } from "../../../../redux/slice/admin/base/designationSlice";
import { fetchDistricts } from "../../../../redux/slice/admin/base/districtSlice";
import { fetchMunicipalities } from "../../../../redux/slice/admin/base/municipalitySlice";
import { fetchProvinces } from "../../../../redux/slice/admin/base/provinceSlice";
import classnames from "classnames";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
import {
  createCustomer,
  fetchCustomerByIdUpdate,

} from "../../../../redux/slice/admin/customer/customerSlice";
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
    category: "",
    department: "",
    designation: "",
    joining_date: "",
    estimated_budget: "",
    province: "",
    district: "",
    municipality: "",
    street_address: "",
    sec_address: "",
    work_status: "",
    history: "",
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


  // Log district data and formData.province for debugging
  useEffect(() => {
    console.log("Districts Data:", districts);
    console.log("Selected Province ID:", formData.province);

    if (formData.province) {
      // Log the province_id from each district
      districts.forEach((district) => {
        console.log("District Province ID:", district.province_id);
      });

      // Filter districts based on selected province
      const filtered = districts.filter(
        (district) => district.province_id === formData.province
      );
      console.log("Filtered Districts:", filtered);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [formData.province, districts]); // Re-filter districts when the selected province changes

  // Update districts when province changes
  // useEffect(() => {
  //   if (formData.province) {
  //     setFilteredDistricts(districts.filter(district => district.provinceId === formData.province));
  //   } else {
  //     setFilteredDistricts([]);
  //   }
  // }, [formData.province, districts]);

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
                          // onChange={handleInputChange}
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
                    <div className="col-md-4">
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
                    </div>

                    {/* municipality */}

                    <div className="col-md-4">
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
                    <div className="col-md-4">
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
                    </div>

                    {/* sec_address */}
                    <div className="col-md-4">
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
          {/* <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>Permanent Address</Typography>
      <form>
        <Grid container spacing={2}>
          {/* Province Field */}
          {/* <Grid item xs={12} sm={4}>
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
          </Grid> */}

          {/* District Field */}
          {/* <Grid item xs={12} sm={4}>
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
          </Grid> */}

          {/* Municipality Field */}
          {/* <Grid item xs={12} sm={4}>
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
          </Grid> */}

          {/* Street Address */}
          {/* <Grid item xs={12} sm={4}>
            <TextField
              label="Street Address"
              name="street_address"
              value={formData.street_address}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid> */}

          {/* Additional Address */}
          {/* <Grid item xs={12} sm={4}>
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
    </TabPane> */}

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

// import React, { useEffect, useState } from "react";
// import { Typography, Box, Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
// import { useParams } from "react-router-dom";
// import PhoneInput from "react-phone-number-input";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCustomers, updateCustomer } from "../../../../redux/slice/admin/customer/customerSlice";
// import { toast } from "react-toastify";

// const CustomerForm = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     customer_name: "",
//     customer_type: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     gender: "",
//     province: "",
//     district: "",
//     municipality: "",
//     street_address: "",
//     sec_address: "",
//     organization_name: "",
//     category: "",
//     department: "",
//     designation: "",
//     estimated_budget: "",
//     joining_date: "",
//     work_status: "",
//     history: ""
//   });

//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [municipalities, setMunicipalities] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [phoneValid, setPhoneValid] = useState(true);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchCustomers(id))
//         .unwrap()
//         .then((data) => setFormData(data))
//         .catch((error) => toast.error(`Failed to fetch customer details: ${error.message}`));
//     }

//     // Simulating fetching data (replace with actual API calls)
//     setProvinces([
//       { id: 1, name: "Province 1" },
//       { id: 2, name: "Province 2" }
//     ]);

//     setDistricts([
//       { id: 1, name: "District 1", provinceId: 1 },
//       { id: 2, name: "District 2", provinceId: 2 }
//     ]);

//     setMunicipalities([
//       { id: 1, name: "Municipality 1", districtId: 1 },
//       { id: 2, name: "Municipality 2", districtId: 2 }
//     ]);

//     setCategories([
//       { id: 1, category_name: "Category 1" },
//       { id: 2, category_name: "Category 2" }
//     ]);

//     setDepartments([
//       { id: 1, name: "Department 1" },
//       { id: 2, name: "Department 2" }
//     ]);

//     setDesignations([
//       { id: 1, name: "Designation 1" },
//       { id: 2, name: "Designation 2" }
//     ]);
//   }, [id, dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!phoneValid) return;
//     dispatch(updateCustomer(formData))
//       .then(() => toast.success("Customer details updated successfully"))
//       .catch((error) => toast.error(`Failed to update customer details: ${error.message}`));
//   };

//   const filteredDistricts = districts.filter(district => district.provinceId === parseInt(formData.province));
//   const filteredMunicipalities = municipalities.filter(municipality => municipality.districtId === parseInt(formData.district));

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Edit Customer Details
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <Paper sx={{ padding: 3, marginBottom: 2 }}>
//           <Grid container spacing={3}>
//             {/* Customer Name */}
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Customer Name"
//                 name="customer_name"
//                 value={formData.customer_name}
//                 onChange={handleInputChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             {/* Organization Name */}
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Organization Name"
//                 name="organization_name"
//                 value={formData.organization_name}
//                 onChange={handleInputChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             {/* Category */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <MenuItem value="">
//                     <em>Select Category</em>
//                   </MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.category_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Department */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <MenuItem value="">
//                     <em>Select Department</em>
//                   </MenuItem>
//                   {departments.map((department) => (
//                     <MenuItem key={department.id} value={department.id}>
//                       {department.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Designation */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Designation</InputLabel>
//                 <Select
//                   name="designation"
//                   value={formData.designation}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <MenuItem value="">
//                     <em>Select Designation</em>
//                   </MenuItem>
//                   {designations.map((designation) => (
//                     <MenuItem key={designation.id} value={designation.id}>
//                       {designation.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Estimated Budget */}
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Estimated Budget"
//                 type="number"
//                 name="estimated_budget"
//                 value={formData.estimated_budget}
//                 onChange={handleInputChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             {/* Joining Date */}
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Joining Date"
//                 type="date"
//                 name="joining_date"
//                 value={formData.joining_date}
//                 onChange={handleInputChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             {/* Work Status */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   name="work_status"
//                   value={formData.work_status}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <MenuItem value="">
//                     <em>Select Status</em>
//                   </MenuItem>
//                   <MenuItem value="new">New</MenuItem>
//                   <MenuItem value="pending">Pending</MenuItem>
//                   <MenuItem value="completed">Completed</MenuItem>
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="issue">Issue</MenuItem>
//                   <MenuItem value="terminated">Terminated by Force</MenuItem>
//                   <MenuItem value="inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* History */}
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="History"
//                 name="history"
//                 value={formData.history}
//                 onChange={handleInputChange}
//                 multiline
//                 rows={4}
//                 fullWidth
//                 required
//               />
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Submit Button */}
//         <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
//           Save Changes
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default CustomerForm;
