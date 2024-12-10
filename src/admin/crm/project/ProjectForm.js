import {
  createProject,
  fetchProjectById,
  updateProject,
} from "../../redux/slice/crm/projectSlice";
import { Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  // const createStatus = useSelector((state) => state.projects.createStatus);
  // const updateStatus = useSelector((state) => state.projects.updateStatus);
  const createError = useSelector((state) => state.projects.createError);
  const updateError = useSelector((state) => state.projects.updateError);
  const projectToUpdate = useSelector((state) => state.projects.currentProject);
  const projects = useSelector((state) => state.projects.list || []);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (projectToUpdate && id) {
      setFormData({
        project_name: projectToUpdate.project_name || "",
        description: projectToUpdate.description || "",
        start_date: projectToUpdate.start_date || "",
        end_date: projectToUpdate.end_date || "",
        status: projectToUpdate.status || "",
      });
    } else if (!projectToUpdate && id) {
      toast.error("Failed to load project details for update.");
    }
  }, [projectToUpdate, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that end_date is after start_date
    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      toast.error("End date must be after the start date.");
      return;
    }

    if (id) {
      // Skip the existing project name check for updates
      console.log("Form Data Before Update:", formData);
      dispatch(updateProject({ id, ...formData }))
        .unwrap()
        .then((updatedProject) => {
          console.log("Updated Project:", updatedProject);
          // Update formData to reflect the latest values if necessary
          setFormData(updatedProject); // Assuming updatedProject is the entire object
          toast.success("Project updated successfully!");
          navigate("/dashboard/crm/project");
        })
        .catch((error) => {
          toast.error(
            `Update Error: ${error.response?.data?.detail || error.message}`
          );
        });
    } else {
      // Create new project
      dispatch(createProject(formData))
        .unwrap()
        .then(() => {
          toast.success("Project created successfully!");
          setFormData({
            project_name: "",
            description: "",
            start_date: "",
            end_date: "",
            status: "",
          });
          navigate("/dashboard/crm/project");
        })
        .catch((error) => {
          toast.error(
            `Create Error: ${error.response?.data?.detail || error.message}`
          );
        });
    }
  };

  // useEffect(() => {
  //   if (updateStatus === "succeeded") {
  //     toast.success("Project updated successfully!");
  //     navigate("/dashboard/crm/project");
  //   } else if (updateStatus === "failed") {
  //     toast.error(
  //       `Update Error: ${updateError?.message || "An error occurred"}`
  //     );
  //   }
  // }, [updateStatus, updateError, navigate]);

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">
                {id ? "Update Project" : "Add Project"}
              </h4>
            </div>
            <div className="card-body">
              {(createError || updateError) && (
                <p className="text-danger">
                  {createError?.message ||
                    updateError?.message ||
                    "An error occurred"}
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
                  {id ? "Update" : "Save"}
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

// import {
//   createProject,
//   fetchProjectById,
//   updateProject,
// } from "../../redux/slice/crm/projectSlice";
// import { Form, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProjectForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: "",
//   });

//   const createStatus = useSelector((state) => state.projects.createStatus);
//   const updateStatus = useSelector((state) => state.projects.updateStatus);
//   const createError = useSelector((state) => state.projects.createError);
//   const updateError = useSelector((state) => state.projects.updateError);
//   const projectToUpdate = useSelector((state) => state.projects.currentProject);
//   const projects = useSelector((state) => state.projects.list || []);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProjectById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (projectToUpdate && id) {
//       setFormData({
//         project_name: projectToUpdate.project_name || "",
//         description: projectToUpdate.description || "",
//         start_date: projectToUpdate.start_date || "",
//         end_date: projectToUpdate.end_date || "",
//         status: projectToUpdate.status || "",
//       });
//     } else if (!projectToUpdate && id) {
//       toast.error("Failed to load project details for update.");
//     }
//   }, [projectToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const existingProject = projects.some(
//       (proj) =>
//         proj.project_name &&
//         proj.project_name.toLowerCase() ===
//           formData.project_name.toLowerCase() &&
//         proj.id !== id
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     if (id) {
//       console.log("Form Data Before Update:", formData);
//       dispatch(updateProject({ id, ...formData }))
//         .unwrap()
//         .then((updatedProject) => {
//           console.log("Updated Project:", updatedProject);
//           // Optionally update formData to reflect the latest values
//           setFormData(updatedProject); // Assuming updatedProject is the entire object
//           toast.success("Project updated successfully!");
//           navigate("/dashboard/crm/project");
//         })
//         .catch((error) => {
//           toast.error(
//             `Update Error: ${error.response?.data?.detail || error.message}`
//           );
//         });
//     } else {
//       dispatch(createProject(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Project created successfully!");
//           setFormData({
//             project_name: "",
//             description: "",
//             start_date: "",
//             end_date: "",
//             status: "",
//           });
//           navigate("/dashboard/crm/project");
//         })
//         .catch((error) => {
//           toast.error(
//             `Create Error: ${error.response?.data?.detail || error.message}`
//           );
//         });
//     }
//   };

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       navigate("/dashboard/crm/project");
//     } else if (createStatus === "failed") {
//       toast.error(
//         `Create Error: ${createError?.message || "An error occurred"}`
//       );
//     }
//   }, [createStatus, createError, navigate]);

//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       setFormData({
//         project_name: projectToUpdate.project_name,
//         description: projectToUpdate.description,
//         start_date: projectToUpdate.start_date,
//         end_date: projectToUpdate.end_date,
//         status: projectToUpdate.status,
//       });
//       toast.success("Project updated successfully!");
//       navigate("/dashboard/crm/project");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Update Error: ${updateError?.message || "An error occurred"}`
//       );
//     }
//   }, [updateStatus, updateError, projectToUpdate, navigate]);

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Project" : "Add Project"}
//               </h4>
//             </div>
//             <div className="card-body">
//               {(createError || updateError) && (
//                 <p className="text-danger">
//                   {createError?.message ||
//                     updateError?.message ||
//                     "An error occurred"}
//                 </p>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="card-body">
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Project Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="project_name"
//                           value={formData.project_name}
//                           onChange={handleChange}
//                           placeholder="Enter Project Name"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
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
//                       <Form.Group>
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="start_date"
//                           value={formData.start_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="end_date"
//                           value={formData.end_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Status</option>
//                           <option value="completed">Completed</option>
//                           <option value="pending">Pending</option>
//                           <option value="doing">Doing</option>
//                           <option value="start">Start</option>
//                           <option value="planning">Planning</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   {id ? "Update" : "Save"}
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

// import {
//   createProject,
//   updateProject,
//   fetchProjectById,
// } from "../../redux/slice/crm/projectSlice";
// import { Form, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProjectForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: "",
//   });

//   const createStatus = useSelector((state) => state.projects.createStatus);
//   const updateStatus = useSelector((state) => state.projects.updateStatus);
//   const createError = useSelector((state) => state.projects.createError);
//   const updateError = useSelector((state) => state.projects.updateError);
//   const projectToUpdate = useSelector((state) => state.projects.currentProject);
//   const projects = useSelector((state) => state.projects.list || []);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProjectById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (projectToUpdate && id) {
//       setFormData({
//         project_name: projectToUpdate.project_name || "",
//         description: projectToUpdate.description || "",
//         start_date: projectToUpdate.start_date || "",
//         end_date: projectToUpdate.end_date || "",
//         status: projectToUpdate.status || "",
//       });
//     } else if (!projectToUpdate && id) {
//       toast.error("Failed to load project details for update.");
//     }
//   }, [projectToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const existingProject = projects.some(
//       (proj) =>
//         proj.project_name &&
//         proj.project_name.toLowerCase() ===
//           formData.project_name.toLowerCase() &&
//         proj.id !== id
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     if (id) {
//       dispatch(updateProject({ id, ...formData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Project updated successfully!");
//           navigate("/dashboard/crm/project");
//         })
//         .catch((error) => {
//           toast.error(
//             `Update Error: ${error.response?.data?.detail || error.message}`
//           );
//         });
//     } else {
//       dispatch(createProject(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Project created successfully!");
//           setFormData({
//             project_name: "",
//             description: "",
//             start_date: "",
//             end_date: "",
//             status: "",
//           });
//           navigate("/dashboard/crm/project");
//         })
//         .catch((error) => {
//           toast.error(
//             `Create Error: ${error.response?.data?.detail || error.message}`
//           );
//         });
//     }
//   };

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       navigate("/dashboard/crm/project");
//     } else if (createStatus === "failed") {
//       toast.error(
//         `Create Error: ${createError?.message || "An error occurred"}`
//       );
//     }
//   }, [createStatus, createError, navigate]);

//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       setFormData({
//         project_name: projectToUpdate.project_name,
//         description: projectToUpdate.description,
//         start_date: projectToUpdate.start_date,
//         end_date: projectToUpdate.end_date,
//         status: projectToUpdate.status,
//       });
//       toast.success("Project updated successfully!");
//       navigate("/dashboard/crm/project");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Update Error: ${updateError?.message || "An error occurred"}`
//       );
//     }
//   }, [updateStatus, updateError, projectToUpdate, navigate]);

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Project" : "Add Project"}
//               </h4>
//             </div>
//             <div className="card-body">
//               {(createError || updateError) && (
//                 <p className="text-danger">
//                   {createError?.message ||
//                     updateError?.message ||
//                     "An error occurred"}
//                 </p>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="card-body">
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Project Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="project_name"
//                           value={formData.project_name}
//                           onChange={handleChange}
//                           placeholder="Enter Project Name"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
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
//                       <Form.Group>
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="start_date"
//                           value={formData.start_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="end_date"
//                           value={formData.end_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Status</option>
//                           <option value="completed">Completed</option>
//                           <option value="pending">Pending</option>
//                           <option value="doing">Doing</option>
//                           <option value="start">Start</option>
//                           <option value="planning">Planning</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   {id ? "Update" : "Save"}
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

// //##create and update =====
// import {
//   createProject,
//   updateProject, // Import update action
//   fetchProjectById, // Action to fetch project by ID for updates
// } from "../../redux/slice/crm/projectSlice";
// import { Form, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom"; // useParams to get project ID for update
// import { toast } from "react-toastify";

// const ProjectForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get project ID from URL for update
//   const [formData, setFormData] = useState({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: "",
//   });

//   const createStatus = useSelector((state) => state.projects.createStatus);
//   const updateStatus = useSelector((state) => state.projects.updateStatus);
//   const createError = useSelector((state) => state.projects.createError);
//   const updateError = useSelector((state) => state.projects.updateError);
//   const projectToUpdate = useSelector((state) => state.projects.currentProject); // Updated selector
//   const projects = useSelector((state) => state.projects.list || []);

//   // Fetch project details for updating if an ID is present
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProjectById(id)); // Fetch the project by ID
//     }
//   }, [dispatch, id]);

//   // Prefill the form with project data if updating
//   useEffect(() => {
//     if (projectToUpdate && id) {
//       setFormData({
//         project_name: projectToUpdate.project_name || "",
//         description: projectToUpdate.description || "",
//         start_date: projectToUpdate.start_date || "",
//         end_date: projectToUpdate.end_date || "",
//         status: projectToUpdate.status || "",
//       });
//     } else if (!projectToUpdate && id) {
//       console.error("Project to update is undefined:", projectToUpdate);
//       toast.error("Failed to load project details for update.");
//     }
//   }, [projectToUpdate, id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formattedStartDate = projectToUpdate.start_date
//       ? new Date(projectToUpdate.start_date).toISOString().slice(0, 16)
//       : "";
//     const formattedEndDate = projectToUpdate.end_date
//       ? new Date(projectToUpdate.end_date).toISOString().slice(0, 16)
//       : "";

//     const existingProject = projects.some(
//       (proj) =>
//         proj.project_name &&
//         proj.project_name.toLowerCase() ===
//           formData.project_name.toLowerCase() &&
//         proj.id !== id // Ensure we are not matching the project we're updating
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     if (id) {
//       // Dispatch update action if ID exists
//       dispatch(updateProject({ id, ...formData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Project updated successfully!");
//           navigate("/dashboard/crm/project");
//         })
//         .catch((error) => {
//           console.error("Update Error:", error);
//           toast.error(
//             `Update Error: ${error.response?.data?.detail || error.message}`
//           );
//         });
//     } else {
//       // Dispatch create action if no ID
//       dispatch(createProject(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Project created successfully!");
//           setFormData({
//             project_name: "",
//             description: "",
//             start_date: "",
//             end_date: "",
//             status: "",
//           });
//           navigate("/dashboard/crm/project");
//         })
//         .catch((error) => {
//           console.error("Create Error:", error);
//           toast.error(
//             `Create Error: ${error.response?.data?.detail || error.message}`
//           );
//         });
//     }
//   };

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       navigate("/dashboard/crm/project");
//     } else if (createStatus === "failed") {
//       toast.error(
//         `Create Error: ${createError?.message || "An error occurred"}`
//       );
//     }
//   }, [createStatus, createError, navigate]);

//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("Project updated successfully!");
//       navigate("/dashboard/crm/project");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Update Error: ${updateError?.message || "An error occurred"}`
//       );
//     }
//   }, [updateStatus, updateError, navigate]);

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">
//                 {id ? "Update Project" : "Add Project"}
//               </h4>
//             </div>
//             <div className="card-body">
//               {(createError || updateError) && (
//                 <p className="text-danger">
//                   {createError?.message ||
//                     updateError?.message ||
//                     "An error occurred"}
//                 </p>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="card-body">
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Project Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="project_name"
//                           value={formData.project_name}
//                           onChange={handleChange}
//                           placeholder="Enter Project Name"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
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
//                       <Form.Group>
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="start_date"
//                           value={formData.start_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="end_date"
//                           value={formData.end_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Status</option>
//                           <option value="completed">Completed</option>
//                           <option value="pending">Pending</option>
//                           <option value="doing">Doing</option>
//                           <option value="start">Start</option>
//                           <option value="planning">Planning</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   {id ? "Update" : "Save"}
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

// ######### create and update end =============

// create project file

//import {
//   createProject,
//   // fetchProject,
// } from "../../redux/slice/crm/projectSlice";
// import { Form, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProjectForm = () => {
//   const [formData, setFormData] = useState({
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

//   // useEffect(() => {
//   //   dispatch(fetchProject());
//   // }, [dispatch]);

//   // useEffect(() => {
//   //   if (createStatus === "succeeded") {
//   //     toast.success("Project created successfully!");
//   //     setFormData({
//   //       project_name: "",
//   //       description: "",
//   //       start_date: "",
//   //       end_date: "",
//   //       status: "",
//   //     });
//   //     navigate("/dashboard/crm/project");
//   //   } else if (createStatus === "failed") {
//   //     toast.error(`Error: ${createError?.message || "An error occurred"}`);
//   //   }
//   // }, [createStatus, createError, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.project_name.trim()) return;

//     const startDate = new Date(formData.start_date);
//     const endDate = new Date(formData.end_date);

//     // Validate that start date is before end date
//     if (startDate >= endDate) {
//       toast.error("End date must be after start date.");
//       return;
//     }

//     console.log("Submitting form data:", formData);

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
//         // Show success toast and reset form
//         toast.success("Project created successfully!");
//         setFormData({
//           project_name: "",
//           description: "",
//           start_date: "",
//           end_date: "",
//           status: "",
//         });
//         navigate("/dashboard/crm/project");
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//         toast.error(
//           `Create Error: ${error.response?.data?.detail || error.message}`
//         );
//       });
//   };

//   //   e.preventDefault();
//   //   if (!formData.project_name.trim()) return;

//   //   console.log("Submitting form data:", formData); // Add this line

//   //   const existingProject = projects.some(
//   //     (proj) =>
//   //       proj.project_name &&
//   //       proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
//   //   );

//   //   if (existingProject) {
//   //     toast.error("Project with this name already exists.");
//   //     return;
//   //   }

//   //   dispatch(createProject(formData))
//   //     .unwrap()
//   //     .catch((error) => {
//   //       console.error("Create Error:", error);
//   //     });
//   // };

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       setFormData({
//         project_name: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         status: "",
//       });
//       navigate("/dashboard/crm/project");
//     } else if (createStatus === "failed") {
//       toast.error(`Error: ${createError?.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError, navigate]);

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Project</h4>
//             </div>
//             <div className="card-body">
//               {createError && (
//                 <p className="text-danger">
//                   {createError?.message || "An error occurred"}
//                 </p>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="card-body">
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Project Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="project_name"
//                           value={formData.project_name}
//                           onChange={handleChange}
//                           placeholder="Enter Project Name"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
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
//                       <Form.Group>
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="start_date"
//                           value={formData.start_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="datetime-local"
//                           name="end_date"
//                           value={formData.end_date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group>
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Status</option>
//                           <option value="completed">Completed</option>
//                           <option value="pending">Pending</option>
//                           <option value="doing">Doing</option>
//                           <option value="start">Start</option>
//                           <option value="planning">Planning</option>
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

// //v3
// // import {
// //   createProject,
// //   fetchProject,
// // } from "../../redux/slice/crm/projectSlice";
// // import { Form, Button, Row, Col } from "react-bootstrap";
// // import { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // const ProjectForm = () => {
// //   const [formData, setFormData] = useState({
// //     // client_id: "",
// //     project_name: "",
// //     description: "",
// //     start_date: "",
// //     end_date: "",
// //     status: "",
// //   });
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const createStatus = useSelector((state) => state.projects.createStatus);
// //   const createError = useSelector((state) => state.projects.createError);
// //   const projects = useSelector((state) => state.projects.list || []);

// //   useEffect(() => {
// //     dispatch(fetchProject()); // Ensure projects are fetched on component mount
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (createStatus === "succeeded") {
// //       toast.success("Project created successfully!");
// //       setFormData({
// //         // client_id: "",
// //         project_name: "",
// //         description: "",
// //         start_date: "",
// //         end_date: "",
// //         status: "",
// //       }); // Clear the form after successful creation
// //       navigate("/dashboard/crm/project");
// //     }
// //   }, [createStatus, navigate]);

// //   useEffect(() => {
// //     if (createStatus === "failed") {
// //       toast.error(`Error: ${createError?.message || "An error occurred"}`);
// //     }
// //   }, [createStatus, createError]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (formData.project_name.trim() === "") return; // Prevent empty name submission

// //     // Check if Project name already exists
// //     const existingProject = projects.some(
// //       (proj) =>
// //         proj.project_name &&
// //         proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
// //     );

// //     if (existingProject) {
// //       toast.error("Project with this name already exists.");
// //       return;
// //     }

// //     dispatch(createProject(formData))
// //       .unwrap()
// //       .then(() => {
// //         setFormData({
// //           // client_id: "",
// //           project_name: "",
// //           description: "",
// //           start_date: "",
// //           end_date: "",
// //           status: "",
// //         }); // Clear the form after successful creation
// //       })
// //       .catch((error) => {
// //         console.error("Create Error:", error);
// //       });
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <div className="container">
// //         <div className="container-fluid">
// //           <div className="card">
// //             <div className="card-header">
// //               <h4 className="btn btn-primary">Add Project</h4>
// //             </div>
// //             <div className="card-body">
// //               {/* Updated error message rendering */}
// //               {createError && (
// //                 <p className="text-danger">
// //                   {createError?.message || "An error occurred"}
// //                 </p>
// //               )}
// //               <form onSubmit={handleSubmit}>
// //                 <div className="card-body">
// //                   <Row>
// //                     {/* <Col md={4}>
// //                       <Form.Group id="formClientId">
// //                         <Form.Label>Client ID</Form.Label>
// //                         <Form.Control
// //                           type="text"
// //                           id="client_id"
// //                           name="client_id"
// //                           value={formData.client_id}
// //                           onChange={handleChange}
// //                           placeholder="Enter Client ID"
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col> */}
// //                     <Col md={4}>
// //                       <Form.Group id="formProjectName">
// //                         <Form.Label>Project Name</Form.Label>
// //                         <Form.Control
// //                           type="text"
// //                           id="project_name"
// //                           name="project_name"
// //                           value={formData.project_name}
// //                           onChange={handleChange}
// //                           placeholder="Enter Project Name"
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formDescription">
// //                         <Form.Label>Description</Form.Label>
// //                         <Form.Control
// //                           as="textarea"
// //                           id="description"
// //                           name="description"
// //                           value={formData.description}
// //                           onChange={handleChange}
// //                           placeholder="Enter Description"
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                   </Row>
// //                   <Row>
// //                     <Col md={4}>
// //                       <Form.Group id="formStartDate">
// //                         <Form.Label>Start Date</Form.Label>
// //                         <Form.Control
// //                           type="datetime-local"
// //                           id="start_date"
// //                           name="start_date"
// //                           value={formData.start_date}
// //                           onChange={handleChange}
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formEndDate">
// //                         <Form.Label>End Date</Form.Label>
// //                         <Form.Control
// //                           type="datetime-local"
// //                           id="end_date"
// //                           name="end_date"
// //                           value={formData.end_date}
// //                           onChange={handleChange}
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formStatus">
// //                         <Form.Label>Status</Form.Label>
// //                         <Form.Control
// //                           as="select"
// //                           id="status"
// //                           name="status"
// //                           value={formData.status}
// //                           onChange={handleChange}
// //                           required
// //                         >
// //                           <option value="">Select Status</option>
// //                           <option value="0">Completed</option>
// //                           <option value="1">Pending</option>
// //                           <option value="2">Doing</option>
// //                           <option value="3">Start</option>
// //                           <option value="4">Planning</option>
// //                         </Form.Control>
// //                       </Form.Group>
// //                     </Col>
// //                   </Row>
// //                 </div>
// //                 <button type="submit" className="btn btn-primary">
// //                   Save
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectForm;

// //v2
// // import { createProject, fetchProject } from "../../redux/slice/projectSlice";
// // import { Form, Button, Row, Col } from "react-bootstrap";
// // import { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // const ProjectForm = () => {
// //   const [formData, setFormData] = useState({
// //     client_id: "",
// //     project_name: "",
// //     description: "",
// //     start_date: "",
// //     end_date: "",
// //     status: "",
// //   });
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const createStatus = useSelector((state) => state.projects.createStatus);
// //   const createError = useSelector((state) => state.projects.createError);
// //   const projects = useSelector((state) => state.projects.list || []);

// //   useEffect(() => {
// //     dispatch(fetchProject()); // Ensure projects are fetched on component mount
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (createStatus === "succeeded") {
// //       toast.success("Project created successfully!");
// //       setFormData({
// //         client_id: "",
// //         project_name: "",
// //         description: "",
// //         start_date: "",
// //         end_date: "",
// //         status: "",
// //       }); // Clear the form after successful creation
// //       navigate("/dashboard/crm/project");
// //     }
// //   }, [createStatus, navigate]);

// //   useEffect(() => {
// //     if (createStatus === "failed") {
// //       toast.error(`Error: ${createError.message || "An error occurred"}`);
// //     }
// //   }, [createStatus, createError]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (formData.project_name.trim() === "") return; // Prevent empty name submission

// //     // Check if Project name already exists
// //     const existingProject = projects.some(
// //       (proj) =>
// //         proj.project_name &&
// //         proj.project_name.toLowerCase() === formData.project_name.toLowerCase()
// //     );

// //     if (existingProject) {
// //       toast.error("Project with this name already exists.");
// //       return;
// //     }

// //     dispatch(createProject(formData))
// //       .unwrap()
// //       .then(() => {
// //         setFormData({ project_name: "" }); // Clear the form after successful creation
// //       })
// //       .catch((error) => {
// //         console.error("Create Error:", error);
// //       });
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <div className="container">
// //         <div className="container-fluid">
// //           <div className="card">
// //             <div className="card-header">
// //               <h4 className="btn btn-primary">Add Project</h4>
// //             </div>
// //             <div className="card-body">
// //               {/* Updated error message rendering */}
// //               {createError && (
// //                 <p className="text-danger">
// //                   {createError.message || createError}
// //                 </p>
// //               )}
// //               <form onSubmit={handleSubmit}>
// //                 {/* <div className="form-group">
// //                   <label htmlFor="name">Project Name:</label>
// //                   <input
// //                     type="text"
// //                     id="project_name"
// //                     name="project_name"
// //                     value={formData.project_name}
// //                     className="form-control"
// //                     placeholder="Enter project name"
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </div> */}
// //                 <div className="card-body">
// //                   <Row>
// //                     <Col md={4}>
// //                       <Form.Group id="formClientId">
// //                         <Form.Label>Client ID</Form.Label>
// //                         <Form.Control
// //                           type="text"
// //                           id="client_id"
// //                           name="client_id"
// //                           value={formData.client_id}
// //                           onChange={handleChange}
// //                           placeholder="Enter Client ID"
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formProjectName">
// //                         <Form.Label>Project Name</Form.Label>
// //                         <Form.Control
// //                           type="text"
// //                           id="project_name"
// //                           name="project_name"
// //                           value={formData.project_name}
// //                           onChange={handleChange}
// //                           placeholder="Enter Project Name"
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formDescription">
// //                         <Form.Label>Description</Form.Label>
// //                         <Form.Control
// //                           as="textarea"
// //                           id="description"
// //                           name="description"
// //                           value={formData.description}
// //                           onChange={handleChange}
// //                           placeholder="Enter Description"
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                   </Row>
// //                   <Row>
// //                     <Col md={4}>
// //                       <Form.Group id="formStartDate">
// //                         <Form.Label>Start Date</Form.Label>
// //                         <Form.Control
// //                           type="datetime-local"
// //                           id="start_date"
// //                           name="start_date"
// //                           value={formData.start_date}
// //                           onChange={handleChange}
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formEndDate">
// //                         <Form.Label>End Date</Form.Label>
// //                         <Form.Control
// //                           type="datetime-local"
// //                           id="end_date"
// //                           name="end_date"
// //                           value={formData.end_date}
// //                           onChange={handleChange}
// //                           required
// //                         />
// //                       </Form.Group>
// //                     </Col>
// //                     <Col md={4}>
// //                       <Form.Group id="formStatus">
// //                         <Form.Label>Status</Form.Label>
// //                         <Form.Control
// //                           as="select"
// //                           id="status"
// //                           name="status"
// //                           value={formData.status}
// //                           onChange={handleChange}
// //                           required
// //                         >
// //                           <option value="">Select Status</option>
// //                           <option value="0">Completed</option>
// //                           <option value="1">Pending</option>
// //                           <option value="2">Doing</option>
// //                           <option value="3">Start</option>
// //                           <option value="4">Planning</option>
// //                         </Form.Control>
// //                       </Form.Group>
// //                     </Col>
// //                   </Row>
// //                 </div>
// //                 <button type="submit" className="btn btn-primary">
// //                   Save
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectForm;

// //v1
// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { createProject, fetchProject } from "../../redux/slice/projectSlice";

// // const ProjectForm = () => {
// //   const [formData, setFormData] = useState({ project_name: "" });
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const createStatus = useSelector((state) => state.projects.createStatus);
// //   const createError = useSelector((state) => state.projects.createError);
// //   const projects = useSelector((state) => state.projects.list || []);

// //   useEffect(() => {
// //     dispatch(fetchProject()); // Ensure departments are fetched on component mount
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (createStatus === "succeeded") {
// //       toast.success("Project created successfully!");
// //       setFormData({ project_name: "" }); // Clear the form after successful creation
// //       navigate("/dashboard/crm/project");
// //     }
// //   }, [createStatus, navigate]);

// //   useEffect(() => {
// //     if (createStatus === "failed") {
// //       toast.error(`Error: ${createError.message || "An error occurred"}`);
// //     }
// //   }, [createStatus, createError]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (formData.project_name.trim() === "") return; // Prevent empty name submission

// //     // Check if Project name already exists
// //     const existingProject = projects.some(
// //       (dept) =>
// //         dept.project_name &&
// //         dept.project_name.toLowerCase() === formData.project_name.toLowerCase()
// //     );

// //     if (existingProject) {
// //       toast.error("Project with this name already exists.");
// //       return;
// //     }

// //     dispatch(createProject(formData))
// //       .unwrap()
// //       .then(() => {
// //         setFormData({ project_name: "" }); // Clear the form after successful creation
// //       })
// //       .catch((error) => {
// //         console.error("Create Error:", error);
// //       });
// //   };

// //   return (
// //     <div className="content-wrapper">
// //       <div className="container">
// //         <div className="container-fluid">
// //           <div className="card">
// //             <div className="card-header">
// //               <h4 className="btn btn-primary">Add Department</h4>
// //             </div>
// //             <div className="card-body">
// //               {createError && <p className="text-danger">{createError}</p>}
// //               <form onSubmit={handleSubmit}>
// //                 <div className="form-group">
// //                   <label htmlFor="name">Project Name:</label>
// //                   <input
// //                     type="text"
// //                     id="project_name"
// //                     name="project_name"
// //                     value={formData.project_name}
// //                     className="form-control"
// //                     placeholder="Enter project name"
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </div>
// //                 <button type="submit" className="btn btn-primary">
// //                   Save
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectForm;
