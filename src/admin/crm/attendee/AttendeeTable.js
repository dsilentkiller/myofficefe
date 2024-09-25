import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendee,
  updateAttendee,
  deleteAttendee,
  // updateStatus,
  // updateError,
} from "../../redux/slice/attendeeSlice";
import { Link } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import AttendeeDelete from "./AttendeeDelete";
import { toast } from "react-toastify"; // Import toast for error messages
// import "../../../css/Table.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
// import "../../../css/Table.css";

const AttendeeTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendeeToDelete, setAttendeeToDelete] = useState(null);
  // Access updateStatus state property
  // const updateStatus = useSelector((state) => state.attendee.updateStatus);
  // const updateError = useSelector((state) => state.attendee.updateError);
  const {
    list: attendees = [],
    // isLoading,
    // error,
    // deleteStatus,
    deleteError,
  } = useSelector((state) => state.attendees || {});

  useEffect(() => {
    dispatch(fetchAttendee());
  }, [dispatch]);

  // To update item in the table
  // const handleEdit = (id, name) => {
  //   setEditId(id);
  //   setNewName(name);
  // };

  // // Handle update item in attendee table
  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   if (editId !== null) {
  //     dispatch(updateAttendee({ id: editId, name: newName }));
  //     setEditId(null);
  //     setNewName("");
  //   }
  // };
  //-----update status toast--------
  // useEffect(() => {
  //   if (updateStatus === "succeeded") {
  //     toast.success("attendees updated successfully!");
  //   } else if (updateStatus === "failed") {
  //     toast.error(
  //       `Failed to update attendee: ${updateError || "Unknown error"}`
  //     );
  //   }
  // }, [updateStatus, updateError]);
  //--converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // Handle delete confirmation
  // const handleDelete = (id) => {
  //   setAttendeeToDelete(id); // Set the attendee ID to trigger the modal
  // };

  const confirmDelete = (id) => {
    dispatch(deleteAttendee(id))
      .unwrap()
      .then(() => {
        toast.success("attendee deleted successfully!");
        setAttendeeToDelete(null); // Close the modal after successful deletion
        dispatch(fetchAttendee()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete attendee: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };
  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      attendees.map((attendee) => ({
        ID: attendee.id,
        Name: attendee.name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "attendees");
    XLSX.writeFile(workbook, "attendee.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("attendees List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = attendees.map((attendee) => [attendee.id, attendee.name]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("attendee.pdf");
  };

  return (
    <div className="content-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h5 className="navbar-brand">attendee List</h5>
          <div className="navbar-nav ml-auto">
            <Link to="create" className="nav-link btn btn-primary">
              <h5>Add attendee</h5>
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchTerm(e.target.q.value);
              }}
              className="form-inline ml-3"
            >
              <div className="input-group">
                search
                <input
                  type="search"
                  id="default-search"
                  name="search_term"
                  value={searchTerm}
                  className="form-control"
                  placeholder="Search attendee..."
                  onChange={handleSearchChange}
                  required
                />
              </div>
            </form>
          </div>

          <div className="form-inline ml-4" id="navbarSupportedContent">
            <ul className="navbar-nav mr-30">
              <li className="nav-item">
                <button
                  id="exportExcel"
                  className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                  onClick={exportToExcel}
                >
                  Export Excel
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="exportPDF"
                  className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                  onClick={exportToPDF}
                >
                  Export PDF
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="content-header">
        <h1>Attendees List</h1>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>WhatsApp</th>
                    <th>Phone</th>
                    <th>Organization</th>
                    <th>Organization Details</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.length > 0 ? (
                    attendees
                      .filter((attendee) =>
                        attendee.name
                          ?.toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      // {attendee.length > 0 ? (
                      .map((attendee, index) => (
                        <tr key={attendee.id}>
                          <td>{index + 1}</td>
                          <td>{formatName(attendee.name)}</td>
                          <td>{formatName(attendee.email)}</td>
                          <td>{attendee.whatsapp}</td>
                          <td>{attendee.pri_phone}</td>
                          <td>{attendee.organization}</td>
                          <td>{attendee.organizationDetail}</td>
                          <td>
                            <Link to={`/attendees/update/${attendee.id}`}>
                              <FaEdit /> Edit
                            </Link>
                            |
                            <Link to={`/attendees/detail/${attendee.id}`}>
                              View
                            </Link>
                            |
                            <Link to={`/attendees/delete/${attendee.id}`}>
                              <FaTrash /> Delete
                            </Link>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Attendees Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        {/* {attendeeToDelete !== null && (
          <AttendeeDelete
            id={attendeeToDelete}
            onClose={() => setAttendeeToDelete(null)}
            onConfirm={() => confirmDelete(attendeeToDelete)}
          />
        )} */}
      </section>
    </div>
  );
};

export default AttendeeTable;
