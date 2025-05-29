import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProvince } from "../../../../redux/slice/admin/base/provinceSlice";
import { toast } from "react-toastify"; // Import toast
import { Link } from "react-router-dom";
const ProvinceForm = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch existing provinces and status/error states from Redux
  const createStatus = useSelector((state) => state.provinces.createStatus);
  const createError = useSelector((state) => state.provinces.createError);
  const provinces = useSelector((state) => state.provinces.list);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(createProvince(formData));
  //   // setFormData({ name: "" });
  // };
  //handle add Province button
  // const handleAddProvince = () => {
  //   toast.success("Province created successfully!");
  // };
  // Redirect on successful creation

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Province created successfully!"); // Use toast for success message
      setFormData({ name: "" }); // Reset form data
      // dispatch(resetCreateStatus()); // Reset status after showing the message
      navigate("/dashboard/setup/province"); // Redirect to the ProvinceList component
    }
  }, [createStatus, navigate]);
  //Province creation failed
  useEffect(() => {
    if (createStatus === "failed") {
      toast.error(`Error: ${createError.message || "An error occurred"}`); // Use toast for error message
    }
  }, [createStatus, createError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    console.log("provinces:", provinces);
    if (!formData.name.trim()) return; // Prevent empty name submission
    //checking if the province name already exists
    const existingProvince = provinces.some(
      (prov) =>
        prov.name && prov.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingProvince) {
      toast.error("Province with this name already exists.");
      return;
    }

    dispatch(createProvince(formData))
      .unwrap()
      .catch((error) => {
        console.error("Create Error:", error);
      });
  };

  return (
    <div className="content-wrapper">
      <div className="section">
        <div className="container">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <Link
                  // onClick={handleAddProvince}
                  className="nav-link btn btn-primary"
                >
                  <h5>Add Province</h5>
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

export default ProvinceForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createProvince, fetchProvince } from "../../redux/slice/provinceSlice";

// const ProvinceForm = () => {
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({ name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch existing provinces and status/error states from Redux
//   const createStatus = useSelector((state) => state.provinces.createStatus);
//   const createError = useSelector((state) => state.provinces.createError);
//   const provinces = useSelector((state) => state.provinces.list);

//   // Handle form field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Fetch existing provinces when the component mounts
//   useEffect(() => {
//     dispatch(fetchProvince());
//   }, [dispatch]);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if the province name already exists
//     const isDuplicate = provinces.some(
//       (province) => province.name.toLowerCase() === formData.name.toLowerCase()
//     );

//     if (isDuplicate) {
//       setError("Province name already exists!");
//     } else {
//       setError(null);
//       dispatch(createProvince(formData));
//     }
//   };

//   // Redirect on successful creation
//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       // Optionally, you can display a success message here
//       alert("Province created successfully!");
//       // Redirect to the ProvinceList component
//       navigate("/dashboard/setup/province"); // Adjust the path as needed
//     }
//   }, [createStatus, navigate]);

//   return (
//     <div>
//       <h2>Create a new Province</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="provinceName">Province Name:</label>
//           <input
//             type="text"
//             id="provinceName"
//             name="name"
//             value={formData.name}
//             onChange={handleChange} // Update formData on change
//             required
//           />
//         </div>
//         {/* Display error messages */}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {createError && (
//           <p style={{ color: "red" }}>
//             {/* Ensure that createError.message is a string */}
//             {typeof createError.message === "string"
//               ? createError.message
//               : "An error occurred while creating the province."}
//           </p>
//         )}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProvinceForm;
