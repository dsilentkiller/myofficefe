import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  updateProjectStatus,
} from "../../redux/slice/crm/projectSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const statusOptions = [
  { value: "completed", label: "completed" },
  { value: "pending", label: "pending" },
  { value: "doing", label: "doing" },
  { value: "start", label: "start" },
  { value: "planning", label: "planning" },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const project = useSelector((state) => state.projects.currentProject);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      console.log("Fetching project by ID:", id);
      dispatch(fetchProjectById(id))
        .unwrap()
        .then((data) => console.log("Project fetched:", data))
        .catch((error) => console.log("Error fetching project:", error));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      console.log("Project data received:", project); // Debugging purpose
      setStatus(project.status);
    }
  }, [project]);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusUpdate = () => {
    if (status === project.status) {
      toast.info("No change in status.");
      return;
    }

    const updatedProject = { ...project, status };
    dispatch(updateProjectStatus({ id: project.id, status }))
      .unwrap()
      .then(() => {
        toast.success("Project status updated successfully!");
      })
      .catch((error) => {
        toast.error(`Error updating status: ${error.message}`);
      });
  };
  if (!project || project === null) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header as="h5" className="bg-primary text-white">
                Project Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={project.project_name}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={project.description}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date(project.start_date).toLocaleString()}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date(project.end_date).toLocaleString()}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Current Status</Form.Label>
                      <Form.Control
                        as="select"
                        value={status}
                        onChange={handleStatusChange}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Button variant="success" onClick={handleStatusUpdate}>
                      Update Status
                    </Button>
                    <Link
                      to="/dashboard/crm/project"
                      className="btn btn-secondary ml-2"
                    >
                      Back to Projects
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
