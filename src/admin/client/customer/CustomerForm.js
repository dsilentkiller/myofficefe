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
          <TabPane tabId="3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
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
