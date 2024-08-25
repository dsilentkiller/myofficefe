import React from "react";
import DefaultHeader from "../../components/navbar/DefaultHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AssignAssetsForm() {
  return (
    <div className="assets-dashboard">
      <DefaultHeader />
      <Sidebar />
      <div className="main-content">
        <Container fluid>
          <h3 className="mb-4">Assign Assets</h3>
          <Form>
            <Row className="mb-3">
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formAsset">
                  <Form.Label>Asset Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter asset name" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control type="text" placeholder="Enter department" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formEmployee">
                  <Form.Label>Employee</Form.Label>
                  <Form.Control type="text" placeholder="Enter employee name" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formAssignDate">
                  <Form.Label>Assign Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default AssignAssetsForm;
