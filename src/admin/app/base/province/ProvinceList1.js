// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProvince, createProvince } from "../../redux/slice/provinceSlice";
// import "../../../admin/css/Table.css";
// const ProvinceList = () => {
//   const [newProvinceName, setNewProvinceName] = useState("");
//   const dispatch = useDispatch();

//   // Select state from Redux store
//   const {
//     list: provinces,
//     isLoading,
//     error,
//     createStatus,
//     createError,
//   } = useSelector((state) => state.provinces);

//   // Handle form submission
//   const handleAddProvince = (e) => {
//     e.preventDefault();
//     if (newProvinceName.trim() === "") {
//       alert("Please enter a valid province name");
//       return;
//     }
//     dispatch(createProvince({ name: newProvinceName.trim() }));
//     setNewProvinceName(""); // Clear input field after submission
//   };

//   // Fetch provinces when the component mounts
//   useEffect(() => {
//     dispatch(fetchProvince());
//   }, [dispatch]);

//   // Show success or error messages based on status
//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       alert("Province created successfully!");
//       // Optionally refetch the list to include newly created province
//       dispatch(fetchProvince());
//     } else if (createStatus === "failed") {
//       alert(`Error: ${createError?.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError, dispatch]);

//   return (
//     <div className="content-wrapper">
//       <div className="row">
//         <div className="card">
//           <div className="card-header">
//             <h5 className="mx-20">Province List</h5>
//             <div className="text-right">
//               <form onSubmit={handleAddProvince} className="input-group">
//                 <input
//                   type="text"
//                   value={newProvinceName}
//                   onChange={(e) => setNewProvinceName(e.target.value)}
//                   placeholder="Enter province name"
//                   required
//                 />
//                 <button type="submit" disabled={createStatus === "loading"}>
//                   {createStatus === "loading" ? "Adding..." : "Add Province"}
//                 </button>
//               </form>
//               {createStatus === "failed" && (
//                 <p className="error">
//                   Error: {createError?.message || "An error occurred"}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="card-body">
//             {isLoading ? (
//               <p>Loading provinces...</p>
//             ) : error ? (
//               <p className="error">
//                 Error: {error?.message || "An error occurred"}
//               </p>
//             ) : (
//               <div className="table-container">
//                 <div className="table-wrapper">
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {provinces.length > 0 ? (
//                         provinces.map((province, index) => (
//                           <tr key={province.id}>
//                             <td>{index + 1}</td>
//                             <td>{province.name}</td>
//                             <td>
//                               <a href={`/province/edit/${province.id}`}>Edit</a>
//                               <span> | </span>
//                               <a href={`/province/delete/${province.id}`}>
//                                 Delete
//                               </a>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="3">No provinces found</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProvinceList;

// // //--------------------------old ------------------
// // // import React, { useState, useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { fetchProvince, addProvince } from "../../redux/slice/provinceSlice";

// // // const ProvinceList = () => {
// // //   const [newProvinceName, setNewProvinceName] = useState("");
// // //   const dispatch = useDispatch();
// // //   const {
// // //     list: provinces,
// // //     isLoading,
// // //     error,
// // //     addStatus,
// // //     addError,
// // //   } = useSelector((state) => state.provinces);

// // //   // Fetch provinces when the component mounts
// // //   useEffect(() => {
// // //     dispatch(fetchProvince());
// // //   }, [dispatch]);

// // //   // Handle adding a new province
// // //   const handleAddProvince = () => {
// // //     if (newProvinceName.trim() === "") {
// // //       alert("Please enter a valid province name");
// // //       return;
// // //     }
// // //     dispatch(addProvince(newProvinceName.trim()));
// // //     setNewProvinceName("");
// // //   };

// // //   return (
// // //     <div className="content-wrapper">
// // //       <div className="row">
// // //         <div className="card">
// // //           <div className="card-header">
// // //             <div className="p-6 bg-white border-b border-gray-200">
// // //               <h5 className="mx-20">Province List</h5>
// // //               <div className="text-right">
// // //                 <div className="input-group">
// // //                   <input
// // //                     type="text"
// // //                     value={newProvinceName}
// // //                     onChange={(e) => setNewProvinceName(e.target.value)}
// // //                     placeholder="Enter province name"
// // //                   />
// // //                   <button
// // //                     onClick={handleAddProvince}
// // //                     disabled={addStatus === "loading"}
// // //                   >
// // //                     {addStatus === "loading" ? "Adding..." : "Add Province"}
// // //                   </button>
// // //                 </div>
// // //                 {addStatus === "failed" && (
// // //                   <p className="error">
// // //                     Error: {addError?.message || "An error occurred"}
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="card-body">
// // //             {isLoading ? (
// // //               <p>Loading provinces...</p>
// // //             ) : error ? (
// // //               <p className="error">
// // //                 Error: {error?.message || "An error occurred"}
// // //               </p>
// // //             ) : (
// // //               <table className="table table-bordered">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>#</th>
// // //                     <th>Name</th>
// // //                     <th>Action</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {provinces.length > 0 ? (
// // //                     provinces.map((province) => (
// // //                       <tr key={province.id}>
// // //                         <td>{province.id}</td>
// // //                         <td>{province.name}</td>
// // //                         <td>
// // //                           <a href={`/province/edit/${province.id}`}>Edit</a>
// // //                           <span> | </span>
// // //                           <a href={`/province/delete/${province.id}`}>Delete</a>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan="3">No provinces found</td>
// // //                     </tr>
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProvinceList;

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";

// // // // const ProvinceList = () => {
// // // //   // State to store the list of provinces
// // // //   const [provinces, setProvinces] = useState([]);
// // // //   // State to store the new province name
// // // //   const [newProvinceName, setNewProvinceName] = useState("");

// // // //   // Function to fetch the list of provinces from the backend
// // // //   const fetchProvinces = async () => {
// // // //     try {
// // // //       const response = await axios.get("/setup/api/province/");
// // // //       setProvinces(response.data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching provinces:", error);
// // // //     }
// // // //   };

// // // //   // Function to handle adding a new province
// // // //   const handleAddProvince = async () => {
// // // //     try {
// // // //       // Check if the new province name is not empty
// // // //       if (newProvinceName.trim() === "") {
// // // //         alert("Please enter a valid province name");
// // // //         return;
// // // //       }
// // // //       // Send a POST request to add the new province
// // // //       await axios.post("/api/setup/province/", {
// // // //         name: newProvinceName.trim(),
// // // //       });
// // // //       // Fetch the updated list of provinces
// // // //       fetchProvinces();
// // // //       // Clear the input field after adding the province
// // // //       setNewProvinceName("");
// // // //     } catch (error) {
// // // //       console.error("Error adding province:", error);
// // // //     }
// // // //   };

// // // //   // Fetch provinces when the component mounts
// // // //   useEffect(() => {
// // // //     fetchProvinces();
// // // //   }, []);

// // // //   return (
// // // //     <div className="content-wrapper">
// // // //       <div className="row">
// // // //         <div className="card">
// // // //           <div className="card-header">
// // // //             <div className="p-6 bg-white border-b border-gray-200">
// // // //               <h5 className="mx-20">Province List</h5>
// // // //               <div className="text-right">
// // // //                 <div className="input-group">
// // // //                   <input
// // // //                     type="text"
// // // //                     value={newProvinceName}
// // // //                     onChange={(e) => setNewProvinceName(e.target.value)}
// // // //                     placeholder="Enter province name"
// // // //                   />
// // // //                   <button onClick={handleAddProvince}>Add Province</button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="card-body">
// // // //             <table className="table table-bordered">
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>#</th>
// // // //                   <th>Name</th>
// // // //                   <th>Action</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {provinces.length > 0 ? (
// // // //                   provinces.map((province, index) => (
// // // //                     <tr key={index}>
// // // //                       <td>{province.id}</td>
// // // //                       <td>{province.name}</td>
// // // //                       <td>
// // // //                         <a href={`/province/edit/${province.id}`}>Edit</a>
// // // //                         <span> | </span>
// // // //                         <a href={`/province/delete/${province.id}`}>Delete</a>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 ) : (
// // // //                   <tr>
// // // //                     <td colSpan="3">No countries</td>
// // // //                   </tr>
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProvinceList;
