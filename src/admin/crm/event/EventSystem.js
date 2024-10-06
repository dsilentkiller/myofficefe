import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/slice/crm/eventSlice";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "admin-lte/dist/css/adminlte.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Include toastify styles

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    email: "",
    notes: "",
    is_canceled: false,
  });

  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.events); // Fetch events from Redux
  console.log("Events:", events); // Log the events to ensure they are correctly fetched

  const handleSelectSlot = ({ start, end }) => {
    setFormData({ ...formData, start, end });
    setModalOpen(true);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();

    const formDataObject = {
      id: Date.now(), // Unique ID
      title: formData.title,
      start: new Date(formData.start), // Ensure this is a valid Date object
      end: new Date(formData.end), // Ensure this is a valid Date object
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
          style={{
            display: modalOpen ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
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
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                          })
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
                          setFormData({
                            ...formData,
                            start: e.target.value,
                          })
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
                          setFormData({
                            ...formData,
                            end: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
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
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
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
