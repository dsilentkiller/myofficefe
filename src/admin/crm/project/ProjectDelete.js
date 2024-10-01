// export default ProjectDelete;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/delete.css";
import { deleteProject } from "../../redux/slice/crm/projectSlice";

const ProjectDelete = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteProject(id))
      .unwrap()
      .then(() => {
        toast.success("Project  deleted successfully!");
        navigate("/dashboard/crm/project"); // Adjust this route as needed
      })
      .catch((error) => {
        toast.error(`Failed to delete project: ${error.message}`);
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
            Are you sure you want to delete this project?
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

export default ProjectDelete;
