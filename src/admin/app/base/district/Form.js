import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDistrict,
  updateDistrict,
} from "../../../../redux/slice/admin/base/districtSlice";
import {
  fetchProvinces,
  fetchDistrictsByProvince,
} from "../../../../redux/slice/admin/base/provinceSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DistrictForm = () => {
  const [formData, setFormData] = useState({ name: "", province: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { districtId } = useParams(); // Get districtId from URL for editing

  const createStatus = useSelector((state) => state.districts.createStatus);
  const createError = useSelector((state) => state.districts.createError);
  const { list: provinces } = useSelector((state) => state.provinces);
  const districts = useSelector((state) => state.districts.list || []);
  const district = useSelector((state) =>
    state.districts.list.find((d) => d.id === districtId)
  ); // Fetch the district if editing

  useEffect(() => {
    dispatch(fetchProvinces());
    if (districtId) {
      setFormData({ name: district.name, province: district.provinceId });
    }
  }, [dispatch, districtId, district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setFormData({ ...formData, province: provinceId });
    dispatch(fetchDistrictsByProvince(provinceId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if district name already exists
    const existingDistrict = districts.some(
      (dist) =>
        dist.name && dist.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingDistrict) {
      toast.error("District with this name already exists.");
      return;
    }

    if (districtId) {
      dispatch(updateDistrict({ id: districtId, ...formData }));
    } else {
      dispatch(createDistrict(formData));
    }
  };

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success(
        districtId
          ? "District updated successfully!"
          : "District created successfully!"
      );
      setFormData({ name: "", province: "" });
      navigate("/dashboard/setup/district");
    }
    if (createStatus === "failed") {
      toast.error(`Error: ${createError.message || "An error occurred"}`);
    }
  }, [createStatus, createError, navigate, districtId]);

  return (
    <div className="content-wrapper">
      <div className="section">
        <div className="container">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h5>{districtId ? "Edit District" : "Add District"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="province">Province:</label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      className="form-control"
                      onChange={handleProvinceChange}
                      required
                    >
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">District Name:</label>
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
                    {districtId ? "Update" : "Save"}
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

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createDistrict } from "../../../redux/slice/admin/base/districtSlice";
// import {
//   fetchProvinces,
//   fetchDistrictsByProvince,
// } from "../../../redux/slice/admin/base/provinceSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Import toast for notifications

// const DistrictForm = () => {
//   const [formData, setFormData] = useState({ name: "", province: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const createStatus = useSelector((state) => state.districts.createStatus);
//   const createError = useSelector((state) => state.districts.createError);
//   const { list: provinces } = useSelector((state) => state.provinces);

//   // Handle form changes for both province and district name
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Dispatch createDistrict action on form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createDistrict(formData));
//   };

//   // Fetch provinces on component mount
//   useEffect(() => {
//     dispatch(fetchProvinces());
//   }, [dispatch]);

//   // Handle province selection change
//   const handleProvinceChange = (e) => {
//     const provinceId = e.target.value;
//     setFormData({ ...formData, province: provinceId });
//     dispatch(fetchDistrictsByProvince(provinceId)); // Fetch districts for the selected province if needed
//   };

//   // Show success or error messages and reset form on successful submission
//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("District created successfully!");
//       setFormData({ name: "", province: "" });
//       navigate("/dashboard/setup/district");
//     }
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError, navigate]);

//   return (
//     <div className="content-wrapper">
//       <div className="section">
//         <div className="container">
//           <div className="container-fluid">
//             <div className="card">
//               <div className="card-header">
//                 <h5>Add District</h5>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="province">Province:</label>
//                     <select
//                       id="province"
//                       name="province"
//                       value={formData.province}
//                       className="form-control"
//                       onChange={handleProvinceChange}
//                       required
//                     >
//                       <option value="">Select Province</option>
//                       {provinces.map((province) => (
//                         <option key={province.id} value={province.id}>
//                           {province.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="name">District Name:</label>
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
//                     <p className="error">
//                       Error: {createError.message || "An error occurred"}
//                     </p>
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

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createDistrict } from "../../../redux/slice/admin/base/districtSlice";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify"; // Import toast

// const DistrictForm = () => {
//   const [formData, setFormData] = useState({ name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const createStatus = useSelector((state) => state.districts.createStatus);
//   const createError = useSelector((state) => state.districts.createError);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createDistrict(formData));
//     // setFormData({ name: "" });
//   };
//   //handle add district button
//   // const handleAddDistrict = () => {
//   //   toast.success("District created successfully!");
//   // };
//   // Redirect on successful creation

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("District created successfully!"); // Use toast for success message
//       setFormData({ name: "" }); // Reset form data
//       // dispatch(resetCreateStatus()); // Reset status after showing the message
//       navigate("/dashboard/setup/district"); // Redirect to the DistrictList component
//     }
//   }, [createStatus, navigate]);
//   //district creation failed
//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`); // Use toast for error message
//     }
//   }, [createStatus, createError]);
//   return (
//     <div className="content-wrapper">
//       <div className="section">
//         <div className="container">
//           <div className="container-fluid">
//             <div className="card">
//               <div className="card-header">
//                 <Link
//                   // onClick={handleAddDistrict}
//                   className="nav-link btn btn-primary"
//                 >
//                   <h5>Add District</h5>
//                 </Link>
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
//                     <p className="error">
//                       Error: {createError.message || "An error occurred"}
//                     </p>
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
