// // // handle the routing for different parts of your admin panel, particularly focusing on the UserDashboard and its components.

import React from "react";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "../layouts/UserDashboard";
import EmployeeForm from "../container/user/employee/Form";
import EmployeeList from "../container/user/employee/EmployeeList";
import CustomerForm from "../container/user/customer/Form";
import CustomerList from "../container/user/customer/List";
import EnquiryForm from "../container/user/enquiry/Form";
import EnquiryList from "../container/user/enquiry/List";
import LeaveDashboard from "../container";
// import CountryList from "../base/country/CountryList";
// import ProvinceList from "../base/province/ProvinceList";
// import DesignationList from "../base/designation/DesignationList";
// import ZoneList from "../base/zone/List";
// import WorkingList from "../base/working/List";
// import WorkingForm from "../base/working/Form";
// import MunicipalityList from "../base/municipality/List";
// import DayForm from "../base/day/Form";
// import DistrictList from "../base/district/List";
// import CustomerVisitPeriodList from "../base/customer_visit/List";
// import CustomerVisitPeriodForm from "../base/customer_visit/Form";
// import AssignGradeFormAndList from "../base/grade/assign_grade/List";
// import SetupDashboard from "../layouts/SetupDashboard";
import LeaveCategoryList from "../container/leave/List";
import LeaveCategoryForm from "../container/leave/Form";
import LeaveForm from "../container/leave/Form";
import LeaveList from "../container/leave/List";
// import AssetsDashboard from "../layouts/AssetDashboard"; // Fixed import path
// import AssignAssetsForm from "../container/assets/AssignAssetsForm";
// import AssignAssetsList from "../container/assets/AssetList";
// import AssetsList from "../container/assets/AssetList";
// import AssetsForm from "../container/assets/AssetsForm";
// import AdminDashboard from "../AdminDashboard";
// import ProjectTable from "../container/project/ProjectTable";
// import ProjectForm from "../container/project/ProjectForm";
// import ProjectDashboard from "../layouts/ProjectDashboard";
// import ShiftTable from "../container/shift/ShiftTable";
// import ShiftForm from "../container/shift/ShiftForm";
// import ShiftDashboard from "../layouts/ShiftDashboard";
// import LeaveDashboard from "../layouts/LeaveDashboard";
// import TaskDashboard from "../layouts/TaskDashboard";
// import NoticeDashboard from "../layouts/NoticeDashboard";
// import AdminDashboard from "../AdminDashboard";

function AdminRoute() {
  return (
    <Routes>
      {/* Admin Dashboard */}
      {/* <Route path="admin" element={<AdminDashboard />} /> */}
      {/* User Nested Routes */}
      <Route path="user/" element={<UserDashboard />}>
        <Route path="employee/create" element={<EmployeeForm />} />
        <Route path="employee/list" element={<EmployeeList />} />
        <Route path="customer/create" element={<CustomerForm />} />
        <Route path="customer/list" element={<CustomerList />} />
        <Route path="enquiry/create" element={<EnquiryForm />} />
        <Route path="enquiry-list" element={<EnquiryList />} />
      </Route>
      {/* Setup Nested Routes */}
      {/* <Route path="admin/setup/dashboard" element={<SetupDashboard />}>
        <Route path="country-list" element={<CountryList />} />
        <Route path="province/province-list" element={<ProvinceList />} />
        <Route
          path="designation/designation-list"
          element={<DesignationList />}
        />
        <Route path="zone/zone-list" element={<ZoneList />} />
        <Route
          path="municipality/municipality-list"
          element={<MunicipalityList />}
        />
        <Route path="district/district-list" element={<DistrictList />} />
        <Route path="day/day-form" element={<DayForm />} />
        <Route
          path="customer-visit/customer-visit-period-list"
          element={<CustomerVisitPeriodList />}
        />
        <Route
          path="customer-visit/customer-visit-period-form"
          element={<CustomerVisitPeriodForm />}
        />
        <Route path="working/working-form" element={<WorkingForm />} />
        <Route path="working/working-list" element={<WorkingList />} />
        <Route
          path="grade/assign_grade/assign-grade-form-and-list"
          element={<AssignGradeFormAndList />}
        />
      </Route>

      {/* Leave Nested Routes */}
      <Route path="leave" element={<LeaveDashboard />}>
        <Route path="leave_category" element={<LeaveCategoryList />} />
        <Route path="leave_category/create" element={<LeaveCategoryForm />} />
        <Route path="leave/list" element={<LeaveList />} />
        <Route path="create" element={<LeaveForm />} />
      </Route>
      {/* Assets Nested Routes */}
      {/* <Route path="admin/assets/dashboard" element={<AssetsDashboard />}>
        <Route path="assign/list" element={<AssignAssetsList />} />
        <Route path="assign/create" element={<AssignAssetsForm />} />
        <Route path="create" element={<AssetsForm />} />
        <Route path="list" element={<AssetsList />} />
      </Route>  */}
      {/* Project Nested Routes */}
      {/* <Route path="admin/project/dashboard" element={<ProjectDashboard />}>
        <Route path="project-list" element={<ProjectTable />} />
        <Route path="create" element={<ProjectForm />} />
      </Route> */}
      {/* Shift Nested Routes */}
      {/* <Route path="admin/shift/dashboard" element={<ShiftDashboard />}>
        <Route path="create" element={<ShiftForm />} />
        <Route path="shift-list" element={<ShiftTable />} />
      </Route> */}
      {/* Task Dashboard */}
      {/* <Route path="admin/task/dashboard" element={<TaskDashboard />} /> */}
      {/* Notice Dashboard */}
      {/* <Route path="admin/notice/dashboard" element={<NoticeDashboard />} /> */}
    </Routes>
  );
}

export default AdminRoute;
