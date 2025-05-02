import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchServices } from "../../";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../css/website/service.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Service = () => {
  const dispatch = useDispatch();
  const { loading, services, error } = useSelector(
    (state) => state.services || {}
  );

  // useEffect(() => {
  //   dispatch(fetchServices());
  // }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="service-container">
      {/* Top Section */}
      <div className="service-section">
        <Topbar />
        <Navbar />
      </div>

      {/* Services Content Section */}
      <div className="service-content">
        <div className="container">
          <h1 className="service-heading">Our CRM Services</h1>
          <p className="intro-text">
            Discover the powerful features of our CRM system. We offer various
            services to help your business grow and streamline its processes.
          </p>

          {/* Services List */}
          <div className="service-list">
            {services &&
              services.map((service, index) => (
                <div key={index} className="service-item">
                  <div className="service-icon">
                    {/* You can dynamically add an image or icon for each service */}
                    <img
                      src={service.iconUrl}
                      alt={service.name}
                      className="service-img"
                    />
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
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

export default Service;
