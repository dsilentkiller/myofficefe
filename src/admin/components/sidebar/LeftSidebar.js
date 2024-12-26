// Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Dashboard as DashboardIcon, Person as PersonIcon, ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#2c3e50", // Dark background color
          color: "#ecf0f1", // Light text color for good contrast
        },
      }}
    >
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Link to="/dashboard" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>
            Myoffice
          </Typography>
        </Link>
      </div>

      <Divider />

      <List>
        {/* Dashboard Item with Button Styling */}
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={{
            color: "#ffffff", // Text color
            fontSize: "34px", // Font size
            padding: "10px 16px",
            backgroundColor: "#3498db", // Dashboard button color
            "&:hover": {
              backgroundColor: "#2980b9", // Darken on hover
            },
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "#ffffff" }} />
        </ListItem>

        {/* Customer Menu with Button Styling */}
        <ListItem
          button
          onClick={toggleUserMenu}
          sx={{
            color: "#ffffff", // Text color
            fontSize: "16px", // Font size
            padding: "10px 16px",
            backgroundColor: "#e74c3c", // Customer button color
            "&:hover": {
              backgroundColor: "#c0392b", // Darken on hover
            },
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Customer" sx={{ color: "#ffffff" }} />
          {userMenuOpen ? <ExpandLess sx={{ color: "#ffffff" }} /> : <ExpandMore sx={{ color: "#ffffff" }} />}
        </ListItem>

        <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/dashboard/customer/employee" sx={{ color: "#bdc3c7", pl: 4 }}>
              <ListItemText primary="Employee" sx={{ color: "#ecf0f1" }} />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/customer/customer" sx={{ color: "#bdc3c7", pl: 4 }}>
              <ListItemText primary="Customer" sx={{ color: "#ecf0f1" }} />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/customer/user" sx={{ color: "#bdc3c7", pl: 4 }}>
              <ListItemText primary="User" sx={{ color: "#ecf0f1" }} />
            </ListItem>
          </List>
        </Collapse>

        {/* Additional menu items can go here */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
