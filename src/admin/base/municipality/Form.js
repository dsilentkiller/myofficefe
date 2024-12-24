import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createMunicipality } from "../../redux/slice/base/municipalitySlice";
import {
  fetchMunicipalityByDistrict,
  fetchDistricts,
} from "../../redux/slice/base/districtSlice";
const MunicipalityForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector(
    (state) => state.municipalities.createStatus
  );
  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);
  const createError = useSelector((state) => state.municipalities.createError);
  const districts = useSelector((state) => state.districts.list);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Municipality created successfully!");
      setFormData({ name: "" });
      navigate("/dashboard/setup/municipality");
    }
  }, [createStatus, navigate]);

  useEffect(() => {
    if (createStatus === "failed") {
      toast.error(`Error: ${createError.message || "An error occurred"}`);
    }
  }, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({ ...formData, district: districtId });
    dispatch(fetchMunicipalityByDistrict(districtId));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMunicipality(formData));
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
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* district */}
                <div className="form-group">
                  <label htmlFor="district">district:</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    className="form-control"
                    onChange={handleDistrictChange}
                    required
                  >
                    <option value="">Select district</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
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
