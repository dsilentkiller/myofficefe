import React from "react";
import axios from "axios";
import { useState } from "react";

const DayList = () => {
  // State to store the list of days
  const [days, setDays] = useState([]);

  // Function to fetch the list of days from the backend
  const fetchdays = async () => {
    try {
      const response = await axios.get("/api/days/");
      setDays(response.data);
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  };

  // Fetch days when the component mounts
  //   useEffect(() => {
  //     fetchdays();
  //   }, []);

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">day List</h5>
                <div className="navbar-nav ml-auto">
                  <a href="/day/create" className="nav-link btn btn-info">
                    <h5>Add day</h5>
                  </a>
                  <form
                    method="get"
                    action="/day/search"
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

                <div className="form-inline ml-4" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-30">
                    <li className="nav-item ">
                      <button
                        id="dayTable"
                        className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                      >
                        <i className="fas fa-file-csv"></i>
                        {/* Font Awesome icon for CSV */}
                      </button>
                    </li>
                    {/* Add other export buttons here */}
                  </ul>
                </div>
              </div>
            </nav>
            {/* heading end */}
            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        <table className="table table-bordered">
                          <thead>
                            <th>#</th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Action</th>
                          </thead>
                          <tbody>
                            {days.length > 0 ? (
                              days.map((day) => (
                                <tr key={day.id}>
                                  <td>{day.id}</td>
                                  <td>{day.name}</td>
                                  <td>{day.created}</td>
                                  <td>{day.updated}</td>

                                  <td>
                                    <a href={`/day/update/${day.id}`}>Edit</a>|
                                    <a href={`/day/detail/${day.id}`}>View</a>|
                                    <a href={`/day/delete/${day.id}`}>Delete</a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No days found</td>
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
  );
};

export default DayList;
