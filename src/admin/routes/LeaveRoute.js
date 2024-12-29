import React from "react";

import { Route } from "react-router-dom";
import LeaveForm from "../container/leave/Form";
import LeaveList from "../container/leave/List";
import LeaveDashboard from "../layouts/LeaveDashboard";

function LeaveRoutes() {
  return (
    <div>
      {/* Leave Routes */}
      <Route path="/leave" element={<LeaveDashboard />}>
        <Route path="create" element={<LeaveForm />} />
        <Route path="list" element={<LeaveList />} />
        {/* Catch-all for /Leave routes */}
        {/* <Route path="*" element={<Navigate to="/Leave" replace />} /> */}
      </Route>
    </div>
  );
}

export default LeaveRoutes;
