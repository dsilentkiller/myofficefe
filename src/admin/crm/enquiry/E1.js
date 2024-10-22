

// const EnquiryForm = () => {
//   const [activeTab, setActiveTab] = useState("1");
//   const dispatch = useDispatch();

//   const {
//     designations,
//     departments,
//     municipalities,
//     provinces,
//     districts,
//     loading,
//     error,
//   } = useSelector((state) => state.enquiry);

//   const [formData, setFormData] = useState({
//     customer_name: "",
//     category: "",
//     department: "",
//     designation: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     gender: "",
//     province: "",
//     district: "",
//     municipality: "",
//     ward_no: "",
//     tole_name: "",
//     estimated_amount: "",
//     enquiry_purpose: "",
//     known_by: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Fetch districts when province is selected
//     if (name === "province") {
//       dispatch(fetchDistricts(value)); // Adjust the action to fetch districts based on selected province
//     }
//   };

//   useEffect(() => {
//     dispatch(fetchProvinces());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     dispatch(fetchMunicipalities());
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/employee/new/",
//         formData
//       );
//       alert("Employee created successfully!");
//     } catch (error) {
//       console.error("There was an error creating the employee!", error);
//       alert("Failed to create employee.");
//     }
//   };

//   const toggle = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   return (
//     <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
//       <div className="card">
//         <Nav tabs>
//           {["General Information", "Address", "Company Info"].map(
//             (label, index) => (
//               <NavItem key={index}>
//                 <NavLink
//                   className={classnames({
//                     active: activeTab === `${index + 1}`,
//                   })}
//                   onClick={() => toggle(`${index + 1}`)}
//                 >
//                   {label}
//                 </NavLink>
//               </NavItem>
//             )
//           )}
//         </Nav>
//         <TabContent activeTab={activeTab}>
//           <TabPane tabId="1">
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <label htmlFor="category">Enquiry Category</label>
//                     <select
//                       id="category"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select Enquiry category</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {/* Other form fields... */}
//                   <div className="col-md-4">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={() => toggle("2")}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </TabPane>

//           <TabPane tabId="2">
//             <div className="card-body">
//               <form>
//                 <div className="row mt-3">
//                   <h5 className="btn btn-info mb-2">Permanent Address</h5>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <label htmlFor="province">Province:</label>
//                     <select
//                       id="province"
//                       name="province"
//                       value={formData.province}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select province</option>
//                       {provinces.map((province) => (
//                         <option key={province.id} value={province.id}>
//                           {province.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <label htmlFor="district">District:</label>
//                     <select
//                       id="district"
//                       name="district"
//                       value={formData.district}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select District</option>
//                       {districts.map((district) => (
//                         <option key={district.id} value={district.id}>
//                           {district.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {/* Other address fields... */}
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={() => toggle("3")}
//                 >
//                   Next
//                 </button>
//               </form>
//             </div>
//           </TabPane>

//           <TabPane tabId="3">
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <label htmlFor="department">Department:</label>
//                     <select
//                       id="department"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select department</option>
//                       {departments.map((department) => (
//                         <option key={department.id} value={department.id}>
//                           {department.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {/* Other company fields... */}
//                 </div>
//                 <div className="form-group">
//                   <button type="submit" className="btn btn-primary">
//                     Add Employee
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </TabPane>
//         </TabContent>
//       </div>
//     </div>
//   );
// };

// export default EnquiryForm;

// // import React, { useState, useEffect } from "react";
// // import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
// // import axios from "axios";
// // import { useSelector, useDispatch } from "react-redux";
// // import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// // import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
// // import { fetchDesignations } from "../../redux/slice/base/designationSlice";
// // import { fetchProvinces } from "../../redux/slice/base/provinceSlice";
// // import classnames from "classnames";

// // const EnquiryForm = () => {
// //   const [activeTab, setActiveTab] = useState("1");
// //   const [formData, setFormData] = useState({
// //     customer_name: "",
// //     category: "",
// //     department: "",
// //     designation: "",
// //     pri_phone: "",
// //     sec_phone: "",
// //     email: "",
// //     gender: "",
// //     province: "",
// //     district: "",
// //     municipality: "",
// //     ward_no: "",
// //     tole_name: "",
// //     created: "",
// //   });

// //   const [districts, setDistricts] = useState([]);
// //   const [municipalities, setMunicipalities] = useState([]);

// //   const dispatch = useDispatch();
// //   const { list: provinces } = useSelector((state) => state.provinces);
// //   // const { list: categories } = useSelector((state) => state.categories);
// //   const { list: departments } = useSelector((state) => state.departments);
// //   const { list: designations } = useSelector((state) => state.designations);

// //   useEffect(() => {
// //     dispatch(fetchCategories());
// //     dispatch(fetchProvinces());
// //     dispatch(fetchDepartments());
// //     dispatch(fetchDesignations());
// //   }, [dispatch]);

// //   // Fetch districts and municipalities based on selected province
// //   useEffect(() => {
// //     const fetchDistrictsAndMunicipalities = async () => {
// //       if (formData.province) {
// //         try {
// //           // Replace the following URL with your API endpoint for fetching districts
// //           const districtsResponse = await axios.get(`http://127.0.0.1:8000/api/setup/districts/?province=${formData.province}`);
// //           setDistricts(districtsResponse.data);

// //           // Replace the following URL with your API endpoint for fetching municipalities
// //           const municipalitiesResponse = await axios.get(`http://127.0.0.1:8000/api/setup/municipalities/?province=${formData.province}`);
// //           setMunicipalities(municipalitiesResponse.data);
// //         } catch (error) {
// //           console.error("There was an error fetching districts or municipalities!", error);
// //         }
// //       } else {
// //         setDistricts([]);
// //         setMunicipalities([]);
// //       }
// //     };

// //     fetchDistrictsAndMunicipalities();
// //   }, [formData.province]);

// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     // Form submission logic
// //   };

// //   return (
// //     <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
// //       <div className="card">
// //         <Nav tabs>
// //           <NavItem>
// //             <NavLink
// //               className={classnames({ active: activeTab === "1" })}
// //               onClick={() => setActiveTab("1")}
// //             >
// //               General Information
// //             </NavLink>
// //           </NavItem>
// //           <NavItem>
// //             <NavLink
// //               className={classnames({ active: activeTab === "2" })}
// //               onClick={() => setActiveTab("2")}
// //             >
// //               Address
// //             </NavLink>
// //           </NavItem>
// //           <NavItem>
// //             <NavLink
// //               className={classnames({ active: activeTab === "3" })}
// //               onClick={() => setActiveTab("3")}
// //             >
// //               Company Info
// //             </NavLink>
// //           </NavItem>
// //         </Nav>
// //         <TabContent activeTab={activeTab}>
// //           <TabPane tabId="2">
// //             <div className="card">
// //               <div className="card-body">
// //                 <form>
// //                   <div className="row mt-3">
// //                     <h5 className="btn btn-info mb-2">Permanent Address</h5>
// //                   </div>
// //                   <div className="row">
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <label htmlFor="province">Province:</label>
// //                         <select
// //                           id="province"
// //                           name="province"
// //                           value={formData.province}
// //                           onChange={handleInputChange}
// //                           className="form-control"
// //                           required
// //                         >
// //                           <option value="">Select province</option>
// //                           {provinces.length > 0 ? (
// //                             provinces.map((province) => (
// //                               <option key={province.id} value={province.id}>
// //                                 {province.name}
// //                               </option>
// //                             ))
// //                           ) : (
// //                             <option value="">No provinces available</option>
// //                           )}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* District */}
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <label htmlFor="district">District:</label>
// //                         <select
// //                           id="district"
// //                           name="district"
// //                           value={formData.district}
// //                           onChange={handleInputChange}
// //                           className="form-control"
// //                           required
// //                         >
// //                           <option value="">Select District</option>
// //                           {districts.length > 0 ? (
// //                             districts.map((district) => (
// //                               <option key={district.id} value={district.id}>
// //                                 {district.name}
// //                               </option>
// //                             ))
// //                           ) : (
// //                             <option value="">No districts available</option>
// //                           )}
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Municipality */}
// //                   <div className="row">
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <label htmlFor="municipality">Municipality:</label>
// //                         <select
// //                           id="municipality"
// //                           name="municipality"
// //                           value={formData.municipality}
// //                           onChange={handleInputChange}
// //                           className="form-control"
// //                           required
// //                         >
// //                           <option value="">Select Municipality</option>
// //                           {municipalities.length > 0 ? (
// //                             municipalities.map((municipality) => (
// //                               <option key={municipality.id} value={municipality.id}>
// //                                 {municipality.name}
// //                               </option>
// //                             ))
// //                           ) : (
// //                             <option value="">No municipalities available</option>
// //                           )}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Ward No */}
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <label htmlFor="ward_no">Ward No:</label>
// //                         <input
// //                           type="text"
// //                           id="ward_no"
// //                           name="ward_no"
// //                           value={formData.ward_no}
// //                           onChange={handleInputChange}
// //                           className="form-control"
// //                           required
// //                         />
// //                       </div>
// //                     </div>

// //                     {/* Tole Name */}
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <label htmlFor="tole_name">Tole Name:</label>
// //                         <input
// //                           type="text"
// //                           id="tole_name"
// //                           name="tole_name"
// //                           value={formData.tole_name}
// //                           onChange={handleInputChange}
// //                           className="form-control"
// //                           required
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <button type="button" className="btn btn-primary" onClick={() => setActiveTab("3")}>
// //                       Next
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </TabPane>
// //           <TabPane tabId="3">
// //             <div className="card">
// //               <div className="card-body">
// //                 <form onSubmit={handleSubmit}>
// //                   <div className="row">
// //                     {/* Other form fields for Company Info */}
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <label htmlFor="organization_name">Organization name:</label>
// //                         <input
// //                           type="text"
// //                           id="organization_name"
// //                           name="organization_name"
// //                           value={formData.organization_name}
// //                           onChange={handleInputChange}
// //                           className="form-control"
// //                           required
// //                         />
// //                       </div>
// //                     </div>
// //                     {/* Other form fields */}
// //                     <div className="col-md-4">
// //                       <div className="form-group">
// //                         <button type="submit" className="btn btn-primary">
// //                           Add Employee
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </TabPane>
// //         </TabContent>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EnquiryForm;

// // import React, { useState, useEffect } from "react";
// // import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
// // import classnames from "classnames";
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import { useSelector, useDispatch } from "react-redux";
// // import {
// //   fetchDepartments,
// //   fetchDesignations,
// //   fetchProvinces,
// //   fetchDistricts,
// //   fetchMunicipalities,
// // } from "../../redux/slice/crm/enquirySlice";

// // const EnquiryForm = () => {
// //   const [activeTab, setActiveTab] = useState("1");
// //   const [categories, setcategories] = useState([]);

// //   // const [provinces, setProvinces] = useState([]);
// //   const [zones, setZones] = useState([]);

// //   // const [districts, setDistricts] = useState([]);

// //   const {
// //     // provinces,

// //     designations,
// //     departments,
// //     municipalities = [],

// //     provinces,
// //     districts,
// //     // zones: [],
// //     loading,
// //     error,
// //   } = useSelector((state) => state.enquiry);
// //   const dispatch = useDispatch();
// //   const [formData, setFormData] = useState({
// //     customer_name: "",
// //     category: "",
// //     // category: "",
// //     department: "",
// //     designation: "",
// //     pri_phone: "",
// //     sec_phone: "",
//     email: "",
//     gender: "",

//     province: "",
//     zone: "",
//     district: "",
//     municipality: "",
//     ward_no: "",
//     tole_name: "",

//     estimated_amount: "",
//     enquiry_purpose: "",
//     known_by: "",
//     created: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   function handleSameAddress(event) {
//     if (event.target.checked) {
//       setFormData({
//         ...formData,
//         category: formData.department,
//         temp_zone: formData.zone,
//         temp_district: formData.district,
//         temp_municipality: formData.municipality,
//         temp_ward_no: formData.ward_no,
//         temp_tole_name: formData.tole_name,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         category: "",
//         temp_zone: "",
//         temp_district: "",
//         temp_municipality: "",
//         temp_ward_no: "",
//         temp_tole_name: "",
//       });
//     }
//   }
//   // Redux state

//   // Fetch data when component mounts
//   useEffect(() => {
//     dispatch(fetchProvinces());
//     dispatch(fetchDistricts());
//     // dispatch(fetch)
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     dispatch(fetchMunicipalities());
//   }, [dispatch]);
//   // Add logs after the data is fetched
//   console.log("Provinces:", provinces);
//   console.log("Districts:", districts);
//   console.log("Designations:", designations);
//   console.log("Departments:", departments);
//   console.log("Municipalities:", municipalities);

//   const toggle = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/employee/new/",
//         formData
//       );
//       console.log(response.data);
//       alert("Employee created successfully!");
//       // You can reset the form or navigate to another page here
//     } catch (error) {
//       console.error("There was an error creating the employee!", error);
//       alert("Failed to create employee.");
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
//                   <h5 className="navbar-brand">Add Enquiry</h5>
//                   <div className="navbar-nav ml-auto">
//                     <Link to="dashboard/crm/enquiry">
//                       <h5>Enquiry Table</h5>
//                     </Link>
//                   </div>
//                 </div>
//               </nav>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {/* enquory type */}

//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="category">Enquiry Category</label>
//                         <select
//                           id="category"
//                           name="category"
//                           value={formData.category}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select Enquiry category</option>
//                           {categories.length > 0 ? (
//                             categories.map((category) => (
//                               <option key={category.id} value={category.id}>
//                                 {category.name}
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
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       {/* departmebt */}

//                       <div className="col-md-4">
//                         <div className="form-group">
//                           <label htmlFor="enquiry_purpose">
//                             enquiry_purpose:
//                           </label>
//                           <input
//                             type="number"
//                             id="enquiry_purpose"
//                             name="enquiry_purpose"
//                             value={formData.enquiry_purpose}
//                             onChange={handleInputChange}
//                             className="form-control"
//                             required
//                           />
//                         </div>
//                       </div>
//                       {/* known by */}
//                       <div className="col-md-4">
//                         <div className="form-group">
//                           <label htmlFor="known_by">known_by:</label>
//                           <input
//                             type="number"
//                             id="known_by"
//                             name="known_by"
//                             value={formData.known_by}
//                             onChange={handleInputChange}
//                             className="form-control"
//                             required
//                           />
//                         </div>
//                       </div>
//                       {/* gender */}
//                       <div className="col-md-4">
//                         <div className="form-group">
//                           <label htmlFor="gender">Gender:</label>
//                           <select
//                             id="gender"
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleInputChange}
//                             className="form-control"
//                             required
//                           >
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     {/* pri phone */}
//                     <div className="row">
//                       <div className="col-md-4">
//                         <div className="form-group">
//                           <label htmlFor="pri_phone">Primary Phone:</label>
//                           <input
//                             type="text"
//                             id="pri_phone"
//                             name="pri_phone"
//                             value={formData.pri_phone}
//                             onChange={handleInputChange}
//                             className="form-control"
//                             required
//                           />
//                         </div>
//                       </div>
//                       {/* </div> */}
//                       {/* sec phone */}

//                       <div className="col-md-4">
//                         <div className="form-group">
//                           <label htmlFor="sec_phone">Secondary Phone:</label>
//                           <input
//                             type="text"
//                             id="sec_phone"
//                             name="sec_phone"
//                             value={formData.sec_phone}
//                             onChange={handleInputChange}
//                             className="form-control"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
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
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select province</option>
//                           {Array.isArray(provinces) &&
//                             provinces.map((province) => (
//                               <option key={province.id} value={province.id}>
//                                 {province.name}
//                               </option>
//                             ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="zone">Zone:</label>
//                         <select
//                           id="zone"
//                           name="zone"
//                           value={formData.zone}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select Zone</option>
//                           {zones.map((zone) => (
//                             <option key={zone.id} value={zone.id}>
//                               {zone.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div> */}
//                     {/* district */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="district">District:</label>
//                         <select
//                           id="district"
//                           name="district"
//                           value={formData.district}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select District</option>
//                           { districts.map((district) => (
//                             <option key={district.id} value={district.id}>
//                               {district.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   {/* municuipality */}
//                   <div className="row">
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="municipality">Municipality:</label>
//                         <select
//                           id="municipality"
//                           name="municipality"
//                           value={formData.municipality}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select Municipality</option>
//                           {municipalities.map((municipality) => (
//                             <option
//                               key={municipality.id}
//                               value={municipality.id}
//                             >
//                               {municipality.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* "Same as Permanent Address" Checkbox */}
//                   <div className="form-group mt-3">
//                     <input
//                       type="checkbox"
//                       id="sameAddressCheckbox"
//                       onChange={handleSameAddress}
//                     />
//                     <label htmlFor="sameAddressCheckbox" className="ml-2">
//                       Same as Permanent Address
//                     </label>
//                   </div>

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
//                       <div className="form-group">
//                         <label htmlFor="department">Departments:</label>
//                         <select
//                           id="department"
//                           name="department"
//                           value={formData.department}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select department</option>
//                           {departments.map((department) => (
//                             <option key={department.id} value={department.id}>
//                               {department.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       {/* designation */}

//                       <div className="form-group">
//                         <label htmlFor="designation">Designations:</label>
//                         <select
//                           id="designation"
//                           name="designation"
//                           value={formData.designation}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select designation</option>
//                           {designations.map((designation) => (
//                             <option key={designation.id} value={designation.id}>
//                               {designation.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <button type="submit" className="btn btn-primary">
//                       Add Employee
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

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import EnquiryForm from "./EnquiryForm";
import "../../css/Table.css";
import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";
import { useSelector, useDispatch } from "react-redux"; // Correct import
import { Link, useNavigate } from "react-router-dom";

const EnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { enquiries, isLoading } = useSelector((state) => state.enquiries);

  // Handle search
  // const filteredEnquiries = enquiries.filter((enquiry) =>
  //   enquiry.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    //fetching data 
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/enquiry/");
        setEnquiries(response.data.result || []); // Ensure the data is from 'result'
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enquiries:", error); // Log the error for debugging
        setError(error);
        setLoading(false);
      }
    };

    fetchEnquiries();




    
//live search handling
    if (searchTerm) {
      setFilteredEnquiries(
        enquiries.filter((enquiry) =>
          enquiry.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredEnquiries(enquiries);
    }

  }, [currentPage, itemsPerPage,searchTerm, enquiries]);

  useEffect(() => {
    dispatch(fetchEnquiries()); // Fetch enquiries using the dispatched action
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading enquiries: {error.message}</div>;
  }
  //--- handle searchitem in a table ----
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };
  // //--converting first letter  capital
  // const formatName = (name) => {
  //   if (!name) return "";
  //   return name
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(" ");
  // };

  // // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  // return (
  //   <div className="content-wrapper">
  //     <div className="row justify-content-center">
  //       <div className="card">
  //         {/* heading */}
  //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //           <div className="container-fluid">
  //             <h5 className="navbar-brand">Enquiry Table</h5>
  //             <div className="navbar-nav ml-auto">
  //               <Link to="create" className="nav-link btn btn-info">
  //                 <h5>Add Enquiry</h5>
  //               </Link>
  //               <form
  //                 method="get"
  //                 action="/enquiry/search"
  //                 className="form-inline ml-3"
  //               >
  //                 <div className="input-group">
  //                   <input
  //                     type="search"
  //                     id="default-search"
  //                     name="searchTerm"
  //                     className="form-control"
  //                     placeholder="Search Mockups, Logos..."
  //                     value={searchTerm}
  //                     onChange={handleSearchChange}
  //                     required
  //                   />
  //                   {/* <div className="input-group-append">
  //                       <button type="submit" className="btn btn-info">
                          
  //                       </button>
  //                     </div> */}
  //                 </div>
  //               </form>
  //             </div>

  //             <div className="form-inline ml-4" id="navbarSupportedContent">
  //               <ul className="navbar-nav mr-30">
  //                 <li className="nav-item ">
  //                   <button
  //                     id="employeeTable"
  //                     className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
  //                   >
  //                     <i className="fas fa-file-csv"></i>
  //                     {/* Font Awesome icon for CSV */}
  //                   </button>
  //                 </li>
  //                 {/* Add other export buttons here */}
  //               </ul>
  //             </div>
  //           </div>
  //         </nav>
  //         {/* heading end */}
  //         <div className="card-body">
  //           <div className="table-container">
  //             <table className="table table-bordered">
  //               <thead>
  //                 <tr>
  //                   <th>#</th>
  //                   <th>Customer Name</th>
  //                   <th>Department</th>
  //                   <th>Phone</th>
  //                   <th>Contact No</th>
  //                   <th>Email</th>
  //                   <th>Gender</th>
  //                   <th>Province</th>
  //                   <th>District</th>
  //                   <th>Municipality</th>
  //                   <th>Ward No</th>
  //                   <th>Tole Name</th>
  //                   <th>Estimated Amount</th>
  //                   <th>Enquiry Purpose</th>
  //                   <th>Known By</th>
  //                   <th>Joining Date</th>
  //                   <th>Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {filteredEnquiries.length > 0 ? (
  //                   filteredEnquiries.map((enquiry, index) => (
  //                     <tr key={enquiry.id}>
  //                       <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
  //                       <td>{formatName(enquiry.customer_name)}</td>
  //                       <td>{formatName(enquiry.department)}</td>
  //                       <td>{enquiry.pri_phone}</td>
  //                       <td>{enquiry.sec_phone}</td>
  //                       <td>{enquiry.email}</td>
  //                       <td>{enquiry.gender}</td>
  //                       <td>{formatName(enquiry.province)}</td>
  //                       <td>{formatName(enquiry.district)}</td>
  //                       <td>{formatName(enquiry.municipality)}</td>
  //                       <td>{enquiry.ward_no}</td>
  //                       <td>{formatName(enquiry.tole_name)}</td>
  //                       <td>{enquiry.estimated_amount}</td>
  //                       <td>{enquiry.enquiry_purpose}</td>
  //                       <td>{enquiry.known_by}</td>
  //                       <td>{enquiry.created}</td>
  //                       <td>
  //                         <button className="btn btn-primary">Edit</button>
  //                         <Link
  //                           to={`/detail/${enquiry.id}`}
  //                           className="btn btn-info"
  //                         >
  //                           View
  //                         </Link>
  //                         <button className="btn btn-danger">Delete</button>
  //                       </td>
  //                     </tr>
  //                   ))
  //                 ) : (
  //                   <tr>
  //                     <td colSpan="17">No enquiries found</td>
  //                   </tr>
  //                 )}
  //               </tbody>
  //             </table>
  //           </div>

  //           <div className="pagination-wrapper">
  //             <div className="pagination-controls">
  //               <div className="pagination-info">
  //                 <label htmlFor="itemsPerPage">Items per page:</label>
  //                 <select
  //                   id="itemsPerPage"
  //                   value={itemsPerPage}
  //                   onChange={handleItemsPerPageChange}
  //                 >
  //                   <option value={10}>10</option>
  //                   <option value={25}>25</option>
  //                   <option value={50}>50</option>
  //                 </select>
  //               </div>
  //               <nav>
  //                 <ul className="pagination">
  //                   <li
  //                     className={`page-item ${
  //                       currentPage === 1 ? "disabled" : ""
  //                     }`}
  //                   >
  //                     <button
  //                       className="page-link"
  //                       onClick={() => handlePageChange(currentPage - 1)}
  //                     >
  //                       &laquo;
  //                     </button>
  //                   </li>
  //                   {Array.from({ length: totalPages }, (_, index) => (
  //                     <li
  //                       key={index + 1}
  //                       className={`page-item ${
  //                         currentPage === index + 1 ? "active" : ""
  //                       }`}
  //                     >
  //                       <button
  //                         className="page-link"
  //                         onClick={() => handlePageChange(index + 1)}
  //                       >
  //                         {index + 1}
  //                       </button>
  //                     </li>
  //                   ))}
  //                   <li
  //                     className={`page-item ${
  //                       currentPage === totalPages ? "disabled" : ""
  //                     }`}
  //                   >
  //                     <button
  //                       className="page-link"
  //                       onClick={() => handlePageChange(currentPage + 1)}
  //                     >
  //                       &raquo;
  //                     </button>
  //                   </li>
                  {/* </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryTable;

// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const EnquiryTable = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEnquiries = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/enquiries/"
//         );
//         setEnquiries(response.data.result || []); // Ensure the data is from 'result'
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching enquiries:", error); // Log the error for debugging
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchEnquiries();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading enquiries: {error.message}</div>;
//   }

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Employee enquiries</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Employee</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/search"
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
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item ">
//                       <button
//                         id="employeeTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                         {/* Font Awesome icon for CSV */}
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div className="card-body">
//               <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                 <table className="table table-bordered min-w-full">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Phone</th>
//                       <th>Email</th>
//                       <th>Employee type</th>
//                       <th>role</th>
//                       <th>date_issued</th>
//                       <th>province</th>
//                       <th>District</th>
//                       <th>municipality</th>
//                       <th> ward no</th>
//                       <th> tole name</th>
//                       <th> temp_province</th>
//                       <th>temp_district</th>
//                       <th>temp_municipality</th>
//                       <th> temp_ward_no</th>
//                       <th>temp_tole_name</th>
//                       <th> gender</th>
//                       <th> dob</th>
//                       <th> supervisor name</th>
//                       <th>Department</th>
//                       <th>Designation</th>
//                       <th>Salary</th>
//                       <th>Joining date</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {enquiries.length > 0 ? (
//                       enquiries.map((employee) => (
//                         <tr key={enquiry.id}>
//                           <td>{enquiry.id}</td>
//                           <td>{enquiry.name}</td>
//                           <td>{enquiry.pri_phone}</td>
//                           <td>{enquiry.email}</td>
//                           <td>{enquiry.employee_type}</td>
//                           <td>{enquiry.role}</td>
//                           <td>{enquiry.date_issued}</td>
//                           <td>{enquiry.province}</td>
//                           <td>{enquiry.district}</td>
//                           <td>{enquiry.municipality}</td>
//                           <td>{enquiry.ward_no}</td>
//                           <td>{enquiry.tole_name}</td>
//                           <td>{enquiry.temp_province}</td>
//                           <td>{enquiry.temp_district}</td>
//                           <td>{enquiry.temp_municipality}</td>
//                           <td>{enquiry.temp_ward_no}</td>
//                           <td>{enquiry.temp_tole_name}</td>
//                           <td>{enquiry.municipality}</td>
//                           <td>{enquiry.gender}</td>
//                           <td>{enquiry.dob}</td>
//                           <td>{enquiry.supervisor_name}</td>
//                           <td>{enquiry.department}</td>
//                           <td>{enquiry.designation}</td>
//                           <td>{enquiry.salary}</td>
//                           <td>{enquiry.joining_date}</td>
//                           <td>
//                             <Link to={`/update/${enquiry.id}`}>
//                               Edit
//                             </Link>
//                             |
//                             <Link to={`/detail/${enquiry.id}`}>
//                               View
//                             </Link>
//                             |
//                             <Link to={`/delete/${enquiry.id}`}>
//                               Delete
//                             </Link>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="22">No enquiries found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnquiryTable;
// // export default EmployeeLis






#/////////////////////////////////

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
                              {municipality.name} */}
                            {/* </option>
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
// #-----------------------
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

// import axios from "axios";

import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
import {
  createEnquiry,
  updateEnquiry,
  fetchEnquiryById,
} from "../../redux/slice/crm/enquirySlice";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EnquiryForm = () => {
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
    // zone: "",
    district: "",
    municipality: "",
    ward_no: "",
    tole_name: "",

   

    estimated_amount: "",
    enquiry_purpose: "",
    known_by: "",
    created: "",
    history: "",
  });

  // Toggle function for switching tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  // Retrieve data from the store

  const currentEnquiry = useSelector(
    (state) => state.enquiry?.currentEnquiry || {}
  );

  const { list: provinces } = useSelector((state) => state.provinces);
  const { list: categories } = useSelector((state) => state.categories);
  const { list: districts } = useSelector((state) => state.districts);
  const { list: municipalities } = useSelector((state) => state.municipalities);
  const { list: departments } = useSelector((state) => state.departments);
  const { list: designations } = useSelector((state) => state.designations);

  

  useEffect(() => {
    if (id) {
      dispatch(fetchEnquiryById(id));
    }
  }, [id, dispatch]);

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
  useEffect(() => {
    if (currentEnquiry && id) {
      setFormData({
     

        category: currentEnquiry?.category || "",
       
        department: currentEnquiry?.department || "",
        designation: currentEnquiry?.designation || "",
       
        

        province: currentEnquiry?.province || "",
        district: currentEnquiry?.district || "",
        municipality: currentEnquiry?.municipality || "",
        
      
      });
    }
  }, [currentEnquiry, id]);

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProvinces());
    dispatch(fetchDistricts());
    dispatch(fetchDesignations());
    dispatch(fetchDepartments());
    dispatch(fetchMunicipalities());
  }, [dispatch]);

  
  // Handle form changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //habdle submit for update and create enquiry
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
    // Ensure formData includes department and designation IDs
    const formDataToSubmit = {
      ...formData,
      department: formData.department?.id || formData.department,
      designation: formData.designation?.id || formData.designation,
      province: formData.province?.id || formData.province,
      district: formData.district?.id || formData.district,
      municipality: formData.municipality?.id || formData.municipality,
    };

    if (id) {
      // Update enquiry
      dispatch(updateEnquiry({ id, ...formData, formDataToSubmit }))
        .unwrap()
        .then(() => {
          toast.success("enquiry updated successfully!");
          navigate("/dashboard/crm/enquiry");
        })
        .catch((error) => {
          console.error("Update Error:", error);
          toast.error(
            `Failed to update enquiry: ${error.message || "An error occurred"}`
          );
        });
    } else {
      // Create enquiry
      dispatch(createEnquiry(formDataToSubmit))
        .unwrap()
        .then(() => {
          toast.success("enquiry created successfully!");
          setFormData({
          
            category: "",
           
            department: "",
            designation: "",
           
            province: "",
           
            district: "",
            municipality: "",
           
          });
          navigate("/dashboard/crm/enquiry");
        })
        .catch((error) => {
          console.error("Create Error:", error);
          toast.error(
            `Failed to create enquiry: ${error.message || "An error occurred"}`
          );
        });
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
                    <Link to="/dashboard/crm/enquiry">
                      <h5>Enquiry Table</h5>
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                

                    {/* enquory type */}

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
                
                    <div className="row">
                      {/* enquiry purpose */}

                     
                     
                    </div>

                    {/* pri phone */}
                  
                  </div>

                  {/* </div> */}
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
                          onChange={handleInputChange}
                          // onChange={(e) =>
                          //   setFormData({
                          //     ...formData,
                          //     province: e.target.value,
                          //   })
                          // }
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
                          onChange={handleInputChange}
                          // onChange={(e) =>
                          //   setFormData({
                          //     ...formData,
                          //     department: e.target.value,
                          //   })
                          // }
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
                          onChange={handleInputChange}
                          // onChange={(e) =>
                          //   setFormData({
                          //     ...formData,
                          //     designation: e.target.value,
                          //   })
                          // }
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

                 
                
                    {/* tole name */}
                
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Add Enquiry
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