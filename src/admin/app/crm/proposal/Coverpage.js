import React from "react";

const CoverPage = ({ proposal }) => {
  return (
    <div className="container mt-4 p-3 border bg-light rounded">
      <h2 className="text-center">Proposal Cover Page</h2>
      <h4>{proposal.title}</h4>
      <p><strong>Company Name:</strong> {proposal.companyName}</p>
      <p><strong>Date of Submission:</strong> {proposal.date}</p>
      <p><strong>Client Name:</strong> {proposal.clientName}</p>
      <p><strong>Client Details:</strong> {proposal.clientDetails}</p>
    </div>
  );
};

export default CoverPage;
