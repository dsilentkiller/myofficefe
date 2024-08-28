import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";

const LeaveHeader = () => {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="category/list" className="nav-link">
              Leave Category
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="list" className="nav-link">
              Leave
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
export default LeaveHeader;
