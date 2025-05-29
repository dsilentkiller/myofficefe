import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"; // Importing social media icons
import "../../css/topbar/topbar.css"; 


const Topbar = () => {
  // Company data
  const companyData = {
    phone: "+1 (123) 456-7890",
    email: "info@company.com",
    address: "123 Business St, City, Country",
    socialMedia: [
      { name: "Facebook", icon: "fab fa-facebook-f", url: "https://facebook.com" },
      { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com" },
      { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://linkedin.com" },
      { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com" },
      { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com" },
    ],
  }

  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-social">
          {companyData.socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <div className="topbar-contact">
          <div className="topbar-item">
            <i className="fas fa-phone-alt"></i>
            <span>{companyData.phone}</span>
          </div>

          <div className="topbar-item">
            <i className="fas fa-envelope"></i>
            <span>{companyData.email}</span>
          </div>

          <div className="topbar-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{companyData.address}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar

// const Topbar = () => {
//   return (
//     <div className="topbar">
//       <div className="contact-info">
//         <span className="contact-item">
//           <FaPhoneAlt /> +1 (234) 567-890
//         </span>
//         <span className="contact-item">
//           <FaEnvelope /> info@crm.com
//         </span>
//       </div>
//       <div className="social-icons">
//         <a
//           href="https://www.facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebook className="social-icon" />
//         </a>
//         <a
//           href="https://www.twitter.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaTwitter className="social-icon" />
//         </a>
//         <a
//           href="https://www.linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin className="social-icon" />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
