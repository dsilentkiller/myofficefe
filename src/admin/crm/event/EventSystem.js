

// src/components/EventSystem.js
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  updateEvent,
  removeEvent,
} from "../../redux/slice/eventSlice";
import { useNavigate } from "react-router-dom"; // For navigation
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Select from "react-select";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "admin-lte/dist/css/adminlte.min.css"; // Import AdminLTE CSS
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com"; // Import EmailJS if not already installed

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
    email: "",
    notes: "",
    is_canceled: false,
  });
  const attendeesOptions = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Alice Brown", label: "Alice Brown" },
  ]; // Example attendees, modify as per your options

  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events); // Fetch events from Redux

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalOpen(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEventObject = {
      id: Date.now(), // For unique identification
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      attendees: newEvent.attendees.map((attendee) => attendee.label),
      email: newEvent.email,
      notes: newEvent.notes,
    };

    // Dispatch the action to add event
    dispatch(addEvent(newEventObject));

    toast.success("Event created successfully!");
    sendEmail(newEventObject); // Send email after event creation

    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      attendees: [],
      email: "",
      notes: "",
      is_canceled: false,
    });
  };

  // Function to send email using EmailJS
  const sendEmail = (eventDetails) => {
    const emailParams = {
      title: eventDetails.title,
      email: eventDetails.email,
      attendees: eventDetails.attendees,
      start: moment(eventDetails.start).format("YYYY-MM-DD HH:mm"),
      end: moment(eventDetails.end).format("YYYY-MM-DD HH:mm"),
      notes: eventDetails.notes,
    };
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID")
      .then((result) => {
        console.log("Email sent successfully:", result.text);
      })
      .catch((error) => {
        console.log("Email failed:", error.text);
      });
  };

  // Handle event click to view details
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set selected event for viewing details
  };

  // Modal close handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      attendees: [],
      email: "",
      notes: "",
      is_canceled: false,
    });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Event Calendar</h1>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-calendar"></i> Calendar
                  </h3>
                </div>
                <div className="card-body">
                  <ToastContainer />
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleEventClick} // Click event to view details
                    style={{ height: 500 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="modal fade show"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedEvent ? "Update Event" : "Create New Event"}
                </h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEventSubmit}>
                  <div className="form-group">
                    <label>Event Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter event title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Start Date and Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={moment(newEvent.start).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            start: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>End Date and Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            end: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Attendees</label>
                    <Select
                      isMulti
                      options={attendeesOptions}
                      value={newEvent.attendees}
                      onChange={(selectedOptions) =>
                        setNewEvent({
                          ...newEvent,
                          attendees: selectedOptions,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={newEvent.email}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter notes"
                      value={newEvent.notes}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          notes: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Save Event
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="modal fade show"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Event Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setSelectedEvent(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>{selectedEvent.title}</h3>
                <p>
                  <strong>Start:</strong>{" "}
                  {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm A")}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm A")}
                </p>
                <p>
                  <strong>Attendees:</strong>{" "}
                  {selectedEvent.attendees.join(", ")}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEvent.email}
                </p>
                <p>
                  <strong>Notes:</strong> {selectedEvent.notes}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSystem;
