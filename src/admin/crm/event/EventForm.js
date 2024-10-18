import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "../../css/eventForm.css"; // Custom CSS file for additional styling

const EventForm = ({
  eventData,
  setEventData,
  handleClose,
  handleSaveEvent,
  show,
}) => {
  const [attendeeIds, setAttendeeIds] = useState(
    eventData.attendees?.map((attendee) => attendee.id) || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  const {
    list: existingAttendees = [],
    isLoading,
    error,
  } = useSelector((state) => state.attendees || {});

  useEffect(() => {
    setAttendeeIds(eventData.attendees?.map((attendee) => attendee.id) || []);
  }, [eventData]);

  const handleSelectAttendee = (index, value) => {
    const updatedAttendeeIds = [...attendeeIds];
    updatedAttendeeIds[index] = value;
    setAttendeeIds(updatedAttendeeIds);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendeeIds = attendeeIds.filter((_, i) => i !== index);
    setAttendeeIds(updatedAttendeeIds);
  };

  const handleAddAttendee = () => {
    setAttendeeIds((prev) => [...prev, ""]);
  };

  if (isLoading) return <p>Loading attendees...</p>;
  if (error) return <p>Error loading attendees: {error}</p>;

  const handleSave = () => {
    console.log("attendee", attendeeIds);
    const selectedAttendees = attendeeIds
      .filter((id) => id)
      .map((id) => {
        const attendee = existingAttendees.find(
          (att) => att.id === parseInt(id, 10)
        );
        return attendee ? attendee.id : null;
      })
      .filter(Boolean);

    const eventToSave = {
      title: eventData.title,
      start: eventData.start.toISOString(),
      end: eventData.end.toISOString(),
      attendees: selectedAttendees,
      notes: eventData.notes || "",
    };

    handleSaveEvent(eventToSave)
      .then((response) => {
        console.log("Event saved successfully", response);
      })
      .catch((error) => {
        console.error(
          "Error saving event:",
          error.response?.data || error.message
        );
        alert(
          `Error saving event: ${error.response?.data?.error || error.message}`
        );
      });
  };

  return (
    <Modal show={show} onHide={handleClose} className="event-modal">
      <Modal.Header closeButton>
        <Modal.Title className="event-modal-title">Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="eventTitle" className="mb-4">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event title"
              value={eventData.title || ""}
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
              className="event-form-input"
            />
          </Form.Group>

          <Form.Group controlId="eventNotes" className="mb-4">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter notes"
              value={eventData.notes || ""}
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  notes: e.target.value,
                }))
              }
              className="event-form-input"
            />
          </Form.Group>

          <Form.Group controlId="eventAttendees" className="mb-4">
            <Form.Label>Attendees</Form.Label>
            {attendeeIds.map((attendeeId, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-2 attendee-row"
              >
                <Form.Control
                  as="select"
                  value={attendeeId}
                  onChange={(e) => handleSelectAttendee(index, e.target.value)}
                  className="attendee-select"
                >
                  <option value="">Select Attendee</option>
                  {existingAttendees.map((existingAttendee) => (
                    <option
                      key={existingAttendee.id}
                      value={existingAttendee.id}
                    >
                      {existingAttendee.attendee_name} -{" "}
                      {existingAttendee.email}
                    </option>
                  ))}
                </Form.Control>
                <Button
                  variant="outline-danger"
                  className="ms-2 attendee-remove-btn"
                  onClick={() => handleRemoveAttendee(index)}
                >
                  <AiOutlineMinus />
                </Button>
              </div>
            ))}
            <Button
              variant="outline-primary"
              onClick={handleAddAttendee}
              className="add-attendee-btn"
            >
              <AiOutlinePlus /> Add Attendee
            </Button>
          </Form.Group>

          <Form.Group controlId="eventStart" className="mb-4">
            <Form.Label>Start Date & Time</Form.Label>
            <DatePicker
              selected={eventData.start || null}
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
              className="form-control event-date-picker"
            />
          </Form.Group>

          <Form.Group controlId="eventEnd" className="mb-4">
            <Form.Label>End Date & Time</Form.Label>
            <DatePicker
              selected={eventData.end || null}
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
              className="form-control event-date-picker"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          className="event-modal-close-btn"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          className="event-modal-save-btn"
        >
          Save Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventForm;
