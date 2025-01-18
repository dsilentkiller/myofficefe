
// //reschdule and cancel
// import React, { useEffect, useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";  // Importing modal and form for rescheduling
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById, fetchEventByIdUpdate, deleteEvent } from "../../redux/slice/crm/eventSlice";
// import EventDelete from "./EventDelete"; // Adjust the path as necessary
// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
// import moment from "moment"; // For time manipulation

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   const navigate = useNavigate();

//   const [eventToDelete, setEventToDelete] = useState(null);
//   const [showRescheduleModal, setShowRescheduleModal] = useState(false); // State for reschedule modal
//   const [newStartTime, setNewStartTime] = useState(selectedEvent?.start || ""); // New start time for reschedule
//   const [newEndTime, setNewEndTime] = useState(selectedEvent?.end || ""); // New end time for reschedule

//   useEffect(() => {
//     dispatch(fetchEventById(id)); // Fetch event by ID when component mounts
//   }, [dispatch, id]);

//   const handleRescheduleEvent = () => {
//     if (newStartTime && newEndTime) {
//       const updatedEvent = {
//         ...selectedEvent,
//         start: newStartTime,
//         end: newEndTime,
//       };

//       dispatch(fetchEventByIdUpdate({ id: selectedEvent.id, eventToSave: updatedEvent }))
//         .then(() => {
//           toast.success("Event rescheduled successfully!");
//           setShowRescheduleModal(false); // Close modal after successful update
//         })
//         .catch(() => {
//           toast.error("Failed to reschedule the event.");
//         });
//     } else {
//       toast.error("Please provide both start and end times.");
//     }
//   };

//   const handleCancelEvent = () => {
//     dispatch(deleteEvent(id))
//       .then(() => {
//         toast.success("Event deleted successfully!");
//         navigate("/dashboard/crm/events"); // Redirect to event list after deletion
//       })
//       .catch(() => {
//         toast.error("Failed to delete the event.");
//       });
//   };

//   if (!selectedEvent) {
//     return <div>Loading event details...</div>;  // Show loading until event is loaded
//   }

//   return (
//     <div>
//       {/* Only display event details if selectedEvent is available */}
//       {selectedEvent ? (
//         <>
//           <h2>{selectedEvent.title}</h2>
//           <p>
//             <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
//           </p>
//           <p>
//             <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//           </p>
//           <p>
//             <strong>Description:</strong> {selectedEvent.description}
//           </p>
//           <h5>Attendees</h5>
//           {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//             <ul>
//               {selectedEvent.attendees.map((attendee) => (
//                 <li key={attendee.id}>
//                   {attendee.attendee_name} ({attendee.email})
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No attendees available for this event.</p>
//           )}

//           {/* Reschedule Button */}
//           <Button variant="primary" onClick={() => setShowRescheduleModal(true)}>
//             Reschedule Event
//           </Button>

//           {/* Cancel Event Button */}
//           <Button
//             variant="danger"
//             onClick={() => setEventToDelete(selectedEvent.id)}
//             className="ms-2"
//           >
//             Delete Event
//           </Button>

//           {/* Reschedule Modal */}
//           <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Reschedule Event</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <Form.Group controlId="startTime">
//                   <Form.Label>Start Time</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     value={newStartTime}
//                     onChange={(e) => setNewStartTime(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="endTime" className="mt-3">
//                   <Form.Label>End Time</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     value={newEndTime}
//                     onChange={(e) => setNewEndTime(e.target.value)}
//                   />
//                 </Form.Group>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowRescheduleModal(false)}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleRescheduleEvent}>
//                 Reschedule Event
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Delete Confirmation Modal */}
//           {eventToDelete !== null && (
//             <EventDelete
//               id={eventToDelete}
//               onClose={() => setEventToDelete(null)}
//               // Removed toast.success from here
//             />
//           )}
//         </>
//       ) : (
//         <p>No event found!</p>
//       )}

//       <ToastContainer /> {/* Ensure this is included for toast notifications */}
//     </div>
//   );
// };

// export default EventDetail;

// event detail work great
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../../redux/slice/crm/eventSlice";
import EventDelete from "./EventDelete"; // Adjust the path as necessary
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const EventDetail = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  // const loading = useSelector((state) => state.events.loading);
  // const error = useSelector((state) => state.events.error);
  const navigate = useNavigate();

  const [eventToDelete, setEventToDelete] = useState(null);
  // const { selectedEvent, loading, error } = useSelector((state) => ({
  //   selectedEvent: state.events.selectedEvent,
  //   loading: state.events.loading,
  //   error: state.events.error,
  // }));
  useEffect(() => {
    dispatch(fetchEventById(id)); // Fetch event by ID when component mounts
  }, [dispatch, id]);
  if (!selectedEvent) {
    return <div>Loading event details...</div>;  // Show loading until event is loaded
  }
  // useEffect(() => {
  //   console.log("Event:", event);
  //   console.log("Loading:", loading);
  //   console.log("Error:", error);
  // }, [event, loading, error]);

  // if (loading) {
  //   return <p>Loading event details...</p>;
  // }

  // if (error) {
  //   const errorMessage = error.detail || "An unknown error occurred.";
  //   return <p>Error: {errorMessage}</p>;
  // }

  // if (!event) {
  //   return <p>No event found!</p>;
  // }

  return (
    <div>
      {/* Only display event details if selectedEvent is available */}
      {selectedEvent ? (
        <>
      <h2>{selectedEvent.title}</h2>
      <p>
        <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
      </p>
      <p>
        <strong>description:</strong> {selectedEvent.description}
      </p>
      <h5>Attendees</h5>
      {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
        <ul>
          {selectedEvent.attendees.map((attendee) => (
            <li key={attendee.id}>
              {attendee.attendee_name} ({attendee.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendees available for this selectedEvent.</p>
      )}
      <Button
        variant="primary"
        onClick={() => navigate(`/dashboard/crm/event/update/${selectedEvent.id}`)}
      >
        Update Event
      </Button>
      <Button
        variant="danger"
        onClick={() => setEventToDelete(selectedEvent.id)}
        className="ms-2"
      >
        Delete Event
      </Button>
      {/* Delete Confirmation Modal */}
      {eventToDelete !== null && (
        <EventDelete
          id={eventToDelete}
          onClose={() => setEventToDelete(null)}
          // Removed toast.success from here
        />
      )}

        </>
      ) : (
        <p>No event found!</p>
      )}
      <ToastContainer /> {/* Ensure this is included for toast notifications */}
    </div>
  );
};

export default EventDetail;












// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchEventById } from "../../redux/slice/crm/eventSlice";
// import { Spinner, Alert, Card } from "react-bootstrap";

// const EventDetail = () => {
//   const { id } = useParams(); // Get event ID from route parameters
//   console.log('id',id)
//   const dispatch = useDispatch();

  // const { selectedEvent, loading, error } = useSelector((state) => ({
  //   selectedEvent: state.events.selectedEvent,
  //   loading: state.events.loading,
  //   error: state.events.error,
  // }));

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEventById(id));
//     }
//   }, [dispatch, id]);

//   if (loading) {
//     return <Spinner animation="border" className="d-block mx-auto" />;
//   }

//   if (error) {
//     return <Alert variant="danger">Error: {error}</Alert>;
//   }

//   if (!selectedEvent) {
//     return <Alert variant="warning">No event details found.</Alert>;
//   }

//   const {
//     title,
//     description,
//     organization_name,
//     organization_address,
//     start,
//     end,
//     attendees,
//   } = selectedEvent;
//   console.log('selected event is',selectedEvent)

//   return (
//     <div className="container mt-5">
//       <Card className="event-detail-card">
//         <Card.Header>
//           <h2>{title}</h2>
//         </Card.Header>
//         <Card.Body>
//           <p>
//             <strong>Description:</strong> {description}
//           </p>
//           <p>
//             <strong>Organization:</strong> {organization_name}
//           </p>
//           <p>
//             <strong>Address:</strong> {organization_address}
//           </p>
//           <p>
//             <strong>Start Date:</strong> {new Date(start).toLocaleString()}
//           </p>
//           <p>
//             <strong>End Date:</strong> {new Date(end).toLocaleString()}
//           </p>
//           <h4>Attendees:</h4>
//           {attendees && attendees.length > 0 ? (
//             <ul>
//               {attendees.map((attendee, index) => (
//                 <li key={index}>
//                   {attendee.name} ({attendee.email})
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No attendees registered.</p>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default EventDetail;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById } from "../../redux/slice/crm/eventSlice"; // The action to fetch event details by ID
// import { useParams } from "react-router-dom"; // To access the event ID from URL
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from URL
//   const dispatch = useDispatch();


//   const { currentEvent, loading, error } = useSelector((state) => state.events || {});


//   useEffect(() => {
//     if (id) {
//       console.log("Event ID:", id);
//       dispatch(fetchEventById(id));
//     } else {
//       console.error("Event ID is undefined or null.");
//     }
//   }, [dispatch, id]);


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     toast.error(`Error: ${error}`);
//     return <div>Error loading event details!</div>;
//   }

//   if (!currentEvent) {
//     return <div>No event found.</div>;
//   }

//   const { title, start, end, attendees, organization_name, organization_address, description } = currentEvent;

//   return (
//     <div className="event-detail-page">
//       <h1>Event Details</h1>

//       <div className="event-detail-container">
//         <h2>{title}</h2>
//         <p><strong>Start Time:</strong> {new Date(start).toLocaleString()}</p>
//         <p><strong>End Time:</strong> {new Date(end).toLocaleString()}</p>

//         <h3>Organization Details:</h3>
//         <p><strong>Organization Name:</strong> {organization_name}</p>
//         <p><strong>Address:</strong> {organization_address}</p>

//         <h3>Description:</h3>
//         <p>{description}</p>

//         <h3>Attendees:</h3>
//         <ul>
//           {attendees && attendees.length > 0 ? (
//             attendees.map((attendee, index) => (
//               <li key={index}>{attendee}</li>
//             ))
//           ) : (
//             <li>No attendees listed.</li>
//           )}
//         </ul>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EventDetail;

//1st
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById } from "../../redux/slice/crm/eventSlice";
// import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice"; // Import to fetch attendees
// import { useParams } from "react-router-dom";

// const EventDetail = () => {
//   const { id } = useParams();

//   if (!id) {
//     console.error("Event ID is undefined!");
//   }

//   const dispatch = useDispatch();
//   const event = useSelector((state) => state.events.sselectedEvent);
//   const loading = useSelector((state) => state.events.loading);
//   const error = useSelector((state) => state.events.error);
//   const attendees = useSelector((state) => state.attendees.list || []);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEventById(id));
//       dispatch(fetchAttendees()); // Fetch attendees for their names
//     } else {
//       console.error("Event ID is undefined. Cannot fetch event details.");
//     }
//   }, [dispatch, id]);
//   if (!id) {
//     return (
//       <p>Error: Event ID is missing. Please check the URL or try again.</p>
//     );
//   }

//   if (loading) {
//     return <p>Loading event details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.detail || "An unknown error occurred."}</p>;
//   }

//   if (!event) {
//     return <p>No event found!</p>;
//   }

//   return (
//     // <div>
//     //   <h2>{selectedEvent.title}</h2>
//     //   <div>
//     //     <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
//     //   </div>
//     //   <div>
//     //     <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//     //   </div>
//     //   <div>
//     //     <strong>organization name:</strong>{" "}
//     //     {new Date(selectedEvent.end).toLocaleString()}
//     //   </div>
//     //   <div>
//     //     <strong>organization address:</strong>{" "}
//     //     {new Date(selectedEvent.end).toLocaleString()}
//     //   </div>
//     //   <div>
//     //     <h5>Attendees</h5>
//     //     {selectedEvent.attendees_details && selectedEvent.attendees_details.length > 0 ? (
//     //       <ul>
//     //         {selectedEvent.attendees_details.map((attendee) => (
//     //           <li key={attendee.id}>
//     //             {attendee.name} ({attendee.email})
//     //           </li>
//     //         ))}
//     //       </ul>
//     //     ) : (
//     //       <p>No attendees available for this selectedEvent.</p>
//     //     )}
//     //   </div>
//     //   <div>
//     //     <strong>description</strong>{" "}
//     //     {selectedEvent.description ? selectedEvent.description : "No description available."}
//     //   </div>
//     // </div>

//     <div className="event-detail-container">
//       <h2 className="event-title">{selectedEvent.title}</h2>
//       <div className="event-metadata">
//         <p>
//           <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
//         </p>
//         <p>
//           <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//         </p>
//         <p>
//           <strong>Organization Name:</strong> {selectedEvent.organization_name || "N/A"}
//         </p>
//         <p>
//           <strong>Organization Address:</strong>{" "}
//           {selectedEvent.organization_address || "N/A"}
//         </p>
//       </div>
//       <div>
//         <h5>Attendees</h5>
//         {selectedEvent.attendees_details && selectedEvent.attendees_details.length > 0 ? (
//           <ul className="attendees-list">
//             {selectedEvent.attendees_details.map((attendee) => (
//               <li key={attendee.id}>
//                 {attendee.name} ({attendee.email})
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No attendees available for this selectedEvent.</p>
//         )}
//       </div>
//       <div className="event-description">
//         <strong>Description:</strong>{" "}
//         {selectedEvent.description || "No description available."}
//       </div>
//     </div>
//   );
// };

// export default EventDetail;


//########### lastone#
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchEventByIdUpdate, createEvent, fetchEventById } from "../../redux/slice/crm/eventSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../css/EventSystem.css";

// const EventDetail = () => {
//   const { id } = useParams(); // Get event ID from URL params
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [eventData, setEventData] = useState(null); // Local state for event details
//   const events = useSelector((state) => state.events?.events || []); // Optional: Get all events for reference

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const fetchedEvent = await dispatch(fetchEventById(id)).unwrap();
//         setEventData(fetchedEvent);
//       } catch (error) {
//         console.error("Error fetching event:", error);
//         toast.error("Failed to load event details.");
//       }
//     };

//     if (id) {
//       fetchEventDetails();
//     }
//   }, [dispatch, id]);

//   const handleUpdateEvent = async (updatedData) => {
//     try {
//       await dispatch(fetchEventByIdUpdate({ id, updatedData })).unwrap();
//       toast.success("Event updated successfully!");
//       navigate("/dashboard/crm/events"); // Navigate back to the events list
//     } catch (error) {
//       console.error("Error updating event:", error);
//       toast.error("Failed to update event.");
//     }
//   };

//   const handleSelectEvent = (event) => {
//     console.log("Event object:", event); // Log the event object to check its structure
//     if (event?.id) {
//       console.log("Navigating to event detail with ID:", event.id);
//       navigate(`/dashboard/crm/event/detail/${event.id}`);
//     } else {
//       console.error("Event ID is undefined or null:", event);
//       toast.error("Event ID is missing or invalid.");
//     }
//   };

//   const handleSaveEvent = async (eventToSave) => {
//     try {
//       if (eventData.id) {
//         await dispatch(fetchEventByIdUpdate({ id: eventData.id, eventToSave })).unwrap();
//         toast.success("Event updated successfully!");
//       } else {
//         const newEvent = await dispatch(createEvent(eventToSave)).unwrap();
//         toast.success("Event created successfully!");
//         console.log("New Event ID:", newEvent.id); // Confirm ID is returned
//       }
//       handleClose(); // Close the event detail page or navigate
//     } catch (error) {
//       console.error("Error saving event: ", error);
//       toast.error("Failed to save event!");
//     }
//   };

//   const handleBackToEvents = () => {
//     navigate("/dashboard/crm/events");
//   };

//   const handleClose = () => {
//     navigate("/dashboard/crm/events"); // Navigate back to events list
//   };

//   if (!eventData) {
//     return <p>Loading event details...</p>;
//   }

//   return (
//     <div className="content-wrapper">
//       <div className="event-detail-container">
//         <h1 className="page-title">Event Details</h1>

//         <div className="event-detail-card">
//           <h2>{eventData.title}</h2>
//           <p>
//             <strong>Date:</strong> {new Date(eventData.start).toLocaleString()} -{" "}
//             {new Date(eventData.end).toLocaleString()}
//           </p>
//           <p>
//             <strong>Attendees:</strong> {eventData.attendees.join(", ")}
//           </p>
//           <p>
//             <strong>Organization:</strong> {eventData.organization_name} <br />
//             <strong>Address:</strong> {eventData.organization_address}
//           </p>
//           <p>
//             <strong>Description:</strong> {eventData.description}
//           </p>
//         </div>

//         <div className="event-detail-actions">
//           <button
//             className="btn btn-primary"
//             onClick={() => handleUpdateEvent(eventData)}
//           >
//             Update Event
//           </button>
//           <button className="btn btn-secondary" onClick={handleBackToEvents}>
//             Back to Events
//           </button>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EventDetail;



// ####last page
// import React, { useEffect, useState } from "react";
// import { Button, Col, Row, Container } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById } from "../../redux/slice/crm/eventSlice";
// import EventDelete from "./EventDelete";
// import { toast, ToastContainer } from "react-toastify";

// const EventDetail = () => {
//   const { id } = useParams();
//   console.log(id);
//   const dispatch = useDispatch();
//   const event = useSelector((state) => state.events.events);
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   const loading = useSelector((state) => state.events.loading);
//   const error = useSelector((state) => state.events.error);
//   const navigate = useNavigate();
//   const [eventToDelete, setEventToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchEventById(id))
//       .unwrap() // Unwrap the thunk to handle the returned data or errors
//       .then((data) => console.log("Event fetched:", data))
//       .catch((error) => console.log("Error fetching event:", error));
//   }, [dispatch, id]);

//   // useEffect(() => {
//   //   if (event) {
//   //     console.log("Fetched event:", event);
//   //   }
//   // }, [event]);

//   if (loading) {
//     return <p>Loading event details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.detail || "An unknown error occurred."}</p>;
//   }

//   // if (!event) {
//   //   return <p>No event found!</p>;
//   // }

//   // return selectedEvent? (
//   //   <Container className="content-wrapper">
//   //     <h2 className="btn btn primary">{selectedEvent.title}</h2>
//   //     <div className="row">
//   //       <div className="col">
//   //         <Col md={12}>
//   //           <div className="col-md-8">
//   //             <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
//   //           </div>
//   //           <div className="col-md-8">
//   //             <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//   //           </div>
//   //           <Col md={8}>
//   //             <h5>Attendees</h5>
//   //             {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//   //               <ul>
//   //                 {selectedEvent.attendees.map((attendee) => (
//   //                   <li key={attendee.id}>
//   //                     {attendee.attendee_name} ({attendee.email})
//   //                   </li>
//   //                 ))}
//   //               </ul>
//   //             ) : (
//   //               <p>No attendees available for this selectedEvent.</p>
//   //             )}
//   //           </Col>
//   //           <div>
//   //             <strong>description:</strong>{" "}
//   //             {selectedEvent.description
//   //               ? selectedEvent.description
//   //               : "No description available."}
//   //           </div>

//   //           <Button
//   //             variant="primary"
//   //             onClick={() =>
//   //               event?.id && navigate(`/dashboard/crm/event/update/${selectedEvent.id}`)
//   //             }
//   //           >
//   //             Update Event
//   //           </Button>

//   //           <Button
//   //             variant="danger"
//   //             onClick={() => setEventToDelete(selectedEvent.id)}
//   //             className="ms-2"
//   //           >
//   //             Delete Event
//   //           </Button>
//   //         </Col>
//   //       </div>
//   //     </div>

//   //     {eventToDelete !== null && (
//   //       <EventDelete
//   //         id={eventToDelete}
//   //         onClose={() => setEventToDelete(null)}
//   //       />
//   //     )}

//   //     <ToastContainer />
//   //   </Container>
//   // );
//   return selectedEvent ? (
//     <Container className="content-wrapper">
//       <h2 className="btn btn-primary">{selectedEvent.title}</h2>
//       <div className="row">
//         <div className="col">
//           <Col md={12}>
//             <div className="col-md-8">
//               <strong>Start:</strong>{" "}
//               {new Date(selectedEvent.start).toLocaleString()}
//             </div>
//             <div className="col-md-8">
//               <strong>End:</strong>{" "}
//               {new Date(selectedEvent.end).toLocaleString()}
//             </div>
//             <Col md={8}>
//               <h5>Attendees</h5>
//               {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//                 <ul>
//                   {selectedEvent.attendees.map((attendee) => (
//                     <li key={attendee.id}>
//                       {attendee.attendee_name} ({attendee.email})
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No attendees available for this event.</p>
//               )}
//             </Col>
//             <div>
//               <strong>Description:</strong>{" "}
//               {selectedEvent.description || "No description available."}
//             </div>
//             <Button
//               variant="primary"
//               onClick={() =>
//                 selectedEvent?.id &&
//                 navigate(`/dashboard/crm/event/update/${selectedEvent.id}`)
//               }
//             >
//               Update Event
//             </Button>
//             <Button
//               variant="danger"
//               onClick={() => setEventToDelete(selectedEvent.id)}
//               className="ms-2"
//             >
//               Delete Event
//             </Button>
//           </Col>
//         </div>
//       </div>
//       {eventToDelete !== null && (
//         <EventDelete
//           id={eventToDelete}
//           onClose={() => setEventToDelete(null)}
//         />
//       )}
//       <ToastContainer />
//     </Container>
//   ) : (
//     <p>No event details available!</p>
//   );

// };

// export default EventDetail;
// ######

// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById } from "../../redux/slice/crm/eventSlice";
// import EventDelete from "./EventDelete";
// import { toast, ToastContainer } from "react-toastify";

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const event = useSelector((state) => state.events.sselectedEvent);
//   const loading = useSelector((state) => state.events.loading);
//   const error = useSelector((state) => state.events.error);
//   const navigate = useNavigate();

//   const [eventToDelete, setEventToDelete] = useState(null);

//   // Fetch event by ID when component mounts
//   useEffect(() => {
//     dispatch(fetchEventById(id));
//   }, [dispatch, id]);

//   // Log the fetched event data for debugging
//   useEffect(() => {
//     if (event) {
//       console.log("Fetched event:", event);
//     }
//   }, [event]);

//   if (loading) {
//     return <p>Loading event details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.detail || "An unknown error occurred."}</p>;
//   }

//   if (!event) {
//     return <p>No event found!</p>;
//   }

//   return (
//     <div className="content-wrapper">
//       <h2>{selectedEvent.title}</h2>
//       <p>
//         <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
//       </p>
//       <p>
//         <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//       </p>
//       <p>
//         <strong>description:</strong>{" "}
//         {selectedEvent.description ? selectedEvent.description : "No description available."}
//       </p>

//       <h5>Attendees</h5>
//       {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//         <ul>
//           {selectedEvent.attendees.map((attendee) => (
//             <li key={attendee.id}>
//               {attendee.attendee_name} ({attendee.email})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No attendees available for this selectedEvent.</p>
//       )}

//       <Button
//         variant="primary"
//         onClick={() => navigate(`/dashboard/crm/event/update/${selectedEvent.id}`)}
//       >
//         Update Event
//       </Button>

//       <Button
//         variant="danger"
//         onClick={() => setEventToDelete(selectedEvent.id)}
//         className="ms-2"
//       >
//         Delete Event
//       </Button>

//       {eventToDelete !== null && (
//         <EventDelete
//           id={eventToDelete}
//           onClose={() => setEventToDelete(null)}
//         />
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default EventDetail;
