import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"; // Importing social media icons
import "../css/components/topbar.css"; // Import the custom CSS

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="contact-info">
        <span className="contact-item">
          <FaPhoneAlt /> +1 (234) 567-890
        </span>
        <span className="contact-item">
          <FaEnvelope /> info@crm.com
        </span>
      </div>
      <div className="social-icons">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="social-icon" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="social-icon" />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Topbar;
