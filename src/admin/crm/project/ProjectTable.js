import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProject,
  updateProject,
  deleteProject,
  updateStatus,
  updateError,
} from "../../redux/slice/crm/projectSlice";
import "../../../admin/css/Table.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import ProjectDelete from "./ProjectDelete";
const ProjectTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const projects = useSelector((state) => state.projects?.list || []);
  // console.log(projects);
  const updateStatus = useSelector((state) => state.projects?.updateStatus);
  const updateError = useSelector((state) => state.projects?.updateError);
  const deleteStatus = useSelector((state) => state.projects?.deleteStatus);
  const deleteError = useSelector((state) => state.projects?.deleteError);
  const createError = useSelector((state) => state.projects?.createError);
  const createStatus = useSelector((state) => state.projects?.createStatus);
  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);
  // Handle update
  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   if (editId !== null) {
  //     dispatch(updateproject({ id: editId, project_name: newName }));
  //     setEditId(null);
  //     setNewName("");
  //   }
  // };

  // useEffect(() => {
  //   if (updateStatus === "succeeded") {
  //     toast.success("Project updated successfully!");
  //   } else if (updateError) {
  //     toast.error("Failed to update project.");
  //   }
  //   if (deleteStatus === "succeeded") {
  //     toast.success("Project deleted successfully!");
  //   } else if (deleteError) {
  //     toast.error("Failed to delete project.");
  //   }
  // }, [updateStatus, updateError, deleteStatus, deleteError]);

  useEffect(() => {
    const notify = (status, successMsg, errorMsg) => {
      if (status === "succeeded") {
        toast.success(successMsg);
      } else if (status === "failed" || errorMsg) {
        toast.error(errorMsg || "An error occurred.");
      }
    };

    notify(updateStatus, "Project updated successfully!", updateError);
    notify(deleteStatus, "Project deleted successfully!", deleteError);
    notify(createStatus, "Project created successfully!", createError);
  }, [
    updateStatus,
    updateError,
    deleteStatus,
    deleteError,
    createStatus,
    createError,
  ]);
  //search button -----------
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter categories for search term
  const filteredProjects = projects.filter((project) =>
    project.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //--- Project delete ------------
  const handleDelete = (id) => {
    setProjectToDelete(id); // Set the project ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteProject(id))
      .unwrap()
      .then(() => {
        toast.success("project deleted successfully!");
        setProjectToDelete(null); // Close the modal after successful deletion
        dispatch(fetchProject()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete project: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };
  //project delete end  box -------------------
  const formatName = React.useCallback((name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }, []);
  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Project created successfully!");
      setFormData({
        // client_id: "",
        project_name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "",
      }); // Reset form after successful creation
      navigate("/dashboard/crm/project");
    } else if (createStatus === "failed") {
      toast.error(`Error: ${createError || "An error occurred"}`);
    }
  }, [createStatus, createError, navigate]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(projects);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    XLSX.writeFile(workbook, "projects.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Projects List", 10, 10);

    autoTable(doc, {
      head: [
        [
          // "Client ID",
          "Project Name",
          "Description",
          "Start Date",
          "End Date",
          "Status",
        ],
      ],
      body: projects.map((project) => [
        // project.client_id,
        project.project_name,
        project.description,
        project.start_date,
        project.end_date,
        project.status,
      ]),
    });

    doc.save("projects.pdf");
  };

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Projects Table</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-info">
                    <h5>Add Project</h5>
                  </Link>
                  <form className="form-inline ml-3">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search Projects..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => exportExcel()}
                        >
                          Export Excel
                        </button>
                        <button
                          type="button"
                          className="btn btn-info ml-2"
                          onClick={() => exportPDF()}
                        >
                          Export PDF
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                              <tr key={project.id}>
                                <td>{index + 1}</td>
                                {/* <td>{project.client_id}</td> */}
                                <td>{formatName(project.project_name)}</td>
                                <td>{project.description}</td>
                                <td>{project.start_date}</td>
                                <td>{project.end_date}</td>
                                <td>{project.status}</td>
                                <td>
                                  <button
                                    to={`/projects/update/${project.id}`}
                                    className="btn btn-primary"
                                  >
                                    <FaEdit />
                                  </button>
                                  <span></span>

                                  <button
                                    to={`/projects/detail/${project.id}`}
                                    className="btn btn-secondary"
                                  >
                                    View
                                  </button>
                                  <span></span>
                                  <button
                                    to={`/projects/delete/${project.id}`}
                                    onClick={() => handleDelete(project.id)}
                                    // onClick={() => handleDelete(category.id)}
                                    className="btn btn-danger"
                                  >
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7">No projects found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* Delete Confirmation Modal */}
                    {projectToDelete !== null && (
                      <ProjectDelete
                        id={projectToDelete}
                        onClose={() => setProjectToDelete(null)}
                        onConfirm={() => confirmDelete(projectToDelete)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;

//v1
// import { Link } from "react-router-dom";
// import XLSX from "xlsx";
// import jsPDF from "jspdf";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProject,
//   updateProject,
//   deleteProject,
//   updateStatus,
//   updateError,
// } from "../../redux/slice/projectSlice";

// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import ProjectDelete from "./ProjectDelete";
// import { toast } from "react-toastify"; // Import toast for error messages
// import "../../css/Table.css";

// import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";

// const ProjectTable = ({ projects }) => {
//   const dispatch = useDispatch();
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [projectToDelete, setProjectToDelete] = useState(null);
//   // Access updateStatus state property
//   const updateStatus = useSelector((state) => state.projects.updateStatus);
//   const updateError = useSelector((state) => state.projects.updateError);
//   const {
//     list: departments,
//     isLoading,
//     error,
//     deleteStatus,
//     deleteError,
//   } = useSelector((state) => state.projects || {});

//   useEffect(() => {
//     dispatch(fetchProject());
//   }, [dispatch]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   const projects = projects.filter((project) =>
//     project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Export Excel
//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(projects);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
//     XLSX.writeFile(workbook, "projects.xlsx");
//   };

//   // Export PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Projects List", 10, 10);

//     autoTable(doc, {
//       head: [
//         [
//           "Client ID",
//           "Project Name",
//           "Description",
//           "Start Date",
//           "End Date",
//           "Status",
//         ],
//       ],
//       body: projects.map((project) => [
//         project.client_id,
//         project.project_name,
//         project.description,
//         project.start_date,
//         project.end_date,
//         project.status,
//       ]),
//     });

//     doc.save("projects.pdf");
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const existingProject = projects.find(
//       (project) =>
//         project.project_name.toLowerCase() === newProjectName.toLowerCase()
//     );
//     if (existingProject) {
//       alert("Project with this name already exists.");
//     } else {
//       // Proceed with adding the project
//     }
//   };
//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">projects Table</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link
//                     to="/admin/projects/create/"
//                     className="nav-link btn btn-info"
//                   >
//                     <h5>Add projects</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/projects/search"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="searchTerm"
//                         className="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item ">
//                       <button
//                         id="projectsTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                         {/* Font Awesome icon for CSV */}
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         <table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Client ID</th>
//                               <th>Project Name</th>
//                               <th>Description</th>
//                               <th>Start Date</th>
//                               <th>End Date</th>
//                               <th>Status</th>
//                               <th>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {projects.length > 0 ? (
//                               projects.map((project, index) => (
//                                 <tr key={index}>
//                                   <td>{project.client_id}</td>
//                                   <td>{project.project_name}</td>
//                                   <td>{project.description}</td>
//                                   <td>{project.start_date}</td>
//                                   <td>{project.end_date}</td>
//                                   <td>{project.status}</td>
//                                   <td>
//                                     <Link to={`/projects/update/${project.id}`}>
//                                       Edit
//                                     </Link>
//                                     |
//                                     <Link to={`/projects/detail/${project.id}`}>
//                                       View
//                                     </Link>
//                                     |
//                                     <Link to={`/projects/delete/${project.id}`}>
//                                       Delete
//                                     </Link>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="8">No projects found</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTable;
