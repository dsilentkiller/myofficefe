import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/slice/crm/eventSlice";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "admin-lte/dist/css/adminlte.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAttendees } from "../../redux/slice/crm/attendeeSlice";
import { fetchEvents } from "../../redux/slice/crm/eventSlice";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
    email: "",
    notes: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.list || []);
  const { list: attendees } = useSelector((state) => state.attendees);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const handleSelectSlot = ({ start, end }) => {
    setFormData({ ...formData, start, end });
    toggleModal();
  };

  useEffect(() => {
    dispatch(fetchAttendees());
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEventSubmit = (e) => {
    e.preventDefault();

    // Check for existing events with the same title and time
    const isDuplicate = events.some(
      (event) =>
        event.title === formData.title &&
        new Date(event.start).getTime() ===
          new Date(formData.start).getTime() &&
        new Date(event.end).getTime() === new Date(formData.end).getTime()
    );

    if (isDuplicate) {
      toast.error("An event with the same title and time already exists!");
      return;
    }

    const formDataObject = {
      id: Date.now(),
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
      attendees: formData.attendees,
      email: formData.email,
      notes: formData.notes,
    };

    dispatch(createEvent(formDataObject));
    toast.success("Event created successfully!");

    setModalOpen(false);
    setFormData({
      title: "",
      start: "",
      end: "",
      attendees: [],
      email: "",
      notes: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "attendees") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
                    style={{ height: 500 }}
                    views={{
                      month: true,
                      week: true,
                      day: true,
                      agenda: true,
                    }}
                  />
                  <h2>Upcoming Events</h2>
                  <div className="agenda">
                    {events.length > 0 ? (
                      <ul>
                        {events.map((event) => (
                          <li key={event.id}>
                            <strong>{event.title}</strong>
                            <br />
                            <span>
                              {moment(event.start).format(
                                "MMMM Do YYYY, h:mm a"
                              )}{" "}
                              - {moment(event.end).format("h:mm a")}
                            </span>
                            <p>{event.notes}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No upcoming events.</p>
                    )}
                  </div>
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
          style={{
            display: modalOpen ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div
              className="modal-content"
              style={{
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              }}
            >
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
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Start Date
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={moment(formData.start).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        onChange={(e) =>
                          setFormData({ ...formData, start: e.target.value })
                        }
                        required
                      />
                    </div>

                    <label className="col-sm-2 col-form-label">End Date</label>
                    <div className="col-sm-4">
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={moment(formData.end).format("YYYY-MM-DDTHH:mm")}
                        onChange={(e) =>
                          setFormData({ ...formData, end: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Attendees</label>
                    <div className="col-sm-10">
                      <select
                        id="attendees"
                        name="attendees"
                        value={formData.attendees}
                        onChange={handleInputChange}
                        className="form-control"
                        multiple
                        required
                      >
                        {attendees.length > 0 ? (
                          attendees.map((attendee) => (
                            <option key={attendee.id} value={attendee.id}>
                              {attendee.attendee_name}
                            </option>
                          ))
                        ) : (
                          <option value="">No attendees available</option>
                        )}
                      </select>
                      <div className="mt-2">
                        <span>Selected Attendees: </span>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {formData.attendees.map((attendeeId) => {
                            const attendee = attendees.find(
                              (a) => a.id === attendeeId
                            );
                            return attendee ? (
                              <span
                                key={attendeeId}
                                className="badge badge-info mr-2"
                                style={{
                                  marginRight: "5px",
                                  marginBottom: "5px",
                                }}
                              >
                                {attendee.attendee_name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          navigate("/dashboard/crm/attendee/create/")
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter attendee email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
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
                        rows="3"
                        placeholder="Additional notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create Event
                    </button>
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
