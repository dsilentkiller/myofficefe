import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignGradeFormAndList = () => {
  const [name, setName] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [assignGrades, setAssignGrades] = useState([]);

  useEffect(() => {
    fetchAssignGrades();
  }, []);

  const fetchAssignGrades = async () => {
    try {
      const response = await axios.get("/api/assign-grades/");
      setAssignGrades(response.data);
    } catch (error) {
      console.error("Error fetching assign grades:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/assign-grades/", {
        name,
        assign_date: assignDate,
      });
      fetchAssignGrades(); // Fetch the updated list after adding a new item
      setName("");
      setAssignDate("");
      alert("Grade assigned successfully!");
    } catch (error) {
      console.error("Error assigning grade:", error);
    }
  };

  return (
    <div className="container">
      <h2>Assign Grade</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignDate">Assign Date:</label>
          <input
            type="date"
            id="assignDate"
            value={assignDate}
            onChange={(e) => setAssignDate(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Assign Grade
        </button>
      </form>
      <div className="content-wrapper">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card">
              {/* heading */}
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                  <h5 className="navbar-brand">Assign Grade</h5>
                  <div className="navbar-nav ml-auto">
                    {/* <a
                      href="/organizations/create"
                      className="nav-link btn btn-info"
                    >
                      <h5>Add organizations</h5>
                    </a> */}
                    <form
                      method="get"
                      action="/assignGrade/search"
                      className="form-inline ml-3"
                    >
                      <div className="input-group">
                        <input
                          type="search"
                          id="default-search"
                          name="q"
                          className="form-control"
                          placeholder="Search Mockups, Logos..."
                          required
                        />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-info">
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </nav>

              <div className="card-body">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                        <div className="overflow-x-auto">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Assign Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {assignGrades.length > 0 ? (
                                assignGrades.map((assignGrade, index) => (
                                  <tr key={index}>
                                    <td>{assignGrade.id}</td>
                                    <td>{assignGrade.name}</td>
                                    <td>{assignGrade.assign_date}</td>
                                    <td>
                                      <a
                                        href={`/assignGrade/edit/${assignGrade.id}`}
                                      >
                                        Edit
                                      </a>
                                      <span> | </span>
                                      <a
                                        href={`/assignGrade/delete/${assignGrade.id}`}
                                      >
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3">No countries</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignGradeFormAndList;
