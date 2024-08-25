import React from "react";
import { Link } from "react-router-dom";

const ExpanseTable = ({ expanses }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Expanse List</h3>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Purchased Date</th>
              <th>Employee Name</th>
              <th>Category Name</th>
              <th>Amount Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expanses.map((expanse, index) => (
              <tr key={index}>
                <td>{expanse.purchased_date}</td>
                <td>{expanse.emp_name}</td>
                <td>{expanse.category_name}</td>
                <td>{expanse.amount_spent}</td>
                <td>{expanse.status}</td>
                <td>
                  <Link
                    to={`/admin/expanse/${expanse.id}`}
                    className="btn btn-info btn-sm"
                  >
                    Details
                  </Link>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpanseTable;
