// old design

import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import { Search, Category, Event } from "@mui/icons-material";

const LeaveHeader = () => {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        {/* <ul className="navbar-nav">
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
        </ul> */}

        {/* <!-- Right navbar links --> */}
        {/* <ul className="navbar-nav ml-auto"> */}
          {/* <!-- Navbar Search --> */}
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="navbar-search"
              to="#"
              role="button"
            >
              <i className="fas fa-search"></i>
            </Link>
          </li> */}
        {/* </ul> */}
         {/* MUI AppBar for the header */}
      <AppBar position="sticky">
        <Toolbar>
          {/* Left section of the header */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Leave Management
          </Typography>

          <Button
            color="inherit"
            startIcon={<Category />}
            component={Link}
            to="/dashboard/hrm/leave/category/list"
          >
            Leave Category
          </Button>

          <Button
            color="inherit"
            startIcon={<Event />}
            component={Link}
            to="/dashboard/hrm/leave/list"
          >
            Leave
          </Button>

          {/* Right section of the header (search) */}
          <IconButton color="inherit">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>
      </nav>
    </div>
  );
};
export default LeaveHeader;
