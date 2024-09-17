// export default DepartmentDelete;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/delete.css";
import { deleteDepartment } from "../../redux/slice/departmentSlice";

const DepartmentDelete = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteDepartment(id))
      .unwrap()
      .then(() => {
        toast.success("department deleted successfully!");
        navigate("/dashboard/setup/department"); // Adjust this route as needed
      })
      .catch((error) => {
        toast.error(`Failed to delete department: ${error.message}`);
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
            Are you sure you want to delete this department?
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

export default DepartmentDelete;
