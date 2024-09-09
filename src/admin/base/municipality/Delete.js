// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMunicipality,
//   deleteMunicipality,
// } from "../../redux/slice/municipalitySlice";
// import { Link } from "react-router-dom";
// import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
// import { toast } from "reactstrap";
// const MunicipalityList = () => {
//   const dispatch = useDispatch();
//   const {
//     list: municipalities,
//     isLoading,
//     error,
//   } = useSelector((state) => state.municipalities);

//   useEffect(() => {
//     dispatch(fetchMunicipality());
//   }, [dispatch]);

//   // Handler to delete a municipality
  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this municipality?")) {
  //     dispatch(deleteMunicipality(id));
  //   }
  // };
//   // Handler to delete a municipality
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this municipality?")) {
//       dispatch(deleteMunicipality(id))
//         .unwrap()
//         .then(() => {
//           toast.success("Municipality deleted successfully!");
//         })
//         .catch((error) => {
//           toast.error(`Failed to delete municipality: ${error.message}`);
//         });
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Municipality List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Municipality</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="search"
//                     className="form-inline ml-3"
//                   >
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="q"
//                         className="form-control"
//                         placeholder="Search..."
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
//                     <li className="nav-item">
//                       <button
//                         id="municipalityTable"
//                         className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i className="fas fa-file-csv"></i>
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
//               <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div className="overflow-x-auto">
//                         {isLoading ? (
//                           <p>Loading...</p>
//                         ) : error ? (
//                           <p>Error: {error}</p>
//                         ) : (
//                           <table className="table table-bordered">
//                             <thead>
//                               <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Created</th>
//                                 <th>Updated</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {municipalities.length > 0 ? (
//                                 municipalities.map((municipality) => (
//                                   <tr key={municipality.id}>
//                                     <td>{municipality.id}</td>
//                                     <td>{municipality.name}</td>
//                                     <td>{municipality.created}</td>
//                                     <td>{municipality.updated}</td>
//                                     <td>
//                                       <Link to={`update/${municipality.id}`}>
//                                         <FaEdit />
//                                       </Link>
//                                       |
//                                       <FaTrash
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() =>
//                                           handleDelete(municipality.id)
//                                         }
//                                       />
//                                     </td>
//                                   </tr>
//                                 ))
//                               ) : (
//                                 <tr>
//                                   <td colSpan="5">No municipalities found</td>
//                                 </tr>
//                               )}
//                             </tbody>
//                           </table>
//                         )}
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

// export default MunicipalityList;
