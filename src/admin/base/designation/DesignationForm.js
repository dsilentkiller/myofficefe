import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDesignation } from "../../redux/slice/designationSlice";

const DesignationForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    // department: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.designations.createStatus);
  const createError = useSelector((state) => state.designations.createError);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Designation created successfully!");
      setFormData({ name: "" }); // Reset only the fields that exist in formData
      navigate("/dashboard/setup/designation");
    }
  }, [createStatus, navigate]);

  useEffect(() => {
    if (createStatus === "failed") {
      console.error("Error occurred:", createError);
      toast.error(`Error: ${createError?.message || "An error occurred"}`);
    }
  }, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDesignation(formData));
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Designation</h4>
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
                    placeholder="Manager, CEO"
                    required
                  />
                </div>
                {/* Uncomment and update this block if you want to include the department field */}
                {/* <div className="form-group">
                  <label htmlFor="department">Department:</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Sales Manager, General Manager"
                    required
                  />
                </div> */}

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignationForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createDesignation } from "../../redux/slice/designationSlice";

// const DesignationForm = () => {
//   // State to manage form data
//   const [formData, setFormData] = useState({
//     name: "",
//     // department: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.designations.createStatus);
//   const createError = useSelector((state) => state.designations.createError);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Designation created successfully!");
//       setFormData({ name: "", designation: "" });
//       navigate("/dashboard/setup/designation");
//     }
//   }, [createStatus, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createDesignation(formData));
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Designation</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     className="form-control"
//                     onChange={handleChange}
//                     placeholder="manager,ceo"
//                     required
//                   />
//                 </div>
//                 {/* <div className="form-group">
//                   <label htmlFor="department">Department:</label>
//                   <input
//                     type="text"
//                     id="department"
//                     name="department"
//                     value={formData.department}
//                     className="form-control"
//                     onChange={handleChange}
//                     placeholder="Sales Manager , General Manager"
//                     required
//                   />
//                 </div> */}

//                 <button type="submit" className="btn btn-primary">
//                   save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignationForm;
