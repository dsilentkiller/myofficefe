import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteDesignation,
  deleteError,
  deleteStatus,
} from "../../redux/slice/designationSlice";
import { toast } from "react-toastify";
import "../../css/delete.css"; // Ensure this file contains proper CSS
const DeleteDesignation = ({ id, onClose }) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteStatus = useSelector((state) => state.Designations.deleteStatus);
  const deleteError = useSelector((state) => state.Designations.deleteError);

  const handleDelete = () => {
    dispatch(deleteDesignation(id))
      .unwrap() // Ensure you're using unwrap() to handle promise rejections
      .then(() => {
        toast.success("Designation deleted successfully!");
        navigate("/dashboard/setup/designation");
      })
      .catch((error) => {
        toast.error(`Failed to delete Designation: ${error.message}`);
      })
      .finally(() => {
        onClose(); // Close the modal after deletion
      });
  };

  return (
    <div
      className={`modal fade ${id ? "show" : ""}`}
      id="deleteModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden={!id}
      style={{ display: id ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              Confirm Deletion
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this Designation?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDesignation;
