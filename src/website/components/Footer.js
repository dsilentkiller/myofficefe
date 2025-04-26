import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Import icons from react-icons/fa
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../css/components/footer.css"; // Assuming your footer styles are defined here

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <Container>
        <Row className="justify-content-between">
          {/* About Us Section */}
          <Col md={3} className="mb-4">
            <h3 className="section-title">About Us</h3>
            <p>
              At Pathibhara Pulse and Research, we are committed to providing
              exceptional IT solutions. We specialize in building advanced CRM
              systems with features such as enquiry handling, follow-up
              management, and much more.
            </p>
            <p>
              <FaPhone /> <strong>Phone:</strong> +977-9828889263
            </p>
            <p>
              <FaEnvelope /> <strong>Email:</strong> paarurawal@gmail.com
            </p>
            <p>
              <FaMapMarkerAlt /> <strong>Location:</strong> Koteswor, Kathmandu
            </p>
            <div className="social-icons">
              <Nav>
                <Nav.Link
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </Nav.Link>
                <Nav.Link
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </Nav.Link>
                <Nav.Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </Nav.Link>
                <Nav.Link
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Nav.Link>
                <Nav.Link
                  href="https://youtube.com"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </Nav.Link>
              </Nav>
            </div>
          </Col>

          {/* Quick Links Section */}
          <Col md={4} className="mb-4 text-center">
            <h3 className="section-title">Quick Links</h3>
            <Nav className="flex-column">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/services">Services</Nav.Link>
              <Nav.Link href="/packages">Packages</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
              <Nav.Link href="/team">Team</Nav.Link>
              <Nav.Link href="/career">Career</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/privacy">Privacy Policy</Nav.Link>
            </Nav>
          </Col>

          {/* Recent Updates Section */}
          <Col md={3} className="mb-4 text-end">
            <h3 className="section-title">Recent Updates</h3>
            <div className="update-item">
              <h4>Why Our Clients Love Pathibhara Pulse</h4>
              <p>2024-Dec-03</p>
            </div>
            <div className="update-item">
              <h4>Enhancing Business with Our CRM Solutions</h4>
              <p>2023-Jan-27</p>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="footer-bottom mt-4">
          <Col className="text-center">
            <p>
              © 2024 All rights reserved. Design & Developed by{" "}
              <span>Pathibhara Pulse Pvt Ltd</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import {
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPodcast,
//   FaInstagram,
//   FaTiktok,
//   FaLinkedin,
//   FaTwitter,
//   FaFacebook,
// } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-12 px-5">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Row 1: Get in Touch */}
//         <div className="border-b border-gray-600 pb-6 text-center">
//           <h2 className="text-2xl font-bold text-white">
//             MyOffice CRM Software
//           </h2>
//           <p className="mt-3 text-gray-400">Get in touch</p>
//           <p className="text-gray-400">Mon-Fri during US work hours</p>
//           <p className="mt-2 flex justify-center items-center gap-2 font-bold">
//             <FaPhone /> 9828889263
//           </p>
//           <p className="mt-2 flex justify-center items-center gap-2 text-gray-400">
//             <FaEnvelope /> paarurawal@gmail.com
//           </p>
//           <p className="mt-2 flex justify-center items-center gap-2 text-gray-400">
//             <FaMapMarkerAlt /> Koteswor, Kathmandu
//           </p>
//         </div>

//         {/* Row 2: Company */}
//         <div className="border-b border-gray-600 pb-6 text-center">
//           <h3 className="text-lg font-bold text-white">Company</h3>
//           <ul className="mt-3 space-y-2 text-gray-400">
//             <li>About Us</li>
//             <li>Contact Us</li>
//             <li>Security and Compliance</li>
//           </ul>
//         </div>

//         {/* Row 3: Services */}
//         <div className="border-b border-gray-600 pb-6 text-center">
//           <h3 className="text-lg font-bold text-white">Services</h3>
//           <ul className="mt-3 space-y-2 text-gray-400">
//             <li>GenAI Solutions</li>
//             <li>Product Development</li>
//             <li>AI & Data</li>
//             <li>Design</li>
//             <li>DevOps & Cloud</li>
//             <li>Staff Augmentation</li>
//             <li>AWS</li>
//           </ul>
//         </div>

//         {/* Row 4: Connect with Us */}
//         <div className="border-b border-gray-600 pb-6 text-center">
//           <h3 className="text-lg font-bold text-white">Connect with Us</h3>
//           <ul className="mt-3 space-y-2 text-gray-400">
//             <li className="flex justify-center items-center gap-2">
//               <FaPodcast /> Podcast
//             </li>
//             <li className="flex justify-center items-center gap-2">
//               <FaInstagram /> Instagram
//             </li>
//             <li className="flex justify-center items-center gap-2">
//               <FaTiktok /> TikTok
//             </li>
//             <li className="flex justify-center items-center gap-2">
//               <FaLinkedin /> LinkedIn
//             </li>
//             <li className="flex justify-center items-center gap-2">
//               <FaTwitter /> X
//             </li>
//             <li className="flex justify-center items-center gap-2">
//               <FaFacebook /> Facebook
//             </li>
//           </ul>
//         </div>

//         {/* Footer Bottom */}
//         <div className="text-center text-gray-500 text-sm pt-6">
//           <p>Designed & Developed by Pathibhara Pulse</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
