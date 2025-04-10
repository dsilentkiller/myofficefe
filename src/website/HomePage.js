import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../admin/redux/slice/website/homeSlice";
import Navbar from "../website/components/Navbar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import "./css/homepage.css";

const Homepage = () => {
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
      <div className="content-section">
        <div className="container">
          <h1>Welcome to the CRM System</h1>
          <p className="intro-text">
            Manage your business effortlessly with our advanced CRM system.
          </p>
          <div className="home-data">
            <div className="home-item">
              <h3>CRM Feature 1</h3>
              <p>Manage your customer interactions with ease.</p>
            </div>
            <div className="home-item">
              <h3>CRM Feature 2</h3>
              <p>Track and manage follow-ups efficiently.</p>
            </div>
            <div className="home-item">
              <h3>CRM Feature 3</h3>
              <p>Get detailed analytics on your business performance.</p>
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

export default Homepage;
