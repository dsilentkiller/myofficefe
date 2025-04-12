import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizationById,
  updateOrganizationStatus,
} from "../../redux/slice/base/organizationSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrganizationDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Accessing Redux state for organization and loading/error status
  // const { currentOrganization, isLoading, error } = useSelector((state) => state?.organizations || {});
  const { currentOrganization = null, isLoading = false, error = null } = useSelector((state) => state.organizations || {});


  const [status, setStatus] = useState("");

  // Fetch the organization data on component mount
  useEffect(() => {
    if (id) {
      console.log("Fetching organization by ID:", id);
      dispatch(fetchOrganizationById(id))
        .unwrap()
        .then((data) => {
          console.log("Organization fetched:", data);
        })
        .catch((error) => {
          console.error("Error fetching organization:", error);
        });
    }
  }, [dispatch, id]);

  // Set the status after fetching the organization data
  useEffect(() => {
    if (currentOrganization && currentOrganization.data && currentOrganization.data.length > 0) {
      const organization = currentOrganization.data[0]; // Access the first item in the data array
      console.log("Organization data received:", organization);
      setStatus(organization.status); // Assuming `status` exists in your data
    }
  }, [currentOrganization]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusUpdate = () => {
    if (status === organization.data[0]?.status) {
      toast.info("No change in status.");
      return;
    }

    const updatedOrganization = { ...organization.data[0], status };
    dispatch(updateOrganizationStatus({ id: updatedOrganization.id, status }))
      .unwrap()
      .then(() => {
        toast.success("Organization status updated successfully!");
      })
      .catch((error) => {
        toast.error(`Error updating status: ${error.message}`);
      });
  };

  // Handle loading state
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // // Handle error state
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // Handle if organization data is missing or undefined
  if (!currentOrganization || !currentOrganization.data || currentOrganization.data.length === 0) {
    return <div>Organization not found or data is missing!</div>;
  }

  const organization = currentOrganization.data[0]; // Access the first item

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header as="h5" className="bg-primary text-white">
                Organization Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Organization Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={organization.name || ""}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Province</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.province || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>District</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.district || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Municipality</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.municipality || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.tole_name || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.pri_phone || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.email || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Pan/Vat</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.pan_vat || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Registration No</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.registration_no || ""}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Currency</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={organization.currency || ""}
                        rows={3}
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
                        {/* Populate status options if needed */}
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
                      to="/dashboard/crm/organization"
                      className="btn btn-secondary ml-2"
                    >
                      Back to Organizations
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

export default OrganizationDetail;












// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrganizationById,
//   updateOrganizationStatus,
// } from "../../redux/slice/base/organizationSlice";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Card, Col, Form, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";


// const OrganizationDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch()
//   // const currentOrganization = state?.currentOrganization;


//     // Access currentOrganization from Redux state
//   const organization = useSelector((state) => state?.organizations?.currentOrganization);
//   console.log(organization)

//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     if (id) {
//       console.log("Fetching organization by ID:", id);
//       dispatch(fetchOrganizationById(id))
//         .unwrap()
//         .then((data) => console.log("Organization fetched:", data))
//         .catch((error) => console.log("Error fetching organization:", error));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (organization) {
//       console.log("Organization data received:", organization); // Debugging purpose
//       setStatus(organization.status);
//     }
//   }, [organization]);
//   const handleStatusChange = (e) => {
//     setStatus(e.target.value);
//   };

//   const handleStatusUpdate = () => {
//     if (status === organization.status) {
//       toast.info("No change in status.");
//       return;
//     }

//     const updatedOrganization = { ...organization, status };
//     dispatch(updateOrganizationStatus({ id: organization.id, status }))
//       .unwrap()
//       .then(() => {
//         toast.success("Organization status updated successfully!");
//       })
//       .catch((error) => {
//         toast.error(`Error updating status: ${error.message}`);
//       });
//   // };
//   // if (!organization || organization === null) {
//   //   return <div>Loading organization details...</div>;
//   // }

//   // if (organization === undefined) {
//   //   return <div>Organization not found or error occurred!</div>;
//   }


//   return (
//     <div className="content-wrapper">
//       <div className="container-fluid">
//         <div className="row justify-content-center">
//           <Col md={8}>
//             <Card className="shadow-sm mb-4">
//               <Card.Header as="h5" className="bg-primary text-white">
//                 Organization Details
//               </Card.Header>
//               <Card.Body>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Organization Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={organization.organization_name ||""}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Province</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.province ||""}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                 <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>District</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.district||""}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>

//                     <Form.Group>
//                       <Form.Label>municipality</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.municipality||""}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>

//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Street Address</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.street_address||""}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>phone</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.pri_phone}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>email</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.email}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Pan/Vat</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.pan_vat}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Registration</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.registration_no}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={organization.Currency}
//                         rows={3}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Current Status</Form.Label>
//                       <Form.Control
//                         as="select"
//                         value={status}
//                         onChange={handleStatusChange}
//                       >
//                         {/* {statusOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))} */}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col>
//                     <Button variant="success" onClick={handleStatusUpdate}>
//                       Update Status
//                     </Button>
//                     <Link
//                       to="/dashboard/crm/organization"
//                       className="btn btn-secondary ml-2"
//                     >
//                       Back to Organizations
//                     </Link>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationDetail;
