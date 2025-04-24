import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject, fetchProject } from "../../redux/slice/projectSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    client_id: "",
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
    dispatch(fetchProject()); // Fetch projects on component mount
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Project created successfully!");
      setFormData({
        client_id: "",
        project_name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "",
      }); // Reset form after successful creation
      navigate("/dashboard/crm/project");
    } else if (createStatus === "failed") {
      toast.error(`Error: ${createError?.message || "An error occurred"}`);
    }
  }, [createStatus, createError, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingProject = projects.some(
      (project) =>
        project.project_name?.toLowerCase() ===
        formData.project_name.toLowerCase()
    );

    if (existingProject) {
      toast.error("Project with this name already exists.");
      return;
    }

    dispatch(createProject(formData))
      .unwrap()
      .then(() => {
        dispatch(fetchProject()); // Fetch updated projects list after creation
      })
      .catch((error) => {
        toast.error(
          `Create Error: ${error?.message || "An unknown error occurred"}`
        );
      });
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Project</h4>
            </div>
            <div className="card-body">
              {createError && <p className="text-danger">{createError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="formClientId">
                        <Form.Label>Client ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="client_id"
                          value={formData.client_id}
                          onChange={handleChange}
                          placeholder="Enter Client ID"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formProjectName">
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
                      <Form.Group controlId="formDescription">
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
                      <Form.Group controlId="formStartDate">
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
                      <Form.Group controlId="formEndDate">
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
                      <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as="select"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="0">Completed</option>
                          <option value="1">Pending</option>
                          <option value="2">Doing</option>
                          <option value="3">Start</option>
                          <option value="4">Planning</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button type="submit" className="btn btn-primary">
                  Save
                </Button>
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

// import React, { useState, useEffect } from "react";

// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { createProject, fetchProject } from "../../redux/slice/projectSlice";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createProject, fetchProject } from "../../redux/slice/projectSlice";
// import { Form, Button, Row, Col } from "react-bootstrap";
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
//     dispatch(fetchProject()); // Ensure departments are fetched on component mount
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
//       });
//       navigate("/dashboard/crm/project");
//     } else if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   // const handleChange = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });
//   // };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value ? value.trim() : "", // Ensure value is trimmed if defined
//     }));
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // if (formData.name.trim() === "") return; // Prevent empty name submission

//   //   // Check if project name already exists
//   //   const existingProject = projects.some(
//   //     (dept) =>
//   //       dept.name &&
//   //       dept.name.toLowerCase() === formData.project_name.toLowerCase()
//   //   );

//   //   if (existingProject) {
//   //     toast.error("project with this name already exists.");
//   //     return;
//   //   }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           client_id: "",
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
//       navigate("/dashboard/crm/project/");
//     }
//   }, [createStatus, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if project name already exists
//     const existingProject = projects.some(
//       (project) =>
//         project.project_name?.toLowerCase() ===
//         formData.project_name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         // Fetch the updated project list
//         dispatch(fetchProject());

//         // Reset form data and navigate
//         setFormData({
//           client_id: "",
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
//           `Create Error: ${error.message || "An unknown error occurred"}`
//         );
//       });

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Project </h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 {/* <div className="form-group">
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     className="form-control"
//                     placeholder="Enter project name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div> */}
//                 <div className="card-body">
//                   <Row>
//                     <Col md={4}>
//                       <Form.Group controlId="formClientId">
//                         <Form.Label>Client ID</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="client_id"
//                           value={formData.client_id}
//                           onChange={handleChange}
//                           placeholder="Enter Client ID"
//                           required
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group controlId="formProjectName">
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
//                       <Form.Group controlId="formDescription">
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
//                       <Form.Group controlId="formStartDate">
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
//                       <Form.Group controlId="formEndDate">
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
//                       <Form.Group controlId="formStatus">
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                           as="select"
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

//project final
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createProject, fetchProject } from "../../redux/slice/projectSlice";
// import { Form, Button, Row, Col } from "react-bootstrap";

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
//     dispatch(fetchProject()); // Fetch projects on component mount
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
//     // Validation for required fields
//     const {
//       client_id,
//       project_name,
//       description,
//       start_date,
//       end_date,
//       status,
//     } = formData;

//     if (
//       !client_id ||
//       !project_name ||
//       !description ||
//       !start_date ||
//       !end_date ||
//       status === ""
//     ) {
//       toast.error("All fields are required.");
//       return;
//     }

//     // Check if project name already exists
//     const existingProject = projects.some(
//       (project) =>
//         project.project_name &&
//         project.project_name.toLowerCase() === project_name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     //   dispatch(createProject(formData))
//     //     .unwrap()
//     //     .then(() => {
//     //       toast.success("Project created successfully!");
//     //       setFormData({
//     //         client_id: "",
//     //         project_name: "",
//     //         description: "",
//     //         start_date: "",
//     //         end_date: "",
//     //         status: "",
//     //       }); // Clear the form after successful creation
//     //       navigate("/dashboard/crm/project");
//     //     })

//     //     .catch((error) => {
//     //       console.error("Create Error:", error);
//     //     });
//     // };
//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         toast.success("Project created successfully!");
//         setFormData({
//           client_id: "",
//           project_name: "",
//           description: "",
//           start_date: "",
//           end_date: "",
//           status: "",
//         }); // Clear form
//         navigate("/dashboard/crm/project");
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//         toast.error(
//           `Create Error: ${error.message || "An unknown error occurred"}`
//         );
//       });

//   };
//   return (
//     <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
//       <div className="card card-primary">
//         <div className="card-header">
//           <h3 className="card-title">Project Form</h3>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="card-body">
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="formClientId">
//                   <Form.Label>Client ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="client_id"
//                     value={formData.client_id}
//                     onChange={handleChange}
//                     placeholder="Enter Client ID"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formProjectName">
//                   <Form.Label>Project Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="project_name"
//                     value={formData.project_name}
//                     onChange={handleChange}
//                     placeholder="Enter Project Name"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formDescription">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Enter Description"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="formStartDate">
//                   <Form.Label>Start Date</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formEndDate">
//                   <Form.Label>End Date</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     name="end_date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formStatus">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Status</option>
//                     <option value="0">Completed</option>
//                     <option value="1">Pending</option>
//                     <option value="2">Doing</option>
//                     <option value="3">Start</option>
//                     <option value="4">Planning</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </div>
//           <div className="card-footer">
//             <Button type="submit" variant="primary">
//               Submit
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

//3
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createProject, fetchProject } from "../../redux/slice/projectSlice";
// import { Form, Button, Row, Col } from "react-bootstrap";

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
//     dispatch(fetchProject()); // Fetch projects on component mount
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
//     // Validation for required fields
//     const {
//       client_id,
//       project_name,
//       description,
//       start_date,
//       end_date,
//       status,
//     } = formData;

//     if (
//       !client_id ||
//       !project_name ||
//       !description ||
//       !start_date ||
//       !end_date ||
//       status === ""
//     ) {
//       toast.error("All fields are required.");
//       return;
//     }

//     // Check if project name already exists
//     const existingProject = projects.some(
//       (project) =>
//         project.project_name &&
//         project.project_name.toLowerCase() === project_name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("Project with this name already exists.");
//       return;
//     }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           client_id: "",
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
//     <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
//       <div className="card card-primary">
//         <div className="card-header">
//           <h3 className="card-title">Project Form</h3>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="card-body">
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="formClientId">
//                   <Form.Label>Client ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="client_id"
//                     id="client_id"
//                     value={formData.client_id}
//                     onChange={handleChange}
//                     placeholder="Enter Client ID"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formProjectName">
//                   <Form.Label>Project Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="project_name"
//                     name="project_name"
//                     value={formData.project_name}
//                     onChange={handleChange}
//                     placeholder="Enter Project Name"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formDescription">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Enter Description"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="formStartDate">
//                   <Form.Label>Start Date</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     id="start_date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formEndDate">
//                   <Form.Label>End Date</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     name="end_date"
//                     id="end_date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formStatus">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="status"
//                     id="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Status</option>
//                     <option value="0">Completed</option>
//                     <option value="1">Pending</option>
//                     <option value="2">Doing</option>
//                     <option value="3">Start</option>
//                     <option value="4">Planning</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </div>
//           <div className="card-footer">
//             <Button type="submit" variant="primary">
//               Submit
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

//2
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createProject, fetchProject } from "../../redux/slice/projectSlice";

// import { Form, Button, Row, Col } from "react-bootstrap";
// const ProjectForm = ({ onSubmit }) => {
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
//     dispatch(fetchProject()); // Ensure departments are fetched on component mount
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Project created successfully!");
//       setFormData({ name: "" }); // Clear the form after successful creation
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
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Validation for required fields
//   //   const { client_id, project_name, description, start_date, end_date, status } = formData;

//   //   if (!client_id || !project_name || !description || !start_date || !end_date || status === "") {
//   //     toast.error("All fields are required.");
//   //     return;
//   //   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validation for required fields
//     const { client_id, project_name, description, start_date, end_date, status } = formData;

//     if (!client_id || !project_name || !description || !start_date || !end_date || status === "") {
//       toast.error("All fields are required.");
//     if (formData.name.trim() === "") return; // Prevent empty name submission

//     // Check if project name already exists
//     const existingProject = projects.some(
//       (project) =>
//         project.name && project.name.toLowerCase() === formData.name.toLowerCase()
//     );

//     if (existingProject) {
//       toast.error("project with this name already exists.");
//       return;
//     }

//     dispatch(createProject(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({ name: "" }); // Clear the form after successful creation
//       })
//       .catch((error) => {
//         console.error("Create Error:", error);
//       });
//   };
//   return (
//     <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
//       <div className="card card-primary">
//         <div className="card-header">
//           <h3 className="card-title">Project Form</h3>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="card-body">
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="formClientId">
//                   <Form.Label>Client ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="client_id"
//                     id="client_id"
//                     value={formData.client_id}
//                     onChange={handleChange}
//                     placeholder="Enter Client ID"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formProjectName">
//                   <Form.Label>Project Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="project_name"
//                     name="project_name"
//                     value={formData.project_name}
//                     onChange={handleChange}
//                     placeholder="Enter Project Name"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formDescription">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Enter Description"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="formStartDate">
//                   <Form.Label>Start Date</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     id="start_date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formEndDate">
//                   <Form.Label>End Date</Form.Label>
//                   <Form.Control
//                     type="datetime-local"
//                     name="end_date"
//                     id="end_date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="formStatus">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="status"
//                     id="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="0">Completed</option>
//                     <option value="1">Pending</option>
//                     <option value="2">Doing</option>
//                     <option value="3">Start</option>
//                     <option value="4">Planning</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </div>
//           <div className="card-footer">
//             <Button type="submit" variant="primary">
//               Submit
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

//1.
// <div className="content-wrapper" style={{ marginBottom: "20mm" }}>
//   {/* <div className="container-fluid"> */}
//   {/* <div className="card"> */}
//   <div className="card card-primary">
//     <div className="card-header">
//       <h3 className="card-title">Project Form</h3>
//     </div>
//     <form onSubmit={handleSubmit}>
//       <div className="card-body">
//         <div className="form-group">
//           <label>Client ID</label>
//           <input
//             type="text"
//             className="form-control"
//             name="client_id"
//             value={formData.client_id}
//             onChange={handleChange}
//             placeholder="Enter Client ID"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Project Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="project_name"
//             value={formData.project_name}
//             onChange={handleChange}
//             placeholder="Enter Project Name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter Description"
//             required
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Start Date</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             name="start_date"
//             value={formData.start_date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>End Date</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             name="end_date"
//             value={formData.end_date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Status</label>
//           <select
//             className="form-control"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             required
//           >
//             <option value="0">Completed</option>
//             <option value="1">Pending</option>
//             <option value="2">Doing</option>
//             <option value="3">Start</option>
//             <option value="4">Planning</option>
//           </select>
//         </div>
//       </div>
//       <div className="card-footer">
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
