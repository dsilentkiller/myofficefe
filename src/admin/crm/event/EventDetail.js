import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../../redux/slice/crm/eventSlice";
import EventDelete from "./EventDelete";
import { toast, ToastContainer } from "react-toastify";

const EventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.selectedEvent);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const navigate = useNavigate();
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      console.log("Fetched event:", event);
    }
  }, [event]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>Error: {error.detail || "An unknown error occurred."}</p>;
  }

  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <Container className="content-wrapper">
      <h2 className="btn btn primary">{event.title}</h2>
      <div className="row">
        <div className="col">
          <Col md={12}>
            <div className="col-md-8">
              <strong>Start:</strong> {new Date(event.start).toLocaleString()}
            </div>
            <div className="col-md-8">
              <strong>End:</strong> {new Date(event.end).toLocaleString()}
            </div>
            <Col md={8}>
              <h5>Attendees</h5>
              {event.attendees && event.attendees.length > 0 ? (
                <ul>
                  {event.attendees.map((attendee) => (
                    <li key={attendee.id}>
                      {attendee.attendee_name} ({attendee.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No attendees available for this event.</p>
              )}
            </Col>
            <div>
              <strong>Notes:</strong>{" "}
              {event.notes ? event.notes : "No notes available."}
            </div>

            <Button
              variant="primary"
              onClick={() =>
                navigate(`/dashboard/crm/event/update/${event.id}`)
              }
            >
              Update Event
            </Button>
            <Button
              variant="danger"
              onClick={() => setEventToDelete(event.id)}
              className="ms-2"
            >
              Delete Event
            </Button>
          </Col>
        </div>
      </div>

      {eventToDelete !== null && (
        <EventDelete
          id={eventToDelete}
          onClose={() => setEventToDelete(null)}
        />
      )}

      <ToastContainer />
    </Container>
  );
};

export default EventDetail;

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
//   const event = useSelector((state) => state.events.selectedEvent);
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
//       <h2>{event.title}</h2>
//       <p>
//         <strong>Start:</strong> {new Date(event.start).toLocaleString()}
//       </p>
//       <p>
//         <strong>End:</strong> {new Date(event.end).toLocaleString()}
//       </p>
//       <p>
//         <strong>Notes:</strong>{" "}
//         {event.notes ? event.notes : "No notes available."}
//       </p>

//       <h5>Attendees</h5>
//       {event.attendees && event.attendees.length > 0 ? (
//         <ul>
//           {event.attendees.map((attendee) => (
//             <li key={attendee.id}>
//               {attendee.attendee_name} ({attendee.email})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No attendees available for this event.</p>
//       )}

//       <Button
//         variant="primary"
//         onClick={() => navigate(`/dashboard/crm/event/update/${event.id}`)}
//       >
//         Update Event
//       </Button>

//       <Button
//         variant="danger"
//         onClick={() => setEventToDelete(event.id)}
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

// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById } from "../../redux/slice/crm/eventSlice";
// import EventDelete from "./EventDelete"; // Adjust the path as necessary
// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const event = useSelector((state) => state.events.selectedEvent);
//   const loading = useSelector((state) => state.events.loading);
//   const error = useSelector((state) => state.events.error);
//   const navigate = useNavigate();

//   const [eventToDelete, setEventToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchEventById(id)); // Fetch event by ID when component mounts
//   }, [dispatch, id]);

//   useEffect(() => {
//     console.log("Event:", event);
//     console.log("Loading:", loading);
//     console.log("Error:", error);
//   }, [event, loading, error]);

//   if (loading) {
//     return <p>Loading event details...</p>;
//   }

//   if (error) {
//     const errorMessage = error.detail || "An unknown error occurred.";
//     return <p>Error: {errorMessage}</p>;
//   }

//   if (!event) {
//     return <p>No event found!</p>;
//   }

//   return (
//     <div>
//       <h2>{event.title}</h2>
//       <p>
//         <strong>Start:</strong> {new Date(event.start).toLocaleString()}
//       </p>
//       <p>
//         <strong>End:</strong> {new Date(event.end).toLocaleString()}
//       </p>
//       <p>
//         <strong>Notes:</strong> {event.notes}
//       </p>
//       <h5>Attendees</h5>
//       {event.attendees && event.attendees.length > 0 ? (
//         <ul>
//           {event.attendees.map((attendee) => (
//             <li key={attendee.id}>
//               {attendee.attendee_name} ({attendee.email})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No attendees available for this event.</p>
//       )}
//       <Button
//         variant="primary"
//         onClick={() => navigate(`/dashboard/crm/event/update/${event.id}`)}
//       >
//         Update Event
//       </Button>
//       <Button
//         variant="danger"
//         onClick={() => setEventToDelete(event.id)}
//         className="ms-2"
//       >
//         Delete Event
//       </Button>
//       {/* Delete Confirmation Modal */}
//       {eventToDelete !== null && (
//         <EventDelete
//           id={eventToDelete}
//           onClose={() => setEventToDelete(null)}
//           // Removed toast.success from here
//         />
//       )}
//       <ToastContainer /> {/* Ensure this is included for toast notifications */}
//     </div>
//   );
// };

// export default EventDetail;
