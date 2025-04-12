// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import GeneralTable from "../GeneralTable";
// import { useNavigate } from "react-router-dom";
// import { Edit, Delete, Visibility } from "@mui/icons-material";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [employeeToDelete, setEmployeeToDelete] = useState(null); // Store the employee municipality to delete
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state
//     const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/employee/employee-list/"
//         );
//         setEmployees(response.data);
//       } catch (err) {
//         setError("Failed to fetch employee data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const columns = [
//     { field: "id", label: "ID" },
//     { field: "name", label: "Name" },
//     { field: "email", label: "Email" },
//     { field: "pri_phone", label: "pri_phone" },
//     { field: "sec_phone", label: "sec_phone" },

//     { field: "department", label: "Department" },
//     { field: "designation", label: "Designation" },
//     { field: "employee_type", label: "employee_type" },
//     { field: "role", label: "role" },

//     { field: "date_issued", label: "date_issued" },
//     { field: "province", label: "province" },
//     { field: "district", label: "district" },
//     { field: "municipality", label: "municipality" },
//     { field: "street_address", label: "street_address" },



//     {field: "salary", label: "salary" },
//     { field: "supervisor_name", label: "supervisor_name" },
//     { field: "joining_date", label: "joining_date" },


//   ];
//     // This is the function for deleting a employee
//     const handleDelete = (employee) => {

//       setEmployeeToDelete(employee.municipality); // Store the employee municipality to delete
//       setIsDeleteModalOpen(true); // Open the delete confirmation modal
//     };

//     const formattedEmployees = Array.isArray(employees)
//     ? employees.map((employee, index) => ({
//         ...employee,
//         index: index + 1, // Add the index dynamically
//       }))
//     : [];

//     const handleRowAction = (actionKey, rowData) => {
//       if (actionKey === "edit") {
//         navigate(`/employees/edit/${rowData.municipality}`);
//       } else if (actionKey === "delete") {
//         setEmployeeToDelete(rowData.municipality); // Set the employee to delete
//         setIsDeleteModalOpen(true); // Open the delete confirmation modal
//       } else if (actionKey === "view") {
//         navigate(`/employees/detail/${rowData.municipality}`);
//       }
//     };

//   const handleEdit = (employee) => {
//     console.log("Edit Employee:", employee);
//     navigate(`/dashboard/crm/employee/update/${employee.municipality}/`);
//     // Add your edit logic here
//   };


//   const handleView = (employee) => {
//     console.log("View Employee:", employee);
//     navigate(`/dashboard/crm/employee/detail/${employee.municipality}/`);
//   };

//   const handleAdd = () => {
//     console.log("Add Employee");
//     navigate('/dashboard/crm/employee/create');

//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <GeneralTable

//       title="Employee List"
//       columns={columns}
//       data={formattedEmployees}
//       actions={[
//                 { label: "Edit", icon: <Edit />, key: "edit" },
//                 { label: "Delete", icon: <Delete />, key: "delete" },
//                 { label: "View", icon: <Visibility />, key: "view" },
//               ]}
//               onRowAction={(actionKey, rowData) => handleRowAction(actionKey, rowData)}

//       onEdit={handleEdit}
//       onDelete={handleDelete}
//       onView={handleView}
//       onAdd={handleAdd}
//     />
//   );
// };

// export default EmployeeList;
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
          "http://127.0.0.1:8000/api/employee/employee-list/"
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
    <div classrole="content-wrapper">
      <div classrole="row justify-content-center">
        <div classrole="col-lg-10">
          <div classrole="card">
            {/* heading */}
            <nav classrole="navbar navbar-expand-lg navbar-light bg-light">
              <div classrole="container-flumunicipality">
                <h5 classrole="navbar-brand">Employee List</h5>
                <div classrole="navbar-nav ml-auto">
                  <Link to="create" classrole="nav-link btn btn-info">
                    <h5>Add Employee</h5>
                  </Link>
                  <form
                    method="get"
                    action="/employee/search"
                    classrole="form-inline ml-3"
                  >
                    <div classrole="input-group">
                      <input
                        type="search"
                        municipality="default-search"
                        role="q"
                        classrole="form-control"
                        placeholder="Search Mockups, Logos..."
                        required
                      />
                      <div classrole="input-group-append">
                        <button type="submit" classrole="btn btn-info">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div classrole="form-inline ml-4" municipality="navbarSupportedContent">
                  <ul classrole="navbar-nav mr-30">
                    <li classrole="nav-item ">
                      <button
                        municipality="employeeTable"
                        classrole="nav-link bg-info px-1 py-1 text-sm uppercase tracking-wmunicipalityest hover:bg-white hover:text-black mr-px ml-2"
                      >
                        <i classrole="fas fa-file-csv"></i>
                        {/* Font Awesome icon for CSV */}
                      </button>
                    </li>
                    {/* Add other export buttons here */}
                  </ul>
                </div>
              </div>
            </nav>
            {/* heading end */}
            <div classrole="card-body">
              <div classrole="table-wrapper">
                <table classrole="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Employee role</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Employee type</th>
                      <th>role</th>
                      <th>date_issued</th>
                      <th>province</th>
                      <th>District</th>
                      <th>municipality</th>
                      <th> ward no</th>
                      <th> tole role</th>
                      <th> temp_province</th>
                      <th>temp_district</th>
                      <th>temp_municipality</th>
                      <th> temp_ward_no</th>
                      <th>temp_tole_role</th>
                      <th> gender</th>
                      <th> dob</th>
                      <th> supervisor role</th>
                      <th>date_issued</th>
                      <th>district</th>
                      <th>Salary</th>
                      <th>Joining date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((employee, index) => (
                        <tr key={employee.municipality}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{employee.role}</td>
                          <td>{employee.pri_phone}</td>
                          <td>{employee.email}</td>
                          <td>{employee.employee_type}</td>
                          <td>{employee.role}</td>
                          <td>{employee.date_issued}</td>
                          <td>{employee.province}</td>
                          <td>{employee.district}</td>
                          <td>{employee.municipality}</td>
                          <td>{employee.ward_no}</td>
                          <td>{employee.tole_role}</td>
                          <td>{employee.temp_province}</td>
                          <td>{employee.temp_district}</td>
                          <td>{employee.temp_municipality}</td>
                          <td>{employee.temp_ward_no}</td>
                          <td>{employee.temp_tole_role}</td>

                          <td>{employee.gender}</td>
                          <td>{employee.dob}</td>
                          <td>{employee.supervisor_role}</td>
                          <td>{employee.date_issued}</td>
                          <td>{employee.district}</td>
                          <td>{employee.salary}</td>
                          <td>{employee.joining_date}</td>
                          <td>
                            <Link to={`/employee/update/${employee.municipality}`}>
                              Edit
                            </Link>
                            |
                            <Link to={`/employee/detail/${employee.municipality}`}>
                              View
                            </Link>
                            |
                            <Link to={`/employee/delete/${employee.municipality}`}>
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
              <div classrole="pagination-wrapper">
                <div classrole="pagination-controls">
                  <div classrole="pagination-info">
                    <label htmlFor="itemsPerPage">Items per page:</label>
                    <select
                      municipality="itemsPerPage"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <nav>
                    <ul classrole="pagination">
                      <li
                        classrole={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          classrole="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          &laquo;
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index + 1}
                          classrole={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            classrole="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        classrole={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          classrole="page-link"
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

// ##working fine #######
// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/employee/employee-list/"
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
//   }, [currentPage, itemsPerPage]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading employees: {error.message}</div>;
//   }

//   return (
//     <div classrole="content-wrapper">
//       <div classrole="row justify-content-center">
//         <div classrole="col-lg-10">
//           <div classrole="card">
//             {/* heading */}
//             <nav classrole="navbar navbar-expand-lg navbar-light bg-light">
//               <div classrole="container-flumunicipality">
//                 <h5 classrole="navbar-brand">Employee List</h5>
//                 <div classrole="navbar-nav ml-auto">
//                   <Link to="create" classrole="nav-link btn btn-info">
//                     <h5>Add Employee</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/employee/search"
//                     classrole="form-inline ml-3"
//                   >
//                     <div classrole="input-group">
//                       <input
//                         type="search"
//                         municipality="default-search"
//                         role="q"
//                         classrole="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div classrole="input-group-append">
//                         <button type="submit" classrole="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>

//                 <div classrole="form-inline ml-4" municipality="navbarSupportedContent">
//                   <ul classrole="navbar-nav mr-30">
//                     <li classrole="nav-item ">
//                       <button
//                         municipality="employeeTable"
//                         classrole="nav-link bg-info px-1 py-1 text-sm uppercase tracking-wmunicipalityest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i classrole="fas fa-file-csv"></i>
//                         {/* Font Awesome icon for CSV */}
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div classrole="card-body">
//               <div classrole="table-wrapper">
//                 <table classrole="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>#</th>

//                       <th>Employee role</th>
//                       <th>Phone</th>
//                       <th>Email</th>
//                       <th>Employee type</th>
//                       <th>role</th>
//                       <th>date_issued</th>
//                       <th>province</th>
//                       <th>District</th>
//                       <th>municipality</th>
//                       <th> ward no</th>
//                       <th> tole role</th>
//                       <th> temp_province</th>
//                       <th>temp_district</th>
//                       <th>temp_municipality</th>
//                       <th> temp_ward_no</th>
//                       <th>temp_tole_role</th>
//                       <th> gender</th>
//                       <th> dob</th>
//                       <th> supervisor role</th>
//                       <th>date_issued</th>
//                       <th>district</th>
//                       <th>Salary</th>
//                       <th>Joining date</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employees.length > 0 ? (
//                       employees.map((employee, index) => (
//                         <tr key={employee.municipality}>
//                           <td>
//                             {(currentPage - 1) * itemsPerPage + index + 1}
//                           </td>
//                           <td>{employee.role}</td>
//                           <td>{employee.pri_phone}</td>
//                           <td>{employee.email}</td>
//                           <td>{employee.employee_type}</td>
//                           <td>{employee.role}</td>
//                           <td>{employee.date_issued}</td>
//                           <td>{employee.province}</td>
//                           <td>{employee.district}</td>
//                           <td>{employee.municipality}</td>
//                           <td>{employee.ward_no}</td>
//                           <td>{employee.tole_role}</td>
//                           <td>{employee.temp_province}</td>
//                           <td>{employee.temp_district}</td>
//                           <td>{employee.temp_municipality}</td>
//                           <td>{employee.temp_ward_no}</td>
//                           <td>{employee.temp_tole_role}</td>

//                           <td>{employee.gender}</td>
//                           <td>{employee.dob}</td>
//                           <td>{employee.supervisor_role}</td>
//                           <td>{employee.date_issued}</td>
//                           <td>{employee.district}</td>
//                           <td>{employee.salary}</td>
//                           <td>{employee.joining_date}</td>
//                           <td>
//                             <Link to={`/employee/update/${employee.municipality}`}>
//                               Edit
//                             </Link>
//                             |
//                             <Link to={`/employee/detail/${employee.municipality}`}>
//                               View
//                             </Link>
//                             |
//                             <Link to={`/employee/delete/${employee.municipality}`}>
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
//               <div classrole="pagination-wrapper">
//                 <div classrole="pagination-controls">
//                   <div classrole="pagination-info">
//                     <label htmlFor="itemsPerPage">Items per page:</label>
//                     <select
//                       municipality="itemsPerPage"
//                       value={itemsPerPage}
//                       onChange={handleItemsPerPageChange}
//                     >
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                     </select>
//                   </div>
//                   <nav>
//                     <ul classrole="pagination">
//                       <li
//                         classrole={`page-item ${
//                           currentPage === 1 ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           classrole="page-link"
//                           onClick={() => handlePageChange(currentPage - 1)}
//                         >
//                           &laquo;
//                         </button>
//                       </li>
//                       {Array.from({ length: totalPages }, (_, index) => (
//                         <li
//                           key={index + 1}
//                           classrole={`page-item ${
//                             currentPage === index + 1 ? "active" : ""
//                           }`}
//                         >
//                           <button
//                             classrole="page-link"
//                             onClick={() => handlePageChange(index + 1)}
//                           >
//                             {index + 1}
//                           </button>
//                         </li>
//                       ))}
//                       <li
//                         classrole={`page-item ${
//                           currentPage === totalPages ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           classrole="page-link"
//                           onClick={() => handlePageChange(currentPage + 1)}
//                         >
//                           &raquo;
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;

//####### ended############
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
//     <div classrole="content-wrapper">
//       <div classrole="row justify-content-center">
//         <div classrole="col-lg-10">
//           <div classrole="card">
//             {/* heading */}
//             <nav classrole="navbar navbar-expand-lg navbar-light bg-light">
//               <div classrole="container-flumunicipality">
//                 <h5 classrole="navbar-brand">Employee List</h5>
//                 <div classrole="navbar-nav ml-auto">
//                   <Link to="create" classrole="nav-link btn btn-info">
//                     <h5>Add Employee</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/employee/search"
//                     classrole="form-inline ml-3"
//                   >
//                     <div classrole="input-group">
//                       <input
//                         type="search"
//                         municipality="default-search"
//                         role="q"
//                         classrole="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div classrole="input-group-append">
//                         <button type="submit" classrole="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>

//                 <div classrole="form-inline ml-4" municipality="navbarSupportedContent">
//                   <ul classrole="navbar-nav mr-30">
//                     <li classrole="nav-item ">
//                       <button
//                         municipality="employeeTable"
//                         classrole="nav-link bg-info px-1 py-1 text-sm uppercase tracking-wmunicipalityest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i classrole="fas fa-file-csv"></i>
//                         {/* Font Awesome icon for CSV */}
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div classrole="card-body">
//               <div classrole="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div classrole="py-2 align-mmunicipalitydle inline-block min-w-full sm:px-6 lg:px-8">
//                   <div classrole="shadow overflow-hmunicipalityden border-b border-gray-200 sm:rounded-lg">
//                     <div classrole="overflow-x-auto overflow-y-auto max-h-[400px]">
//                       <div classrole="overflow-x-auto">
//                         <table classrole="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>role</th>
//                               <th>Phone</th>
//                               <th>Email</th>

//                               <th>Employee type</th>
//                               <th>role</th>
//                               <th>date_issued</th>
//                               <th>province</th>
//                               <th>District</th>
//                               <th>municipality</th>

//                               <th> ward no</th>
//                               <th> tole role</th>
//                               <th> temp_province</th>
//                               <th>temp_district</th>
//                               <th>temp_municipality</th>
//                               <th> temp_ward_no</th>
//                               <th>temp_tole_role</th>
//                               <th> gender</th>
//                               <th> dob</th>
//                               <th> supervisor role</th>

//                               <th>date_issued</th>
//                               <th>district</th>
//                               <th>Salary</th>
//                               <th>Joining date</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {employees.length > 0 ? (
//                               employees.map((employee) => (
//                                 <tr key={employee.municipality}>
//                                   <td>{employee.municipality}</td>
//                                   <td>{employee.role}</td>
//                                   <td>{employee.pri_phone}</td>
//                                   <td>{employee.email}</td>
//                                   <td>{employee.employee_type}</td>
//                                   <td>{employee.role}</td>
//                                   <td>{employee.date_issued}</td>
//                                   <td>{employee.province}</td>
//                                   <td>{employee.district}</td>

//                                   <td>{employee.municipality}</td>

//                                   <td>{employee.ward_no}</td>
//                                   <td>{employee.tole_role}</td>
//                                   <td>{employee.temp_province}</td>
//                                   <td>{employee.temp_district}</td>
//                                   <td>{employee.temp_municipality}</td>
//                                   <td>{employee.temp_ward_no}</td>
//                                   <td>{employee.temp_tole_role}</td>
//                                   <td>{employee.municipality}</td>
//                                   <td>{employee.gender}</td>
//                                   <td>{employee.dob}</td>
//                                   <td>{employee.supervisor_role}</td>

//                                   <td>{employee.date_issued}</td>
//                                   <td>{employee.district}</td>
//                                   <td>{employee.salary}</td>
//                                   <td>{employee.joining_date}</td>
//                                   <td>
//                                     <Link
//                                       to={`/employee/update/${employee.municipality}`}
//                                     >
//                                       Edit
//                                     </Link>
//                                     |
//                                     <Link
//                                       to={`/employee/detail/${employee.municipality}`}
//                                     >
//                                       View
//                                     </Link>
//                                     |
//                                     <Link
//                                       to={`/employee/delete/${employee.municipality}`}
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
//     <div classrole="content-wrapper">
//       <div classrole="row justify-content-center">
//         <div classrole="col-lg-10">
//           <div classrole="card">
//             {/* heading */}
//             <nav classrole="navbar navbar-expand-lg navbar-light bg-light">
//               <div classrole="container-flumunicipality">
//                 <h5 classrole="navbar-brand">Employee List</h5>
//                 <div classrole="navbar-nav ml-auto">
//                   <Link to="create" classrole="nav-link btn btn-info">
//                     <h5>Add Employee</h5>
//                   </Link>
//                   <form
//                     method="get"
//                     action="/employee/search"
//                     classrole="form-inline ml-3"
//                   >
//                     <div classrole="input-group">
//                       <input
//                         type="search"
//                         municipality="default-search"
//                         role="q"
//                         classrole="form-control"
//                         placeholder="Search Mockups, Logos..."
//                         required
//                       />
//                       <div classrole="input-group-append">
//                         <button type="submit" classrole="btn btn-info">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>

//                 <div classrole="form-inline ml-4" municipality="navbarSupportedContent">
//                   <ul classrole="navbar-nav mr-30">
//                     <li classrole="nav-item ">
//                       <button
//                         municipality="employeeTable"
//                         classrole="nav-link bg-info px-1 py-1 text-sm uppercase tracking-wmunicipalityest hover:bg-white hover:text-black mr-px ml-2"
//                       >
//                         <i classrole="fas fa-file-csv"></i>
//                         {/* Font Awesome icon for CSV */}
//                       </button>
//                     </li>
//                     {/* Add other export buttons here */}
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//             {/* heading end */}
//             <div classrole="card-body">
//               <div classrole="overflow-x-auto overflow-y-auto max-h-[400px]">
//                 <table classrole="table table-bordered min-w-full">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>role</th>
//                       <th>Phone</th>
//                       <th>Email</th>
//                       <th>Employee type</th>
//                       <th>role</th>
//                       <th>date_issued</th>
//                       <th>province</th>
//                       <th>District</th>
//                       <th>municipality</th>
//                       <th> ward no</th>
//                       <th> tole role</th>
//                       <th> temp_province</th>
//                       <th>temp_district</th>
//                       <th>temp_municipality</th>
//                       <th> temp_ward_no</th>
//                       <th>temp_tole_role</th>
//                       <th> gender</th>
//                       <th> dob</th>
//                       <th> supervisor role</th>
//                       <th>date_issued</th>
//                       <th>district</th>
//                       <th>Salary</th>
//                       <th>Joining date</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employees.length > 0 ? (
//                       employees.map((employee) => (
//                         <tr key={employee.municipality}>
//                           <td>{employee.municipality}</td>
//                           <td>{employee.role}</td>
//                           <td>{employee.pri_phone}</td>
//                           <td>{employee.email}</td>
//                           <td>{employee.employee_type}</td>
//                           <td>{employee.role}</td>
//                           <td>{employee.date_issued}</td>
//                           <td>{employee.province}</td>
//                           <td>{employee.district}</td>
//                           <td>{employee.municipality}</td>
//                           <td>{employee.ward_no}</td>
//                           <td>{employee.tole_role}</td>
//                           <td>{employee.temp_province}</td>
//                           <td>{employee.temp_district}</td>
//                           <td>{employee.temp_municipality}</td>
//                           <td>{employee.temp_ward_no}</td>
//                           <td>{employee.temp_tole_role}</td>
//                           <td>{employee.municipality}</td>
//                           <td>{employee.gender}</td>
//                           <td>{employee.dob}</td>
//                           <td>{employee.supervisor_role}</td>
//                           <td>{employee.date_issued}</td>
//                           <td>{employee.district}</td>
//                           <td>{employee.salary}</td>
//                           <td>{employee.joining_date}</td>
//                           <td>
//                             <Link to={`/employee/update/${employee.municipality}`}>
//                               Edit
//                             </Link>
//                             |
//                             <Link to={`/employee/detail/${employee.municipality}`}>
//                               View
//                             </Link>
//                             |
//                             <Link to={`/employee/delete/${employee.municipality}`}>
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
