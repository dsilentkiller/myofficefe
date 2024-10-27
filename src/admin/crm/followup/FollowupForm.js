// for both create and update form
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
import {
  createFollowup,
  updateFollowup,
  fetchFollowupById,
} from "../../redux/slice/crm/FollowupSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FollowupForm = () => {
  const { id } = useParams(); // Get the Followup ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState({ toggle: false });

  // Correctly set the toggle only once on component mount
  useEffect(() => {
    setToggleState((prevState) => ({ ...prevState, toggle: true }));
  }, []); // Empty dependency array ensures this runs only once

  const [phoneValid, setPhoneValid] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    Followup_name: "",
    email: "",
    pri_phone: "",
    organization_name: "",
    organization_detail: "",
    purpose: "",
    // remark :"",
  });

  const createStatus = useSelector((state) => state.Followups.createStatus);
  const createError = useSelector((state) => state.Followups.createError);
  const currentFollowup = useSelector(
    (state) => state.Followups.currentFollowup
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchFollowupById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentFollowup && id) {
      setFormData({
        Followup_name: currentFollowup.Followup_name || "",
        email: currentFollowup.email || "",
        pri_phone: currentFollowup.pri_phone || "",
        organization_name: currentFollowup.organization_name || "",
        organization_detail: currentFollowup.organization_detail || "",
        purpose: currentFollowup.purpose || "",
      });
    }
  }, [currentFollowup, id]);

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
      // Update Followup
      dispatch(updateFollowup({ id, ...formData }))
        .unwrap()
        .then(() => {
          toast.success("Followup updated successfully!");
          navigate("/dashboard/crm/Followup");
        })
        .catch((error) => {
          console.error("Update Error:", error);
          toast.error(
            `Failed to update Followup: ${error.message || "An error occurred"}`
          );
        });
    } else {
      // Create Followup
      dispatch(createFollowup(formData))
        .unwrap()
        .then(() => {
          toast.success("Followup created successfully!");
          setFormData({
            Followup_name: "",
            email: "",
            pri_phone: "",
            organization_name: "",
            organization_detail: "",
            purpose: "",
          });
          navigate("/dashboard/crm/Followup");
        })
        .catch((error) => {
          console.error("Create Error:", error);
          toast.error(
            `Failed to create Followup: ${error.message || "An error occurred"}`
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
              <h4 className="btn btn-primary">
                {id ? "Update Followup" : "Add Followup"}
              </h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Name Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="Followup_name">Name:</label>
                      <input
                        type="text"
                        id="Followup_name"
                        name="Followup_name"
                        value={formData.Followup_name}
                        className="form-control"
                        placeholder="Enter Followup name"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Followup_name: e.target.value,
                          })
                        }
                        required
                      />
                      {errors.Followup_name && <p>{errors.Followup_name}</p>}
                    </div>
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
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                      {errors.email && <p>{errors.email}</p>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Phone Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="pri_phone">Phone:</label>
                      <PhoneInput
                        country={"np"}
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
                    {errors.pri_phone && <p>{errors.pri_phone}</p>}
                  </div>

                  {/* Purpose Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="purpose">Purpose:</label>
                      <input
                        type="text"
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        className="form-control"
                        placeholder="Enter purpose"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            purpose: e.target.value,
                          })
                        }
                        required
                      />
                      {errors.purpose && <p>{errors.purpose}</p>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Organization Name Field */}
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization_name: e.target.value,
                          })
                        }
                        required
                      />
                      {errors.organization_name && (
                        <p>{errors.organization_name}</p>
                      )}
                    </div>
                  </div>

                  {/* Organization Detail Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="organization_detail">
                        Organization Detail:
                      </label>
                      <textarea
                        id="organization_detail"
                        name="organization_detail"
                        value={formData.organization_detail}
                        className="form-control"
                        placeholder="Enter organization details"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization_detail: e.target.value,
                          })
                        }
                        required
                      />
                      {errors.organization_detail && (
                        <p>{errors.organization_detail}</p>
                      )}
                    </div>
                  </div>
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

export default FollowupForm;
