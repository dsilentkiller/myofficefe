import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEvent, fetchEvent } from "../../redux/slice/eventSlice";

const EventForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
    email: "",
    notes: "",
    is_canceled: false,
  });

  // Toggle state for showing/hiding sections (e.g., Notes section)
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.events.createStatus);
  const createError = useSelector((state) => state.events.createError);
  const events = useSelector((state) => state.events.list || []);
  const attendeesList = useSelector((state) => state.attendees.list || []);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Event created successfully!");
      setFormData({
        title: "",
        start: "",
        end: "",
        attendees: [],
        email: "",
        notes: "",
        is_canceled: false,
      });
      navigate("/dashboard/crm/event");
    }
  }, [createStatus, navigate]);

  useEffect(() => {
    if (createStatus === "failed") {
      toast.error(`Error: ${createError.message || "An error occurred"}`);
    }
  }, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAttendeeChange = (attendeeId) => {
    setFormData((prevData) => {
      const attendees = prevData.attendees.includes(attendeeId)
        ? prevData.attendees.filter((id) => id !== attendeeId)
        : [...prevData.attendees, attendeeId];
      return { ...prevData, attendees };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingEvent = events.some(
      (event) =>
        event.title &&
        event.title.toLowerCase() === formData.title.toLowerCase()
    );

    if (existingEvent) {
      toast.error("Event with this name already exists.");
      return;
    }

    dispatch(createEvent(formData))
      .unwrap()
      .then(() => {
        setFormData({
          title: "",
          start: "",
          end: "",
          attendees: [],
          email: "",
          notes: "",
          is_canceled: false,
        });
        navigate("/dashboard/crm/event");
      })
      .catch((error) => {
        console.error("Create Error:", error.response);
      });
  };

  const toggleNotes = () => {
    setIsNotesOpen((prev) => !prev);
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Event</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                {/* Existing Fields */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Event Name:</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        className="form-control"
                        placeholder="Enter event name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.title && <p>{errors.title}</p>}
                  </div>
                  {/* Add the rest of the form fields here... */}
                </div>

                {/* Notes section with toggle */}
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="button"
                      onClick={toggleNotes}
                      className="btn btn-secondary"
                    >
                      {isNotesOpen ? "Hide Notes" : "Show Notes"}
                    </button>
                    {isNotesOpen && (
                      <div className="form-group mt-3">
                        <label htmlFor="notes">Notes:</label>
                        <input
                          type="text"
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          className="form-control"
                          placeholder="Enter notes"
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;

//fourth
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createEvent, fetchEvent } from "../../redux/slice/eventSlice";

// const EventForm = () => {
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [], // Ensure attendees is initialized
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.events.createStatus);
//   const createError = useSelector((state) => state.events.createError);
//   const events = useSelector((state) => state.events.list || []);
//   const attendeesList = useSelector((state) => state.attendees.list || []); // Ensure attendeesList is defined

//   useEffect(() => {
//     dispatch(fetchEvent());
//   }, [dispatch]);
//   const ToggleComponent = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggle = () => {
//         setIsOpen(prev => !prev); // Make sure setIsOpen is properly defined
//     };

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Event created successfully!");
//       setFormData({
//         title: "",
//         start: "",
//         end: "",
//         attendees: [],
//         email: "",
//         notes: "",
//         is_canceled: false,
//       });
//       navigate("/dashboard/crm/event");
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

//   const handleAttendeeChange = (attendeeId) => {
//     setFormData((prevData) => {
//       const attendees = prevData.attendees.includes(attendeeId)
//         ? prevData.attendees.filter((id) => id !== attendeeId)
//         : [...prevData.attendees, attendeeId];
//       return { ...prevData, attendees };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const existingEvent = events.some(
//       (event) =>
//         event.title &&
//         event.title.toLowerCase() === formData.title.toLowerCase()
//     );

//     if (existingEvent) {
//       toast.error("Event with this name already exists.");
//       return;
//     }

//     dispatch(createEvent(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           title: "",
//           start: "",
//           end: "",
//           attendees: [],
//           email: "",
//           notes: "",
//           is_canceled: false,
//         });
//         navigate("/dashboard/crm/event");
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
//               <h4 className="btn btn-primary">Add Event</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="title">Event Name:</label>
//                       <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={formData.title}
//                         className="form-control"
//                         placeholder="Enter event name"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     {errors.title && <p>{errors.title}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="start">Start:</label>
//                       <input
//                         type="datetime-local" // Use datetime-local for proper date input
//                         id="start"
//                         name="start"
//                         value={formData.start}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     {errors.start && <p>{errors.start}</p>}
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="end">End:</label>
//                       <input
//                         type="datetime-local"
//                         id="end"
//                         name="end"
//                         value={formData.end}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     {errors.end && <p>{errors.end}</p>}
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-12">
//                     <div className="form-group">
//                       <label htmlFor="attendees">Select Attendees:</label>
//                       <select
//                         multiple
//                         className="form-control"
//                         onChange={(e) => handleAttendeeChange(e.target.value)}
//                       >
//                         {attendeesList.map((attendee) => (
//                           <option key={attendee.id} value={attendee.id}>
//                             {attendee.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     {formData.attendees.length > 0 && (
//                       <div className="mt-3">
//                         <h5>Selected Attendees:</h5>
//                         <ul>
//                           {formData.attendees.map((attendeeId) => {
//                             const attendee = attendeesList.find(
//                               (a) => a.id === attendeeId
//                             );
//                             return attendee ? (
//                               <li key={attendeeId}>{attendee.name}</li>
//                             ) : null;
//                           })}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="row">
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
//                       />
//                     </div>
//                     {errors.email && <p>{errors.email}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <input
//                         type="text"
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
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

// export default EventForm;

//third
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createEvent, fetchEvent } from "../../redux/slice/eventSlice";
// import Select from "react-select"; // Import the react-select library

// const EventForm = () => {
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     title: "",
//     start: "",
//     end: "",
//     email: "",
//     notes: "",
//     attendees: [], // Add attendees array to formData
//     is_canceled: false,
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.events.createStatus);
//   const createError = useSelector((state) => state.events.createError);
//   const attendeesList = useSelector((state) => state.attendees.list || []); // Assuming attendees are in a Redux slice
//   const events = useSelector((state) => state.events.list || []);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen((prev) => !prev);
//   };
//   useEffect(() => {
//     dispatch(fetchEvent());
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Event created successfully!");
//       setFormData({
//         title: "",
//         start: "",
//         end: "",
//         email: "",
//         notes: "",
//         attendees: [], // Reset attendees after success
//       });
//       navigate("/dashboard/crm/event");
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

//   const handleAttendeeChange = (selectedOptions) => {
//     const attendees = selectedOptions.map((option) => option.value);
//     setFormData({ ...formData, attendees });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const existingEvent = events.some(
//       (event) =>
//         event.title &&
//         event.title.toLowerCase() === formData.title.toLowerCase()
//     );

//     if (existingEvent) {
//       toast.error("Event with this name already exists.");
//       return;
//     }

//     dispatch(createEvent(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           title: "",
//           start: "",
//           end: "",
//           email: "",
//           notes: "",
//           attendees: [],
//         });
//         navigate("/dashboard/crm/event");
//       })
//       .catch((error) => {
//         console.error("Create Error:", error.response);
//       });
//   };

//   // Convert attendeesList for react-select
//   const options = attendeesList.map((attendee) => ({
//     value: attendee.id, // Use the attendee ID
//     label: attendee.name, // Use the attendee name
//   }));

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Event</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="title">Event Name:</label>
//                       <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={formData.title}
//                         className="form-control"
//                         placeholder="Enter event name"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.title && <p>{errors.title}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="start">Start:</label>
//                       <input
//                         type="datetime-local" // Change to datetime-local for better input
//                         id="start"
//                         name="start"
//                         value={formData.start}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.start && <p>{errors.start}</p>}
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="end">End:</label>
//                       <input
//                         type="datetime-local" // Change to datetime-local for better input
//                         id="end"
//                         name="end"
//                         value={formData.end}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.end && <p>{errors.end}</p>}
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="attendees">Attendees:</label>
//                       <Select
//                         id="attendees"
//                         isMulti
//                         options={options}
//                         onChange={handleAttendeeChange}
//                         className="basic-multi-select"
//                         classNamePrefix="select"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="email">Email</label>
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
//                     {errors.email && <p>{errors.email}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <input
//                         type="text"
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.notes && <p>{errors.notes}</p>}
//                 </div>
//                 {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               </form>

//               {/* Display selected attendees */}
//               {formData.attendees.length > 0 && (
//                 <div className="mt-3">
//                   <h5>Selected Attendees:</h5>
//                   <ul>
//                     {formData.attendees.map((attendeeId) => {
//                       const attendee = attendeesList.find(
//                         (a) => a.id === attendeeId
//                       );
//                       return attendee ? (
//                         <li key={attendeeId}>{attendee.name}</li>
//                       ) : null;
//                     })}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

//second
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createEvent, fetchEvent } from "../../redux/slice/eventSlice";
// import "react-phone-input-2/lib/style.css";

// const EventForm = () => {
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     title: "",
//     start: "",
//     end: "",
//     email: "",
//     notes: "",
//     attendees: [], // New state for attendees
//     is_canceled: false,
//   });
//   const [attendeesList, setAttendeesList] = useState([]); // List of all attendees
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.events.createStatus);
//   const createError = useSelector((state) => state.events.createError);
//   const events = useSelector((state) => state.events.list || []);

//   useEffect(() => {
//     dispatch(fetchEvent());
//     // Assume fetchAttendees fetches the list of attendees
//     // dispatch(fetchAttendees()).then(data => setAttendeesList(data));
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Event created successfully!");
//       setFormData({
//         title: "",
//         start: "",
//         end: "",
//         email: "",
//         notes: "",
//         attendees: [], // Reset attendees on successful submission
//       });
//       navigate("/dashboard/crm/event");
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

//   const handleAttendeeChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => {
//       const attendees = checked
//         ? [...prev.attendees, value]
//         : prev.attendees.filter((attendee) => attendee !== value);
//       return { ...prev, attendees };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const existingEvent = events.some(
//       (event) =>
//         event.title &&
//         event.title.toLowerCase() === formData.title.toLowerCase()
//     );

//     if (existingEvent) {
//       toast.error("Event with this name already exists.");
//       return;
//     }

//     dispatch(createEvent(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           title: "",
//           start: "",
//           end: "",
//           email: "",
//           notes: "",
//           attendees: [], // Reset attendees after submission
//         });
//         navigate("/dashboard/crm/event");
//       })
//       .catch((error) => {
//         console.error("Create Error:", error.response);
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Event</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="title">Event Name:</label>
//                       <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={formData.title}
//                         className="form-control"
//                         placeholder="Enter event name"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.title && <p>{errors.title}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="start">Start:</label>
//                       <input
//                         type="datetime-local" // Changed type to datetime-local
//                         id="start"
//                         name="start"
//                         value={formData.start}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.start && <p>{errors.start}</p>}
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="end">End:</label>
//                       <input
//                         type="datetime-local" // Added End date input
//                         id="end"
//                         name="end"
//                         value={formData.end}
//                         className="form-control"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.end && <p>{errors.end}</p>}
//                   </div>
//                 </div>

//                 <div className="row">
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
//                     {errors.email && <p>{errors.email}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <input
//                         type="text"
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.notes && <p>{errors.notes}</p>}
//                 </div>

//                 {/* Attendee Selection */}
//                 <div className="row">
//                   <div className="col-md-12">
//                     <label htmlFor="attendees">Select Attendees:</label>
//                     <div>
//                       {attendeesList.map((attendee) => (
//                         <div key={attendee.id}>
//                           <label>
//                             <input
//                               type="checkbox"
//                               value={attendee.name}
//                               onChange={handleAttendeeChange}
//                               checked={formData.attendees.includes(
//                                 attendee.name
//                               )}
//                             />
//                             {attendee.name}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   {errors.non_field_errors && (
//                     <p>{errors.non_field_errors[0]}</p>
//                   )}
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               </form>

//               {/* Display Selected Attendees */}
//               <div className="selected-attendees">
//                 <h5>Selected Attendees:</h5>
//                 <ul>
//                   {formData.attendees.map((attendee, index) => (
//                     <li key={index}>{attendee}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

//1old
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createEvent, fetchEvent } from "../../redux/slice/eventSlice";
// // import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const EventForm = () => {
//   //   const [phoneNumber, setPhoneNumber] = useState("");
//   //   const [phoneValid, setPhoneValid] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     title: "",
//     start: "",
//     end: "",
//     events: "",
//     email: "",
//     notes: "",
//     is_canceled: false,
//     // created: "",
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.events.createStatus);
//   const createError = useSelector((state) => state.events.createError);
//   const events = useSelector((state) => state.events.list || []);

//   useEffect(() => {
//     dispatch(fetchEvent());
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("event created successfully!");
//       setFormData({
//         title: "",
//         start: "",
//         // whatsapp_no: "",
//         events: "",
//         email: "",
//         notes: "",
//         // created: "",
//       });
//       navigate("/dashboard/crm/event");
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

//   //   const validatePhoneNumber = (value) => {
//   //     const phoneLength = value.replace(/\D/g, "").length;
//   //     if (phoneLength >= 10 && phoneLength <= 15) {
//   //       setPhoneValid(true);
//   //     } else {
//   //       setPhoneValid(false);
//   //     }
//   //     setPhoneNumber(value);
//   //   };

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
//     const existingEvent = events.some(
//       (event) =>
//         event.title &&
//         event.title.toLowerCase() === formData.title.toLowerCase()
//     );

//     if (existingEvent) {
//       toast.error("event with this name already exists.");
//       return;
//     }

//     dispatch(createEvent(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           title: "",
//           start: "",
//           // whatsapp_no: "",
//           events: "",
//           email: "",
//           notes: "",
//           // created: "",
//         });
//         navigate("/dashboard/crm/event");
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
//               <h4 className="btn btn-primary">Add Event</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="title">Event Name:</label>
//                       <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={formData.title}
//                         className="form-control"
//                         placeholder="Enter event name"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.title && <p>{errors.title}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="start">start:</label>
//                       <input
//                         type="start"
//                         id="start"
//                         name="start"
//                         value={formData.start}
//                         className="form-control"
//                         placeholder="Enter start"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.start && <p>{errors.start}</p>}
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
//                       <label htmlFor="events">Phone:</label>
//                       <input
//                         type="date"
//                         id="date"
//                         name="start"
//                         value={formData.email}
//                         className="form-control"
//                         placeholder="Enter organization name"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     {errors.email && <p>{errors.email}</p>}
//                   </div>
//                   {errors.phone && <p>{errors.phone}</p>}
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="email">Email</label>
//                       <input
//                         type="text"
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
//                     {errors.email && <p>{errors.email}</p>}
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="notes">Notes:</label>
//                       <input
//                         type="text"
//                         id="notes"
//                         name="notes"
//                         value={formData.notes}
//                         className="form-control"
//                         placeholder="Enter notes"
//                         onChange={handleChange}
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   {errors.notes && <p>{errors.notes}</p>}
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

// export default EventForm;
