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
  { value: "0", label: "Completed" },
  { value: "1", label: "Pending" },
  { value: "2", label: "Doing" },
  { value: "3", label: "Start" },
  { value: "4", label: "Planning" },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.currentProject);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      setStatus(project.status); // Set current status
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

  if (!project) {
    return <div>Loading...</div>;
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
