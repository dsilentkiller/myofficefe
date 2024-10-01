import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEvent, fetchEvent } from "../../redux/slice/eventSlice";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EventForm = () => {
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    events: "",
    email: "",
    notes: "",
    is_canceled: false,
    // created: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.events.createStatus);
  const createError = useSelector((state) => state.events.createError);
  const events = useSelector((state) => state.events.list || []);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("event created successfully!");
      setFormData({
        title: "",
        start: "",
        // whatsapp_no: "",
        events: "",
        email: "",
        notes: "",
        // created: "",
      });
      navigate("/dashboard/crm/event");
    }
  }, [createStatus, navigate]);

  useEffect(() => {
    if (createStatus === "failed") {
      toast.error(`Error: ${createError.message || "An error occurred"}`);
    }
  }, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const validatePhoneNumber = (value) => {
  //     const phoneLength = value.replace(/\D/g, "").length;
  //     if (phoneLength >= 10 && phoneLength <= 15) {
  //       setPhoneValid(true);
  //     } else {
  //       setPhoneValid(false);
  //     }
  //     setPhoneNumber(value);
  //   };

  // const validateWhatsappNumber = (value) => {
  //   const phoneLength = value.replace(/\D/g, "").length;
  //   if (phoneLength >= 10 && phoneLength <= 15) {
  //     setPhoneValid(true);
  //   } else {
  //     setPhoneValid(false);
  //   }
  //   setPhoneNumber(value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingEvent = events.some(
      (event) =>
        event.title &&
        event.title.toLowerCase() === formData.title.toLowerCase()
    );

    if (existingEvent) {
      toast.error("event with this name already exists.");
      return;
    }

    dispatch(createEvent(formData))
      .unwrap()
      .then(() => {
        setFormData({
          title: "",
          start: "",
          // whatsapp_no: "",
          events: "",
          email: "",
          notes: "",
          // created: "",
        });
        navigate("/dashboard/crm/event");
      })
      .catch((error) => {
        console.error("Create Error:", error.response); // Log detailed error
      });
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Event</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="title">Event Name:</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        className="form-control"
                        placeholder="Enter event name"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.title && <p>{errors.title}</p>}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start">start:</label>
                      <input
                        type="start"
                        id="start"
                        name="start"
                        value={formData.start}
                        className="form-control"
                        placeholder="Enter start"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  {errors.start && <p>{errors.start}</p>}
                </div>

                <div className="row">
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="whatsapp_no">whatsapp no :</label>
                      <PhoneInput
                        country={"nepal"} // Set a default country
                        value={formData.whatsapp_no}
                        onChange={validateWhatsappNumber}
                        inputStyle={{
                          width: "100%",
                          borderColor: phoneValid ? "green" : "red",
                          backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
                        }}
                      />
                      {!phoneValid && (
                        <p style={{ color: "red" }}>
                          Please enter a valid whatsapp_no number between 10 and
                          15 digits.
                        </p>
                      )}
                    </div>
                    {errors.whatsapp_no && <p>{errors.contact_no}</p>}
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="events">Phone:</label>
                      <input
                        type="date"
                        id="date"
                        name="start"
                        value={formData.email}
                        className="form-control"
                        placeholder="Enter organization name"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.email && <p>{errors.email}</p>}
                  </div>
                  {errors.phone && <p>{errors.phone}</p>}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        className="form-control"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.email && <p>{errors.email}</p>}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="notes">Notes:</label>
                      <input
                        type="text"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        className="form-control"
                        placeholder="Enter notes"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  {errors.notes && <p>{errors.notes}</p>}
                </div>
                {errors.non_field_errors && <p>{errors.non_field_errors[0]}</p>}

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
