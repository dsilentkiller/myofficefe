

import "../../App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../../admin/AdminDashboard";
import UserDashboard from "../../admin/layouts/UserDashboard";
import EmployeeForm from "../../admin/hrm/employee/Form";
import EmployeeList from "../../admin/hrm/employee/EmployeeList";
import CustomerTable from "../../admin/client/customer/CustomerTable";
import CustomerForm from "../../admin/client/customer/CustomerForm";
import LeaveCategoryList from "../../admin/hrm/leave/leave_category/List";
import LeaveForm from "../../admin/hrm/leave/Form";
import LeaveDashboard from "../../admin/layouts/LeaveDashboard";
import AssetsDashboard from "../../admin/layouts/AssetDashboard";
import AssetsForm from "../../admin/hrm/assets/AssetsForm";
import AssetsList from "../../admin/hrm/assets/AssetList";
import AssignAssetsForm from "../../admin/hrm/assets/AssignAssetsForm";
import AssignAssetsList from "../../admin/hrm/assets/AssignAssetsList";
import LeaveCategoryForm from "../../admin/hrm/leave/leave_category/Form";
import LeaveList from "../../admin/hrm/leave/List";
import AssetDashboard from "../../admin/layouts/AssetDashboard";
import SetupDashboard from "../../admin/layouts/SetupDashboard";

import ProvinceList from "../../admin/base/province/ProvinceList";

import DesignationTable from "../../admin/base/designation/DesignationTable";
import DesignationForm from "../../admin/base/designation/DesignationForm";
import DistrictTable from "../../admin/base/district/DistrictTable";
import DistrictForm from "../../admin/base/district/Form";
import UpdateProvince from "../../admin/base/province/UpdateProvince";
import DeleteProvince from "../../admin/base/province/DeleteProvince";
import MunicipalityList from "../../admin/base/municipality/List";
import DeleteMunicipality from "../../admin/base/municipality/Delete";
import UpdateMunicipality from "../../admin/base/municipality/Update";
import MunicipalityForm from "../../admin/base/municipality/Form";
import UpdateDistrict from "../../admin/base/district/UpdateDistrict";
import DeleteDistrict from "../../admin/base/district/DeleteDistrict";

// import DeleteProvince from "../../admin/base/province/DeleteProvince";
import ProvinceForm from "../../admin/base/province/ProvinceForm";
import DepartmentTable from "../../admin/base/department/DepartmentTable";
import DepartmentForm from "../../admin/base/department/DepartmentForm";
import DepartmentDelete from "../../admin/base/department/DepartmentDelete";
import DayDelete from "../../admin/base/day/DayDelete";
import DayTable from "../../admin/base/day/DayTable";
import DayForm from "../../admin/base/day/DayForm";
import CrmDashboard from "../../admin/layouts/CrmDashboard";
import ProjectTable from "../../admin/crm/project/ProjectTable";
import ProjectDelete from "../../admin/crm/project/ProjectDelete";
import ProjectForm from "../../admin/crm/project/ProjectForm";
import ProjectDetail from "../../admin/crm/project/ProjectDetail";
import EventSystem from "../../admin/crm/event/EventSystem";
import AttendeeForm from "../../admin/crm/attendee/AttendeeForm";
// import AttendeeTable from "./admin/crm/attendee/AttendeeTable";
// import MeetingUpdateTable from "./admin/crm/event/meetingupdate/MeetingUpdateTable";
// import MeetingUpdateForm from "./admin/crm/event/meetingupdate/MeetingUpdateForm";
import AttendeeDelete from "../../admin/crm/attendee/AttendeeDelete";
// import AttendeeUpdate from "../../admin/crm/attendee/AttendeeUpdate";
// import AttendeeDetail from "../../admin/crm/attendee/AttendeeDetail";
import EnquiryForm from "../../admin/crm/enquiry/EnquiryForm";
import EnquiryTable from "../../admin/crm/enquiry/EnquiryTable";
import CategoryTable from "../../admin/crm/category/CategoryTable";
import CategoryForm from "../../admin/crm/category/CategoryForm";
import CategoryDelete from "../../admin/crm/category/CategoryDelete";
import EventDetail from "../../admin/crm/event/EventDetail";
import EnquiryDelete from "../../admin/crm/enquiry/EnquiryDelete";
import EnquiryDetail from "../../admin/crm/enquiry/EnquiryDetail";
// import EnquiryUpdate from "./admin/crm/enquiry/EnquiryUpdate";
import EventUpdate from "../../admin/crm/event/EventUpdate";
import FollowForm from "../../admin/crm/followup/FollowForm";
import FollowTable from "../../admin/crm/followup/FollowupTable";
import FollowDelete from "../../admin/crm/followup/FollowDelete";
import FollowDetail from "../../admin/crm/followup/FollowDetail";
// import ClientDashboard from "./admin/layouts/ClientDashboard";
// import HrmDashboard from "./admin/layouts/HrmDashboard";
// import Login from "./admin/accounts/Login";
// import ProtectedRoute from "./admin/accounts/ProtectedRoute";
// import Logout from "./admin/accounts/Logout";
import ClientDashboard from "../../admin/layouts/ClientDashboard"
import HrmDashboard from "../../admin/layouts/HrmDashboard"
import { Navigate } from "react-router-dom";
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HrmRoute = () => {
  return (
    <Route path="hrm" element={<HrmDashboard />}>
    <Route path="employee" element={<EmployeeList />} />
    <Route path="employee/create" element={<EmployeeForm />} />

 


    {/* ----  Leave Routes---- */}
    <Route path="leave" element={<LeaveDashboard />}>
      <Route path="list" element={<LeaveList />} />
      <Route path="create" element={<LeaveForm />} />
      <Route path="category/list" element={<LeaveCategoryList />} />
      <Route path="category/create" element={<LeaveCategoryForm />} />
    </Route>
    {/* -------------- Assets -------- */}
    {/* <Route path="assets" element={<AssetDashboard />}>
      <Route path="list" element={<AssetsList />} />
      <Route path="create" element={<AssetsForm />} />
      <Route path="assign/list" element={<AssignAssetsList />} />
      <Route path="assign/create" element={<AssignAssetsForm />} />
    </Route> */}

    {/* ---- Attendance---- */}
    <Route path="attendance">
      <Route path="list" element={<AssetsList />} />
      <Route path="create" element={<AssetsForm />} />
    </Route>
    </Route>
  );
};

export default HrmRoute;
