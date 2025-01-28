import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMeetingUpdate, fetchMeetingUpdate } from "../../redux/slice/crm/meetingUpdateSlice";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const MeetingUpdateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    conclusion: "",
    followup_by: "",
    followup_due_date: "",
    remark: "",
  });
 const { enquiryId } = useParams(); // Fetch enquiryId from the URL parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meetingupdates = useSelector((state) => state.meetingupdates.list || []);

  useEffect(() => {
    dispatch(fetchMeetingUpdate()); // Ensure meetingupdates are fetched on component mount
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.title.trim() === "") {
    //   toast.error("Title is required.");
    //   return;
    // }
 // Make sure formData is not undefined and contains the required fields
 if (!formData.title || !formData.conclusion || !formData.followup_by || !formData.status) {
  toast.error("Please fill out all required fields.");
  return;
}
    const existingMeetingUpdate = meetingupdates.some(
      (dept) => dept.title && dept.title.toLowerCase() === formData.title.toLowerCase()
    );

    if (existingMeetingUpdate) {
      toast.error("Meeting update with this title already exists.");
      return;
    }

    try {
      console.log("Form data being submitted:", formData);

      const result = await dispatch(createMeetingUpdate(formData)).unwrap();
      console.log("Meeting Update Created:", result);
      toast.success("Meeting update created successfully!");
      setFormData({
        title: "",
        conclusion: "",
        followup_by: "",
        followup_due_date: "",
        remark: "",
        status: "", // Reset status as well
      });
    } catch (error) {
      // Improved error handling
      console.error("Error occurred during meeting update creation:", error);

      // Check if error has a response from the server
      if (error?.response) {
        console.error("Server Error:", error.response);
        toast.error(`Failed to create meeting update: ${error.response.data.message || error.response.data}`);
      } else if (error?.request) {
        // The request was made but no response was received
        console.error("No response from server:", error.request);
        toast.error("Failed to create meeting update: No response from the server.");
      } else {
        // Something else went wrong
        console.error("Unknown Error:", error.message);
        toast.error(`Failed to create meeting update: ${error.message}`);
      }
    }
  };



  return (
    <div className="content-wrapper">
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Meeting Update</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    className="form-control"
                    placeholder="Enter update title"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="conclusion">Meeting Conclusion:</label>
                  <TextField
                    type="text"
                    id="conclusion"
                    name="conclusion"
                    value={formData.conclusion}
                    className="form-control"
                    placeholder="Enter conclusion name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="followup_by">Followup By:</label>
                  <select
                    id="followup_by"
                    name="followup_by"
                    value={formData.followup_by}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="text">Text</option>
                    <option value="call">Call</option>
                    <option value="physical meeting">Physical Meeting</option>
                    <option value="online meeting">Online Meeting</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="followup_due_date">Followup Due Date:</label>
                  <input
                    type="date"
                    id="followup_due_date"
                    name="followup_due_date"
                    value={formData.followup_due_date}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="remark">Remark:</label>
                  <TextField
                    type="text"
                    id="remark"
                    name="remark"
                    value={formData.remark}
                    className="form-control"
                    placeholder="Add any remarks"
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* status */}
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                    </select>
                  </div>

                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>


                <button
                className="btn btn-secondary"
                onClick={() => navigate(`/dashboard/crm/enquiry/detail/${enquiryId}/`)}
              >
                Back
              </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingUpdateForm;

// ###first form old form
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createMeetingUpdate,
//   fetchMeetingUpdate,
// } from "../../redux/slice/crm//meetingUpdateSlice";
// import { TextField } from "@mui/material";

// const MeetingUpdateForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     conclusion: "",
//     followup_by: "",
//     followup_due_date: "",
//     remark: "",
//     // status:"",
//     // status:"2nd Meeting need","3rd Meeting need","4th Meeting Need","5th meeting need","Converted to Work","Mark as Lost"
//   });
//   const dispatch = useDispatch();
  // const navigate = useNavigate();
//   // const createStatus = useSelector(
//   //   (state) => state.meetingupdates.createStatus
//   // );
//   // const createError = useSelector((state) => state.meetingupdates.createError);
//   const meetingupdates = useSelector(
//     (state) => state.meetingupdates.list || []
//   );

//   useEffect(() => {
//     dispatch(fetchMeetingUpdate()); // Ensure meetingupdates are fetched on component mount
//   }, [dispatch]);



//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.title.trim() === "") return; // Prevent empty name submission

//     // Check if meetingupdate name already exists
//     const existingMeetingUpdate = meetingupdates.some(
//       (dept) =>
//         dept.title && dept.title.toLowerCase() === formData.title.toLowerCase()
//     );

//     if (existingMeetingUpdate) {
//       toast.error("meeting update with this name already exists.");
//       return;
//     }

//     dispatch(createMeetingUpdate(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           title: "",
//           conclusion: "",
//           followup_by: "",
//           followup_due_date: "",
//           remark: "",
//         }); // Clear the form after successful creation
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Meeting Update</h4>
//             </div>
//             <div className="card-body">
//               {/* {createError && <p className="text-danger">{createError}</p>} */}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="title">Title:</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     className="form-control"
//                     placeholder="Enter update title "
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* conclusion */}

//                 <div className="form-group">
//                   <label htmlFor="conclusion">Meeting conclusion:</label>
//                   <TextField
//                     type="text"
//                     id="conclusion"
//                     name="conclusion"
//                     value={formData.conclusion}
//                     className="form-control"
//                     placeholder="Enter conclusion name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* folowup by */}
//                 <div className="form-group">
//                         <label htmlFor="followup_by">Followup By:</label>
//                         <select
//                           id="followup_by"
//                           name="followup_by"
//                           value={formData.followup_by}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               followup_by: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select an Option</option>
//                           <option value="whatsapp">whatsapp</option>
//                           <option value="text">text</option>
//                           <option value="call">call</option>
//                           <option value="physical meeting">physical meeting</option>
//                           <option value="online meeting">online meeting</option>
//                           <option value="email">email</option>

//                         </select>
//                       </div>

//                 {/* date followup  */}
//                 <div className="form-group">
//                   <label htmlFor="name">Followup Due Date:</label>
//                   <input
//                     type="date"
//                     id="followup_due_date"
//                     name="followup_due_date"
//                     value={formData.followup_due_date}
//                     className="form-control"
//                     placeholder="2024 sep 14 ..... "
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* remark */}
//                 <div className="form-group">
//                   <label htmlFor="remark">Remark:</label>
//                   <TextField
//                     type="text"
//                     id="remark"
//                     name="remark"
//                     value={formData.remark}
//                     className="form-control"
//                     placeholder="will held next meeting --- "
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

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

// export default MeetingUpdateForm;
