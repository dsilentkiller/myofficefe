//
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  fetchEventByIdUpdate,
} from "../../../../redux/slice/admin/crm/eventSlice";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventForm from "./EventForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import "../../../css/crm/event/EventSystem.css";
import CalendarDashboard from "./CalendarDashboard";

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events?.events || []);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [eventData, setEventData] = useState({
    title: "",
    start: null,
    end: null,
    attendees: [],
    organization_name: "",
    organization_address: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShow = ({ start, end }) => {
    setEventData({ title: "", start, end, attendees: [], description: "" });
    setShowModal(true);
  };

  const handleScheduleButtonClick = () => {
    setEventData({
      title: "",
      start: null,
      end: null,
      attendees: [],
      organization_name: "",
      organization_address: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    if (event?.id) {
      navigate(`/dashboard/crm/event/detail/${event.id}`);
    } else {
      console.error("Event ID is missing or undefined");
    }
  };

  const handleSaveEvent = async (eventToSave) => {
    try {
      if (eventData.id) {
        await dispatch(
          fetchEventByIdUpdate({ id: eventData.id, eventToSave })
        ).unwrap();
        toast.success("Event updated successfully!");
      } else {
        await dispatch(createEvent(eventToSave)).unwrap();
        toast.success("Event created successfully!");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving event: ", error);
      toast.error("Failed to save event!");
    }
  };

  const handleDateClick = (date) => {
    const selectedDate = moment(date).startOf("day");
    const filteredEvents = events.filter((event) =>
      moment(event.start).isSame(selectedDate, "day")
    );
    setSelectedEvents(filteredEvents);
  };

  const resetForm = () => {
    setEventData({
      title: "",
      start: null,
      end: null,
      attendees: [],
      organization_name: "",
      organization_address: "",
      description: "",
    });
  };

  return (
    <>
      {/* Schedule Event Button */}
      {/* <div className="flex justify-end mb-4 px-4"> */}
        {/* // Inside EventSystem component */}
        {/* <button
          onClick={() => navigate("event/scheduler")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Scheduler
        </button> */}

      {/* </div> */}

      <CalendarDashboard
        events={events}
        selectedEvents={selectedEvents}
        handleSelectEvent={handleSelectEvent}
        handleShow={handleShow}
        handleDateClick={handleDateClick}
        eventData={eventData}
        setEventData={setEventData}
        handleSaveEvent={handleSaveEvent}
        showModal={showModal}
        handleClose={handleClose}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <EventForm
        eventData={eventData}
        setEventData={setEventData}
        handleSaveEvent={handleSaveEvent}
        show={showModal}
        handleClose={handleClose}
      />

      <ToastContainer />
    </>
  );
};

export default EventSystem;

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   createEvent,
//   fetchEventByIdUpdate,
// } from "../../../../redux/slice/admin/crm/eventSlice";
// import { momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";
// import "../../../css/crm/event/EventSystem.css";
// import CalendarDashboard from "./CalendarDashboard"


// const localizer = momentLocalizer(moment);


// const EventSystem = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const events = useSelector((state) => state.events?.events || []);
//   const [showModal, setShowModal] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const [eventData, setEventData] = useState({
//     title: "",
//     start: null,
//     end: null,
//     attendees: [],
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);


//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };


//   // Function to handle event selection
//   const handleSelectEvent = (event) => {
//     console.log('Selected event:', event);  // Debugging line
//     if (event && event.id) {
//       console.log('Navigating to event detail with ID:', event.id);  // Debugging line
//       navigate(`/dashboard/crm/event/detail/${event.id}`);
//     } else {
//       console.error('Event ID is missing or undefined');
//     }
//   };

//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], description: "" });
//     setShowModal(true);
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatch(
//           fetchEventByIdUpdate({ id: eventData.id, eventToSave })
//         ).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };


//   const handleDateClick = (date) => {
//     const selectedDate = moment(date).startOf("day");
//     const filteredEvents = events.filter((event) =>
//       moment(event.start).isSame(selectedDate, "day")
//     );
//     setSelectedEvents(filteredEvents);
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
//     });
//   };

//   return (
//     <>

//       <CalendarDashboard
//         events={events}
//         selectedEvents={selectedEvents}
//         handleSelectEvent={handleSelectEvent}
//         handleShow={handleShow}
//         handleDateClick={handleDateClick}
//         eventData={eventData}
//         setEventData={setEventData}
//         handleSaveEvent={handleSaveEvent}
//         showModal={showModal}
//         handleClose={handleClose}
//         darkMode={darkMode}
//         toggleDarkMode={toggleDarkMode}
//       />

//       <EventForm
//         eventData={eventData}
//         setEventData={setEventData}
//         handleSaveEvent={handleSaveEvent}
//         show={showModal}
//         handleClose={handleClose}
//       />

//       <ToastContainer />
//     </>
//   );
// };
// export default EventSystem;





















// ###############

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEvents, createEvent, fetchEventByIdUpdate } from "../../../redux/slice/admin/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";
// import "../../css/EventSystem.css"; // Import custom styles

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
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatch(fetchEventByIdUpdate({ id: eventData.id, eventToSave })).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };

//   // // Handle selecting an event from the calendar (for editing)
//   // const handleSelectEvent = (event) => {
//   //   setEventData(event); // Pre-fill the form with event details
//   //   setShowModal(true);
//   //   navigate(`/dashboard/crm/event/detail/${event.id}`);
//   // };
//   const handleSelectEvent = (event) => {
//     console.log("Selected Event:", event); // Log the event to check its structure

//     // Ensure that the event object contains a valid 'id' field
//     const eventId = event?.id || event?.event_id; // Ensure that either `id` or `event_id` is used

//     if (eventId) {
//       console.log("Navigating to event detail with ID:", eventId);
//       // Navigate to the event detail page with the event ID
//       navigate(`/dashboard/crm/event/detail/${eventId}`);
//     } else {
//       console.error("Event ID is missing or invalid.");
//       // toast.error("Event ID is missing.");
//     }
//   };

//   const handleDateClick = (date) => {
//     const selectedDate = moment(date).startOf("day");
//     const filteredEvents = events.filter((event) =>
//       moment(event.start).isSame(selectedDate, "day")
//     );
//     setSelectedEvents(filteredEvents);
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="event-system-container">
//         <h1 className="page-title">Event Management</h1>

//         {/* Calendar Component */}
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//               //  events={events}
//             events={events.map((event) => ({
//               ...event,
//               id:  event.eventId, // Ensure each event has a unique ID
//               start: new Date(event.start), // Convert start to Date object
//               end: new Date(event.end),     // Convert end to Date object
//             }))}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500, margin: "50px" }}
//             selectable
//             views={["month", "week", "day"]}
//             onSelectEvent={handleSelectEvent} // Event click handler
//             onSelectSlot={handleShow} // Date click handler
//             onNavigate={handleDateClick} // Handle date navigation
//           />
//         </div>

//         {/* Event Form Modal */}
//         <EventForm
//           eventData={eventData}
//           setEventData={setEventData}
//           handleSaveEvent={handleSaveEvent}
//           show={showModal}
//           handleClose={handleClose}
//         />

//         {/* Toast Notifications */}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default EventSystem;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEvents, createEvent, fetchEventByIdUpdate } from "../../../redux/slice/admin/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";
// import "../../css/EventSystem.css"; // Import custom styles
// import EventDetail from "./EventDetail";

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
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatch(fetchEventByIdUpdate({ id: eventData.id, eventToSave })).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     // Log the event to check its structure
//     console.log("Selected Event:", event);

//     // Ensure that the event object contains a valid 'id' field
//     const eventId = event?.id;

//     if (eventId) {
//       console.log("Navigating to event detail with ID:", eventId);
//       // Navigate to the event detail page with the event ID
//       navigate(`/dashboard/crm/event/detail/${eventId}`);
//     } else {
//       console.error("Event ID is missing or invalid.");
//       toast.error("Event ID is missing.");
//     }
//   };

//   const handleDateClick = (date) => {
//     const selectedDate = moment(date).startOf("day");
//     const filteredEvents = events.filter((event) =>
//       moment(event.start).isSame(selectedDate, "day")
//     );
//     setSelectedEvents(filteredEvents);
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="event-system-container">
//         <h1 className="page-title">Event Management</h1>

//         {/* Calendar Component */}
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//             events={events.map((event) => ({
//               ...event,
//               id: event.id || event.event_id, // Ensure event has a unique ID
//               start: new Date(event.start), // Convert start to Date object
//               end: new Date(event.end), // Convert end to Date object
//             }))}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500, margin: "50px" }}
//             selectable
//             views={["month", "week", "day"]}
//             onSelectEvent={handleSelectEvent} // Event click handler
//             onSelectSlot={handleShow} // Date click handler
//             onNavigate={handleDateClick} // Handle date navigation
//           />
//         </div>

//         {/* Event Form Modal */}
//         <EventDetail
//           eventData={eventData}
//           setEventData={setEventData}
//           handleSaveEvent={handleSaveEvent}
//           show={showModal}
//           handleClose={handleClose}
//         />

//         {/* Toast Notifications */}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default EventSystem;



// event id is missing

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEvents, createEvent, fetchEventByIdUpdate } from "../../../redux/slice/admin/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";
// import "../../css/EventSystem.css"; // Import custom styles

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
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatch(fetchEventByIdUpdate({ id: eventData.id, eventToSave })).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     console.log("Selected Event:", event); // Log the event before checking ID
//     if (event?.id) {
//       console.log("Navigating to event detail with ID:", event.id);
//       navigate(`/dashboard/crm/event/detail/${event.id}`);
//     }
//     else {
//       console.error("Event ID is undefined or null.");
//       toast.error("Event ID is missing.");
//     }
//   };


//   const handleDateClick = (date) => {
//     const selectedDate = moment(date).startOf("day");
//     const filteredEvents = events.filter((event) =>
//       moment(event.start).isSame(selectedDate, "day")
//     );
//     setSelectedEvents(filteredEvents);
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="event-system-container">
//         <h1 className="page-title">Event Management</h1>

//         {/* Calendar Component */}
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//             events={events.map((event) => ({
//               ...event,
//               id: event.id , // Assign a unique ID if missing|| uuidv4()
//               start: new Date(event.start), // Ensure start is a Date object
//               end: new Date(event.end), // Ensure end is a Date object
//             }))}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500, margin: "50px" }}
//             selectable
//             views={["month", "week", "day"]} // Ensure week and day views are enabled
//             onSelectEvent={handleSelectEvent}
//             onSelectSlot={handleShow}
//             onNavigate={handleDateClick}
//           />
//         </div>

//         {/* Display the list of events for the selected date */}
//         {/* <div className="selected-events-container">
//           <h3 className="events-header">Events on Selected Date</h3>
//           {selectedEvents.length > 0 ? (
//             <div className="event-cards-container">
//               {selectedEvents.map((event) => (
//                 <div key={event.id} className="event-card">
//                   <h4 className="event-title">{event.title}</h4>
//                   <p className="event-time">
//                     {moment(event.start).format("YYYY-MM-DD HH:mm")}
//                   </p>
//                   <p className="event-description">{event.description}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No events for this date.</p>
//           )}
//         </div> */}

//         {/* Event Form Modal */}
//         <EventForm
//           eventData={eventData}
//           setEventData={setEventData}
//           handleSaveEvent={handleSaveEvent}
//           show={showModal}
//           handleClose={handleClose}
//         />

//         {/* Toast Notifications */}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default EventSystem;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   createEvent,
//   fetchEventByIdUpdate,
// } from "../../../redux/slice/admin/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";
// import "../../css/EventSystem.css"; // Import custom styles

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
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatch(
//           fetchEventByIdUpdate({ id: eventData.id, eventToSave })
//         ).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };
//   // const handleSelectEvent = (event) => {
//   //   setEventData(event);
//   //   setShowModal(true);
//   //   console.log("Navigating to event detail with ID:", event.id);
//   //   navigate(`/dashboard/crm/event/detail/${event.id}`);
//   // };
//   const handleSelectEvent = (event) => {
//     // setEventData(event);
//     // setShowModal(true);
//     console.log("Selected Event:", event); // Log the event before checking ID
//     if (event?.id) {
//       console.log("Navigating to event detail with ID:", event.id);
//       navigate(`/dashboard/crm/event/detail/${event.id}`);
//     } else {
//       console.error("Event ID is undefined or null.");
//       toast.error("Event ID is missing.");
//     }
//   };

//   const handleDateClick = (date) => {
//     const selectedDate = moment(date).startOf("day");
//     const filteredEvents = events.filter((event) =>
//       moment(event.start).isSame(selectedDate, "day")
//     );
//     setSelectedEvents(filteredEvents);
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="event-system-container">
//         <h1 className="page-title">Event Management</h1>

//         {/* Calendar Component */}
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//             events={events.map((event) => ({
//               ...event,
//               id:event.id,//passing event id
//               start: new Date(event.start), // Ensure start is a Date object
//               end: new Date(event.end), // Ensure end is a Date object
//             }))}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500, margin: "50px" }}
//             selectable
//             views={["month", "week", "day"]} // Ensure week and day views are enabled
//             onSelectEvent={handleSelectEvent}
//             onSelectSlot={handleShow}
//             onNavigate={handleDateClick}
//           />
//         </div>

//         {/* Display the list of events for the selected date */}
//         <div className="selected-events-container">
//           <h3 className="events-header">Events on Selected Date</h3>
//           {selectedEvents.length > 0 ? (
//             <div className="event-cards-container">
//               {selectedEvents.map((event) => (
//                 <div key={event.id} className="event-card">
//                   <h4 className="event-title">{event.title}</h4>
//                   <p className="event-time">
//                     {moment(event.start).format("YYYY-MM-DD HH:mm")}
//                   </p>
//                   <p className="event-description">{event.description}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No events for this date.</p>
//           )}
//         </div>

//         {/* Event Form Modal */}
//         <EventForm
//           eventData={eventData}
//           setEventData={setEventData}
//           handleSaveEvent={handleSaveEvent}
//           show={showModal}
//           handleClose={handleClose}
//         />

//         {/* Toast Notifications */}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default EventSystem;

//2 nd -------

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   createEvent,
//   updateEvent,
// } from "../../../redux/slice/admin/crm/eventSlice";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import EventForm from "./EventForm";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useNavigate } from "react-router-dom";
// import "../../css/EventSystem.css"; // Import custom styles

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
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleShow = ({ start, end }) => {
//     setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatchfetchEventByIdUpdate({ id: eventData.id, eventToSave })).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//       }
//       handleClose();
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     setEventData(event);
//     setShowModal(true);
//     navigate(`/dashboard/crm/event/detail/${event.id}`);
//   };

//   const handleDateClick = (date) => {
//     const selectedDate = moment(date).startOf("day");
//     const filteredEvents = events.filter((event) =>
//       moment(event.start).isSame(selectedDate, "day")
//     );
//     setSelectedEvents(filteredEvents);
//   };

//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="event-system-container">
//         <h1 className="page-title">Event Management</h1>

//         {/* Calendar Component */}
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500, margin: "50px" }}
//             selectable
//             onSelectEvent={handleSelectEvent}
//             onSelectSlot={handleShow}
//             onNavigate={handleDateClick}
//           />
//         </div>

//         {/* Display the list of events for the selected date */}
//         <div className="selected-events-container">
//           <h3 className="events-header">Events on Selected Date</h3>
//           {selectedEvents.length > 0 ? (
//             <div className="event-cards-container">
//               {selectedEvents.map((event) => (
//                 <div key={event.id} className="event-card">
//                   <h4 className="event-title">{event.title}</h4>
//                   <p className="event-time">
//                     {moment(event.start).format("YYYY-MM-DD HH:mm")}
//                   </p>
//                   <p className="event-description">{event.description}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No events for this date.</p>
//           )}
//         </div>

//         {/* Event Form Modal */}
//         <EventForm
//           eventData={eventData}
//           setEventData={setEventData}
//           handleSaveEvent={handleSaveEvent}
//           show={showModal}
//           handleClose={handleClose}
//         />

//         {/* Toast Notifications */}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default EventSystem;

//3nd event system

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEvents,
//   createEvent,
//   updateEvent,
// } from "../../../redux/slice/admin/crm/eventSlice";
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
//     organization_name: "",
//     organization_address: "",
//     description: "",
//   });
//   const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

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

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         // await dispatchfetchEventByIdUpdate({ id: eventData.id, eventToSave })).unwrap();
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
//     navigate(`/dashboard/crm/event/detail/${event.id}`);
//   };

//   // Handle selecting a date in the calendar
//   const handleDateClick = (date) => {
//     // Filter events based on the selected date
//     const selectedDate = moment(date).startOf("day"); // Normalize to start of the day
//     const filteredEvents = events.filter(
//       (event) => moment(event.start).isSame(selectedDate, "day") // Compare the date part of event.start
//     );
//     setSelectedEvents(filteredEvents); // Update the state with events for the selected date
//   };

//   // Reset the form after close
//   const resetForm = () => {
//     setEventData({
//       title: "",
//       start: null,
//       end: null,
//       attendees: [],
//       organization_name: "",
//       organization_address: "",
//       description: "",
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
//         onNavigate={handleDateClick} // Handle date click to show events
//       />

//       {/* Display the list of events for the selected date */}
//       <div>
//         <h3>Events on Selected Date:</h3>
//         {selectedEvents.length > 0 ? (
//           <ul>
//             {selectedEvents.map((event) => (
//               <li key={event.id}>
//                 <h4>{event.title}</h4>
//                 <p>{moment(event.start).format("YYYY-MM-DD HH:mm")}</p>
//                 <p>{event.description}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No events for this date.</p>
//         )}
//       </div>

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

// // const localizer = momentLocalizer(moment);

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
// //         evt === selectedEvent ? { ...newEvent, attendees: newEvent.attendees.map(a => a.label) } : evt
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
// //           attendees: newEvent.attendees.map(a => a.label), // Get the labels (names) of attendees
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
// //       attendees: newEvent.attendees.map((attendee) => attendee.value).join(", "),
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
// //   const handleSelectEvent = (event) => {
// //     setSelectedEvent(event);
// //     setNewEvent({ ...event, attendees: event.attendees.map(a => ({ value: a, label: a })) });
// //     setModalOpen(true);
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
// //     });
// //     toast.info("Action canceled.");
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <div className="container-fluid">
// //           <div className="row mb-2">
// //             <div className="col-sm-6">
// //               <h1>CRM Event Calendar</h1>
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
// //                     className="calendar-custom"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <ReactModal
// //         isOpen={modalOpen}
// //         onRequestClose={closeModal}
// //         ariaHideApp={false}
// //         className="modal-dialog-centered modal-dialog modal-lg"
// //         overlayClassName="modal-backdrop fade show"
// //       >
// //         <div className="modal-content">
// //           <div className="modal-header">
// //             <h5 className="modal-title">
// //               {selectedEvent ? "Update Event" : "Create Event"}
// //             </h5>
// //             <button type="button" className="close" onClick={closeModal}>
// //               <span>&times;</span>
// //             </button>
// //           </div>
// //           <div className="modal-body">
// //             <form onSubmit={handleEventSubmit}>
// //               <div className="form-group">
// //                 <label>Event Title</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   name="title"
// //                   placeholder="Enter Event Title"
// //                   value={newEvent.title}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, title: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Start Time</label>
// //                 <input
// //                   type="datetime-local"
// //                   className="form-control"
// //                   name="start"
// //                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, start: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>End Time</label>
// //                 <input
// //                   type="datetime-local"
// //                   className="form-control"
// //                   name="end"
// //                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, end: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Attendees</label>
// //                 <Select
// //                   isMulti
// //                   options={attendeesOptions}
// //                   value={newEvent.attendees}
// //                   onChange={(selected) =>
// //                     setNewEvent({ ...newEvent, attendees: selected })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Email</label>
// //                 <input
// //                   type="email"
// //                   className="form-control"
// //                   name="email"
// //                   placeholder="Attendee Email"
// //                   value={newEvent.email}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, email: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Notes</label>
// //                 <textarea
// //                   className="form-control"
// //                   name="notes"
// //                   placeholder="Enter any notes"
// //                   value={newEvent.notes}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, notes: e.target.value })
// //                   }
// //                 />
// //               </div>
// //               <div className="modal-footer">
// //                 <button type="submit" className="btn btn-primary">
// //                   {selectedEvent ? "Update Event" : "Create Event"}
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={closeModal}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </ReactModal>

// //       {/* Toast Container for notifications */}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default EventSystem;import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import CreateEventModal from "./CreateEventModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";
// import emailjs from "emailjs-com";

// // const localizer = momentLocalizer(moment);

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
// //         evt === selectedEvent ? { ...newEvent, attendees: newEvent.attendees.map(a => a.label) } : evt
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
// //           attendees: newEvent.attendees.map(a => a.label), // Get the labels (names) of attendees
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
// //       attendees: newEvent.attendees.map((attendee) => attendee.value).join(", "),
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
// //   const handleSelectEvent = (event) => {
// //     setSelectedEvent(event);
// //     setNewEvent({ ...event, attendees: event.attendees.map(a => ({ value: a, label: a })) });
// //     setModalOpen(true);
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
// //     });
// //     toast.info("Action canceled.");
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <div className="container-fluid">
// //           <div className="row mb-2">
// //             <div className="col-sm-6">
// //               <h1>CRM Event Calendar</h1>
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
// //                     className="calendar-custom"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <ReactModal
// //         isOpen={modalOpen}
// //         onRequestClose={closeModal}
// //         ariaHideApp={false}
// //         className="modal-dialog-centered modal-dialog modal-lg"
// //         overlayClassName="modal-backdrop fade show"
// //       >
// //         <div className="modal-content">
// //           <div className="modal-header">
// //             <h5 className="modal-title">
// //               {selectedEvent ? "Update Event" : "Create Event"}
// //             </h5>
// //             <button type="button" className="close" onClick={closeModal}>
// //               <span>&times;</span>
// //             </button>
// //           </div>
// //           <div className="modal-body">
// //             <form onSubmit={handleEventSubmit}>
// //               <div className="form-group">
// //                 <label>Event Title</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   name="title"
// //                   placeholder="Enter Event Title"
// //                   value={newEvent.title}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, title: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Start Time</label>
// //                 <input
// //                   type="datetime-local"
// //                   className="form-control"
// //                   name="start"
// //                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, start: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>End Time</label>
// //                 <input
// //                   type="datetime-local"
// //                   className="form-control"
// //                   name="end"
// //                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, end: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Attendees</label>
// //                 <Select
// //                   isMulti
// //                   options={attendeesOptions}
// //                   value={newEvent.attendees}
// //                   onChange={(selected) =>
// //                     setNewEvent({ ...newEvent, attendees: selected })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Email</label>
// //                 <input
// //                   type="email"
// //                   className="form-control"
// //                   name="email"
// //                   placeholder="Attendee Email"
// //                   value={newEvent.email}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, email: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Notes</label>
// //                 <textarea
// //                   className="form-control"
// //                   name="notes"
// //                   placeholder="Enter any notes"
// //                   value={newEvent.notes}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, notes: e.target.value })
// //                   }
// //                 />
// //               </div>
// //               <div className="modal-footer">
// //                 <button type="submit" className="btn btn-primary">
// //                   {selectedEvent ? "Update Event" : "Create Event"}
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={closeModal}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </ReactModal>

// //       {/* Toast Container for notifications */}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default EventSystem;import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import CreateEventModal from "./CreateEventModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.min.css";
// import "font-awesome/css/font-awesome.min.css";
// import emailjs from "emailjs-com";

// // const localizer = momentLocalizer(moment);

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
// //         evt === selectedEvent ? { ...newEvent, attendees: newEvent.attendees.map(a => a.label) } : evt
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
// //           attendees: newEvent.attendees.map(a => a.label), // Get the labels (names) of attendees
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
// //       attendees: newEvent.attendees.map((attendee) => attendee.value).join(", "),
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
// //   const handleSelectEvent = (event) => {
// //     setSelectedEvent(event);
// //     setNewEvent({ ...event, attendees: event.attendees.map(a => ({ value: a, label: a })) });
// //     setModalOpen(true);
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
// //     });
// //     toast.info("Action canceled.");
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <section className="content-header">
// //         <div className="container-fluid">
// //           <div className="row mb-2">
// //             <div className="col-sm-6">
// //               <h1>CRM Event Calendar</h1>
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
// //                     className="calendar-custom"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <ReactModal
// //         isOpen={modalOpen}
// //         onRequestClose={closeModal}
// //         ariaHideApp={false}
// //         className="modal-dialog-centered modal-dialog modal-lg"
// //         overlayClassName="modal-backdrop fade show"
// //       >
// //         <div className="modal-content">
// //           <div className="modal-header">
// //             <h5 className="modal-title">
// //               {selectedEvent ? "Update Event" : "Create Event"}
// //             </h5>
// //             <button type="button" className="close" onClick={closeModal}>
// //               <span>&times;</span>
// //             </button>
// //           </div>
// //           <div className="modal-body">
// //             <form onSubmit={handleEventSubmit}>
// //               <div className="form-group">
// //                 <label>Event Title</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   name="title"
// //                   placeholder="Enter Event Title"
// //                   value={newEvent.title}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, title: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Start Time</label>
// //                 <input
// //                   type="datetime-local"
// //                   className="form-control"
// //                   name="start"
// //                   value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, start: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>End Time</label>
// //                 <input
// //                   type="datetime-local"
// //                   className="form-control"
// //                   name="end"
// //                   value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, end: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Attendees</label>
// //                 <Select
// //                   isMulti
// //                   options={attendeesOptions}
// //                   value={newEvent.attendees}
// //                   onChange={(selected) =>
// //                     setNewEvent({ ...newEvent, attendees: selected })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Email</label>
// //                 <input
// //                   type="email"
// //                   className="form-control"
// //                   name="email"
// //                   placeholder="Attendee Email"
// //                   value={newEvent.email}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, email: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Notes</label>
// //                 <textarea
// //                   className="form-control"
// //                   name="notes"
// //                   placeholder="Enter any notes"
// //                   value={newEvent.notes}
// //                   onChange={(e) =>
// //                     setNewEvent({ ...newEvent, notes: e.target.value })
// //                   }
// //                 />
// //               </div>
// //               <div className="modal-footer">
// //                 <button type="submit" className="btn btn-primary">
// //                   {selectedEvent ? "Update Event" : "Create Event"}
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={closeModal}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </ReactModal>

// //       {/* Toast Container for notifications */}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default EventSystem;
