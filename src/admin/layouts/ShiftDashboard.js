import React, { useState } from "react";
import ShiftForm from "../container/task/Task";
import ShiftTable from "../container/task/ShiftTable";
// importshift

const ShiftDashboard = () => {
  const [shifts, setShifts] = useState([]);

  const addShift = (shift) => {
    setShifts([...shifts, shift]);
  };

  return (
    <div className="container">
      <ShiftForm onSubmit={addShift} />
      <ShiftTable projects={shifts} />
    </div>
  );
};

export default ShiftDashboard;
