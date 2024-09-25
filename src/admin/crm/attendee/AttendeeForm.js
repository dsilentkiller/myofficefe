import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAttendee, fetchAttendee } from "../../redux/slice/attendeeSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AttendeeForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    attendee_name: "",
    email: "",
    // whatsapp_no: "",
    pri_phone: "",
    organization_name: "",
    organization_detail: "",
    // created: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.attendees.createStatus);
  const createError = useSelector((state) => state.attendees.createError);
  const attendees = useSelector((state) => state.attendees.list || []);

  useEffect(() => {
    dispatch(fetchAttendee());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Attendee created successfully!");
      setFormData({
        attendee_name: "",
        email: "",
        // whatsapp_no: "",
        pri_phone: "",
        organization_name: "",
        organization_detail: "",
        // created: "",
      });
      navigate("/dashboard/crm/attendee");
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

  const validatePhoneNumber = (value) => {
    const phoneLength = value.replace(/\D/g, "").length;
    if (phoneLength >= 10 && phoneLength <= 15) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
    setPhoneNumber(value);
  };

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
    const existingAttendee = attendees.some(
      (attendee) =>
        attendee.attendee_name &&
        attendee.attendee_name.toLowerCase() ===
          formData.attendee_name.toLowerCase()
    );

    if (existingAttendee) {
      toast.error("Attendee with this name already exists.");
      return;
    }

    dispatch(createAttendee(formData))
      .unwrap()
      .then(() => {
        setFormData({
          attendee_name: "",
          email: "",
          // whatsapp_no: "",
          pri_phone: "",
          organization_name: "",
          organization_detail: "",
          // created: "",
        });
        navigate("/dashboard/crm/attendee");
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
              <h4 className="btn btn-primary">Add Attendee</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="attendee_name">Name:</label>
                      <input
                        type="text"
                        id="attendee_name"
                        name="attendee_name"
                        value={formData.attendee_name}
                        className="form-control"
                        placeholder="Enter attendee name"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.attendee_name && <p>{errors.attendee_name}</p>}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
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
                  </div>
                  {errors.email && <p>{errors.email}</p>}
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
                      <label htmlFor="pri_phone">Phone:</label>
                      <PhoneInput
                        country={"nepal"} // Set a default country
                        value={formData.pri_phone}
                        onChange={validatePhoneNumber}
                        inputStyle={{
                          width: "100%",
                          borderColor: phoneValid ? "green" : "red",
                          backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
                        }}
                      />
                      {!phoneValid && (
                        <p style={{ color: "red" }}>
                          Please enter a valid phone number between 10 and 15
                          digits.
                        </p>
                      )}
                    </div>
                  </div>
                  {errors.pri_phone && <p>{errors.pri_phone}</p>}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="organization_name">
                        Organization Name:
                      </label>
                      <input
                        type="text"
                        id="organization_name"
                        name="organization_name"
                        value={formData.organization_name}
                        className="form-control"
                        placeholder="Enter organization name"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.organization_name && (
                      <p>{errors.organization_name}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="organization_detail">
                        Organization Detail:
                      </label>
                      <input
                        type="text"
                        id="organization_detail"
                        name="organization_detail"
                        value={formData.organization_detail}
                        className="form-control"
                        placeholder="Enter organization details"
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  {errors.organization_detail && (
                    <p>{errors.organization_detail}</p>
                  )}
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

export default AttendeeForm;
