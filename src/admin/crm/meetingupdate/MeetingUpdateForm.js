import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createMeetingUpdate,
  fetchMeetingUpdate,
} from "../../../redux/slice/meetingUpdateSlice";

const MeetingUpdateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    conclusion: "",
    followup_by: "",
    followup_due_date: "",
    remark: "",
    // status:"",
    // status:"2nd Meeting need","3rd Meeting need","4th Meeting Need","5th meeting need","Converted to Work","Mark as Lost"
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector(
    (state) => state.meetingupdates.createStatus
  );
  const createError = useSelector((state) => state.meetingupdates.createError);
  const meetingupdates = useSelector(
    (state) => state.meetingupdates.list || []
  );

  useEffect(() => {
    dispatch(fetchMeetingUpdate()); // Ensure meetingupdates are fetched on component mount
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("meetingupdate created successfully!");
      setFormData({ name: "" }); // Clear the form after successful creation
      navigate("/dashboard/setup/meetingupdate");
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

    // Check if meetingupdate name already exists
    const existingMeetingUpdate = meetingupdates.some(
      (dept) =>
        dept.title && dept.title.toLowerCase() === formData.title.toLowerCase()
    );

    if (existingMeetingUpdate) {
      toast.error("meeting update with this name already exists.");
      return;
    }

    dispatch(createMeetingUpdate(formData))
      .unwrap()
      .then(() => {
        setFormData({
          title: "",
          conclusion: "",
          followup_by: "",
          followup_due_date: "",
          remark: "",
        }); // Clear the form after successful creation
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
              <h4 className="btn btn-primary">Add Meeting Update</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    className="form-control"
                    placeholder="Enter update title "
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* conclusion */}

                <div className="form-group">
                  <label htmlFor="conclusion">Meeting conclusion:</label>
                  <input
                    type="text"
                    id="conclusion"
                    name="conclusion"
                    value={formData.conclusion}
                    className="form-control"
                    placeholder="Enter conclusion name"
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* folowup by */}
                <div className="form-group">
                  <label htmlFor="name">followup by:</label>
                  <input
                    type="text"
                    id="followup_by"
                    name="followup_by"
                    value={formData.followup_by}
                    className="form-control"
                    placeholder="call ,sms , email ... "
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* date followup  */}
                <div className="form-group">
                  <label htmlFor="name">followup Due Date:</label>
                  <input
                    type="date"
                    id="followup_due_date"
                    name="followup_due_date"
                    value={formData.followup_due_date}
                    className="form-control"
                    placeholder="2024 sep 14 ..... "
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* remark */}
                <div className="form-group">
                  <label htmlFor="remark">followup Due Date:</label>
                  <input
                    type="text"
                    id="remark"
                    name="remark"
                    value={formData.remark}
                    className="form-control"
                    placeholder="will held next meeting --- "
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

export default MeetingUpdateForm;
