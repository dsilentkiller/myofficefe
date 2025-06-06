// "use client";

// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../../css/contact/contact.css"; // Import the CSS file for styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../assets/img/hero-section/4680.jpg";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../../redux/slice/cms/contact/contactSlice";
const Contact = () => {
  const dispatch = useDispatch();
  // Contact page data
  const contactData = {
    pri_phone: "9828889263",
    email: "pathibharapulse@gmail.com",
    address: "Tinkune 35 Kathmandu, Nimisha girls hostel building",
    social_media_links: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      full_name: e.target.full_name.value,
      email: e.target.email.value,
      pri_phone: e.target.pri_phone.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      await dispatch(createContact(formData)).unwrap();
      toast.success("Form submitted successfully! We will get back to you soon.");
      e.target.reset(); // Clear form after submission
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>

      <div className="contact-page">
        <div
          className="contact-header"

          style={{
            backgroundImage: `url(${backgroundImage})`, // Use your glowing background
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backdropFilter: "brightness(0.6)", // Optional darken filter for better text contrast
          }}

        >
          <div className="container">
            <h1 className="section-title"
              style={{
                color: "#F1F5F9",             // White font
                fontSize: "3rem",             // Large font size like the image
                fontWeight: "bold",           // Bold font weight
                fontFamily: "'Segoe UI', Poppins, Inter, Lato, sans-serif"

                // textShadow: "0 2px 8px rgba(242, 242, 243, 0.93)", // Subtle glow
              }}>Contact Us</h1>
            <p className="section-subtitle"

              style={{
                color: "#F1F5F9",             // White font
                fontSize: "2rem",             // Large font size like the image
                fontWeight: "bold",           // Bold font weight
                fontFamily: "'Segoe UI', Poppins, Inter, Lato, sans-serif"

                // textShadow: "0 2px 8px rgba(242, 242, 243, 0.93)", // Subtle glow
              }}>
              Get in touch with our team for any inquiries or support
            </p>
          </div>
        </div>

        <section className="section contact-section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info"
              >
                <h2>Contact Information</h2>
                <p>
                  We're here to help! Reach out to us through any of the
                  following channels:
                </p>

                <div className="info-item">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <h3>Phone</h3>
                    <p>{contactData.pri_phone}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h3>Email</h3>
                    <p>{contactData.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3>Address</h3>
                    <p>{contactData.address}</p>
                  </div>
                </div>

                <div className="social-links">
                  <h3>Follow Us</h3>
                  <div className="social-icons">
                    <a
                      href={contactData.social_media_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href={contactData.social_media_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={contactData.social_media_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href={contactData.social_media_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                <h2>Send Us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="full_name" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="pri_phone" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </section>

        <section className="section map-section">
          <div className="container">
            <h2 className="section-title">Our Location</h2>
            <div className="map-container">
              {/* In a real application, you would embed a Google Map or similar here */}
              <div className="map-placeholder">
                <div className="map-container" style={{ marginTop: '2rem' }}>
                  <iframe
                    src="https://www.google.com/maps?q=M8PW%2BHJ+Kathmandu,+Nepal&z=16&output=embed"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pathibhara Pulse Location"
                  ></iframe>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>


    </>
  );
};

export default Contact;

// const Contact = () => {
//   // Contact page data
//   const contactData = {
//     pri_phone: "+1 (123) 456-7890",
//     email: "info@company.com",
//     address: "123 Business Street, Suite 100, City, State 12345",
//     social_media_links: {
//       facebook: "https://facebook.com",
//       twitter: "https://twitter.com",
//       linkedin: "https://linkedin.com",
//       instagram: "https://instagram.com",
//     },
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real application, you would handle form submission here
//     alert(
//       "Form submitted! In a real application, this would send your message to our team."
//     );
//   };

//   return (
//     <div className="contact-page">
//       <div className="contact-header">
//         <div className="container">
//           <h1 className="section-title">Contact Us</h1>
//           <p className="section-subtitle">
//             Get in touch with our team for any inquiries or support
//           </p>
//         </div>
//       </div>

//       <section className="section contact-section">
//         <div className="container">
//           <div className="contact-grid">
//             <div className="contact-info">
//               <h2>Contact Information</h2>
//               <p>
//                 We're here to help! Reach out to us through any of the following
//                 channels:
//               </p>

//               <div className="info-item">
//                 <i className="fas fa-phone-alt"></i>
//                 <div>
//                   <h3>Phone</h3>
//                   <p>{contactData.pri_phone}</p>
//                 </div>
//               </div>

//               <div className="info-item">
//                 <i className="fas fa-envelope"></i>
//                 <div>
//                   <h3>Email</h3>
//                   <p>{contactData.email}</p>
//                 </div>
//               </div>

//               <div className="info-item">
//                 <i className="fas fa-map-marker-alt"></i>
//                 <div>
//                   <h3>Address</h3>
//                   <p>{contactData.address}</p>
//                 </div>
//               </div>

//               <div className="social-links">
//                 <h3>Follow Us</h3>
//                 <div className="social-icons">
//                   <a
//                     href={contactData.social_media_links.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <i className="fab fa-facebook-f"></i>
//                   </a>
//                   <a
//                     href={contactData.social_media_links.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <i className="fab fa-twitter"></i>
//                   </a>
//                   <a
//                     href={contactData.social_media_links.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <i className="fab fa-linkedin-in"></i>
//                   </a>
//                   <a
//                     href={contactData.social_media_links.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <i className="fab fa-instagram"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="contact-form-container">
//               <h2>Send Us a Message</h2>
//               <form className="contact-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Full Name</label>
//                   <input type="text" id="name" name="name" required />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input type="email" id="email" name="email" required />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number</label>
//                   <input type="tel" id="phone" name="phone" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="subject">Subject</label>
//                   <input type="text" id="subject" name="subject" required />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message">Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="5"
//                     required
//                   ></textarea>
//                 </div>

//                 <button type="submit" className="btn submit-btn">
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="section map-section">
//         <div className="container">
//           <h2 className="section-title">Our Location</h2>
//           <div className="map-container">
//             {/* In a real application, you would embed a Google Map or similar here */}
//             <div className="map-placeholder">
//               <img
//                 src="https://via.placeholder.com/1200x400?text=Google+Map+Would+Be+Here"
//                 alt="Map"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [statusMessage, setStatusMessage] = useState(""); // For status messages
//   const [statusType, setStatusType] = useState(""); // For success/error styles

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/contact/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setStatusMessage("Thank you! Your message has been sent.");
//         setStatusType("success");
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         setStatusMessage("Oops! Something went wrong. Please try again.");
//         setStatusType("error");
//       }
//     } catch (error) {
//       setStatusMessage("Network error. Please try again.");
//       setStatusType("error");
//     }
//   };

//   // Google Map Settings
//   const mapContainerStyle = {
//     width: "100%",
//     height: "400px",
//   };

//   const center = {
//     lat: 27.7172, // Kathmandu latitude (Example location)
//     lng: 85.324, // Kathmandu longitude (Example location)
//   };

//   return (
//     <div className="contact-page">
//       {/* Topbar and Navbar */}
//       <div className="home-section">
//         <Topbar />
//         <Navbar />
//       </div>

//       {/* Contact Form */}
//       <div className="contact-container">
//         <h1>Contact Us</h1>
//         <div className="contact-form-container">
//           <form onSubmit={handleSubmit} className="contact-form">
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               required
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Your Message"
//               value={formData.message}
//               onChange={(e) =>
//                 setFormData({ ...formData, message: e.target.value })
//               }
//               required
//             ></textarea>
//             <button type="submit">Send Message</button>
//           </form>

//           {statusMessage && (
//             <div className={`message ${statusType}`}>{statusMessage}</div>
//           )}
//         </div>
//       </div>

//       {/* Google Map */}
//       <div className="map-container">
//         <h2>Our Location</h2>
//         <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={14}
//           >
//             <Marker position={center} />
//           </GoogleMap>
//         </LoadScript>
//       </div>

//       {/* Footer Section */}
//       <div className="footer-section">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Contact;
