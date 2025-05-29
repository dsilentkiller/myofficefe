

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/delete.css";
import { deleteServiceQuotation,deleteProductQuotation } from "../../../redux/slice/admin/crm/quotationSlice";

const QuotationDelete = ({ id, onClose,quotation_type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if(quotation_type='product'){
    dispatch(deleteProductQuotation(id))
      .unwrap()
      .then(() => {
        toast.success(" product Quotation  deleted successfully!");
        navigate("/dashboard/crm/quotation/product-quotation"); // Adjust this route as needed
      })
      .catch((error) => {
        toast.error(`Failed to delete product quotation: ${error.message}`);
      })
      .finally(() => {
        onClose(); // Close the modal after deletion
      });
    }else if (quotation_type='service'){
      dispatch(deleteServiceQuotation(id))
      .unwrap()
      .then(() => {
        toast.success(" service  Quotation  deleted successfully!");
        navigate("/dashboard/crm/quotation/service-quotation"); // Adjust this route as needed
      })
      .catch((error) => {
        toast.error(`Failed to delete service quotation: ${error.message}`);
      })
      .finally(() => {
        onClose(); // Close the modal after deletion
      });

    }
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
            Are you sure you want to delete this quotation?
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

export default QuotationDelete;

