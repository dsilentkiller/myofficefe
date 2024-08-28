import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="/" className="d-block">
              User Name
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
            </li>

            {/* User */}
            <li className={`nav-item ${userMenuOpen ? "menu-open" : ""}`}>
              <Link to="#" className="nav-link" onClick={toggleUserMenu}>
                <i className="nav-icon fas fa-user"></i>
                <p>
                  User
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul
                className="nav nav-treeview"
                style={{ display: userMenuOpen ? "block" : "none" }}
              >
                <li className="nav-item">
                  <Link to="employee-list/" className="nav-link">
                    {/* Update anchor tag to Link */}
                    <i className="far fa-circle nav-icon"></i>
                    <p>Employee</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Customer</p>
                  </Link>
                </li>

                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Employee</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Customer</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>User</p>
                    </Link>
                  </li>
                </ul> */}

                {/* <li className="nav-item">
                <Link to="shift" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Shift
                    {/* <span className="right badge badge-danger">New</span> */}
                {/* </p>
                </Link>
              </li>  */}
                {/* <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Customer</p>
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>User</p>
                  </Link>
                </li> */}
              </ul>
            </li>

            {/* Leave */}
            {/* Other menu items... */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
