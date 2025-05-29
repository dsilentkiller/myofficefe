"use client";
import "../../css/navbar/navbar.css";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo/logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Navigation Links (Left Side) */}
        <div className="nav-links-container">
          <ul className={`nav-links ${isOpen ? "active" : ""}`}>
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActive("/")}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${isActive("/about")}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className={`nav-link ${isActive("/services")}`}
                onClick={closeMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${isActive("/contact")}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link ${isActive("/login")}`}
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>
            <li className="nav-item nav-item-cta">
              <Link
                to="/request-demo"
                className={`nav-link-cta ${isActive("/request-demo")}`}
                onClick={closeMenu}
              >
                Request Demo
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo (Right Side) */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Company Logo" className="logo" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="container navbar-container">
//         <div className="logo">
//           {/* Replace with your logo image */}
//           <img
//             src="../../assets/img/logo/logo.jpeg"
//             alt="Logo"
//             className="navbar-logo"
//           />
//         </div>
//         <Link to="/" className="navbar-logo">
//           PathibharaPulse
//         </Link>
//         <div className="menu-icon" onClick={toggleMenu}>
//           <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
//         </div>
//         <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
//           <li className="nav-item">
//             <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/about"
//               className="nav-link"
//               onClick={() => setIsOpen(false)}
//             >
//               About
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/services"
//               className="nav-link"
//               onClick={() => setIsOpen(false)}
//             >
//               Services
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/contact"
//               className="nav-link"
//               onClick={() => setIsOpen(false)}
//             >
//               Contact
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/login"
//               className="nav-link"
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/request-demo"
//               className="nav-link btn-nav"
//               onClick={() => setIsOpen(false)}
//             >
//               Request Demo
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
