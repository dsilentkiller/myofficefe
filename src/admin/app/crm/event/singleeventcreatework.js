import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventForm = ({
  eventData,
  setEventData,
  handleSaveEvent,
  show,
  handleClose,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {eventData?.id ? "Edit Event" : "Create Event"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Event Title */}
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

          {/* Event Email */}
          <Form.Group controlId="eventEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={eventData.email}
              onChange={(e) =>
                setEventData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
            />
          </Form.Group>

          {/* Event Notes */}
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

          {/* Start Date & Time */}
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

          {/* End Date & Time */}
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
        <Button variant="primary" onClick={handleSaveEvent}>
          {eventData?.id ? "Update Event" : "Save Event"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventForm;
