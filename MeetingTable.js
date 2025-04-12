import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMeetings,
  deleteMeeting,
} from "../../redux/slice/crm/meetingSlice";
import GeneralTable from "../../hrm/GeneralTable";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MeetingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meetings = useSelector((state) => state.meeting?.list || []);

  console.log("meeting data", meetings);

  useEffect(() => {
    dispatch(fetchMeetings());
  }, [dispatch]);

  // Safeguard against empty listarray or undefined
  const formattedMeetings = meetings.map((meeting, index) => ({
    ...meeting,
    index: index + 1,
  }));

  // Get the list from the Redux state with safe default for `list`
  // const meetingState = useSelector((state) => state.meetings || {});
  // const { list , isLoading = false, error = null } = meetingState;

  // console.log("meeting list:", list);

  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/meeting/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setProjectToDelete(rowData.id); // Set the meeting to delete
      setIsDeleteModalOpen(true); // Open the delete confirmation modal
    } else if (actionKey === "view") {
      navigate(`/meeting/detail/${rowData.id}`);
    }
  };

  const handleAdd = () => {
    navigate("/dashboard/crm/meeting/create");
  };

  const handleEdit = (meeting) => {
    navigate(`/dashboard/crm/meeting/update/${meeting.id}/`);
  };

  const handleView = (meeting) => {
    navigate(`/dashboard/crm/meeting/detail/${meeting.id}/`);
  };
  // This is the function for deleting a meeting
  const handleDelete = (meeting) => {
    setProjectToDelete(meeting.id); // Store the meeting ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  // const handleRowAction = (actionKey, rowData) => {
  //   if (actionKey === "edit") {
  //     navigate(`/meeting/edit/${rowData.id}`);
  //   } else if (actionKey === "delete") {
  //     setMeetingToDelete(rowData.id);
  //     setIsDeleteModalOpen(true);
  //   } else if (actionKey === "view") {
  //     navigate(`/meeting/detail/${rowData.id}`);
  //   }
  // };
  // const handleConfirmDelete = () => {
  //   dispatch(deleteMeeting({ meetingId: meetingToDelete }));
  //   setIsDeleteModalOpen(false);
  //   toast.success("Meeting update deleted successfully!");
  // };

  // const handleAdd = () => {
  //   navigate("/dashboard/crm/meeting/create");
  // };

  return (
    <>
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

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
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
    </>
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
//   // const { list: list, loading } = useSelector((state) => state.list);
//   const { list, isLoading, error } = useSelector((state) => state.list);
//   console.log('meeting----',list)

//   const [meetingToDelete, setMeetingToDelete] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   // Dispatch fetch action when eventId changes
//   // const { list, isLoading, error } = useSelector((state) => state.list);

//   useEffect(() => {
//     dispatch(fetchMeetings(eventId));
//   }, [dispatch, eventId]);

//   const handleDelete = (meetingId) => {
//     dispatch(deleteMeeting({ meetingId }));
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

//   const formattedMettings = list.map((meeting, index) => ({
//     ...list,
//     index: index + 1,
//   }));

//   // Show loading message if data is still being fetched
//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }
//   return (

//   // Show message if there are no meeting updates
//   // if (list.length === 0) {
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
