import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

const SetupHeader = () => {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/country/country-list/" className="nav-link">
              Country
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/district/district-list" className="nav-link">
              District
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/admin/setup/province/province-list/"
              className="nav-link"
            >
              Province
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/zone/zone-list" className="nav-link">
              Zone
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/admin/setup/municipality/municipality-list/"
              className="nav-link"
            >
              Municipality
            </Link>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/admin/setup/designation/designation-list/"
              className="nav-link"
            >
              designation
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/admin/setup/department/department-list/"
              className="nav-link"
            >
              Department
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/grade/grade-list/" className="nav-link">
              Grade
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/setup/working/working-list/" className="nav-link">
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
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default SetupHeader;
