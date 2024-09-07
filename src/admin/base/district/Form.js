import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDistrict } from "../../redux/slice/districtSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const DistrictForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const createStatus = useSelector((state) => state.districts.createStatus);
  const createError = useSelector((state) => state.districts.createError);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDistrict(formData));
    // setFormData({ name: "" });
  };
  // Redirect on successful creation
  useEffect(() => {
    if (createStatus === "succeeded") {
      // Optionally, you can display a success message here
      alert("District created successfully!");
      // Redirect to the DistrictList component
      navigate("/dashboard/setup/district"); // Adjust the path as needed
    }
  }, [createStatus, navigate]);
  return (
    <div className="content-wrapper">
      <div className="section">
        <div className="container">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <Link to="create" className="nav-link btn btn-info">
                  <h5>Add District</h5>
                </Link>
              </div>
              <div className="card-body">
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
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  {createStatus === "loading" && <p>Saving...</p>}
                  {createStatus === "failed" && (
                    <p className="error">
                      Error: {createError.message || "An error occurred"}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictForm;

// const DistrictForm = () => {
//   const [formData, setFormData] = useState({ name: "" });
//   const dispatch = useDispatch();
//   const createStatus = useSelector((state) => state.districts.createStatus);
//   const createError = useSelector((state) => state.districts.createError);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createDistrict(formData));
//     setFormData({ name: "" });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="section">
//         <div className="container">
//           <div className="container-fluid">
//             <div className="card">
//               <div className="card-header">
//                 <h4>Add District</h4>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="name">Name:</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       className="form-control"
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     Save
//                   </button>
//                   {createStatus === "loading" && <p>Saving...</p>}
//                   {createStatus === "failed" && (
//                     <p className="error">Error: {createError}</p>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DistrictForm;
