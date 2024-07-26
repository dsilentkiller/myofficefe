import React, { useState, useEffect } from "react";
import axios from "axios";
const CustomerVisitPeriodList = () => {
  const [visitperiods, setVisitPeriods] = useState([]);

  useEffect(() => {
    const fetchVisitPeriods = async () => {
      try {
        const response = await axios.get("/api/customer-visit-periods/");
        setVisitPeriods(response.data);
      } catch (error) {
        console.error("Error fetching customer visit periods:", error);
      }
    };

    fetchVisitPeriods();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Customer Visit List</h5>
                <div className="navbar-nav ml-auto">
                  <a
                    href="/customervisit/create"
                    className="nav-link btn btn-info"
                  >
                    <h5>Add customer visit</h5>
                  </a>
                  <form
                    method="get"
                    action="/customervisit/search"
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
                              <th>visitperiod</th>
                              <th>created</th>

                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visitperiods.length > 0 ? (
                              visitperiods.map((visitperiods) => (
                                <tr key={visitperiods.id}>
                                  <td>{visitperiods.id}</td>
                                  <td>{visitperiods.visitperiods}</td>
                                  <td>{visitperiods.created}</td>

                                  <td>
                                    <a
                                      href={`/visitperiods/update/${visitperiods.id}`}
                                    >
                                      Edit
                                    </a>
                                    |
                                    <a
                                      href={`/visitperiods/detail/${visitperiods.id}`}
                                    >
                                      View
                                    </a>
                                    |
                                    <a
                                      href={`/visitperiods/delete/${visitperiods.id}`}
                                    >
                                      Delete
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8">No visitperiodss found</td>
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

export default CustomerVisitPeriodList;
