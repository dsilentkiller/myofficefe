// AttendeeForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAttendee,
  updateAttendee,
  fetchAttendeeById,
} from "../../../../redux/slice/admin/crm/attendeeSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AttendeeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    attendee_name: "",
    email: "",
    pri_phone: "",
    organization_name: "",
    organization_detail: "",
    purpose: "",
  });

  const [phoneValid, setPhoneValid] = useState(true);
  const createStatus = useSelector((state) => state.attendees.createStatus);
  const createError = useSelector((state) => state.attendees.createError);
  const updateStatus = useSelector((state) => state.attendees.updateStatus);
  const updateError = useSelector((state) => state.attendees.updateError);
  const currentAttendee = useSelector(
    (state) => state.attendees.currentAttendee
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAttendeeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentAttendee && id) {
      setFormData({
        attendee_name: currentAttendee.attendee_name || "",
        email: currentAttendee.email || "",
        pri_phone: currentAttendee.pri_phone || "",
        organization_name: currentAttendee.organization_name || "",
        organization_detail: currentAttendee.organization_detail || "",
        purpose: currentAttendee.purpose || "",
      });
    }
  }, [currentAttendee, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (value) => {
    const phoneLength = value.replace(/\D/g, "").length;
    setPhoneValid(phoneLength >= 10 && phoneLength <= 15);
    setFormData({ ...formData, pri_phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateAttendee({ id, ...formData })).unwrap();
        toast.success("Attendee updated successfully!");
      } else {
        await dispatch(createAttendee(formData)).unwrap();
        toast.success("Attendee created successfully!");
      }
      navigate("/dashboard/crm/attendee");
    } catch (error) {
      toast.error(`Error: ${error?.message || "An error occurred"}`);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h4>{id ? "Update Attendee" : "Add Attendee"}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="attendee_name"
                    value={formData.attendee_name}
                    className="form-control"
                    placeholder="Enter attendee name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="form-control"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Phone:</label>
                  <PhoneInput
                    country={"np"}
                    value={formData.pri_phone}
                    onChange={validatePhoneNumber}
                    inputStyle={{
                      width: "100%",
                      borderColor: phoneValid ? "green" : "red",
                      backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
                    }}
                  />
                  {!phoneValid && (
                    <p style={{ color: "red" }}>Invalid phone number length.</p>
                  )}
                </div>
                <div className="col-md-6 form-group">
                  <label>Purpose:</label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    className="form-control"
                    placeholder="Enter purpose"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Organization Fields */}
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Organization Name:</label>
                  <input
                    type="text"
                    name="organization_name"
                    value={formData.organization_name}
                    className="form-control"
                    placeholder="Enter organization name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Organization Detail:</label>
                  <textarea
                    name="organization_detail"
                    value={formData.organization_detail}
                    className="form-control"
                    placeholder="Enter organization details"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                {id ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeForm;

// // for both create and update form
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom"; // Import useParams
// import { toast } from "react-toastify";
// import {
//   createAttendee,
//   updateAttendee,
//   fetchAttendeeById,
// } from "../../../redux/slice/admin/crm/attendeeSlice";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const AttendeeForm = () => {
//   const { id } = useParams(); // Get the attendee ID from URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [toggleState, setToggleState] = useState({ toggle: false });

//   // Correctly set the toggle only once on component mount
//   useEffect(() => {
//     setToggleState((prevState) => ({ ...prevState, toggle: true }));
//   }, []); // Empty dependency array ensures this runs only once

//   const [formData, setFormData] = useState({
//     attendee_name: "",
//     email: "",
//     pri_phone: "",
//     organization_name: "",
//     organization_detail: "",
//     purpose: "",
//   });

//   const [phoneValid, setPhoneValid] = useState(true);
//   const [errors, setErrors] = useState({});
//   const createStatus = useSelector((state) => state.attendees.createStatus);
//   const createError = useSelector((state) => state.attendees.createError);
//   const updateStatus = useSelector((state) => state.projects.updateStatus);
//   // const createError = useSelector((state) => state.projects.createError);
//   const updateError = useSelector((state) => state.projects.updateError);
//   const currentAttendee = useSelector(
//     (state) => state.attendees.currentAttendee
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchAttendeeById(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (currentAttendee && id) {
//       setFormData({
//         attendee_name: currentAttendee.attendee_name || "",
//         email: currentAttendee.email || "",
//         pri_phone: currentAttendee.pri_phone || "",
//         organization_name: currentAttendee.organization_name || "",
//         organization_detail: currentAttendee.organization_detail || "",
//         purpose: currentAttendee.purpose || "",
//       });
//     }
//   }, [currentAttendee, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validatePhoneNumber = (value) => {
//     const phoneLength = value.replace(/\D/g, "").length;
//     if (phoneLength >= 10 && phoneLength <= 15) {
//       setPhoneValid(true);
//     } else {
//       setPhoneValid(false);
//     }
//     setFormData({ ...formData, pri_phone: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (id) {
//       // Update attendee
//       dispatch(updateAttendee({ id, ...formData }))
//         .unwrap()
//         .then((updatedAttendee) => {
//           console.log("update attendee:", updatedAttendee); //see in console
//           setFormData(updatedAttendee);
//           toast.success("Attendee updated successfully!");
//           navigate("/dashboard/crm/attendee");
//         })
//         .catch((error) => {
//           console.error("Update Error:", error);
//           toast.error(
//             `Failed to update attendee: ${error.message || "An error occurred"}`
//           );
//         });
//     } else {
//       // Create attendee
//       dispatch(createAttendee(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Attendee created successfully!");
//           setFormData({
//             attendee_name: "",
//             email: "",
//             pri_phone: "",
//             organization_name: "",
//             organization_detail: "",
//             purpose: "",
//           });
//           navigate("/dashboard/crm/attendee");
//         })
//         .catch((error) => {
//           console.error("Create Error:", error);
//           toast.error(
//             `Failed to create attendee: ${error.message || "An error occurred"}`
//           );
//         });
//     }
//   };
//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Attendee created successfully!");
//       navigate("/dashboard/crm/attendee");
//     } else if (createStatus === "failed") {
//       toast.error(
//         `Create Error: ${createError?.message || "An error occurred"}`
//       );
//     }
//   }, [createStatus, createError, navigate]);

//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("Attendee updated successfully!");
//       navigate("/dashboard/crm/attendee");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Update Error: ${updateError?.message || "An error occurred"}`
//       );
//     }
//   }, [updateStatus, updateError, navigate]);

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Attendee" : "Add Attendee"}
//               </h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   {/* Name Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="attendee_name">Name:</label>
//                       <input
//                         type="text"
//                         id="attendee_name"
//                         name="attendee_name"
//                         value={formData.attendee_name}
//                         className="form-control"
//                         placeholder="Enter attendee name"
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             attendee_name: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       {errors.attendee_name && <p>{errors.attendee_name}</p>}
//                     </div>
//                   </div>

//                   {/* Email Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="email">Email:</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         className="form-control"
//                         placeholder="Enter email"
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         required
//                       />
//                       {errors.email && <p>{errors.email}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   {/* Phone Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="pri_phone">Phone:</label>
//                       <PhoneInput
//                         country={"np"}
//                         value={formData.pri_phone}
//                         onChange={validatePhoneNumber}
//                         inputStyle={{
//                           width: "100%",
//                           borderColor: phoneValid ? "green" : "red",
//                           backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                         }}
//                       />
//                       {!phoneValid && (
//                         <p style={{ color: "red" }}>
//                           Please enter a valid phone number between 10 and 15
//                           digits.
//                         </p>
//                       )}
//                     </div>
//                     {errors.pri_phone && <p>{errors.pri_phone}</p>}
//                   </div>

//                   {/* Purpose Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="purpose">Purpose:</label>
//                       <input
//                         type="text"
//                         id="purpose"
//                         name="purpose"
//                         value={formData.purpose}
//                         className="form-control"
//                         placeholder="Enter purpose"
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             purpose: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       {errors.purpose && <p>{errors.purpose}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   {/* Organization Name Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="organization_name">
//                         Organization Name:
//                       </label>
//                       <input
//                         type="text"
//                         id="organization_name"
//                         name="organization_name"
//                         value={formData.organization_name}
//                         className="form-control"
//                         placeholder="Enter organization name"
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             organization_name: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       {errors.organization_name && (
//                         <p>{errors.organization_name}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Organization Detail Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="organization_detail">
//                         Organization Detail:
//                       </label>
//                       <textarea
//                         id="organization_detail"
//                         name="organization_detail"
//                         value={formData.organization_detail}
//                         className="form-control"
//                         placeholder="Enter organization details"
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             organization_detail: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       {errors.organization_detail && (
//                         <p>{errors.organization_detail}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary">
//                   {id ? "Update" : "Save"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendeeForm;
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Attendee" : "Add Attendee"}
//               </h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 {/* Form fields */}
//                 {/* ... your form fields here ... */}
//                 <div className="row justify-content-center">
//                   {/* Name Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="attendee_name">Name:</label>
//                       <input
//                         type="text"
//                         id="attendee_name"
//                         name="attendee_name"
//                         value={formData.attendee_name}
//                         className="form-control"
//                         placeholder="Enter attendee name"
//                         // onChange={handleChange}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             attendee_name: e.target.value,
//                           })
//                         }
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.attendee_name && <p>{errors.attendee_name}</p>}
//                   </div>

//                   {/* Email Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="email">Email:</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         className="form-control"
//                         placeholder="Enter email"
//                         // onChange={handleChange}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.email && <p>{errors.email}</p>}
//                 </div>

//                 {/* Phone Field */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="pri_phone">Phone:</label>
//                       <PhoneInput
//                         country={"np"} // Country code for Nepal
//                         value={formData.pri_phone}
//                         onChange={validatePhoneNumber}
//                         inputStyle={{
//                           width: "100%",
//                           borderColor: phoneValid ? "green" : "red",
//                           backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                         }}
//                       />
//                       {!phoneValid && (
//                         <p style={{ color: "red" }}>
//                           Please enter a valid phone number between 10 and 15
//                           digits.
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   {errors.pri_phone && <p>{errors.pri_phone}</p>}
//                 </div>
//                 {/* <div className="row"> */}
//                   {/* purpose */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="purpose">Purpose</label>
//                       <input
//                         type="text"
//                         id="purpose"
//                         name="purpose"
//                         value={formData.purpose}
//                         className="form-control"
//                         placeholder="Enter purpose"
//                         // onChange={handleChange}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             purpose: e.target.value,
//                           })
//                         }
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.purpose && <p>{errors.purpose}</p>}
//                   </div>

//                   {/* Organization Fields */}

//                   {/* Organization Name */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="organization_name">
//                         Organization Name:
//                       </label>
//                       <input
//                         type="text"
//                         id="organization_name"
//                         name="organization_name"
//                         value={formData.organization_name}
//                         className="form-control"
//                         placeholder="Enter organization name"
//                         // onChange={handleChange}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             organization_name: e.target.value,
//                           })
//                         }
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.organization_name && (
//                       <p>{errors.organization_name}</p>
//                     )}
//                   </div>
//                 {/* </div> */}

//                   {/* Organization Detail */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="organization_detail">
//                         Organization Detail:
//                       </label>
//                       <textarea
//                         type="text"
//                         id="organization_detail"
//                         name="organization_detail"
//                         value={formData.organization_detail}
//                         className="form-control"
//                         placeholder="Enter organization details"
//                         // onChange={handleChange}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             organization_detail: e.target.value,
//                           })
//                         }
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.organization_detail && (
//                     <p>{errors.organization_detail}</p>
//                   )}
//                 {/* </div> */}

//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}
//                 {/* </div> */}

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary">
//                   {id ? "Update" : "Save"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendeeForm;

// #only create form
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createAttendee, fetchAttendee } from "../../../redux/slice/admin/attendeeSlice";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const AttendeeForm = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [phoneValid, setPhoneValid] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     attendee_name: "",
//     email: "",
//     // whatsapp_no: "",
//     pri_phone: "",
//     organization_name: "",
//     organization_detail: "",
//     // created: "",
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.attendees.createStatus);
//   const createError = useSelector((state) => state.attendees.createError);
//   const attendees = useSelector((state) => state.attendees.list || []);

//   useEffect(() => {
//     dispatch(fetchAttendee());
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Attendee created successfully!");
//       setFormData({
//         attendee_name: "",
//         email: "",
//         // whatsapp_no: "",
//         pri_phone: "",
//         organization_name: "",
//         organization_detail: "",
//         // created: "",
//       });
//       navigate("/dashboard/crm/attendee");
//     }
//   }, [createStatus, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validatePhoneNumber = (value) => {
//     const phoneLength = value.replace(/\D/g, "").length;
//     if (phoneLength >= 10 && phoneLength <= 15) {
//       setPhoneValid(true);
//     } else {
//       setPhoneValid(false);
//     }
//     setPhoneNumber(value);
//   };

//   // const validateWhatsappNumber = (value) => {
//   //   const phoneLength = value.replace(/\D/g, "").length;
//   //   if (phoneLength >= 10 && phoneLength <= 15) {
//   //     setPhoneValid(true);
//   //   } else {
//   //     setPhoneValid(false);
//   //   }
//   //   setPhoneNumber(value);
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const existingAttendee = attendees.some(
//       (attendee) =>
//         attendee.attendee_name &&
//         attendee.attendee_name.toLowerCase() ===
//           formData.attendee_name.toLowerCase()
//     );

//     if (existingAttendee) {
//       toast.error("Attendee with this name already exists.");
//       return;
//     }

//     dispatch(createAttendee(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           attendee_name: "",
//           email: "",
//           // whatsapp_no: "",
//           pri_phone: "",
//           organization_name: "",
//           organization_detail: "",
//           // created: "",
//         });
//         navigate("/dashboard/crm/attendee");
//       })
//       .catch((error) => {
//         console.error("Create Error:", error.response); // Log detailed error
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Attendee</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="attendee_name">Name:</label>
//                       <input
//                         type="text"
//                         id="attendee_name"
//                         name="attendee_name"
//                         value={formData.attendee_name}
//                         className="form-control"
//                         placeholder="Enter attendee name"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.attendee_name && <p>{errors.attendee_name}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="email">Email:</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         className="form-control"
//                         placeholder="Enter email"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.email && <p>{errors.email}</p>}
//                 </div>

//                 <div className="row">
//                   {/* <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="whatsapp_no">whatsapp no :</label>
//                       <PhoneInput
//                         country={"nepal"} // Set a default country
//                         value={formData.whatsapp_no}
//                         onChange={validateWhatsappNumber}
//                         inputStyle={{
//                           width: "100%",
//                           borderColor: phoneValid ? "green" : "red",
//                           backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                         }}
//                       />
//                       {!phoneValid && (
//                         <p style={{ color: "red" }}>
//                           Please enter a valid whatsapp_no number between 10 and
//                           15 digits.
//                         </p>
//                       )}
//                     </div>
//                     {errors.whatsapp_no && <p>{errors.contact_no}</p>}
//                   </div> */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="pri_phone">Phone:</label>
//                       <PhoneInput
//                         country={"nepal"} // Set a default country
//                         value={formData.pri_phone}
//                         onChange={validatePhoneNumber}
//                         inputStyle={{
//                           width: "100%",
//                           borderColor: phoneValid ? "green" : "red",
//                           backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
//                         }}
//                       />
//                       {!phoneValid && (
//                         <p style={{ color: "red" }}>
//                           Please enter a valid phone number between 10 and 15
//                           digits.
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   {errors.phone && <p>{errors.phone}</p>}
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="organization_name">
//                         Organization Name:
//                       </label>
//                       <input
//                         type="text"
//                         id="organization_name"
//                         name="organization_name"
//                         value={formData.organization_name}
//                         className="form-control"
//                         placeholder="Enter organization name"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.organization_name && (
//                       <p>{errors.organization_name}</p>
//                     )}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="organization_detail">
//                         Organization Detail:
//                       </label>
//                       <input
//                         type="text"
//                         id="organization_detail"
//                         name="organization_detail"
//                         value={formData.organization_detail}
//                         className="form-control"
//                         placeholder="Enter organization details"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.organization_detail && (
//                     <p>{errors.organization_detail}</p>
//                   )}
//                 </div>
//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendeeForm;
