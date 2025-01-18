
import CrmDashboard from "../../admin/layouts/CrmDashboard";
import AttendeeDelete from "../../admin/crm/attendee/AttendeeDelete";

import ProjectTable from "../../admin/crm/project/ProjectTable";
import ProjectDelete from "../../admin/crm/project/ProjectDelete";
import ProjectForm from "../../admin/crm/project/ProjectForm";
import ProjectDetail from "../../admin/crm/project/ProjectDetail";
import EventSystem from "../../admin/crm/event/EventSystem";
import AttendeeForm from "../../admin/crm/attendee/AttendeeForm";

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
import "../../App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { Navigate } from "react-router-dom";
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// // Add other CRM components as needed


// import AdminDashboard from "../../admin/AdminDashboard";
// import UserDashboard from "../../admin/layouts/UserDashboard";
// import EmployeeForm from "../../admin/hrm/employee/Form";
// import EmployeeList from "../../admin/hrm/employee/EmployeeList";
// import CustomerTable from "../../admin/client/customer/CustomerTable";
// import CustomerForm from "../../admin/client/customer/CustomerForm";
// import LeaveCategoryList from "../../admin/hrm/leave/leave_category/List";
// import LeaveForm from "../../admin/hrm/leave/Form";
// import LeaveDashboard from "../../admin/layouts/LeaveDashboard";
// import AssetsDashboard from "../../admin/layouts/AssetDashboard";
// import AssetsForm from "../../admin/hrm/assets/AssetsForm";
// import AssetsList from "../../admin/hrm/assets/AssetList";
// import AssignAssetsForm from "../../admin/hrm/assets/AssignAssetsForm";
// import AssignAssetsList from "../../admin/hrm/assets/AssignAssetsList";
// import LeaveCategoryForm from "../../admin/hrm/leave/leave_category/Form";
// import LeaveList from "../../admin/hrm/leave/List";
// import AssetDashboard from "../../admin/layouts/AssetDashboard";
// import SetupDashboard from "../../admin/layouts/SetupDashboard";

// import ProvinceList from "../../admin/base/province/ProvinceList";

// import DesignationTable from "../../admin/base/designation/DesignationTable";
// import DesignationForm from "../../admin/base/designation/DesignationForm";
// import DistrictTable from "../../admin/base/district/DistrictTable";
// import DistrictForm from "../../admin/base/district/Form";
// import UpdateProvince from "../../admin/base/province/UpdateProvince";
// import DeleteProvince from "../../admin/base/province/DeleteProvince";
// import MunicipalityList from "../../admin/base/municipality/List";
// import DeleteMunicipality from "../../admin/base/municipality/Delete";
// import UpdateMunicipality from "../../admin/base/municipality/Update";
// import MunicipalityForm from "../../admin/base/municipality/Form";
// import UpdateDistrict from "../../admin/base/district/UpdateDistrict";
// import DeleteDistrict from "../../admin/base/district/DeleteDistrict";

// import DeleteProvince from "../../admin/base/province/DeleteProvince";
// import ProvinceForm from "../../admin/base/province/ProvinceForm";
// import DepartmentTable from "../../admin/base/department/DepartmentTable";
// import DepartmentForm from "../../admin/base/department/DepartmentForm";
// import DepartmentDelete from "../../admin/base/department/DepartmentDelete";
// import DayDelete from "../../admin/base/day/DayDelete";
// import DayTable from "../../admin/base/day/DayTable";
// import DayForm from "../../admin/base/day/DayForm";
// import ClientDashboard from "./admin/layouts/ClientDashboard";
// import HrmDashboard from "./admin/layouts/HrmDashboard";
// import Login from "./admin/accounts/Login";
// import ProtectedRoute from "./admin/accounts/ProtectedRoute";
// import Logout from "./admin/accounts/Logout";
// import AttendeeTable from "./admin/crm/attendee/AttendeeTable";
// import MeetingUpdateTable from "./admin/crm/event/meetingupdate/MeetingUpdateTable";
// import MeetingUpdateForm from "./admin/crm/event/meetingupdate/MeetingUpdateForm";
// import AttendeeUpdate from "../../admin/crm/attendee/AttendeeUpdate";
// import AttendeeDetail from "../../admin/crm/attendee/AttendeeDetail";


const CrmRoute = () => {
  return (
    // <Route index element={<DefaultComponent />} />

        // <Route path="crm/" element={<CrmDashboard />}>
        <Route path="/" element={<CrmDashboard />}>
            {/* dashboard/crm/category */}
            <Route path="category" element={<CategoryTable />} />
            <Route path="category/create" element={<CategoryForm />} />
            <Route path="category/delete/:id/" element={<CategoryDelete />} />

            {/* localhost/dashbaord/crm/enquiry */}
            <Route path="enquiry" element={<EnquiryTable />} />
            <Route path="enquiry/create/" element={<EnquiryForm />} />
            <Route path="enquiry/delete/" element={<EnquiryDelete />} />
            <Route path="enquiry/detail/:id/" element={<EnquiryDetail />} />
            {/* <Route path="/follow/:followId" element={<EnquiryDetail />} /> */}
            <Route path="enquiry/update/:id/" element={<EnquiryForm />} />
            {/* <Route path="enquiry/update/:id/" element={<EnquiryUpdate />} /> */}

            {/*  {/* localhost/dashbaord/crm/project */}
            <Route path="project" element={<ProjectTable />} />
            <Route path="project/create" element={<ProjectForm />} />
            <Route path="project/update/:id/" element={<ProjectForm />} />
            <Route path="project/delete/:id/" element={<ProjectDelete />} />
            <Route path="project/detail/:id/" element={<ProjectDetail />} />

            {/*  {/* localhost/dashbaord/crm/event */}
            <Route path="event" element={<EventSystem />} />
            <Route path="event/create" element={<EventSystem />} />
            <Route path="event/update/:id/" element={<EventUpdate />} />
            {/* <Route path="event/cancel/:id/" element={<ProjectDelete />} /> */}
            <Route path="event/detail/:id/" element={<EventDetail />} />
            <Route path="attendee/update/:id/" element={<AttendeeForm />} />
            <Route path="attendee/delete/:id/" element={<AttendeeDelete />} />
            {/*  {/* localhost/dashbaord/crm/project */}
            <Route path="follow" element={<FollowTable />} />
            <Route path="follow/create" element={<FollowForm />} />
            <Route path="follow/update/:id/" element={<FollowForm />} />
            <Route
              path="/dashboard/crm/follow/delete/:id/"
              element={<FollowDelete />}
            />
            <Route
              path="/dashboard/crm/follow/detail/:id/"
              element={<FollowDetail />}
            />

            </Route>

  );
};

export default CrmRoute;

//###########

{/* dashboard/crm/attendees */}
            {/* <Route path="attendee" element={<AttendeeTable />} />
            <Route path="attendee/create/" element={<AttendeeForm />} />
            <Route
              path="/dashboard/crm/attendee/detail/:id"
              element={<AttendeeDetail />}
            /> */}


       {/* meeting update */}
            {/* <Route path="meeting-update" element={<MeetingUpdateTable />} />
            <Route
              path="meeting-update/create"
              element={<MeetingUpdateForm />}
            />
            <Route
              path="meeting-update/update/:id/"
              element={<MeetingUpdateForm />}
            /> */}
            {/* <Route
              path="meeting-update/cancel/:id/"
              element={<ProjectDelete />}
            /> */}
            {/* <Route
              path="meeting-update/detail/:id/"
              element={<MeetingUpdateDetail />}
            /> */}
