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
  createEnquiry,
  fetchEnquiryById,
  fetchEnquiryByIdUpdate,
} from "../../../../redux/slice/admin/crm/enquirySlice";
import "react-phone-input-2/lib/style.css";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";

const EnquiryForm = ({ enquiryId }) => {
  const [activeTab, setActiveTab] = useState("1");
  const { id } = useParams(); // Get the enquiry ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState({ toggle: false });
  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});
  // form data filled up
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
  // const createError = useSelector((state) => state.enquiries.createError);
  // const updateError = useSelector((state) => state.enquiries.updateError);
  // const enquiries = useSelector((state) => state.enquiries.list || []);
  const enquiryToUpdate = useSelector(
    (state) => state.enquiries.currentEnquiry
  );

  const isLoading = useSelector((state) => state.enquiries.isLoading);
  const error = useSelector((state) => state.enquiries.error);

  // Toggle function for switching tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    console.log("Current Enquiry State:", enquiryToUpdate);
  }, [enquiryToUpdate]);
  //Similarly, memoize other selectors for municipalities, departments, and designations.
  const { list: provinces } = useSelector((state) => state.provinces);
  const { list: categories } = useSelector((state) => state.categories);
  const { list: districts } = useSelector((state) => state.districts);
  const { list: municipalities } = useSelector((state) => state.municipalities);
  const { list: departments } = useSelector((state) => state.departments);
  const { list: designations } = useSelector((state) => state.designations);

  useEffect(() => {
    if (enquiryId) {
      dispatch(fetchEnquiryByIdUpdate(enquiryId));
    }
  }, [dispatch, enquiryId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchEnquiryById(id));
    }
  }, [dispatch, id]);
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
  // curent enquiry

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchEnquiryByIdUpdate(id)); // Fetch the enquiry by ID for update
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (enquiryToUpdate && id) {
      // Ensure all form fields are populated
      setFormData({
        customer_name: enquiryToUpdate.customer_name || "",
        category: enquiryToUpdate.category || "",
        organization_name: enquiryToUpdate.organization_name || "",
        department: enquiryToUpdate.department || "",
        designation: enquiryToUpdate.designation || "",
        pri_phone: enquiryToUpdate.pri_phone || "",
        sec_phone: enquiryToUpdate.sec_phone || "",
        email: enquiryToUpdate.email || "",
        gender: enquiryToUpdate.gender || "",
        province: enquiryToUpdate.province || "",
        district: enquiryToUpdate.district || "",
        municipality: enquiryToUpdate.municipality || "",
        street_address: enquiryToUpdate.street_address || "",
        sec_address: enquiryToUpdate.sec_address || "",
        estimated_amount: enquiryToUpdate.estimated_amount || "",
        enquiry_purpose: enquiryToUpdate.enquiry_purpose || "",
        known_by: enquiryToUpdate.known_by || "",
        created: enquiryToUpdate.created || "",
        next_follow_up_date: enquiryToUpdate.next_follow_up_date || "",
        history: enquiryToUpdate.history || "",
        status: enquiryToUpdate.status || "",
      });
    } else if (!enquiryToUpdate && id) {
      toast.error("Failed to load project details for update.");
    }
  }, [enquiryToUpdate, id]); // This ensures it runs only when the enquiryToUpdate changes

  // Fetch data when component mounts
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formDataToSubmit = {
    ...formData,
    // Ensure these hold the correct foreign key IDs
    category: formData.category,
    department: formData.department,
    designation: formData.designation,
    province: formData.province,
    district: formData.district,
    municipality: formData.municipality,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formDataToSubmit); // Debug log

    if (id) {
      // Updating an enquiry
      dispatch(fetchEnquiryByIdUpdate({ id, formData: formDataToSubmit }))
        .unwrap()
        .then(() => {
          toast.success("Enquiry updated successfully!");
          navigate("/dashboard/crm/enquiry");
        })
        .catch((error) => {
          console.error("Update error details:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          }
          toast.error(
            `Failed to update enquiry: ${error.response?.data?.message || error.message || "Unknown error"
            }`
          );
        });
    } else {
      // Creating a new enquiry
      dispatch(createEnquiry(formDataToSubmit))
        .unwrap()
        .then(() => {
          toast.success("Enquiry created successfully!");
          setFormData({}); // Reset form
          navigate("/dashboard/crm/enquiry");
        })
        .catch((error) => {
          console.error("API error:", error);
          // Improved error handling
          const errorMessage =
            error?.message ||
            "An unknown error occurred while creating the enquiry.";
          toast.error(`Failed to create enquiry: ${errorMessage}`);
        });
    }
  };

  return (
    <>

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
              {/*  */}
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
                          // onChange={handleInputChange}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customer_name: e.target.value,
                            })
                          }
                          className="form-control"
                          required
                        />
                        {/* <select
                        id="enquiry"
                        name="enquiry_id"
                        value={formData.enquiry_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select enquiry</option>
                        {isLoading ? (
                          <option>Loading...</option>
                        ) : error ? (
                          <option>Error loading enquiries</option>
                        ) : enquiries.length > 0 ? (
                          enquiries.map((enquiry) => (
                            <option key={enquiry.id} value={enquiry.id}>
                              {enquiry.customer_name}
                            </option>
                          ))
                        ) : (
                          <option>No enquiries available</option>
                        )}
                      </select> */}
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
                        <label htmlFor="estimated_amount">
                          estimated_amount:
                        </label>
                        <input
                          type="number"
                          id="estimated_amount"
                          name="estimated_amount"
                          value={formData.estimated_amount}
                          // onChange={handleInputChange}
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
                          // onChange={handleInputChange}
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
                          // onChange={handleInputChange}
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

                    {/* <InputField
                          label="Email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          validate={validateEmail}
                          required
                          type="email"
                          placeholder="example@domain.com"
                        /> */}

                    {/* email */}
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          // onChange={handleInputChange}
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
                        <label htmlFor="created">Enquiry date</label>
                        <input
                          type="date"
                          id="created"
                          name="created"
                          value={formData.created}
                          // onChange={handleInputChange}
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
                          // onChange={handleInputChange}
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
    </>
  );
};

export default EnquiryForm;
//this is foe changees
// import React, { useState, useEffect } from "react";
// import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
// import { Link } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategories } from "../../../../redux/slice/admin/crm/categorySlice";
// import { fetchDepartments } from "../../../../redux/slice/admin/base/departmentSlice";
// import { fetchDesignations } from "../../../../redux/slice/admin/base/designationSlice";
// import { fetchDistricts } from "../../../../redux/slice/admin/base/districtSlice";
// import { fetchMunicipalities } from "../../../../redux/slice/admin/base/municipalitySlice";
// import { fetchProvinces } from "../../../../redux/slice/admin/base/provinceSlice";
// import classnames from "classnames";
// import SpeechToText from "../speechtotext/SpeechToText";
// // import { createSelector } from "reselect";

// // import axios from "axios";

// import { useNavigate, useParams } from "react-router-dom"; // Import useParams
// import { toast } from "react-toastify";
// import {
//   createEnquiry,
//   updateEnquiry,
//   fetchEnquiryById,
// } from "../../../../redux/slice/admin/crm/enquirySlice";
// // import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const EnquiryForm = () => {
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
//   const [activeTab, setActiveTab] = useState("1");

//   const { id } = useParams(); // Get the enquiry ID from URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [toggleState, setToggleState] = useState({ toggle: false });
//   const [phoneValid, setPhoneValid] = useState(true);
//   const [errors, setErrors] = useState({});
//   // form data filled up
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
//     // zone: "",
//     district: "",
//     municipality: "",
//     ward_no: "",
//     street_address: "",

//     estimated_amount: "",
//     enquiry_purpose: "",
//     known_by: "",
//     created: "",
//     history: "",
//   });
//   // const createStatus = useSelector((state) => state.enquiries.createStatus);
//   // const updateStatus = useSelector((state) => state.enquiries.updateStatus);
//   // const createError = useSelector((state) => state.enquiries.createError);
//   // const updateError = useSelector((state) => state.enquiries.updateError);

//   const enquiries = useSelector((state) => state.enquiries.list || []);
//   const enquiryToUpdate = useSelector((state) => state.enquiries.currentEnquiry);
//   //#start sppech to text setup
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     // Check if the browser supports speech recognition
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     // const recognition = new SpeechRecognition();

//     if (SpeechRecognition) {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.lang = "en-US";
//       recognitionInstance.interimResults = true;
//       recognitionInstance.continuous = true;

//       // Set recognition instance
//       setRecognition(recognitionInstance);
//     } else {
//       toast.error("Speech recognition is not supported in this browser.");
//     }
//   }, []);

//   // Handle speech result
//   useEffect(() => {
//     if (recognition) {
//       recognition.onresult = (event) => {
//         const lastResult = event.results[event.results.length - 1];
//         const text = lastResult[0].transcript;
//         // Assuming you're using the fieldName from SpeechRecognition
//         const name = recognition.fieldName;

//         // Update form data with recognized text
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: text,
//         }));
//       };

//       recognition.onend = () => setIsListening(false);
//     }
//   }, [recognition]);

//   const startListening = (fieldName) => {
//     if (recognition) {
//       recognition.fieldName = fieldName; // Set the field to listen for
//       setIsListening(true);
//       recognition.start();
//     }
//   };

//   const stopListening = () => {
//     if (recognition) {
//       recognition.stop();
//       setIsListening(false);
//       console.log("Stopped listening");
//     }
//   };
//   //# end speect to text setup
//   // Toggle function for switching tabs
//   const toggle = (tab) => {
//     if (activeTab !== tab) {
//       setActiveTab(tab);
//     }
//   };
//   // Retrieve data from the store

//   const enquiryToUpdate = useSelector(
//     (state) => state.enquiries.enquiryToUpdate
//   );
//   useEffect(() => {
//     console.log("Current Enquiry State:", enquiryToUpdate);
//   }, [enquiryToUpdate]);
//   // const [filteredDistricts, setFilteredDistricts] = useState([]);
//   // const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState(null);

//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   // const [filteredDistricts, setFilteredDistricts] = useState([]);
//   //Similarly, memoize other selectors for municipalities, departments, and designations.

//   const { list: provinces } = useSelector((state) => state.provinces);
//   const { list: categories } = useSelector((state) => state.categories);
//   const { list: districts } = useSelector((state) => state.districts);
//   const { list: municipalities } = useSelector((state) => state.municipalities);
//   const { list: departments } = useSelector((state) => state.departments);
//   const { list: designations } = useSelector((state) => state.designations);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEnquiryById(id));
//     }
//   }, [id, dispatch]);
//   useEffect(() => {
//     if (enquiryToUpdate) {
//       setFormData(enquiryToUpdate); // Set form data when enquiryToUpdate is available
//     }
//   }, [enquiryToUpdate]);

//   // pri_phone number validate
//   const validatePhoneNumber = (value) => {
//     const phoneLength = value.replace(/\D/g, "").length;
//     if (phoneLength >= 10 && phoneLength <= 15) {
//       setPhoneValid(true);
//     } else {
//       setPhoneValid(false);
//     }
//     setFormData({ ...formData, pri_phone: value });
//   };
//   // sec phone valid

//   const validateSecPhoneNumber = (value) => {
//     const phoneLength = value.replace(/\D/g, "").length;
//     if (phoneLength >= 10 && phoneLength <= 15) {
//       setPhoneValid(true);
//     } else {
//       setPhoneValid(false);
//     }
//     setFormData({ ...formData, sec_phone: value });
//   };
//   // curent enquiry

//   useEffect(() => {
//     if (enquiryToUpdate && id) {
//       setFormData({
//         customer_name: enquiryToUpdate.customer_name || "",
//         category: enquiryToUpdate.category || "",
//         organization_name: enquiryToUpdate.organization_name || "",
//         department: enquiryToUpdate.department || "",
//         designation: enquiryToUpdate.designation || "",
//         pri_phone: enquiryToUpdate.pri_phone || "",
//         sec_phone: enquiryToUpdate.sec_phone || "",
//         email: enquiryToUpdate.email || "",
//         gender: enquiryToUpdate.gender || "",
//         province: enquiryToUpdate.province || "",
//         district: enquiryToUpdate.district || "",
//         municipality: enquiryToUpdate.municipality || "",
//         ward_no: enquiryToUpdate.ward_no || "",
//         street_address: enquiryToUpdate.street_address || "",
//         estimated_amount: enquiryToUpdate.estimated_amount || "",
//         enquiry_purpose: enquiryToUpdate.enquiry_purpose || "",
//         known_by: enquiryToUpdate.known_by || "",
//         created: enquiryToUpdate.created || "",
//         history: enquiryToUpdate.history || "",
//       });
//     } else if (!enquiryToUpdate && id) {
//       toast.error("Failed to load enquiry details for update.");
//     }
//   }, [enquiryToUpdate, id]);

//   // Fetch data when component mounts
//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchProvinces());
//     dispatch(fetchDistricts());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     dispatch(fetchMunicipalities());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   //end speech to text

//   const handleProvinceChange = (e) => {
//     const selectedProvinceId = e.target.value;

//     // Reset district and municipality when province changes
//     setFormData((prevData) => ({
//       ...prevData,
//       province: selectedProvinceId,
//       district: "", // Reset district when province changes
//       municipality: "", // Reset municipality when district changes
//     }));

//     // Ensure districts are available and filter them based on province
//     if (districts.length > 0) {
//       const updatedDistricts = districts.filter(
//         (district) =>
//           String(district.province_id) === String(selectedProvinceId)
//       );
//       console.log("Filtered Districts:", updatedDistricts); // Debug the filtered districts
//       setFilteredDistricts(updatedDistricts);
//     }
//   };

//   // Filter municipalities based on the selected district
//   const handleDistrictChange = (e) => {
//     const selectedDistrictId = e.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       district: selectedDistrictId,
//       municipality: "",
//     }));

//     const updatedMunicipalities = municipalities.filter(
//       (municipality) => municipality.district_id === selectedDistrictId
//     );
//     setFilteredMunicipalities(updatedMunicipalities);
//   };

//   const handleMunicipalityChange = (e) => {
//     setFormData((prevData) => ({ ...prevData, municipality: e.target.value }));
//   };
//   useEffect(() => {
//     dispatch(fetchDistricts());
//     console.log("Districts data:", districts); // Debug log
//   }, [dispatch, districts]);
//   useEffect(() => {
//     console.log("Filtered Districts:", filteredDistricts);
//   }, [filteredDistricts]);

//   const formDataToSubmit = {
//     ...formData,
//     // Ensure these hold the correct foreign key IDs
//     category: formData.category,
//     department: formData.department,
//     designation: formData.designation,
//     province: formData.province,
//     district: formData.district,
//     municipality: formData.municipality,
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!formData.customer_name || !formData.category || !formData.pri_phone) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     if (!phoneValid) {
//       toast.error("Please enter a valid phone number.");
//       return;
//     }

//     console.log("Form data before submission:", formDataToSubmit); // Debug log

//     if (id) {
//       dispatch(updateEnquiry({ id, ...formDataToSubmit }))
//         .unwrap()
//         .then((updatedEnquiry) => {
//           toast.success("Enquiry updated successfully!");
//           navigate("/dashboard/crm/enquiry");
//         })
//         .catch((error) => {
//           console.error("API error:", error);
//           toast.error(
//             `Failed to update enquiry: ${error.message || "An error occurred"}`
//           );
//         });
//     } else {
//       dispatch(createEnquiry(formDataToSubmit))
//         .unwrap()
//         .then(() => {
//           toast.success("Enquiry created successfully!");
//           setFormData(FormData); // Reset form
//           navigate("/dashboard/crm/enquiry");
//         })
//         .catch((error) => {
//           console.error("API error:", error);
//           toast.error(
//             `Failed to create enquiry: ${error.message || "An error occurred"}`
//           );
//         });
//     }
//   };

//   return (
//     <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
//       {/* <div className="container-fluid"> */}
//       <div className="card">
//         <Nav tabs>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: activeTab === "1" })}
//               onClick={() => toggle("1")}
//             >
//               General Information
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: activeTab === "2" })}
//               onClick={() => toggle("2")}
//             >
//               Address
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: activeTab === "3" })}
//               onClick={() => toggle("3")}
//             >
//               Company Info
//             </NavLink>
//           </NavItem>
//         </Nav>
//         <TabContent activeTab={activeTab}>
//           <TabPane tabId="1">
//             <div className="card">
//               <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container-fluid">
//                   <h5 className="navbar-brand">
//                     {" "}
//                     {id ? "Update Enquiry" : "Add Enquiry"}
//                   </h5>
//                   <div className="navbar-nav ml-auto">
//                     <Link to="/dashboard/crm/enquiry">
//                       <h5>Enquiry Table</h5>
//                     </Link>
//                   </div>
//                 </div>
//               </nav>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {/* customer name */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="name">Customer Name:</label>
//                         <input
//                           type="text"
//                           id="customer_name"
//                           name="customer_name"
//                           value={formData.customer_name}
//                           // onChange={handleInputChange}
//                           className="form-control"
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               customer_name: e.target.value,
//                             })
//                           }
//                           required
//                         />
//                         <button onClick={() => startListening("customer_name")}>
//                           🎤 Start Listening
//                         </button>
//                         <button onClick={stopListening}>Stop Listening</button>
//                         {/* <button
//                           type="button"
//                           className="btn btn-secondary"
//                         //   onClick={() =>
//                         //     isListening
//                         //       ? stopListening()
//                         //       : startListening("customer_name")
//                         //   }
//                         // >
//                           {/* 🎤 {isListening ? "Stop" : "Speak"}
//                         </button> */}
//                       </div>
//                     </div>

//                     {/* enquory type */}

//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="category">categories </label>
//                         <select
//                           id="category"
//                           name="category"
//                           value={formData.category}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select categories</option>
//                           {categories.length > 0 ? (
//                             categories.map((category) => (
//                               <option key={category.id} value={category.id}>
//                                 {category.category_name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No categories available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="estimated_amount">
//                           estimated_amount:
//                         </label>
//                         <input
//                           type="number"
//                           id="estimated_amount"
//                           name="estimated_amount"
//                           value={formData.estimated_amount}
//                           // onChange={handleInputChange}
//                           className="form-control"
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               estimated_amount: e.target.value,
//                             })
//                           }
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     {/* enquiry purpose */}

//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="enquiry_purpose">enquiry_purpose:</label>
//                         <textarea
//                           type="text"
//                           id="enquiry_purpose"
//                           name="enquiry_purpose"
//                           value={formData.enquiry_purpose}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               enquiry_purpose: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                     {/* known by */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="known_by">Known By:</label>
//                         <select
//                           id="known_by"
//                           name="known_by"
//                           value={formData.known_by}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               known_by: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select an Option</option>
//                           <option value="facebook">Facebook</option>
//                           <option value="instagram">Instagram</option>
//                           <option value="linkedIn">LinkedIn</option>
//                           <option value="mouth to mouth">Mouth to Mouth</option>
//                           <option value="youtube">YouTube</option>
//                         </select>
//                       </div>
//                     </div>
//                     {/* gender */}
// <div className="col-md-4">
//   <div className="form-group">
//     <label htmlFor="gender">Gender:</label>
//     <select
//       id="gender"
//       name="gender"
//       value={formData.gender}
//       // onChange={handleInputChange}
//       onChange={(e) =>
//         setFormData({
//           ...formData,
//           gender: e.target.value,
//         })
//       }
//       className="form-control"
//       required
//     >
//       <option value="">Select Gender</option>
//       <option value="male">Male</option>
//       <option value="female">Female</option>
//       <option value="other">Other</option>
//     </select>
//   </div>
// </div>
//                   </div>

//                   {/* pri phone */}
//                   <div className="row">
//                     {/* Phone Field */}
//                     {/* <div className="row"> */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="pri_phone">Phone:</label>
//                         <PhoneInput
//                           country={"np"} // Country code for Nepal
//                           value={formData.pri_phone}
//                           onChange={validatePhoneNumber}
//                           inputStyle={{
//                             width: "100%",
//                             borderColor: phoneValid ? "green" : "red",
//                             backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                           }}
//                         />
//                         {!phoneValid && (
//                           <p style={{ color: "red" }}>
//                             Please enter a valid phone number between 10 and 15
//                             digits.
//                           </p>
//                         )}
//                       </div>
//                       {/* </div> */}
//                       {errors.pri_phone && <p>{errors.pri_phone}</p>}
//                     </div>

//                     {/* sec phone */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="sec_phone">Phone:</label>
//                         <PhoneInput
//                           country={"np"} // Country code for Nepal
//                           value={formData.sec_phone}
//                           onChange={validateSecPhoneNumber}
//                           inputStyle={{
//                             width: "100%",
//                             borderColor: phoneValid ? "green" : "red",
//                             backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                           }}
//                         />
//                         {!phoneValid && (
//                           <p style={{ color: "red" }}>
//                             Please enter a valid phone number between 10 and 15
//                             digits.
//                           </p>
//                         )}
//                       </div>
//                       {/* </div> */}
//                       {errors.sec_phone && <p>{errors.sec_phone}</p>}
//                     </div>

//                     {/* email */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={formData.email}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               email: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* </div> */}
//                   <div className="form-group">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={() => toggle("2")}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </TabPane>

//           <TabPane tabId="2">
//             <div className="card">
//               <div className="card-body">
//                 <form>
//                   <div className="row mt-3">
//                     <h5 className="btn btn-info mb-2">Permanent Address</h5>
//                   </div>
//                   <div className="row">
//                     {/* Permanent Address Fields */}

//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="province">Province:</label>
//                         <select
//                           id="province"
//                           name="province"
//                           value={formData.province}
//                           onChange={handleProvinceChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select province</option>

//                           {provinces.length > 0 ? (
//                             provinces.map((province) => (
//                               <option key={province.id} value={province.id}>
//                                 {province.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No provinces available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div>

//                     {/* district */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="district">District:</label>
//                         <select
//                           id="district"
//                           name="district"
//                           value={formData.district}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               district: e.target.value,
//                             })
//                           }
//                           disabled={!formData.province} //disable if no province selected
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select District</option>
//                           {districts.length > 0 ? (
//                             districts.map((district) => (
//                               <option key={district.id} value={district.id}>
//                                 {district.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">no districts is available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   {/* municipality */}
//                   <div className="row">
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="municipality">Municipality:</label>
//                         <select
//                           id="municipality"
//                           name="municipality"
//                           value={formData.municipality}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               municipality: e.target.value,
//                             })
//                           }
//                           disabled={!formData.district} //disable if no district selected
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select Municipality</option>
//                           {municipalities.length > 0 ? (
//                             municipalities.map((municipality) => (
//                               <option
//                                 key={municipality.id}
//                                 value={municipality.id}
//                               >
//                                 {municipality.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">
//                               no municipalities available
//                             </option>
//                           )}
//                         </select>
//                       </div>
//                     </div>

//                     {/*ward no  */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="ward_no">Ward No:</label>
//                         <input
//                           type="number"
//                           id="ward_no"
//                           name="ward_no"
//                           value={formData.ward_no}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               ward_no: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                     {/* sec_address */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="street_address">sec_address:</label>
//                         <input
//                           type="text"
//                           id="street_address"
//                           name="street_address"
//                           value={formData.street_address}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               street_address: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* "Same as Permanent Address" Checkbox */}
//                   {/* <div className="form-group mt-3">
//                     <input
//                       type="checkbox"
//                       id="sameAddressCheckbox"
//                       onChange={handleSameAddress}
//                     />
//                     <label htmlFor="sameAddressCheckbox" className="ml-2">
//                       Same as Permanent Address
//                     </label>
//                   </div> */}

//                   <div className="form-group">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={() => toggle("3")}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </TabPane>

//           <TabPane tabId="3">
//             <div className="card">
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-4">
//                       {/* organization name */}

//                       <div className="form-group">
//                         <label htmlFor="name">Organization name :</label>
//                         <input
//                           type="text"
//                           id="organization_name"
//                           name="organization_name"
//                           value={formData.organization_name}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               organization_name: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="department">Departments:</label>
//                         <select
//                           id="department"
//                           name="department"
//                           value={formData.department}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               department: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select department</option>
//                           {departments.length > 0 ? (
//                             departments.map((department) => (
//                               <option key={department.id} value={department.id}>
//                                 {department.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">no departments available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div>

//                     {/* designation  */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="designation">Designations:</label>
//                         <select
//                           id="designation"
//                           name="designation"
//                           value={formData.designation}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               designation: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select designation</option>
//                           {designations && designations.length > 0 ? (
//                             designations.map((designation) => (
//                               <option
//                                 key={designation.id}
//                                 value={designation.id}
//                               >
//                                 {designation.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No designations available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="created">Enquiry date</label>
//                         <input
//                           type="date"
//                           id="created"
//                           name="created"
//                           value={formData.created}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               created: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* next followup date */}
//                     {/* <div className="col-md-4"                     <div className="form-group">
//                        <label htmlFor="next_follow_up_date">
//                           next followup date
//                       </label>
//                         <input
//                           type="datetime-local"
//                           id="next_follow_up_date"
//                           name="next_follow_up_date"
//                           value={formData.next_follow_up_date}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               next_follow_up_date: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div> */}
//                     {/* sec_address */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="history">History:</label>
//                         <textarea
//                           type="text"
//                           id="history"
//                           name="history"
//                           value={formData.history}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               history: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <button type="submit" className="btn btn-primary">
//                       {id ? "Update" : "Save"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </TabPane>
//         </TabContent>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default EnquiryForm;
