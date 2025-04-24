import React, { useState, useEffect } from "react";
import GeneralTable from "../../hrm/GeneralTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollows } from "../../redux/slice/crm/followSlice";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FollowDelete from "../followup/FollowDelete";

const FilterFollowTable = ({ enquiryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [followToDelete, setFollowToDelete] = useState(null);
  const [filteredFollows, setFilteredFollows] = useState([]);

  // Select the follows data from the Redux store
  const { list: follows = [], isLoading, deleteError } = useSelector((state) => state.follows);

  // Fetch the follow data on component mount or when enquiryId changes
  useEffect(() => {
    dispatch(fetchFollows()); // Fetch all follow data
  }, [dispatch]);

  // Filter follows when follows data or enquiryId changes
  useEffect(() => {
    if (follows && enquiryId) {
      console.log("enquiryId:", enquiryId);  // Log the enquiryId
      console.log("follows:", follows);  // Log the entire follows data

      // Add a safeguard for undefined or null follow.enquiry_id
      const filtered = follows.filter(follow => {
        console.log('Comparing follow.enquiry_id:', follow.enquiry_id, 'with enquiryId:', enquiryId);
        return Number(follow.enquiry_id) === Number(enquiryId);
      });

      console.log('Filtered follows:', filtered);  // Log the filtered follows

      setFilteredFollows(filtered);
    }
  }, [follows, enquiryId]);

  // Format filtered follows if necessary (e.g., format date)
  const formattedFollows = filteredFollows.map((follow, index) => ({
    ...follow,
    due_date: new Date(follow.due_date).toLocaleDateString(), // Format date if necessary
  }));

  // Handle row actions for Edit, Delete, and View
  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/follows/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setFollowToDelete(rowData.id);
      setIsDeleteModalOpen(true);
    } else if (actionKey === "view") {
      navigate(`/follows/detail/${rowData.id}`);
    }
  };

  const handleAdd = () => {
    navigate('/dashboard/crm/follow/create');
  };

  const handleEdit = (follow) => {
    navigate(`/dashboard/crm/follow/update/${follow.id}/`);
  };

  const handleView = (follow) => {
    navigate(`/dashboard/crm/follow/detail/${follow.id}/`);
  };

  const handleDelete = (follow) => {
    setFollowToDelete(follow.id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="content-wrapper">
      {/* <div className="col-md-12"> */}
       {/* {filteredFollows.length === 0 ? ( */}
        {/* // <p>No follow-ups available for this enquiry.</p> */}
      {/* // ) : ( */}
      <GeneralTable
        title="Follows"
        data={formattedFollows} // Pass the filtered and formatted follows here
        columns={[
          { label: "#", field: "index" },
          { label: "Customer Name", field: "customer_name", sortable: true },
          { label: "Followed By", field: "follow_by" },
          { label: "Due Date", field: "due_date" },
          { label: "End Date", field: "created" },
          { label: "Status", field: "status" },
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
      {/* )} */}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <FollowDelete
          id={followToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
    // </div>
  );
};

export default FilterFollowTable;


























// import React, { useState, useEffect } from "react";
// import GeneralTable from "../../hrm/GeneralTable";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProject, deleteProject } from "../../redux/slice/crm/projectSlice";
// import { Edit, Delete, Visibility } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // import ProjectDelete from "./ProjectDelete"; // Import your delete confirmation modal
// import { fetchEnquiryById, convertToCustomer, updateEnquiryStatus } from "../../redux/slice/crm/enquirySlice";
// import {FollowupByEnquiryId,fetchFollows} from "../../redux/slice/crm/followSlice";
// import FollowDelete from "../followup/FollowDelete";
// const FilterFollowTable = ({enquiryId}) => {
//   const dispatch = useDispatch();
//   const projects = useSelector((state) => state.projects.list || []);
//   const navigate = useNavigate();
//   // const [projectToDelete, setProjectToDelete] = useState(null); // Store the project id to delete
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
//  const [followToDelete, setFollowToDelete] = useState(null); // Store the follow id to delete
//   // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
//     const [filteredFollows, setFilteredFollows] = useState([]);


// const { selectedEnquiry, loading, error } = useSelector((state) => state.enquiries);
//   // const { follows } = useSelector((state) => state.follows.list || { follows: [] });
//   // console.log('follows',follows)
//   const { list: follows = [], isLoading, deleteError } = useSelector((state) => state.follows || {}); // call all follos data
//   const filtered = follows.filter(follow => Number(follow.enquiry_id) === Number(enquiryId));
//   console.log('filtered1',filtered)
//   useEffect(() => {
//     dispatch(fetchFollows());
//   }, [dispatch]);

//   const formattedFollows =  follows.filter(follow => Number(follow.enquiry_id) === Number(enquiryId))
//   .map((follow, index) => ({
//     ...follow,
//     index: index + 1, // Add the index dynamically
//   }));

//   const handleRowAction = (actionKey, rowData) => {
//     if (actionKey === "edit") {
//       navigate(`/follows/edit/${rowData.id}`);
//     } else if (actionKey === "delete") {
//       // setFollowToDelete(rowData.id); // Set the follow to delete
//       setIsDeleteModalOpen(true); // Open the delete confirmation modal
//     } else if (actionKey === "view") {
//       navigate(`/follows/detail/${rowData.id}`);
//     }
//   };


//   const handleAdd = () => {
//     navigate('/dashboard/crm/follow/create');
//   };

//   const handleEdit = (follow) => {
//     navigate(`/dashboard/crm/follow/update/${follow.id}/`);
//   };

//   const handleView = (follow) => {
//     navigate(`/dashboard/crm/follow/detail/${follow.id}/`);
//   };
//   // This is the function for deleting a follow
//   const handleDelete = (follow) => {

//     setFollowToDelete(follow.id); // Store the follow ID to delete
//     setIsDeleteModalOpen(true); // Open the delete confirmation modal
//   };



//   return (
//     <div className="content-wrapper">
//       <GeneralTable
//         title="follows"
//         data={formattedFollows}
//         columns={[
//           { label: "#", field: "index" },
//           { label: "customer Name", field: "customer_name", sortable: true },
//           { label: "follow by", field: "follow_by" },
//           { label: "due Date", field: "due_date" },
//           { label: "End Date", field: "created" },
//           { label: "Status", field: "status" },
//         ]}
//         actions={[
//           { label: "Edit", icon: <Edit />, key: "edit" },
//           { label: "Delete", icon: <Delete />, key: "delete" },
//           { label: "View", icon: <Visibility />, key: "view" },
//         ]}
//         onRowAction={(actionKey, rowData) => handleRowAction(actionKey, rowData)}

//         onEdit={handleEdit}
//         onView={handleView}
//         onDelete= {handleDelete}
//         onAdd={handleAdd}
//       />

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <FollowDelete
//           id={followToDelete}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={handleDelete}
//         />
//       )}
//     </div>
//   );
// };


// export default FilterFollowTable;
