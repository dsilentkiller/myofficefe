import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  updateEvent,
} from "../../redux/slice/crm/eventSlice";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventForm from "./EventForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events?.events || []);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    start: null,
    end: null,
    attendees: [],
    notes: "",
  });
  const [attendeeIds, setAttendeeIds] = useState([]);

  // Fetch events when the component mounts
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle showing the modal for new event creation
  const handleShow = ({ start, end }) => {
    setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
    setShowModal(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSaveEvent = async (eventToSave) => {
    try {
      if (eventData.id) {
        await dispatch(updateEvent({ id: eventData.id, eventToSave })).unwrap();
        toast.success("Event updated successfully!");
      } else {
        await dispatch(createEvent(eventToSave)).unwrap(); // Pass the correct data
        toast.success("Event created successfully!");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving event: ", error);
      toast.error("Failed to save event!");
    }
  };

  // Handle selecting an event from the calendar (for editing)
  const handleSelectEvent = (event) => {
    setEventData(event); // Pre-fill the form with event details
    setShowModal(true);
    navigate(`/dashboard/crm/event/detail/${event.id}/`);
  };

  // Reset the form after close
  const resetForm = () => {
    setEventData({
      title: "",
      start: null,
      end: null,
      attendees: [],
      notes: "",
    });
    setAttendeeIds([]);
  };

  return (
    <div className="content-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectEvent={handleSelectEvent} // For editing event
        onSelectSlot={handleShow} // For creating new event
      />

      {/* Reusable EventForm Component */}
      <EventForm
        eventData={eventData}
        setEventData={setEventData}
        handleSaveEvent={handleSaveEvent}
        show={showModal}
        handleClose={handleClose}
      />

      <ToastContainer />
    </div>
  );
};

export default EventSystem;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   createEvent,
//   updateEvent,
// } from "../../redux/slice/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";

// const localizer = momentLocalizer(moment);

// const EventSystem = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const events = useSelector((state) => state.events?.events || []);
//   const [showModal, setShowModal] = useState(false);
//   const [eventData, setEventData] = useState({
//     title: "",
//     start: null,
//     end: null,
//     attendees: [],
//     notes: "",
//   });
//   const [attendeeIds, setAttendeeIds] = useState(
//     Array.isArray(eventData.attendees)
//       ? eventData.attendees.map((attendee) => attendee.id)
//       : []
//   );

//   // Fetch events when the component mounts
//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   // Handle showing the modal for new event creation
//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
//     setShowModal(true);
//   };

//   // Handle closing the modal
//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = async () => {
//     const eventToSave = {
//       ...eventData,
//       attendees: attendeeIds.filter((id) => id !== ""), // Only send valid IDs
//       start: eventData.start ? eventData.start.toISOString() : null,
//       end: eventData.end ? eventData.end.toISOString() : null,
//     };

//     try {
//       if (eventData.id) {
//         await dispatch(updateEvent({ id: eventData.id, eventData })).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap(); // Pass the correct data
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };

//   // Handle selecting an event from the calendar (for editing)
//   const handleSelectEvent = (event) => {
//     setEventData(event); // Pre-fill the form with event details
//     setShowModal(true);
//     navigate(`/dashboard/crm/event/detail/${event.id}/`); //event/detail/1/`123
//   };

//   // Reset the form after close
//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       notes: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500, margin: "50px" }}
//         selectable
//         onSelectEvent={handleSelectEvent} // For editing event
//         onSelectSlot={handleShow} // For creating new event
//       />

//       {/* Reusable EventForm Component */}
//       <EventForm
//         eventData={eventData}
//         setEventData={setEventData}
//         handleSaveEvent={handleSaveEvent}
//         show={showModal}
//         handleClose={handleClose}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default EventSystem;
