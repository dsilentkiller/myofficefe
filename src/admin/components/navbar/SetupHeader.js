import React from "react";
import { Link } from "react-router-dom";
const SetupHeader = () => {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="country-list/" className="nav-link">
              Country
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/district-list" className="nav-link">
              District
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/province-list/" className="nav-link">
              Province
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/zone-list" className="nav-link">
              Zone
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/municipality-list/" className="nav-link">
              Municipality
            </Link>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/designation-list/" className="nav-link">
              designation
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/department-list/" className="nav-link">
              Department
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/grade-list/" className="nav-link">
              Grade
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/working-list/" className="nav-link">
              Working
            </Link>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          {/* <!-- Navbar Search --> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="navbar-search"
              to="#"
              role="button"
            >
              <i className="fas fa-search"></i>
            </Link>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default SetupHeader;
