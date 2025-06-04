import { useState, useEffect } from "react";
// import axiosInstance from "../../../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import { fetchCategories } from "../../../../redux/slice/admin/crm/categorySlice";
// import { fetchDepartments } from "../../../../redux/slice/admin/base/departmentSlice";
// import { fetchDesignations } from "../../../../redux/slice/admin/base/designationSlice";
// import { fetchDistricts } from "../../../../redux/slice/admin/base/districtSlice";
// import { fetchMunicipalities } from "../../../../redux/slice/admin/base/municipalitySlice";
// import { fetchProvinces } from "../../../../redux/slice/admin/base/provinceSlice";
import {
  fetchOrganizationById, updateOrganization
} from "../../../../redux/slice/admin/base/organizationSlice";

// import { toast } from "react-toastify";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrganizationById,  } from "../redux/organizationSlice";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const OrganizationSettings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    organization_name: "",
    province: "",
    district: "",
    pri_phone: "",
    sec_phone: "",
    email: "",
    municipality: "",
    street_name: "",
    pan_vat: "",
    registration_no: "",
    currency: "",
  });

  const { organization, loading, error } = useSelector((state) => state.organizations);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrganizationById(id))
        .unwrap()
        .then((data) => setFormData(data))
        .catch((err) => console.error("Error fetching organization:", err));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateOrganization({ id, data: formData }))
      .unwrap()
      .then(() => toast.success("Organization updated successfully!"))
      .catch((err) => toast.error(`Error updating organization: ${err.message}`));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading organization details: {error}</p>;

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header as="h5" className="bg-primary text-white">
        Organization Settings
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Organization Name</Form.Label>
              <Form.Control type="text" name="organization_name" value={formData.organization_name} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Province</Form.Label>
              <Form.Control type="text" name="province" value={formData.province} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Control type="text" name="district" value={formData.district} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Municipality</Form.Label>
              <Form.Control type="text" name="municipality" value={formData.municipality} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Street Name</Form.Label>
              <Form.Control type="text" name="street_name" value={formData.street_name} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Primary Phone</Form.Label>
              <Form.Control type="text" name="pri_phone" value={formData.pri_phone} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Secondary Phone</Form.Label>
              <Form.Control type="text" name="sec_phone" value={formData.sec_phone} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>PAN / VAT</Form.Label>
              <Form.Control type="text" name="pan_vat" value={formData.pan_vat} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Registration Number</Form.Label>
              <Form.Control type="text" name="registration_no" value={formData.registration_no} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Currency</Form.Label>
              <Form.Control type="text" name="currency" value={formData.currency} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={handleUpdate} className="mt-3">
          Update Organization
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrganizationSettings;


// #latest work weelll
// const OrganizationForm = () => {
//   const [formData, setFormData] = useState({
//     organization_name: "",
//     province: "",
//     district: "",
//     pri_phone: "",
//     sec_phone: "",
//     email: "",
//     municipality: "",
//     street_name: "",
//     pan_vat: "",
//     registration_no: "",
//     // phone: "",
//     currency: "",

//   });
//   const [currency, setCurrency] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);


//   const { id } = useParams(); // Get the organization ID from the URL
//   const navigate = useNavigate(); // For navigation after form submission
//   const dispatch = useDispatch();
//   const { list: provinces } = useSelector((state) => state.provinces);
//   // const { list: categories } = useSelector((state) => state.categories);
//   const { list: districts } = useSelector((state) => state.districts);
//   const { list: municipalities } = useSelector((state) => state.municipalities);
//   // const { list: departments } = useSelector((state) => state.departments);
//   // const { list: designations } = useSelector((state) => state.designations);
//   // Fetch data when component mounts
//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchProvinces());
//     dispatch(fetchDistricts());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     dispatch(fetchMunicipalities());
//   }, [dispatch]);
//   // Fetch organization data if it's an update
//   // Fetch organization data if updating
//   useEffect(() => {
//     if (id) {
//       axiosInstance.get(`api/setup/organization/create`)
//         .then((response) => {
//           setFormData(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching organization:", error);
//         });
//     }
//   }, [id]);
//   console.log("Province ID:", formData.province);
//   console.log("District ID:", formData.district);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     if (id) {
//       console.log("Fetching organization by ID:", id);
//       dispatch(fetchOrganizationById(id))
//         .unwrap()
//         .then((data) => console.log("Organization fetched:", data))
//         .catch((error) => console.log("Error fetching organization:", error));
//     }
//   }, [dispatch, id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prevent duplicate submit on create
//     if (!id && isSubmitted) {
//       toast.warn("Organization already submitted.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const dataToSubmit = { ...formData, currency };

//       if (id) {
//         await dispatch(createOrganization(dataToSubmit));
//         toast.success("Organization updated successfully!");
//       } else {
//         await dispatch(createOrganization(dataToSubmit));
//         setIsSubmitted(true);  // Prevent further submission
//         toast.success("Organization created successfully!");
//       }

//       navigate(`/dashboard/setup/organization/detail/`);
//     } catch (error) {
//       toast.error("Failed to submit organization");
//     } finally {
//       setLoading(false);
//     }
//   };




//   return (
//     <div className="section">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4>{id ? "Update Organization" : "Add Organization"}</h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit} className="row g-3">
//                 {/* Organization Name */}

//                 <div className="col-md-4">
//                   <label htmlFor="organization_name" className="form-label">
//                     Organization Name:
//                   </label>
//                   <input
//                     type="text"
//                     id="organization_name"
//                     name="organization_name"
//                     value={formData.organization_name}
//                     onChange={handleChange}
//                     className="form-control"
//                     disabled={!id && isSubmitted} // disable if already submitted in create mode
//                     required
//                   />
//                 </div>
//                 {/* province */}
//                 <div className="col-md-4">
//                   <div className="form-group">
//                     <label htmlFor="province">Province:</label>
//                     <select
//                       id="province"
//                       name="province"
//                       value={formData.province}
//                       // onChange={handleInputChange}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           province: e.target.value,
//                         })
//                       }
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select province</option>

//                       {provinces.length > 0 ? (
//                         provinces.map((province) => (
//                           <option key={province.id} value={province.id}>
//                             {province.name}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="">No provinces available</option>
//                       )}
//                     </select>
//                   </div>
//                 </div>
//                 {/* district */}
//                 <div className="col-md-4">
//                   <div className="form-group">
//                     <label htmlFor="district">District:</label>
//                     <select
//                       id="district"
//                       name="district"
//                       value={formData.district}
//                       // onChange={handleInputChange}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           district: e.target.value,
//                         })
//                       }
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select District</option>
//                       {districts.length > 0 ? (
//                         districts.map((district) => (
//                           <option key={district.id} value={district.id}>
//                             {district.name}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="">no districts is available</option>
//                       )}
//                     </select>
//                   </div>
//                 </div>
//                 {/* </div> */}
//                 {/* municipality */}
//                 {/* <div className="row"> */}
//                 <div className="col-md-4">
//                   <div className="form-group">
//                     <label htmlFor="municipality">Municipality:</label>
//                     <select
//                       id="municipality"
//                       name="municipality"
//                       value={formData.municipality}
//                       // onChange={handleInputChange}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           municipality: e.target.value,
//                         })
//                       }
//                       className="form-control"
//                       required
//                     >
//                       <option value="">Select Municipality</option>
//                       {municipalities.length > 0 ? (
//                         municipalities.map((municipality) => (
//                           <option
//                             key={municipality.id}
//                             value={municipality.id}
//                           >
//                             {municipality.name}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="">
//                           no municipalities available
//                         </option>
//                       )}
//                     </select>
//                   </div>
//                 </div>
//                 {/* street */}
//                 <div className="col-md-4">
//                   <div className="form-group">
//                     <label htmlFor="street_address">street address:</label>
//                     <input
//                       type="text"
//                       id="street_address"
//                       name="street_address"
//                       value={formData.street_address}
//                       // onChange={handleInputChange}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           street_address: e.target.value,
//                         })
//                       }
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 {/* <div className="row"> */}
//                 <div className="col-md-4">
//                   <label htmlFor="pri_phone" className="form-label">
//                     Phone:
//                   </label>
//                   <input
//                     type="text"
//                     id="pri_phone"
//                     name="pri_phone"
//                     value={formData.pri_phone}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="col-md-4">
//                   <label htmlFor="email" className="form-label">
//                     Email:
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* pan /vat */}
//                 <div className="col-md-4">
//                   <label htmlFor="pan_vat" className="form-label">
//                     Pan/Vat no:
//                   </label>
//                   <input
//                     type="text"
//                     id="pan_vat"
//                     name="pan_vat"
//                     value={formData.pan_vat}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* Registration */}
//                 <div className="col-md-4">
//                   <label htmlFor="registration_no" className="form-label">
//                     Registration
//                   </label>
//                   <input
//                     type="text"
//                     id="registration_no"
//                     name="registration_no"
//                     value={formData.registration_no}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* currency */}
//                 <div className="col-md-4">
//                   <label htmlFor="currency" className="form-label">
//                     Currency:
//                   </label>

//                   <select
//                     id="currency"
//                     value={currency}
//                     onChange={(e) => setCurrency(e.target.value)}
//                     className="form-control"
//                     required
//                   >
//                     <option value="">  --Select Currency--   </option>
//                     <option value="USD">Dollar (USD)</option>
//                     <option value="NPR">Nepali Rupee (NPR)</option>
//                     <option value="INR">Indian Rupee (INR)</option>
//                     <option value="EUR">Euro (EUR)</option>
//                     <option value="GBP">British Pound (GBP)</option>
//                     {/* Add more currencies as needed */}
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-primary-sm"
//                   disabled={loading || (!id && isSubmitted)}
//                 >
//                   {id ? "Update Organization" : "Submit Organization"}
//                 </button>




//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationForm;

// /import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// import { fetchDepartments } from "../../../redux/slice/admin/base/departmentSlice";
// import { fetchDesignations } from "../../../redux/slice/admin/base/designationSlice";
// import { fetchDistricts } from "../../../redux/slice/admin/base/districtSlice";
// import { fetchMunicipalities } from "../../../redux/slice/admin/base/municipalitySlice";
// import { fetchProvinces } from "../../../redux/slice/admin/base/provinceSlice";
// import { createOrganization } from "../../../redux/slice/admin/base/organizationSlice";
// const OrganizationForm = () => {
//   const [formData, setFormData] = useState({
//     organization_name: "",
//     province: "",
//     district: "",
//     pri_phone: "",
//     email: "",
//     department: "",
//     designation: "",
//     salary: "",
//     municipality: "",
//     street_name: "",
//     pan_vat: "",
//     registration_no: "",
//     // phone: "",
//     currency: "",

//   });
//   const [currency, setCurrency] = useState("");

//   const { id } = useParams(); // Get the organization ID from the URL
//   const navigate = useNavigate(); // For navigation after form submission
//     const dispatch = useDispatch();
//   const { list: provinces } = useSelector((state) => state.provinces);
//   const { list: categories } = useSelector((state) => state.categories);
//   const { list: districts } = useSelector((state) => state.districts);
//   const { list: municipalities } = useSelector((state) => state.municipalities);
//   const { list: departments } = useSelector((state) => state.departments);
//   const { list: designations } = useSelector((state) => state.designations);
// // Fetch data when component mounts
//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchProvinces());
//     dispatch(fetchDistricts());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     dispatch(fetchMunicipalities());
//   }, [dispatch]);
//   // Fetch organization data if it's an update
//   // Fetch organization data if updating
//   useEffect(() => {
//     if (id) {
//       axios.get(`http://127.0.0.1:8000/api/setup/organization/create`)
//         .then((response) => {
//           setFormData(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching organization:", error);
//         });
//     }
//   }, [id]);
//   console.log("Province ID:", formData.province);
//   console.log("District ID:", formData.district);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Form Data Being Submitted:", formData);  // Log the form data
//       if (id) {
//         await dispatch(createOrganization(formData)); // Update organization
//         toast.success("Organization updated successfully!");
//       } else {
//         await dispatch(createOrganization(formData)); // Create new organization
//         toast.success("Organization created successfully!");
//       }
//       navigate(`/dashboard/setup/organization/${id ? id : "new"}`);
//     } catch (error) {
//       console.error("Error submitting organization:", error);
//     }
//   };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     console.log("Form Data Being Submitted:", formData);  // Log the form data
//   //     await dispatch(createOrganization(formData)).unwrap();
//   //     toast.success(id ? "Organization updated successfully!" : "Organization created successfully!");
//   //     if (!id) {
//   //       setFormData({
//   //         organization_name: "",
//   //         province: "",
//   //         district: "",
//   //         pri_phone: "",
//   //         email: "",
//   //         department: "",
//   //         designation: "",
//   //         salary: "",
//   //         municipality: "",
//   //         street_name: "",
//   //         pan_vat: "",
//   //         registration_no: "",
//   //         currency: "", // Keep the currency data as is after submit
//   //       });
//   //     } else {
//   //       navigate("/dashboard/setup/organization/create"); // Navigate after update
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting organization:", error);
//   //   }
//   // };

// //   if (!formData.pan_vat || !formData.registration_no || !formData.phone || !formData.currency) {
// //     console.error("All fields are required!");
// //     return;
// // }


//   return (
//     <div className="section">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4>{id ? "Update Organization" : "Add Organization"}</h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit} className="row g-3">
//                 {/* Organization Name */}

//                 <div className="col-md-4">
//                   <label htmlFor="organization_name" className="form-label">
//                     Organization Name:
//                   </label>
//                   <input
//                     type="text"
//                     id="organization_name"
//                     name="organization_name"
//                     value={formData.organization_name}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//                 {/* province */}
//                 <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="province">Province:</label>
//                         <select
//                           id="province"
//                           name="province"
//                           value={formData.province}
//                           // onChange={handleInputChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               province: e.target.value,
//                             })
//                           }
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
//                      {/* district */}
//                      <div className="col-md-4">
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
//                   {/* </div> */}
//                   {/* municipality */}
//                   {/* <div className="row"> */}
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
//                     {/* street */}
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="street_address">street address:</label>
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

//                     {/* sec_address */}
//                     {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="sec_address">Additional address:</label>
//                         <input
//                           type="text"
//                           id="sec_address"
//                           name="sec_address"
//                           value={formData.sec_address}
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
//                     </div> */}


//                       {/* <div className="col-md-4">
//                             <div className="form-group">
//                               <label htmlFor="category">categories </label>
//                               <select
//                                 id="category"
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                               >
//                                 <option value="">Select categories</option>
//                                 {categories.length > 0 ? (
//                                   categories.map((category) => (
//                                     <option key={category.id} value={category.id}>
//                                       {category.category_name}
//                                     </option>
//                                   ))
//                                 ) : (
//                                   <option value="">No categories available</option>
//                                 )}
//                               </select>
//                             </div>
//                        </div> */}
// {/* department */}
//                     {/* <div className="col-md-4">
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
//                     </div> */}

//                     {/* designation  */}
//                         {/* <div className="col-md-4">
//                           <div className="form-group">
//                             <label htmlFor="designation">Designations:</label>
//                             <select
//                               id="designation"
//                               name="designation"
//                               value={formData.designation}
//                               // onChange={handleInputChange}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   designation: e.target.value,
//                                 })
//                               }
//                               className="form-control"
//                               required
//                             >
//                               <option value="">Select designation</option>
//                               {designations && designations.length > 0 ? (
//                                 designations.map((designation) => (
//                                   <option
//                                     key={designation.id}
//                                     value={designation.id}
//                                   >
//                                     {designation.name}
//                                   </option>
//                                 ))
//                               ) : (
//                                 <option value="">No designations available</option>
//                               )}
//                             </select>
//                           </div>
//                         </div> */}


//                 {/* Phone */}
//                 {/* <div className="row"> */}
//                 <div className="col-md-4">
//                   <label htmlFor="pri_phone" className="form-label">
//                     Phone:
//                   </label>
//                   <input
//                     type="text"
//                     id="pri_phone"
//                     name="pri_phone"
//                     value={formData.pri_phone}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="col-md-4">
//                   <label htmlFor="email" className="form-label">
//                     Email:
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//               {/* pan /vat */}
//                 <div className="col-md-4">
//                   <label htmlFor="pan_vat" className="form-label">
//                     Pan/Vat no:
//                   </label>
//                   <input
//                     type="text"
//                     id="pan_vat"
//                     name="pan_vat"
//                     value={formData.pan_vat}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* Registration */}
//                 <div className="col-md-4">
//                   <label htmlFor="registration_no" className="form-label">
//                     Registration
//                   </label>
//                   <input
//                     type="text"
//                     id="registration_no"
//                     name="registration_no"
//                     value={formData.registration_no}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                   {/* currency */}
//                 <div className="col-md-4">
//                   <label htmlFor="currency" className="form-label">
//                     Currency:
//                   </label>

//                       <select
//                         id="currency"
//                         value={currency}
//                         onChange={(e) => setCurrency(e.target.value)}
//                              className="form-control"
//                         required
//                       >
//                         <option value="">  --Select Currency--   </option>
//                         <option value="USD">Dollar (USD)</option>
//                         <option value="NPR">Nepali Rupee (NPR)</option>
//                         <option value="INR">Indian Rupee (INR)</option>
//                         <option value="EUR">Euro (EUR)</option>
//                         <option value="GBP">British Pound (GBP)</option>
//                         {/* Add more currencies as needed */}
//                       </select>
//                       </div>
//                 {/* </div> */}
//                 {/* {createStatus === "loading" && <p>Submitting...</p>}
//                 {createStatus === "failed" && <p>Error: {createError}</p>} */}
//                 {/* Submit Button */}
//                 <div className="col-12">
//                   <button type="submit" className="btn btn-primary">
//                     {id ? "Update" : "Save"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationForm;
