import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Select from "react-select"; // Importing Select component for multiple attendees
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment); // Set the localizer for the calendar

const EventSystem = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Sample Event",
      start: new Date(2024, 9, 10, 10, 0),
      end: new Date(2024, 9, 10, 12, 0),
      email: "example@example.com",
      notes: "This is a sample event note.",
      attendees: [
        { label: "attendee1@example.com", value: "attendee1@example.com" },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false); // Single state for modal toggle
  const [eventData, setEventData] = useState({
    title: "",
    start: null,
    end: null,
    email: "",
    notes: "",
    attendees: [],
  });

  // Function to handle opening of the modal
  const handleShow = ({ start, end }) => {
    setEventData((prevData) => ({
      ...prevData,
      start,
      end,
    }));
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm(); // Reset modal data when closing
  };

  const handleSaveEvent = () => {
    const { title, start, end } = eventData;
    if (title && start && end) {
      setEvents((prev) => [...prev, { ...eventData }]);
      toast.success("Event created successfully!");
      handleClose(); // Close the modal and reset form
    } else {
      toast.error("Event title, start, and end time are required!");
    }
  };

  const handleSelectEvent = (event) => {
    alert(
      `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${
        event.notes
      }\nAttendees: ${event.attendees
        .map((attendee) => attendee.label)
        .join(", ")}`
    );
  };

  const resetForm = () => {
    setEventData({
      title: "",
      start: null,
      end: null,
      email: "",
      notes: "",
      attendees: [],
    });
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleShow} // Open modal on slot selection
      />

      {/* Modal for event creation */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={eventData.title}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="eventEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={eventData.email}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="eventNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter notes"
                value={eventData.notes}
                onChange={(e) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    notes: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="eventStart">
              <Form.Label>Start Date & Time</Form.Label>
              <DatePicker
                selected={eventData.start}
                onChange={(date) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    start: date,
                  }))
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select start date and time"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="eventEnd">
              <Form.Label>End Date & Time</Form.Label>
              <DatePicker
                selected={eventData.end}
                onChange={(date) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    end: date,
                  }))
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select end date and time"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="eventAttendees">
              <Form.Label>Attendees</Form.Label>
              <Select
                isMulti
                value={eventData.attendees}
                onChange={(selectedOptions) =>
                  setEventData((prevData) => ({
                    ...prevData,
                    attendees: selectedOptions,
                  }))
                }
                options={[
                  {
                    label: "attendee1@example.com",
                    value: "attendee1@example.com",
                  },
                  {
                    label: "attendee2@example.com",
                    value: "attendee2@example.com",
                  },
                  {
                    label: "attendee3@example.com",
                    value: "attendee3@example.com",
                  },
                ]}
                placeholder="Select or add attendees"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default EventSystem;

//news eight
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
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//       email: "example@example.com",
//       notes: "This is a sample event note.",
//       attendees: [
//         { label: "attendee1@example.com", value: "attendee1@example.com" },
//       ],
//     },
//   ]);

//   // State for the modal
//   const [show, setShow] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState(null);
//   const [eventEnd, setEventEnd] = useState(null);
//   const [eventEmail, setEventEmail] = useState("");
//   const [eventNotes, setEventNotes] = useState("");
//   const [eventAttendees, setEventAttendees] = useState([]); // State for attendees

//   // Function to handle the opening of the modal
//   const handleShow = ({ start, end }) => {
//     setEventStart(start);
//     setEventEnd(end);
//     setShow(true); // Directly use setShow to open the modal
//   };

//   const handleClose = () => setShow(false); // Directly use setShow to close the modal

//   const handleSaveEvent = () => {
//     if (eventTitle && eventStart && eventEnd) {
//       const newEvent = {
//         start: eventStart,
//         end: eventEnd,
//         title: eventTitle,
//         email: eventEmail,
//         notes: eventNotes,
//         attendees: eventAttendees, // Save attendees to the event
//       };
//       setEvents((prev) => [...prev, newEvent]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal
//       resetForm(); // Reset form fields
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
//     setEventTitle("");
//     setEventEmail("");
//     setEventNotes("");
//     setEventAttendees([]); // Reset attendees
//     setEventStart(null);
//     setEventEnd(null);
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
//       <Modal show={show} onHide={handleClose}>
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
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventEmail}
//                 onChange={(e) => setEventEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventNotes}
//                 onChange={(e) => setEventNotes(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Start Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventStart}
//                 onChange={(date) => setEventStart(date)}
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
//                 selected={eventEnd}
//                 onChange={(date) => setEventEnd(date)}
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
//                 value={eventAttendees}
//                 onChange={(selectedOptions) =>
//                   setEventAttendees(selectedOptions)
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

//newseven
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
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//       email: "example@example.com",
//       notes: "This is a sample event note.",
//       attendees: [
//         { label: "attendee1@example.com", value: "attendee1@example.com" },
//       ],
//     },
//   ]);

//   // State for the modal
//   const [show, setShow] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState(null);
//   const [eventEnd, setEventEnd] = useState(null);
//   const [eventEmail, setEventEmail] = useState("");
//   const [eventNotes, setEventNotes] = useState("");
//   const [eventAttendees, setEventAttendees] = useState([]); // State for attendees

//   // Function to toggle the modal's visibility
//   const toggleModal = () => setShow((prev) => !prev);

//   const handleClose = () => setShow(false);
//   const handleShow = ({ start, end }) => {
//     setEventStart(start);
//     setEventEnd(end);
//     toggleModal(); // Use the toggle function to open the modal
//   };

//   const handleSaveEvent = () => {
//     if (eventTitle && eventStart && eventEnd) {
//       const newEvent = {
//         start: eventStart,
//         end: eventEnd,
//         title: eventTitle,
//         email: eventEmail,
//         notes: eventNotes,
//         attendees: eventAttendees, // Save attendees to the event
//       };
//       setEvents((prev) => [...prev, newEvent]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal
//       resetForm(); // Reset form fields
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
//     setEventTitle("");
//     setEventEmail("");
//     setEventNotes("");
//     setEventAttendees([]); // Reset attendees
//     setEventStart(null);
//     setEventEnd(null);
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
//       <Modal show={show} onHide={handleClose}>
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
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventEmail}
//                 onChange={(e) => setEventEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventNotes}
//                 onChange={(e) => setEventNotes(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Start Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventStart}
//                 onChange={(date) => setEventStart(date)}
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
//                 selected={eventEnd}
//                 onChange={(date) => setEventEnd(date)}
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
//                 value={eventAttendees}
//                 onChange={(selectedOptions) =>
//                   setEventAttendees(selectedOptions)
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

//newSixth with  attendee

// src/Calendar.js
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
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//       email: "example@example.com",
//       notes: "This is a sample event note.",
//       attendees: [
//         { label: "attendee1@example.com", value: "attendee1@example.com" },
//       ],
//     },
//   ]);

//   // State for the modal
//   const [show, setShow] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState(null);
//   const [eventEnd, setEventEnd] = useState(null);
//   const [eventEmail, setEventEmail] = useState("");
//   const [eventNotes, setEventNotes] = useState("");
//   const [eventAttendees, setEventAttendees] = useState([]); // State for attendees

//   const handleClose = () => setShow(false);
//   const handleShow = ({ start, end }) => {
//     setEventStart(start);
//     setEventEnd(end);
//     setShow(true);
//   };

//   const handleSaveEvent = () => {
//     if (eventTitle && eventStart && eventEnd) {
//       const newEvent = {
//         start: eventStart,
//         end: eventEnd,
//         title: eventTitle,
//         email: eventEmail,
//         notes: eventNotes,
//         attendees: eventAttendees, // Save attendees to the event
//       };
//       setEvents((prev) => [...prev, newEvent]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal
//       resetForm(); // Reset form fields
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
//     setEventTitle("");
//     setEventEmail("");
//     setEventNotes("");
//     setEventAttendees([]); // Reset attendees
//     setEventStart(null);
//     setEventEnd(null);
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
//       <Modal show={show} onHide={handleClose}>
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
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventEmail}
//                 onChange={(e) => setEventEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventNotes}
//                 onChange={(e) => setEventNotes(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Start Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventStart}
//                 onChange={(date) => setEventStart(date)}
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
//                 selected={eventEnd}
//                 onChange={(date) => setEventEnd(date)}
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
//                 value={eventAttendees}
//                 onChange={(selectedOptions) =>
//                   setEventAttendees(selectedOptions)
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
//                   // Add more attendee options here or make them dynamic
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

// fourthone // src/Calendar.js
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";

// const localizer = momentLocalizer(moment); // Set the localizer for the calendar

// const EventSystem = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 0,
//       title: "Sample Event",
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//       email: "example@example.com",
//       notes: "This is a sample event note.",
//     },
//   ]);

//   // State for the modal
//   const [show, setShow] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState(null);
//   const [eventEnd, setEventEnd] = useState(null);
//   const [eventEmail, setEventEmail] = useState("");
//   const [eventNotes, setEventNotes] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = ({ start, end }) => {
//     setEventStart(start);
//     setEventEnd(end);
//     setShow(true);
//   };

//   const handleSaveEvent = () => {
//     if (eventTitle && eventStart && eventEnd) {
//       const newEvent = {
//         start: eventStart,
//         end: eventEnd,
//         title: eventTitle,
//         email: eventEmail,
//         notes: eventNotes,
//       };
//       setEvents((prev) => [...prev, newEvent]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal
//       setEventTitle(""); // Reset title
//       setEventEmail(""); // Reset email
//       setEventNotes(""); // Reset notes
//       setEventStart(null); // Reset start date
//       setEventEnd(null); // Reset end date
//     } else {
//       toast.error("Event title, start, and end time are required!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     alert(
//       `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${event.notes}`
//     );
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
//       <Modal show={show} onHide={handleClose}>
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
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventEmail}
//                 onChange={(e) => setEventEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventNotes}
//                 onChange={(e) => setEventNotes(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Start Date & Time</Form.Label>
//               <DatePicker
//                 selected={eventStart}
//                 onChange={(date) => setEventStart(date)}
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
//                 selected={eventEnd}
//                 onChange={(date) => setEventEnd(date)}
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={15}
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 placeholderText="Select end date and time"
//                 className="form-control"
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

//newThird
// src/Calendar.js
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment); // Set the localizer for the calendar

// const EventSystem = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 0,
//       title: "Sample Event",
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//       email: "example@example.com",
//       notes: "This is a sample event note.",
//     },
//   ]);

//   // State for the modal
//   const [show, setShow] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState(null);
//   const [eventEnd, setEventEnd] = useState(null);
//   const [eventEmail, setEventEmail] = useState("");
//   const [eventNotes, setEventNotes] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = ({ start, end }) => {
//     setEventStart(start);
//     setEventEnd(end);
//     setShow(true);
//   };

//   const handleSaveEvent = () => {
//     if (eventTitle) {
//       const newEvent = {
//         start: eventStart,
//         end: eventEnd,
//         title: eventTitle,
//         email: eventEmail,
//         notes: eventNotes,
//       };
//       setEvents((prev) => [...prev, newEvent]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal
//       setEventTitle(""); // Reset title
//       setEventEmail(""); // Reset email
//       setEventNotes(""); // Reset notes
//     } else {
//       toast.error("Event title is required!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     alert(
//       `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${event.notes}`
//     );
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
//       <Modal show={show} onHide={handleClose}>
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
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={eventEmail}
//                 onChange={(e) => setEventEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventNotes">
//               <Form.Label>Notes</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter notes"
//                 value={eventNotes}
//                 onChange={(e) => setEventNotes(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventTime">
//               <Form.Label>Event Time</Form.Label>
//               <p>
//                 {`From: ${moment(eventStart).format("MMMM Do YYYY, h:mm a")}
//                   To: ${moment(eventEnd).format("MMMM Do YYYY, h:mm a")}`}
//               </p>
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

// new -Second
// src/Calendar.js
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import { Modal, Button, Form } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment); // Set the localizer for the calendar

// const EventSystem = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 0,
//       title: "Sample Event",
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//     },
//   ]);

//   // State for the modal
//   const [show, setShow] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState(null);
//   const [eventEnd, setEventEnd] = useState(null);

//   const handleClose = () => setShow(false);
//   const handleShow = ({ start, end }) => {
//     setEventStart(start);
//     setEventEnd(end);
//     setShow(true);
//   };

//   const handleSaveEvent = () => {
//     if (eventTitle) {
//       const newEvent = {
//         start: eventStart,
//         end: eventEnd,
//         title: eventTitle,
//       };
//       setEvents((prev) => [...prev, newEvent]);
//       toast.success("Event created successfully!");
//       handleClose(); // Close the modal
//       setEventTitle(""); // Reset title
//     } else {
//       toast.error("Event title is required!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     alert(event.title);
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
//       <Modal show={show} onHide={handleClose}>
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
//                 value={eventTitle}
//                 onChange={(e) => setEventTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventTime">
//               <Form.Label>Event Time</Form.Label>
//               <p>
//                 {`From: ${moment(eventStart).format("MMMM Do YYYY, h:mm a")}
//                   To: ${moment(eventEnd).format("MMMM Do YYYY, h:mm a")}`}
//               </p>
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

//newone
// // src/Calendar.js
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// // import "./Calendar.css"; // Optional: You can style your calendar

// const localizer = momentLocalizer(moment); // Set the localizer for the calendar

// const EventSystem = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 0,
//       title: "Sample Event",
//       start: new Date(2024, 9, 10, 10, 0), // Year, Month (0-based), Day, Hour, Minute
//       end: new Date(2024, 9, 10, 12, 0),
//     },
//     // You can add more events here
//   ]);

//   const handleSelectSlot = ({ start, end }) => {
//     const title = window.prompt("New Event name");
//     if (title) {
//       setEvents((prev) => [...prev, { start, end, title }]);
//     }
//   };

//   const handleSelectEvent = (event) => {
//     alert(event.title);
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
//         onSelectSlot={handleSelectSlot}
//       />
//     </div>
//   );
// };

// export default EventSystem;
//#----------------------------------    old calender where list doesnot display -------------------------
//final one

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent, fetchEvents } from "../../redux/slice/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
// import { useNavigate } from "react-router-dom";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     // start: "",
//     // end: "",
//     // attendees: [],
//     email: "",
//     notes: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const events = useSelector((state) => state.events.list || []);
//   const attendees = useSelector((state) => state.attendees.list || []);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAttendees());
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const toggleModal = () => {
//     setModalOpen((prevModalState) => !prevModalState);
//   };

//   const handleSelectSlot = ({ start, end }) => {
//     setFormData({ ...formData, start, end });
//     toggleModal();
//   };

//   const handleEventSubmit = async (e) => {
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
//       // start: new Date(formData.start),
//       // end: new Date(formData.end),
//       // attendees: formData.attendees,
//       email: formData.email,
//       notes: formData.notes,
//     };

//     // Create a string of attendee names to display in the event title
//     const selectedAttendeeNames = formData.attendees
//       .map((attendeeId) => {
//         const attendee = attendees.find((a) => a.id === attendeeId);
//         return attendee ? attendee.attendee_name : null;
//       })
//       .filter(Boolean)
//       .join(", ");

//     // If attendees are selected, append them to the title
//     if (selectedAttendeeNames) {
//       formDataObject.title += ` (Attendees: ${selectedAttendeeNames})`;
//     }

//     await dispatch(createEvent(formDataObject));
//     toast.success("Event created successfully!");

//     // Fetch updated events after creation
//     dispatch(fetchEvents());

//     // Reset the form and close modal
//     toggleModal();
//     setFormData({
//       title: "",
//       // start: "",
//       // end: "",
//       // attendees: [],
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
//                 <button type="button" className="close" onClick={toggleModal}>
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
//                           <option>No attendees found.</option>
//                         )}
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
//                         placeholder="Enter event notes"
//                         value={formData.notes}
//                         onChange={(e) =>
//                           setFormData({ ...formData, notes: e.target.value })
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group row">
//                     <div className="col-sm-10 offset-sm-2">
//                       <button type="submit" className="btn btn-primary">
//                         Create Event
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

//THIRD
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent, fetchEvents } from "../../redux/slice/crm/eventSlice";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
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
//     setModalOpen((prevModalState) => !prevModalState);
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

//     // Create a string of attendee names to display in the event title
//     const selectedAttendeeNames = formData.attendees
//       .map((attendeeId) => {
//         const attendee = attendees.find((a) => a.id === attendeeId);
//         return attendee ? attendee.attendee_name : null;
//       })
//       .filter(Boolean)
//       .join(", ");

//     // If attendees are selected, append them to the title
//     if (selectedAttendeeNames) {
//       formDataObject.title += ` (Attendees: ${selectedAttendeeNames})`;
//     }

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
//                               >
//                                 {attendee.attendee_name}
//                               </span>
//                             ) : null;
//                           })}
//                         </div>
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
//                         placeholder="Add notes"
//                         value={formData.notes}
//                         onChange={(e) =>
//                           setFormData({ ...formData, notes: e.target.value })
//                         }
//                       ></textarea>
//                     </div>
//                   </div>

//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={() => setModalOpen(false)}
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

//second
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent, fetchEvents } from "../../redux/slice/crm/eventSlice";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
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
//     setModalOpen((prevModelState) => !prevModelState);
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
//                         placeholder="Enter email"
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
//                         placeholder="Add notes"
//                         value={formData.notes}
//                         onChange={(e) =>
//                           setFormData({ ...formData, notes: e.target.value })
//                         }
//                       ></textarea>
//                     </div>
//                   </div>

//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={() => setModalOpen(false)}
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
//     setModalOpen((prevModelState) => !prevModelState);
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
