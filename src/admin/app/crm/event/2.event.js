// 4 TH TRY
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  fetchEvent,
  updateEvent,
  removeEvent,
} from "../../../redux/slice/admin/crm/eventSlice";
import { useNavigate } from "react-router-dom"; // For navigation
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com"; // Import EmailJS if not already installed

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
    email: "",
    notes: "",
    is_canceled: false,
  });

  const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
  const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events); // Fetch events from Redux

  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/attendees/"); // Replace with your actual API endpoint
        const data = await response.json();
        console.log("Fetched attendees data:", data); // Log the fetched data

        // Adjust based on the actual structure of your API response
        if (Array.isArray(data)) {
          setAttendees(data);
        } else if (data.results && Array.isArray(data.results)) {
          setAttendees(data.results);
        } else {
          console.error("Unexpected data format for attendees:", data);
          setAttendees([]); // Default to empty array to prevent errors
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setAttendees([]); // Default to empty array on error
      }
    };

    fetchAttendee();
  }, [dispatch]);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalOpen(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEventObject = {
      id: Date.now(), // For unique identification
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
      email: newEvent.email,
      notes: newEvent.notes,
    };

    // Dispatch the action to add event
    dispatch(createEvent(newEventObject));

    toast.success("Event created successfully!");
    sendEmail(newEventObject); // Send email after event creation

    setModalOpen(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      attendees: [],
      email: "",
      notes: "",
      is_canceled: false,
    });
    setSelectedAttendees([]); // Reset selected attendees
  };

  // Function to send email using EmailJS
  const sendEmail = (eventDetails) => {
    const emailParams = {
      title: eventDetails.title,
      email: eventDetails.email,
      attendees: eventDetails.attendees.join(", "),
      start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
      end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
      notes: eventDetails.notes,
    };
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
      .then((result) => {
        console.log("Email sent successfully:", result.text);
      })
      .catch((error) => {
        console.log("Email failed:", error.text);
      });
  };

  const handleAttendeeSelect = (attendee) => {
    if (selectedAttendees.includes(attendee)) {
      setSelectedAttendees(
        selectedAttendees.filter((a) => a.id !== attendee.id)
      );
    } else {
      setSelectedAttendees([...selectedAttendees, attendee]);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Event Calendar</h1>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-calendar"></i> Calendar
                  </h3>
                </div>
                <div className="card-body">
                  <ToastContainer />
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    style={{ height: 500 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="modal fade show"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Event</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEventSubmit} className="form-horizontal">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Event Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter event title"
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Start Date and Time
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={moment(newEvent.start).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            start: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <label className="col-sm-2 col-form-label">
                      End Date and Time
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            end: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* select attendee */}
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Select Attendee:
                    </label>
                    <div className="col-sm-10">
                      <div className="form-row">
                        {attendees.map((attendee) => (
                          <div className="col-md-4" key={attendee.id}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={attendee.id}
                                checked={selectedAttendees.includes(attendee)}
                                onChange={() => handleAttendeeSelect(attendee)}
                              />
                              <label className="form-check-label">
                                {attendee.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={newEvent.email}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Notes</label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        placeholder="Enter notes"
                        value={newEvent.notes}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            notes: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSystem;

// 3 rd try with vertical selected
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEvent,
//   fetchEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });

//   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   useEffect(() => {
//     const fetchAttendee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log("Fetched attendees data:", data); // Log the fetched data

//         // Adjust based on the actual structure of your API response
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else if (data.results && Array.isArray(data.results)) {
//           setAttendees(data.results);
//         } else {
//           console.error("Unexpected data format for attendees:", data);
//           setAttendees([]); // Default to empty array to prevent errors
//         }
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//         setAttendees([]); // Default to empty array on error
//       }
//     };

//     fetchAttendee();
//   }, [dispatch]);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     // Dispatch the action to add event
//     dispatch(createEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//     setSelectedAttendees([]); // Reset selected attendees
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees.join(", "),
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   const handleAttendeeSelect = (event) => {
//     const selectedAttendeeId = event.target.value;
//     const attendee = attendees.find((a) => a.id === selectedAttendeeId);

//     if (selectedAttendees.includes(attendee)) {
//       setSelectedAttendees(
//         selectedAttendees.filter((a) => a.id !== attendee.id)
//       );
//     } else {
//       setSelectedAttendees([...selectedAttendees, attendee]);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit}>
//                   <div className="form-group">
//                     <label>Event Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           title: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label>Start Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>End Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   {/* select attendee */}
//                   <div className="form-group col-md-6">
//                     <label htmlFor="attendee-select">Select Attendee:</label>
//                     <select
//                       id="attendee-select"
//                       onChange={handleAttendeeSelect}
//                       multiple // Add multiple attribute for multi-select
//                     >
//                       {attendees.map((attendee) => (
//                         <option key={attendee.id} value={attendee.id}>
//                           {attendee.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           email: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       placeholder="Enter notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           notes: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

// //form with backend selection try

// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   // // Fetch attendees from an API or from Redux store if you have attendee data there
// //   // useEffect(() => {
// //   //   // Example of fetching attendees
// //   //   const fetchAttendees = async () => {
// //   //     // Fetch from API or use Redux store selector if attendee data is already available
// //   //     const response = await fetch("http://127.0.0.1:8000/api/attendee/"); // Replace with your API endpoint
// //   //     const data = await response.json();
// //   //     setAttendees(data); // Set fetched attendees in the state
// //   //   };

// //   //   fetchAttendees();
// //   // }, []);

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (attendee) => {
// //     // Toggle selection of attendees
// //     if (selectedAttendee.includes(attendee)) {
// //       setSelectedAttendee(
// //         selectedAttendee.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendee([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   {/* select attendee */}
// //                   <div className="form-group col-md-6">
// //                     <label htmlFor="attendee-select">Select Attendee:</label>
// //                     <select
// //                       id="attendee-select"
// //                       value={selectedAttendee}
// //                       onChange={handleChange}
// //                     >
// //                       <option value="">--Select a Attendee--</option>
// //                       {attendees.map((attendee) => (
// //                         <option key={attendee.id} value={attendee.id}>
// //                           {attendee.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <p>Selected Country ID: {selectedAttendee}</p>
// //                   </div>

// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <div className="modal-footer">
// //                     <button type="submit" className="btn btn-primary">
// //                       Save Event
// //                     </button>
// //                     <button
// //                       type="button"
// //                       className="btn btn-secondary"
// //                       onClick={() => setModalOpen(false)}
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //form with attende frontend selection

// // // src/components/EventSystem.js
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   addEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import Select from "react-select";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });
// //   const attendeesOptions = [
// //     { value: "John Doe", label: "John Doe" },
// //     { value: "Jane Smith", label: "Jane Smith" },
// //     { value: "Alice Brown", label: "Alice Brown" },
// //   ]; // Example attendees, modify as per your options

// //   const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: newEvent.attendees.map((attendee) => attendee.label),
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(addEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees,
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   // Handle event click to view details
// //   const handleEventClick = (event) => {
// //     setSelectedEvent(event); // Set selected event for viewing details
// //   };

// //   // Modal close handler
// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     onSelectEvent={handleEventClick} // Click event to view details
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">
// //                   {selectedEvent ? "Update Event" : "Create New Event"}
// //                 </h5>
// //                 <button type="button" className="close" onClick={closeModal}>
// //                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit}>
//                   <div className="form-group">
//                     <label>Event Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           title: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label>Start Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>End Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>Attendees</label>
//                     <Select
//                       isMulti
//                       options={attendeesOptions}
//                       value={newEvent.attendees}
//                       onChange={(selectedOptions) =>
//                         setNewEvent({
//                           ...newEvent,
//                           attendees: selectedOptions,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           email: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           notes: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       Save Event
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={closeModal}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Event Details</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setSelectedEvent(null)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <h3>{selectedEvent.title}</h3>
//                 <p>
//                   <strong>Start:</strong>{" "}
//                   {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
//                 </p>
//                 <p>
//                   <strong>End:</strong>{" "}
//                   {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
//                 </p>
//                 <p>
//                   <strong>Attendees:</strong>{" "}
//                   {selectedEvent.attendees.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {selectedEvent.email}
//                 </p>
//                 <p>
//                   <strong>Notes:</strong> {selectedEvent.notes}
//                 </p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setSelectedEvent(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

// #......................5 try

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEvent,
//   fetchEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     // attendee: "", // Add attendee property
//     is_canceled: false,
//   });

//   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   useEffect(() => {
//     const fetchAttendee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log("Fetched attendees data:", data); // Log the fetched data

//         // Adjust based on the actual structure of your API response
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else if (data.results && Array.isArray(data.results)) {
//           setAttendees(data.results);
//         } else {
//           console.error("Unexpected data format for attendees:", data);
//           setAttendees([]); // Default to empty array to prevent errors
//         }
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//         setAttendees([]); // Default to empty array on error
//       }
//     };

//     fetchAttendee();
//   }, [dispatch]);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
//       email: newEvent.email,
//       notes: newEvent.notes,
//       attendee: newEvent.attendee, // Include the selected attendee
//     };

//     // Dispatch the action to add event
//     dispatch(createEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       attendee: "", // Reset attendee
//       is_canceled: false,
//     });
//     setSelectedAttendees([]); // Reset selected attendees
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees.join(", "),
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//       attendee: eventDetails.attendee, // Include attendee in email
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   const handleAttendeeSelect = (attendee) => {
//     if (selectedAttendees.includes(attendee)) {
//       setSelectedAttendees(
//         selectedAttendees.filter((a) => a.id !== attendee.id)
//       );
//     } else {
//       setSelectedAttendees([...selectedAttendees, attendee]);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit} className="form-horizontal">
//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Event Title
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter event title"
//                         value={newEvent.title}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             title: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Start Date and Time
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>

//                     <label className="col-sm-2 col-form-label">
//                       End Date and Time
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Select Attendee */}
//                   {/* <div className="form-group row">
//                     <label
//                       className="col-sm-2 col-form-label"
//                       htmlFor="eventSelect"
//                     >
//                       Select Attendee:
//                     </label>
//                     <div className="col-sm-10">
//                       <div className="form-control">
//                         {attendees.map((attendee) => (
//                           <div className="col-md-4" key={attendee.id}>
//                             <div className="form-check">
//                               <select
//                                 id="selectedAttendees"
//                                 className="form-control"
//                                 type="checkbox"
//                                 // value={newEvent.attendees}
//                                 value={selectedAttendees.includes(attendee)}
//                                 onChange={(e) =>
//                                   setNewEvent({
//                                     ...newEvent,
//                                     attendee: e.target.value,
//                                   })
//                                 }
//                               >
//                                 <option value="">-- Select attendee--</option>

//                                 <option value="ram">ram</option>
//                                 <option value="shyam">shyam</option>
//                                 <option value="hari">hari</option>
//                               </select>
//                               <label className="form-check-label">
//                                 {attendee.name}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div> */}

//                   {/* attendee Selection */}
//                   <div className="form-group row">
//                     <label
//                       className="col-sm-2 col-form-label"
//                       htmlFor="attendeeSelect"
//                     >
//                       Attendee
//                     </label>
//                     <div className="col-sm-10">
//                       <select
//                         id="attendeeSelect"
//                         className="form-control"
//                         value={newEvent.attendees}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             attendee: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="">--Select a attendee--</option>
//                         <option value="ram">ram</option>
//                         <option value="shyam">shyam</option>
//                         <option value="hari">hari</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Email</label>
//                     <div className="col-sm-10">
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         value={newEvent.email}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             email: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Notes</label>
//                     <div className="col-sm-10">
//                       <textarea
//                         className="form-control"
//                         placeholder="Enter notes"
//                         value={newEvent.notes}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             notes: e.target.value,
//                           })
//                         }
//                       ></textarea>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <div className="col-sm-10 offset-sm-2">
//                       <button type="submit" className="btn btn-primary">
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

// //4 TH TRY
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (attendee) => {
// //     if (selectedAttendees.includes(attendee)) {
// //       setSelectedAttendees(
// //         selectedAttendees.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendees([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit} className="form-horizontal">
// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">
// //                       Event Title
// //                     </label>
// //                     <div className="col-sm-10">
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         placeholder="Enter event title"
// //                         value={newEvent.title}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             title: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">
// //                       Start Date and Time
// //                     </label>
// //                     <div className="col-sm-4">
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>

// //                     <label className="col-sm-2 col-form-label">
// //                       End Date and Time
// //                     </label>
// //                     <div className="col-sm-4">
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* select attendee */}
// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">
// //                       Select Attendee:
// //                     </label>
// //                     <div className="col-sm-10">
// //                       <div className="form-row">
// //                         {attendees.map((attendee) => (
// //                           <div className="col-md-4" key={attendee.id}>
// //                             <div className="form-check">
// //                               <input
// //                                 className="form-check-input"
// //                                 type="checkbox"
// //                                 value={attendee.id}
// //                                 checked={selectedAttendees.includes(attendee)}
// //                                 onChange={() => handleAttendeeSelect(attendee)}
// //                               />
// //                               <label className="form-check-label">
// //                                 {attendee.name}
// //                               </label>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">Email</label>
// //                     <div className="col-sm-10">
// //                       <input
// //                         type="email"
// //                         className="form-control"
// //                         placeholder="Enter email"
// //                         value={newEvent.email}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             email: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">Notes</label>
// //                     <div className="col-sm-10">
// //                       <textarea
// //                         className="form-control"
// //                         placeholder="Enter notes"
// //                         value={newEvent.notes}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             notes: e.target.value,
// //                           })
// //                         }
// //                       ></textarea>
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <div className="col-sm-10 offset-sm-2">
// //                       <button type="submit" className="btn btn-primary">
// //                         Submit
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //3 rd try with vertical selected
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (event) => {
// //     const selectedAttendeeId = event.target.value;
// //     const attendee = attendees.find((a) => a.id === selectedAttendeeId);

// //     if (selectedAttendees.includes(attendee)) {
// //       setSelectedAttendees(
// //         selectedAttendees.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendees([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   {/* select attendee */}
// //                   <div className="form-group col-md-6">
// //                     <label htmlFor="attendee-select">Select Attendee:</label>
// //                     <select
// //                       id="attendee-select"
// //                       onChange={handleAttendeeSelect}
// //                       multiple // Add multiple attribute for multi-select
// //                     >
// //                       {attendees.map((attendee) => (
// //                         <option key={attendee.id} value={attendee.id}>
// //                           {attendee.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <button type="submit" className="btn btn-primary">
// //                     Submit
// //                   </button>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //form with backend selection try

// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   // // Fetch attendees from an API or from Redux store if you have attendee data there
// //   // useEffect(() => {
// //   //   // Example of fetching attendees
// //   //   const fetchAttendees = async () => {
// //   //     // Fetch from API or use Redux store selector if attendee data is already available
// //   //     const response = await fetch("http://127.0.0.1:8000/api/attendee/"); // Replace with your API endpoint
// //   //     const data = await response.json();
// //   //     setAttendees(data); // Set fetched attendees in the state
// //   //   };

// //   //   fetchAttendees();
// //   // }, []);

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (attendee) => {
// //     // Toggle selection of attendees
// //     if (selectedAttendee.includes(attendee)) {
// //       setSelectedAttendee(
// //         selectedAttendee.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendee([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   {/* select attendee */}
// //                   <div className="form-group col-md-6">
// //                     <label htmlFor="attendee-select">Select Attendee:</label>
// //                     <select
// //                       id="attendee-select"
// //                       value={selectedAttendee}
// //                       onChange={handleChange}
// //                     >
// //                       <option value="">--Select a Attendee--</option>
// //                       {attendees.map((attendee) => (
// //                         <option key={attendee.id} value={attendee.id}>
// //                           {attendee.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <p>Selected Country ID: {selectedAttendee}</p>
// //                   </div>

// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <div className="modal-footer">
// //                     <button type="submit" className="btn btn-primary">
// //                       Save Event
// //                     </button>
// //                     <button
// //                       type="button"
// //                       className="btn btn-secondary"
// //                       onClick={() => setModalOpen(false)}
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //form with attende frontend selection

// // // src/components/EventSystem.js
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   addEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import Select from "react-select";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });
// //   const attendeesOptions = [
// //     { value: "John Doe", label: "John Doe" },
// //     { value: "Jane Smith", label: "Jane Smith" },
// //     { value: "Alice Brown", label: "Alice Brown" },
// //   ]; // Example attendees, modify as per your options

// //   const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: newEvent.attendees.map((attendee) => attendee.label),
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(addEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees,
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   // Handle event click to view details
// //   const handleEventClick = (event) => {
// //     setSelectedEvent(event); // Set selected event for viewing details
// //   };

// //   // Modal close handler
// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     onSelectEvent={handleEventClick} // Click event to view details
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">
// //                   {selectedEvent ? "Update Event" : "Create New Event"}
// //                 </h5>
// //                 <button type="button" className="close" onClick={closeModal}>
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Attendees</label>
// //                     <Select
// //                       isMulti
// //                       options={attendeesOptions}
// //                       value={newEvent.attendees}
// //                       onChange={(selectedOptions) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           attendees: selectedOptions,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <div className="modal-footer">
// //                     <button type="submit" className="btn btn-primary">
// //                       Save Event
// //                     </button>
// //                     <button
// //                       type="button"
// //                       className="btn btn-secondary"
// //                       onClick={closeModal}
// //                     >
// //                       Close
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Event Details Modal */}
// //       {selectedEvent && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Event Details</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setSelectedEvent(null)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <h3>{selectedEvent.title}</h3>
// //                 <p>
// //                   <strong>Start:</strong>{" "}
// //                   {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
// //                 </p>
// //                 <p>
// //                   <strong>End:</strong>{" "}
// //                   {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
// //                 </p>
// //                 <p>
// //                   <strong>Attendees:</strong>{" "}
// //                   {selectedEvent.attendees.join(", ")}
// //                 </p>
// //                 <p>
// //                   <strong>Email:</strong> {selectedEvent.email}
// //                 </p>
// //                 <p>
// //                   <strong>Notes:</strong> {selectedEvent.notes}
// //                 </p>
// //               </div>
// //               <div className="modal-footer">
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={() => setSelectedEvent(null)}
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;//4 TH TRY
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEvent,
//   fetchEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });

//   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   useEffect(() => {
//     const fetchAttendee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log("Fetched attendees data:", data); // Log the fetched data

//         // Adjust based on the actual structure of your API response
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else if (data.results && Array.isArray(data.results)) {
//           setAttendees(data.results);
//         } else {
//           console.error("Unexpected data format for attendees:", data);
//           setAttendees([]); // Default to empty array to prevent errors
//         }
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//         setAttendees([]); // Default to empty array on error
//       }
//     };

//     fetchAttendee();
//   }, [dispatch]);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     // Dispatch the action to add event
//     dispatch(createEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//     setSelectedAttendees([]); // Reset selected attendees
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees.join(", "),
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   const handleAttendeeSelect = (attendee) => {
//     if (selectedAttendees.includes(attendee)) {
//       setSelectedAttendees(
//         selectedAttendees.filter((a) => a.id !== attendee.id)
//       );
//     } else {
//       setSelectedAttendees([...selectedAttendees, attendee]);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit} className="form-horizontal">
//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Event Title
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter event title"
//                         value={newEvent.title}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             title: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Start Date and Time
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>

//                     <label className="col-sm-2 col-form-label">
//                       End Date and Time
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* select attendee */}
//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Select Attendee:
//                     </label>
//                     <div className="col-sm-10">
//                       <div className="form-row">
//                         {attendees.map((attendee) => (
//                           <div className="col-md-4" key={attendee.id}>
//                             <div className="form-check">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 value={attendee.id}
//                                 checked={selectedAttendees.includes(attendee)}
//                                 onChange={() => handleAttendeeSelect(attendee)}
//                               />
//                               <label className="form-check-label">
//                                 {attendee.name}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Email</label>
//                     <div className="col-sm-10">
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         value={newEvent.email}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             email: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Notes</label>
//                     <div className="col-sm-10">
//                       <textarea
//                         className="form-control"
//                         placeholder="Enter notes"
//                         value={newEvent.notes}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             notes: e.target.value,
//                           })
//                         }
//                       ></textarea>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <div className="col-sm-10 offset-sm-2">
//                       <button type="submit" className="btn btn-primary">
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

//3 rd try with vertical selected
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEvent,
//   fetchEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });

//   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   useEffect(() => {
//     const fetchAttendee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log("Fetched attendees data:", data); // Log the fetched data

//         // Adjust based on the actual structure of your API response
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else if (data.results && Array.isArray(data.results)) {
//           setAttendees(data.results);
//         } else {
//           console.error("Unexpected data format for attendees:", data);
//           setAttendees([]); // Default to empty array to prevent errors
//         }
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//         setAttendees([]); // Default to empty array on error
//       }
//     };

//     fetchAttendee();
//   }, [dispatch]);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     // Dispatch the action to add event
//     dispatch(createEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//     setSelectedAttendees([]); // Reset selected attendees
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees.join(", "),
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   const handleAttendeeSelect = (event) => {
//     const selectedAttendeeId = event.target.value;
//     const attendee = attendees.find((a) => a.id === selectedAttendeeId);

//     if (selectedAttendees.includes(attendee)) {
//       setSelectedAttendees(
//         selectedAttendees.filter((a) => a.id !== attendee.id)
//       );
//     } else {
//       setSelectedAttendees([...selectedAttendees, attendee]);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit}>
//                   <div className="form-group">
//                     <label>Event Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           title: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label>Start Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>End Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   {/* select attendee */}
//                   <div className="form-group col-md-6">
//                     <label htmlFor="attendee-select">Select Attendee:</label>
//                     <select
//                       id="attendee-select"
//                       onChange={handleAttendeeSelect}
//                       multiple // Add multiple attribute for multi-select
//                     >
//                       {attendees.map((attendee) => (
//                         <option key={attendee.id} value={attendee.id}>
//                           {attendee.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           email: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       placeholder="Enter notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           notes: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

//form with backend selection try

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEvent,
//   fetchEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });

//   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   // // Fetch attendees from an API or from Redux store if you have attendee data there
//   // useEffect(() => {
//   //   // Example of fetching attendees
//   //   const fetchAttendees = async () => {
//   //     // Fetch from API or use Redux store selector if attendee data is already available
//   //     const response = await fetch("http://127.0.0.1:8000/api/attendee/"); // Replace with your API endpoint
//   //     const data = await response.json();
//   //     setAttendees(data); // Set fetched attendees in the state
//   //   };

//   //   fetchAttendees();
//   // }, []);

//   useEffect(() => {
//     const fetchAttendee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log("Fetched attendees data:", data); // Log the fetched data

//         // Adjust based on the actual structure of your API response
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else if (data.results && Array.isArray(data.results)) {
//           setAttendees(data.results);
//         } else {
//           console.error("Unexpected data format for attendees:", data);
//           setAttendees([]); // Default to empty array to prevent errors
//         }
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//         setAttendees([]); // Default to empty array on error
//       }
//     };

//     fetchAttendee();
//   }, [dispatch]);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     // Dispatch the action to add event
//     dispatch(createEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//     setSelectedAttendees([]); // Reset selected attendees
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees.join(", "),
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   const handleAttendeeSelect = (attendee) => {
//     // Toggle selection of attendees
//     if (selectedAttendee.includes(attendee)) {
//       setSelectedAttendee(
//         selectedAttendee.filter((a) => a.id !== attendee.id)
//       );
//     } else {
//       setSelectedAttendee([...selectedAttendees, attendee]);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit}>
//                   <div className="form-group">
//                     <label>Event Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           title: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label>Start Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>End Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   {/* select attendee */}
//                   <div className="form-group col-md-6">
//                     <label htmlFor="attendee-select">Select Attendee:</label>
//                     <select
//                       id="attendee-select"
//                       value={selectedAttendee}
//                       onChange={handleChange}
//                     >
//                       <option value="">--Select a Attendee--</option>
//                       {attendees.map((attendee) => (
//                         <option key={attendee.id} value={attendee.id}>
//                           {attendee.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p>Selected Country ID: {selectedAttendee}</p>
//                   </div>

//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           email: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           notes: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       Save Event
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={() => setModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

//form with attende frontend selection

// // src/components/EventSystem.js
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import Select from "react-select";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });
//   const attendeesOptions = [
//     { value: "John Doe", label: "John Doe" },
//     { value: "Jane Smith", label: "Jane Smith" },
//     { value: "Alice Brown", label: "Alice Brown" },
//   ]; // Example attendees, modify as per your options

//   const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: newEvent.attendees.map((attendee) => attendee.label),
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     // Dispatch the action to add event
//     dispatch(addEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setSelectedEvent(null);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees,
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   // Handle event click to view details
//   const handleEventClick = (event) => {
//     setSelectedEvent(event); // Set selected event for viewing details
//   };

//   // Modal close handler
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedEvent(null);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleEventClick} // Click event to view details
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   {selectedEvent ? "Update Event" : "Create New Event"}
//                 </h5>
//                 <button type="button" className="close" onClick={closeModal}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit}>
//                   <div className="form-group">
//                     <label>Event Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           title: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label>Start Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>End Date and Time</label>
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>Attendees</label>
//                     <Select
//                       isMulti
//                       options={attendeesOptions}
//                       value={newEvent.attendees}
//                       onChange={(selectedOptions) =>
//                         setNewEvent({
//                           ...newEvent,
//                           attendees: selectedOptions,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           email: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({
//                           ...newEvent,
//                           notes: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       Save Event
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={closeModal}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Event Details</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setSelectedEvent(null)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <h3>{selectedEvent.title}</h3>
//                 <p>
//                   <strong>Start:</strong>{" "}
//                   {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
//                 </p>
//                 <p>
//                   <strong>End:</strong>{" "}
//                   {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
//                 </p>
//                 <p>
//                   <strong>Attendees:</strong>{" "}
//                   {selectedEvent.attendees.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {selectedEvent.email}
//                 </p>
//                 <p>
//                   <strong>Notes:</strong> {selectedEvent.notes}
//                 </p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setSelectedEvent(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

// #......................5 try

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createEvent,
//   fetchEvent,
//   updateEvent,
//   removeEvent,
// } from "../../../redux/slice/eventSlice";
// import { useNavigate } from "react-router-dom"; // For navigation
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//     // attendee: "", // Add attendee property
//     is_canceled: false,
//   });

//   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events.events); // Fetch events from Redux

//   useEffect(() => {
//     const fetchAttendee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
//         const data = await response.json();
//         console.log("Fetched attendees data:", data); // Log the fetched data

//         // Adjust based on the actual structure of your API response
//         if (Array.isArray(data)) {
//           setAttendees(data);
//         } else if (data.results && Array.isArray(data.results)) {
//           setAttendees(data.results);
//         } else {
//           console.error("Unexpected data format for attendees:", data);
//           setAttendees([]); // Default to empty array to prevent errors
//         }
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//         setAttendees([]); // Default to empty array on error
//       }
//     };

//     fetchAttendee();
//   }, [dispatch]);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       id: Date.now(), // For unique identification
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
//       email: newEvent.email,
//       notes: newEvent.notes,
//       attendee: newEvent.attendee, // Include the selected attendee
//     };

//     // Dispatch the action to add event
//     dispatch(createEvent(newEventObject));

//     toast.success("Event created successfully!");
//     sendEmail(newEventObject); // Send email after event creation

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//       attendee: "", // Reset attendee
//       is_canceled: false,
//     });
//     setSelectedAttendees([]); // Reset selected attendees
//   };

//   // Function to send email using EmailJS
//   const sendEmail = (eventDetails) => {
//     const emailParams = {
//       title: eventDetails.title,
//       email: eventDetails.email,
//       attendees: eventDetails.attendees.join(", "),
//       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
//       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
//       notes: eventDetails.notes,
//       attendee: eventDetails.attendee, // Include attendee in email
//     };
//     emailjs
//       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
//       .then((result) => {
//         console.log("Email sent successfully:", result.text);
//       })
//       .catch((error) => {
//         console.log("Email failed:", error.text);
//       });
//   };

//   const handleAttendeeSelect = (attendee) => {
//     if (selectedAttendees.includes(attendee)) {
//       setSelectedAttendees(
//         selectedAttendees.filter((a) => a.id !== attendee.id)
//       );
//     } else {
//       setSelectedAttendees([...selectedAttendees, attendee]);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <h1>Event Calendar</h1>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Calendar
//                   </h3>
//                 </div>
//                 <div className="card-body">
//                   <ToastContainer />
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEventSubmit} className="form-horizontal">
//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Event Title
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter event title"
//                         value={newEvent.title}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             title: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Start Date and Time
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             start: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>

//                     <label className="col-sm-2 col-form-label">
//                       End Date and Time
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             end: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Select Attendee */}
//                   {/* <div className="form-group row">
//                     <label
//                       className="col-sm-2 col-form-label"
//                       htmlFor="eventSelect"
//                     >
//                       Select Attendee:
//                     </label>
//                     <div className="col-sm-10">
//                       <div className="form-control">
//                         {attendees.map((attendee) => (
//                           <div className="col-md-4" key={attendee.id}>
//                             <div className="form-check">
//                               <select
//                                 id="selectedAttendees"
//                                 className="form-control"
//                                 type="checkbox"
//                                 // value={newEvent.attendees}
//                                 value={selectedAttendees.includes(attendee)}
//                                 onChange={(e) =>
//                                   setNewEvent({
//                                     ...newEvent,
//                                     attendee: e.target.value,
//                                   })
//                                 }
//                               >
//                                 <option value="">-- Select attendee--</option>

//                                 <option value="ram">ram</option>
//                                 <option value="shyam">shyam</option>
//                                 <option value="hari">hari</option>
//                               </select>
//                               <label className="form-check-label">
//                                 {attendee.name}
//                               </label>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div> */}

//                   {/* attendee Selection */}
//                   <div className="form-group row">
//                     <label
//                       className="col-sm-2 col-form-label"
//                       htmlFor="attendeeSelect"
//                     >
//                       Attendee
//                     </label>
//                     <div className="col-sm-10">
//                       <select
//                         id="attendeeSelect"
//                         className="form-control"
//                         value={newEvent.attendees}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             attendee: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="">--Select a attendee--</option>
//                         <option value="ram">ram</option>
//                         <option value="shyam">shyam</option>
//                         <option value="hari">hari</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Email</label>
//                     <div className="col-sm-10">
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         value={newEvent.email}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             email: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Notes</label>
//                     <div className="col-sm-10">
//                       <textarea
//                         className="form-control"
//                         placeholder="Enter notes"
//                         value={newEvent.notes}
//                         onChange={(e) =>
//                           setNewEvent({
//                             ...newEvent,
//                             notes: e.target.value,
//                           })
//                         }
//                       ></textarea>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <div className="col-sm-10 offset-sm-2">
//                       <button type="submit" className="btn btn-primary">
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSystem;

// //4 TH TRY
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (attendee) => {
// //     if (selectedAttendees.includes(attendee)) {
// //       setSelectedAttendees(
// //         selectedAttendees.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendees([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit} className="form-horizontal">
// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">
// //                       Event Title
// //                     </label>
// //                     <div className="col-sm-10">
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         placeholder="Enter event title"
// //                         value={newEvent.title}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             title: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">
// //                       Start Date and Time
// //                     </label>
// //                     <div className="col-sm-4">
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>

// //                     <label className="col-sm-2 col-form-label">
// //                       End Date and Time
// //                     </label>
// //                     <div className="col-sm-4">
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* select attendee */}
// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">
// //                       Select Attendee:
// //                     </label>
// //                     <div className="col-sm-10">
// //                       <div className="form-row">
// //                         {attendees.map((attendee) => (
// //                           <div className="col-md-4" key={attendee.id}>
// //                             <div className="form-check">
// //                               <input
// //                                 className="form-check-input"
// //                                 type="checkbox"
// //                                 value={attendee.id}
// //                                 checked={selectedAttendees.includes(attendee)}
// //                                 onChange={() => handleAttendeeSelect(attendee)}
// //                               />
// //                               <label className="form-check-label">
// //                                 {attendee.name}
// //                               </label>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">Email</label>
// //                     <div className="col-sm-10">
// //                       <input
// //                         type="email"
// //                         className="form-control"
// //                         placeholder="Enter email"
// //                         value={newEvent.email}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             email: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <label className="col-sm-2 col-form-label">Notes</label>
// //                     <div className="col-sm-10">
// //                       <textarea
// //                         className="form-control"
// //                         placeholder="Enter notes"
// //                         value={newEvent.notes}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             notes: e.target.value,
// //                           })
// //                         }
// //                       ></textarea>
// //                     </div>
// //                   </div>

// //                   <div className="form-group row">
// //                     <div className="col-sm-10 offset-sm-2">
// //                       <button type="submit" className="btn btn-primary">
// //                         Submit
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //3 rd try with vertical selected
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (event) => {
// //     const selectedAttendeeId = event.target.value;
// //     const attendee = attendees.find((a) => a.id === selectedAttendeeId);

// //     if (selectedAttendees.includes(attendee)) {
// //       setSelectedAttendees(
// //         selectedAttendees.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendees([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   {/* select attendee */}
// //                   <div className="form-group col-md-6">
// //                     <label htmlFor="attendee-select">Select Attendee:</label>
// //                     <select
// //                       id="attendee-select"
// //                       onChange={handleAttendeeSelect}
// //                       multiple // Add multiple attribute for multi-select
// //                     >
// //                       {attendees.map((attendee) => (
// //                         <option key={attendee.id} value={attendee.id}>
// //                           {attendee.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <button type="submit" className="btn btn-primary">
// //                     Submit
// //                   </button>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //form with backend selection try

// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createEvent,
// //   fetchEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });

// //   const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
// //   const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the table

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   // // Fetch attendees from an API or from Redux store if you have attendee data there
// //   // useEffect(() => {
// //   //   // Example of fetching attendees
// //   //   const fetchAttendees = async () => {
// //   //     // Fetch from API or use Redux store selector if attendee data is already available
// //   //     const response = await fetch("http://127.0.0.1:8000/api/attendee/"); // Replace with your API endpoint
// //   //     const data = await response.json();
// //   //     setAttendees(data); // Set fetched attendees in the state
// //   //   };

// //   //   fetchAttendees();
// //   // }, []);

// //   useEffect(() => {
// //     const fetchAttendee = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
// //         const data = await response.json();
// //         console.log("Fetched attendees data:", data); // Log the fetched data

// //         // Adjust based on the actual structure of your API response
// //         if (Array.isArray(data)) {
// //           setAttendees(data);
// //         } else if (data.results && Array.isArray(data.results)) {
// //           setAttendees(data.results);
// //         } else {
// //           console.error("Unexpected data format for attendees:", data);
// //           setAttendees([]); // Default to empty array to prevent errors
// //         }
// //       } catch (error) {
// //         console.error("Error fetching attendees:", error);
// //         setAttendees([]); // Default to empty array on error
// //       }
// //     };

// //     fetchAttendee();
// //   }, [dispatch]);

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: selectedAttendees.map((attendee) => attendee.name), // Save selected attendees
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(createEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //     setSelectedAttendees([]); // Reset selected attendees
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees.join(", "),
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   const handleAttendeeSelect = (attendee) => {
// //     // Toggle selection of attendees
// //     if (selectedAttendee.includes(attendee)) {
// //       setSelectedAttendee(
// //         selectedAttendee.filter((a) => a.id !== attendee.id)
// //       );
// //     } else {
// //       setSelectedAttendee([...selectedAttendees, attendee]);
// //     }
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Create New Event</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setModalOpen(false)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   {/* select attendee */}
// //                   <div className="form-group col-md-6">
// //                     <label htmlFor="attendee-select">Select Attendee:</label>
// //                     <select
// //                       id="attendee-select"
// //                       value={selectedAttendee}
// //                       onChange={handleChange}
// //                     >
// //                       <option value="">--Select a Attendee--</option>
// //                       {attendees.map((attendee) => (
// //                         <option key={attendee.id} value={attendee.id}>
// //                           {attendee.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <p>Selected Country ID: {selectedAttendee}</p>
// //                   </div>

// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <div className="modal-footer">
// //                     <button type="submit" className="btn btn-primary">
// //                       Save Event
// //                     </button>
// //                     <button
// //                       type="button"
// //                       className="btn btn-secondary"
// //                       onClick={() => setModalOpen(false)}
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;

// //form with attende frontend selection

// // // src/components/EventSystem.js
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   addEvent,
// //   updateEvent,
// //   removeEvent,
// // } from "../../../redux/slice/eventSlice";
// // import { useNavigate } from "react-router-dom"; // For navigation
// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import Select from "react-select";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// // import { ToastContainer, toast } from "react-toastify";
// // import emailjs from "emailjs-com"; // Import EmailJS if not already installed

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //     is_canceled: false,
// //   });
// //   const attendeesOptions = [
// //     { value: "John Doe", label: "John Doe" },
// //     { value: "Jane Smith", label: "Jane Smith" },
// //     { value: "Alice Brown", label: "Alice Brown" },
// //   ]; // Example attendees, modify as per your options

// //   const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event

// //   const dispatch = useDispatch();
// //   const events = useSelector((state) => state.events.events); // Fetch events from Redux

// //   const handleSelectSlot = ({ start, end }) => {
// //     setNewEvent({ ...newEvent, start, end });
// //     setModalOpen(true);
// //   };

// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     const newEventObject = {
// //       id: Date.now(), // For unique identification
// //       title: newEvent.title,
// //       start: new Date(newEvent.start),
// //       end: new Date(newEvent.end),
// //       attendees: newEvent.attendees.map((attendee) => attendee.label),
// //       email: newEvent.email,
// //       notes: newEvent.notes,
// //     };

// //     // Dispatch the action to add event
// //     dispatch(addEvent(newEventObject));

// //     toast.success("Event created successfully!");
// //     sendEmail(newEventObject); // Send email after event creation

// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = (eventDetails) => {
// //     const emailParams = {
// //       title: eventDetails.title,
// //       email: eventDetails.email,
// //       attendees: eventDetails.attendees,
// //       start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
// //       end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
// //       notes: eventDetails.notes,
// //     };
// //     emailjs
// //       .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
// //       .then((result) => {
// //         console.log("Email sent successfully:", result.text);
// //       })
// //       .catch((error) => {
// //         console.log("Email failed:", error.text);
// //       });
// //   };

// //   // Handle event click to view details
// //   const handleEventClick = (event) => {
// //     setSelectedEvent(event); // Set selected event for viewing details
// //   };

// //   // Modal close handler
// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //       is_canceled: false,
// //     });
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <h1>Event Calendar</h1>
// //       </section>

// //       <section className="content">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-md-12">
// //               <div className="card card-primary">
// //                 <div className="card-header">
// //                   <h3 className="card-title">
// //                     <i className="fa fa-calendar"></i> Calendar
// //                   </h3>
// //                 </div>
// //                 <div className="card-body">
// //                   <ToastContainer />
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     titleAccessor="title"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     onSelectEvent={handleEventClick} // Click event to view details
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {modalOpen && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">
// //                   {selectedEvent ? "Update Event" : "Create New Event"}
// //                 </h5>
// //                 <button type="button" className="close" onClick={closeModal}>
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <form onSubmit={handleEventSubmit}>
// //                   <div className="form-group">
// //                     <label>Event Title</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       placeholder="Enter event title"
// //                       value={newEvent.title}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           title: e.target.value,
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-group col-md-6">
// //                       <label>Start Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.start).format(
// //                           "YYYY-MM-DDTHH:mm"
// //                         )}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             start: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-group col-md-6">
// //                       <label>End Date and Time</label>
// //                       <input
// //                         type="datetime-local"
// //                         className="form-control"
// //                         value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                         onChange={(e) =>
// //                           setNewEvent({
// //                             ...newEvent,
// //                             end: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Attendees</label>
// //                     <Select
// //                       isMulti
// //                       options={attendeesOptions}
// //                       value={newEvent.attendees}
// //                       onChange={(selectedOptions) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           attendees: selectedOptions,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Email</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       placeholder="Enter email"
// //                       value={newEvent.email}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Notes</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       placeholder="Enter notes"
// //                       value={newEvent.notes}
// //                       onChange={(e) =>
// //                         setNewEvent({
// //                           ...newEvent,
// //                           notes: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                   <div className="modal-footer">
// //                     <button type="submit" className="btn btn-primary">
// //                       Save Event
// //                     </button>
// //                     <button
// //                       type="button"
// //                       className="btn btn-secondary"
// //                       onClick={closeModal}
// //                     >
// //                       Close
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Event Details Modal */}
// //       {selectedEvent && (
// //         <div
// //           className="modal fade show"
// //           role="dialog"
// //           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //         >
// //           <div className="modal-dialog modal-lg" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Event Details</h5>
// //                 <button
// //                   type="button"
// //                   className="close"
// //                   onClick={() => setSelectedEvent(null)}
// //                 >
// //                   <span>&times;</span>
// //                 </button>
// //               </div>
// //               <div className="modal-body">
// //                 <h3>{selectedEvent.title}</h3>
// //                 <p>
// //                   <strong>Start:</strong>{" "}
// //                   {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
// //                 </p>
// //                 <p>
// //                   <strong>End:</strong>{" "}
// //                   {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
// //                 </p>
// //                 <p>
// //                   <strong>Attendees:</strong>{" "}
// //                   {selectedEvent.attendees.join(", ")}
// //                 </p>
// //                 <p>
// //                   <strong>Email:</strong> {selectedEvent.email}
// //                 </p>
// //                 <p>
// //                   <strong>Notes:</strong> {selectedEvent.notes}
// //                 </p>
// //               </div>
// //               <div className="modal-footer">
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={() => setSelectedEvent(null)}
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventSystem;
