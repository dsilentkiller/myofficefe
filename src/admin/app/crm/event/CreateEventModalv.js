

// import React, { useState } from "react";
// import ReactModal from "react-modal";
// import Select from "react-select";
// import moment from "moment";

// const CreateEventModal = ({
//   modalOpen,
//   closeModal,
//   handleEventSubmit,
//   selectedEvent,
//   newEvent,
//   setNewEvent,
//   attendeesOptions,
// }) => {
//   return (
//     <ReactModal
//       isOpen={modalOpen}
//       onRequestClose={closeModal}
//       ariaHideApp={false}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header bg-primary">
//             <h4 className="modal-title">
//               {selectedEvent ? "Update Event" : "Create Event"}
//             </h4>
//             <button
//               type="button"
//               className="close"
//               onClick={closeModal}
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleEventSubmit}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="title"
//                   placeholder="Event Title"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Start Time</label>
//                   <input
//                     type="datetime-local"
//                     className="form-control"
//                     name="start"
//                     value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//                     onChange={(e) =>
//                       setNewEvent({ ...newEvent, start: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>End Time</label>
//                   <input
//                     type="datetime-local"
//                     className="form-control"
//                     name="end"
//                     value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//                     onChange={(e) =>
//                       setNewEvent({ ...newEvent, end: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Attendees</label>
//                 <Select
//                   isMulti
//                   options={attendeesOptions}
//                   value={newEvent.attendees}
//                   onChange={(selected) =>
//                     setNewEvent({ ...newEvent, attendees: selected })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   placeholder="Attendee Email"
//                   value={newEvent.email}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="notes"
//                   placeholder="Notes"
//                   value={newEvent.notes}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, notes: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="modal-footer justify-content-between">
//                 <button type="submit" className="btn btn-primary">
//                   {selectedEvent ? "Update Event" : "Create Event"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </ReactModal>
//   );
// };

// export default CreateEventModal;

// // CreateEventModal.js
// import React, { useState } from "react";

// const CreateEventModal = ({ modalOpen, closeModal, onEventSubmit }) => {
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: "",
//     end: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onEventSubmit(newEvent);
//     setNewEvent({ title: "", start: "", end: "" });
//     closeModal();
//   };

//   return (
//     <>
//       {modalOpen && (
//         <div
//           className="modal fade show"
//           role="dialog"
//           style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create New Event</h5>
//                 <button type="button" className="close" onClick={closeModal}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label>Event Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, title: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Start Date and Time</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       value={newEvent.start}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, start: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>End Date and Time</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       value={newEvent.end}
//                       onChange={(e) =>
//                         setNewEvent({ ...newEvent, end: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button type="submit" className="btn btn-primary">
//                       Create Event
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={closeModal}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreateEventModal;
