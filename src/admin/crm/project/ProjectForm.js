import {
  createProject,
  fetchProject,
} from "../../redux/slice/crm/projectSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createStatus = useSelector((state) => state.projects.createStatus);
  const createError = useSelector((state) => state.projects.createError);
  const projects = useSelector((state) => state.projects.list || []);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Project created successfully!");
      setFormData({
        project_name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "",
      });
      navigate("/dashboard/crm/project");
    } else if (createStatus === "failed") {
      toast.error(`Error: ${createError?.message || "An error occurred"}`);
    }
  }, [createStatus, createError, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.project_name.trim()) return;

    console.log("Submitting form data:", formData); // Add this line

    const existingProject = projects.some(
      (proj) =>
        proj.project_name &&
        proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
    );

    if (existingProject) {
      toast.error("Project with this name already exists.");
      return;
    }

    dispatch(createProject(formData))
      .unwrap()
      .catch((error) => {
        console.error("Create Error:", error);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Prevent empty name submission
  //   if (!formData.project_name.trim()) return;

  //   // Check if the project already exists (ensure correct comparison)
  //   const existingProject = projects.some(
  //     (proj) =>
  //       proj.project_name &&
  //       proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
  //   );

  //   if (existingProject) {
  //     toast.error("Project with this name already exists.");
  //     return;
  //   }

  //   dispatch(createProject(formData))
  //     .unwrap()
  //     .catch((error) => {
  //       console.error("Create Error:", error);
  //     });
  // };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Project</h4>
            </div>
            <div className="card-body">
              {createError && (
                <p className="text-danger">
                  {createError?.message || "An error occurred"}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="project_name"
                          value={formData.project_name}
                          onChange={handleChange}
                          placeholder="Enter Project Name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Enter Description"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as="select"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="doing">Doing</option>
                          <option value="start">Start</option>
                          <option value="planning">Planning</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
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

export default ProjectForm;

//v3
// import {
//   createProject,
//   fetchProject,
// } from "../../redux/slice/crm/projectSlice";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProjectForm = () => {
//   const [formData, setFormData] = useState({
//     // client_id: "",
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: "",
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const createStatus = useSelector((state) => state.projects.createStatus);
//   const createError = useSelector((state) => state.projects.createError);
//   const projects = useSelector((state) => state.projects.list || []);

//   useEffect(() => {
//     dispatch(fetchProject()); // Ensure projects are fetched on component mount
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       setFormData({
//         // client_id: "",
//         project_name: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         status: "",
//       }); // Clear the form after successful creation
//       navigate("/dashboard/crm/project");
//     }
//   }, [createStatus, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError?.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.project_name.trim() === "") return; // Prevent empty name submission

//     // Check if Project name already exists
//     const existingProject = projects.some(
//       (proj) =>
//         proj.project_name &&
//         proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           // client_id: "",
//           project_name: "",
//           description: "",
//           start_date: "",
//           end_date: "",
//           status: "",
//         }); // Clear the form after successful creation
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Project</h4>
//             </div>
//             <div className="card-body">
//               {/* Updated error message rendering */}
//               {createError && (
//                 <p className="text-danger">
//                   {createError?.message || "An error occurred"}
//                 </p>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="card-body">
//                   <Row>
//                     {/* <Col md={4}>
//                       <Form.Group id="formClientId">
//                         <Form.Label>Client ID</Form.Label>
//                         <Form.Control
//                           type="text"
//                           id="client_id"
//                           name="client_id"
//                           value={formData.client_id}
//                           onChange={handleChange}
//                           placeholder="Enter Client ID"
//                           required
//                         />
//                       </Form.Group>
//                     </Col> */}
//                     <Col md={4}>
//                       <Form.Group id="formProjectName">
//                         <Form.Label>Project Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           id="project_name"
//                           name="project_name"
//                           value={formData.project_name}
//                           onChange={handleChange}
//                           placeholder="Enter Project Name"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formDescription">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           id="description"
//                           name="description"
//                           value={formData.description}
//                           onChange={handleChange}
//                           placeholder="Enter Description"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group id="formStartDate">
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           id="start_date"
//                           name="start_date"
//                           value={formData.start_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formEndDate">
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           id="end_date"
//                           name="end_date"
//                           value={formData.end_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formStatus">
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           id="status"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Status</option>
//                           <option value="0">Completed</option>
//                           <option value="1">Pending</option>
//                           <option value="2">Doing</option>
//                           <option value="3">Start</option>
//                           <option value="4">Planning</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
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

// export default ProjectForm;

//v2
// import { createProject, fetchProject } from "../../redux/slice/projectSlice";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const ProjectForm = () => {
//   const [formData, setFormData] = useState({
//     client_id: "",
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: "",
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.projects.createStatus);
//   const createError = useSelector((state) => state.projects.createError);
//   const projects = useSelector((state) => state.projects.list || []);

//   useEffect(() => {
//     dispatch(fetchProject()); // Ensure projects are fetched on component mount
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       setFormData({
//         client_id: "",
//         project_name: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         status: "",
//       }); // Clear the form after successful creation
//       navigate("/dashboard/crm/project");
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
//     if (formData.project_name.trim() === "") return; // Prevent empty name submission

//     // Check if Project name already exists
//     const existingProject = projects.some(
//       (proj) =>
//         proj.project_name &&
//         proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({ project_name: "" }); // Clear the form after successful creation
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Project</h4>
//             </div>
//             <div className="card-body">
//               {/* Updated error message rendering */}
//               {createError && (
//                 <p className="text-danger">
//                   {createError.message || createError}
//                 </p>
//               )}
//               <form onSubmit={handleSubmit}>
//                 {/* <div className="form-group">
//                   <label htmlFor="name">Project Name:</label>
//                   <input
//                     type="text"
//                     id="project_name"
//                     name="project_name"
//                     value={formData.project_name}
//                     className="form-control"
//                     placeholder="Enter project name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div> */}
//                 <div className="card-body">
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group id="formClientId">
//                         <Form.Label>Client ID</Form.Label>
//                         <Form.Control
//                           type="text"
//                           id="client_id"
//                           name="client_id"
//                           value={formData.client_id}
//                           onChange={handleChange}
//                           placeholder="Enter Client ID"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formProjectName">
//                         <Form.Label>Project Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           id="project_name"
//                           name="project_name"
//                           value={formData.project_name}
//                           onChange={handleChange}
//                           placeholder="Enter Project Name"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formDescription">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           id="description"
//                           name="description"
//                           value={formData.description}
//                           onChange={handleChange}
//                           placeholder="Enter Description"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group id="formStartDate">
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           id="start_date"
//                           name="start_date"
//                           value={formData.start_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formEndDate">
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           id="end_date"
//                           name="end_date"
//                           value={formData.end_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group id="formStatus">
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           id="status"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Status</option>
//                           <option value="0">Completed</option>
//                           <option value="1">Pending</option>
//                           <option value="2">Doing</option>
//                           <option value="3">Start</option>
//                           <option value="4">Planning</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
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

// export default ProjectForm;

//v1
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createProject, fetchProject } from "../../redux/slice/projectSlice";

// const ProjectForm = () => {
//   const [formData, setFormData] = useState({ project_name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const createStatus = useSelector((state) => state.projects.createStatus);
//   const createError = useSelector((state) => state.projects.createError);
//   const projects = useSelector((state) => state.projects.list || []);

//   useEffect(() => {
//     dispatch(fetchProject()); // Ensure departments are fetched on component mount
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       setFormData({ project_name: "" }); // Clear the form after successful creation
//       navigate("/dashboard/crm/project");
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
//     if (formData.project_name.trim() === "") return; // Prevent empty name submission

//     // Check if Project name already exists
//     const existingProject = projects.some(
//       (dept) =>
//         dept.project_name &&
//         dept.project_name.toLowerCase() === formData.project_name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({ project_name: "" }); // Clear the form after successful creation
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Department</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Project Name:</label>
//                   <input
//                     type="text"
//                     id="project_name"
//                     name="project_name"
//                     value={formData.project_name}
//                     className="form-control"
//                     placeholder="Enter project name"
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

// export default ProjectForm;
