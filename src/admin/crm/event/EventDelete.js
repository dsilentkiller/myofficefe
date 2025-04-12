import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEvent } from "../../redux/slice/crm/eventSlice";

const EventDelete = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id) {
      toast.error("Event ID is undefined. Cannot delete.");
      return; // Exit early if no id is provided
    }

    try {
      await dispatch(deleteEvent(id)).unwrap(); // Await the deletion and handle the promise
      toast.success("Event deleted successfully!");
      navigate("/dashboard/crm/event"); // Navigate back to EventSystem after deletion
    } catch (error) {
      toast.error(`Failed to delete event: ${error.message}`);
    } finally {
      onClose(); // Close the modal regardless of success or error
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this event?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
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

export default EventDelete;

// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { deleteEvent } from "../../redux/slice/crm/eventSlice"; // Ensure this is the correct path
// import "../../css/delete.css"; // Ensure this file contains proper CSS

// const EventDelete = ({ id, onClose }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     if (!id) {
//       toast.error("Event ID is undefined. Cannot delete.");
//       return; // Exit early if no id is provided
//     }

//     try {
//       await dispatch(deleteEvent(id)).unwrap(); // Await the deletion and handle the promise
//       toast.success("Event deleted successfully!");
//       navigate("/dashboard/crm/event"); // Navigate back to EventSystem (events list) after deletion
//     } catch (error) {
//       toast.error(`Failed to delete event: ${error.message}`); // Show error message
//     } finally {
//       onClose(); // Close the modal regardless of success or error
//     }
//   };

//   return (
//     <div
//       className={`modal fade ${id ? "show" : ""}`}
//       id="deleteModal"
//       tabIndex="-1"
//       role="dialog"
//       aria-labelledby="deleteModalLabel"
//       aria-hidden={!id}
//       style={{ display: id ? "block" : "none" }}
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="deleteModalLabel">
//               Confirm Deletion
//             </h5>
//             <button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-label="Close"
//               onClick={onClose}
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             Are you sure you want to delete this event?
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-dismiss="modal"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={handleDelete}
//             >
//               Yes, Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDelete;
