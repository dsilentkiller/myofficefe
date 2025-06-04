// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHome } from "../../../admin/redux/slice/website/homeSlice";
// import Navbar from "../../components/navbar/Navbar";
// import Topbar from "../../components/topbar/Topbar";
// import Footer from "../../components/footer/Footer";

import "../../css/home/home.css";
import { Link } from "react-router-dom";
// import heroImage from "../../assets/img/hero-section/hero_crm.jpg"; // adjust path as needed
import HeroSection from "../../pages/herosection/HeroSection"
// import BackgroundImage from "../../assets/img/hero-section/4680.jpg";
// import Topbar from "../../components/topbar/Topbar";
// Import the necessary CSS files
const HomePage = () => {

  return (
    <div className="home-page">


      <HeroSection />

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our CRM & Marketing Solutions</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Efficient Lead Management</h3>
              <p>
                Organize and track your leads seamlessly to improve conversion rates.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Targeted Digital Marketing</h3>
              <p>
                Reach your audience effectively with tailored campaigns across channels.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3>Data-Driven Insights</h3>
              <p>
                Analyze customer behavior and campaign performance to optimize ROI.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Dedicated Support Team</h3>
              <p>
                Our experts provide ongoing support to help you succeed every step of the way.
              </p>
            </div>
          </div>

        </div>

      </section >

      <section className="section cta-section">
        <div className="container">
          <h2>Ready to elevate your business with CRM and Digital Marketing?</h2>
          <p>
            Schedule a demo today and discover how our integrated solutions can accelerate your growth.
          </p>
          <Link to="/request-demo" className="btn">
            Request a Demo
          </Link>
        </div>

      </section>
    </div >
  );
};

export default HomePage;

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const { loading, data, error } = useSelector((state) => state.home || {});

//   useEffect(() => {
//     dispatch(fetchHome());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="homepage-container">
//       {/* Home Section */}
// <div className="home-section">
//   <Topbar />
//   <Navbar />
// </div>

//       {/* Content Section with Background Image */}
//       <div
//         className="content-section"
//         style={{ backgroundImage: "url('/hero-bg.jpg')" }}
//       >
//         <div className="container">
//           <h1 className="title">Welcome to the CRM System</h1>
//           <p className="intro-text">
//             Manage your business effortlessly with our advanced CRM system.
//           </p>
//           <div className="home-data">
//             <div className="home-item">
//               <h3 className="feature-title">CRM Feature 1</h3>
//               <p className="feature-description">
//                 Manage your customer interactions with ease.
//               </p>
//             </div>
//             <div className="home-item">
//               <h3 className="feature-title">CRM Feature 2</h3>
//               <p className="feature-description">
//                 Track and manage follow-ups efficiently.
//               </p>
//             </div>
//             <div className="home-item">
//               <h3 className="feature-title">CRM Feature 3</h3>
//               <p className="feature-description">
//                 Get detailed analytics on your business performance.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="chatbot">
//           <CRMChatBot />
//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="footer-section">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default HomePage;
