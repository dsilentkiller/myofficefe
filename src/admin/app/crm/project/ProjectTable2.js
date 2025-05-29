import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, deleteProject } from "../../redux/slice/projectSlice";
import { toast } from "react-toastify";

const ProjectTable = ({ setSelectedProject, setShowForm }) => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteProject(id));
    toast.success("Project deleted successfully");
  };

  const filteredProjects = projects.filter((project) =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search projects"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.client_id}</td>
              <td>{project.project_name}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedProject(project);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
