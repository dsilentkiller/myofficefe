import React, { useState } from "react";
import ProjectForm from "../container/project/ProjectForm";
import ProjectTable from "../container/project/ProjectTable";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <div className="container">
      <ProjectForm onSubmit={addProject} />
      <ProjectTable projects={projects} />
    </div>
  );
};

export default ProjectDashboard;
