import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEventStatus,
  fetchEventById,
  fetchEventByIdUpdate,
  deleteEvent,
} from "../../../../redux/slice/admin/crm/eventSlice";
// import { MeetingUpdateTable } from "../../crm/meetingupdate/MeetingUpdateTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
// Q
const EventDetail = ({ eventId }) => {
  const { id } = useParams(); // Use 'id' directly from useParams()

  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const navigate = useNavigate();

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newStartTime, setNewStartTime] = useState(selectedEvent?.start || "");
  const [newEndTime, setNewEndTime] = useState(selectedEvent?.end || "");
  const [selectedEventId, setSelectedEventId] = useState(null); // Initialize selectedEventId

  useEffect(() => {
    dispatch(fetchEventById(id)); // Fetch event details by id
  }, [dispatch, id]);

  // useEffect(() => {
  //   // Fetch meeting updates for the specific eventId
  //   if (eventId) {
  //     // dispatch(fetchMeetingUpdate(id));  // Pass id directly
  //     dispatch(fetchMeetingUpdate(eventId)); // Fetch meeting updates for the event
  //   }
  // }, [dispatch, eventId]);

  const handleRescheduleEvent = () => {
    if (newStartTime && newEndTime) {
      const updatedEvent = {
        ...selectedEvent,
        start: newStartTime,
        end: newEndTime,
      };

      dispatch(
        fetchEventByIdUpdate({
          id: selectedEvent.id,
          eventToSave: updatedEvent,
        })
      )
        .then(() => {
          // After successful update, fetch the updated event details
          dispatch(fetchEventById(id));
          sendEmailNotification(updatedEvent);
          toast.success("Event rescheduled successfully!");
          setShowRescheduleModal(false);
        })
        .catch(() => {
          toast.error("Failed to reschedule the event.");
        });
    } else {
      toast.error("Please provide both start and end times.");
    }
  };

  const sendEmailNotification = (event) => {
    const emailData = {
      subject: `Meeting Rescheduled: ${event.title}`,
      body: `The meeting "${event.title}" has been rescheduled. Here is the new meeting link: <Meeting Link>`,
      to: event.attendees.map((attendee) => attendee.email),
    };
    console.log("Sending email notifications:", emailData);
  };

  const handleBackToList = () => {
    navigate("/dashboard/crm/event");
  };

  const handleCancelEvent = () => {
    dispatch(updateEventStatus({ id, status: "canceled" }))
      .then(() => {
        dispatch(fetchEventById(id)); // Fetch the updated event
        toast.success("Event cancelled successfully!");
      })
      .catch(() => {
        toast.error("Failed to cancel the event.");
      });
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(id))
      .then(() => {
        toast.success("Event deleted successfully!");
        navigate("/dashboard/crm/events");
      })
      .catch(() => {
        toast.error("Failed to delete the event.");
      });
  };

  if (!selectedEvent) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="content-wrapper">
      <Box sx={{ padding: 3 }}>
        {/* Header with title and action buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            {selectedEvent.title}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBackToList}
            >
              Back to event
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowRescheduleModal(true)}
            >
              Reschedule Event
            </Button>
            {!selectedEvent.is_canceled && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelEvent}
              >
                Cancel Event
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteEvent}
            >
              Delete Event
            </Button>
          </Box>
        </Box>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              {/* Event Details */}
              <Grid item xs={12} sm={4}>
                {selectedEvent.is_canceled ? (
                  <Typography variant="h6" sx={{ color: "red" }}>
                    Status: Cancelled
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={{ color: "green" }}>
                    Status: Scheduled
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Start:</Typography>
                <Typography variant="body1">
                  {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">End:</Typography>
                <Typography variant="body1">
                  {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}
                </Typography>
              </Grid>
              {/* Other event details */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Attendees:</Typography>
                {selectedEvent.attendees &&
                  selectedEvent.attendees.length > 0 ? (
                  <ul>
                    {selectedEvent.attendees.map((attendee, index) => (
                      <li key={index}>
                        {attendee.name} ({attendee.email}) {attendee.pri_phone}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body1">
                    No attendees for this event.
                  </Typography>
                )}
              </Grid>
              {/* Organization and Description */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Organization:</Typography>
                <Typography variant="body1">
                  {selectedEvent.organization_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Address:</Typography>
                <Typography variant="body1">
                  {selectedEvent.organization_address}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Description:</Typography>
                <Typography variant="body1">
                  {selectedEvent.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Reschedule Modal */}
      <Modal
        open={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
      >
        <Box
          sx={{
            width: 400,
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Reschedule Event
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start Time"
                type="datetime-local"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Time"
                type="datetime-local"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowRescheduleModal(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRescheduleEvent}
            >
              Reschedule Event
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Render Meeting Update Table below event details */}
      <div className="container-fluid">{/* <MeetingUpdateTable/> */}</div>
    </div>
  );
};

export default EventDetail;

// import React, { useEffect, useState } from "react";
// import { Button, Modal, TextField, Grid, Box, Typography, Paper ,Card,CardContent} from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateEventStatus, fetchEventById, fetchEventByIdUpdate, deleteEvent } from "../../../redux/slice/admin/crm/eventSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import MeetingUpdateTable from "../meetingupdate/MeetingUpdateTable";
// import moment from "moment";
// import { fetchMeetingUpdateById,fetchMeetingUpdate } from "../../../redux/slice/admin/crm/meetingUpdateSlice";
// const EventDetail = () => {
//   const { id } = useParams();
//     const { eventId } = useParams(); // Retrieve eventId from URL if it's dynamic

//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   const navigate = useNavigate();

//   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
//   const [newStartTime, setNewStartTime] = useState(selectedEvent?.start || "");
//   const [newEndTime, setNewEndTime] = useState(selectedEvent?.end || "");

//   useEffect(() => {
//     dispatch(fetchEventById(id));
//   }, [dispatch, id]);
//   useEffect(() => {
//     // Fetch meeting updates for the specific eventId
//     if (eventId) {
//       dispatch(fetchMeetingUpdate(eventId));
//     }
//   }, [dispatch, eventId]);
//   const handleRescheduleEvent = () => {
//     if (newStartTime && newEndTime) {
//       const updatedEvent = {
//         ...selectedEvent,
//         start: newStartTime,
//         end: newEndTime,
//       };

//       dispatch(fetchEventByIdUpdate({ id: selectedEvent.id, eventToSave: updatedEvent }))
//         .then(() => {
//            // After successful update, fetch the updated event details
//           dispatch(fetchEventById(id));
//           sendEmailNotification(updatedEvent);
//           toast.success("Event rescheduled successfully!");
//           setShowRescheduleModal(false);
//         })
//         .catch(() => {
//           toast.error("Failed to reschedule the event.");
//         });
//     } else {
//       toast.error("Please provide both start and end times.");
//     }
//   };

//   const sendEmailNotification = (event) => {
//     const emailData = {
//       subject: `Meeting Rescheduled: ${event.title}`,
//       body: `The meeting "${event.title}" has been rescheduled. Here is the new meeting link: <Meeting Link>`,
//       to: event.attendees.map((attendee) => attendee.email),
//     };
//     console.log("Sending email notifications:", emailData);
//   };

//   const handleBackToList = () => {
//     navigate("/dashboard/crm/event");
//   };

//   const handleCancelEvent = () => {
//     dispatch(updateEventStatus({id, status: "canceled"}))
//       .then(() => {
//         dispatch(fetchEventById(id)); // Fetch the updated event
//         toast.success("Event cancelled successfully!");
//       })
//       .catch(() => {
//         toast.error("Failed to cancel the event.");
//       });
//   };

//   const handleDeleteEvent = () => {
//     dispatch(deleteEvent(id))
//       .then(() => {
//         toast.success("Event deleted successfully!");
//         navigate("/dashboard/crm/events");
//       })
//       .catch(() => {
//         toast.error("Failed to delete the event.");
//       });
//   };

//   if (!selectedEvent) {
//     return <div>Loading event details...</div>;
//   }

//   return (
//     <div className="content-wrapper">
//       <Box sx={{ padding: 3 }}>
//         {/* Header with title and action buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>{selectedEvent.title}</Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button variant="outlined" color="primary" onClick={handleBackToList}>
//               Back to event
//             </Button>
//             <Button variant="contained" color="primary" onClick={() => setShowRescheduleModal(true)}>
//               Reschedule Event
//             </Button>
//             {!selectedEvent.is_canceled && (
//               <Button variant="contained" color="secondary" onClick={handleCancelEvent}>
//                 Cancel Event
//               </Button>
//             )}
//             <Button variant="contained" color="error" onClick={handleDeleteEvent}>
//               Delete Event
//             </Button>
//           </Box>
//         </Box>
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Grid container spacing={3}>

//                       {/* Row 1 */}
//                       <Grid item xs={12} sm={4}>
//                         {/* Event Details - Horizontal layout with fields */}
//                           {/* <Grid container spacing={3}> */}
//                               {/* Show cancellation status */}
//                                 {selectedEvent.is_canceled ? (
//                                   <Typography variant="h6" sx={{ color: 'red' }}>Status: Cancelled</Typography>
//                                 ) : (
//                                   <Typography variant="h6" sx={{ color: 'green' }}>Status: Scheduled</Typography>
//                               )}

//                           {/* </Grid> */}
//                         </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="h6">Start:</Typography>
//                         <Typography variant="body1">{moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="h6">End:</Typography>
//                         <Typography variant="body1">{moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="h6">Attendees:</Typography>
//                         {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//                           <ul>
//                             {selectedEvent.attendees.map((attendee, index) => (
//                               <li key={index}>{attendee.name} ({attendee.email}) {attendee.pri_phone}</li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <Typography variant="body1">No attendees for this event.</Typography>
//                         )}
//                       </Grid>

//                       {/* Row 2 */}
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="h6">Organization:</Typography>
//                         <Typography variant="body1">{selectedEvent.organization_name}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="h6">Address:</Typography>
//                         <Typography variant="body1">{selectedEvent.organization_address}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="h6">Description:</Typography>
//                         <Typography variant="body1">{selectedEvent.description}</Typography>
//                       </Grid>
//             </Grid>

//         </CardContent>
//         </Card>
//       </Box>

//       {/* Reschedule Modal */}
//       <Modal open={showRescheduleModal} onClose={() => setShowRescheduleModal(false)}>
//         <Box sx={{
//           width: 400,
//           padding: 2,
//           backgroundColor: "white",
//           borderRadius: 2,
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           boxShadow: 3
//         }}>
//           <Typography variant="h6" gutterBottom>Reschedule Event</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Start Time"
//                 type="datetime-local"
//                 value={newStartTime}
//                 onChange={(e) => setNewStartTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="End Time"
//                 type="datetime-local"
//                 value={newEndTime}
//                 onChange={(e) => setNewEndTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
//             <Button variant="outlined" color="secondary" onClick={() => setShowRescheduleModal(false)}>
//               Close
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleRescheduleEvent}>
//               Reschedule Event
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Toast Notifications */}
//       <ToastContainer />
//        <div className="container-fluid">
//               {/* Enquiry details and actions here */}

//               {/* Mark as Lost and Convert to Client buttons here */}

//               {/* Render Meeting Update Table below */}
//               {/* <MeetingUpdateTable /> */}
//               <MeetingUpdateTable eventId={eventId} />

//               {/* <p>meeting table</p> */}
//       </div>
//     </div>
//   );
// };

// export default EventDetail;

//all is work, except design
// import React, { useEffect, useState } from "react";
// import { Button, Modal, TextField, Grid, Box, Typography, Paper } from "@mui/material";  // Material UI Components
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateEventStatus,fetchEventById, fetchEventByIdUpdate, deleteEvent } from "../../../redux/slice/admin/crm/eventSlice";
// import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
// import moment from "moment"; // For time manipulation

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   const navigate = useNavigate();

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

//       // Update event and send email notification
//       dispatch(fetchEventByIdUpdate({ id: selectedEvent.id, eventToSave: updatedEvent }))
//         .then(() => {
//           sendEmailNotification(updatedEvent);
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

//   const sendEmailNotification = (event) => {
//     const emailData = {
//       subject: `Meeting Rescheduled: ${event.title}`,
//       body: `The meeting "${event.title}" has been rescheduled. Here is the new meeting link: <Meeting Link>`,
//       to: event.attendees.map((attendee) => attendee.email),
//     };
//     console.log("Sending email notifications:", emailData);
//   };

//   // Navigate back to the event list page
//   const handleBackToList = () => {
//     navigate("/dashboard/crm/event"); // Adjust the route to match your event list page
//   };

//   // Cancel event

//   const handleCancelEvent = () => {
//     // Dispatch action to update the event's cancellation status to true
//     dispatch(updateEventStatus(id))
//       .then(() => {
//         toast.success("Event cancelled successfully!");
//       })
//       .catch((error) => {
//         toast.error("Failed to cancel the event.");
//       });
//   };
//   // Delete event
//   const handleDeleteEvent = () => {
//     dispatch(deleteEvent(id))
//       .then(() => {
//         toast.success("Event deleted successfully!");  // Show delete toast message
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
//     <div className="content-wrapper">
//       {/* Event Detail */}
//       <Box sx={{ padding: 3 }}>
//         {/* Header with title and action buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//           <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>{selectedEvent.title}</Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button variant="outlined" color="primary" onClick={handleBackToList}>
//               Back to List
//             </Button>
//             <Button variant="contained" color="primary" onClick={() => setShowRescheduleModal(true)}>
//               Reschedule Event
//             </Button>
//             {!selectedEvent.is_canceled && (
//             <Button variant="contained" color="secondary" onClick={handleCancelEvent}>
//               Cancel Event
//             </Button>
//           )}

//             <Button variant="contained" color="error" onClick={handleDeleteEvent}>
//               Delete Event
//             </Button>
//           </Box>
//         </Box>
//   <Paper>
//         {/* Event Details */}

//             {/* Row 1 */}
//           {/* <div className="col-md-4"> */}
// <Grid item xs={12} sm={4}>
// {/* Event Details - Horizontal layout with fields */}

//   <Grid container spacing={3}>
//       {/* Show cancellation status */}
//         {selectedEvent.is_canceled ? (
//           <Typography variant="h6" sx={{ color: 'red' }}>Status: Cancelled</Typography>
//         ) : (
//           <Typography variant="h6" sx={{ color: 'green' }}>Status: Scheduled</Typography>
//        )}

//   </Grid>

//  <Grid>
//           {/* </div> */}
//               <Typography variant="h6">Start:</Typography>
//               <Typography variant="body1">{moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6">End:</Typography>
//               <Typography variant="body1">{moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//                 {/* Attendees Section */}
//         {/* <Paper> */}
//           <Typography variant="h6">Attendees</Typography>
//           {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//             <ul>
//               {selectedEvent.attendees.map((attendee, index) => (
//                 <li key={index}>
//                   {attendee.name} ({attendee.email})
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <Typography variant="body1">No attendees for this event.</Typography>
//           )}
//         {/* </Paper> */}
//             </Grid>

//             {/* Row 2 */}
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6">Organization:</Typography>
//               <Typography variant="body1">{selectedEvent.organization_name}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6">Address:</Typography>
//               <Typography variant="body1">{selectedEvent.organization_address}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6">Description:</Typography>
//               <Typography variant="body1">{selectedEvent.description}</Typography>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//       {/* Reschedule Modal */}
//       <Modal open={showRescheduleModal} onClose={() => setShowRescheduleModal(false)}>
//         <Box sx={{
//           width: 400,
//           padding: 2,
//           backgroundColor: "white",
//           borderRadius: 2,
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           boxShadow: 3
//         }}>
//           <Typography variant="h6" gutterBottom>Reschedule Event</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Start Time"
//                 type="datetime-local"
//                 value={newStartTime}
//                 onChange={(e) => setNewStartTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="End Time"
//                 type="datetime-local"
//                 value={newEndTime}
//                 onChange={(e) => setNewEndTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
//             <Button variant="outlined" color="secondary" onClick={() => setShowRescheduleModal(false)}>
//               Close
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleRescheduleEvent}>
//               Reschedule Event
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Toast Notifications */}
//       <ToastContainer />
//     </div>
//   );

// };

// export default EventDetail;
//button at bottom horizonatal arrangement
// import React, { useEffect, useState } from "react";
// import { Button, Modal, TextField, Grid, Box, Typography } from "@mui/material";  // Material UI Components
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById, fetchEventByIdUpdate, deleteEvent } from "../../../redux/slice/admin/crm/eventSlice";
// import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
// import moment from "moment"; // For time manipulation

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   const navigate = useNavigate();

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

//       // Update event and send email notification
//       dispatch(fetchEventByIdUpdate({ id: selectedEvent.id, eventToSave: updatedEvent }))
//         .then(() => {
//           // Send email notification for rescheduling (simulated here, replace with real service)
//           sendEmailNotification(updatedEvent);
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

//   const sendEmailNotification = (event) => {
//     // Send email logic for rescheduling or new event (using API or external service like SendGrid)
//     const emailData = {
//       subject: `Meeting Rescheduled: ${event.title}`,
//       body: `The meeting "${event.title}" has been rescheduled. Here is the new meeting link: <Meeting Link>`,
//       to: event.attendees.map((attendee) => attendee.email),
//     };
//     // Use your email API service here
//     console.log("Sending email notifications:", emailData);
//   };

//   // Navigate back to the event list page
//   const handleBackToList = () => {
//     navigate("/dashboard/crm/event"); // Adjust the route to match your event list page
//   };

//   // Cancel event
//   const handleCancelEvent = () => {
//     dispatch(deleteEvent(id))
//       .then(() => {
//         toast.success("Event canceled successfully!");  // Show cancel toast message
//         navigate("/dashboard/crm/events"); // Redirect to event list after cancellation
//       })
//       .catch(() => {
//         toast.error("Failed to cancel the event.");
//       });
//   };

//   // Delete event
//   const handleDeleteEvent = () => {
//     dispatch(deleteEvent(id))
//       .then(() => {
//         toast.success("Event deleted successfully!");  // Show delete toast message
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
//     <div className="content-wrapper">
//     {/* Event Detail */}
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" component="h1">{selectedEvent.title}</Typography>

//       {/* Event Details Grid */}
//       <Grid container spacing={2} sx={{ mt: 2 }}>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6">Start: {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6">End: {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6">Description:</Typography>
//           <Typography variant="body1">{selectedEvent.description}</Typography>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6">Organization: {selectedEvent.organization_name}</Typography>
//           <Typography variant="h6">Organization Address: {selectedEvent.organization_address}</Typography>
//         </Grid>
//       </Grid>

//       {/* Attendees Section */}
//       <Typography variant="h5" sx={{ mt: 2 }}>Attendees</Typography>
//       {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//         <ul>
//           {selectedEvent.attendees.map((attendee, index) => (
//             <li key={index}>
//               {attendee.name} ({attendee.email})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No attendees for this event.</p>
//       )}

//       {/* Buttons Section */}
//       <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", mt: 2 }}>
//         <Button variant="outlined" color="primary" onClick={handleBackToList}>
//           Back to List
//         </Button>
//         <Button variant="contained" color="primary" onClick={() => setShowRescheduleModal(true)}>
//           Reschedule Event
//         </Button>
//         <Button variant="contained" color="secondary" onClick={handleCancelEvent}>
//           Cancel Event
//         </Button>
//         <Button variant="contained" color="error" onClick={handleDeleteEvent}>
//           Delete Event
//         </Button>
//       </Box>
//     </Box>

//     {/* Reschedule Modal */}
//     <Modal open={showRescheduleModal} onClose={() => setShowRescheduleModal(false)}>
//       <Box sx={{
//         width: 400,
//         padding: 2,
//         backgroundColor: "white",
//         borderRadius: 1,
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)'
//       }}>
//         <Typography variant="h6" gutterBottom>Reschedule Event</Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Start Time"
//               type="datetime-local"
//               value={newStartTime}
//               onChange={(e) => setNewStartTime(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="End Time"
//               type="datetime-local"
//               value={newEndTime}
//               onChange={(e) => setNewEndTime(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               variant="outlined"
//             />
//           </Grid>
//         </Grid>
//         <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
//           <Button variant="outlined" color="secondary" onClick={() => setShowRescheduleModal(false)}>
//             Close
//           </Button>
//           <Button variant="contained" color="primary" onClick={handleRescheduleEvent}>
//             Reschedule Event
//           </Button>
//         </Box>
//       </Box>
//     </Modal>

//     {/* Toast Notifications */}
//     <ToastContainer />
//   </div>
// );
// };

// export default EventDetail;

//first new design vertical arrangement , button at bottom line
// import React, { useEffect, useState } from "react";
// import { Button, Modal, TextField, Grid, Box, Typography } from "@mui/material";  // Material UI Components
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById, fetchEventByIdUpdate, deleteEvent } from "../../../redux/slice/admin/crm/eventSlice";
// import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
// import moment from "moment"; // For time manipulation

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   const navigate = useNavigate();

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

//       // Update event and send email notification
//       dispatch(fetchEventByIdUpdate({ id: selectedEvent.id, eventToSave: updatedEvent }))
//         .then(() => {
//           // Send email notification for rescheduling (simulated here, replace with real service)
//           sendEmailNotification(updatedEvent);
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

//   const sendEmailNotification = (event) => {
//     // Send email logic for rescheduling or new event (using API or external service like SendGrid)
//     const emailData = {
//       subject: `Meeting Rescheduled: ${event.title}`,
//       body: `The meeting "${event.title}" has been rescheduled. Here is the new meeting link: <Meeting Link>`,
//       to: event.attendees.map((attendee) => attendee.email),
//     };
//     // Use your email API service here
//     console.log("Sending email notifications:", emailData);
//   };

//   // Navigate back to the event list page
//   const handleBackToList = () => {
//     navigate("/dashboard/crm/event"); // Adjust the route to match your event list page
//   };

//   // Cancel event
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
//     <div className="content-wrapper">
//       {/* Event Detail */}
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="h4" component="h1">{selectedEvent.title}</Typography>
//         <Typography variant="h6">Start: {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}</Typography>
//         <Typography variant="h6">End: {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}</Typography>
//         <Typography variant="h6">Description: {selectedEvent.description}</Typography>

//         <Typography variant="h5" sx={{ mt: 2 }}>Attendees</Typography>
//         {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
//           <ul>
//             {selectedEvent.attendees.map((attendee, index) => (
//               <li key={index}>
//                 {attendee.name} ({attendee.email})
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No attendees for this event.</p>
//         )}

//         {/* Buttons Section */}
//         <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", mt: 2 }}>
//           <Button variant="outlined" color="primary" onClick={handleBackToList}>
//             Back to List
//           </Button>
//           <Button variant="contained" color="primary" onClick={() => setShowRescheduleModal(true)}>
//             Reschedule Event
//           </Button>
//           <Button variant="contained" color="secondary" onClick={handleCancelEvent}>
//             Cancel Event
//           </Button>
//           <Button variant="contained" color="error" onClick={() => handleCancelEvent()}>
//             Delete Event
//           </Button>
//         </Box>
//       </Box>

//       {/* Reschedule Modal */}
//       <Modal open={showRescheduleModal} onClose={() => setShowRescheduleModal(false)}>
//         <Box sx={{ width: 400, padding: 2, backgroundColor: "white", borderRadius: 1 }}>
//           <Typography variant="h6" gutterBottom>Reschedule Event</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Start Time"
//                 type="datetime-local"
//                 value={newStartTime}
//                 onChange={(e) => setNewStartTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="End Time"
//                 type="datetime-local"
//                 value={newEndTime}
//                 onChange={(e) => setNewEndTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
//             <Button variant="outlined" color="secondary" onClick={() => setShowRescheduleModal(false)}>
//               Close
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleRescheduleEvent}>
//               Reschedule Event
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Toast Notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventDetail;

//reschdule and cancel old best working page
// import React, { useEffect, useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";  // Importing modal and form for rescheduling
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById, fetchEventByIdUpdate, deleteEvent } from "../../../redux/slice/admin/crm/eventSlice";
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
//     // Navigate back to the event list page
//   const handleBackToList = () => {
//     navigate.push("/dashboard/crm/event"); // Adjust the route to match your event list page
//   };

//   // cancel event
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
//       <Button
//         variant="primary"
//         onClick={() => navigate(`/dashboard/crm/event/update/${selectedEvent.id}`)}
//       >
//         Update Event
//       </Button>
//           {/* back to list */}
//           <button onClick={handleBackToList} className="back-to-list-button">
//                 Back to Events List
//           </button>

//           {/* Reschedule Button */}
//           <Button variant="primary" onClick={() => setShowRescheduleModal(true)}>
//             Reschedule Event
//           </Button>

//           {/* Cancel Event Button */}
//           <Button
//             variant="secondary"
//             onClick={() => handleCancelEvent()}
//             className="ms-2"
//           >
//             Cancel Event
//           </Button>
//           {/* delete */}
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

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchEventById } from "../../../redux/slice/admin/crm/eventSlice";
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
// import { fetchEventById } from "../../../redux/slice/admin/crm/eventSlice"; // The action to fetch event details by ID
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
// import { fetchEventById } from "../../../redux/slice/admin/crm/eventSlice";
// import { fetchAttendees } from "../../../redux/slice/admin/crm/attendeeSlice"; // Import to fetch attendees
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
// import { fetchEventByIdUpdate, createEvent, fetchEventById } from "../../../redux/slice/admin/crm/eventSlice";
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

// // event detail work great
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventById } from "../../../redux/slice/admin/crm/eventSlice";
// import EventDelete from "./EventDelete"; // Adjust the path as necessary
// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

// const EventDetail = () => {
//   const { id } = useParams(); // Get the event ID from the URL
//   const dispatch = useDispatch();
//   const selectedEvent = useSelector((state) => state.events.selectedEvent);
//   // const loading = useSelector((state) => state.events.loading);
//   // const error = useSelector((state) => state.events.error);
//   const navigate = useNavigate();

//   const [eventToDelete, setEventToDelete] = useState(null);
//   // const { selectedEvent, loading, error } = useSelector((state) => ({
//   //   selectedEvent: state.events.selectedEvent,
//   //   loading: state.events.loading,
//   //   error: state.events.error,
//   // }));
//   useEffect(() => {
//     dispatch(fetchEventById(id)); // Fetch event by ID when component mounts
//   }, [dispatch, id]);
//   if (!selectedEvent) {
//     return <div>Loading event details...</div>;  // Show loading until event is loaded
//   }
//   // useEffect(() => {
//   //   console.log("Event:", event);
//   //   console.log("Loading:", loading);
//   //   console.log("Error:", error);
//   // }, [event, loading, error]);

//   // if (loading) {
//   //   return <p>Loading event details...</p>;
//   // }

//   // if (error) {
//   //   const errorMessage = error.detail || "An unknown error occurred.";
//   //   return <p>Error: {errorMessage}</p>;
//   // }

//   // if (!event) {
//   //   return <p>No event found!</p>;
//   // }

//   return (
//     <div>
//       {/* Only display event details if selectedEvent is available */}
//       {selectedEvent ? (
//         <>
//       <h2>{selectedEvent.title}</h2>
//       <p>
//         <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
//       </p>
//       <p>
//         <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//       </p>
//       <p>
//         <strong>description:</strong> {selectedEvent.description}
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
// <Button
//   variant="primary"
//   onClick={() => navigate(`/dashboard/crm/event/update/${selectedEvent.id}`)}
// >
//   Update Event
// </Button>
//       <Button
//         variant="danger"
//         onClick={() => setEventToDelete(selectedEvent.id)}
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

//         </>
//       ) : (
//         <p>No event found!</p>
//       )}
//       <ToastContainer /> {/* Ensure this is included for toast notifications */}
//     </div>
//   );
// };

// export default EventDetail;
