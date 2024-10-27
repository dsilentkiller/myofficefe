// for both create and update form
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
import {
  createAttendee,
  updateAttendee,
  fetchAttendeeById,
} from "../../redux/slice/crm/attendeeSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AttendeeUpdate = () => {
  const { id } = useParams(); // Get the attendee ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    attendee_name: "",
    email: "",
    pri_phone: "",
    organization_name: "",
    organization_detail: "",
  });
  const currentAttendee = useSelector(
    (state) => state.attendees.currentAttendee
  );

  const createStatus = useSelector((state) => state.attendees.createStatus);
  const createError = useSelector((state) => state.attendees.createError);

  useEffect(() => {
    if (id) {
      dispatch(fetchAttendeeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentAttendee && id) {
      setFormData({
        attendee_name: currentAttendee.attendee_name || "",
        email: currentAttendee.email || "",
        pri_phone: currentAttendee.pri_phone || "",
        organization_name: currentAttendee.organization_name || "",
        organization_detail: currentAttendee.organization_detail || "",
      });
    }
  }, [currentAttendee, id]);

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
    setFormData({ ...formData, pri_phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update attendee
      dispatch(updateAttendee({ id, ...formData }))
        .unwrap()
        .then(() => {
          toast.success("Attendee updated successfully!");
          navigate("/dashboard/crm/attendee");
        })
        .catch((error) => {
          console.error("Update Error:", error);
          toast.error(
            `Failed to update attendee: ${error.message || "An error occurred"}`
          );
        });
    } else {
      // Create attendee
      dispatch(createAttendee(formData))
        .unwrap()
        .then(() => {
          toast.success("Attendee created successfully!");
          setFormData({
            attendee_name: "",
            email: "",
            pri_phone: "",
            organization_name: "",
            organization_detail: "",
          });
          navigate("/dashboard/crm/attendee");
        })
        .catch((error) => {
          console.error("Create Error:", error);
          toast.error(
            `Failed to create attendee: ${error.message || "An error occurred"}`
          );
        });
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary"EnquiryU>
                {id ? "Update Attendee" : "Add Attendee"}
              </h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                {/* ... your form fields here ... */}
                <div className="row">
                  {/* Name Field */}
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
                        // onChange={handleChange}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attendee_name: e.target.value,
                          })
                        }
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.attendee_name && <p>{errors.attendee_name}</p>}
                  </div>

                  {/* Email Field */}
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
                        // onChange={handleChange}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  {errors.email && <p>{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="pri_phone">Phone:</label>
                      <PhoneInput
                        country={"np"} // Country code for Nepal
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

                {/* Organization Fields */}
                <div className="row">
                  {/* Organization Name */}
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
                        // onChange={handleChange}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization_name: e.target.value,
                          })
                        }
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    {errors.organization_name && (
                      <p>{errors.organization_name}</p>
                    )}
                  </div>

                  {/* Organization Detail */}
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
                        // onChange={handleChange}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization_detail: e.target.value,
                          })
                        }
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

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                  {id ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeUpdate;
