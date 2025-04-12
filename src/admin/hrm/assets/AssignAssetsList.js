import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DefaultHeader from "../../components/navbar/DefaultHeader";
// import AssetDashboard from "../../layouts/AssetDashboard";
import AssetHeader from "../../components/navbar/AssetHeader";
const AssignAssetsList = ({ assign_assets }) => {
  return (
    <>
      <div className="flex min-h-screen bg-light">
        <Sidebar />
        <div className="flex flex-col flex-grow bg-light">
          <div className="flex flex-col flex-grow bg-light">
            <DefaultHeader />
          </div>
          <AssetHeader />
          <div className="content-wrapper">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card">
                  {/* heading */}
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <h5 className="navbar-brand">AssignAssets List</h5>
                      <div className="navbar-nav ml-auto">
                        <Link
                          to="/dashboard/assign-assets/create/"
                          className="nav-link btn btn-info"
                        >
                          <h5>Add Assign Assets</h5>
                        </Link>
                        <form
                          method="get"
                          action="dashboard/assign-assets/search"
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

                      <div
                        className="form-inline ml-4"
                        id="navbarSupportedContent"
                      >
                        <ul className="navbar-nav mr-30">
                          <li className="nav-item ">
                            <button
                              id="AssignAssetsTable"
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
                                    <th>Assets Name</th>
                                    <th>Department</th>
                                    <th>employee</th>
                                    <th>assign_date</th>
                                    <th>created</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {assign_assets.length > 0 ? (
                                    assign_assets.map((assign_assets) => (
                                      <tr key={assign_assets.id}>
                                        <td>{assign_assets.id}</td>
                                        <td>{assign_assets.assets_name}</td>
                                        <td>{assign_assets.department}</td>
                                        <td>{assign_assets.employee}</td>
                                        <td>{assign_assets.assign_date}</td>
                                        <td>{assign_assets.created}</td>

                                        <td>
                                          <Link
                                            to={`assign-assets/update/${assign_assets.id}`}
                                          >
                                            Edit
                                          </Link>
                                          |
                                          <Link
                                            to={`assign-assets/detail/${assign_assets.id}`}
                                          >
                                            View
                                          </Link>
                                          |
                                          <Link
                                            to={`assign-assets/delete/${assign_assets.id}`}
                                          >
                                            Delete
                                          </Link>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="8">No AssignAssets found</td>
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
      </div>
    </>
  );
};

export default AssignAssetsList;
