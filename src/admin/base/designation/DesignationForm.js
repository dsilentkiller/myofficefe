import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createDesignation,
  fetchDesignation,
} from "../../redux/slice/designationSlice";

const DesignationForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.designations.createStatus);
  const createError = useSelector((state) => state.designations.createError);
  const designations = useSelector((state) => state.designations.list || []);

  useEffect(() => {
    dispatch(fetchDesignation()); // Ensure designations are fetched on component mount
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Designation created successfully!");
      setFormData({ name: "" }); // Clear the form after successful creation
      navigate("/dashboard/setup/designation");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") return; // Prevent empty name submission

    // Check if department name already exists
    const existingDesignation = designations.some(
      (dept) =>
        dept.name && dept.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingDesignation) {
      toast.error("Department with this name already exists.");
      return;
    }

    dispatch(createDesignation(formData))
      .unwrap()
      .then(() => {
        setFormData({ name: "" }); // Clear the form after successful creation
      })
      .catch((error) => {
        console.error("Create Error:", error);
      });
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
                    placeholder="Enter designation name"
                    onChange={handleChange}
                    required
                  />
                </div>
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

//v2
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createDesignation } from "../../redux/slice/departmentSlice";

// const DesignationForm = () => {
//   const [formData, setFormData] = useState({ name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.designations.createStatus);
//   const createError = useSelector((state) => state.designations.createError);
//   const departments = useSelector((state) => state.designations.list);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("department created successfully!");
//       setFormData({ name: "" });
//       navigate("/dashboard/setup/department");
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
//     if (formData.name.trim() === "") return; // Prevent empty name submission

//     // Check if department name already exists
//     const existingDesignation = designations.some(
//       (dept) => dept.name.toLowerCase() === formData.name.toLowerCase()
//     );

//     if (existingDesignation) {
//       toast.error("Department with this name already exists.");
//       return;
//     }

//     dispatch(createDesignation(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({ name: "" }); // Clear the form after successful creation
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//       });
//   };

//   //   const handleSubmit = (e) => {
//   //     e.preventDefault();
//   //     if (formData.trim() === "") return; // Prevent empty name submission
//   //     dispatch(createDesignation(formData));
//   //   };
//   //   const handleSubmit = (e) => {
//   //     e.preventDefault();
//   //     // if (formData.trim() === "") return; // Prevent empty name submission

//   //     dispatch(createDesignation({ formData }))
//   //       .unwrap()
//   //       .then(() => {
//   //         setFormData(""); // Clear the form after successful creation
//   //       })
//   //       .catch((error) => {
//   //         console.error("Create Error:", error);
//   //       });
//   //   };
//   //update department form
//   //   const handleSubmit = (e) => {
//   //     e.preventDefault();
//   //     if (formData.name.trim() === "") return; // Prevent empty name submission

//   //     dispatch(createDesignation(formData))
//   //       .unwrap()
//   //       .then(() => {
//   //         setFormData({ name: "" }); // Clear the form after successful creation
//   //       })
//   //       .catch((error) => {
//   //         console.error("Create Error:", error);
//   //         toast.error(
//   //           `Failed to create department: ${error.message || "Unknown error"}`
//   //         );
//   //       });
//   //   };
//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add department</h4>
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
//                     placeholder="Enter department name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Save
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
