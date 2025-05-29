// import React from "react";

import React from "react";

// Import layout components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

// Import CSS for About Page
import "../../css/about/about.css"; // Make sure this path is correct
import backgroundImage from "../../assets/img/hero-section/background-image.jpg"; // adjust path as needed
// About component
const About = () => {
  // About page static data
  const aboutData = {
    title: "About Our Company",
    content:
      "Founded in 2010, our company has been at the forefront of technological innovation, helping businesses of all sizes transform their operations through cutting-edge solutions. With a team of experienced professionals and a passion for excellence, we've successfully delivered hundreds of projects across various industries.",
    image: "https://via.placeholder.com/800x600", // Ensure this URL works; replace with your real image URL if needed
    mission:
      "Our mission is to empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in an increasingly digital world.",
    vision:
      "We envision a future where every business, regardless of size, can leverage advanced technology to achieve their full potential and make a positive impact on the world.",
  };

  return (
    <>


      {/* About Page Main Content */}
      <div className="about-page">
        {/* Header Section */}

        <div
          className="about-header"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "400px", // or any preferred height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff", // optional: text color contrast
            textAlign: "center",
          }}
        >
          <div className="container">
            <h1 className="section-title">{aboutData.title}</h1>
          </div>
        </div>

        {/* About Content Section */}
        <section className="section about-content">
          <div className="container">
            <div className="about-grid">
              {/* Left Text Section */}
              <div className="about-text">
                <h2>Our Story</h2>
                <p>{aboutData.content}</p>
                <div className="values-container">
                  <div className="value-box">
                    <h3>Our Mission</h3>
                    <p>{aboutData.mission}</p>
                  </div>
                  <div className="value-box">
                    <h3>Our Vision</h3>
                    <p>{aboutData.vision}</p>
                  </div>
                </div>
              </div>

              {/* Right Image Section */}
              <div className="about-image">
                <img
                  src={aboutData.image}
                  alt="About Us"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "/assets/img/hero-section/background-image.jpeg";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="section team-section">
          <div className="container">
            <h2 className="section-title">Our Leadership Team</h2>
            <div className="team-grid">
              {/* Team Members */}
              {[
                {
                  name: "John Doe",
                  position: "CEO & Founder",
                  bio: "With over 20 years of experience in the industry, John leads our company with vision and expertise.",
                },
                {
                  name: "Jane Smith",
                  position: "CTO",
                  bio: "Jane oversees all technical aspects of the company, ensuring we deliver cutting-edge solutions.",
                },
                {
                  name: "Michael Johnson",
                  position: "COO",
                  bio: "Michael ensures smooth operations and efficient delivery of our services to clients worldwide.",
                },
              ].map((member, index) => (
                <div className="team-member" key={index}>
                  <div className="member-image">
                    <img
                      src="https://via.placeholder.com/300x300"
                      alt={member.name}
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="section stats-section">
          <div className="container">
            <div className="stats-grid">
              {[
                { value: "10+", label: "Years of Experience" },
                { value: "500+", label: "Projects Completed" },
                { value: "200+", label: "Happy Clients" },
                { value: "50+", label: "Team Members" },
              ].map((stat, index) => (
                <div className="stat-box" key={index}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

   
    </>
  );
};

export default About;

// const About = () => {
//   return (
//     <div className="about-container">
//       {/* Top Section */}
//       <div className="about-section">
//         <Topbar />
//         <Navbar />
//       </div>

//       {/* About Us Content Section with Dynamic Background */}
//       <div className="about-content">
//         <div className="container">
//           <h1 className="about-heading">About Pathibhara Pulse CRM</h1>
//           <p className="intro-text">
//             We are an IT company specializing in delivering cutting-edge CRM
//             solutions to businesses. Our CRM system is designed to enhance your
//             customer relationship management, streamline processes, and improve
//             overall productivity.
//           </p>

//           {/* Company Overview */}
//           <div className="company-overview">
//             <h2>Our Mission</h2>
//             <p>
//               At Pathibhara Pulse, we are committed to providing the best CRM
//               solutions that help businesses build stronger customer
//               relationships and achieve their goals. Our CRM software comes with
//               a wide array of features designed to meet the needs of small to
//               large-scale companies.
//             </p>
//           </div>

//           <div className="company-overview">
//             <h2>Our Vision</h2>
//             <p>
//               We aim to be a leading provider of advanced CRM systems that
//               empower businesses to deliver superior customer service and
//               continuously improve their customer experience. Our vision is to
//               make CRM accessible and easy for all businesses to use, no matter
//               their size.
//             </p>
//           </div>

//           {/* CRM Features */}
//           <div className="crm-features">
//             <h2>Key Features of Our CRM System</h2>
//             <div className="feature-item">
//               <h3>Customer Interaction Management</h3>
//               <p>
//                 Effortlessly track and manage customer interactions to ensure
//                 every lead and customer is handled with care.
//               </p>
//             </div>
//             <div className="feature-item">
//               <h3>Follow-up Management</h3>
//               <p>
//                 Our CRM helps you stay on top of follow-up activities, making
//                 sure no lead is forgotten and all customer inquiries are
//                 answered promptly.
//               </p>
//             </div>
//             <div className="feature-item">
//               <h3>Advanced Analytics</h3>
//               <p>
//                 Gain valuable insights into your business performance with our
//                 in-depth analytics and reporting features.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="footer-section">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default About;
