import GeneralTable from "../GeneralTable"; // Import the reusable table
import React, { useState, useEffect } from "react";
// import GeneralTable from "../../hr
// m/GeneralTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeave, deleteLeave } from "../../../redux/slice/admin/hrm/leaveSlice";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import LeaveDelete from "./LeaveDelete"; // Import your delete confirmation modal

const LeaveList = () => {

  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves.list || []);
  const navigate = useNavigate();
  const [leaveToDelete, setLeaveToDelete] = useState(null); // Store the leave id to delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
  const columns = [
    { label: "#", key: "id" },
    { label: "Start Date", key: "start_date" },
    { label: "End Date", key: "end_date" },
    { label: "Category", key: "leave_category" },
    { label: "Period", key: "leave_period" },
    { label: "Status", key: "status" },
    { label: "Allocated Day", key: "allocated_day" },
    { label: "Approved", key: "is_approved" },
    { label: "Default Days", key: "default_days" },
    { label: "Reason", key: "reason" },
  ];

  useEffect(() => {
    dispatch(fetchLeave());
  }, [dispatch]);

  const formattedLeaves = leaves.map((leave, index) => ({
    ...leave,
    index: index + 1, // Add the index dynamically
  }));

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/leaves/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setLeaveToDelete(rowData.id); // Set the leave to delete
      setIsDeleteModalOpen(true); // Open the delete confirmation modal
    } else if (actionKey === "view") {
      navigate(`/leaves/detail/${rowData.id}`);
    }
  };



  const handleAdd = () => {
    navigate('/dashboard/hrm/leave/create');
  };

  const handleEdit = (leave) => {
    navigate(`/dashboard/hrm/leave/update/${leave.id}/`);
  };

  const handleView = (leave) => {
    navigate(`/dashboard/hrm/leave/detail/${leave.id}/`);
  };
  // This is the function for deleting a leave
  const handleDelete = (leave) => {

    setLeaveToDelete(leave.id); // Store the leave ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };



  const exportOptions = {
    CSV: () => console.log("Export CSV"),
    PDF: () => console.log("Export PDF"),
  };

  return (
    <div className="content-wrapper">
      <div className="table-container">
       <div className="table-wrapper">
          <table className="table table-bordered">
      <GeneralTable
        columns={columns}
        data={formattedLeaves}
        actions={[
                  { label: "Edit", icon: <Edit />, key: "edit" },
                  { label: "Delete", icon: <Delete />, key: "delete" },
                  { label: "View", icon: <Visibility />, key: "view" },
                ]}
                onRowAction={(actionKey, rowData) => handleRowAction(actionKey, rowData)}

                onEdit={handleEdit}
                onView={handleView}
                onDelete= {handleDelete}
                onAdd={handleAdd}

        exportOptions={exportOptions}
      />
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <LeaveDelete
          id={leaveToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />

      )}
      </table>
      </div>
      </div>
    </div>
  );
};

export default LeaveList;



// import React from "react";
// import { Link } from "react-router-dom";
// const LeaveList = ({ leaves = [] }) => {
//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Leave List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Leave</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/leave/search"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>

//                 <div className="form-inline ml-4" id="navbarSupportedContent">
//                   <ul className="navbar-nav mr-30">
//                     <li className="nav-item ">
//                       <button
//                         id="LeaveTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                         {/* Font Awesome icon for CSV */}
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         <table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>start_date</th>
//                               <th>end_date</th>
//                               <th>leave_category</th>
//                               <th>leave_period</th>
//                               <th>status</th>
//                               <th>allocated_day</th>
//                               <th>is_approved</th>
//                               <th>default_days</th>
//                               <th>reason</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {leaves.length > 0 ? (
//                               leaves.map((leave) => (
//                                 <tr key={leave.id}>
//                                   <td>{leave.id}</td>
//                                   <td>{leave.name}</td>
//                                   <td>{leave.start_date}</td>
//                                   <td>{leave.end_date}</td>
//                                   <td>{leave.leave_category}</td>
//                                   <td>{leave.leave_period}</td>
//                                   <td>{leave.status}</td>
//                                   <td>{leave.allocated_day}</td>
//                                   <td>{leave.is_approved}</td>
//                                   <td>{leave.default_days}</td>
//                                   <td>{leave.reason}</td>

//                                   <td>
//                                     <Link to={`/leave/update/${leave.id}`}>
//                                       Edit
//                                     </Link>
//                                     |
//                                     <Link to={`/leave/detail/${leave.id}`}>
//                                       View
//                                     </Link>
//                                     |
//                                     <Link to={`/leave/delete/${leave.id}`}>
//                                       Delete
//                                     </Link>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="8">No Leaves found</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveList;
