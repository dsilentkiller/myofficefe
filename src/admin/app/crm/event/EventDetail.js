import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Grid,
  Box,
  Typography,

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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../api/axiosInstance";
import moment from "moment";
// Q
const EventDetail = ({ eventId }) => {
  const { id } = useParams(); // Use 'id' directly from useParams()

  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.events.currentEvent);



  console.log('select', selectedEvent)
  const navigate = useNavigate();
  // .selectedEvent
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState(null); // Initialize selectedEventId
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setNewStartTime(selectedEvent.start || "");
      setNewEndTime(selectedEvent.end || "");
    }
  }, [selectedEvent]);

  useEffect(() => {
    console.log("Fetching event with ID:", id); // Log the ID being used
    dispatch(fetchEventById(id)); // Fetch event details by ID
  }, [dispatch, id]);

  const handleRescheduleEvent = () => {
    if (!selectedEvent || !selectedEvent.id) {
      toast.error("Invalid event selected");
      return;
    }

    if (!newStartTime || !newEndTime) {
      toast.error("Please provide both start and end times.");
      return;
    }

    // Check if times actually changed
    const isSameStart = moment(newStartTime).isSame(selectedEvent.start);

    const isSameEnd = moment(newEndTime).isSame(selectedEvent.end);

      if (newStartTime === selectedEvent.start && newEndTime === selectedEvent.end) {
        toast.info("No changes in schedule. Dates are the same.");
        return;
      }

    // if (isSameStart && isSameEnd) {
    //   toast.info("No changes detected. Start and End time are same as before.");
    //   return;
    // }

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
        dispatch(fetchEventById(id));
        sendEmailNotification(updatedEvent);
        toast.success("Event rescheduled successfully!");
        setShowRescheduleModal(false);
      })
      .catch(() => {
        toast.error("Failed to reschedule the event.");
      });
  };



  // const handleRescheduleEvent = () => {
  //   if (!selectedEvent || !selectedEvent.id) {
  //     toast.error("Invalid event selected");
  //     return;
  //   }
  //   if (newStartTime && newEndTime) {
  //     const updatedEvent = {
  //       ...selectedEvent,
  //       start: newStartTime,
  //       end: newEndTime,
  //     };

  //     dispatch(
  //       fetchEventByIdUpdate({
  //         id: selectedEvent.id,
  //         eventToSave: updatedEvent,
  //       })
  //     )
  //       .then(() => {
  //         // After successful update, fetch the updated event details
  //         dispatch(fetchEventById(id));
  //         sendEmailNotification(updatedEvent);
  //         toast.success("Event rescheduled successfully!");
  //         setShowRescheduleModal(false);
  //       })
  //       .catch(() => {
  //         toast.error("Failed to reschedule the event.");
  //       });
  //   } else {
  //     toast.error("Please provide both start and end times.");
  //   }
  // };


  const sendEmailNotification = (event) => {
    const emailData = {
      subject: `Meeting Rescheduled: ${event.title}`,
      body: `The meeting "${event.title}" has been rescheduled. Here is the new meeting link: <Meeting Link>`,
      to: event.attendees.map((attendee) => attendee.email),
    };
    // Replace console.log with an actual email-sending API call
    axiosInstance.post("/api/send-email", emailData)
      .then(response => {
        console.log('Emails sent successfully', response);
      })
      .catch(error => {
        console.error('Failed to send emails', error);
      });
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
    <>
      <Box sx={{
        gap: 3,
        display: "flex",
        flexDirection: "column"
      }}>
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
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Title:</Typography>
                <Typography variant="body1">
                  {selectedEvent.title}
                </Typography>
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
          <Button

            variant="contained"
            color="primary"
            onClick={handleRescheduleEvent}
            disabled={!newStartTime || !newEndTime}
            style={{ marginBottom: '16px' }} // Add 16px space below
          >
            Reschedule Event
          </Button>

          {/* <Typography variant="h6" gutterBottom>
              Reschedule Event
            </Typography> */}
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
      {/* <ToastContainer /> */}
      <ToastContainer
      // position="top-right"
      // autoClose={3000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      />


      {/* Render Meeting Update Table below event details */}
      <div className="container-fluid">{/* <MeetingUpdateTable/> */}</div>
    </>
  );
};

export default EventDetail;

