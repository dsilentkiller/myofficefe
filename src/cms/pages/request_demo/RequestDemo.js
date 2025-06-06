

// import Footer from "../../components/footer/Footer";
// import Topbar from "../../components/topbar/Topbar";
// import Navbar from "../../components/navbar/Navbar";
// import backgroundImage from "../../assets/img/hero-section/background-image.jpg"; // adjust path as needed
// import { useNavigate } from "react-router-dom"; // For handling redirection after submission
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequestDemo } from "../../../redux/slice/cms/demo/requestDemoSlice";
import "../../css/request-demo/request_demo.css"; // Import the CSS file for styling
import backgroundImage from "../../assets/img/hero-section/4680.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestDemo = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    pri_phone: "",
    preferred_demo_time: "",
    priority: "normal",

    request_date: "",
    priority: "normal",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const demos = useSelector(state => state.requestDemo || {});

  const loading = useSelector((state) => state.requestDemo?.loading || false);
  const error = useSelector((state) => state.requestDemo?.error || null);




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createRequestDemo(formData)).unwrap();
      toast.success("Demo request submitted successfully!");

      setFormData({
        full_name: "",
        email: "",
        company_name: "",
        pri_phone: "",
        preferred_demo_time: "",
        request_date: "",
        priority: "normal",
        message: "",
      });
    } catch (err) {
      toast.error("Submission failed: " + (err?.detail || "Something went wrong"));
    }
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // In a real application, you would handle form submission here
  //   console.log(formData);
  //   alert(
  //     "Demo request submitted! In a real application, this would schedule your demo."
  //   );
  // };

  // Get tomorrow's date in YYYY-MM-DD format for the date input min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  return (
    <>

      <div className="request-demo-page">
        <div
          className="demo-header"
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
            <h1 className="section-title"
              style={{
                color: "#F1F5F9",
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'Segoe UI', Poppins, Inter, Lato, sans-serif",
              }}>Request a Demo</h1>
            <p className="section-subtitle"
              style={{
                color: "#F1F5F9",
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "'Segoe UI', Poppins, Inter, Lato, sans-serif",
              }}
            >
              See our solutions in action and discover how they can benefit your
              business
            </p>
          </div>
        </div>

        <section className="section demo-section">
          <div className="container">
            <div className="demo-grid">
              <div className="demo-info">
                <h2>Why Request a Demo?</h2>
                <ul className="demo-benefits">
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>
                      See our platform in action with a personalized walkthrough
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>
                      Get answers to your specific questions from our experts
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>
                      Understand how our solutions can be tailored to your needs
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>
                      Explore features and capabilities relevant to your
                      business
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>
                      Receive a custom proposal based on your requirements
                    </span>
                  </li>
                </ul>

                <div className="demo-testimonial">
                  <p>
                    "The demo was incredibly helpful in understanding how the
                    platform could solve our specific challenges. The team was
                    knowledgeable and addressed all our concerns."
                  </p>
                  <div className="testimonial-author">
                    <img src="https://via.placeholder.com/60x60" alt="Client" />
                    <div>
                      <h4>Sarah Johnson</h4>
                      <p>CTO, XYZ Company</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="demo-form-container">
                <h2>Schedule Your Demo</h2>
                <p>
                  Fill out the form below and our team will contact you to
                  arrange a demo at your convenience.
                </p>

                <form className="demo-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="full_name">Full Name *</label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company_name">Company Name *</label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pri_phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="pri_phone"
                      name="pri_phone"
                      value={formData.pri_phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="request_date">Preferred Demo Date *</label>
                    <input
                      type="date"
                      id="request_date"
                      name="request_date"
                      min={tomorrowFormatted}
                      value={formData.request_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority *</label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      required
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="most urgent">Most Urgent</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your specific needs or questions"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn submit-btn" disabled={loading}>
                    {loading ? "Submitting..." : "Request Demo"}
                  </button>

                  {/* <button type="submit" className="btn submit-btn">
                    Request Demo
                  </button> */}
                </form>
              </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

          </div>
        </section>

        <section className="section faq-section">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>How long does a typical demo last?</h3>
                <p>
                  Our demos typically last 30-45 minutes, including time for
                  questions and discussion.
                </p>
              </div>

              <div className="faq-item">
                <h3>Who should attend the demo?</h3>
                <p>
                  We recommend including decision-makers and team members who
                  will be using the solution.
                </p>
              </div>

              <div className="faq-item">
                <h3>Is there any cost for the demo?</h3>
                <p>
                  No, our demos are completely free of charge and come with no
                  obligation.
                </p>
              </div>

              <div className="faq-item">
                <h3>Can I request a specific focus for the demo?</h3>
                <p>
                  We tailor each demo to address your specific interests and
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default RequestDemo;

// const RequestDemo = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     demoDate: "",
//     message: "",
//   });

//   const [statusMessage, setStatusMessage] = useState(""); // For status messages
//   const [statusType, setStatusType] = useState(""); // For success/error styles
//   const history = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/requestdemo/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setStatusMessage("Thank you! Your demo request has been submitted.");
//         setStatusType("success");
//         setFormData({
//           name: "",
//           email: "",
//           company: "",
//           demoDate: "",
//           message: "",
//         });
//         setTimeout(() => history.push("/"), 3000); // Redirect after 3 seconds
//       } else {
//         setStatusMessage("Oops! Something went wrong. Please try again.");
//         setStatusType("error");
//       }
//     } catch (error) {
//       setStatusMessage("Network error. Please try again.");
//       setStatusType("error");
//     }
//   };

//   return (
//     <div className="requestdemo-page">
//       {/* Topbar and Navbar */}
//       <div className="home-section">
//         <Topbar />
//         <Navbar />
//       </div>

//       {/* Request Demo Section */}
//       <div className="requestdemo-container">
//         <h1>Request a Demo</h1>
//         <div className="requestdemo-form-container">
//           <form onSubmit={handleSubmit} className="requestdemo-form">
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
//             <input
//               type="text"
//               placeholder="Your Company"
//               value={formData.company}
//               onChange={(e) =>
//                 setFormData({ ...formData, company: e.target.value })
//               }
//               required
//             />
//             <input
//               type="date"
//               placeholder="Preferred Demo Date"
//               value={formData.demoDate}
//               onChange={(e) =>
//                 setFormData({ ...formData, demoDate: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Additional Message"
//               value={formData.message}
//               onChange={(e) =>
//                 setFormData({ ...formData, message: e.target.value })
//               }
//             ></textarea>
//             <button type="submit">Request Demo</button>
//           </form>

//           {statusMessage && (
//             <div className={`message ${statusType}`}>{statusMessage}</div>
//           )}
//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="footer-section">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default RequestDemo;
