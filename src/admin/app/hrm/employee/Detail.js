// src/components/EmployeeDetail.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById, updateEmployee, selectSelectedEmployee, selectEmployeeLoading, selectEmployeeError } from '../slices/employeeSlice';

const EmployeeDetail = ({ employeeId }) => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(selectSelectedEmployee);
  const loading = useSelector(selectEmployeeLoading);
  const error = useSelector(selectEmployeeError);

  const [employeeData, setEmployeeData] = useState(selectedEmployee);

  useEffect(() => {
    if (!selectedEmployee) {
      dispatch(fetchEmployeeById(employeeId));
    }
  }, [dispatch, employeeId, selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleUpdate = () => {
    dispatch(updateEmployee({ employeeId, updatedData: employeeData }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Employee Detail</h2>
      {selectedEmployee && (
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={employeeData.name}
              onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
            />
          </div>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;

