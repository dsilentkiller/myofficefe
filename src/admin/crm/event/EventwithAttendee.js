//new third
// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
// import { createEvent, fetchEvents } from "../../redux/slice/crm/eventSlice"; // Import createEvent
// import { useDispatch, useSelector } from "react-redux";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const dispatch = useDispatch();

//   const [showModal, setShowModal] = useState(false);

//   const [eventData, setEventData] = useState({
//     title: "",
//     start: null,
//     end: null,
//     email: "",
//     notes: "",
//     // attendees: [],
//   });

//   const attendees = useSelector((state) => state.attendees?.list || []);
//   const fetchedEvents = useSelector((state) => state.events?.list || []); // Get events from the store
//   const [events, setEvents] = useState(fetchedEvents); // Initialize events with fetchedEvents

//   useEffect(() => {
//     dispatch(fetchAttendees());
//     setEvents(fetchEvents());
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

//   const handleSaveEvent = async () => {
//     const { title, start, end } = eventData;
//     if (title && start && end && attendees.length > 0) {
//       try {
//         // Dispatch createEvent action
//         await dispatch(
//           createEvent({
//             ...eventData,
//             attendees: eventData.attendees.map((attendee) => attendee.id), // Store only the attendee IDs or names
//           })
//         ).unwrap();
//         toast.success("Event created successfully!");
//         handleClose();
//       } catch (error) {
//         toast.error("Failed to create event!");
//       }
//     } else {
//       toast.error("Event title, start, and end time are required!");
//     }
//   };

//   // const handleSelectEvent = (event) => {
//   //   alert(
//   //     `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${
//   //       event.notes
//   //     }\nAttendees: ${event.attendees
//   //       .map((attendee) => attendee.label)
//   //       .join(", ")}`
//   //   );
//   // };
//   const handleSelectEvent = (event) => {
//     // Alerting user with event details including only attendee names
//     alert(
//       `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${
//         event.notes
//       }\nAttendees: ${event.attendees
//         .map((attendee) => attendee.attendee_name) // Change 'label' to 'name'
//         .join(", ")}`
//     );

//     // Create an array of attendee names
//     const attendeesData = event.attendees.map((attendee) => ({
//       name: attendee.name, // Assuming you have a 'name' field in attendee objects
//     }));

//     //   // Create event data object to save
//     const eventData = {
//       title: event.title,
//       start: event.start,
//       end: event.end,
//       email: event.email,
//       notes: event.notes,
//       attendees: attendeesData, // Include only attendee names
//     };

//     // Save to the database (assuming you have a function to handle this)
//     handleSaveEvent(eventData);
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
//         onSelectSlot={handleShow}
//       />

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
//             {/* <Form.Group controlId="eventAttendees">
//               <Form.Label>Attendees</Form.Label>
//               <Select
//                 isMulti
//                 id="attendees"
//                 name="attendees"
//                 value={eventData.attendees}
//                 onChange={(selectedOptions) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     attendees: selectedOptions,
//                   }))
//                 }
//                 // options={attendees}
//                 options={
//                   attendees.length > 0
//                     ? attendees.map((attendee) => ({
//                         label: attendee.attendee_name,
//                         value: attendee.id,
//                       }))
//                     : [{ label: "No attendees available", value: "" }]
//                 }
//                 placeholder="Select or add attendees"
//               />
//             </Form.Group> */}
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

// fetch attendee here done.
// import React, { useState, useEffect } from "react"; // Import useEffect
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import Select from "react-select"; // Importing Select component for multiple attendees
// import axios from "axios"; // Import axios for API calls
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
// import { useDispatch, useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";

// const localizer = momentLocalizer(moment); // Set the localizer for the calendar

// const EventSystem = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const [eventData, setEventData] = useState({
//     title: "",
//     start: null,
//     end: null,
//     email: "",
//     notes: "",
//     attendees: [],
//   });

//   // const [selectedAttendees, setSelectedAttendees] = useState([]); // Store selected attendees
//   const attendees = useSelector((state) => state.attendees?.list || []);

//   useEffect(() => {
//     dispatch(fetchAttendees());
//   }, [dispatch]);
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
//             {/* <Form.Group controlId="eventAttendees">
//               <Form.Label>Attendees</Form.Label>
//               <Select
//                 isMulti
//                 id="attendees"
//                 name="attendees"
//                 value={eventData.attendees}
//                 onChange={(selectedOptions) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     attendees: selectedOptions,
//                   }))
//                 }
//                 // options={attendees} // Use fetched attendees here
//                 options={
//                   attendees && attendees.length > 0
//                     ? attendees // Assuming attendees is in {label, value} format
//                     : [{ label: "No attendees available", value: "" }] // Single option for no attendees
//                 }
//                 placeholder="Select or add attendees"
//               />
//             </Form.Group> */}

//             <Form.Group controlId="eventAttendees">
//               <Form.Label>Attendees</Form.Label>
//               <Select
//                 isMulti
//                 id="attendees"
//                 name="attendees"
//                 value={eventData.attendees}
//                 onChange={(selectedOptions) =>
//                   setEventData((prevData) => ({
//                     ...prevData,
//                     attendees: selectedOptions,
//                   }))
//                 }
//                 options={
//                   attendees.length > 0
//                     ? attendees.map((attendee) => ({
//                         // Ensure your attendees are in the correct format
//                         label: attendee.attendee_name, // Display name
//                         value: attendee.id, // Unique identifier
//                       }))
//                     : [{ label: "No attendees available", value: "" }] // Fallback option
//                 }
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

//event system without api

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import {
//   fetchEvents,
//   createEvent,
//   updateEvent,
//   deleteEvent,
// } from "../../redux/slice/crm/eventSlice"; // Adjust import based on your file structure
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const dispatch = useDispatch();
//   const { events, status, error } = useSelector((state) => state.events); // Assuming your slice is named 'events'
//   const [showModal, setShowModal] = useState(false);
//   const [eventData, setEventData] = useState({
//     id: null,
//     title: "",
//     start: null,
//     end: null,
//     email: "",
//     notes: "",
//     attendees: [],
//   });

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEvents());
//     }

//     if (error) {
//       toast.error(error);
//     }
//   }, [status, error, dispatch]);

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
//     const { title, start, end } = eventData;
//     if (title && start && end) {
//       if (eventData.id) {
//         dispatch(updateEvent({ id: eventData.id, eventData }))
//           .unwrap()
//           .then(() => {
//             toast.success("Event updated successfully!");
//           })
//           .catch(() => {
//             toast.error("Failed to update event.");
//           });
//       } else {
//         dispatch(createEvent(eventData))
//           .unwrap()
//           .then(() => {
//             toast.success("Event created successfully!");
//           })
//           .catch(() => {
//             toast.error("Failed to create event.");
//           });
//       }
//       handleClose();
//     } else {
//       toast.error("Event title, start, and end time are required!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     setEventData({
//       id: event.id,
//       title: event.title,
//       start: new Date(event.start),
//       end: new Date(event.end),
//       email: event.email,
//       notes: event.notes,
//       attendees: event.attendees,
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setEventData({
//       id: null,
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
//         onSelectSlot={handleShow}
//       />

//       {/* Modal for event creation */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {eventData.id ? "Edit Event" : "Create Event"}
//           </Modal.Title>
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

// {/*       <div className="form-group">
// //                     <label>Attendees</label>
// //                     <Select
// //                       isMulti
// //                       options={attendeesOptions}
// //                       value={newEvent.attendees}
// //                       onChange={(selected) =>
// //                         setNewEvent({ ...newEvent, attendees: selected })
// //                       }
// //                     />
// //                     <button
// //                       type="button"
// //                       className="btn btn-link"
// //                       onClick={() =>
// //                         navigate("/dashboard/crm/attendee/create/")
// //                       } // Navigate to Attendees page
// //                     >
// //                       + Add New Attendees
// //                     </button>
// //                   </div> */}

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
//             {eventData.id ? "Update Event" : "Save Event"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;

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
