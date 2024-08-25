import React from "react";
import { Link } from "react-router-dom";

const TaskTable = ({ tasks }) => {
  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">task List</h5>
                <div className="navbar-nav ml-auto">
                  <Link
                    to="/admin/task/create/"
                    className="nav-link btn btn-info"
                  >
                    <h5>Add task</h5>
                  </Link>
                  <form
                    method="get"
                    action="/task/search"
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
                        id="taskTable"
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
                              <th>Name</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>Department</th>
                              <th>Designation</th>
                              <th>Salary</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tasks.length > 0 ? (
                              tasks.map((task) => (
                                <tr key={task.id}>
                                  <td>{task.id}</td>
                                  <td>{task.name}</td>
                                  <td>{task.pri_phone}</td>
                                  <td>{task.email}</td>
                                  <td>{task.department}</td>
                                  <td>{task.designation}</td>
                                  <td>{task.salary}</td>
                                  <td>
                                    <Link to={`/task/update/${task.id}`}>
                                      Edit
                                    </Link>
                                    |
                                    <Link to={`/task/detail/${task.id}`}>
                                      View
                                    </Link>
                                    |
                                    <Link to={`/task/delete/${task.id}`}>
                                      Delete
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No tasks found</td>
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

export default TaskTable;
