import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { meetingDetail } from "../../redux/slice/crm/meetingSlice";

const MeetingDetail = () => {
  const { id } = useParams(); // Fetch eventId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meetingDetails = useSelector((state) => state.meetings.currentMeeting);
  const loading = useSelector((state) => state.meetings.loading);
  const error = useSelector((state) => state.meetings.error);

  // Fetch meeting details based on the meeting ID
  useEffect(() => {
    if (id) {
      dispatch(meetingDetail(id)); // Fetch meeting data based on the ID
    }
  }, [dispatch, id]);

  // If loading or error, handle it appropriately
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // If meeting is not found
  if (!meetingDetails) {
    toast.error("Meeting not found.");
    navigate("/dashboard/crm/meetings/");
    return null;
  }

  return (
    <div className="content-wrapper">
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Meeting Details</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={meetingDetails.title || ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="conclusion">Meeting Conclusion:</label>
                <input
                  type="text"
                  id="conclusion"
                  name="conclusion"
                  value={meetingDetails.conclusion || ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="followup_by">Followup By:</label>
                <input
                  type="text"
                  id="followup_by"
                  name="followup_by"
                  value={meetingDetails.followup_by || ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="followup_due_date">Followup Due Date:</label>
                <input
                  type="text"
                  id="followup_due_date"
                  name="followup_due_date"
                  value={meetingDetails.followup_due_date || ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="remark">Remark:</label>
                <input
                  type="text"
                  id="remark"
                  name="remark"
                  value={meetingDetails.remark || ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={meetingDetails.status || ""}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/dashboard/crm/meetings/")}
                >
                  Back to Meetings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
