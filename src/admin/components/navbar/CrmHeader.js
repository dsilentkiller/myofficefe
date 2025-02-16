import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";  // Icon for menu (if needed for mobile)
import SearchIcon from "@mui/icons-material/Search";  // Icon for search
import CategoryIcon from "@mui/icons-material/Category";  // Icon for Category
import EventIcon from "@mui/icons-material/Event";  // Icon for Event
import AssignmentIcon from "@mui/icons-material/Assignment";  // Icon for Enquiry
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns"; // Icon for Followup

const CrmHeader = () => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Mobile Menu Icon (optional) */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* App title (if any) */}
          <Typography variant="h6" sx={{  flexGrow: 1 }}>
            CRM Dashboard
          </Typography>

          {/* Left Navbar Links */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/dashboard/crm/category/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <CategoryIcon />
              </IconButton>
              Category
            </Link>

            <Link to="/dashboard/crm/enquiry" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <AssignmentIcon />
              </IconButton>
              Enquiry
            </Link>

            <Link to="/dashboard/crm/follow" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <FollowTheSignsIcon />
              </IconButton>
              Followup
            </Link>

            <Link to="/dashboard/crm/project/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <AssignmentIcon />
              </IconButton>
              Project
            </Link>

            <Link to="/dashboard/crm/event/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <EventIcon />
              </IconButton>
              Event
            </Link>
             {/* quotation */}
             {/* <Link to="/dashboard/crm/meetings/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <AssignmentIcon />
              </IconButton>
              meeting
            </Link> */}

            {/* quotation */}
            <Link to="/dashboard/crm/quotations/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <AssignmentIcon />
              </IconButton>
              Quotation
            </Link>
              {/* quotation */}
              <Link to="/dashboard/crm/proposals" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              <IconButton color="inherit">
                <AssignmentIcon />
              </IconButton>
             Proposal
            </Link>

          </Box>

          {/* Right Navbar Search */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                padding: "5px 10px",
                marginRight: "10px",
                border: "none",
                outline: "none",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CrmHeader;
