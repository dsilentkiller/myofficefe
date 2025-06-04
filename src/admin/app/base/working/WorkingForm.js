import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createWorking } from "../../../../redux/slice/admin/base/workingSlice";
const WorkingForm = () => {
  // State to manage form data company name kunama .. view charm attractive
  const [name, setName] = useState("");
  const [workingdays, setWorkingDays] = useState([]);

  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.workings.createStatus);
  const createError = useSelector((state) => state.workings.createError);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("working created successfully!");
      setFormData({ name: "" });
      navigate("/dashboard/setup/working");
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
    dispatch(createWorking(formData));
  };

  return (
    <>
      {/* div className="content-wrapper" */}
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Add Working Days</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Day Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    className="form-control"
                    // onChange={(e) => setWorkingDays(e.target.value)}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Working Day:</label>
                  <input
                    type="text"
                    id="working_days"
                    name="working_days"
                    value={workingdays}
                    className="form-control"
                    // onChange={(e) => setWorkingDays(e.target.value)}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Working Day
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingForm;
