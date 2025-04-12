import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { ToastContainer } from "react-toastify"; // Importing ToastContainer
import { toast } from "react-toastify"; // Importing react-toastify
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { fetchCategories } from "../../redux/slice/crm/categorySlice";
import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
import { fetchDesignations } from "../../redux/slice/base/designationSlice";
import { fetchDistricts } from "../../redux/slice/base/districtSlice";
import { fetchMunicipalities } from "../../redux/slice/base/municipalitySlice";
import { fetchProvinces } from "../../redux/slice/base/provinceSlice";
import classnames from "classnames";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import useParams
import "react-toastify/dist/ReactToastify.css"; // Make sure this CSS is als
import {
  createEnquiry,
  fetchEnquiryById,
  updateEnquiry,
  fetchEnquiryByIdUpdate,
} from "../../redux/slice/crm/enquirySlice";
import "react-phone-input-2/lib/style.css";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";

const UpdateEnquiryForm = () => {
  const dispatch = useDispatch();
  const { id: enquiryId } = useParams(); // Get enquiryId from params
  const [activeTab, setActiveTab] = useState("1");
  const { id } = useParams(); // Get the enquiry ID from URL
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState({ toggle: false });
  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch the enquiry details from the Redux store
  const { selectedEnquiry, loading, error } = useSelector(
    (state) => state.enquiries
  );
  //Similarly, memoize other selectors for municipalities, departments, and designations.
  const { list: provinces } = useSelector((state) => state.provinces);
  const { list: categories } = useSelector((state) => state.categories);
  const { list: districts } = useSelector((state) => state.districts);
  const { list: municipalities } = useSelector((state) => state.municipalities);
  const { list: departments } = useSelector((state) => state.departments);
  const { list: designations } = useSelector((state) => state.designations);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProvinces());
    dispatch(fetchDistricts());
    dispatch(fetchDesignations());
    dispatch(fetchDepartments());
    dispatch(fetchMunicipalities());
  }, [dispatch]);

  // Track form data state
  const [formData, setFormData] = useState({
    customer_name: "",
    category: "",
    organization_name: "",
    department: "",
    designation: "",
    pri_phone: "",
    sec_phone: "",
    email: "",
    gender: "",
    province: "",
    district: "",
    municipality: "",
    street_address: "",
    sec_address: "",
    estimated_amount: "",
    enquiry_purpose: "",
    known_by: "",
    created: "",
    next_follow_up_date: "",
    history: "",
    status: "",
  });

  // Fetch the enquiry data when component mounts or enquiryId changes
  useEffect(() => {
    if (enquiryId) {
      dispatch(fetchEnquiryById(enquiryId)); // Dispatch action to fetch enquiry details
    }
  }, [enquiryId, dispatch]);

  // Update the form data once the selectedEnquiry is available
  useEffect(() => {
    if (selectedEnquiry && Object.keys(selectedEnquiry).length > 0) {
      setFormData({
        customer_name: selectedEnquiry.customer_name || "",
        category: selectedEnquiry.category || "",
        organization_name: selectedEnquiry.organization_name || "",
        department: selectedEnquiry.department || "",
        designation: selectedEnquiry.designation || "",
        pri_phone: selectedEnquiry.pri_phone || "",
        sec_phone: selectedEnquiry.sec_phone || "",
        email: selectedEnquiry.email || "",
        gender: selectedEnquiry.gender || "",
        province: selectedEnquiry.province || "",
        district: selectedEnquiry.district || "",
        municipality: selectedEnquiry.municipality || "",
        street_address: selectedEnquiry.street_address || "",
        sec_address: selectedEnquiry.sec_address || "",
        estimated_amount: selectedEnquiry.estimated_amount || "",
        enquiry_purpose: selectedEnquiry.enquiry_purpose || "",
        known_by: selectedEnquiry.known_by || "",
        created: selectedEnquiry.created || "",
        next_follow_up_date: selectedEnquiry.next_follow_up_date || "",
        history: selectedEnquiry.history || "",
        status: selectedEnquiry.status || "",
      });
    }
  }, [selectedEnquiry]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Toggle function for switching tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  // pri_phone number validate
  const validatePhoneNumber = (value) => {
    const phoneLength = value.replace(/\D/g, "").length;
    if (phoneLength >= 10 && phoneLength <= 15) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
    setFormData({ ...formData, pri_phone: value });
  };
  // sec phone valid

  const validateSecPhoneNumber = (value) => {
    const phoneLength = value.replace(/\D/g, "").length;
    if (phoneLength >= 10 && phoneLength <= 15) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
    setFormData({ ...formData, sec_phone: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enquiryToUpdate = { ...formData, id: enquiryId };

    try {
      // Dispatch the update enquiry action
      await dispatch(updateEnquiry(enquiryToUpdate));

      // Show toast message after successful update
      toast.success("Data updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Dispatch action to fetch updated enquiry list
      // dispatch(fetchEnquiries()); // Assuming this action fetches the updated list of enquiries

      // Optionally navigate to the enquiry table page
      navigate("/dashboard/crm/enquiry");
    } catch (error) {
      // Show error toast if the update fails
      toast.error("Failed to update data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // dispatch(updateEnquiry(formData)); // Dispatch updated data to Redux (or directly to API)
  // };
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
                  <h5 className="navbar-brand">
                    {" "}
                    {id ? "Update Enquiry" : "Add Enquiry"}
                  </h5>
                  <div className="navbar-nav ml-auto">
                    <Link to="/dashboard/crm/enquiry">
                      <h5 className="btn btn-info">Enquiry Table</h5>
                    </Link>
                  </div>
                </div>
              </nav>
              <AppBar position="static" color="default" elevation={3}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    component={Link}
                    to="/dashboard/crm/enquiry"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
                    {id ? "Update Enquiry" : "Add Enquiry"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TableChartIcon />}
                    component={Link}
                    to="/dashboard/crm/enquiry"
                  >
                    Enquiry Table
                  </Button>
                </Toolbar>
              </AppBar>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* customer name */}

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="enquiry">customer name:</label>
                        <input
                          type="text"
                          id="customer_name"
                          name="customer_name"
                          value={formData.customer_name}
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customer_name: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* categories */}

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="category">categories </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
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
                        <label htmlFor="estimated_amount">
                          estimated_amount:
                        </label>
                        <input
                          type="number"
                          id="estimated_amount"
                          name="estimated_amount"
                          value={formData.estimated_amount}
                          // onChange={handleChange}
                          className="form-control"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estimated_amount: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* enquiry purpose */}

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="enquiry_purpose">
                          Problem/Requirement:
                        </label>
                        <textarea
                          type="text"
                          id="enquiry_purpose"
                          name="enquiry_purpose"
                          value={formData.enquiry_purpose}
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              enquiry_purpose: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {/* known by */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="known_by">Known By:</label>
                        <select
                          id="known_by"
                          name="known_by"
                          value={formData.known_by}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              known_by: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        >
                          <option value="">Select an Option</option>
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="linkedIn">LinkedIn</option>
                          <option value="mouth to mouth">Mouth to Mouth</option>
                          <option value="youtube">YouTube</option>
                        </select>
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
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
                          }
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

                    {/* email */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
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
                          // onChange={handleChange}
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
                          // onChange={handleChange}
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
                  </div>
                  {/* municipality */}
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="municipality">Municipality:</label>
                        <select
                          id="municipality"
                          name="municipality"
                          value={formData.municipality}
                          // onChange={handleChange}
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
                          // onChange={handleChange}
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
                          // onChange={handleChange}
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
                      {/* organization name */}

                      <div className="form-group">
                        <label htmlFor="name">Organization name :</label>
                        <input
                          type="text"
                          id="organization_name"
                          name="organization_name"
                          value={formData.organization_name}
                          // onChange={handleChange}
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
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="department">Departments:</label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          // onChange={handleChange}
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
                          // onChange={handleChange}
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
                        <label htmlFor="created">Enquiry date</label>
                        <input
                          type="date"
                          id="created"
                          name="created"
                          value={formData.created}
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              created: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    {/* next followup date */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="next_follow_up_date">
                          next followup date
                        </label>
                        <input
                          type="datetime-local"
                          id="next_follow_up_date"
                          name="next_follow_up_date"
                          value={formData.next_follow_up_date}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              next_follow_up_date: e.target.value,
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
                        <label htmlFor="history">History:</label>
                        <textarea
                          type="text"
                          id="history"
                          name="history"
                          value={formData.history}
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              history: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      {id ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateEnquiryForm;

//3 rd
// return (
// <div>
//   <h2>Edit Enquiry</h2>
//   {loading && <p>Loading...</p>} {/* Show loading text while fetching */}
//   {error && <p>Error: {error}</p>} {/* Display error message if any */}
//   <form onSubmit={handleSubmit}>
//     {/* Form fields */}
//     <div>
//       <label>Customer Name</label>
//       <input
//         type="text"
//         name="customer_name"
//         value={formData.customer_name}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Category</label>
//       <input
//         type="text"
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Organization Name</label>
//       <input
//         type="text"
//         name="organization_name"
//         value={formData.organization_name}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Department</label>
//       <input
//         type="text"
//         name="department"
//         value={formData.department}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Designation</label>
//       <input
//         type="text"
//         name="designation"
//         value={formData.designation}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Primary Phone</label>
//       <input
//         type="text"
//         name="pri_phone"
//         value={formData.pri_phone}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Secondary Phone</label>
//       <input
//         type="text"
//         name="sec_phone"
//         value={formData.sec_phone}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Email</label>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Gender</label>
//       <select name="gender" value={formData.gender} onChange={handleChange}>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//     </div>
//     <div>
//       <label>Province</label>
//       <input
//         type="text"
//         name="province"
//         value={formData.province}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>District</label>
//       <input
//         type="text"
//         name="district"
//         value={formData.district}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Municipality</label>
//       <input
//         type="text"
//         name="municipality"
//         value={formData.municipality}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Street Address</label>
//       <input
//         type="text"
//         name="street_address"
//         value={formData.street_address}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Secondary Address</label>
//       <input
//         type="text"
//         name="sec_address"
//         value={formData.sec_address}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Estimated Amount</label>
//       <input
//         type="text"
//         name="estimated_amount"
//         value={formData.estimated_amount}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Enquiry Purpose</label>
//       <input
//         type="text"
//         name="enquiry_purpose"
//         value={formData.enquiry_purpose}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Known By</label>
//       <input
//         type="text"
//         name="known_by"
//         value={formData.known_by}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Next Follow Up Date</label>
//       <input
//         type="date"
//         name="next_follow_up_date"
//         value={formData.next_follow_up_date}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>History</label>
//       <textarea
//         name="history"
//         value={formData.history}
//         onChange={handleChange}
//       />
//     </div>
//     <div>
//       <label>Status</label>
//       <input
//         type="text"
//         name="status"
//         value={formData.status}
//         onChange={handleChange}
//       />
//     </div>
//     <button type="submit" disabled={loading}>
//       {loading ? "Updating..." : "Update Enquiry"}
//     </button>
//   </form>
// </div>
//   );
// };

// export default UpdateEnquiryForm;

//2nd  show data in console
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateEnquiry,
//   fetchEnquiryById,
// } from "../../redux/slice/crm/enquirySlice";
// import { useParams, Link, useNavigate } from "react-router-dom";
// // Memoized selector (optional, but not strictly necessary for your use case)
// // const selectCurrentEnquiry = (state) => state.enquiry?.currentEnquiry || {};

// const UpdateEnquiryForm = () => {
//   const dispatch = useDispatch();
//   const { id: enquiryId } = useParams(); // Rename enquiryId to enquiryId

//   // Fetch enquiry data from Redux using useSelector
//   // const enquiryData = useSelector(selectCurrentEnquiry);
//   const status = useSelector((state) => state.enquiry?.status || "idle"); // Track form submission status
//   // const error = useSelector((state) => state.enquiry?.error || null); // Handle error message from Redux store
//   const { selectedEnquiry, loading, error } = useSelector(
//     (state) => state.enquiries
//   );

//   // Set the initial form state with empty fields
//   const [formData, setFormData] = useState({
//     customer_name: "",
//     category: "",
//     organization_name: "",
//     department: "",
//     designation: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     gender: "",
//     province: "",
//     district: "",
//     municipality: "",
//     street_address: "",
//     sec_address: "",
//     estimated_amount: "",
//     enquiry_purpose: "",
//     known_by: "",
//     created: "",
//     next_follow_up_date: "",
//     history: "",
//     status: "",
//   });
//   useEffect(() => {
//     if (enquiryId) {
//       // Dispatch actions only if 'enquiryId' (enquiryId) is available
//       dispatch(fetchEnquiryById(enquiryId)); // Fetch enquiry details
//       console.log("Dispatching FollowupByEnquiryId with enquiryId:", enquiryId);

//       // console.log("Dispatching FollowupByEnquiryId with enquiryId:", enquiryId);
//     }
//   }, [enquiryId, dispatch]);
//   // Use effect to set form data when the enquiryData changes
//   // useEffect(() => {
//   //   if (enquiryData && Object.keys(enquiryData).length > 0) {
//   //     setFormData(enquiryData); // Set the initial values from Redux
//   //   }
//   // }, [enquiryData]); // Re-run when enquiryData changes

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateEnquiry(formData)); // Dispatch the updated data to Redux (or directly to API)
//   };

//   return (
//     <div>
//       <h2>Edit Enquiry</h2>
//       {status === "loading" && <p>Updating...</p>}{" "}
//       {/* Show loading text while updating */}
//       {error && <p>Error: {error}</p>} {/* Display error message if any */}
//       {/* Form to update enquiry */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Customer Name</label>
//           <input
//             type="text"
//             name="customer_name"
//             value={formData.customer_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Category</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Organization Name</label>
//           <input
//             type="text"
//             name="organization_name"
//             value={formData.organization_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Department</label>
//           <input
//             type="text"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Designation</label>
//           <input
//             type="text"
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Primary Phone</label>
//           <input
//             type="text"
//             name="pri_phone"
//             value={formData.pri_phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Secondary Phone</label>
//           <input
//             type="text"
//             name="sec_phone"
//             value={formData.sec_phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Gender</label>
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div>
//           <label>Province</label>
//           <input
//             type="text"
//             name="province"
//             value={formData.province}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>District</label>
//           <input
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Municipality</label>
//           <input
//             type="text"
//             name="municipality"
//             value={formData.municipality}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Street Address</label>
//           <input
//             type="text"
//             name="street_address"
//             value={formData.street_address}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Secondary Address</label>
//           <input
//             type="text"
//             name="sec_address"
//             value={formData.sec_address}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Estimated Amount</label>
//           <input
//             type="text"
//             name="estimated_amount"
//             value={formData.estimated_amount}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Enquiry Purpose</label>
//           <input
//             type="text"
//             name="enquiry_purpose"
//             value={formData.enquiry_purpose}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Known By</label>
//           <input
//             type="text"
//             name="known_by"
//             value={formData.known_by}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Next Follow Up Date</label>
//           <input
//             type="date"
//             name="next_follow_up_date"
//             value={formData.next_follow_up_date}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>History</label>
//           <textarea
//             name="history"
//             value={formData.history}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Status</label>
//           <input
//             type="text"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" disabled={status === "loading"}>
//           {status === "loading" ? "Updating..." : "Update Enquiry"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateEnquiryForm;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   updateEnquiry,
//   //   fetchEnquiryByIdUpdate,
// } from "../../redux/slice/crm/enquirySlice";

// const UpdateEnquiryForm = () => {
//   const dispatch = useDispatch();
//   // Select the current enquiry data from Redux store
//   const enquiryData = useSelector(
//     (state) => state.enquiry?.currentEnquiry || {}
//   );
//   const status = useSelector((state) => state.enquiry?.status || "idle"); // Track form submission status
//   //   const error = useSelector((state) => state.enquiry.error || null); // Error message from Redux store
//   useEffect(() => {
//     if (enquiryData && Object.keys(enquiryData).length > 0) {
//       setFormData(enquiryData);
//     }
//   }, [enquiryData]); // Update form data when enquiryData changes
//   // Set the initial form state based on the data
//   const [formData, setFormData] = useState({
//     customer_name: "",
//     category: "",
//     organization_name: "",
//     department: "",
//     designation: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     gender: "",
//     province: "",
//     district: "",
//     municipality: "",
//     street_address: "",
//     sec_address: "",
//     estimated_amount: "",
//     enquiry_purpose: "",
//     known_by: "",
//     created: "",
//     next_follow_up_date: "",
//     history: "",
//     status: "",
//   });

//   // Use effect to set form data when data is passed for editing
//   useEffect(() => {
//     if (enquiryData) {
//       if (enquiryData && Object.keys(enquiryData).length > 0)
//         setFormData(enquiryData);
//     }
//   }, [enquiryData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateEnquiry(formData)); // Dispatch the updated data to the Redux store
//   };

//   return (
//     <div>
//       <h2>Edit Enquiry</h2>
//       {status === "loading" && <p>Updating...</p>}{" "}
//       {/* Show loading text while updating */}
//       {/* {error && <p>Error: {error}</p>} Display error message if any */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Customer Name</label>
//           <input
//             type="text"
//             name="customer_name"
//             value={formData.customer_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Category</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Organization Name</label>
//           <input
//             type="text"
//             name="organization_name"
//             value={formData.organization_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Department</label>
//           <input
//             type="text"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Designation</label>
//           <input
//             type="text"
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Primary Phone</label>
//           <input
//             type="text"
//             name="pri_phone"
//             value={formData.pri_phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Secondary Phone</label>
//           <input
//             type="text"
//             name="sec_phone"
//             value={formData.sec_phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Gender</label>
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div>
//           <label>Province</label>
//           <input
//             type="text"
//             name="province"
//             value={formData.province}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>District</label>
//           <input
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Municipality</label>
//           <input
//             type="text"
//             name="municipality"
//             value={formData.municipality}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Street Address</label>
//           <input
//             type="text"
//             name="street_address"
//             value={formData.street_address}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Secondary Address</label>
//           <input
//             type="text"
//             name="sec_address"
//             value={formData.sec_address}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Estimated Amount</label>
//           <input
//             type="text"
//             name="estimated_amount"
//             value={formData.estimated_amount}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Enquiry Purpose</label>
//           <input
//             type="text"
//             name="enquiry_purpose"
//             value={formData.enquiry_purpose}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Known By</label>
//           <input
//             type="text"
//             name="known_by"
//             value={formData.known_by}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Next Follow Up Date</label>
//           <input
//             type="date"
//             name="next_follow_up_date"
//             value={formData.next_follow_up_date}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>History</label>
//           <textarea
//             name="history"
//             value={formData.history}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Status</label>
//           <input
//             type="text"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" disabled={status === "loading"}>
//           {status === "loading" ? "Updating..." : "Update Enquiry"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateEnquiryForm;
