import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* <!-- Brand Logo --> */}
        <Link to="index3.html" className="brand-link">
          {/* <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            // style="opacity: .8"
          /> */}
          <span className="brand-text font-weight-light">Myoffice</span>
        </Link>

        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user panel (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {/* <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              /> */}
            </div>
            <div className="info">
              <Link to="#" className="d-block">
                Paaru Rawal
              </Link>
            </div>
          </div>

          {/* <!-- SidebarSearch Form --> */}
          {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div> */}

          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
              <li className="nav-item menu-open">
                <Link to="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    {/* <i className="right fas fa-angle-left"></i> */}
                  </p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="pages/loaner" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>

                </Link>
              </li> */}

              <li className="nav-item">
                <Link to="employee-list/" className="nav-link">
                  <i className="nav-icon fas fa-user"></i>
                  <p>
                    User
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </Link>
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
              </li>
              {/* leave */}
              <li className="nav-item">
                <Link to="leave/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Leave
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              {/* assets */}
              <li className="nav-item">
                <Link to="assets/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Assets
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              {/* Attendance */}
              <li className="nav-item">
                <Link to="attendance/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Attendance
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              {/* task */}
              <li className="nav-item">
                <Link to="tax/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Tax
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              {/* project */}
              <li className="nav-item">
                <Link to="project/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Project
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              {/* setup */}
              <li className="nav-item">
                <Link to="setup/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Setup
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              {/* ,,,, */}
              {/* <li className={`nav-item ${userMenuOpen ? "menu-open" : ""}`}>
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
                      {/* <i className="far fa-circle nav-icon"></i>
                      <p>Employee</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Customer</p>
                    </Link>
                  </li> */}
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
                {/* </ul>
              </li> */} 
              {/* settings */}
              <li className="nav-item">
                <Link to="settings/" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Settings
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </div>
  );
};
export default Sidebar;
