import React from "react";
import { Link } from "react-router-dom";
const LeaveList = ({ leaves = [] }) => {
  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Leave List</h5>
                <div className="navbar-nav ml-auto">
                  <Link
                    to="/admin/leave/create/"
                    className="nav-link btn btn-info"
                  >
                    <h5>Add Leave</h5>
                  </Link>
                  <form
                    method="get"
                    action="/leave/search"
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
                        id="LeaveTable"
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
                            <tr>
                              <th>#</th>
                              <th>start_date</th>
                              <th>end_date</th>
                              <th>leave_category</th>
                              <th>leave_period</th>
                              <th>status</th>
                              <th>allocated_day</th>
                              <th>is_approved</th>
                              <th>default_days</th>
                              <th>reason</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaves.length > 0 ? (
                              leaves.map((leave) => (
                                <tr key={leave.id}>
                                  <td>{leave.id}</td>
                                  <td>{leave.name}</td>
                                  <td>{leave.start_date}</td>
                                  <td>{leave.end_date}</td>
                                  <td>{leave.leave_category}</td>
                                  <td>{leave.leave_period}</td>
                                  <td>{leave.status}</td>
                                  <td>{leave.allocated_day}</td>
                                  <td>{leave.is_approved}</td>
                                  <td>{leave.default_days}</td>
                                  <td>{leave.reason}</td>

                                  <td>
                                    <Link to={`/leave/update/${leave.id}`}>
                                      Edit
                                    </Link>
                                    |
                                    <Link to={`/leave/detail/${leave.id}`}>
                                      View
                                    </Link>
                                    |
                                    <Link to={`/leave/delete/${leave.id}`}>
                                      Delete
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No Leaves found</td>
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

export default LeaveList;
