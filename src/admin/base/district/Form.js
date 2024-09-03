import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDistrict } from "../../redux/slice/districtSlice";

const DistrictForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.districts.createStatus);
  const createError = useSelector((state) => state.districts.createError);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDistrict(formData));
    setFormData({ name: "" });
  };

  return (
    <div className="content-wrapper">
      <div className="section">
        <div className="container">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h4>Add District</h4>
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
