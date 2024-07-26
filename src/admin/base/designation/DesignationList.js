import React, { useState, useEffect } from "react";
import axios from "axios";

const DesignationList = () => {
  // State to store the list of designations
  const [name, setName] = useState("");
  const [designations, setDesignations] = useState([]);

  const handleDesignation = () => {
    if (name.trim() === "") {
      alert("Please enter a valid Designation name");
      return;
    }
    // Create a new Designation object
    const newDesignation = {
      id: designations.length + 1, // Generate a unique id for the new Designation
      name: name.trim(),
    };
    // Update the Designation list with the new Designation
    setDesignations([...DesignationList, newDesignation]);
    // Clear the input field after adding the Designation
    setName("");
  };
  // Function to fetch the list of designations from the backend
  const fetchDesignations = async () => {
    try {
      const response = await axios.get("/api/designations/");
      setDesignations(response.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  // Fetch designations when the component mounts
  useEffect(() => {
    fetchDesignations();
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        <div className="row">
          <div className="card">
            <div className="card-header">
              <div className="p-6 bg-white border-b border-gray-200">
                <h5 className="mx-20">Designation List</h5>
                <div className="text-right">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New designations Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      className="btn btn-info"
                      onClick={handleDesignation}
                    >
                      Add designations
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {designations.length > 0 ? (
                    designations.map((designations, index) => (
                      <tr key={index}>
                        <td>{designations.id}</td>
                        <td>{designations.name}</td>
                        <td>
                          <a href={`/designations/edit/${designations.id}`}>
                            Edit
                          </a>
                          <span> | </span>
                          <a href={`/designations/delete/${designations.id}`}>
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Designation</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ul>
        {designations.map((designation) => (
          <li key={designation.id}>{designation.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DesignationList;
