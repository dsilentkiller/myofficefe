import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useParams } from "react-router-dom";
import { updateMeeting } from "../../redux/slice/crm/meetingSlice";
import { TextField } from "@mui/material";
import { meetingDetail } from "../../redux/slice/crm/meetingSlice";

const MeetingUpdateForm = () => {
  const { id } = useParams(); // Fetch eventId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Modal open stat
  const meetingToUpdate = useSelector((state) => state.meetings.currentMeeting);
  //   const meetingDetails = useSelector((state) => state.meetings.currentMeeting);
  useEffect(() => {
    if (id) {
      dispatch(meetingDetail(id)); // Fetch meeting data based on the ID
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (id) {
      dispatch(updateMeeting(id)); // Fetch meeting data based on the ID
    }
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    title: "",
    conclusion: "",
    followup_by: "",
    followup_due_date: "",
    remark: "",
    status: "",
  });

  const meetings = useSelector((state) => state.meetings?.list || []);
  console.log("meeting old data:", meetings);
  console.log("Meeting to update:", meetingToUpdate);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   projectbyid
  //   useEffect(() => {
  //     if (id) {
  //       dispatch(updateMeeting(id));
  //     }
  //   }, [dispatch, id]);

  useEffect(() => {
    if (meetingToUpdate && id) {
      setFormData({
        title: meetingToUpdate.title || "",
        conclusion: meetingToUpdate.conclusion || "",
        followup_by: meetingToUpdate.followup_by || "",
        followup_due_date: meetingToUpdate.followup_due_date || "",
        remark: meetingToUpdate.remark || "",
        status: meetingToUpdate.status || "",
      });
    } else if (!meetingToUpdate && id) {
      toast.error("Failed to load update details for update.");
    }
  }, [meetingToUpdate, id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.title ||
      !formData.conclusion ||
      !formData.followup_by ||
      !formData.followup_due_date ||
      !formData.remark ||
      !formData.status
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      if (id) {
        // If there's an ID, it's an update, not a create
        const result = await dispatch(updateMeeting({ id, formData })).unwrap();
        toast.success("Meeting updated successfully!");
        navigate("/dashboard/crm/meetings");
      }

      // Reset form fields after submission
      setFormData({
        title: "",
        conclusion: "",
        followup_by: "",
        followup_due_date: "",
        remark: "",
        status: "",
      });
    } catch (error) {
      console.error("Error occurred during meeting update creation:", error);
      toast.error("Failed to update meeting.");
      navigate("/dashboard/crm/meetings");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Meeting Update</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    className="form-control"
                    placeholder="Enter update title"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="conclusion">Meeting Conclusion:</label>
                  <TextField
                    type="text"
                    id="conclusion"
                    name="conclusion"
                    value={formData.conclusion}
                    className="form-control"
                    placeholder="Enter conclusion"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="followup_by">Followup By:</label>
                  <select
                    id="followup_by"
                    name="followup_by"
                    value={formData.followup_by}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="text">Text</option>
                    <option value="call">Call</option>
                    <option value="physical meeting">Physical Meeting</option>
                    <option value="online meeting">Online Meeting</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="followup_due_date">Followup Due Date:</label>
                  <input
                    type="date"
                    id="followup_due_date"
                    name="followup_due_date"
                    value={formData.followup_due_date}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="remark">Remark:</label>
                  <TextField
                    type="text"
                    id="remark"
                    name="remark"
                    value={formData.remark}
                    className="form-control"
                    placeholder="Add any remarks"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Status */}
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/dashboard/crm/meetings/`)}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingUpdateForm;
