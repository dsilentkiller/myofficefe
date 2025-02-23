import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createFollow,
  updateFollowById,
  fetchFollows
} from "../../redux/slice/crm/followSlice";

import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";

const FollowForm = ({ enquiryId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    enquiry: enquiryId,
    follow_by: "",
    due_date: "",
    remark: "",
    notes: "",
    created: "",  // Ensure initialized with empty string or default value
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(updateFollowById({ id, ...formData }))
        .unwrap()
        .then(() => {
          toast.success("Follow updated successfully!");
          dispatch(fetchFollows()); // Refresh the follow table
          navigate("/dashboard/crm/follow");
        })
        .catch((error) => {
          setErrors(error.errors || {});
          toast.error(error.message || "Failed to update follow.");
        });
    } else {
      dispatch(createFollow(formData))
        .unwrap()
        .then(() => {
          toast.success("Follow created successfully!"); // Success message
          dispatch(fetchFollows()); // Refresh the follow table with the new follow
          setFormData({
            enquiry: enquiryId,
            follow_by: "",
            due_date: "",
            remark: "",
            notes: "",
            created: "", // Reset formData after creation
          });
          navigate("/dashboard/crm/follow");
        })
        .catch((error) => {
          setErrors(error.errors || {});
          toast.error(error.message || "Failed to create follow.");
        });
    }
  };

  const enquiries = useSelector((state) => state.enquiries.list);
  const followToUpdate = useSelector((state) => state.follows.CurrentFollow);
  const isLoading = useSelector((state) => state.enquiries.isLoading);
  const error = useSelector((state) => state.enquiries.error);

  useEffect(() => {
    dispatch(fetchEnquiries());
    if (id) {
      dispatch(updateFollowById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (followToUpdate && id) {
      setFormData({
        enquiry: followToUpdate.enquiry_id || "",
        follow_by: followToUpdate.follow_by || "",
        due_date: followToUpdate.due_date || "",
        remark: followToUpdate.remark || "",
        notes: followToUpdate.notes || "",
        created: followToUpdate.created || "",  // Ensure created is initialized
      });
    }
  }, [followToUpdate, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">
                {id ? "Update Follow" : "Add Follow"}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="enquiry">Customer name:</label>
                      <select
                        id="enquiry"
                        name="enquiry_id"
                        value={formData.enquiry_id || ""}
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
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="follow_by">Follow by:</label>
                      <select
                        id="follow_by"
                        name="follow_by"
                        value={formData.follow_by}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select an Option</option>
                        <option value="call">Call</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="linkedIn">LinkedIn</option>
                        <option value="viber">Viber</option>
                        <option value="email">Email</option>
                        <option value="meetup">Meetup</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="due_date">Next Follow up Date:</label>
                      <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        value={formData.due_date}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      {errors.due_date && <p>{errors.due_date}</p>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="remark">Remark:</label>
                      <textarea
                        id="remark"
                        name="remark"
                        value={formData.remark}
                        className="form-control"
                        placeholder="Enter remark"
                        onChange={handleChange}
                        required
                      />
                      {errors.remark && <p>{errors.remark}</p>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="notes">Notes:</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        className="form-control"
                        placeholder="Enter notes"
                        onChange={handleChange}
                        required
                      />
                      {errors.notes && <p>{errors.notes}</p>}
                    </div>
                  </div>
                </div>

                {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

                <button type="submit" className="btn btn-primary">
                  {id ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowForm;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createFollow,
//   updateFollowById,
//   fetchFollows
// } from "../../redux/slice/crm/followSlice";

// import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";

// const FollowForm = ({ enquiryId }) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     enquiry: enquiryId,
//     follow_by: "",
//     due_date: "",
//     remark: "",
//     notes: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (id) {
//       dispatch(updateFollowById({ id, ...formData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Follow updated successfully!");
//           dispatch(fetchFollows()); // Refresh the follow table
//           navigate("/dashboard/crm/follow");
//         })
//         .catch((error) => {
//           setErrors(error.errors || {});
//           toast.error(error.message || "Failed to update follow.");
//         });
//     } else {
//       dispatch(createFollow(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Follow created successfully!"); // Success message
//           dispatch(fetchFollows()); // Refresh the follow table with the new follow
//           setFormData({
//             enquiry: enquiryId,
//             follow_by: "",
//             due_date: "",
//             remark: "",
//             notes: "",
//           });
//           navigate("/dashboard/crm/follow");
//         })
//         .catch((error) => {
//           setErrors(error.errors || {});
//           toast.error(error.message || "Failed to create follow.");
//         });
//     }
//   };

//   const enquiries = useSelector((state) => state.enquiries.list);
//   const followToUpdate = useSelector((state) => state.follows.CurrentFollow);
//   const isLoading = useSelector((state) => state.enquiries.isLoading);
//   const error = useSelector((state) => state.enquiries.error);

//   useEffect(() => {
//     dispatch(fetchEnquiries());
//     if (id) {
//       dispatch(updateFollowById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (followToUpdate && id) {
//       setFormData({
//         enquiry: followToUpdate.enquiry_id || "",
//         follow_by: followToUpdate.follow_by || "",
//         due_date: followToUpdate.due_date || "",
//         remark: followToUpdate.remark || "",
//         notes: followToUpdate.notes || "",
//       });
//     }
//   }, [followToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Follow" : "Add Follow"}
//               </h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <div className="form-group">
//                       <label htmlFor="enquiry">Customer name:</label>
//                       <select
//                         id="enquiry"
//                         name="enquiry_id"
//                         value={formData.enquiry_id || ""}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select enquiry</option>
//                         {isLoading ? (
//                           <option>Loading...</option>
//                         ) : error ? (
//                           <option>Error loading enquiries</option>
//                         ) : enquiries.length > 0 ? (
//                           enquiries.map((enquiry) => (
//                             <option key={enquiry.id} value={enquiry.id}>
//                               {enquiry.customer_name}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No enquiries available</option>
//                         )}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="follow_by">Follow by:</label>
//                       <select
//                         id="follow_by"
//                         name="follow_by"
//                         value={formData.follow_by}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select an Option</option>
//                         <option value="call">Call</option>
//                         <option value="whatsapp">WhatsApp</option>
//                         <option value="linkedIn">LinkedIn</option>
//                         <option value="viber">Viber</option>
//                         <option value="email">Email</option>
//                         <option value="meetup">Meetup</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="due_date">Next Follow up Date:</label>
//                       <input
//                         type="date"
//                         id="due_date"
//                         name="due_date"
//                         value={formData.due_date}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.due_date && <p>{errors.due_date}</p>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="remark">Remark:</label>
//                       <textarea
//                         id="remark"
//                         name="remark"
//                         value={formData.remark}
//                         className="form-control"
//                         placeholder="Enter remark"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.remark && <p>{errors.remark}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <textarea
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.notes && <p>{errors.notes}</p>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="created">Today Date:</label>
//                       <input
//                         type="date"
//                         id="created"
//                         name="created"
//                         value={formData.created}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.created && <p>{errors.created}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

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

// export default FollowForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createFollow,
//   updateFollowById,
// } from "../../redux/slice/crm/followSlice";
// import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";

// const FollowForm = (enquiryId) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     enquiry: enquiryId,
//     follow_by: "",
//     due_date: "",
//     remark: "",
//     notes: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (id) {
//       dispatch(updateFollowById({ id, ...formData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Follow updated successfully!");
//           navigate("/dashboard/crm/follow");
//         })
//         .catch((error) => {
//           setErrors(error.errors || {});
//           toast.error(error.message || "Failed to update follow.");
//         });
//     } else {
//       dispatch(createFollow(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Follow created successfully!");
//           console.log("Follow creation success");  // Check if this logs
//           setFormData({
//             enquiry: enquiryId,
//             follow_by: "",
//             due_date: "",
//             remark: "",
//             notes: "",
//           });
//           navigate("/dashboard/crm/follow");
//         })
//         .catch((error) => {
//           setErrors(error.errors || {});
//           toast.error(error.message || "Failed to create follow.");
//         });
//     }
//   };

//   const enquiries = useSelector((state) => state.enquiries.list);
//   const followToUpdate = useSelector((state) => state.follows.CurrentFollow);
//   const isLoading = useSelector((state) => state.enquiries.isLoading);
//   const error = useSelector((state) => state.enquiries.error);

//   useEffect(() => {
//     dispatch(fetchEnquiries());
//     if (id) {
//       dispatch(updateFollowById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (followToUpdate && id) {
//       console.log("Follow data to update:", followToUpdate);
//       setFormData({
//         enquiry: followToUpdate.enquiry_id || "",  // Ensure empty string if undefined
//         follow_by: followToUpdate.follow_by || "",
//         due_date: followToUpdate.due_date || "",
//         remark: followToUpdate.remark || "",
//         notes: followToUpdate.notes || "",
//       });

//       // } else if (!followToUpdate && id) {
//       //   toast.error("Failed to load follow details for update.");
//     }
//   }, [followToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };



//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Follow" : "Add Follow"}
//               </h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <div className="form-group">
//                       <label htmlFor="enquiry">customer name:</label>
//                       <select
//                         id="enquiry"
//                         name="enquiry_id"
//                         value={formData.enquiry_id || ""}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select enquiry</option>
//                         {isLoading ? (
//                           <option>Loading...</option>
//                         ) : error ? (
//                           <option>Error loading enquiries</option>
//                         ) : enquiries.length > 0 ? (
//                           enquiries.map((enquiry) => (
//                             <option key={enquiry.id} value={enquiry.id}>
//                               {enquiry.customer_name}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No enquiries available</option>
//                         )}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="follow_by">Follow by:</label>
//                       <select
//                         id="follow_by"
//                         name="follow_by"
//                         value={formData.follow_by}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select an Option</option>
//                         <option value="call">Call</option>
//                         <option value="whatsapp">WhatsApp</option>
//                         <option value="linkedIn">LinkedIn</option>
//                         <option value="viber">Viber</option>
//                         <option value="email">Email</option>
//                         <option value="meetup">Meetup</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="due_date">Next Follow up Date:</label>
//                       <input
//                         type="date"
//                         id="due_date"
//                         name="due_date"
//                         value={formData.due_date}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.due_date && <p>{errors.due_date}</p>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="remark">Remark:</label>
//                       <textarea
//                         id="remark"
//                         name="remark"
//                         value={formData.remark}
//                         className="form-control"
//                         placeholder="Enter remark"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.remark && <p>{errors.remark}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <textarea
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.notes && <p>{errors.notes}</p>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="created">Today Date:</label>
//                       <input
//                         type="date"
//                         id="created"
//                         name="created"
//                         value={formData.created}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.created && <p>{errors.created}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

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

// export default FollowForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createFollow,
//   updateFollow,
//   fetchFollowById,
// } from "../../redux/slice/crm/followSlice";
// import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";

// const FollowForm = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [toggleState, setToggleState] = useState({ toggle: false });
//   const { list: enquiries } = useSelector((state) => state.enquiries);
//   // const { list: designations } = useSelector((state) => state.designations);
//   useEffect(() => {
//     setToggleState((prevState) => ({ ...prevState, toggle: true }));
//   }, []);

//   useEffect(() => {
//     dispatch(fetchEnquiries());
//     console.log(enquiries);
//   }, [dispatch]);

//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     follow_by: "",
//     due_date: "",
//     remark: "",
//     notes: "",
//
//     purpose: "",
//   });

//   // const createStatus = useSelector((state) => state.follows.createStatus);
//   const followToUpdate = useSelector((state) => state.follows.followToUpdate);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchFollowById(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (followToUpdate && id) {
//       console.log("Current Follow Data:", followToUpdate); // Debugging line
//       setFormData({
//         name: followToUpdate.name || "",
//         follow_by: followToUpdate.follow_by || "",
//         due_date: followToUpdate.due_date || "",
//         remark: followToUpdate.remark || "",
//         notes: followToUpdate.notes || "",
//         created: followToUpdate.created || "",
//       });
//     }
//   }, [followToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = { id, ...formData };
//     console.log("Update Payload:", payload); // Log the payload
//     try {
//       if (id) {
//         dispatch(updateFollow({ id, ...formData }))
//           .unwrap()
//           .then(() => {
//             toast.success("Follow up updated successfully!");
//             navigate("/dashboard/crm/follow");
//           })
//           .catch((error) => {
//             console.error("Update Error:", error);
//             toast.error(
//               `Failed to update Follow: ${error.message || "An error occurred"}`
//             );
//           });
//       } else {
//         dispatch(createFollow(formData))
//           .unwrap()
//           .then(() => {
//             toast.success("Follow created successfully!");
//             navigate("/dashboard/crm/follow");
//           })
//           .catch((error) => {
//             console.error("Create Error:", error);
//             setErrors(error.errors || {});
//             toast.error(
//               `Failed to create Follow: ${error.message || "An error occurred"}`
//             );
//           });
//       }
//     } catch (error) {
//       console.error("Update Error:", error);
//       toast.error(
//         `Failed to update Follow: ${error.message || "An error occurred"}`
//       );
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Follow" : "Add Follow"}
//               </h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <div className="form-group">
//                       <label htmlFor="enquiry">enquirys:</label>
//                       <select
//                         id="enquiries"
//                         name="enquiries"
//                         value={formData.enquiries}
//                         // onChange={handleInputChange}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             enquiry: e.target.value,
//                           })
//                         }
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select enquiry</option>
//                         {enquiries.length > 0 ? (
//                           enquiries.map((enquiry) => (
//                             <option key={enquiries.id} value={enquiry.id}>
//                               {enquiries.name}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="">no enquirys available</option>
//                         )}
//                       </select>
//                     </div>
//                   </div>

//                   {/* <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="name">Customer name </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         className="form-control"
//                         placeholder="Enter name"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.name && <p>{errors.name}</p>}
//                     </div>
//                   </div> */}

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="follow_by">Follow by:</label>
//                       <select
//                         id="follow_by"
//                         name="follow_by"
//                         value={formData.follow_by}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select an Option</option>
//                         <option value="call">Call</option>
//                         <option value="whatsapp">WhatsApp</option>
//                         <option value="linkedIn">linkedIn</option>
//                         <option value="viber">Viber</option>
//                         <option value="email">Email</option>
//                         <option value="meetup">Meetup</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="due_date">Due Date:</label>
//                       <input
//                         type="date"
//                         id="due_date"
//                         name="due_date"
//                         value={formData.due_date}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.due_date && <p>{errors.due_date}</p>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="remark">Remark:</label>
//                       <textarea
//                         id="remark"
//                         name="remark"
//                         value={formData.remark}
//                         className="form-control"
//                         placeholder="Enter remark"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.remark && <p>{errors.remark}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <textarea
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.notes && <p>{errors.notes}</p>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="created">Follow-up Date:</label>
//                       <input
//                         type="date"
//                         id="created"
//                         name="created"
//                         value={formData.created}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                       {errors.created && <p>{errors.created}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

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

// export default FollowForm;

// // for both create and update form
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom"; // Import useParams
// import { toast } from "react-toastify";
// import {
//   createFollow,
//   updateFollow,
//   fetchFollowById,
// } from "../../redux/slice/crm/followSlice";

// // import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";
// // Fetch data when component mounts

// const FollowForm = () => {
//   const { id } = useParams(); // Get the Follow ID from URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [toggleState, setToggleState] = useState({ toggle: false });
//   const { list: enquiries } = useSelector((state) => state.enquiries);
//   // Correctly set the toggle only once on component mount
//   useEffect(() => {
//     setToggleState((prevState) => ({ ...prevState, toggle: true }));
//   }, []); // Empty dependency array ensures this runs only once
//   useEffect(() => {
//     dispatch(fetchEnquiries());
//   }, [dispatch]);
//   // const [phoneValid, setPhoneValid] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     follow_by: "",
//     due_date: "",
//     remark: "",
//     notes: "",
//
//     purpose: "",
//     // remark :"",
//   });

//   const createStatus = useSelector((state) => state.follows.createStatus);
//   // const createError = useSelector((state) => state.Follows.createError);
//   const followToUpdate = useSelector((state) => state.follows.followToUpdate);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchFollowById(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (followToUpdate && id) {
//       setFormData({
//         name: followToUpdate.name || "",
//         follow_by: followToUpdate.follow_by || "",
//         due_date: followToUpdate.due_date || "",
//         remark: followToUpdate.remark || "",
//         notes: followToUpdate.notes || "",
//         created: followToUpdate.created || "",
//         // purpose: followToUpdate.purpose || "",
//       });
//     }
//   }, [followToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const validatePhoneNumber = (value) => {
//   //   const phoneLength = value.replace(/\D/g, "").length;
//   //   if (phoneLength >= 10 && phoneLength <= 15) {
//   //     setPhoneValid(true);
//   //   } else {
//   //     setPhoneValid(false);
//   //   }
//   //   setFormData({ ...formData, remark: value });
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (id) {
//       // Update Follow
//       dispatch(updateFollow({ id, ...formData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Follow updated successfully!");
//           navigate("/dashboard/crm/follow");
//         })
//         .catch((error) => {
//           console.error("Update Error:", error);
//           toast.error(
//             `Failed to update Follow: ${error.message || "An error occurred"}`
//           );
//         });
//     } else {
//       const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(createFollow(formData))
//           .unwrap()
//           .then(() => {
//             toast.success("Follow created successfully!");
//             navigate("/dashboard/crm/follow");
//           })
//           .catch((error) => {
//             console.error("Create Error:", error);
//             setErrors(error.errors || {}); // Set errors from API response
//             toast.error(`Failed to create Follow: ${error.message || "An error occurred"}`);
//           });
//       };

//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Follow" : "Add Follow"}
//               </h4>
//             </div>
//             <div className="card-body">
//               {/* {createError && <p className="text-danger">{createError}</p>} */}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   {/* name */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="enquiry">enquiry:</label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         className="form-control"
//                         placeholder="Enter name"
//                         onChange={(e) =>
//                           setFormData({ ...formData, name: e.target.value })
//                         }
//                         required
//                       />
//                       {errors.name && <p>{errors.name}</p>}
//                     </div>
//                     {/* <select
//                         id="enquiry"
//                         name="enquiry"
//                         value={formData.enquiry}
//                         // onChange={handleInputChange}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             enquiry: e.target.value,
//                           })
//                         }
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select customer name</option>

//                         {enquiries.length > 0 ? (
//                           enquiries.map((enquiry) => (
//                             <option key={enquiry.id} value={enquiry.id}>
//                               {enquiry.name}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="">No enquiries available</option>
//                         )}
//                       </select> */}
//                   </div>
//                   {/* </div> */}

//                   {/* Name Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="followup_by">follow by:</label>
//                       <select
//                         id="follow_by"
//                         name="follow_by"
//                         value={formData.follow_by}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             follow_by: e.target.value,
//                           })
//                         }
//                         className="form-control"
//                         required
//                       >
//                         <option value="">Select an Option</option>
//                         <option value="call">call</option>
//                         <option value="whatsapp">whatsapp</option>
//                         <option value="linkedin">LinkedIn</option>
//                         <option value="viber">viber</option>
//                         <option value="email">email</option>
//                         <option value="meetup">meetup</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row">
//                     {/* due_dateField */}
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label htmlFor="due_date">due_date:</label>
//                         <input
//                           type="date"
//                           id="due_date"
//                           name="due_date"
//                           value={formData.due_date}
//                           className="form-control"
//                           placeholder="Enter due_date"
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               due_date: e.target.value,
//                             })
//                           }
//                           required
//                         />
//                         {errors.due_date && <p>{errors.due_date}</p>}
//                       </div>
//                     </div>

//                     {/* <div className="row"> */}
//                     {/* Phone Field */}
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label htmlFor="remark">remark:</label>
//                         <textarea
//                           type="text"
//                           id="remark"
//                           name="remark"
//                           value={formData.remark}
//                           className="form-control"
//                           placeholder="Enter remark"
//                           onChange={(e) =>
//                             setFormData({ ...formData, remark: e.target.value })
//                           }
//                           required
//                         />
//                         {errors.remark && <p>{errors.remark}</p>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   {/* Organization Name Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes :</label>
//                       <textarea
//                         type="text"
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes "
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             notes: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       {errors.notes && <p>{errors.notes}</p>}
//                     </div>
//                   </div>

//                   {/* Organization Detail Field */}
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="created">follow up date</label>
//                       <input
//                         type="date"
//                         id="created"
//                         name="created"
//                         value={formData.created}
//                         className="form-control"
//                         placeholder="Enter created"
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             created: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       {errors.created && <p>{errors.created}</p>}
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

// export default FollowForm;
