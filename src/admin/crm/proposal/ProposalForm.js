import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Paper, Tabs, Tab, IconButton, Box } from "@mui/material"; // Add IconButton here
import { Save, Print, AddCircle, Delete } from "@mui/icons-material";
import jsPDF from "jspdf";
import { createProposal,updateProposal } from "../../redux/slice/crm/proposalSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const ProposalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState({
    id: "",
    title: "",
    companyName: "",
    logo: "",
    submissionDate: "",
    clientName: "",
    clientDetails: "",
    companyIntroduction: "",
    purpose: "",
    summary: "",
    problem: "",
    solution: "",
    servicesDescription: "",
    deliverables: "",
    milestones: "",
    estimatedCompletion: "",
    costBreakdown: "",
    paymentTerms: "",
    contractDetails: [{ text: "" }],
    legalTerms: [{ text: "" }],
    benefitsSummary: [{ text: "" }],
    features: [{ text: "" }],
    professionalRedesign: "",
    letterhead: null,
  });

  const [tabIndex, setTabIndex] = useState(0);



  const handleCreateProposal = (formData) => {
    dispatch(createProposal(formData));
  };
  // handleChange function (updated)
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (dataset.index) {
      const index = dataset.index;
      setProposal((prevProposal) => {
        const updatedSections = [...prevProposal[name]];
        updatedSections[index] = { text: value };
        return { ...prevProposal, [name]: updatedSections };
      });
    } else {
      setProposal((prevProposal) => ({
        ...prevProposal,
        [name]: value,
      }));
    }
  };

  // handleAddSection function (added)
  const handleAddSection = (field) => {
    setProposal((prevProposal) => {
      const updatedSections = [...prevProposal[field], { text: "" }];
      return { ...prevProposal, [field]: updatedSections };
    });
  };

  // handleRemoveSection function (added)
  const handleRemoveSection = (field, index) => {
    setProposal((prevProposal) => {
      const updatedSections = prevProposal[field].filter((_, i) => i !== index);
      return { ...prevProposal, [field]: updatedSections };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const proposalData = {
      title: proposal.title,
      company_name: proposal.companyName,
      logo: proposal.logo,
      submission_date: proposal.submissionDate,
      client_name: proposal.clientName,
      client_details: proposal.clientDetails,
      company_introduction: proposal.companyIntroduction,
      purpose: proposal.purpose,
      summary: proposal.summary,
      problem: proposal.problem,
      solution: proposal.solution,
      services_description: proposal.servicesDescription,
      deliverables: proposal.deliverables,
      milestones: proposal.milestones,
      estimated_completion: proposal.estimatedCompletion,
      cost_breakdown: proposal.costBreakdown,
      payment_terms: proposal.paymentTerms,
      contract_details: proposal.contractDetails?.[0]?.text || "",  // Convert to string
      legal_terms: proposal.legalTerms?.[0]?.text || "",  // Convert to string
      benefits_summary: proposal.benefitsSummary?.[0]?.text || "",  // Convert to string
      next_steps: proposal.nextSteps,
      signature: proposal.signature,
    };

    // if (proposalToEdit) {
    //   updateProposal(proposalData);
    // } else {
    //   createProposal(proposalData);
    // }
     // Dispatch the createProposal action to create the proposal
     dispatch(createProposal(proposalData));
     navigate(`/dashboard/crm/proposals`);

    setProposal({
      id: "",
      title: "",
      companyName: "",
      logo: "",
      submissionDate: "",

      clientName: "",
      clientDetails: "",
      companyIntroduction: "",

      purpose: "",
      summary: "",
      problem: "",
      solution: "",

      servicesDescription: "",
      deliverables: "",
      milestones: "",

      estimatedCompletion: "",
      costBreakdown: "",
      paymentTerms: "",

      contractDetails: [{ text: "" }],
      legalTerms: [{ text: "" }],
      benefitsSummary: [{ text: "" }],
      // features: [{ text: "" }],
      // professionalRedesign: "",
    });
  };



  const handleExportPDF = () => {
    const doc = new jsPDF();
  let yPosition = 20; // Initial position for text, starting from 20

  // Helper function to add text to the PDF at the current Y position
  const addTextContent = (text) => {
    // Ensure the text is a string and is not undefined or null
    text = text || ''; // Fallback to empty string if it's null or undefined
    doc.text(20, yPosition, text);
    yPosition += 10; // Move down for the next line of text
  };


    // Add Proposal Details
    addTextContent(`Proposal Title: ${proposal.title}`);
    addTextContent(`Client Name: ${proposal.clientName}`);
    addTextContent(`Company: ${proposal.companyName}`);
    addTextContent(`Submission Date: ${proposal.submissionDate}`);
    addTextContent(`Purpose: ${proposal.purpose}`);
    addTextContent(`Summary: ${proposal.summary}`);
    addTextContent(`Problem: ${proposal.problem}`);
    addTextContent(`Solution: ${proposal.solution}`);
    addTextContent(`Cost Breakdown: ${proposal.costBreakdown}`);
    addTextContent(`Payment Terms: ${proposal.paymentTerms}`);

    // Add Sections that are Arrays of Objects (contractDetails, legalTerms, benefitsSummary)
    const addDetailsSection = (sectionTitle, sectionArray) => {
      if (sectionArray && sectionArray.length > 0) {
        addTextContent(`${sectionTitle}:`);
        sectionArray.forEach((item, index) => {
          addTextContent(`${index + 1}. ${item.text}`);
        });
      }
    };

    // Adding contractDetails, legalTerms, benefitsSummary sections
    addDetailsSection("Contract Details", proposal.contractDetails);
    addDetailsSection("Legal Terms", proposal.legalTerms);
    addDetailsSection("Benefits Summary", proposal.benefitsSummary);

    // Optional: Add more sections if needed
    // Example:
    // addDetailsSection("Features", proposal.features);

    // If letterhead is uploaded, process image
    if (proposal.letterhead) {
      const reader = new FileReader();
      reader.onload = () => {
        doc.addImage(reader.result, "JPEG", 10, 10, 180, 50);
        addTextContent(); // Add text after the image is loaded
      };
      reader.readAsDataURL(proposal.letterhead);
    } else {
      addTextContent(); // Directly add text if no image
    }
    // Finalize the PDF generation
    doc.save("proposal.pdf");
  };

  return (
    <Container component={Paper} elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {updateProposal ? "update Proposal" : "Create Proposal"}
      </Typography>

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered>
        <Tab label="Basic Info" />
        <Tab label="Details" />
        <Tab label="Finalization" />
        <Tab label="Additional Features" />
      </Tabs>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        {tabIndex === 0 && (
          <>
            <TextField fullWidth label="Proposal Title" name="title" value={proposal.title} onChange={handleChange} required margin="normal" />
            <TextField fullWidth label="Company Name" name="companyName" value={proposal.companyName} onChange={handleChange} required margin="normal" />
            <TextField fullWidth type="date" label="Date of Submission" name="submissionDate" value={proposal.submissionDate} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />
          </>
        )}

        {tabIndex === 1 && (
          <>
            <TextField fullWidth label="Client Name" name="clientName" value={proposal.clientName} onChange={handleChange} required margin="normal" />
            <TextField fullWidth label="Client Details" name="clientDetails" value={proposal.clientDetails} onChange={handleChange} required margin="normal" multiline rows={4} />
            <TextField fullWidth label="Company Introduction" name="companyIntroduction" value={proposal.companyIntroduction} onChange={handleChange} required margin="normal" multiline rows={4} />
          </>
        )}

        {tabIndex === 2 && (
          <>

                <TextField
                  fullWidth
                  label="purpose"
                  name="purpose"
                  value={proposal.purpose}
                  onChange={handleChange}
                  // data-index={index}
                  margin="normal"
                  multiline
                  rows={4}
                />
                 <TextField
                  fullWidth
                  label="summary"
                  name="summary"
                  value={proposal.summary}
                  onChange={handleChange}
                  // data-index={index}
                  margin="normal"
                  multiline
                  rows={4}
                />
                 <TextField
                  fullWidth
                  label="problem"
                  name="problem"
                  value={proposal.problem}
                  onChange={handleChange}
                  // data-index={index}
                  margin="normal"
                  multiline
                  rows={4}
                />
                 <TextField
                  fullWidth
                  label="solution"
                  name="solution"
                  value={proposal.solution}
                  onChange={handleChange}
                  // data-index={index}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </>
        )}
        {tabIndex === 3 && (
          <>
            <TextField fullWidth label="servicesDescription" name="servicesDescription" value={proposal.servicesDescription} onChange={handleChange} required margin="normal" />
            <TextField fullWidth label="deliverables" name="deliverables" value={proposal.deliverables} onChange={handleChange} required margin="normal" multiline rows={4} />
            <TextField fullWidth label="milestones" name="milestones" value={proposal.milestones} onChange={handleChange} required margin="normal" multiline rows={4} />
          </>
        )}


{tabIndex === 4 && (
  <>
    <TextField fullWidth label="estimatedCompletion"  type="date" name="estimatedCompletion" value={proposal.estimatedCompletion} onChange={handleChange} required margin="normal"   InputLabelProps={{ shrink: true }}/>
    <TextField fullWidth label="costBreakdown" name="costBreakdown" value={proposal.costBreakdown} onChange={handleChange} required margin="normal" multiline rows={4} />
    <TextField fullWidth label="paymentTerms" name="paymentTerms" value={proposal.paymentTerms} onChange={handleChange} required margin="normal" multiline rows={4} />
  </>
)}

          {tabIndex === 5 && (
          <>
            <TextField
  fullWidth
  label="Contract Details"
  name="contractDetails"
  value={proposal.contractDetails}
  onChange={handleChange}
  required
  margin="normal"
  multiline
  rows={4}
/>
<TextField
  fullWidth
  label="Legal Terms"
  name="legalTerms"
  value={proposal.legalTerms}
  onChange={handleChange}
  required
  margin="normal"
  multiline
  rows={4}
/>
<TextField
  fullWidth
  label="Benefits Summary"
  name="benefitsSummary"
  value={proposal.benefitsSummary}
  onChange={handleChange}
  required
  margin="normal"
  multiline
  rows={4}
/>

          </>
        )}


        <Button type="submit" variant="contained" color="primary" startIcon={<Save />} sx={{ marginTop: 2 }}>
          {updateProposal ? "Update Proposal" : "Submit Proposal"}
        </Button>
        <Button variant="outlined" color="secondary" startIcon={<Print />} sx={{ marginLeft: 2, marginTop: 2 }} onClick={handleExportPDF}>
          Export to PDF
        </Button>
      </form>
    </Container>
  );
};

export default ProposalForm;


