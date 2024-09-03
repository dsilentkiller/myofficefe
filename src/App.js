import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./admin/layouts/UserDashboard";
import EmployeeForm from "./admin/container/user/employee/Form";
import EmployeeList from "./admin/container/user/employee/EmployeeList";
import CustomerList from "./admin/container/user/customer/List";
import CustomerForm from "./admin/container/user/customer/Form";
import LeaveCategoryList from "./admin/container/leave/leave_category/List";
import LeaveForm from "./admin/container/leave/Form";
import LeaveDashboard from "./admin/layouts/LeaveDashboard";
// import AssetsDashboard from "./admin/layouts/AssetDashboard";
import AssetsForm from "./admin/container/assets/AssetsForm";
import AssetsList from "./admin/container/assets/AssetList";
import AssignAssetsForm from "./admin/container/assets/AssignAssetsForm";
import AssignAssetsList from "./admin/container/assets/AssignAssetsList";
import LeaveCategoryForm from "./admin/container/leave/leave_category/Form";
import LeaveList from "./admin/container/leave/List";
import AssetDashboard from "./admin/layouts/AssetDashboard";
import SetupDashboard from "./admin/layouts/SetupDashboard";
import ZoneList from "./admin/base/zone/List";
import ZoneForm from "./admin/base/zone/Form";
import ProvinceList from "./admin/base/province/ProvinceList";
import ProvinceForm from "./admin/base/province/ProvinceForm";
import DesignationList from "./admin/base/designation/DesignationList";
import DesignationForm from "./admin/base/designation/DesignationForm";
import DistrictList from "./admin/base/district/List";
import DistrictForm from "./admin/base/district/Form";
// import AttendanceList from "./admin"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Dashboard Route */}
          <Route path="/dashboard">
            {/*localhost/dashboard */}
            <Route index element={<AdminDashboard />} />
            {/* localhost/dashboard/user */}
            <Route path="user" element={<UserDashboard />}>
              {/* localhost/dashbaord/user/employee */}
              <Route path="employee" element={<EmployeeList />} />
              <Route path="employee/create" element={<EmployeeForm />} />
              <Route path="customer" element={<CustomerList />} />
              <Route path="customer/create" element={<CustomerForm />} />
            </Route>

            {/* ----  Leave Routes---- */}
            <Route path="leave" element={<LeaveDashboard />}>
              <Route path="list" element={<LeaveList />} />
              <Route path="create" element={<LeaveForm />} />
              <Route path="category/list" element={<LeaveCategoryList />} />
              <Route path="category/create" element={<LeaveCategoryForm />} />
            </Route>
            {/* -------------- Assets -------- */}
            <Route path="assets" element={<AssetDashboard />}>
              <Route path="list" element={<AssetsList />} />
              <Route path="create" element={<AssetsForm />} />
              <Route path="assign/list" element={<AssignAssetsList />} />
              <Route path="assign/create" element={<AssignAssetsForm />} />
            </Route>

            {/* ---- Attendance---- */}
            <Route path="attendance">
              <Route path="list" element={<AssetsList />} />
              <Route path="create" element={<AssetsForm />} />
            </Route>
            {/* ---------------- setup------------------------------ */}
            {/* localhost/dashboard/setup/zone */}
            <Route path="setup" element={<SetupDashboard />}>
              <Route path="designation" element={<DesignationList />} />
              <Route path="designation/create" element={<DesignationForm />} />
              <Route path="zone" element={<ZoneList />} />
              <Route path="zone/create" element={<ZoneForm />} />
              {/* <Route path="municipality" element={<MunicipalityList />} /> */}
              / <Route path="district" element={<DistrictList />} />
              <Route path="district/create" element={<DistrictForm />} />
              {/* added field */}
              {/* <Route path="zone" element={<ZoneList />} /> */}
              <Route path="province" element={<ProvinceList />} />
              <Route path="province/create" element={<ProvinceForm />} />
              {/* <Route path="designation" element={<ProvinceList />} /> */}
              {/* <Route
              path="customer-visit/list"
              element={<CustomerVisitPeriodList />}
            /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
