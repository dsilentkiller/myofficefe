import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationList = () => {
  // State to store the list of organizations
  const [organizations, setOrganizations] = useState([]);

  // Function to fetch the list of organizations from the backend
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get("/api/organizations/");
      setOrganizations(response.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  // Fetch organizations when the component mounts
  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">organizations List</h5>
                <div className="navbar-nav ml-auto">
                  <a
                    href="/organizations/create"
                    className="nav-link btn btn-info"
                  >
                    <h5>Add organizations</h5>
                  </a>
                  <form
                    method="get"
                    action="/organizations/search"
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
                        id="organizationsTable"
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
                            {organizations.length > 0 ? (
                              organizations.map((organizations) => (
                                <tr key={organizations.id}>
                                  <td>{organizations.id}</td>
                                  <td>{organizations.name}</td>
                                  <td>{organizations.province}</td>
                                  <td>{organizations.zone}</td>
                                  <td>{organizations.district}</td>
                                  <td>{organizations.municipality}</td>
                                  <td>{organizations.ward_no}</td>
                                  <td>{organizations.tole_name}</td>
                                  <td>{organizations.pan_vat}</td>
                                  <td>{organizations.registration_no}</td>
                                  <td>{organizations.phone}</td>
                                  <td>{organizations.email}</td>
                                  <td>{organizations.currency}</td>
                                 
                                  <td>
                                    <a
                                      href={`/organizations/update/${organizations.id}`}
                                    >
                                      Edit
                                    </a>
                                    |
                                    <a
                                      href={`/organizations/detail/${organizations.id}`}
                                    >
                                      View
                                    </a>
                                    |
                                    <a
                                      href={`/organizations/delete/${organizations.id}`}
                                    >
                                      Delete
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No organizationss found</td>
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

export default OrganizationList;
