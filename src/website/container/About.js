import React from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../css/website/about.css"; // Custom CSS

const About = () => {
  return (
    <div className="about-container">
      {/* Top Section */}
      <div className="about-section">
        <Topbar />
        <Navbar />
      </div>

      {/* About Us Content Section with Dynamic Background */}
      <div className="about-content">
        <div className="container">
          <h1 className="about-heading">About Pathibhara Pulse CRM</h1>
          <p className="intro-text">
            We are an IT company specializing in delivering cutting-edge CRM
            solutions to businesses. Our CRM system is designed to enhance your
            customer relationship management, streamline processes, and improve
            overall productivity.
          </p>

          {/* Company Overview */}
          <div className="company-overview">
            <h2>Our Mission</h2>
            <p>
              At Pathibhara Pulse, we are committed to providing the best CRM
              solutions that help businesses build stronger customer
              relationships and achieve their goals. Our CRM software comes with
              a wide array of features designed to meet the needs of small to
              large-scale companies.
            </p>
          </div>

          <div className="company-overview">
            <h2>Our Vision</h2>
            <p>
              We aim to be a leading provider of advanced CRM systems that
              empower businesses to deliver superior customer service and
              continuously improve their customer experience. Our vision is to
              make CRM accessible and easy for all businesses to use, no matter
              their size.
            </p>
          </div>

          {/* CRM Features */}
          <div className="crm-features">
            <h2>Key Features of Our CRM System</h2>
            <div className="feature-item">
              <h3>Customer Interaction Management</h3>
              <p>
                Effortlessly track and manage customer interactions to ensure
                every lead and customer is handled with care.
              </p>
            </div>
            <div className="feature-item">
              <h3>Follow-up Management</h3>
              <p>
                Our CRM helps you stay on top of follow-up activities, making
                sure no lead is forgotten and all customer inquiries are
                answered promptly.
              </p>
            </div>
            <div className="feature-item">
              <h3>Advanced Analytics</h3>
              <p>
                Gain valuable insights into your business performance with our
                in-depth analytics and reporting features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default About;
