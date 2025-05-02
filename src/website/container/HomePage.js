import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../admin/redux/slice/website/homeSlice";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import CRMChatBot from "../agent/CrmChatbot";
import "../css/website/homepage.css";
// Import the necessary CSS files

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.home || {});

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homepage-container">
      {/* Home Section */}
      <div className="home-section">
        <Topbar />
        <Navbar />
      </div>

      {/* Content Section with Background Image */}
      <div
        className="content-section"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="container">
          <h1 className="title">Welcome to the CRM System</h1>
          <p className="intro-text">
            Manage your business effortlessly with our advanced CRM system.
          </p>
          <div className="home-data">
            <div className="home-item">
              <h3 className="feature-title">CRM Feature 1</h3>
              <p className="feature-description">
                Manage your customer interactions with ease.
              </p>
            </div>
            <div className="home-item">
              <h3 className="feature-title">CRM Feature 2</h3>
              <p className="feature-description">
                Track and manage follow-ups efficiently.
              </p>
            </div>
            <div className="home-item">
              <h3 className="feature-title">CRM Feature 3</h3>
              <p className="feature-description">
                Get detailed analytics on your business performance.
              </p>
            </div>
          </div>
        </div>
        <div className="chatbot">
          <CRMChatBot />
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
