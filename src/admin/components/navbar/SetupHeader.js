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
            <Link to="country" className="nav-link">
              Country
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="district" className="nav-link">
              District
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="province" className="nav-link">
              Province
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="zone" className="nav-link">
              Zone
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="municipality" className="nav-link">
              Municipality
            </Link>
          </li>

          <li className="nav-item d-none d-sm-inline-block">
            <Link to="designation" className="nav-link">
              designation
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="department" className="nav-link">
              Department
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="grade" className="nav-link">
              Grade
            </Link>
          </li>
          {/* enquiry */}
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="working" className="nav-link">
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
