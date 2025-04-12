import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAttendee, fetchAttendee } from "../../redux/slice/attendeeSlice";
import { AcroFormTextField } from "jspdf";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { F } from "react-icons/fa";
// import { createAttendee } from "../../../redux/slice/attendeeSlice";

const AttendeeForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [formData, setFormData] = useState({
    attendee_name: "",
    email: "",
    whatsapp: "",
    phone: "",
    organization_name: "",
    organization_detail: "",
    created: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.attendees.createStatus);
  const createError = useSelector((state) => state.attendees.createError);
  const attendees = useSelector((state) => state.attendees.list || []);

  useEffect(() => {
    dispatch(fetchAttendee()); // Ensure departments are fetched on component mount
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Attendee created successfully!");
      setFormData({
        attendee_name: "",
        email: "",
        whatsapp: "",
        phone: "",
        organization_name: "",
        organization_detail: "",
        created: "",
      }); // Clear the form after successful creation
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
  // Function to validate phone and WhatsApp fields
  // const validatePhoneNumber = (number) => {
  //   const phoneRegex = /^\+?\d{1,4}?\s?\d{10}$/; // Regex to allow both international and local formats
  //   return phoneRegex.test(number);
  // };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(submitFormData(formData));
  // };
  // Validation Function
  const validatePhoneNumber = (value) => {
    const phoneLength = value.replace(/\D/g, "").length; // Remove non-digit characters and get length
    if (phoneLength >= 10 && phoneLength <= 15) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (formData.name.trim() === "") return; // Prevent empty name submission
    // if (
    //   !formData.attendee_name ||
    //   !formData.email ||
    //   // !formData.whatsapp ||
    //   // !formData.phone ||
    //   !formData.organization_name ||
    //   !formData.organization_detail ||
    //   !formData.created
    // ) {
    //   toast.error("All fields are required.");
    //   return;
    // }

    // Validate phone numbers
    // if (!validatePhoneNumber(formData.phone)) {
    //   toast.error(
    //     "Invalid phone number. Please enter a valid 10-digit or international number."
    //   );
    //   return;
    // }

    // if (!validatePhoneNumber(formData.whatsapp)) {
    //   toast.error(
    //     "Invalid WhatsApp number. Please enter a valid 10-digit or international number."
    //   );
    //   return;
    // }

    // Check if department name already exists
    // const existingAttendee = attendees.some(
    //   (dept) =>
    //     dept.attendee_name &&
    //     dept.attendee_name.toLowerCase() ===
    //       formData.attendee_name.toLowerCase()
    // );

    // if (existingAttendee) {
    //   toast.error("Attendee with this name already exists.");
    //   return;
    // }

    // Check if attendee name already exists
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

    // Dispatch the createAttendee action to submit the form
    dispatch(createAttendee(formData))
      .unwrap()
      .then(() => {
        setFormData({
          attendee_name: "",
          email: "",
          // whatsapp: "",
          phone: "",
          organization_name: "",
          organization_detail: "",
          created: "",
        }); // Clear the form after successful creation
        navigate("/dashboard/crm/attendee");
      })
      .catch((error) => {
        console.error("Create Error:", error);
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
                  />
                </div>
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
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp:</label>
                 
                  <PhoneInput
                    country={"nepal"} // Set a default country
                    value={formData.whatsapp}
                    onChange={validatePhoneNumber}
                    inputStyle={{
                      borderColor: phoneValid ? "green" : "red", // Change border color based on validation
                      backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee", // Change background color
                    }}
                  />
                  {!phoneValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid whatsapp number between 10 and 15
                      digits.
                    </p>
                  )}
                </div>
                

                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  {/* <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    className="form-control"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    required
                  /> */}
                  <PhoneInput
                    country={"nepal"} // Set a default country
                    value={formData.phone}
                    // onChange={validatePhoneNumber}
                    onChange={handleChange}
                    inputStyle={{
                      borderColor: phoneValid ? "green" : "red", // Change border color based on validation
                      backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee", // Change background color
                    }}
                  />
                  {!phoneValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid phone number between 10 and 15
                      digits.
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="organization_name">Organization Name:</label>
                  <input
                    type="text"
                    id="organization_name"
                    name="organization_name"
                    value={formData.organization_name}
                    className="form-control"
                    placeholder="Enter organization name"
                    onChange={handleChange}
                    required
                  />
                </div>

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
                  />
                </div>

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
