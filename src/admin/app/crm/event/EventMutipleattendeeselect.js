import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
import { useDispatch, useSelector } from "react-redux";

const EventForm = ({
  eventData,
  setEventData,
  handleClose,
  handleSaveEvent,
}) => {
  // Initialize attendeeIds safely with an empty array if eventData.attendees is undefined
  const [attendeeIds, setAttendeeIds] = useState(
    eventData.attendees?.map((attendee) => attendee.id) || []
  );

  const dispatch = useDispatch();

  // Fetch attendees data from the attendees list when the component mounts
  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  // Accessing the attendees list from Redux state
  const {
    list: existingAttendees = [],
    isLoading,
    error,
  } = useSelector((state) => state.attendees || {});

  // Populate attendeeIds when eventData changes
  useEffect(() => {
    setAttendeeIds(eventData.attendees?.map((attendee) => attendee.id) || []);
  }, [eventData]);

  const handleAttendeeChange = (index, value) => {
    const updatedAttendeeIds = [...attendeeIds];
    if (value) {
      updatedAttendeeIds[index] = value; // Update attendee at the specific index
    } else {
      updatedAttendeeIds[index] = ""; // Clear if no attendee selected
    }
    setAttendeeIds(updatedAttendeeIds);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendeeIds = attendeeIds.filter((_, i) => i !== index);
    setAttendeeIds(updatedAttendeeIds); // Remove the attendee ID at the given index
  };

  const handleAddAttendee = () => {
    setAttendeeIds((prevAttendeeIds) => [...prevAttendeeIds, ""]); // Add an empty entry for a new attendee selection
  };

  if (isLoading) return <p>Loading attendees...</p>;
  if (error) return <p>Error loading attendees: {error}</p>;

  return (
    <Modal show onHide={handleClose}>
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
              value={eventData.title || ""} // Default to empty string
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
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
              value={eventData.notes || ""} // Default to empty string
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  notes: e.target.value,
                }))
              }
            />
          </Form.Group>

          {/* Attendees Selection */}
          <Form.Group controlId="eventAttendees">
            <Form.Label>Attendees</Form.Label>
            {attendeeIds.map((attendeeId, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  as="select"
                  value={attendeeId}
                  onChange={(e) => handleAttendeeChange(index, e.target.value)}
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
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleRemoveAttendee(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddAttendee}>
              Add Attendee
            </Button>
          </Form.Group>

          <Form.Group controlId="eventStart">
            <Form.Label>Start Date & Time</Form.Label>
            <DatePicker
              selected={eventData.start || null} // Default to null
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
              selected={eventData.end || null} // Default to null
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSaveEvent(attendeeIds)}>
          Save Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventForm;
