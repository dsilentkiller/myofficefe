import React, { useState } from "react";
import TaskForm from "../container/task/Task";
import TaskTable from "../container/task/TaskTable";
import PurchaseForm from "../container/accounts/purchase/PurchaseForm";
import PurchaseTable from "../container/accounts/PurchaseTable";
import ExpanseForm from "../container/accounts/expanse/ExpanseForm";
import ExpanseTable from "../container/accounts/expanse/ExpanseTable";
// import Task

const AccountDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [expanses, setExpanses] = useState([]);

  const addPurchase = (purchase) => {
    setPurchases([...purchases, purchase]);
  };
  // expanses
  const addExpanses = (expanse) => {
    setExpanses([...expanses, expanse]);
  };

  return (
    <div className="container">
      {/* purchase */}
      <PurchaseForm onSubmit={addPurchase} />
      <PurchaseTable purchase={purchases} />
      {/* expanses */}
      <ExpanseForm onSubmit={addExpanses} />
      <ExpanseTable purchase={expanses} />
    </div>
  );
};

export default AccountDashboard;
