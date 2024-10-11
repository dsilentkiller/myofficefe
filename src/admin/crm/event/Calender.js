// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import Select from "react-select"; // Importing Select component for multiple attendees
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";

// const localizer = momentLocalizer(moment); // Set the localizer for the calendar

// const EventSystem = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 0,
//       title: "Sample Event",
//       start: new Date(2024, 9, 10, 10, 0),
//       end: new Date(2024, 9, 10, 12, 0),
//       email: "example@example.com",
//       notes: "This is a sample event note.",
//       attendees: [
//         { label: "attendee1@example.com", value: "attendee1@example.com" },
//       ],
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false); // Single state for modal toggle
//   const [eventData, setEventData] = useState({
//     title: "",
//     start: null,
//     end: null,
//     email: "",
//     notes: "",
//     attendees: [],
//   });

//   // Function to handle opening of the modal
//   const handleShow = ({ start, end }) => {
//     setEventData((prevData) => ({
//       ...prevData,
//       start,
//       end,
//     }));
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm(); // Reset modal data when closing
//   };

//   const handleSaveEvent = () => {
//     const { title, start, end } = eventData;
//     if (title && start && end) {
//       setEvents((prev) => [...prev, { ...eventData }]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal and reset form
//     } else {
//       toast.error("Event title, start, and end time are required!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     alert(
//       `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${
//         event.notes
//       }\nAttendees: ${event.attendees
//         .map((attendee) => attendee.label)
//         .join(", ")}`
//     );
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       email: "",
//       notes: "",
//       attendees: [],
//     });
//   };

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500, margin: "50px" }}
//         selectable
//         onSelectEvent={handleSelectEvent}
//         onSelectSlot={handleShow} // Open modal on slot selection
//       />

//       {/* Modal for event creation */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Event</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="eventTitle">
//               <Form.Label>Event Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter event title"
//                 value={eventData.title}
//                 onChange={(e) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     title: e.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventData.email}
//                 onChange={(e) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     email: e.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventData.notes}
//                 onChange={(e) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     notes: e.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Start Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventData.start}
//                 onChange={(date) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     start: date,
//                   }))
//                 }
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={15}
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 placeholderText="Select start date and time"
//                 className="form-control"
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEnd">
//               <Form.Label>End Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventData.end}
//                 onChange={(date) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     end: date,
//                   }))
//                 }
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={15}
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 placeholderText="Select end date and time"
//                 className="form-control"
//               />
//             </Form.Group>
//             <Form.Group controlId="eventAttendees">
//               <Form.Label>Attendees</Form.Label>
//               <Select
//                 isMulti
//                 value={eventData.attendees}
//                 onChange={(selectedOptions) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     attendees: selectedOptions,
//                   }))
//                 }
//                 options={[
//                   {
//                     label: "attendee1@example.com",
//                     value: "attendee1@example.com",
//                   },
//                   {
//                     label: "attendee2@example.com",
//                     value: "attendee2@example.com",
//                   },
//                   {
//                     label: "attendee3@example.com",
//                     value: "attendee3@example.com",
//                   },
//                 ]}
//                 placeholder="Select or add attendees"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveEvent}>
//             Save Event
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   createEvent,
//   deleteEvent,
// } from "../../redux/slice/crm/eventSlice"; // Import the actions
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const dispatch = useDispatch();
//   const {
//     list: events,
//     isLoading,
//     error,
//   } = useSelector((state) => state.events);

//   const [showModal, setShowModal] = useState(false);
//   const [eventData, setEventData] = useState({
//     title: "",
//     start: null,
//     end: null,
//     email: "",
//     notes: "",
//     attendees: [],
//   });

//   useEffect(() => {
//     dispatch(fetchEvents()); // Fetch events when component mounts
//   }, [dispatch]);

//   const handleShow = ({ start, end }) => {
//     setEventData((prevData) => ({
//       ...prevData,
//       start,
//       end,
//     }));
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = () => {
//     const { title, start, end, email, notes, attendees } = eventData;
//     if (title && start && end) {
//       const formData = {
//         title,
//         start,
//         end,
//         email,
//         notes,
//         attendees: attendees.map((attendee) => attendee.value), // Format attendees correctly
//       };

//       dispatch(createEvent(formData)); // Dispatch the create event action
//       toast.success("Event created successfully!");
//       handleClose();
//     } else {
//       toast.error("Event title, start, and end time are required!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     alert(
//       `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${
//         event.notes
//       }\nAttendees: ${event.attendees.join(", ")}`
//     );
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       email: "",
//       notes: "",
//       attendees: [],
//     });
//   };

//   return (
//     <div>
//       {isLoading && <p>Loading events...</p>}
//       {error && <p>Error fetching events: {error}</p>}

//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500, margin: "50px" }}
//         selectable
//         onSelectEvent={handleSelectEvent}
//         onSelectSlot={handleShow}
//       />

//       {/* Modal for event creation */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Event</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="eventTitle">
//               <Form.Label>Event Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter event title"
//                 value={eventData.title}
//                 onChange={(e) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     title: e.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventData.email}
//                 onChange={(e) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     email: e.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventData.notes}
//                 onChange={(e) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     notes: e.target.value,
//                   }))
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Start Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventData.start}
//                 onChange={(date) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     start: date,
//                   }))
//                 }
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={15}
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 placeholderText="Select start date and time"
//                 className="form-control"
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEnd">
//               <Form.Label>End Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventData.end}
//                 onChange={(date) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     end: date,
//                   }))
//                 }
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={15}
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 placeholderText="Select end date and time"
//                 className="form-control"
//               />
//             </Form.Group>
//             <Form.Group controlId="eventAttendees">
//               <Form.Label>Attendees</Form.Label>
//               <Select
//                 isMulti
//                 value={eventData.attendees}
//                 onChange={(selectedOptions) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     attendees: selectedOptions,
//                   }))
//                 }
//                 options={[
//                   {
//                     label: "attendee1@example.com",
//                     value: "attendee1@example.com",
//                   },
//                   {
//                     label: "attendee2@example.com",
//                     value: "attendee2@example.com",
//                   },
//                   {
//                     label: "attendee3@example.com",
//                     value: "attendee3@example.com",
//                   },
//                 ]}
//                 placeholder="Select or add attendees"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveEvent}>
//             Save Event
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent } from "../../redux/slice/crm/eventSlice";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
// import { fetchEvents } from "../../redux/slice/crm/eventSlice";
// import { useNavigate } from "react-router-dom";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     start: "",
//     end: "",
//     attendees: [],
//     email: "",
//     notes: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const events = useSelector((state) => state.events.list || []);
//   const { list: attendees } = useSelector((state) => state.attendees);
//   const [modalOpen, setModalOpen] = useState(false);

//   const toggleModal = () => {
//     setModalOpen((prevState) => !prevState);
//   };

//   const handleSelectSlot = ({ start, end }) => {
//     setFormData({ ...formData, start, end });
//     toggleModal();
//   };

//   useEffect(() => {
//     dispatch(fetchAttendees());
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleEventSubmit = (e) => {
//     e.preventDefault();

//     // Check for existing events with the same title and time
//     const isDuplicate = events.some(
//       (event) =>
//         event.title === formData.title &&
//         new Date(event.start).getTime() ===
//           new Date(formData.start).getTime() &&
//         new Date(event.end).getTime() === new Date(formData.end).getTime()
//     );

//     if (isDuplicate) {
//       toast.error("An event with the same title and time already exists!");
//       return;
//     }

//     const formDataObject = {
//       id: Date.now(),
//       title: formData.title,
//       start: new Date(formData.start),
//       end: new Date(formData.end),
//       attendees: formData.attendees,
//       email: formData.email,
//       notes: formData.notes,
//     };

//     dispatch(createEvent(formDataObject));
//     toast.success("Event created successfully!");

//     setModalOpen(false);
//     setFormData({
//       title: "",
//       start: "",
//       end: "",
//       attendees: [],
//       email: "",
//       notes: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "attendees") {
//       const selectedOptions = Array.from(
//         e.target.selectedOptions,
//         (option) => option.value
//       );
//       setFormData({
//         ...formData,
//         [name]: selectedOptions,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
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
//                     views={{
//                       month: true,
//                       week: true,
//                       day: true,
//                       agenda: true,
//                     }}
//                   />
//                   <h2>Upcoming Events</h2>
//                   <div className="agenda">
//                     {events.length > 0 ? (
//                       <ul>
//                         {events.map((event) => (
//                           <li key={event.id}>
//                             <strong>{event.title}</strong>
//                             <br />
//                             <span>
//                               {moment(event.start).format(
//                                 "MMMM Do YYYY, h:mm a"
//                               )}{" "}
//                               - {moment(event.end).format("h:mm a")}
//                             </span>
//                             <p>{event.notes}</p>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p>No upcoming events.</p>
//                     )}
//                   </div>
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
//           style={{
//             display: modalOpen ? "block" : "none",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           <div className="modal-dialog modal-lg" role="document">
//             <div
//               className="modal-content"
//               style={{
//                 borderRadius: "10px",
//                 boxShadow: "0 0 20px rgba(0,0,0,0.5)",
//               }}
//             >
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
//                         value={formData.title}
//                         onChange={(e) =>
//                           setFormData({ ...formData, title: e.target.value })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">
//                       Start Date
//                     </label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(formData.start).format(
//                           "YYYY-MM-DDTHH:mm"
//                         )}
//                         onChange={(e) =>
//                           setFormData({ ...formData, start: e.target.value })
//                         }
//                         required
//                       />
//                     </div>

//                     <label className="col-sm-2 col-form-label">End Date</label>
//                     <div className="col-sm-4">
//                       <input
//                         type="datetime-local"
//                         className="form-control"
//                         value={moment(formData.end).format("YYYY-MM-DDTHH:mm")}
//                         onChange={(e) =>
//                           setFormData({ ...formData, end: e.target.value })
//                         }
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Attendees</label>
//                     <div className="col-sm-10">
//                       <select
//                         id="attendees"
//                         name="attendees"
//                         value={formData.attendees}
//                         onChange={handleInputChange}
//                         className="form-control"
//                         multiple
//                         required
//                       >
//                         {attendees.length > 0 ? (
//                           attendees.map((attendee) => (
//                             <option key={attendee.id} value={attendee.id}>
//                               {attendee.attendee_name}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="">No attendees available</option>
//                         )}
//                       </select>
//                       <div className="mt-2">
//                         <span>Selected Attendees: </span>
//                         <div style={{ display: "flex", flexWrap: "wrap" }}>
//                           {formData.attendees.map((attendeeId) => {
//                             const attendee = attendees.find(
//                               (a) => a.id === attendeeId
//                             );
//                             return attendee ? (
//                               <span
//                                 key={attendeeId}
//                                 className="badge badge-info mr-2"
//                                 style={{
//                                   marginRight: "5px",
//                                   marginBottom: "5px",
//                                 }}
//                               >
//                                 {attendee.attendee_name}
//                               </span>
//                             ) : null;
//                           })}
//                         </div>
//                       </div>
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() =>
//                           navigate("/dashboard/crm/attendee/create/")
//                         }
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Email</label>
//                     <div className="col-sm-10">
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter attendee email"
//                         value={formData.email}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
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
//                         rows="3"
//                         placeholder="Additional notes"
//                         value={formData.notes}
//                         onChange={(e) =>
//                           setFormData({ ...formData, notes: e.target.value })
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={toggleModal}
//                     >
//                       Close
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       Create Event
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

// //new one
// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import axios from "axios";
// // import interactionPlugin from '@fullcalendar/interaction'; // for drag and drop
// // import bootstrapPlugin from '@fullcalendar/bootstrap'; // for bootstrap theme

// const Calendar = () => {
//   const [events, setEvents] = useState([]);

//   // Fetch events from the Django API
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/event/")
//       .then((response) => {
//         const apiEvents = response.data.result.data.map((event) => ({
//           id: event.id,
//           title: event.title,
//           start: event.start,
//           end: event.end,
//           extendedProps: {
//             email: event.email,
//             notes: event.notes,
//             is_canceled: event.is_canceled,
//           },
//         }));
//         setEvents(apiEvents);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the events!", error);
//       });
//   }, []);

//   const handleDateSelect = (selectInfo) => {
//     const title = prompt("Please enter a new title for your event");
//     const calendarApi = selectInfo.view.calendar;
//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       const newEvent = {
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         attendees: [],
//         email: "",
//         notes: "",
//       };

//       axios
//         .post("http://localhost:8000/api/events/", newEvent)
//         .then((response) => {
//           const createdEvent = response.data.result.data;
//           calendarApi.addEvent({
//             id: createdEvent.id,
//             title: createdEvent.title,
//             start: createdEvent.start,
//             end: createdEvent.end,
//             allDay: selectInfo.allDay,
//           });
//         })
//         .catch((error) => {
//           console.error("Error creating event", error);
//         });
//     }
//   };

//   const handleEventClick = (detail) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${detail.event.title}'?`
//       )
//     ) {
//       axios
//         .delete(`http://localhost:8000/api/event/${detail.event.id}/`)
//         .then(() => {
//           detail.event.remove();
//         })
//         .catch((error) => {
//           console.error("Error deleting event", error);
//         });
//     }
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin]}
//         initialView="dayGridMonth"
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         dayMaxEvents={true}
//         weekends={true}
//         events={events}
//         select={handleDateSelect}
//         eventClick={handleEventClick}
//       />
//     </div>
//   );
// };

// export default Calendar;
