import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ShiftTable() {
  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the shifts from the backend and set them in state
    // Example:
    // fetch('/api/shifts').then(response => response.json()).then(data => setShifts(data));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const downloadCSV = () => {
    const csvData = shifts.map((shift) => ({
      Name: shift.name,
      "Start Time": shift.start_time,
      "End Time": shift.end_time,
      "Lunch Start": shift.lunch_start,
      "Lunch End": shift.lunch_out,
      Description: shift.description,
    }));

    const csvRows = [];
    const headers = Object.keys(csvData[0]);
    csvRows.push(headers.join(",")); // Add the headers row

    csvData.forEach((row) => {
      const values = headers.map((header) => `"${row[header]}"`);
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "shifts.csv");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Shift List", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [
        [
          "Shift Name",
          "Start Time",
          "End Time",
          "Lunch Start",
          "Lunch End",
          "Description",
        ],
      ],
      body: shifts.map((shift) => [
        shift.name,
        shift.start_time,
        shift.end_time,
        shift.lunch_start,
        shift.lunch_out,
        shift.description,
      ]),
    });
    doc.save("shifts.pdf");
  };

  return (
    <div
      className="shift-table-container"
      style={{ padding: "20px", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#d9534f" }}>Shift List</h2>
        <div className="actions">
          <button
            onClick={downloadCSV}
            style={{
              backgroundColor: "#5cb85c",
              color: "#fff",
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            Download CSV
          </button>
          <button
            onClick={downloadPDF}
            style={{
              backgroundColor: "#d9534f",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Download PDF
          </button>
          <Link
            to="/add-shift"
            style={{
              marginLeft: "20px",
              backgroundColor: "#5cb85c",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Add Shift
          </Link>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: "100%", padding: "10px", margin: "20px 0" }}
      />
      <table
        className="table table-striped"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#d9534f", color: "#fff" }}>
            <th>Avatar</th>
            <th>Shift Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Lunch Start</th>
            <th>Lunch End</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {shifts
            .filter((shift) =>
              shift.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((shift, index) => (
              <tr key={index}>
                <td>
                  <img
                    src="/avatar.png"
                    alt="Avatar"
                    style={{ width: "30px", borderRadius: "50%" }}
                  />
                </td>
                <td>{shift.name}</td>
                <td>{shift.start_time}</td>
                <td>{shift.end_time}</td>
                <td>{shift.lunch_start}</td>
                <td>{shift.lunch_out}</td>
                <td>{shift.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShiftTable;
