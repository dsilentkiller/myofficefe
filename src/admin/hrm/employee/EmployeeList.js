import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/employee/list/"
        );
        setEmployees(response.data.result || []); // Ensure the data is from 'result'
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error); // Log the error for debugging
        setError(error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading employees: {error.message}</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            {/* heading */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">Employee List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-info">
                    <h5>Add Employee</h5>
                  </Link>
                  <form
                    method="get"
                    action="/employee/search"
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="q"
                        className="form-control"
                        placeholder="Search Mockups, Logos..."
                        required
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-info">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="form-inline ml-4" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-30">
                    <li className="nav-item ">
                      <button
                        id="employeeTable"
                        className="nav-link bg-info px-1 py-1 text-sm uppercase tracking-widest hover:bg-white hover:text-black mr-px ml-2"
                      >
                        <i className="fas fa-file-csv"></i>
                        {/* Font Awesome icon for CSV */}
                      </button>
                    </li>
                    {/* Add other export buttons here */}
                  </ul>
                </div>
              </div>
            </nav>
            {/* heading end */}
            <div className="card-body">
              <div className="table-wrapper">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Employee Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Employee type</th>
                      <th>role</th>
                      <th>date_issued</th>
                      <th>province</th>
                      <th>District</th>
                      <th>municipality</th>
                      <th> ward no</th>
                      <th> tole name</th>
                      <th> temp_province</th>
                      <th>temp_district</th>
                      <th>temp_municipality</th>
                      <th> temp_ward_no</th>
                      <th>temp_tole_name</th>
                      <th> gender</th>
                      <th> dob</th>
                      <th> supervisor name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Salary</th>
                      <th>Joining date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((employee, index) => (
                        <tr key={employee.id}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{employee.name}</td>
                          <td>{employee.pri_phone}</td>
                          <td>{employee.email}</td>
                          <td>{employee.employee_type}</td>
                          <td>{employee.role}</td>
                          <td>{employee.date_issued}</td>
                          <td>{employee.province}</td>
                          <td>{employee.district}</td>
                          <td>{employee.municipality}</td>
                          <td>{employee.ward_no}</td>
                          <td>{employee.tole_name}</td>
                          <td>{employee.temp_province}</td>
                          <td>{employee.temp_district}</td>
                          <td>{employee.temp_municipality}</td>
                          <td>{employee.temp_ward_no}</td>
                          <td>{employee.temp_tole_name}</td>

                          <td>{employee.gender}</td>
                          <td>{employee.dob}</td>
                          <td>{employee.supervisor_name}</td>
                          <td>{employee.department}</td>
                          <td>{employee.designation}</td>
                          <td>{employee.salary}</td>
                          <td>{employee.joining_date}</td>
                          <td>
                            <Link to={`/employee/update/${employee.id}`}>
                              Edit
                            </Link>
                            |
                            <Link to={`/employee/detail/${employee.id}`}>
                              View
                            </Link>
                            |
                            <Link to={`/employee/delete/${employee.id}`}>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="22">No employees found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination-wrapper">
                <div className="pagination-controls">
                  <div className="pagination-info">
                    <label htmlFor="itemsPerPage">Items per page:</label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          &laquo;
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/employee/list/"
//         );
//         setEmployees(response.data.result || []); // Ensure the data is from 'result'
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching employees:", error); // Log the error for debugging
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading employees: {error.message}</div>;
//   }

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Employee List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Employee</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/employee/search"
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
//                         id="employeeTable"
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
//                               <th>Name</th>
//                               <th>Phone</th>
//                               <th>Email</th>

//                               <th>Employee type</th>
//                               <th>role</th>
//                               <th>date_issued</th>
//                               <th>province</th>
//                               <th>District</th>
//                               <th>municipality</th>

//                               <th> ward no</th>
//                               <th> tole name</th>
//                               <th> temp_province</th>
//                               <th>temp_district</th>
//                               <th>temp_municipality</th>
//                               <th> temp_ward_no</th>
//                               <th>temp_tole_name</th>
//                               <th> gender</th>
//                               <th> dob</th>
//                               <th> supervisor name</th>

//                               <th>Department</th>
//                               <th>Designation</th>
//                               <th>Salary</th>
//                               <th>Joining date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {employees.length > 0 ? (
//                               employees.map((employee) => (
//                                 <tr key={employee.id}>
//                                   <td>{employee.id}</td>
//                                   <td>{employee.name}</td>
//                                   <td>{employee.pri_phone}</td>
//                                   <td>{employee.email}</td>
//                                   <td>{employee.employee_type}</td>
//                                   <td>{employee.role}</td>
//                                   <td>{employee.date_issued}</td>
//                                   <td>{employee.province}</td>
//                                   <td>{employee.district}</td>

//                                   <td>{employee.municipality}</td>

//                                   <td>{employee.ward_no}</td>
//                                   <td>{employee.tole_name}</td>
//                                   <td>{employee.temp_province}</td>
//                                   <td>{employee.temp_district}</td>
//                                   <td>{employee.temp_municipality}</td>
//                                   <td>{employee.temp_ward_no}</td>
//                                   <td>{employee.temp_tole_name}</td>
//                                   <td>{employee.municipality}</td>
//                                   <td>{employee.gender}</td>
//                                   <td>{employee.dob}</td>
//                                   <td>{employee.supervisor_name}</td>

//                                   <td>{employee.department}</td>
//                                   <td>{employee.designation}</td>
//                                   <td>{employee.salary}</td>
//                                   <td>{employee.joining_date}</td>
//                                   <td>
//                                     <Link
//                                       to={`/employee/update/${employee.id}`}
//                                     >
//                                       Edit
//                                     </Link>
//                                     |
//                                     <Link
//                                       to={`/employee/detail/${employee.id}`}
//                                     >
//                                       View
//                                     </Link>
//                                     |
//                                     <Link
//                                       to={`/employee/delete/${employee.id}`}
//                                     >
//                                       Delete
//                                     </Link>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="8">No employees found</td>
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

// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/employee/list/"
//         );
//         setEmployees(response.data.result || []); // Ensure the data is from 'result'
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching employees:", error); // Log the error for debugging
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading employees: {error.message}</div>;
//   }

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             {/* heading */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">Employee List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link to="create" className="nav-link btn btn-info">
//                     <h5>Add Employee</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/employee/search"
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
//                         id="employeeTable"
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
//               <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
//                 <table className="table table-bordered min-w-full">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Phone</th>
//                       <th>Email</th>
//                       <th>Employee type</th>
//                       <th>role</th>
//                       <th>date_issued</th>
//                       <th>province</th>
//                       <th>District</th>
//                       <th>municipality</th>
//                       <th> ward no</th>
//                       <th> tole name</th>
//                       <th> temp_province</th>
//                       <th>temp_district</th>
//                       <th>temp_municipality</th>
//                       <th> temp_ward_no</th>
//                       <th>temp_tole_name</th>
//                       <th> gender</th>
//                       <th> dob</th>
//                       <th> supervisor name</th>
//                       <th>Department</th>
//                       <th>Designation</th>
//                       <th>Salary</th>
//                       <th>Joining date</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employees.length > 0 ? (
//                       employees.map((employee) => (
//                         <tr key={employee.id}>
//                           <td>{employee.id}</td>
//                           <td>{employee.name}</td>
//                           <td>{employee.pri_phone}</td>
//                           <td>{employee.email}</td>
//                           <td>{employee.employee_type}</td>
//                           <td>{employee.role}</td>
//                           <td>{employee.date_issued}</td>
//                           <td>{employee.province}</td>
//                           <td>{employee.district}</td>
//                           <td>{employee.municipality}</td>
//                           <td>{employee.ward_no}</td>
//                           <td>{employee.tole_name}</td>
//                           <td>{employee.temp_province}</td>
//                           <td>{employee.temp_district}</td>
//                           <td>{employee.temp_municipality}</td>
//                           <td>{employee.temp_ward_no}</td>
//                           <td>{employee.temp_tole_name}</td>
//                           <td>{employee.municipality}</td>
//                           <td>{employee.gender}</td>
//                           <td>{employee.dob}</td>
//                           <td>{employee.supervisor_name}</td>
//                           <td>{employee.department}</td>
//                           <td>{employee.designation}</td>
//                           <td>{employee.salary}</td>
//                           <td>{employee.joining_date}</td>
//                           <td>
//                             <Link to={`/employee/update/${employee.id}`}>
//                               Edit
//                             </Link>
//                             |
//                             <Link to={`/employee/detail/${employee.id}`}>
//                               View
//                             </Link>
//                             |
//                             <Link to={`/employee/delete/${employee.id}`}>
//                               Delete
//                             </Link>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="22">No employees found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;
// // export default EmployeeLis
