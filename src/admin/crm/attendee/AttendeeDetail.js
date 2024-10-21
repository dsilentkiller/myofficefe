import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendeeById } from "../../redux/slice/crm/attendeeSlice";
import AttendeeDelete from "./AttendeeDelete";
import { toast, ToastContainer } from "react-toastify";

const AttendeeDetail = () => {
  const { id } = useParams(); // Get the attendee ID from the URL
  const dispatch = useDispatch();
  const attendee = useSelector((state) =>
    state.attendees.list.find((att) => att.id === Number(id))
  );
  //   const attendee = useSelector((state) => state.attendees.selectedAttendee);
  const loading = useSelector((state) => state.attendees.loading);
  const error = useSelector((state) => state.attendees.error);
  const navigate = useNavigate();

  const [attendeeToDelete, setAttendeeToDelete] = useState(null);

  // Fetch attendee by ID when component mounts
  useEffect(() => {
    dispatch(fetchAttendeeById(id));
  }, [dispatch, id]);

  // Log the fetched attendee data for debugging
  useEffect(() => {
    console.log("Fetched attendee:", attendee);
  }, [attendee]);

  if (loading) {
    return <p>Loading attendee details...</p>;
  }

  if (error) {
    return <p>Error: {error.detail || "An unknown error occurred."}</p>;
  }

  if (!attendee) {
    return <p>No attendee found!</p>;
  }

  return (
    <div className="content-wrapper">
      <h2>{attendee.attendee_name} Details</h2>
      <p>Email: {attendee.email}</p>
      <p>Phone: {attendee.pri_phone}</p>
      <p>Purpose: {attendee.purpose}</p>
      <p>Organization Name: {attendee.organization_name}</p>
      <p>Organization Detail: {attendee.organization_detail}</p>

      <Button
        variant="primary"
        onClick={() =>
          navigate(`/dashboard/crm/attendee/update/${attendee.id}`)
        }
      >
        Update attendee
      </Button>

      <Button
        variant="danger"
        onClick={() => setAttendeeToDelete(attendee.id)}
        className="ms-2"
      >
        Delete attendee
      </Button>

      {attendeeToDelete !== null && (
        <AttendeeDelete
          id={attendeeToDelete}
          onClose={() => setAttendeeToDelete(null)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default AttendeeDetail;
