import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createDepartment,
  fetchDepartments,
} from "../../../../redux/slice/admin/base/departmentSlice";

const DepartmentForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector((state) => state.departments.createStatus);
  const createError = useSelector((state) => state.departments.createError);
  const departments = useSelector((state) => state.departments.list || []);

  useEffect(() => {
    dispatch(fetchDepartments()); // Ensure departments are fetched on component mount
    // console.log(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Department created successfully!");
      setFormData({ name: "" }); // Clear the form after successful creation
      navigate("/dashboard/setup/department");
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
    const existingDepartment = departments.some(
      (dept) =>
        dept.name && dept.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingDepartment) {
      toast.error("Department with this name already exists.");
      return;
    }

    dispatch(createDepartment(formData))
      .unwrap()
      .then(() => {
        setFormData({ name: "" }); // Clear the form after successful creation
      })

      .catch((error) => {
        console.error("Create Error:", error);
      });
  };

  return (
    <>

      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Department</h4>
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
                    placeholder="Enter department name"
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
    </>

  );
};

export default DepartmentForm;
//v2
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createDepartment } from "../../redux/slice/departmentSlice";

// const DepartmentForm = () => {
//   const [formData, setFormData] = useState({ name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.departments.createStatus);
//   const createError = useSelector((state) => state.departments.createError);
//   const departments = useSelector((state) => state.departments.list);

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
//     const existingDepartment = departments.some(
//       (dept) => dept.name.toLowerCase() === formData.name.toLowerCase()
//     );

//     if (existingDepartment) {
//       toast.error("Department with this name already exists.");
//       return;
//     }

//     dispatch(createDepartment(formData))
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
//   //     dispatch(createDepartment(formData));
//   //   };
//   //   const handleSubmit = (e) => {
//   //     e.preventDefault();
//   //     // if (formData.trim() === "") return; // Prevent empty name submission

//   //     dispatch(createDepartment({ formData }))
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

//   //     dispatch(createDepartment(formData))
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

// export default DepartmentForm;
