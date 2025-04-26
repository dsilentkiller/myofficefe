import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/components/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu on mobile

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        {/* Replace with your logo image */}
        <img src="/path/to/your/logo.png" alt="Logo" className="navbar-logo" />
      </div>

      {/* Toggle button for mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li>
          <Link to="/services" className="nav-link">
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <div className="request-demo">
          <Link className="demo-btn" to="/request-demo/">
            Request Demo
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
