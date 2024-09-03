// Component example

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addDesignation, fetchDesignations } from "../../redux/actions/DesignationActions";

const DesignationList = () => {
  const [name, setName] = useState("");
  const designations = useSelector(
    (state) => state.designations.designations || []
  ); // Adjust key to match state structure
  // const dispatch = useDispatch();

  const handleDesignation = () => {
    //   if (name.trim()) {
    //     dispatch(addDesignation(name));
    //     setName("");
    //   } else {
    //     alert("Please enter a valid Designation name");
    //   }
  };

  // useEffect(() => {
  //   dispatch(fetchDesignations());
  // }, [dispatch]);

  return (
    <div>
      <div className="content-wrapper">
        <div className="row">
          <div className="card">
            <div className="card-header">
              <div className="p-6 bg-white border-b border-gray-200">
                <h5 className="mx-20">Designation List</h5>
                <div className="text-right">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New Designation Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      className="btn btn-info"
                      onClick={handleDesignation}
                    >
                      Add Designation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {designations.length > 0 ? (
                    designations.map((designation, index) => (
                      <tr key={index}>
                        <td>{designation.id}</td>
                        <td>{designation.name}</td>
                        <td>
                          <a href={`/designations/edit/${designation.id}`}>
                            Edit
                          </a>
                          <span> | </span>
                          <a href={`/designations/delete/${designation.id}`}>
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Designation</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ul>
        {designations.map((designation) => (
          <li key={designation.id}>{designation.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DesignationList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { addDesignation } from "../../redux/actions/DesignationActions";
// import { fetchDesignations } from "../../redux/actions/DesignationActions";
// const DesignationList = () => {
//   const [name, setName] = useState("");
//   const designations = useSelector((state) => state.designations);
//   const dispatch = useDispatch();

//   const handleDesignation = () => {
//     dispatch(addDesignation(name));
//     setName("");
//   };

//   useEffect(() => {
//     dispatch(fetchDesignations());
//   }, [dispatch]);

//   return (
//     <div>
//       <div className="content-wrapper">
//         <div className="row">
//           <div className="card">
//             <div className="card-header">
//               <div className="p-6 bg-white border-b border-gray-200">
//                 <h5 className="mx-20">Designation List</h5>
//                 <div className="text-right">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="New designations Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                     <button
//                       className="btn btn-info"
//                       onClick={handleDesignation}
//                     >
//                       Add designations
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card-body">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {designations.length > 0 ? (
//                     designations.map((designations, index) => (
//                       <tr key={index}>
//                         <td>{designations.id}</td>
//                         <td>{designations.name}</td>
//                         <td>
//                           <a href={`/designations/edit/${designations.id}`}>
//                             Edit
//                           </a>
//                           <span> | </span>
//                           <a href={`/designations/delete/${designations.id}`}>
//                             Delete
//                           </a>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3">No Designation</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ul>
//         {designations.map((designation) => (
//           <li key={designation.id}>{designation.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DesignationList;
