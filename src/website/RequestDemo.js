import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For handling redirection after submission
import "./css/requestdemo.css"; // Import the CSS file for styling
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";

const RequestDemo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    demoDate: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState(""); // For status messages
  const [statusType, setStatusType] = useState(""); // For success/error styles
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/requestdemo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage("Thank you! Your demo request has been submitted.");
        setStatusType("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          demoDate: "",
          message: "",
        });
        setTimeout(() => history.push("/"), 3000); // Redirect after 3 seconds
      } else {
        setStatusMessage("Oops! Something went wrong. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <div className="requestdemo-page">
      {/* Topbar and Navbar */}
      <div className="home-section">
        <Topbar />
        <Navbar />
      </div>

      {/* Request Demo Section */}
      <div className="requestdemo-container">
        <h1>Request a Demo</h1>
        <div className="requestdemo-form-container">
          <form onSubmit={handleSubmit} className="requestdemo-form">
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
            <input
              type="text"
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              required
            />
            <input
              type="date"
              placeholder="Preferred Demo Date"
              value={formData.demoDate}
              onChange={(e) =>
                setFormData({ ...formData, demoDate: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Additional Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
            <button type="submit">Request Demo</button>
          </form>

          {statusMessage && (
            <div className={`message ${statusType}`}>{statusMessage}</div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default RequestDemo;
