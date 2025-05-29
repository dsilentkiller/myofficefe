import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventForm = ({
  eventData,
  setEventData,
  handleClose,
  handleSaveEvent,
}) => {
  const [attendees, setAttendees] = useState(eventData.attendees || []);

  const handleAddAttendee = () => {
    setAttendees([...attendees, ""]); // Add a new empty email field
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = attendees.filter((_, i) => i !== index);
    setAttendees(updatedAttendees); // Remove the email field at the given index
  };

  const handleAttendeeChange = (index, value) => {
    const updatedAttendees = attendees.map((email, i) =>
      i === index ? value : email
    );
    setAttendees(updatedAttendees); // Update the email field at the given index
    setEventData((prevData) => ({
      ...prevData,
      attendees: updatedAttendees, // Update the main eventData state with emails
    }));
  };

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
              value={eventData.title}
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
              value={eventData.notes}
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  notes: e.target.value,
                }))
              }
            />
          </Form.Group>

          {/* Multiple Email Fields for Attendees */}
          <Form.Group controlId="eventAttendees">
            <Form.Label>Attendees</Form.Label>
            {attendees.map((email, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="email"
                  placeholder={`Enter attendee ${index + 1} email`}
                  value={email}
                  onChange={(e) => handleAttendeeChange(index, e.target.value)}
                />
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleRemoveAttendee(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="primary" onClick={handleAddAttendee}>
              Add Attendee
            </Button>
          </Form.Group>

          <Form.Group controlId="eventStart">
            <Form.Label>Start Date & Time</Form.Label>
            <DatePicker
              selected={eventData.start}
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
              selected={eventData.end}
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
        <Button variant="primary" onClick={() => handleSaveEvent(attendees)}>
          Save Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventForm;
