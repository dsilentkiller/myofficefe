import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  fetchEventByIdUpdate,
} from "../../redux/slice/crm/eventSlice";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventForm from "./EventForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import "../../css/EventSystem.css"; // Import custom styles

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
    organization_name: "",
    organization_address: "",
    description: "",
  });
  const [selectedEvents, setSelectedEvents] = useState([]); // State to store events for selected date

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleShow = ({ start, end }) => {
    setEventData({ title: "", start, end, attendees: [], notes: "" }); // Reset form for new event
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
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
  // const handleSelectEvent = (event) => {
  //   setEventData(event);
  //   setShowModal(true);
  //   console.log("Navigating to event detail with ID:", event.id);
  //   navigate(`/dashboard/crm/event/detail/${event.id}`);
  // };
  const handleSelectEvent = (event) => {
    // setEventData(event);
    // setShowModal(true);
    console.log("Selected Event:", event); // Log the event before checking ID
    if (event?.id) {
      console.log("Navigating to event detail with ID:", event.id);
      navigate(`/dashboard/crm/event/detail/${event.id}`);
    }
    else {
      console.error("Event ID is undefined or null.");
      toast.error("Event ID is missing.");
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
    <div className="content-wrapper">
      <div className="event-system-container">
        <h1 className="page-title">Event Management</h1>

        {/* Calendar Component */}
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events.map((event) => ({
              ...event,
              id:event.id,//passing event id
              start: new Date(event.start), // Ensure start is a Date object
              end: new Date(event.end), // Ensure end is a Date object
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            selectable
            views={["month", "week", "day"]} // Ensure week and day views are enabled
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleShow}
            onNavigate={handleDateClick}
          />
        </div>

        {/* Display the list of events for the selected date */}
        <div className="selected-events-container">
          <h3 className="events-header">Events on Selected Date</h3>
          {selectedEvents.length > 0 ? (
            <div className="event-cards-container">
              {selectedEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-time">
                    {moment(event.start).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events for this date.</p>
          )}
        </div>

        {/* Event Form Modal */}
        <EventForm
          eventData={eventData}
          setEventData={setEventData}
          handleSaveEvent={handleSaveEvent}
          show={showModal}
          handleClose={handleClose}
        />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default EventSystem;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEvents, createEvent, fetchEventByIdUpdate } from "../../redux/slice/crm/eventSlice";
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
// import { fetchEvents, createEvent, fetchEventByIdUpdate } from "../../redux/slice/crm/eventSlice";
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
// import { fetchEvents, createEvent, fetchEventByIdUpdate } from "../../redux/slice/crm/eventSlice";
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
// } from "../../redux/slice/crm/eventSlice";
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
// } from "../../redux/slice/crm/eventSlice";
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
