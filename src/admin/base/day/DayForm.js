import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDay, fetchDays } from "../../redux/slice/base/daySlice";

const DayForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.days.createStatus);
  const createError = useSelector((state) => state.days.createError);
  const days = useSelector((state) => state.days.list || []);

  useEffect(() => {
    dispatch(fetchDays()); // Ensure days are fetched on component mount
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Day created successfully!");
      setFormData({ name: "" }); // Clear the form after successful creation
      navigate("/dashboard/setup/day");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") return; // Prevent empty name submission

    // Check if Day name already exists
    const existingDay = days.some(
      (day) =>
        day.name && day.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingDay) {
      toast.error("Day with this name already exists.");
      return;
    }

    dispatch(createDay(formData))
      .unwrap()
      .then(() => {
        setFormData({ name: "" }); // Clear the form after successful creation
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
              <h4 className="btn btn-primary">Add Day</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    placeholder="Enter day Sunday ,Monday.. "
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

export default DayForm;
