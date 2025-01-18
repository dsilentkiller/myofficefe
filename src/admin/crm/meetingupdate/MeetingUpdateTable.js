import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMeetingUpdate,
  // updateMeetingUpdate,
  deleteMeetingUpdate,
  // updateStatus,
  // updateError,
} from "../../redux/slice/crm/meetingUpdateSlice";
import GeneralTable from "../../hrm/GeneralTable";
import "../../css/Table.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { Edit, Delete, Visibility } from "@mui/icons-material";
// import { MeetingUpdateTable } from '../meetingupdate/MeetingUpdateTable';


const MeetingUpdateTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetingupdates = useSelector((state) => state.meetingupdates.list || []);
  const [meetingUpdateToDelete, setMeetingUpdateToDelete] = useState(null); // Store the meetingupdate id to delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
  const [formData, setFormData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const meetingupdate = useSelector((state) => state.meetingupdate?.list || []);

  const updateStatus = useSelector(
    (state) => state.meetingupdate?.updateStatus
  );
  const updateError = useSelector((state) => state.meetingupdate?.updateError);
  const deleteStatus = useSelector(
    (state) => state.meetingupdate?.deleteStatus
  );
  const deleteError = useSelector((state) => state.meetingupdate?.deleteError);
  const createError = useSelector((state) => state.meetingupdate?.createError);
  const createStatus = useSelector(
    (state) => state.meetingupdate?.createStatus
  );

  useEffect(() => {
    dispatch(fetchMeetingUpdate());
  }, [dispatch]);

const formattedMettingUpdates = meetingupdates.map((meetingupdate, index) => ({
    ...meetingupdate,
    index: index + 1, // Add the index dynamically
  }));

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/meetingupdate/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
     meetingupdate(rowData.id); // Set the meetingupdate to delete
      setIsDeleteModalOpen(true); // Open the delete confirmation modal
    } else if (actionKey === "view") {
      navigate(`/meetingupdate/detail/${rowData.id}`);
    }
  };

  const handleAdd = () => {
    navigate('/dashboard/crm/meetingupdate/create');
  };

  const handleEdit = (meetingupdate) => {
    navigate(`/dashboard/crm/meetingupdate/update/${meetingupdate.id}/`);
  };

  const handleView = (meetingupdate) => {
    navigate(`/dashboard/crm/meetingupdate/detail/${meetingupdate.id}/`);
  };
  // This is the function for deleting a meetingupdate
  const handleDelete = (meetingupdate) => {
       meetingupdate(meetingupdate.id); // Store the meetingupdate ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };


  useEffect(() => {
    const notify = (status, successMsg, errorMsg) => {
      if (status === "succeeded") {
        toast.success(successMsg);
      } else if (status === "failed" || errorMsg) {
        toast.error(errorMsg || "An error occurred.");
      }
    };

    notify(updateStatus, "meetingupdate updated successfully!", updateError);
    notify(deleteStatus, " meetingupdate deleted successfully!", deleteError);
    notify(createStatus, "meetingupdate  created successfully!", createError);
  }, [
    updateStatus,
    updateError,
    deleteStatus,
    deleteError,
    createStatus,
    createError,
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  //--converting first letter  capital
  const formatName = React.useCallback((name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }, []);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("meeting update created successfully!");
      setFormData({
        title: "",
        conclusion: "",
        followup_by: "",
        followup_due_date: "",
        remark: "",
        status:"",
      }); // Reset form after successful creation
      navigate("/dashboard/crm/meeting-update");
    } else if (createStatus === "failed") {
      toast.error(`Error: ${createError || "An error occurred"}`);
    }
  }, [createStatus, createError, navigate]);

  // const exportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(meetingupdate);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "meeting update");
  //   XLSX.writeFile(workbook, "meeting update.xlsx");
  // };

  // const exportPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("meetingupdate List", 10, 10);

  //   autoTable(doc, {
  //     head: [
  //       [
  //         "title",
  //         "conclusion",
  //         "followup_by",
  //         "followup_due_date",
  //         "remark",
  //       ],
  //     ],
  //     body: meetingupdate.map((meetingupdate) => [
  //       meetingupdate.title,
  //       meetingupdate.conclusion,
  //       meetingupdate.followup_by,
  //       meetingupdate.followup_due_date,
  //       meetingupdate.remark,
  //       meetingupdate.status,
  //     ]),
  //   });

  //   doc.save("meetingupdate.pdf");
  // };

  return (
    // <div className="content-wrapper">
      <div className="col-md-12">
      <GeneralTable
        title="meetingupdates"
        data={formattedMettingUpdates}
        columns={[
          { label: "#", field: "index" },
          { label: "title", field: "title", sortable: true },
          { label: "conclusion", field: "conclusion" },
          { label: "followup by", field: "followup_by" },
          { label: "followup due date", field: "followup_due_date" },
          { label: "remark", field: "remark" },
          { label: "status", field: "status" },
        ]}
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
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <meetingupdateDelete
          id={meetingUpdateToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
   </div>
  //  </div>
  );
};

export default MeetingUpdateTable;

        {/* <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Meeting update Table</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-info">
                    <h5>Add meeting update</h5>
                  </Link>
                  <form className="form-inline ml-3">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search meetingupdate..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => exportExcel()}
                        >
                          Export Excel
                        </button>
                        <button
                          type="button"
                          className="btn btn-info ml-2"
                          onClick={() => exportPDF()}
                        >
                          Export PDF
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>title</th>
                            <th>conclusion</th>
                            <th>followup_by</th>
                            <th>follow up due date </th>
                            <th>remark</th>
                            {/* <th>Status</th> */}
                            {/* <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meetingupdate.length > 0 ? (
                            meetingupdate.map((meetingupdate, index) => (
                              <tr key={meetingupdate.id}>
                                <td>{index + 1}</td>
                                <td>{meetingupdate.title}</td>
                                <td>{meetingupdate.conclusion}</td>
                                <td>{meetingupdate.followup_by}</td>
                                <td>{meetingupdate.followup_due_date}</td>
                                <td>{meetingupdate.remark}</td> */}
                                {/* <td>{meetingupdate.status}</td> */}
                                {/* <td>
                                  <Link
                                    to={`/meetingupdate/update/${meetingupdate.id}`}
                                  >
                                    <FaEdit /> Edit
                                  </Link>
                                  |
                                  <Link
                                    to={`/meetingupdate/detail/${meetingupdate.id}`}
                                  >
                                    View
                                  </Link>
                                  |
                                  <Link
                                    to={`/meetingupdate/delete/${meetingupdate.id}`}
                                  >
                                    <FaTrash /> Delete
                                  </Link>
                                </td> */}
                              {/* </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7">No meetingupdate found</td>
                            </tr>
                          )} */}
                        {/* </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div>  */}
      {/* </div> */}
    {/* </div>
  );
};

export default MeetingUpdateTable; */}

//####### old table ###########
// import { Link } from "react-router-dom";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMeetingUpdate,
//   // updateMeetingUpdate,
//   // deleteMeetingUpdate,
//   // updateStatus,
//   // updateError,
// } from "../../redux/slice/crm/meetingUpdateSlice";
// import "../../css/Table.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import autoTable from "jspdf-autotable";
// import { useNavigate } from "react-router-dom";
// // import { MeetingUpdateTable } from '../meetingupdate/MeetingUpdateTable';


// const MeetingUpdateTable = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const meetingupdate = useSelector((state) => state.meetingupdate?.list || []);
//   // console.log(meetingupdate);
//   const updateStatus = useSelector(
//     (state) => state.meetingupdate?.updateStatus
//   );
//   const updateError = useSelector((state) => state.meetingupdate?.updateError);
//   const deleteStatus = useSelector(
//     (state) => state.meetingupdate?.deleteStatus
//   );
//   const deleteError = useSelector((state) => state.meetingupdate?.deleteError);
//   const createError = useSelector((state) => state.meetingupdate?.createError);
//   const createStatus = useSelector(
//     (state) => state.meetingupdate?.createStatus
//   );
//   useEffect(() => {
//     dispatch(fetchMeetingUpdate());
//   }, [dispatch]);

//   // useEffect(() => {
//   //   if (updateStatus === "succeeded") {
//   //     toast.success("meetingupdate updated successfully!");
//   //   } else if (updateError) {
//   //     toast.error("Failed to update meetingupdate.");
//   //   }
//   //   if (deleteStatus === "succeeded") {
//   //     toast.success("meetingupdate deleted successfully!");
//   //   } else if (deleteError) {
//   //     toast.error("Failed to delete meetingupdate.");
//   //   }
//   // }, [updateStatus, updateError, deleteStatus, deleteError]);

//   useEffect(() => {
//     const notify = (status, successMsg, errorMsg) => {
//       if (status === "succeeded") {
//         toast.success(successMsg);
//       } else if (status === "failed" || errorMsg) {
//         toast.error(errorMsg || "An error occurred.");
//       }
//     };

//     notify(updateStatus, "meetingupdate updated successfully!", updateError);
//     notify(deleteStatus, " meetingupdate deleted successfully!", deleteError);
//     notify(createStatus, "meetingupdate  created successfully!", createError);
//   }, [
//     updateStatus,
//     updateError,
//     deleteStatus,
//     deleteError,
//     createStatus,
//     createError,
//   ]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   //--converting first letter  capital
//   // const formatName = (name) => {
//   //   if (!name) return "";
//   //   return name
//   //     .split(" ")
//   //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//   //     .join(" ");
//   // };
//   const formatName = React.useCallback((name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   }, []);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("meeting update created successfully!");
//       setFormData({
//         title: "",
//         conclusion: "",
//         followup_by: "",
//         followup_due_date: "",
//         remark: "",
//         status:"",
//       }); // Reset form after successful creation
//       navigate("/dashboard/crm/meeting-update");
//     } else if (createStatus === "failed") {
//       toast.error(`Error: ${createError || "An error occurred"}`);
//     }
//   }, [createStatus, createError, navigate]);

//   const exportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(meetingupdate);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "meeting update");
//     XLSX.writeFile(workbook, "meeting update.xlsx");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("meetingupdate List", 10, 10);

//     autoTable(doc, {
//       head: [
//         [
//           " title",
//           "conclusion",
//           " followup_by",
//           "followup_due_date",
//           "  remark",
//         ],
//       ],
//       body: meetingupdate.map((meetingupdate) => [
//         meetingupdate.title,
//         meetingupdate.conclusion,
//         meetingupdate.followup_by,
//         meetingupdate.followup_due_date,
//         meetingupdate.remark,
//         meetingupdate.status,
//       ]),
//     });

//     doc.save("meetingupdate.pdf");
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Meeting update Table</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add meeting update</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         className="form-control"
//                         placeholder="Search meetingupdate..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                       />
//                       <div className="input-group-append">
//                         <button
//                           type="button"
//                           className="btn btn-info"
//                           onClick={() => exportExcel()}
//                         >
//                           Export Excel
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-info ml-2"
//                           onClick={() => exportPDF()}
//                         >
//                           Export PDF
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr>
//                             <th>title</th>
//                             <th>conclusion</th>
//                             <th>followup_by</th>
//                             <th>follow up due date </th>
//                             <th>remark</th>
//                             {/* <th>Status</th> */}
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {meetingupdate.length > 0 ? (
//                             meetingupdate.map((meetingupdate, index) => (
//                               <tr key={meetingupdate.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{meetingupdate.title}</td>
//                                 <td>{meetingupdate.conclusion}</td>
//                                 <td>{meetingupdate.followup_by}</td>
//                                 <td>{meetingupdate.followup_due_date}</td>
//                                 <td>{meetingupdate.remark}</td>
//                                 {/* <td>{meetingupdate.status}</td> */}
//                                 <td>
//                                   <Link
//                                     to={`/meetingupdate/update/${meetingupdate.id}`}
//                                   >
//                                     <FaEdit /> Edit
//                                   </Link>
//                                   |
//                                   <Link
//                                     to={`/meetingupdate/detail/${meetingupdate.id}`}
//                                   >
//                                     View
//                                   </Link>
//                                   |
//                                   <Link
//                                     to={`/meetingupdate/delete/${meetingupdate.id}`}
//                                   >
//                                     <FaTrash /> Delete
//                                   </Link>
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="7">No meetingupdate found</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
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

// export default MeetingUpdateTable;
