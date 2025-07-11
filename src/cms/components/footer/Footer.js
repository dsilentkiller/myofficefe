import { Link } from "react-router-dom";
import "../../css/footer/footer.css";
import "../../css/global.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/aboutus" },
    { label: "Services", path: "/services" },
    { label: "Packages", path: "/packages" },
    { label: "Contact Us", path: "/contactus" },
    { label: "Team", path: "/team" },
    { label: "Career", path: "/career" },
    { label: "Blog", path: "/blog" },
    { label: "Privacy Policy", path: "/privacypolicy" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
  ];

  const recentUpdates = [
    {
      title: "Why Our Clients Love Pathibhara Pulse",
      date: "03 Dec 2024",
    },
    {
      title: "Enhancing Business with Our CRM Solutions",
      date: "27 Jan 2023",
    },
  ];

  return (
    <footer className="footer bg-dark text-light pt-5" role="contentinfo" aria-label="Footer">
      <Container>
        <Row className="justify-content-between">
          {/* About Us */}
          <Col md={4} className="mb-4 mb-md-0 text-center text-md-start">
            <h4 className="footer-title text-uppercase">About PathibharaPulse</h4>
            <p className="footer-desc mb-3 fs-6 text-secondary">
              Pathibhara Pulse is a dedicated IT company delivering advanced CRM
              systems and tailored business solutions to help your business
              grow efficiently with automation, enquiry tracking, follow-ups, and more.
            </p>
            <ul className="footer-contact list-unstyled">
              <li className="mb-2 d-flex justify-content-center justify-content-md-start align-items-center">
                <FaPhone className="me-2 text-primary" aria-hidden="true" />
                <strong className="me-1">Phone:</strong>
                <a href="tel:+9779828889263" className="text-light text-decoration-none fw-semibold">
                  +977-9828889263
                </a>
              </li>
              <li className="mb-2 d-flex justify-content-center justify-content-md-start align-items-center">
                <FaEnvelope className="me-2 text-primary" aria-hidden="true" />
                <strong className="me-1">Email:</strong>
                <a href="mailto:paarurawal@gmail.com" className="text-light text-decoration-none fw-semibold">
                  paarurawal@gmail.com
                </a>
              </li>
              <li className="d-flex justify-content-center justify-content-md-start align-items-center">
                <FaMapMarkerAlt className="me-2 text-primary" aria-hidden="true" />
                <strong className="me-1">Location:</strong> Koteswor, Kathmandu
              </li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="footer-title mb-3 text-center">Quick Links</h4>
            <Nav className="flex-column text-center">
              {quickLinks.map(({ label, path }, idx) => (
                <Nav.Link
                  key={idx}
                  as={Link}
                  to={path}
                  className="footer-link py-1 text-light"
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          {/* Recent Updates */}
          <Col md={4} className="mb-4 mb-md-0 text-center text-md-end">
            <h4 className="footer-title mb-3">Recent Updates</h4>
            {recentUpdates.map(({ title, date }, idx) => (
              <div key={idx} className="update-item mb-3">
                <h6 className="update-title mb-1">{title}</h6>
                <small className="update-date text-muted">{date}</small>
              </div>
            ))}
          </Col>
        </Row>

        <hr className="footer-divider border-secondary my-4" />

        {/* Bottom Row */}
        <Row className="text-center">
          <Col>
            <p className="footer-bottom-text mb-2 small text-muted">
              &copy; {new Date().getFullYear()} PathibharaPulse. All rights reserved.
            </p>

            {/* Social Media Links (Optional) */}
            <div className="d-flex justify-content-center gap-3">
              {socialLinks.map(({ icon, url, label }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-light fs-5"
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;




// import { Link } from "react-router-dom";
// import "../../css/footer/footer.css";
// import "../../css/global.css";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTwitter,
//   FaYoutube,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { Container, Row, Col, Nav } from "react-bootstrap";

// const Footer = () => {
//   const quickLinks = [
//     { label: "Home", path: "/" },
//     { label: "About Us", path: "/aboutus" },
//     { label: "Services", path: "/services" },
//     { label: "Packages", path: "/packages" },
//     { label: "Contact Us", path: "/contactus" },
//     { label: "Team", path: "/team" },
//     { label: "Career", path: "/career" },
//     { label: "Blog", path: "/blog" },
//     { label: "Privacy Policy", path: "/privacypolicy" },
//   ];

//   const socialLinks = [
//     { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
//     { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
//     { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
//     { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
//     { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
//   ];

//   const recentUpdates = [
//     {
//       title: "Why Our Clients Love Pathibhara Pulse",
//       date: "03 Dec 2024",
//     },
//     {
//       title: "Enhancing Business with Our CRM Solutions",
//       date: "27 Jan 2023",
//     },
//   ];

//   return (
//     <footer
//       className="footer bg-dark text-light pt-5"
//       role="contentinfo"
//       aria-label="Footer"
//     >
//       <Container>
//         <Row className="justify-content-between align-items-start">
//           {/* About Us */}
//           <Col md={4} className="mb-4">
//             <h4 className="footer-title  text-uppercase">
//               About PathibharaPulse
//             </h4>
//             <p className="footer-desc mb-4 fs-6 text-secondary">
//               Pathibhara Pulse is a dedicated IT company delivering advanced CRM
//               systems and tailored business solutions to help your business
//               grow efficiently with automation, enquiry tracking, follow-ups,
//               and more.
//             </p>
//             <ul className="footer-contact list-unstyled mb-3">
//               <li className="mb-2 d-flex align-items-center">
//                 <FaPhone aria-hidden="true" className="me-2 text-primary" />
//                 <strong className="me-1">Phone:</strong>
//                 <a href="tel:+9779828889263" className="text-light text-decoration-none fw-semibold">
//                   +977-9828889263
//                 </a>
//               </li>
//               <li className="mb-2 d-flex align-items-center">
//                 <FaEnvelope aria-hidden="true" className="me-2 text-primary" />
//                 <strong className="me-1">Email:</strong>
//                 <a
//                   href="mailto:paarurawal@gmail.com"
//                   className="text-light text-decoration-none fw-semibold"
//                 >
//                   paarurawal@gmail.com
//                 </a>
//               </li>
//               <li className="d-flex align-items-center">
//                 <FaMapMarkerAlt aria-hidden="true" className="me-2 text-primary" />
//                 <strong className="me-1">Location:</strong> Koteswor, Kathmandu
//               </li>
//             </ul>
//           </Col>


//           {/* Quick Links */}
//           <Col md={4} className="mb-4">
//             <h4 className="footer-title mb-3 text-center">Quick Links</h4>
//             <Nav className="flex-column text-center">
//               {quickLinks.map(({ label, path }, idx) => (
//                 <Nav.Link
//                   key={idx}
//                   as={Link}
//                   to={path}
//                   className="footer-link py-1"
//                 >
//                   {label}
//                 </Nav.Link>
//               ))}
//             </Nav>
//           </Col>

//           {/* Recent Updates */}
//           <Col md={4} className="mb-4">
//             <h4 className="footer-title mb-3 text-end">Recent Updates</h4>
//             <div className="recent-updates text-end">
//               {recentUpdates.map(({ title, date }, idx) => (
//                 <div key={idx} className="update-item mb-3">
//                   <h6 className="update-title">{title}</h6>
//                   <small className="update-date text-muted">{date}</small>
//                 </div>
//               ))}
//             </div>
//           </Col>
//         </Row>

//         <hr className="footer-divider border-secondary" />

//         {/* Bottom Row */}
//         <Row>
//           <Col className="text-center">
//             <p className="footer-bottom-text mb-0 small text-muted">
//               &copy; {new Date().getFullYear()} PathibharaPulse  All
//               rights reserved.
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

// import { Link } from "react-router-dom";
// import "../../css/footer/footer.css";
// import "../../css/global.css";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTwitter,
//   FaYoutube,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { Container, Row, Col, Nav } from "react-bootstrap";

// const Footer = () => {
//   return (
//     <footer className="footer bg-dark text-light pt-5">
//       <Container>
//         <Row className="justify-content-between align-items-start">
//           {/* About Us */}
//           <Col md={4} className="mb-4">
//             <h4 className="footer-title">About Pathibhara Pulse</h4>
//             <p className="footer-desc">
//               We are a passionate IT company delivering advanced CRM systems,
//               tailored business solutions, and exceptional support. Our CRM
//               includes features like enquiry tracking, follow-ups, automation,
//               and much more to grow your business efficiently.
//             </p>
//             <ul className="footer-contact list-unstyled">
//               <li>
//                 <FaPhone /> <strong>Phone:</strong> +977-9828889263
//               </li>
//               <li>
//                 <FaEnvelope /> <strong>Email:</strong> paarurawal@gmail.com
//               </li>
//               <li>
//                 <FaMapMarkerAlt /> <strong>Location:</strong> Koteswor,
//                 Kathmandu
//               </li>
//             </ul>
//             <div className="footer-social-icons mt-3">
//               <Nav className="gap-2">
//                 <Nav.Link href="https://facebook.com" target="_blank">
//                   <FaFacebookF />
//                 </Nav.Link>
//                 <Nav.Link href="https://instagram.com" target="_blank">
//                   <FaInstagram />
//                 </Nav.Link>
//                 <Nav.Link href="https://linkedin.com" target="_blank">
//                   <FaLinkedinIn />
//                 </Nav.Link>
//                 <Nav.Link href="https://twitter.com" target="_blank">
//                   <FaTwitter />
//                 </Nav.Link>
//                 <Nav.Link href="https://youtube.com" target="_blank">
//                   <FaYoutube />
//                 </Nav.Link>
//               </Nav>
//             </div>
//           </Col>

//           {/* Quick Links */}
//           <Col md={4} className="mb-4">
//             <h4 className="footer-title text-center">Quick Links</h4>
//             <Nav className="flex-column text-center">
//               {[
//                 "Home",
//                 "About Us",
//                 "Services",
//                 "Packages",
//                 "Contact Us",
//                 "Team",
//                 "Career",
//                 "Blog",
//                 "Privacy Policy",
//               ].map((label, idx) => (
//                 <Nav.Link
//                   key={idx}
//                   as={Link}
//                   to={`/${label.toLowerCase().replace(/\s+/g, "")}`}
//                   className="footer-link"
//                 >
//                   {label}
//                 </Nav.Link>
//               ))}
//             </Nav>
//           </Col>

//           {/* Recent Updates */}
//           <Col md={4} className="mb-4">
//             <h4 className="footer-title text-end">Recent Updates</h4>
//             <div className="recent-updates text-end">
//               <div className="update-item mb-3">
//                 <h6 className="update-title">
//                   Why Our Clients Love Pathibhara Pulse
//                 </h6>
//                 <small className="update-date">03 Dec 2024</small>
//               </div>
//               <div className="update-item">
//                 <h6 className="update-title">
//                   Enhancing Business with Our CRM Solutions
//                 </h6>
//                 <small className="update-date">27 Jan 2023</small>
//               </div>
//             </div>
//           </Col>
//         </Row>

//         <hr className="footer-divider" />

//         {/* Bottom Row */}
//         <Row className="text-center">
//           <Col>
//             <p className="footer-bottom-text mb-0">
//               &copy; {new Date().getFullYear()} All rights reserved. Designed &
//               Developed by <strong>Pathibhara Pulse Pvt. Ltd</strong>
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

// import "../../css/footer/footer.css";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTwitter,
//   FaYoutube,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa"; // Import icons from react-icons/fa
// import { Container, Row, Col, Nav } from "react-bootstrap";

// const Footer = () => {
//   return (
//     <footer className="footer bg-dark text-light py-5">
//       <Container>
//         <Row className="justify-content-between">
//           {/* About Us Section */}
//           <Col md={3} className="mb-4">
//             <h3 className="section-title">About Us</h3>
//             <p>
//               At Pathibhara Pulse and Research, we are committed to providing
//               exceptional IT solutions. We specialize in building advanced CRM
//               systems with features such as enquiry handling, follow-up
//               management, and much more.
//             </p>
//             <p>
//               <FaPhone /> <strong>Phone:</strong> +977-9828889263
//             </p>
//             <p>
//               <FaEnvelope /> <strong>Email:</strong> paarurawal@gmail.com
//             </p>
//             <p>
//               <FaMapMarkerAlt /> <strong>Location:</strong> Koteswor, Kathmandu
//             </p>
//             <div className="social-icons">
//               <Nav>
//                 <Nav.Link
//                   href="https://facebook.com"
//                   target="_blank"
//                   aria-label="Facebook"
//                 >
//                   <FaFacebookF />
//                 </Nav.Link>
//                 <Nav.Link
//                   href="https://instagram.com"
//                   target="_blank"
//                   aria-label="Instagram"
//                 >
//                   <FaInstagram />
//                 </Nav.Link>
//                 <Nav.Link
//                   href="https://linkedin.com"
//                   target="_blank"
//                   aria-label="LinkedIn"
//                 >
//                   <FaLinkedinIn />
//                 </Nav.Link>
//                 <Nav.Link
//                   href="https://twitter.com"
//                   target="_blank"
//                   aria-label="Twitter"
//                 >
//                   <FaTwitter />
//                 </Nav.Link>
//                 <Nav.Link
//                   href="https://youtube.com"
//                   target="_blank"
//                   aria-label="YouTube"
//                 >
//                   <FaYoutube />
//                 </Nav.Link>
//               </Nav>
//             </div>
//           </Col>

//           {/* Quick Links Section */}
//           <Col md={4} className="mb-4 text-center">
//             <h3 className="section-title">Quick Links</h3>
//             <Nav className="flex-column">
//               <Nav.Link href="/">Home</Nav.Link>
//               <Nav.Link href="/about">About Us</Nav.Link>
//               <Nav.Link href="/services">Services</Nav.Link>
//               <Nav.Link href="/packages">Packages</Nav.Link>
//               <Nav.Link href="/contact">Contact Us</Nav.Link>
//               <Nav.Link href="/team">Team</Nav.Link>
//               <Nav.Link href="/career">Career</Nav.Link>
//               <Nav.Link href="/blog">Blog</Nav.Link>
//               <Nav.Link href="/privacy">Privacy Policy</Nav.Link>
//             </Nav>
//           </Col>

//           {/* Recent Updates Section */}
//           <Col md={3} className="mb-4 text-end">
//             <h3 className="section-title">Recent Updates</h3>
//             <div className="update-item">
//               <h4>Why Our Clients Love Pathibhara Pulse</h4>
//               <p>2024-Dec-03</p>
//             </div>
//             <div className="update-item">
//               <h4>Enhancing Business with Our CRM Solutions</h4>
//               <p>2023-Jan-27</p>
//             </div>
//           </Col>
//         </Row>

//         {/* Footer Bottom */}
//         <Row className="footer-bottom mt-4">
//           <Col className="text-center">
//             <p>
//               © 2024 All rights reserved. Design & Developed by{" "}
//               <span>Pathibhara Pulse Pvt Ltd</span>
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="container footer-container">
//         <div className="footer-section">
//           <h3>CompanyName</h3>
//           <p>Providing innovative solutions for your business needs.</p>
//         </div>
//         <div className="footer-section">
//           <h3>Quick Links</h3>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/services">Services</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//             <li>
//               <Link to="/request-demo">Request Demo</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="footer-section">
//           <h3>Contact Us</h3>
//           <p>Email: info@company.com</p>
//           <p>Phone: +1 (123) 456-7890</p>
//           <p>Address: 123 Business St, City, Country</p>
//         </div>
//         <div className="footer-section">
//           <h3>Follow Us</h3>
//           <div className="social-links">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-instagram"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <div className="container">
//           <p>
//             &copy; {new Date().getFullYear()} CompanyName. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
