
import "../../css/services/services.css";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
// import backgroundImage from "../../assets/img/hero-section/background-image.jpeg"; // adjust path as needed
import backgroundImage from "../../assets/img/hero-section/4680.jpg";
// About component
const Services = () => {
  // Updated Services Data
  const servicesData = [
    {
      id: 1,
      title: "AI-Powered Chatbot Development",
      description:
        "Intelligent, NLP-driven chatbots designed to automate customer support, lead generation, and user engagement across platforms.",
      icon: "fas fa-robot",
      order: 1,
    },
    {
      id: 2,
      title: "AI Integration into Existing Systems",
      description:
        "Enhance your current software with cutting-edge AI capabilities including automation, machine learning, NLP, and smart analytics.",
      icon: "fas fa-plug",
      order: 2,
    },
    {
      id: 3,
      title: "Custom Web & Software Development",
      description:
        "Scalable, secure, and responsive applications tailored for your unique business needs — from web portals to enterprise software.",
      icon: "fas fa-code",
      order: 3,
    },
    {
      id: 4,
      title: "Mobile Application Development",
      description:
        "Build high-performance mobile applications for Android and iOS with intuitive UI/UX and seamless backend integration.",
      icon: "fas fa-mobile-alt",
      order: 4,
    },
    {
      id: 5,
      title: "Digital Marketing & Growth Strategy",
      description:
        "Drive visibility and conversions with performance-focused SEO, SEM, SMM, and strategic branding tailored for ROI.",
      icon: "fas fa-bullhorn",
      order: 5,
    },
  ];

  const sortedServices = [...servicesData].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="services-page">
        <div
          className="services-header"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "400px",
            display: "flex",
            backdropFilter: "brightness(0.6)",
          }}
        >
          <div className="container">
            <h1
              className="section-title"
              style={{
                color: "#F1F5F9",
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'Segoe UI', Poppins, Inter, Lato, sans-serif",
              }}
            >
              Our Services
            </h1>
            <p
              className="section-subtitle"
              style={{
                color: "#F1F5F9",
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "'Segoe UI', Poppins, Inter, Lato, sans-serif",
              }}
            >
              Transformative solutions tailored to meet your business goals
            </p>
          </div>
        </div>

        <section className="section services-grid-section">
          <div className="container">
            <div className="services-grid">
              {sortedServices.map((service) => (
                <div className="service-card" key={service.id}>
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/contact" className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <h2 className="section-title">Our Approach</h2>
            <p className="section-subtitle">
              A systematic methodology to deliver exceptional results
            </p>

            <div className="process-steps">
              {[
                { step: 1, title: "Discovery", desc: "We begin by understanding your business, challenges, and objectives to define the scope of work." },
                { step: 2, title: "Planning", desc: "We create a detailed roadmap with timelines, milestones, and resource allocation for your project." },
                { step: 3, title: "Execution", desc: "Our team implements the solution using agile methodologies, ensuring quality at every step." },
                { step: 4, title: "Delivery", desc: "We deploy the solution, provide training, and ensure a smooth transition to the new system." },
                { step: 5, title: "Support", desc: "We offer ongoing maintenance and support to ensure your solution continues to perform optimally." },
              ].map((step) => (
                <div className="process-step" key={step.step}>
                  <div className="step-number">{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container">
            <h2>Ready to transform your business?</h2>
            <p>
              Schedule a consultation today and discover how our services can help you achieve your goals.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn">
                Contact Us
              </Link>
              <Link to="/request-demo" className="btn btn-outline">
                Request a Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;

// old working well
// const Services = () => {
//   // Services data
//   const servicesData = [
//     {
//       id: 1,
//       title: "Software Development",
//       description:
//         "Custom software solutions tailored to your business needs. We develop scalable, secure, and user-friendly applications that help streamline your operations and enhance customer experience.",
//       icon: "fas fa-code",
//       order: 1,
//     },
//     {
//       id: 2,
//       title: "Cloud Solutions",
//       description:
//         "Leverage the power of cloud computing with our comprehensive cloud services. We help you migrate, manage, and optimize your cloud infrastructure for maximum efficiency and cost-effectiveness.",
//       icon: "fas fa-cloud",
//       order: 2,
//     },
//     {
//       id: 3,
//       title: "Data Analytics",
//       description:
//         "Transform your data into actionable insights with our advanced analytics solutions. We help you collect, process, and analyze data to make informed business decisions and gain a competitive edge.",
//       icon: "fas fa-chart-bar",
//       order: 3,
//     },
//     {
//       id: 4,
//       title: "Cybersecurity",
//       description:
//         "Protect your digital assets with our robust cybersecurity services. We implement comprehensive security measures to safeguard your data, systems, and networks from threats and vulnerabilities.",
//       icon: "fas fa-shield-alt",
//       order: 4,
//     },
//     {
//       id: 5,
//       title: "IT Consulting",
//       description:
//         "Get expert guidance on your technology strategy with our IT consulting services. We help you align your IT initiatives with your business goals to drive growth and innovation.",
//       icon: "fas fa-lightbulb",
//       order: 5,
//     },
//     {
//       id: 6,
//       title: "Mobile App Development",
//       description:
//         "Create engaging mobile experiences with our app development services. We build native and cross-platform apps that deliver exceptional user experiences across all devices.",
//       icon: "fas fa-mobile-alt",
//       order: 6,
//     },
//   ];

//   // Sort services by order
//   const sortedServices = [...servicesData].sort((a, b) => a.order - b.order);

//   return (
//     <>
//       <div className="services-page">
//         <div
//           className="services-header"
//           style={{
//             backgroundImage: `url(${backgroundImage})`, // Use your glowing background
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             height: "400px",
//             display: "flex",
//             // alignItems: "center",
//             // justifyContent: "center",
//             // textAlign: "center",
//             backdropFilter: "brightness(0.6)", // Optional darken filter for better text contrast
//           }}


//         >
//           <div className="container">
//             <h1 className="section-title"
//               style={{
//                 color: "#F1F5F9",             // White font
//                 fontSize: "3rem",             // Large font size like the image
//                 fontWeight: "bold",           // Bold font weight
//                 fontFamily: "'Segoe UI', sans-,Poppins, Inter, or Lato", // Clean, modern font
//                 // textShadow: "0 2px 8px rgba(242, 242, 243, 0.93)", // Subtle glow
//               }}>Our Services</h1>
//             <p className="section-subtitle"
//               style={{
//                 color: "#F1F5F9",             // White font
//                 fontSize: "2rem",             // Large font size like the image
//                 fontWeight: "bold",           // Bold font weight
//                 fontFamily: "'Segoe UI', sans-,Poppins, Inter, or Lato", // Clean, modern font
//                 // textShadow: "0 2px 8px rgba(242, 242, 243, 0.93)", // Subtle glow
//               }} >
//               Comprehensive solutions to address your business challenges
//             </p>
//           </div>
//         </div>

//         <section className="section services-grid-section">
//           <div className="container">
//             <div className="services-grid">
//               {sortedServices.map((service) => (
//                 <div className="service-card" key={service.id}>
//                   <div className="service-icon">
//                     <i className={service.icon}></i>
//                   </div>
//                   <h3>{service.title}</h3>
//                   <p>{service.description}</p>
//                   <Link to="/contact" className="service-link">
//                     Learn More <i className="fas fa-arrow-right"></i>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="section process-section">
//           <div className="container">
//             <h2 className="section-title">Our Approach</h2>
//             <p className="section-subtitle">
//               A systematic methodology to deliver exceptional results
//             </p>

//             <div className="process-steps">
//               <div className="process-step">
//                 <div className="step-number">1</div>
//                 <h3>Discovery</h3>
//                 <p>
//                   We begin by understanding your business, challenges, and
//                   objectives to define the scope of work.
//                 </p>
//               </div>
//               <div className="process-step">
//                 <div className="step-number">2</div>
//                 <h3>Planning</h3>
//                 <p>
//                   We create a detailed roadmap with timelines, milestones, and
//                   resource allocation for your project.
//                 </p>
//               </div>
//               <div className="process-step">
//                 <div className="step-number">3</div>
//                 <h3>Execution</h3>
//                 <p>
//                   Our team implements the solution using agile methodologies,
//                   ensuring quality at every step.
//                 </p>
//               </div>
//               <div className="process-step">
//                 <div className="step-number">4</div>
//                 <h3>Delivery</h3>
//                 <p>
//                   We deploy the solution, provide training, and ensure a smooth
//                   transition to the new system.
//                 </p>
//               </div>
//               <div className="process-step">
//                 <div className="step-number">5</div>
//                 <h3>Support</h3>
//                 <p>
//                   We offer ongoing maintenance and support to ensure your
//                   solution continues to perform optimally.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="section cta-section">
//           <div className="container">
//             <h2>Ready to transform your business?</h2>
//             <p>
//               Schedule a consultation today and discover how our services can
//               help you achieve your goals.
//             </p>
//             <div className="cta-buttons">
//               <Link to="/contact" className="btn">
//                 Contact Us
//               </Link>
//               <Link to="/request-demo" className="btn btn-outline">
//                 Request a Demo
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>

//     </>
//   );
// };

// export default Services;

//   return (
//     <div className="service-container">
//       {/* Top Section */}
//       <div className="service-section">
//         <Topbar />
//         <Navbar />
//       </div>

//       {/* Services Content Section */}
//       <div className="service-content">
//         <div className="container">
//           <h1 className="service-heading">Our CRM Services</h1>
//           <p className="intro-text">
//             Discover the powerful features of our CRM system. We offer various
//             services to help your business grow and streamline its processes.
//           </p>

//           {/* Services List */}
//           <div className="service-list">
//             {services &&
//               services.map((service, index) => (
//                 <div key={index} className="service-item">
//                   <div className="service-icon">
//                     {/* You can dynamically add an image or icon for each service */}
//                     <img
//                       src={service.iconUrl}
//                       alt={service.name}
//                       className="service-img"
//                     />
//                   </div>
//                   <h3>{service.name}</h3>
//                   <p>{service.description}</p>
//                 </div>
//               ))}
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

// export default Service;
