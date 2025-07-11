import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAttendees } from "../../../../redux/slice/admin/crm/attendeeSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EventUpdate = ({
  eventData = {}, // Provide a default empty object to avoid undefined issues
  setEventData,
  handleClose,
  handleSaveEvent,
  show,
}) => {
  const [attendeeIds, setAttendeeIds] = useState(
    eventData.attendees?.map((attendee) => attendee.id) || []
  );

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Declare navigate here

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAttendees());
      } catch (error) {
        console.error("Failed to fetch attendees:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const {
    list: existingAttendees = [],
    isLoading,
    error,
  } = useSelector((state) => state.attendees || {});

  useEffect(() => {
    if (eventData && eventData.attendees) {
      setAttendeeIds(eventData.attendees?.map((attendee) => attendee.id) || []);
    }
  }, [eventData]);

  const handleAttendeeChange = (index, value) => {
    const updatedAttendeeIds = [...attendeeIds];
    updatedAttendeeIds[index] = value; // Update the attendee ID
    setAttendeeIds(updatedAttendeeIds);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendeeIds = attendeeIds.filter((_, i) => i !== index);
    setAttendeeIds(updatedAttendeeIds);
  };

  const handleAddAttendee = () => {
    setAttendeeIds((prevAttendeeIds) => [...prevAttendeeIds, ""]);
  };

  const handleSave = () => {
    const validAttendeeIds = attendeeIds.filter((id) => id !== "");

    if (
      !eventData.title?.trim() || // Check for empty title
      !eventData.start || // Check for valid start date
      !eventData.end || // Check for valid end date
      validAttendeeIds.length === 0 // Ensure attendees are selected
    ) {
      return; // Prevent save if validation fails
    }

    const eventToSave = {
      ...eventData,
      attendees: validAttendeeIds,
      start: eventData.start.toISOString(), // Ensure proper format
      end: eventData.end.toISOString(), // Ensure proper format
    };

    handleSaveEvent(eventToSave);
    navigate("/dashboard/crm/event/update/$id/"); // Use navigate here
  };

  if (isLoading) return <p>Loading attendees...</p>;
  if (error) return <p>Error loading attendees: {error}</p>;

  return (
    <Modal show={show} onHide={handleClose}>
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
              value={eventData.title || ""}
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
              value={eventData.notes || ""}
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  notes: e.target.value,
                }))
              }
            />
          </Form.Group>

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
                      {existingAttendee.attendee_name} ({existingAttendee.email}
                      )
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
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="eventEnd">
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
              className="form-control"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventUpdate;
