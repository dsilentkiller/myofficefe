import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  fetchEvent,
  updateEvent,
  removeEvent,
} from "../../redux/slice/crm/eventSlice";
import { useNavigate } from "react-router-dom"; // For navigation
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
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
    attendees: [], // Store selected attendee IDs
    email: "",
    notes: "",
    is_canceled: false,
  });

  const [attendees, setAttendees] = useState([]); // Dynamic list of attendees fetched from the AttendeeTable

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events); // Fetch events from Redux

  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/attendee"); // Replace with your actual API endpoint
        const data = await response.json();
        console.log("Fetched attendees data:", data);

        if (Array.isArray(data)) {
          setAttendees(data);
        } else if (data.results && Array.isArray(data.results)) {
          setAttendees(data.results);
        } else {
          console.error("Unexpected data format for attendees:", data);
          setAttendees([]);
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setAttendees([]);
      }
    };

    fetchAttendee();
  }, [dispatch]);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalOpen(true);
  };
  const handleAttendeeSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setNewEvent({ ...newEvent, attendees: selectedOptions }); // Update attendees
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEventObject = {
      id: Date.now(), // For unique identification
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      attendees: newEvent.attendees.map((attendeeId) => {
        const attendee = attendees.find((a) => a.id === attendeeId);
        return attendee ? attendee.name : attendeeId; // Get name or fallback to ID
      }),
      email: newEvent.email,
      notes: newEvent.notes,
    };

    dispatch(createEvent(newEventObject));
    toast.success("Event created successfully!");
    sendEmail(newEventObject);

    setModalOpen(false);
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

  const sendEmail = (eventDetails) => {
    const emailParams = {
      title: eventDetails.title,
      email: eventDetails.email,
      attendees: eventDetails.attendees.join(", "),
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

  // const handleAttendeeSelect = (event) => {
  //   const selectedOptions = Array.from(event.target.selectedOptions).map(
  //     (option) => option.value
  //   );
  //   setNewEvent({ ...newEvent, attendees: selectedOptions });
  // };

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
                <h5 className="modal-title">Create New Event</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEventSubmit} className="form-horizontal">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Event Title
                    </label>
                    <div className="col-sm-10">
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
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Start Date and Time
                    </label>
                    <div className="col-sm-4">
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

                    <label className="col-sm-2 col-form-label">
                      End Date and Time
                    </label>
                    <div className="col-sm-4">
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

                  {/* Attendee Selection */}
                  {/* <div className="form-group row">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="attendeeSelect"
                    >
                      Attendees
                    </label>
                    <div className="col-sm-10"> */}
                  {/* <select
                        id="attendeeSelect"
                        className="form-control"
                        multiple
                        value={newEvent.attendees}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            attendee: e.target.value,
                          })
                        }
                      >
                        <option value="">-- select an attendee --</option>
                        {attendees.map((attendee) => (
                          <option key={attendee.id} value={attendee.id}>
                            {attendee.attendee_name}
                          </option>
                        ))}

                      </select> */}

                  {/* Attendee Selection */}
                  <div className="form-group row">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="attendeeSelect"
                    >
                      Attendees
                    </label>
                    <div className="col-sm-10">
                      <select
                        id="attendeeSelect"
                        name="attendee.attendee_name"
                        className="form-control"
                        multiple
                        value={newEvent.attendees}
                        onChange={handleAttendeeSelect}
                      >
                        <option value="">--select an attendee--</option>
                        {attendees.length > 0 ? (
                          attendees.map((attendee) => (
                            <option key={attendee.id} value={attendee.id}>
                              {attendee.attendee_name}
                            </option>
                          ))
                        ) : (
                          <option value="">no attendee found</option>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Other form fields... */}
                  {/* 
                    </div>
                  </div> */}

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
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
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Notes</label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
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
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSystem;
