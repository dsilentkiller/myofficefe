import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeetings, deleteMeeting } from "../../redux/slice/crm/meetingSlice";
import GeneralTable from "../../hrm/GeneralTable";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MeetingTable = ({ eventId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the meetings from the Redux state with safe default for `meetings`
  const { meetings = [], isLoading, error } = useSelector((state) => state.meetings);
  console.log("meetings:", meetings);

  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchMeetings(eventId));
    }
  }, [dispatch, eventId]);

  const handleDelete = (meetingId) => {
    dispatch(deleteMeeting({ eventId, meetingId }));
  };

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/meeting/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setMeetingToDelete(rowData.id);
      setIsDeleteModalOpen(true);
    } else if (actionKey === "view") {
      navigate(`/meeting/detail/${rowData.id}`);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteMeeting(meetingToDelete));
    setIsDeleteModalOpen(false);
    toast.success("Meeting update deleted successfully!");
  };

  const handleAdd = () => {
    navigate('/dashboard/crm/meeting/create');
  };

  // Safeguard against empty meetings array or undefined
  const formattedMeetings = meetings.map((meeting, index) => ({
    ...meeting,
    index: index + 1,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (meetings.length === 0) {
    return <div>No meeting updates available for this event.</div>;
  }

  return (
    <div className="col-md-12">
      <GeneralTable
        title="Meeting Updates"
        data={formattedMeetings}
        columns={[
          { label: "#", field: "index" },
          { label: "Title", field: "title", sortable: true },
          { label: "Conclusion", field: "conclusion" },
          { label: "Follow-up By", field: "followup_by" },
          { label: "Follow-up Due Date", field: "followup_due_date" },
          { label: "Remark", field: "remark" },
          { label: "Status", field: "status" },
        ]}
        actions={[
          { label: "Edit", icon: <Edit />, key: "edit" },
          { label: "Delete", icon: <Delete />, key: "delete" },
          { label: "View", icon: <Visibility />, key: "view" },
        ]}
        onRowAction={handleRowAction}
        onAdd={handleAdd}
      />

      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this meeting update?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingTable;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchMeetings, deleteMeeting} from "../../redux/slice/crm/meetingUpdateSlice";
// import { fetchMeetings, deleteMeeting} from "../../redux/slice/crm/meetingSlice";
// import GeneralTable from "../../hrm/GeneralTable";
// import { Edit, Delete, Visibility } from "@mui/icons-material";
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { FaTrash, FaEdit } from "react-icons/fa";
// // import { fetchMeetings} from "../../redux/slice/crm/meetingSlice";

// const MeetingTable = ({ eventId }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get the state from Redux
//   // const { list: meetings, loading } = useSelector((state) => state.meetings);
//   const { meetings, isLoading, error } = useSelector((state) => state.meetings);
//   console.log('meeting----',meetings)

//   const [meetingToDelete, setMeetingToDelete] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   // Dispatch fetch action when eventId changes
//   // const { meetings, isLoading, error } = useSelector((state) => state.meetings);

//   useEffect(() => {
//     dispatch(fetchMeetings(eventId));
//   }, [dispatch, eventId]);

//   const handleDelete = (meetingId) => {
//     dispatch(deleteMeeting({ eventId, meetingId }));
//   };

//   const handleRowAction = (actionKey, rowData) => {
//     if (actionKey === "edit") {
//       navigate(`/meeting/edit/${rowData.id}`);
//     } else if (actionKey === "delete") {
//       setMeetingToDelete(rowData.id);
//       setIsDeleteModalOpen(true);
//     } else if (actionKey === "view") {
//       navigate(`/meeting/detail/${rowData.id}`);
//     }
//   };

//   const handleConfirmDelete = () => {
//     dispatch(deleteMeeting(meetingToDelete));
//     setIsDeleteModalOpen(false);
//     toast.success("Meeting update deleted successfully!");
//   };

//   const handleAdd = () => {
//     navigate('/dashboard/crm/meeting/create');
//   };

//   const formattedMettings = meetings.map((meeting, index) => ({
//     ...meetings,
//     index: index + 1,
//   }));

//   // Show loading message if data is still being fetched
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }
//   return (


//   // Show message if there are no meeting updates
//   // if (meetings.length === 0) {
//   //   return <div>No meeting updates available for this event.</div>;
//   // }
//     <div className="col-md-12">
//       <GeneralTable
//         title="Meeting Updates"
//         data={formattedMettings}
//         columns={[
//           { label: "#", field: "index" },
//           { label: "Title", field: "title", sortable: true },
//           { label: "Conclusion", field: "conclusion" },
//           { label: "Follow-up By", field: "followup_by" },
//           { label: "Follow-up Due Date", field: "followup_due_date" },
//           { label: "Remark", field: "remark" },
//           { label: "Status", field: "status" },
//         ]}
//         actions={[
//           { label: "Edit", icon: <Edit />, key: "edit" },
//           { label: "Delete", icon: <Delete />, key: "delete" },
//           { label: "View", icon: <Visibility />, key: "view" },
//         ]}
//         onRowAction={handleRowAction}
//         onAdd={handleAdd}
//       />

//       <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this meeting update?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDeleteModalOpen(false)} color="primary">Cancel</Button>
//           <Button onClick={handleConfirmDelete} color="secondary">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default MeetingTable;
