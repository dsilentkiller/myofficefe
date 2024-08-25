import React from "react";

const EmployeeViewForm = ({ employee }) => {
  return (
    <div className="employee-view-form">
      <h2>Employee Details</h2>
      <div className="row">
        <div className="col-md-4">
          <label>Name:</label>
          <p>{employee.name}</p>
        </div>
        <div className="col-md-4">
          <label>Employee Type:</label>
          <p>{employee.employee_type}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <label>Role:</label>
          <p>{employee.role}</p>
        </div>
        <div className="col-md-4">
          <label>Date Issued:</label>
          <p>{employee.date_issued}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <label>Province:</label>
          <p>{employee.province}</p>
        </div>
        <div className="col-md-4">
          <label>Zone:</label>
          <p>{employee.zone}</p>
        </div>
      </div>
      {/* Add more fields similarly */}
    </div>
  );
};

export default EmployeeViewForm;
