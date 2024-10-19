import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAttendees,
  deleteAttendee,
} from "../../redux/slice/crm/attendeeSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import "../../css/Table.css";

const AttendeeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [attendeeToDelete, setAttendeeToDelete] = useState(null);

  // Access state from Redux
  const updateStatus = useSelector((state) => state.attendees?.updateStatus);
  const updateError = useSelector((state) => state.attendees?.updateError);

  const fetchError = useSelector((state) => state.attendees.fetchError);
  const {
    list: attendees = [], // Default to empty array if undefined
    isLoading,
    error,
    deleteError,
  } = useSelector((state) => state.attendees || {});

  // fetching attendees data from attendees list
  useEffect(() => {
    dispatch(fetchAttendees());
  }, [dispatch]);

  const handleDelete = (id) => {
    setAttendeeToDelete(id);
    // Don't re-fetch attendees here, let the confirmation trigger it
  };

  const confirmDelete = (id) => {
    dispatch(deleteAttendee(id))
      .unwrap()
      .then(() => {
        toast.success("Attendee deleted successfully!");
        setAttendeeToDelete(null); // Close the modal after successful deletion
        dispatch(fetchAttendees()); // Refresh the list only once
      })
      .catch((error) => {
        toast.error(
          `Failed to delete attendee: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };

  //--converting first letter  capital
  const formatName = (attendee_name) => {
    if (!attendee_name) return "";
    return attendee_name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // Filter categories for search term
  const filteredAttendees = attendees.filter((attendee) =>
    attendee.attendee_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-wrapper">
      {/* <div className="col-mg-12"> */}
      <div className="row justify-content-center">
        <div className="card">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <h5 className="navbar-brand">Attendee Table</h5>
              <div className="navbar-nav ml-auto">
                <Link to="create" className="nav-link btn btn-primary">
                  <h5>Add Attendee</h5>
                </Link>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="form-inline ml-3"
                >
                  <div className="input-group">
                    <input
                      type="search"
                      id="default-search"
                      name="search_term"
                      value={searchTerm}
                      className="form-control"
                      placeholder="Search attendees..."
                      onChange={(e) => setSearchTerm(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </nav>
          <div className="card-body">
            <div className="table-container">
              {fetchError && <p className="text-danger">{fetchError}</p>}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>purpose</th>
                    <th>Organization Name</th>
                    <th>organization detail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendees.length > 0 ? (
                    filteredAttendees.map((attendee, index) => (
                      <tr key={attendee.id}>
                        <td>{index + 1}</td>
                        <td>{attendee.attendee_name}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.pri_phone}</td>
                        <td>{attendee.purpose}</td>
                        <td>{attendee.organization_name}</td>
                        <td>{attendee.organization_detail}</td>
                        <td>
                          <Link
                            to={`/edit/${attendee.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>

                          <span></span>
                          <Link
                            to={`/detail/${attendee.id}`}
                            className="btn btn-info btn-sm"
                          >
                            view
                          </Link>
                          <span></span>
                          <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleDelete(attendee.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No attendees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AttendeeTable;
