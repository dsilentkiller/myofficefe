// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from "axios";

// // Set up the localizer by providing the moment (or globalize) Object to the correct localizer.
// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   // Fetch events from the backend
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("/api/event/");
//       const fetchedEvents = response.data.result.map((event) => ({
//         id: event.id,
//         title: event.title,
//         start: new Date(event.start),
//         end: new Date(event.end),
//         email: event.email,
//         notes: event.notes,
//       }));
//       setEvents(fetchedEvents);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   // Handle event creation
//   const handleSelectSlot = async ({ start, end }) => {
//     const title = window.prompt("Enter Event Title");
//     const email = window.prompt("Enter Organizer Email");
//     const notes = window.prompt("Enter Notes");

//     if (title && email) {
//       try {
//         const newEvent = {
//           title,
//           start,
//           end,
//           email,
//           notes,
//         };

//         // Send new event to the backend
//         const response = await axios.post("/api/event/create/", newEvent);

//         if (response.data.success) {
//           // Fetch the updated events
//           fetchEvents();
//         } else {
//           console.error("Error creating event:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error creating event:", error);
//       }
//     }
//   };

//   // Load events when component mounts
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <div style={{ height: "500px", margin: "50px" }}>
//       <h2>Event Calendar</h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         selectable={true}
//         onSelectSlot={handleSelectSlot}
//         onSelectEvent={(event) =>
//           alert(
//             `Event Title: ${event.title}\nEmail: ${event.email}\nNotes: ${event.notes}`
//           )
//         }
//       />
//     </div>
//   );
// };

// export default EventSystem;

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { createEvent, fetchEvents } from "../../redux/slice/crm/eventSlice"; // Import createEvent and fetchEvents
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events?.events || []); // Access events from the Redux state
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    start: null,
    end: null,
    email: "",
    notes: "",
  });

  // Fetch events when the component mounts
  useEffect(() => {
    dispatch(fetchEvents()); // Dispatch the fetchEvents action
    console.log("Fetched Events: ", fetchEvents); // Debug fetched data
  }, [dispatch]);

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
    resetForm();
  };

  const handleSaveEvent = async () => {
    const { title, start, end } = eventData;
//check it all fields are filled  
    if (!title || !start || !end) {
      toast.error("Event title, start, and end time are required!");
      return;
    }

    try {
      await dispatch(createEvent(eventData)).unwrap();
      toast.success("Event created successfully!");
      handleClose();
    } catch (error) {
      console.error("Error creating event: ", error); //log the error
      toast.error("Failed to create event!");
    }
  };

  const resetForm = () => {
    setEventData({
      title: "",
      start: null,
      end: null,
      email: "",
      notes: "",
    });
  };

  const handleSelectEvent = (event) => {
    //display event details when an event is clicked
    alert(
      `Title: ${event.title}\nEmail: ${event.email}\nNotes: ${event.notes}`
    );
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
        onSelectSlot={handleShow}
      />

      <Modal show={showModal} onHide={handleClose}>
        {/* Modal content */}
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default EventSystem;
