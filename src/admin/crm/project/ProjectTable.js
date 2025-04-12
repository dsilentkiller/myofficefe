import React, { useState, useEffect } from "react";
import GeneralTable from "../../hrm/GeneralTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, deleteProject } from "../../redux/slice/crm/projectSlice";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectDelete from "./ProjectDelete"; // Import your delete confirmation modal

const ProjectTable = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list || []);
  const navigate = useNavigate();
  const [projectToDelete, setProjectToDelete] = useState(null); // Store the project id to delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const formattedProjects = projects.map((project, index) => ({
    ...project,
    index: index + 1, // Add the index dynamically
  }));

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/projects/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setProjectToDelete(rowData.id); // Set the project to delete
      setIsDeleteModalOpen(true); // Open the delete confirmation modal
    } else if (actionKey === "view") {
      navigate(`/projects/detail/${rowData.id}`);
    }
  };


  const handleAdd = () => {
    navigate('/dashboard/crm/project/create');
  };

  const handleEdit = (project) => {
    navigate(`/dashboard/crm/project/update/${project.id}/`);
  };

  const handleView = (project) => {
    navigate(`/dashboard/crm/project/detail/${project.id}/`);
  };
  // This is the function for deleting a project
  const handleDelete = (project) => {

    setProjectToDelete(project.id); // Store the project ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };



  return (
    <div className="content-wrapper">
      <GeneralTable
        title="Projects"
        data={formattedProjects}
        columns={[
          { label: "#", field: "index" },
          { label: "Project Name", field: "project_name", sortable: true },
          { label: "Description", field: "description" },
          { label: "Start Date", field: "start_date" },
          { label: "End Date", field: "end_date" },
          { label: "Status", field: "status" },
        ]}
        actions={[
          { label: "Edit", icon: <Edit />, key: "edit" },
          { label: "Delete", icon: <Delete />, key: "delete" },
          { label: "View", icon: <Visibility />, key: "view" },
        ]}
        onRowAction={(actionKey, rowData) => handleRowAction(actionKey, rowData)}

        onEdit={handleEdit}
        onView={handleView}
        onDelete= {handleDelete}
        onAdd={handleAdd}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ProjectDelete
          id={projectToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ProjectTable;


// import { React,useState,useEffect} from "react";
// import GeneralTable from "../../hrm/GeneralTable";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProject, deleteProject } from "../../redux/slice/crm/projectSlice";
// import { Edit, Delete, Visibility } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ProjectDelete from "./ProjectDelete"; // Import your delete confirmation modal

// const ProjectTable = () => {
//   const dispatch = useDispatch();
//   const projects = useSelector((state) => state.projects.list || []);
//   const navigate = useNavigate(); // Import and use navigate
//   const [projectToDelete, setProjectToDelete] = useState(null); // State for the project to delete
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
//   useEffect(() => {
//     dispatch(fetchProject());
//   }, [dispatch]);
//   const formattedProjects = projects.map((project, index) => ({
//     ...project,
//     index: index + 1, // Add the index dynamically
//   }));

//   const handleRowAction = (actionKey, rowData) => {
//     if (actionKey === "edit") {
//       // Handle edit logic, if needed
//       navigate(`/projects/edit/${rowData.id}`); // Navigate to the edit page
//     } else if (actionKey === "delete") {
//       setProjectToDelete(rowData.id); // Set the project to delete
//       setIsDeleteModalOpen(true); // Open the delete confirmation modal
//     } else if (actionKey === "view") {
//       navigate(`/projects/detail/${rowData.id}`); // Navigate to the detail page
//     }
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteProject(id))
//       .unwrap()
//       .then(() => {
//         toast.success("Project deleted successfully!");
//         setIsDeleteModalOpen(false); // Close the modal
//         dispatch(fetchProject()); // Refresh the project list
//       })
//       //   setProjectToDelete(null);
//       //   dispatch(fetchProject());
//       // })
//       .catch((error) => {
//         console.error("Delete Error:", error);
//         toast.error(`Failed to delete project: ${error.message || "Unknown error"}`);
//       });
//   };
//   const handleAdd =()=>{
//     navigate('/dashboard/crm/project/create')

//   }
//   const handleEdit = (project) => {
//     // Use backticks for string interpolation
//     navigate(`/dashboard/crm/project/update/${project.id}/`);
//   };

//   const handleView = (project) => {
//     // Use backticks for string interpolation
//     navigate(`/dashboard/crm/project/detail/${project.id}/`);
//   };

//   // const handleDelete = (project) => {
//   //   // Use backticks for string interpolation
//   //   navigate(`/dashboard/crm/project/delete/${project.id}`);
//   // };

//   // const sortedProjects = [...filteredProjects].sort((a, b) => {
//   //   const nameA = a.project_name || ""; // Default to an empty string if null/undefined
//   //   const nameB = b.project_name || ""; // Default to an empty string if null/undefined

//   //   if (sortOrder === "asc") {
//   //     return nameA.localeCompare(nameB);
//   //   } else {
//   //     return nameB.localeCompare(nameA);
//   //   }
//   // });


//   return (
//     <div className="content-wrapper">
//     <GeneralTable
//       title="Projects"
//       data={formattedProjects}
//       columns={[
//         { label: "#", field: "index" },
//         { label: "Project Name", field: "project_name", sortable: true },
//         { label: "Description", field: "description" },
//         {label: "Start Date", field: "start_date" },
//         { label: "End Date", field: "end_date" },
//         { label: "Status", field: "status" },
//       ]}
//       actions={[
//         { label: "Edit", icon: <Edit />, key: "edit" },
//         { label: "Delete", icon: <Delete />, key: "delete" },
//         { label: "View", icon: <Visibility />, key: "view" },
//       ]}
//       onRowAction={(actionKey, rowData) =>
//         handleRowAction(actionKey, rowData, projects.indexOf(rowData))
//       }
//       onEdit={handleEdit}
//       onView={handleView}
//       onDelete={handleDelete}
//        onAdd={handleAdd} // Add button logic
//     />
//     {/* {isDeleteModalOpen && (
//         <ProjectDelete
//           id={projectToDelete}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={confirmDelete}
//         />
//       )} */}
//       {/* Delete Confirmation Modal */}
//    {projectToDelete !== null && (
//         <ProjectDelete
//           id={projectToDelete}
//           onClose={() => setProjectToDelete(null)}
//           onConfirm={() => confirmDelete(projectToDelete)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectTable;















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProject, deleteProject } from "../../redux/slice/crm/projectSlice";
// import { Link } from "react-router-dom";
// import {
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Tooltip,
//   TextField,
//   Typography,
//   Button
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Search as SearchIcon,
//   PictureAsPdf as PdfIcon,
//   TableChart as TableIcon,
//   FileDownload as ExcelIcon,
// } from "@mui/icons-material";
// import { Delete, Edit, Visibility, ArrowUpward, ArrowDownward } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import ProjectDelete from "./ProjectDelete";

// const ProjectTable = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [projectToDelete, setProjectToDelete] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const projects = useSelector((state) => state.projects?.list || []);

//   useEffect(() => {
//     dispatch(fetchProject());
//   }, [dispatch]);

//   const handleSearch = (e) => setSearchTerm(e.target.value);

//   const filteredProjects = projects.filter((project) =>
//     project.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedProjects = [...filteredProjects].sort((a, b) => {
//     if (sortOrder === "asc") {
//       return a.project_name.localeCompare(b.project_name);
//     } else {
//       return b.project_name.localeCompare(a.project_name);
//     }
//   });

//   const handleSort = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

//   const handleDelete = (id) => setProjectToDelete(id);

  // const confirmDelete = (id) => {
  //   dispatch(deleteProject(id))
  //     .then(() => {
  //       toast.success("Project deleted successfully!");
  //       setProjectToDelete(null);
  //       dispatch(fetchProject());
  //     })
  //     .catch(() => toast.error("Failed to delete project."));
  // };

//   const handleExportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(projects);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
//     XLSX.writeFile(workbook, "projects.xlsx");
//   };
//   //###############  handle searchitem in a table ----
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Projects List", 10, 10);
//     autoTable(doc, {
//       head: [["Project Name", "Description", "Start Date", "End Date", "Status"]],
//       body: projects.map((project) => [
//         project.project_name,
//         project.description,
//         project.start_date,
//         project.end_date,
//         project.status,
//       ]),
//     });
//     doc.save("projects.pdf");
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-12">
//           <div className="card">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">

//                {/* Project Table Title */}
//                 <Typography left variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#333', flexGrow: 1 }}>
//                   Project Table
//                 </Typography>

//                 <div className="navbar-nav ml-auto">
//                         <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<AddIcon />}
//                   component={Link}
//                   to="create"
//                   sx={{ marginRight: 2 }}
//                 >
//                   Add Project
//                 </Button>

//                       {/* Search Bar */}
//                     <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
//                       <TextField
//                       label="Search Projects"
//                       variant="outlined"
//                         size="small"
//                         value={searchTerm}
//                          margin="dense"
//                         onChange={handleSearchChange}
//                         InputProps={{
//                           endAdornment: (
//                             <IconButton>
//                               <SearchIcon />
//                             </IconButton>
//                           ),
//                         }}
//                         sx={{ width: 250 }}
//                       />
//                     </div>

//         {/* Export Buttons */}
//                               <Button
//                                 variant="outlined"
//                                 color="info"
//                                 startIcon={<ExcelIcon />}
//                                 onClick={handleExportExcel}
//                                 sx={{ marginRight: 1 }}
//                               >
//                                 Export Excel
//                               </Button>
//                             <Button
//                               variant="outlined"
//                               color="error"
//                               startIcon={<PdfIcon />}
//                               onClick={handleExportPDF}
//                             >
//                               Export PDF
//                             </Button>

//               </div>

//         </div>
//           </nav>
//             <div className="card-body">

//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>#</TableCell>
//                       <TableCell>
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           Project Name
//                           <IconButton size="small" onClick={handleSort}>
//                             {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
//                           </IconButton>
//                         </div>
//                       </TableCell>
//                       <TableCell>Description</TableCell>
//                       <TableCell>Start Date</TableCell>
//                       <TableCell>End Date</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {sortedProjects
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((project, index) => (
//                         <TableRow key={project.id} hover>
//                           <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
//                           <TableCell>{project.project_name}</TableCell>
//                           <TableCell>{project.description}</TableCell>
//                           <TableCell>{project.start_date}</TableCell>
//                           <TableCell>{project.end_date}</TableCell>
//                           <TableCell>{project.status}</TableCell>
//                           <TableCell>
//                             <Tooltip title="Edit">
//                               <IconButton
//                                 color="primary"
//                                 component={Link}
//                                 to={`/dashboard/crm/project/update/${project.id}`}
//                               >
//                                 <Edit />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="View">
//                               <IconButton
//                                 color="info"
//                                 component={Link}
//                                 to={`/dashboard/crm/project/detail/${project.id}`}
//                               >
//                                 <Visibility />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete">
//                               <IconButton
//                                 color="error"
//                                 onClick={() => handleDelete(project.id)}
//                               >
//                                 <Delete />
//                               </IconButton>
//                             </Tooltip>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <TablePagination
//                 component="div"
//                 count={sortedProjects.length}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//               {projectToDelete !== null && (
//                 <ProjectDelete
//                   id={projectToDelete}
//                   onClose={() => setProjectToDelete(null)}
//                   onConfirm={() => confirmDelete(projectToDelete)}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTable;

//old table #######################

// import { Link } from "react-router-dom";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import { format } from "date-fns";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProject,
//   // updateProject,
//   deleteProject,
//   // updateStatus,
//   // updateError,
// } from "../../redux/slice/crm/projectSlice";
// import "../../../admin/css/Table.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import autoTable from "jspdf-autotable";
// import { useNavigate } from "react-router-dom";
// import ProjectDelete from "./ProjectDelete";

// const ProjectTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [projectToDelete, setProjectToDelete] = useState(null);
//   const projects = useSelector((state) => state.projects?.list || []);

//   const updateStatus = useSelector((state) => state.projects?.updateStatus);
//   const updateError = useSelector((state) => state.projects?.updateError);
//   const deleteStatus = useSelector((state) => state.projects?.deleteStatus);
//   const deleteError = useSelector((state) => state.projects?.deleteError);
//   const createError = useSelector((state) => state.projects?.createError);
//   const createStatus = useSelector((state) => state.projects?.createStatus);

//   useEffect(() => {
//     dispatch(fetchProject());
//   }, [dispatch]);

//   useEffect(() => {
//     const notify = (status, successMsg, errorMsg) => {
//       if (status === "succeeded") {
//         toast.success(successMsg);
//       } else if (status === "failed" || errorMsg) {
//         toast.error(errorMsg || "An error occurred.");
//       }
//     };

//     notify(updateStatus, "Project updated successfully!", updateError);
//     // notify(deleteStatus, "Project deleted successfully!", deleteError);
//     notify(createStatus, "Project created successfully!", createError);
//   }, [
//     updateStatus,
//     updateError,
//     deleteStatus,
//     deleteError,
//     createStatus,
//     createError,
//   ]);

//   // Search function
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter projects based on search term
//   const filteredProjects = projects.filter((project) =>
//     project.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Sort filtered projects by start date (latest first)
//   const sortedProjects = filteredProjects.sort(
//     (a, b) => new Date(b.start_date) - new Date(a.start_date)
//   );

//   const handleDelete = (id) => {
//     setProjectToDelete(id);
//   };

  // const confirmDelete = (id) => {
  //   dispatch(deleteProject(id))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Project deleted successfully!");
  //       setProjectToDelete(null);
  //       dispatch(fetchProject());
  //     })
  //     .catch((error) => {
  //       console.error("Delete Error:", error);
  //       toast.error(
  //         `Failed to delete project: ${
  //           error.message || deleteError || "Unknown error"
  //         }`
  //       );
  //     });
  // };

//   const formatName = React.useCallback((name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   }, []);

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
//   //     navigate("/dashboard/crm/project/");
//   //   } else if (createStatus === "failed") {
//   //     toast.error(`Error: ${createError || "An error occurred"}`);
//   //   }
//   // }, [createStatus, createError, navigate]);

//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(projects);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
//     XLSX.writeFile(workbook, "projects.xlsx");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Projects List", 10, 10);

//     autoTable(doc, {
//       head: [
//         ["Project Name", "Description", "Start Date", "End Date", "Status"],
//       ],
//       body: projects.map((project) => [
//         project.project_name,
//         project.description,
//         project.start_date,
//         project.end_date,
//         project.status,
//       ]),
//     });

//     doc.save("projects.pdf");
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-12 col-md-12 col-sm-12">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Projects Table</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Project</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         className="form-control"
//                         placeholder="Search Projects..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                       />
//                       <div className="input-group-append">
//                         <button
//                           type="button"
//                           className="btn btn-info"
//                           onClick={exportExcel}
//                         >
//                           Export Excel
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-info ml-2"
//                           onClick={exportPDF}
//                         >
//                           Export PDF
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr>
//                             <th>#</th>
//                             <th>Project Name</th>
//                             <th>Description</th>
//                             <th>Start Date</th>
//                             <th>End Date</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {sortedProjects.length > 0 ? (
//                             sortedProjects.map((project, index) => (
//                               <tr key={project.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{formatName(project.project_name)}</td>
//                                 <td>{project.description}</td>
//                                 <td>
//                                   {format(
//                                     new Date(project.start_date),
//                                     "PPPpp"
//                                   )}
//                                 </td>
//                                 <td>
//                                   {format(new Date(project.end_date), "PPPpp")}
//                                 </td>
//                                 <td>{project.status}</td>
//                                 <td>
                                  // <Link
                                    // to={`/dashboard/crm/project/update/${project.id}`}
//                                     className="btn btn-warning btn-sm"
//                                   >
//                                     <FaEdit />
//                                   </Link>
//                                   <span></span>
//                                   <Link
//                                     to={`/dashboard/crm/project/detail/${project.id}`}
//                                     className="btn btn-info btn-sm"
//                                   >
//                                     View
//                                   </Link>
//                                   <span></span>
//                                   <button
//                                     onClick={() => handleDelete(project.id)}
//                                     className="btn btn-danger"
//                                   >
//                                     <FaTrash />
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="7">No projects found</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
                    // {/* Delete Confirmation Modal */}
                    // {projectToDelete !== null && (
                    //   <ProjectDelete
                    //     id={projectToDelete}
                    //     onClose={() => setProjectToDelete(null)}
                    //     onConfirm={() => confirmDelete(projectToDelete)}
                    //   />
                    // )}
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

// import { Link } from "react-router-dom";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import { format } from "date-fns";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProject,
//   updateProject,
//   deleteProject,
//   updateStatus,
//   updateError,
// } from "../../redux/slice/crm/projectSlice";
// import "../../../admin/css/Table.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import autoTable from "jspdf-autotable";
// import { useNavigate } from "react-router-dom";
// import ProjectDelete from "./ProjectDelete";
// const ProjectTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [projectToDelete, setProjectToDelete] = useState(null);
//   const projects = useSelector((state) => state.projects?.list || []);
//   // console.log(projects);
//   const updateStatus = useSelector((state) => state.projects?.updateStatus);
//   const updateError = useSelector((state) => state.projects?.updateError);
//   const deleteStatus = useSelector((state) => state.projects?.deleteStatus);
//   const deleteError = useSelector((state) => state.projects?.deleteError);
//   const createError = useSelector((state) => state.projects?.createError);
//   const createStatus = useSelector((state) => state.projects?.createStatus);
//   useEffect(() => {
//     dispatch(fetchProject());
//   }, [dispatch]);

//   useEffect(() => {
//     const notify = (status, successMsg, errorMsg) => {
//       if (status === "succeeded") {
//         toast.success(successMsg);
//       } else if (status === "failed" || errorMsg) {
//         toast.error(errorMsg || "An error occurred.");
//       }
//     };

//     notify(updateStatus, "Project updated successfully!", updateError);
//     notify(deleteStatus, "Project deleted successfully!", deleteError);
//     notify(createStatus, "Project created successfully!", createError);
//   }, [
//     updateStatus,
//     updateError,
//     deleteStatus,
//     deleteError,
//     createStatus,
//     createError,
//   ]);

//   //search button -----------
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter categories for search term
//   const filteredProjects = projects.filter((project) =>
//     project.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   //--- Project delete ------------
//   const handleDelete = (id) => {
//     setProjectToDelete(id); // Set the project ID to trigger the modal
//   };

//   const confirmDelete = (id) => {
//     dispatch(deleteProject(id))
//       .unwrap()
//       .then(() => {
//         toast.success("project deleted successfully!");
//         setProjectToDelete(null); // Close the modal after successful deletion
//         dispatch(fetchProject()); // Refresh the list
//       })
//       .catch((error) => {
//         // Handle and log the error more robustly
//         console.error("Delete Error:", error);
//         toast.error(
//           `Failed to delete project: ${
//             error.message || deleteError || "Unknown error"
//           }`
//         );
//       });
//   };
//   //project delete end  box -------------------
//   const formatName = React.useCallback((name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   }, []);
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
//       }); // Reset form after successful creation
//       navigate("/dashboard/crm/project/");
//     } else if (createStatus === "failed") {
//       toast.error(`Error: ${createError || "An error occurred"}`);
//     }
//   }, [createStatus, createError, navigate]);

//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(projects);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
//     XLSX.writeFile(workbook, "projects.xlsx");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Projects List", 10, 10);

//     autoTable(doc, {
//       head: [
//         [
//           // "Client ID",
//           "Project Name",
//           "Description",
//           "Start Date",
//           "End Date",
//           "Status",
//         ],
//       ],
//       body: projects.map((project) => [
//         // project.client_id,
//         project.project_name,
//         project.description,
//         project.start_date,
//         project.end_date,
//         project.status,
//       ]),
//     });

//     doc.save("projects.pdf");
//   };
// //     // Format the date when rendering in your component
// // const formattedStartDate = format(new Date(project.start_date), 'PPPpp');
// // const formattedEndDate = format(new Date(project.end_date), 'PPPpp');

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-12">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Projects Table</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Project</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         className="form-control"
//                         placeholder="Search Projects..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                       />
//                       <div className="input-group-append">
//                         <button
//                           type="button"
//                           className="btn btn-info"
//                           onClick={() => exportExcel()}
//                         >
//                           Export Excel
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-info ml-2"
//                           onClick={() => exportPDF()}
//                         >
//                           Export PDF
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr>
//                             <th>#</th>
//                             <th>Project Name</th>
//                             <th>Description</th>
//                             <th>Start Date</th>
//                             <th>End Date</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {filteredProjects.length > 0 ? (
//                             filteredProjects.map((project, index) => (
//                               <tr key={project.id}>
//                                 <td>{index + 1}</td>
//                                 {/* <td>{project.client_id}</td> */}
//                                 <td>{formatName(project.project_name)}</td>
//                                 <td>{project.description}</td>
//                                 {/* <td>{project.start_date}</td>
//                                 <td>{project.end_date}</td> */}
//                                 <td>
//                                   {format(
//                                     new Date(project.start_date),
//                                     "PPPpp"
//                                   )}
//                                 </td>
//                                 <td>
//                                   {format(new Date(project.end_date), "PPPpp")}
//                                 </td>
//                                 <td>{project.status}</td>
//                                 <td>
//                                   <Link
//                                     to={`/dashboard/crm/project/update/${project.id}`}
//                                     className="btn btn-primary"
//                                   >
//                                     <FaEdit />
//                                   </Link>
//                                   <span></span>

//                                   <Link
//                                     to={`/dashboard/crm/project/detail/${project.id}`}
//                                     className="btn btn-secondary"
//                                   >
//                                     View
//                                   </Link>
//                                   <span></span>
//                                   <button
//                                     to={`/projects/delete/${project.id}`}
//                                     onClick={() => handleDelete(project.id)}
//                                     // onClick={() => handleDelete(category.id)}
//                                     className="btn btn-danger"
//                                   >
//                                     <FaTrash />
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="7">No projects found</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                     {/* Delete Confirmation Modal */}
//                     {projectToDelete !== null && (
//                       <ProjectDelete
//                         id={projectToDelete}
//                         onClose={() => setProjectToDelete(null)}
//                         onConfirm={() => confirmDelete(projectToDelete)}
//                       />
//                     )}
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
                                    // <Link to={`/projects/detail/${project.id}`}>
                                    //   View
                                    // </Link>
                                    // |
                                    // <Link to={`/projects/delete/${project.id}`}>
                                    //   Delete
                                    // </Link>
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
