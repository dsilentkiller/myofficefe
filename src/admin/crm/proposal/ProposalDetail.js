import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  Divider,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchProposalById,
  createProposal,
  // updateProposalStatus,
} from "../../redux/slice/crm/proposalSlice";

// import {  Box, Button, Paper } from "@mui/material";
const ProposalDetail = () => {
  const { id } = useParams(); // Retrieve the proposal ID from the URL
  const navigate = useNavigate(); // Used to navigate back to the list page
  const [tabIndex, setTabIndex] = useState(0);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const proposal = useSelector((state) => state.proposals.currentProposal);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    if (id) {
      console.log("Fetching proposal by ID:", id);
      dispatch(fetchProposalById(id))
        .unwrap()
        .then((data) => console.log("Proposal fetched:", data))
        .catch((error) => console.log("Error fetching proposal:", error));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (proposal) {
      console.log("Proposal data received:", proposal); // Debugging purpose
      setStatus(proposal.status);
    }
  }, [proposal]);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusUpdate = () => {
    if (status === proposal.status) {
      toast.info("No change in status.");
      return;
    }
    const CloneProposal = () => {
      const { id } = useParams();
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(() => {
        // Fetch the proposal by ID and clone it
        dispatch(fetchProposalById(id))
          .unwrap()
          .then((proposal) => {
            // Clone logic (make a copy and save it)
            const clonedProposal = { ...proposal, id: new Date().getTime() }; // Simple clone logic
            dispatch(createProposal(clonedProposal)) // Assuming createProposal is a redux action
              .then(() => {
                toast.success("Proposal cloned successfully!");
                navigate(`/dashboard/crm/proposals`);
              })
              .catch((error) => toast.error("Error cloning proposal"));
          });
      }, [id, dispatch, navigate]);

      return <div>Cloning proposal...</div>;
    };

    const updatedProposal = { ...proposal, status };
    // dispatch(updateProposalStatus({ id:proposal.id, status }))
    // .unwrap()
    // .then(() => {
    //   toast.success("Proposal status updated successfully!");
    // })
    // .catch((error) => {
    //   toast.error(`Error updating status: ${error.message}`);
    // });
  };

  const sendProposal = async () => {
    try {
      const response = await axios.post("api/proposal/send/", {
        proposal_id: proposal.id,
        email: "client@example.com", // Replace with dynamic email input
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error sending proposal");
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("proposal-content");

    // Check if the content exists
    if (!input) {
      toast.error("Unable to generate PDF. Content not found.");
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Adjust the image size to fit the PDF page
        pdf.addImage(imgData, "PNG", 10, 10, 190, 250); // Adjust the width and height as needed

        // Save the PDF with the proposal title
        pdf.save(`${proposal.title}.pdf`);
      })
      .catch((error) => {
        toast.error("Error generating PDF.");
        console.error("Error generating PDF:", error);
      });
  };

  if (!proposal || proposal === null) {
    return <div>Loadingproposal details...</div>;
  }

  if (!proposal) {
    return <div>Loading...</div>; // Or an error page
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <div id="proposal-content">
          {/* Header Section */}
          <Grid container spacing={3} alignItems="center">
            <Grid item md={4} sm={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "150px",
                  marginBottom: 2,
                }}
              >
                <img
                  src={proposal.logo}
                  alt={proposal.companyName}
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </Box>
            </Grid>
            <Grid item md={8} sm={12}>
              <Typography variant="h4" gutterBottom>
                {proposal.title}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {proposal.companyName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Submission Date:</strong> {proposal.submissionDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Client Name:</strong> {proposal.clientName}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Tabs for sections */}
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Overview" />
            <Tab label="Details" />
            <Tab label="Legal Terms" />
          </Tabs>

          {/* Tab Content */}
          {tabIndex === 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Executive Summary
              </Typography>
              <Typography variant="body1">{proposal.summary}</Typography>

              <Typography variant="h6" sx={{ mt: 3 }}>
                Problem & Solution
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Problem:
              </Typography>
              <Typography variant="body1">{proposal.problem}</Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Solution:
              </Typography>
              <Typography variant="body1">{proposal.solution}</Typography>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box sx={{ mt: 3 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="services-description"
                >
                  <Typography variant="h6">Services Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{proposal.servicesDescription}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="deliverables"
                >
                  <Typography variant="h6">Deliverables</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{proposal.deliverables}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="milestones"
                >
                  <Typography variant="h6">Milestones</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{proposal.milestones}</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="cost-breakdown"
                >
                  <Typography variant="h6">Cost Breakdown</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{proposal.costBreakdown}</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {tabIndex === 2 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Legal Terms
              </Typography>
              <Typography variant="body1">{proposal.legalTerms}</Typography>
            </Box>
          )}
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "row", // Keep the buttons in a row
              justifyContent: "center", // Align buttons centrally within the box
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                navigate(`/dashboard/crm/proposals/clone/${proposal.id}`)
              }
              sx={{ textTransform: "none", marginRight: 2 }} // Adding margin-right between buttons
            >
              Clone Proposal
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={generatePDF}
              sx={{ textTransform: "none", marginRight: 2 }} // Adding margin-right between buttons
            >
              Download PDF
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/dashboard/crm/proposals")}
              sx={{ textTransform: "none", marginRight: 2 }} // Adding margin-right between buttons
            >
              Back to Proposals List
            </Button>

            <Button
              variant="contained"
              color="info"
              onClick={sendProposal}
              sx={{ textTransform: "none" }} // No margin-right for the last button
            >
              Send Proposal via Email
            </Button>
          </Box>
        </div>
      </Paper>
    </Container>
  );
};

export default ProposalDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   fetchProposalById,
// } from "../../redux/slice/crm/proposalSlice";

// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   Button,
//   Paper,
//   Divider,
//   Tab,
//   Tabs,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const ProposalDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const proposal = useSelector((state) => state.proposals.currentProposal);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProposalById(id))
//         .unwrap()
//         .then((data) => {
//           console.log("Proposal fetched:", data);
//         })
//         .catch((error) => {
//           console.log("Error fetching proposal:", error);
//         });
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (proposal) {
//       setStatus(proposal.status);
//     }
//   }, [proposal]);

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   const handleStatusUpdate = () => {
//     if (status === proposal.status) {
//       toast.info("No change in status.");
//       return;
//     }

//     const updatedProposal = { ...proposal, status };
//   };

//   if (!proposal) {
//     return <div>Loading proposal details...</div>;
//   }

//   return (
//     <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//       <Paper sx={{ padding: 4 }}>
//         {/* Header Section */}
//         <Grid container spacing={3} alignItems="center">
//           <Grid item md={4} sm={12}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 maxWidth: "150px",
//                 marginBottom: 2,
//               }}
//             >
//               <img
//                 src={proposal.logo}
//                 alt={proposal.companyName}
//                 style={{ maxWidth: "100%", borderRadius: "8px" }}
//               />
//             </Box>
//           </Grid>
//           <Grid item md={8} sm={12}>
//             <Typography variant="h4" gutterBottom>
//               {proposal.title}
//             </Typography>
//             <Typography variant="h6" color="textSecondary">
//               {proposal.companyName}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               <strong>Submission Date:</strong> {proposal.submissionDate || "N/A"}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               <strong>Client Name:</strong> {proposal.clientName || "N/A"}
//             </Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Tabs for sections */}
//         <Tabs value={tabIndex} onChange={handleTabChange} centered>
//           <Tab label="Overview" />
//           <Tab label="Details" />
//           <Tab label="Legal Terms" />
//         </Tabs>

//         {/* Tab Content */}
//         {tabIndex === 0 && (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Executive Summary
//             </Typography>
//             <Typography variant="body1">{proposal.summary || "N/A"}</Typography>

//             <Typography variant="h6" sx={{ mt: 3 }}>
//               Problem & Solution
//             </Typography>
//             <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//               Problem:
//             </Typography>
//             <Typography variant="body1">{proposal.problem || "N/A"}</Typography>

//             <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//               Solution:
//             </Typography>
//             <Typography variant="body1">{proposal.solution || "N/A"}</Typography>
//           </Box>
//         )}

//         {tabIndex === 1 && (
//           <Box sx={{ mt: 3 }}>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="services-description">
//                 <Typography variant="h6">Services Description</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.servicesDescription || "N/A"}</Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="deliverables">
//                 <Typography variant="h6">Deliverables</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.deliverables || "N/A"}</Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="milestones">
//                 <Typography variant="h6">Milestones</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.milestones || "N/A"}</Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="cost-breakdown">
//                 <Typography variant="h6">Cost Breakdown</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.costBreakdown || "N/A"}</Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Box>
//         )}

//         {tabIndex === 2 && (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Legal Terms
//             </Typography>
//             <Typography variant="body1">{proposal.legalTerms || "N/A"}</Typography>
//           </Box>
//         )}

//         {/* Back Button */}
//         <Box sx={{ mt: 4, textAlign: "center" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/dashboard/crm/proposals")}
//             sx={{ textTransform: "none" }}
//           >
//             Back to Proposals List
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default ProposalDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   fetchProposalById,
//   // updateProposalStatus,
// } from "../../redux/slice/crm/proposalSlice";

// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   Button,
//   Paper,
//   Divider,
//   Tab,
//   Tabs,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const ProposalDetail = () => {
//   const { id } = useParams(); // Retrieve the proposal ID from the URL
//   const navigate = useNavigate(); // Used to navigate back to the list page
//   const dispatch = useDispatch();
//   const proposal = useSelector((state) => state.proposals.currentProposal);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     if (id) {
//       console.log("Fetching proposal by ID:", id);
//       dispatch(fetchProposalById(id))
//         .unwrap()
//         .then((data) => console.log("Proposal fetched:", data))
//         .catch((error) => console.log("Error fetching proposal:", error));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (proposal) {
//       console.log("Proposal data received:", proposal); // Debugging purpose
//       setStatus(proposal.status);
//     }
//   }, [proposal]);

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   const handleStatusUpdate = () => {
//     if (status === proposal.status) {
//       toast.info("No change in status.");
//       return;
//     }

//     const updatedProposal = { ...proposal, status };
//     // dispatch(updateProposalStatus({ id: proposal.id, status }))
//     //   .unwrap()
//     //   .then(() => {
//     //     toast.success("Proposal status updated successfully!");
//     //   })
//     //   .catch((error) => {
//     //     toast.error(`Error updating status: ${error.message}`);
//     //   });
//   };

//   if (!proposal || proposal === null) {
//     return <div>Loading proposal details...</div>;
//   }

//   return (
//     <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//       <Paper sx={{ padding: 4 }}>
//         {/* Header Section */}
//         <Grid container spacing={3} alignItems="center">
//           <Grid item md={4} sm={12}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 maxWidth: "150px",
//                 marginBottom: 2,
//               }}
//             >
//               <img
//                 src={proposal.logo}
//                 alt={proposal.companyName}
//                 style={{ maxWidth: "100%", borderRadius: "8px" }}
//               />
//             </Box>
//           </Grid>
//           <Grid item md={8} sm={12}>
//             <Typography variant="h4" gutterBottom>
//               {proposal.title}
//             </Typography>
//             <Typography variant="h6" color="textSecondary">
//               {proposal.companyName}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               <strong>Submission Date:</strong> {proposal.submissionDate}
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               <strong>Client Name:</strong> {proposal.clientName}
//             </Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Tabs for sections */}
//         <Tabs value={tabIndex} onChange={handleTabChange} centered>
//           <Tab label="Overview" />
//           <Tab label="Details" />
//           <Tab label="Legal Terms" />
//         </Tabs>

//         {/* Tab Content */}
//         {tabIndex === 0 && (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Executive Summary
//             </Typography>
//             <Typography variant="body1">{proposal.summary}</Typography>

//             <Typography variant="h6" sx={{ mt: 3 }}>
//               Problem & Solution
//             </Typography>
//             <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//               Problem:
//             </Typography>
//             <Typography variant="body1">{proposal.problem}</Typography>

//             <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//               Solution:
//             </Typography>
//             <Typography variant="body1">{proposal.solution}</Typography>
//           </Box>
//         )}

//         {tabIndex === 1 && (
//           <Box sx={{ mt: 3 }}>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="services-description">
//                 <Typography variant="h6">Services Description</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.servicesDescription}</Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="deliverables">
//                 <Typography variant="h6">Deliverables</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.deliverables}</Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="milestones">
//                 <Typography variant="h6">Milestones</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.milestones}</Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} id="cost-breakdown">
//                 <Typography variant="h6">Cost Breakdown</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>{proposal.costBreakdown}</Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Box>
//         )}

//         {tabIndex === 2 && (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Legal Terms
//             </Typography>
//             <Typography variant="body1">{proposal.legalTerms}</Typography>
//           </Box>
//         )}

//         {/* Back Button */}
//         <Box sx={{ mt: 4, textAlign: "center" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/dashboard/crm/proposals")}
//             sx={{ textTransform: "none" }}
//           >
//             Back to Proposals List
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default ProposalDetail;
