// // //create event must in middle of the form v1

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
//   const [events, setEvents] = useState([]);
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

//   // Example attendees, modify as per your options
//   const attendeesOptions = [
//     { value: "John Doe", label: "John Doe" },
//     { value: "Jane Smith", label: "Jane Smith" },
//     { value: "Alice Brown", label: "Alice Brown" },
//   ];

//   const navigate = useNavigate();
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: newEvent.attendees.map((attendee) => attendee.label),
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     setEvents([...events, newEventObject]);
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

//   const handleEventClick = (event) => {
//     navigate("/event-detail", { state: { event } }); // Navigate to EventDetail page
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
//                   <ToastContainer />{" "}
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleEventClick}
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
//                         setNewEvent({ ...newEvent, title: e.target.value })
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
//                           setNewEvent({ ...newEvent, start: e.target.value })
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
//                           setNewEvent({ ...newEvent, end: e.target.value })
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
//                       onChange={(selected) =>
//                         setNewEvent({ ...newEvent, attendees: selected })
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-link"
//                       onClick={() =>
//                         navigate("/dashboard/crm/attendee/create/")
//                       }
//                     >
//                       + Add New Attendees
//                     </button>
//                   </div>
//                   <div className="form-group">
//                     <label>Attendee Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter attendee email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, email: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       placeholder="Additional notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, notes: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       {selectedEvent ? "Update Event" : "Create Event"}
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
//     </div>
//   );
// };

// export default EventSystem;
// #-----------------------
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import CreateEventModal from "./CreateEventModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";
// import emailjs from "emailjs-com";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//   });

//   const attendeesOptions = [
//     { value: "john@example.com", label: "John Doe" },
//     { value: "jane@example.com", label: "Jane Smith" },
//     { value: "mike@example.com", label: "Mike Johnson" },
//   ];

//   // Function to handle adding or updating an event
//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     if (selectedEvent) {
//       const updatedEvents = events.map((evt) =>
//         evt === selectedEvent
//           ? { ...newEvent, attendees: newEvent.attendees.map((a) => a.label) }
//           : evt
//       );
//       setEvents(updatedEvents);
//       toast.success("Event updated successfully!");
//     } else {
//       setEvents([
//         ...events,
//         {
//           ...newEvent,
//           start: new Date(newEvent.start),
//           end: new Date(newEvent.end),
//           attendees: newEvent.attendees.map((a) => a.label),
//         },
//       ]);
//       toast.success("Event created successfully!");
//     }
//     setModalOpen(false);
//     setSelectedEvent(null);
//     sendEmail();
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = () => {
//     const emailParams = {
//       title: newEvent.title,
//       email: newEvent.email,
//       attendees: newEvent.attendees
//         .map((attendee) => attendee.value)
//         .join(", "),
//       start: newEvent.start,
//       end: newEvent.end,
//       notes: newEvent.notes,
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

//   const handleSelectSlot = ({ start, end }) => {
//     setModalOpen(true);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, start, end });
//   };

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({
//       ...event,
//       attendees: event.attendees.map((a) => ({ value: a, label: a })),
//     });
//     setModalOpen(true);
//   };

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
//     });
//     toast.info("Action canceled.");
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>Event Calendar</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">Calendar</li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card card-primary">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <i className="fa fa-calendar"></i> Manage Events
//                   </h3>
//                 </div>
//                 <div className="card-body p-0">
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     selectable
//                     onSelectEvent={handleSelectEvent}
//                     onSelectSlot={handleSelectSlot}
//                     style={{ height: 500, padding: "1rem" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <CreateEventModal
//         modalOpen={modalOpen}
//         closeModal={closeModal}
//         handleEventSubmit={handleEventSubmit}
//         selectedEvent={selectedEvent}
//         newEvent={newEvent}
//         setNewEvent={setNewEvent}
//         attendeesOptions={attendeesOptions}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;

// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactModal from "react-modal";
// import emailjs from "emailjs-com";
// import Select from "react-select";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//   });

//   const attendeesOptions = [
//     { value: "john@example.com", label: "John Doe" },
//     { value: "jane@example.com", label: "Jane Smith" },
//     { value: "mike@example.com", label: "Mike Johnson" },
//   ];

//   // Function to handle adding or updating an event
//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     if (selectedEvent) {
//       const updatedEvents = events.map((evt) =>
//         evt === selectedEvent ? { ...newEvent, attendees: newEvent.attendees.map(a => a.label) } : evt
//       );
//       setEvents(updatedEvents);
//       toast.success("Event updated successfully!");
//     } else {
//       setEvents([
//         ...events,
//         {
//           ...newEvent,
//           start: new Date(newEvent.start),
//           end: new Date(newEvent.end),
//           attendees: newEvent.attendees.map(a => a.label), // Get the labels (names) of attendees
//         },
//       ]);
//       toast.success("Event created successfully!");
//     }
//     setModalOpen(false);
//     setSelectedEvent(null);
//     sendEmail();
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = () => {
//     const emailParams = {
//       title: newEvent.title,
//       email: newEvent.email,
//       attendees: newEvent.attendees.map((attendee) => attendee.value).join(", "),
//       start: newEvent.start,
//       end: newEvent.end,
//       notes: newEvent.notes,
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

//   // When clicking on a time slot to add a new event
//   const handleSelectSlot = ({ start, end }) => {
//     setModalOpen(true);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, start, end });
//   };

//   // When selecting an event to edit
//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({ ...event, attendees: event.attendees.map(a => ({ value: a, label: a })) });
//     setModalOpen(true);
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
//     });
//     toast.info("Action canceled.");
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>CRM Event Calendar</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">Calendar</li>
//               </ol>
//             </div>
//           </div>
//         </div>
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
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleSelectEvent}
//                     style={{ height: 500 }}
//                     className="calendar-custom"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ReactModal
//         isOpen={modalOpen}
//         onRequestClose={closeModal}
//         ariaHideApp={false}
//         className="modal-dialog-centered modal-dialog modal-lg"
//         overlayClassName="modal-backdrop fade show"
//       >
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">
//               {selectedEvent ? "Update Event" : "Create Event"}
//             </h5>
//             <button type="button" className="close" onClick={closeModal}>
//               <span>&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleEventSubmit}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="title"
//                   placeholder="Enter Event Title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Start Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="start"
//                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, start: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="end"
//                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, end: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Attendees</label>
//                 <Select
//                   isMulti
//                   options={attendeesOptions}
//                   value={newEvent.attendees}
//                   onChange={(selected) =>
//                     setNewEvent({ ...newEvent, attendees: selected })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   placeholder="Attendee Email"
//                   value={newEvent.email}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="notes"
//                   placeholder="Enter any notes"
//                   value={newEvent.notes}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, notes: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="modal-footer">
//                 <button type="submit" className="btn btn-primary">
//                   {selectedEvent ? "Update Event" : "Create Event"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </ReactModal>

//       {/* Toast Container for notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;
//createevent form
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactModal from "react-modal";
// import emailjs from "emailjs-com";
// import Select from "react-select";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//   });

//   const attendeesOptions = [
//     { value: "john@example.com", label: "John Doe" },
//     { value: "jane@example.com", label: "Jane Smith" },
//     { value: "mike@example.com", label: "Mike Johnson" },
//   ];

//   // Function to handle adding or updating an event
//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     if (selectedEvent) {
//       const updatedEvents = events.map((evt) =>
//         evt === selectedEvent
//           ? { ...newEvent, attendees: newEvent.attendees.map((a) => a.label) }
//           : evt
//       );
//       setEvents(updatedEvents);
//       toast.success("Event updated successfully!");
//     } else {
//       setEvents([
//         ...events,
//         {
//           ...newEvent,
//           start: new Date(newEvent.start),
//           end: new Date(newEvent.end),
//           attendees: newEvent.attendees.map((a) => a.label), // Get the labels (names) of attendees
//         },
//       ]);
//       toast.success("Event created successfully!");
//     }
//     setModalOpen(false);
//     setSelectedEvent(null);
//     sendEmail();
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = () => {
//     const emailParams = {
//       title: newEvent.title,
//       email: newEvent.email,
//       attendees: newEvent.attendees
//         .map((attendee) => attendee.value)
//         .join(", "),
//       start: newEvent.start,
//       end: newEvent.end,
//       notes: newEvent.notes,
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

//   // When clicking on a time slot to add a new event
//   const handleSelectSlot = ({ start, end }) => {
//     setModalOpen(true);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, start, end });
//   };

//   // When selecting an event to edit
//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({
//       ...event,
//       attendees: event.attendees.map((a) => ({ value: a, label: a })),
//     });
//     setModalOpen(true);
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
//     });
//     toast.info("Action canceled.");
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>CRM Event Calendar</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">Calendar</li>
//               </ol>
//             </div>
//           </div>
//         </div>
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
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleSelectEvent}
//                     style={{ height: 500 }}
//                     className="calendar-custom"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ReactModal
//         isOpen={modalOpen}
//         onRequestClose={closeModal}
//         ariaHideApp={false}
//         className="modal-dialog modal-dialog-centered"
//         overlayClassName="modal-backdrop fade show"
//       >
//         <div className="card card-info">
//           <div className="card-header">
//             <h3 className="card-title">
//               {selectedEvent ? "Update Event" : "Create Event"}
//             </h3>
//             <button
//               type="button"
//               className="close"
//               aria-label="Close"
//               onClick={closeModal}
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleEventSubmit}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="title"
//                   placeholder="Enter Event Title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Start Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="start"
//                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, start: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="end"
//                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, end: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Attendees</label>
//                 <Select
//                   isMulti
//                   options={attendeesOptions}
//                   value={newEvent.attendees}
//                   onChange={(selected) =>
//                     setNewEvent({ ...newEvent, attendees: selected })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   placeholder="Attendee Email"
//                   value={newEvent.email}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="notes"
//                   placeholder="Enter any notes"
//                   value={newEvent.notes}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, notes: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="card-footer text-right">
//                 <button type="submit" className="btn btn-primary">
//                   {selectedEvent ? "Update Event" : "Create Event"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary ml-2"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </ReactModal>

//       {/* Toast Container for notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;

// // //#v4 ------------------------------------
// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import ReactModal from "react-modal";
// // import emailjs from "emailjs-com";
// // import Select from "react-select";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "admin-lte/dist/css/adminlte.min.css";
// // import "font-awesome/css/font-awesome.min.css";

// // const localizer = momentLocalizer(moment);

// // const EventSystem = () => {
// //   const [events, setEvents] = useState([]);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [selectedEvent, setSelectedEvent] = useState(null);
// //   const [newEvent, setNewEvent] = useState({
// //     title: "",
// //     start: "",
// //     end: "",
// //     attendees: [],
// //     email: "",
// //     notes: "",
// //   });

// //   const attendeesOptions = [
// //     { value: "john@example.com", label: "John Doe" },
// //     { value: "jane@example.com", label: "Jane Smith" },
// //     { value: "mike@example.com", label: "Mike Johnson" },
// //   ];

// //   // Function to handle adding or updating an event
// //   const handleEventSubmit = (e) => {
// //     e.preventDefault();
// //     if (selectedEvent) {
// //       const updatedEvents = events.map((evt) =>
// //         evt === selectedEvent
// //           ? { ...newEvent, attendees: newEvent.attendees.map((a) => a.label) }
// //           : evt
// //       );
// //       setEvents(updatedEvents);
// //       toast.success("Event updated successfully!");
// //     } else {
// //       setEvents([
// //         ...events,
// //         {
// //           ...newEvent,
// //           start: new Date(newEvent.start),
// //           end: new Date(newEvent.end),
// //           attendees: newEvent.attendees.map((a) => a.label), // Get the labels (names) of attendees
// //         },
// //       ]);
// //       toast.success("Event created successfully!");
// //     }
// //     setModalOpen(false);
// //     setSelectedEvent(null);
// //     sendEmail();
// //     setNewEvent({
// //       title: "",
// //       start: "",
// //       end: "",
// //       attendees: [],
// //       email: "",
// //       notes: "",
// //     });
// //   };

// //   // Function to send email using EmailJS
// //   const sendEmail = () => {
// //     const emailParams = {
// //       title: newEvent.title,
// //       email: newEvent.email,
// //       attendees: newEvent.attendees
// //         .map((attendee) => attendee.value)
// //         .join(", "),
// //       start: newEvent.start,
// //       end: newEvent.end,
// //       notes: newEvent.notes,
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

// //   // When clicking on a time slot to add a new event
// //   const handleSelectSlot = ({ start, end }) => {
// //     setModalOpen(true);
// //     setSelectedEvent(null);
// //     setNewEvent({ ...newEvent, start, end });
// //   };

// //   // When selecting an event to edit
  // const handleSelectEvent = (event) => {
  //   setSelectedEvent(event);
  //   setNewEvent({
  //     ...event,
  //     attendees: event.attendees.map((a) => ({ value: a, label: a })),
  //   });
  //   setModalOpen(true);
  // };

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
// //     });
// //     toast.info("Action canceled.");
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       {/* Page header */}
// //       <section className="content-header">
// //         <div className="container-fluid">
// //           <div className="row mb-2">
// //             <div className="col-sm-6">
// //               <h1>Event Calendar</h1>
// //             </div>
// //             <div className="col-sm-6">
// //               <ol className="breadcrumb float-sm-right">
// //                 <li className="breadcrumb-item">
// //                   <a href="#">Home</a>
// //                 </li>
// //                 <li className="breadcrumb-item active">Calendar</li>
// //               </ol>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Calendar section */}
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
// //                   <Calendar
// //                     localizer={localizer}
// //                     events={events}
// //                     startAccessor="start"
// //                     endAccessor="end"
// //                     selectable
// //                     onSelectSlot={handleSelectSlot}
// //                     onSelectEvent={handleSelectEvent}
// //                     style={{ height: 500 }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Modal for event creation */}
// //       <ReactModal
// //         isOpen={modalOpen}
// //         onRequestClose={closeModal}
// //         ariaHideApp={false}
// //       >
// //         <div className="modal-dialog modal-lg">
// //           <div className="modal-content">
// //             <div className="modal-header bg-primary">
// //               <h4 className="modal-title">
// //                 {selectedEvent ? "Update Event" : "Create Event"}
// //               </h4>
// //               <button
// //                 type="button"
// //                 className="close"
// //                 onClick={closeModal}
// //                 aria-label="Close"
// //               >
// //                 <span aria-hidden="true">&times;</span>
// //               </button>
// //             </div>
// //             <div className="modal-body">
// //               <form onSubmit={handleEventSubmit}>
// //                 <div className="form-group">
// //                   <label>Event Title</label>
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     name="title"
// //                     placeholder="Event Title"
// //                     value={newEvent.title}
// //                     onChange={(e) =>
// //                       setNewEvent({ ...newEvent, title: e.target.value })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-row">
// //                   <div className="form-group col-md-6">
// //                     <label>Start Time</label>
// //                     <input
// //                       type="datetime-local"
// //                       className="form-control"
// //                       name="start"
// //                       value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
// //                       onChange={(e) =>
// //                         setNewEvent({ ...newEvent, start: e.target.value })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-group col-md-6">
// //                     <label>End Time</label>
// //                     <input
// //                       type="datetime-local"
// //                       className="form-control"
// //                       name="end"
// //                       value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                       onChange={(e) =>
// //                         setNewEvent({ ...newEvent, end: e.target.value })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Attendees</label>
// //                   <Select
// //                     isMulti
// //                     options={attendeesOptions}
// //                     value={newEvent.attendees}
// //                     onChange={(selected) =>
// //                       setNewEvent({ ...newEvent, attendees: selected })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Email</label>
// //                   <input
// //                     type="email"
// //                     className="form-control"
// //                     name="email"
// //                     placeholder="Attendee Email"
// //                     value={newEvent.email}
// //                     onChange={(e) =>
// //                       setNewEvent({ ...newEvent, email: e.target.value })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Notes</label>
// //                   <textarea
// //                     className="form-control"
// //                     name="notes"
// //                     placeholder="Notes"
// //                     value={newEvent.notes}
// //                     onChange={(e) =>
// //                       setNewEvent({ ...newEvent, notes: e.target.value })
// //                     }
// //                   />
// //                 </div>
// //                 <div className="modal-footer justify-content-between">
// //                   <button type="submit" className="btn btn-primary">
// //                     {selectedEvent ? "Update Event" : "Create Event"}
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={closeModal}
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </ReactModal>

// //       {/* Toast notifications */}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default EventSystem;

// // // #---------------------------

// //v4------------------------------------------
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactModal from "react-modal";
import emailjs from "emailjs-com";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "admin-lte/dist/css/adminlte.min.css";
import "font-awesome/css/font-awesome.min.css";

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
    email: "",
    notes: "",
  });

  const attendeesOptions = [
    { value: "john@example.com", label: "John Doe" },
    { value: "jane@example.com", label: "Jane Smith" },
    { value: "mike@example.com", label: "Mike Johnson" },
  ];

  // Function to handle adding or updating an event
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent) {
      const updatedEvents = events.map((evt) =>
        evt === selectedEvent
          ? { ...newEvent, attendees: newEvent.attendees.map((a) => a.label) }
          : evt
      );
      setEvents(updatedEvents);
      toast.success("Event updated successfully!");
    } else {
      setEvents([
        ...events,
        {
          ...newEvent,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end),
          attendees: newEvent.attendees.map((a) => a.label), // Get the labels (names) of attendees
        },
      ]);
      toast.success("Event created successfully!");
    }
    setModalOpen(false);
    setSelectedEvent(null);
    sendEmail();
    setNewEvent({
      title: "",
      start: "",
      end: "",
      attendees: [],
      email: "",
      notes: "",
    });
  };

  // Function to send email using EmailJS
  const sendEmail = () => {
    const emailParams = {
      title: newEvent.title,
      email: newEvent.email,
      attendees: newEvent.attendees
        .map((attendee) => attendee.value)
        .join(", "),
      start: newEvent.start,
      end: newEvent.end,
      notes: newEvent.notes,
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

  // When clicking on a time slot to add a new event
  const handleSelectSlot = ({ start, end }) => {
    setModalOpen(true);
    setSelectedEvent(null);
    setNewEvent({ ...newEvent, start, end });
  };

  // When selecting an event to edit
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      ...event,
      attendees: event.attendees.map((a) => ({ value: a, label: a })),
    });
    setModalOpen(true);
  };

  // Modal close handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      attendees: [],
      email: "",
      notes: "",
    });
    toast.info("Action canceled.");
  };

  return (
    <div className="content-wrapper">
      {/* Page header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Event Calendar</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Calendar</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar section */}
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
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    style={{ height: 500 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for event creation */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h4 className="modal-title">
                {selectedEvent ? "Update Event" : "Create Event"}
              </h4>
              <button
                type="button"
                className="close"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEventSubmit}>
                <div className="form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="start"
                      value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, start: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="end"
                      value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, end: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Attendees</label>
                  <Select
                    isMulti
                    options={attendeesOptions}
                    value={newEvent.attendees}
                    onChange={(selected) =>
                      setNewEvent({ ...newEvent, attendees: selected })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Attendee Email"
                    value={newEvent.email}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    placeholder="Notes"
                    value={newEvent.notes}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, notes: e.target.value })
                    }
                  />
                </div>
                <div className="modal-footer justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    {selectedEvent ? "Update Event" : "Create Event"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ReactModal>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default EventSystem;

// //#v3--------------------------------------------------------------------
// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";

// //#------------------------------v2 ---------------------------------
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactModal from "react-modal";
// import emailjs from "emailjs-com";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: "",
//     email: "",
//     notes: "",
//   });

//   // Function to handle adding or updating an event
//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     if (selectedEvent) {
//       const updatedEvents = events.map((evt) =>
//         evt === selectedEvent ? { ...newEvent } : evt
//       );
//       setEvents(updatedEvents);
//     } else {
//       setEvents([
//         ...events,
//         {
//           ...newEvent,
//           start: new Date(newEvent.start),
//           end: new Date(newEvent.end),
//         },
//       ]);
//     }
//     setModalOpen(false);
//     setSelectedEvent(null);
//     sendEmail(); // Send email after event creation
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: "",
//       email: "",
//       notes: "",
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = () => {
//     const emailParams = {
//       title: newEvent.title,
//       email: newEvent.email,
//       attendees: newEvent.attendees,
//       start: newEvent.start,
//       end: newEvent.end,
//       notes: newEvent.notes,
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

//   // When clicking on a time slot to add a new event
//   const handleSelectSlot = ({ start, end }) => {
//     setModalOpen(true);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, start, end });
//   };

//   // When selecting an event to edit
//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({ ...event });
//     setModalOpen(true);
//   };

//   // Modal close handler
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedEvent(null);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: "",
//       email: "",
//       notes: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>CRM Event Calendar</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">Calendar</li>
//               </ol>
//             </div>
//           </div>
//         </div>
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
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleSelectEvent}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ReactModal
//         isOpen={modalOpen}
//         onRequestClose={closeModal}
//         ariaHideApp={false}
//       >
//         <div className="card card-info">
//           <div className="card-header">
//             <h3 className="card-title">
//               {selectedEvent ? "Update Event" : "Create Event"}
//             </h3>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleEventSubmit}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="title"
//                   placeholder="Event Title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Start Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="start"
//                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, start: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="end"
//                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, end: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Attendees</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="attendees"
//                   placeholder="Attendees"
//                   value={newEvent.attendees}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, attendees: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   placeholder="Attendee Email"
//                   value={newEvent.email}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="notes"
//                   placeholder="Notes"
//                   value={newEvent.notes}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, notes: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="card-footer">
//                 <button type="submit" className="btn btn-success">
//                   {selectedEvent ? "Update Event" : "Create Event"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger float-right"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </ReactModal>
//     </div>
//   );
// };

// export default EventSystem;
// // #-----------v1 -----------------------

// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactModal from "react-modal";
// import emailjs from "emailjs-com";
// // from rest_framework.permissions import IsAdminUser
// // Set up moment as the localizer for react-big-calendar
// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: "",
//     email: "",
//     notes: "",
//     is_canceled: false,
//   });

//   // Function to handle adding or updating an event
//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     if (selectedEvent) {
//       const updatedEvents = events.map((evt) =>
//         evt === selectedEvent ? { ...newEvent } : evt
//       );
//       setEvents(updatedEvents);
//     } else {
//       setEvents([
//         ...events,
//         {
//           ...newEvent,
//           start: new Date(newEvent.start),
//           end: new Date(newEvent.end),
//         },
//       ]);
//     }
//     setModalOpen(false);
//     setSelectedEvent(null);
//     sendEmail(); // Send email after event creation
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: "",
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = () => {
//     const emailParams = {
//       title: newEvent.title,
//       email: newEvent.email,
//       attendees: newEvent.attendees,
//       start: newEvent.start,
//       end: newEvent.end,

//       notes: newEvent.notes,
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

//   // Function to handle event cancellation
//   const handleCancelEvent = () => {
//     const updatedEvent = { ...selectedEvent, is_canceled: true };
//     const updatedEvents = events.map((evt) =>
//       evt === selectedEvent ? updatedEvent : evt
//     );
//     setEvents(updatedEvents);
//     setModalOpen(false);
//     setSelectedEvent(null);
//   };

//   // When clicking on a time slot to add a new event
//   const handleSelectSlot = ({ start, end }) => {
//     setModalOpen(true);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, start, end });
//   };

//   // When selecting an event to edit
//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({ ...event });
//     setModalOpen(true);
//   };

//   // Modal close handler
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedEvent(null);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: "",
//       email: "",
//       notes: "",
//       is_canceled: false,
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>CRM Event Calendar</h1>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         selectable
//         onSelectSlot={handleSelectSlot}
//         onSelectEvent={handleSelectEvent}
//         style={{ height: 500, margin: "50px" }}
//         eventPropGetter={(event) => ({
//           style: {
//             backgroundColor: event.is_canceled ? "lightgray" : "blue", // Change color for canceled events
//           },
//         })}
//       />

//       <ReactModal
//         isOpen={modalOpen}
//         onRequestClose={closeModal}
//         ariaHideApp={false}
//       >
//         <h2>{selectedEvent ? "Update Event" : "Create Event"}</h2>
//         <form onSubmit={handleEventSubmit}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Event Title"
//             value={newEvent.title}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, title: e.target.value })
//             }
//             required
//           />
//           <input
//             type="datetime-local"
//             name="start"
//             value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, start: e.target.value })
//             }
//             required
//           />
//           <input
//             type="datetime-local"
//             name="end"
//             value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//             onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             name="attendees"
//             placeholder="Attendees"
//             value={newEvent.attendees}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, attendees: e.target.value })
//             }
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Attendee Email"
//             value={newEvent.email}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, email: e.target.value })
//             }
//             required
//           />
//           <textarea
//             name="notes"
//             placeholder="Notes"
//             value={newEvent.notes}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, notes: e.target.value })
//             }
//           />
//           <button type="submit">
//             {selectedEvent ? "Update Event" : "Create Event"}
//           </button>
//         </form>
//         {selectedEvent && (
//           <button onClick={handleCancelEvent}>Cancel Event</button> // Add cancel event button
//         )}
//         <button onClick={closeModal}>Close</button>
//       </ReactModal>
//     </div>
//   );
// };

// export default EventSystem;

// //#--------------------
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactModal from "react-modal";
// import emailjs from "emailjs-com";
// import Select from "react-select";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//   });

//   const attendeesOptions = [
//     { value: "john@example.com", label: "John Doe" },
//     { value: "jane@example.com", label: "Jane Smith" },
//     { value: "mike@example.com", label: "Mike Johnson" },
//   ];

//   // Function to handle adding or updating an event
//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     if (selectedEvent) {
//       const updatedEvents = events.map((evt) =>
//         evt === selectedEvent
//           ? { ...newEvent, attendees: newEvent.attendees.map((a) => a.label) }
//           : evt
//       );
//       setEvents(updatedEvents);
//       toast.success("Event updated successfully!");
//     } else {
//       setEvents([
//         ...events,
//         {
//           ...newEvent,
//           start: new Date(newEvent.start),
//           end: new Date(newEvent.end),
//           attendees: newEvent.attendees.map((a) => a.label), // Get the labels (names) of attendees
//         },
//       ]);
//       toast.success("Event created successfully!");
//     }
//     setModalOpen(false);
//     setSelectedEvent(null);
//     sendEmail();
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//     });
//   };

//   // Function to send email using EmailJS
//   const sendEmail = () => {
//     const emailParams = {
//       title: newEvent.title,
//       email: newEvent.email,
//       attendees: newEvent.attendees
//         .map((attendee) => attendee.value)
//         .join(", "),
//       start: newEvent.start,
//       end: newEvent.end,
//       notes: newEvent.notes,
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

//   // When clicking on a time slot to add a new event
//   const handleSelectSlot = ({ start, end }) => {
//     setModalOpen(true);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, start, end });
//   };

//   // When selecting an event to edit
//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent({
//       ...event,
//       attendees: event.attendees.map((a) => ({ value: a, label: a })),
//     });
//     setModalOpen(true);
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
//     });
//     toast.info("Action canceled.");
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1>CRM Event Calendar</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">Calendar</li>
//               </ol>
//             </div>
//           </div>
//         </div>
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
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleSelectEvent}
//                     style={{ height: 500 }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ReactModal
//         isOpen={modalOpen}
//         onRequestClose={closeModal}
//         ariaHideApp={false}
//       >
//         <div className="card card-info">
//           <div className="card-header">
//             <h3 className="card-title">
//               {selectedEvent ? "Update Event" : "Create Event"}
//             </h3>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleEventSubmit}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="title"
//                   placeholder="Event Title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Start Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="start"
//                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, start: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Time</label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="end"
//                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, end: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Attendees</label>
//                 <Select
//                   isMulti
//                   options={attendeesOptions}
//                   value={newEvent.attendees}
//                   onChange={(selected) =>
//                     setNewEvent({ ...newEvent, attendees: selected })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   placeholder="Attendee Email"
//                   value={newEvent.email}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="notes"
//                   placeholder="Notes"
//                   value={newEvent.notes}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, notes: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="card-footer">
//                 <button type="submit" className="btn btn-success">
//                   {selectedEvent ? "Update Event" : "Create Event"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger float-right"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </ReactModal>

//       {/* Toast Container for notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;

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
//   const [events, setEvents] = useState([]);
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
//   const navigate = useNavigate();
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     const newEventObject = {
//       title: newEvent.title,
//       start: new Date(newEvent.start),
//       end: new Date(newEvent.end),
//       attendees: newEvent.attendees.map((attendee) => attendee.label),
//       email: newEvent.email,
//       notes: newEvent.notes,
//     };

//     setEvents([...events, newEventObject]);
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

//   const handleEventClick = (event) => {
//     navigate("/event-detail", { state: { event } }); // Navigate to EventDetail page
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
//                   <ToastContainer />{" "}
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleEventClick}
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
//                         setNewEvent({ ...newEvent, title: e.target.value })
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
//                           setNewEvent({ ...newEvent, start: e.target.value })
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
//                           setNewEvent({ ...newEvent, end: e.target.value })
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
//                       onChange={(selected) =>
//                         setNewEvent({ ...newEvent, attendees: selected })
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-link"
//                       onClick={() =>
//                         navigate("/dashboard/crm/attendee/create/")
//                       }
//                     >
//                       + Add New Attendees
//                     </button>
//                   </div>
//                   <div className="form-group">
//                     <label>Attendee Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter attendee email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, email: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       placeholder="Additional notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, notes: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       {selectedEvent ? "Update Event" : "Create Event"}
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
//     </div>
//   );
// };

// export default EventSystem;

// import { useNavigate } from "react-router-dom"; // For navigation
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import Select from "react-select";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
// import { ToastContainer, toast } from "react-toastify";
// const localizer = momentLocalizer(moment);
// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//   });
//   const attendeesOptions = [
//     { value: "John Doe", label: "John Doe" },
//     { value: "Jane Smith", label: "Jane Smith" },
//     { value: "Alice Brown", label: "Alice Brown" },
//   ]; // Example attendees, modify as per your options
//   const navigate = useNavigate();

//   const handleSelectSlot = ({ start, end }) => {
//     setNewEvent({ ...newEvent, start, end });
//     setModalOpen(true);
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     setEvents([
//       ...events,
//       {
//         title: newEvent.title,
//         start: new Date(newEvent.start),
//         end: new Date(newEvent.end),
//         attendees: newEvent.attendees.map((attendee) => attendee.label),
//         email: newEvent.email,
//         notes: newEvent.notes,
//       },
//     ]);

//     // Show success toast message
//     toast.success("Event created successfully!");

//     setModalOpen(false);
//     setNewEvent({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//     });
//   };

//   const handleEventUpdate = (event) => {
//     // Update the event logic

//     // Show update toast message
//     toast.info("Event updated successfully!");
//   };

//   const handleEventCancel = (event) => {
//     // Cancel the event logic

//     // Show cancel toast message
//     toast.error("Event canceled!");
//   };

//   // const handleEventSubmit = (e) => {
//   //   e.preventDefault();
//   //   setEvents([
//   //     ...events,
//   //     {
//   //       title: newEvent.title,
//   //       start: new Date(newEvent.start),
//   //       end: new Date(newEvent.end),
//   //       attendees: newEvent.attendees.map((attendee) => attendee.label),
//   //       email: newEvent.email,
//   //       notes: newEvent.notes,
//   //     },
//   //   ]);
//   //   setModalOpen(false);
//   //   setNewEvent({
//   //     title: "",
//   //     start: "",
//   //     end: "",
//   //     attendees: [],
//   //     email: "",
//   //     notes: "",
//   //   });
//   // };

//   const handleEventClick = (event) => {
//     navigate("/event-detail", { state: { event } }); // Navigate to EventDetail page
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
//                   <ToastContainer />{" "}
//                   {/* Toast container for displaying notifications */}
//                   {/* <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleEventClick} // Added onClick to show event detail
//                     style={{ height: 500 }}
//                   /> */}
//                   <Calendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     titleAccessor="title" // Ensure this is set to display the event title
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleEventClick}
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
//                   {newEvent.title ? "Update Event" : "Create New Event"}
//                 </h5>
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
//                         setNewEvent({ ...newEvent, title: e.target.value })
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
//                           setNewEvent({ ...newEvent, start: e.target.value })
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
//                           setNewEvent({ ...newEvent, end: e.target.value })
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
//                       onChange={(selected) =>
//                         setNewEvent({ ...newEvent, attendees: selected })
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-link"
//                       onClick={() =>
//                         navigate("/dashboard/crm/attendee/create/")
//                       } // Navigate to Attendees page
//                     >
//                       + Add New Attendees
//                     </button>
//                   </div>
//                   <div className="form-group">
//                     <label>Attendee Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter attendee email"
//                       value={newEvent.email}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, email: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Notes</label>
//                     <textarea
//                       className="form-control"
//                       placeholder="Additional notes"
//                       value={newEvent.notes}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, notes: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       {newEvent.title ? "Update Event" : "Create Event"}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={() => setModalOpen(false)}
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
//     </div>
//   );
// };

// export default EventSystem;
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk



//#--------------------

//llllllllllllllllll

//gggggiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
