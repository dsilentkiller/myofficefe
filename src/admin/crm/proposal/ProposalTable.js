import React, { useState, useEffect } from "react";
import GeneralTable from "../../hrm/GeneralTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchProposals, deleteProposal } from "../../redux/slice/crm/proposalSlice";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProposalDelete from "./ProposalDelete"; // Import your delete confirmation modal

const ProposalTable = () => {
  const dispatch = useDispatch();
  // ProposalTable.js

  useEffect(() => {
    console.log('Dispatching fetchProposals...');
    dispatch(fetchProposals());  // This should trigger the action to fetch proposals when the component mounts
  }, [dispatch]);

  const proposals = useSelector((state) => state.proposals?.proposals || []);  // Safe access with fallback
  console.log('Proposals from Redux:', proposals);  // Check what data is in Redux

// console.log('Complete Redux State:', useSelector((state) => state));  // Log the entire Redux state
const state = useSelector((state) => state); // This will give you the entire state
console.log('Complete Redux State:', state);

console.log('Proposals from Redux:', proposals);  // Check what data is in Redux
useEffect(() => {
  console.log('Component mounted, fetching proposals...');
  dispatch(fetchProposals());
}, [dispatch]);



  const navigate = useNavigate();
  const [proposalToDelete, setProposalToDelete] = useState(null); // Store the proposal id to delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
  useEffect(() => {
    console.log('Fetched Proposals:', proposals); // Log to check if data is fetched correctly
  }, [proposals]);



  const formattedProposals = proposals.map((proposal, index) => ({
    ...proposal,
    index: index + 1, // Add the index dynamically
  }));

  console.log('Formatted Proposals:', formattedProposals);  // Check this log

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/proposals/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setProposalToDelete(rowData.id); // Set the proposal to delete
      setIsDeleteModalOpen(true); // Open the delete confirmation modal
    } else if (actionKey === "view") {
      navigate(`/proposals/detail/${rowData.id}`);
    }
  };

  const handleAdd = () => {
    navigate('/dashboard/crm/proposal/create');
  };

  const handleEdit = (proposal) => {
    navigate(`/dashboard/crm/proposal/update/${proposal.id}/`);
  };

  const handleView = (proposal) => {
    navigate(`/dashboard/crm/proposal/detail/${proposal.id}/`);
  };

  const handleDelete = (proposal) => {
    setProposalToDelete(proposal.id); // Store the proposal ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  return (
    <div className="content-wrapper">
      <GeneralTable
        title="Proposals"
        sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}
        data={formattedProposals}
        columns={[
          { label: "#", field: "index" },
          { label: "Title", field: "title", sortable: true },
          { label: "Company Name", field: "company_name" },
          { label: "Client Name", field: "client_name" },
          // { label: "Status", field: "status" },
        ]}
        actions={[
          { label: "Edit", icon: <Edit />, key: "edit" },
          { label: "Delete", icon: <Delete />, key: "delete" },
          { label: "View", icon: <Visibility />, key: "view" },
        ]}
        onRowAction={(actionKey, rowData) => handleRowAction(actionKey, rowData)}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      {/* Add a class to the table header */}
      <style>
        {`
          .MuiTableHead-root {
            position: sticky;
            top: 0;
            background-color: violet;
            z-index: 10;
            color: white;
          }
        `}
      </style>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ProposalDelete
          id={proposalToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => dispatch(deleteProposal(proposalToDelete))}
        />
      )}
    </div>
  );
};

export default ProposalTable;
