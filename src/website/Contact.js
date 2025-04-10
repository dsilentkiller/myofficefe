import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./css/contact.css"; // Import the CSS file for styling
import Footer from "./components/Footer";
import Topbar from "./components/Topbar"; // Import Topbar component
import Navbar from "./components/Navbar"; // Import Navbar component

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState(""); // For status messages
  const [statusType, setStatusType] = useState(""); // For success/error styles

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage("Thank you! Your message has been sent.");
        setStatusType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatusMessage("Oops! Something went wrong. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
      setStatusType("error");
    }
  };

  // Google Map Settings
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 27.7172, // Kathmandu latitude (Example location)
    lng: 85.324, // Kathmandu longitude (Example location)
  };

  return (
    <div className="contact-page">
      {/* Topbar and Navbar */}
      <div className="home-section">
        <Topbar />
        <Navbar />
      </div>

      {/* Contact Form */}
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>

          {statusMessage && (
            <div className={`message ${statusType}`}>{statusMessage}</div>
          )}
        </div>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <h2>Our Location</h2>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
