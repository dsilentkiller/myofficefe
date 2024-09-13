import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import { useSelector } from "react-redux";
const MunicipalityForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "" });
  const createStatus = useSelector((state) => state.districts.createStatus);
  const createError = useSelector((state) => state.districts.createError);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Municipality created successfully!"); // Use toast for success message
      setFormData({ name: "" }); // Reset form data
      // dispatch(resetCreateStatus()); // Reset status after showing the message
      navigate("/dashboard/setup/municipality"); // Redirect to the MunicipalityList component
    }
  }, [createStatus, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submission
    try {
      // Ensure the correct API endpoint is used
      await axios.post("http://localhost:3000/api/setup/municipality/", {
        name,
      });
      setName(""); // Clear the input field after submission
      // alert("Municipality added successfully!");
      navigate("/dashboard/setup/municipality"); // Redirect to the municipality list page
    } catch (error) {
      // Set error message with more detailed information
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        setError(
          `Error: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        setError("No response from server. Please check your network.");
      } else {
        // Something happened in setting up the request
        setError("Error adding municipality. Please try again.");
      }
      console.error("Error adding municipality:", error);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Municipality</h4>
            </div>
            <div className="card-body">
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Municipality
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MunicipalityForm;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

// const MunicipalityForm = () => {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace the endpoint with your actual API endpoint
//       await axios.post("/api/municipalities/", { name });
//       setName(""); // Clear the input field after submission
//       alert("Municipality added successfully!");
//       navigate("/municipalities"); // Use navigate to redirect to the municipality list
//     } catch (error) {
//       setError("Error adding municipality. Please try again.");
//       console.error("Error adding municipality:", error);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4>Add Municipality</h4>
//             </div>
//             <div className="card-body">
//               {error && <p className="text-danger">{error}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Add Municipality
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MunicipalityForm;
