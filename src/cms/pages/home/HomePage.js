// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHome } from "../../../admin/redux/slice/website/homeSlice";
import Navbar from "../../components/navbar/Navbar";
// import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";

import "../../css/home/home.css";
import { Link } from "react-router-dom";
import heroImage from "../../assets/img/hero-section/hero_crm.jpg"; // adjust path as needed

import BackgroundImage from "../../assets/img/hero-section/4680.jpg";
import Topbar from "../../components/topbar/Topbar";
// Import the necessary CSS files
const HomePage = () => {
  // <Topbar/>
  // Home page data
  const homeData = {
    title: "Innovative Solutions for Modern Businesses",
    subtitle: "Transforming ideas into powerful digital experiences",
    intro_text:
      "We help businesses leverage cutting-edge technology to stay ahead of the competition. Our solutions are designed to optimize your operations, enhance customer experience, and drive growth.",
    button_text: "Get Started",
    button_link: "/request-demo",
    hero_image: heroImage,
    background_image: BackgroundImage,
  };

  return (
    <div className="home-page">

      <div
        className="hero-section"
        style={{ backgroundImage: `url(${homeData.background_image})` }}
      >
        <div className="container hero-container">
          <div className="hero-content">
            <h1>{homeData.title}</h1>
            <h2>{homeData.subtitle}</h2>
            <p>{homeData.intro_text}</p>
            <Link to={homeData.button_link} className="btn hero-btn">
              {homeData.button_text}
            </Link>
          </div>
          <div className="hero-image">
            <img src={homeData.hero_image || "/placeholder.svg"} alt="Hero" />
          </div>
        </div>
      </div>

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Fast Implementation</h3>
              <p>
                Quick deployment of solutions to get your business up and
                running in no time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure & Reliable</h3>
              <p>
                Enterprise-grade security measures to protect your valuable
                data.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3>Customizable</h3>
              <p>
                Tailor-made solutions that adapt to your specific business
                requirements.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance to ensure smooth operations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2>Ready to transform your business?</h2>
          <p>
            Schedule a demo today and see how our solutions can help you achieve
            your goals.
          </p>
          <Link to="/request-demo" className="btn">
            Request a Demo
          </Link>
        </div>

      </section>
    </div>
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
