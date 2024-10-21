import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
// import AssignAssetsForm from "./admin/container/assets/AssignAssetsForm";
// import AssignAssetsList from "./admin/container/assets/AssignAssetsList";
import LeaveCategoryForm from "./admin/container/leave/leave_category/Form";
import LeaveList from "./admin/container/leave/List";
// import AssetDashboard from "./admin/layouts/AssetDashboard";
import SetupDashboard from "./admin/layouts/SetupDashboard";
import ZoneList from "./admin/base/zone/List";
import ZoneForm from "./admin/base/zone/Form";
import ProvinceList from "./admin/base/province/ProvinceList";

import DesignationTable from "./admin/base/designation/DesignationTable";
import DesignationForm from "./admin/base/designation/DesignationForm";
import DistrictTable from "./admin/base/district/DistrictTable";
import DistrictForm from "./admin/base/district/Form";
import UpdateProvince from "./admin/base/province/UpdateProvince";
// import DeleteProvince from "./admin/base/province/DeleteProvince";
import MunicipalityList from "./admin/base/municipality/List";
import DeleteMunicipality from "./admin/base/municipality/Delete";
import UpdateMunicipality from "./admin/base/municipality/Update";
import MunicipalityForm from "./admin/base/municipality/Form";
import UpdateDistrict from "./admin/base/district/UpdateDistrict";
import DeleteDistrict from "./admin/base/district/DeleteDistrict";

import DeleteProvince from "./admin/base/province/DeleteProvince";
import ProvinceForm from "./admin/base/province/ProvinceForm";
import DepartmentTable from "./admin/base/department/DepartmentTable";
import DepartmentForm from "./admin/base/department/DepartmentForm";
import DepartmentDelete from "./admin/base/department/DepartmentDelete";
import DayDelete from "./admin/base/day/DayDelete";
import DayTable from "./admin/base/day/DayTable";
import DayForm from "./admin/base/day/DayForm";
import CrmDashboard from "./admin/layouts/CrmDashboard";
import ProjectTable from "./admin/crm/project/ProjectTable";
import ProjectDelete from "./admin/crm/project/ProjectDelete";
import ProjectForm from "./admin/crm/project/ProjectForm";
import ProjectDetail from "./admin/crm/project/ProjectDetail";
import EventSystem from "./admin/crm/event/EventSystem";
import AttendeeForm from "./admin/crm/attendee/AttendeeForm";
import AttendeeTable from "./admin/crm/attendee/AttendeeTable";
// import MeetingUpdateTable from "./admin/crm/event/meetingupdate/MeetingUpdateTable";
// import MeetingUpdateForm from "./admin/crm/event/meetingupdate/MeetingUpdateForm";
import AttendeeDelete from "./admin/crm/attendee/AttendeeDelete";
import AttendeeUpdate from "./admin/crm/attendee/AttendeeUpdate";
import AttendeeDetail from "./admin/crm/attendee/AttendeeDetail";
import EnquiryForm from "./admin/crm/enquiry/EnquiryForm";
import EnquiryTable from "./admin/crm/enquiry/EnquiryTable";
import CategoryTable from "./admin/crm/category/CategoryTable";
import CategoryForm from "./admin/crm/category/CategoryForm";
import CategoryDelete from "./admin/crm/category/CategoryDelete";
import EventDetail from "./admin/crm/event/EventDetail";
import EnquiryDelete from "./admin/crm/enquiry/EnquiryDelete";
import EnquiryDetail from "./admin/crm/enquiry/EnquiryDetail";
import EnquiryUpdate from "./admin/crm/enquiry/EnquiryUpdate";
import EventUpdate from "./admin/crm/event/EventUpdate";
// import ProjectForm from "./admin/"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Dashboard Route */}
          <Route path="/dashboard">
            {/*localhost/dashboard */}
            <Route index element={<AdminDashboard />} />
            <Route path="crm" element={<CrmDashboard />}>
              {/* dashboard/crm/category */}
              <Route path="category" element={<CategoryTable />} />
              <Route path="category/create" element={<CategoryForm />} />
              <Route path="category/delete/:id/" element={<CategoryDelete />} />

              {/* localhost/dashbaord/crm/enquiry */}
              <Route path="enquiry" element={<EnquiryTable />} />
              <Route path="enquiry/create/" element={<EnquiryForm />} />
              <Route path="enquiry/delete/" element={<EnquiryDelete />} />
              <Route path="enquiry/detail/:id/" element={<EnquiryDetail />} />
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

              {/* dashboard/crm/attendees */}
              <Route path="attendee" element={<AttendeeTable />} />
              <Route path="attendee/create/" element={<AttendeeForm />} />
              <Route
                path="/dashboard/crm/attendee/detail/:id"
                element={<AttendeeDetail />}
              />
              <Route path="attendee/update/:id/" element={<AttendeeUpdate />} />
              <Route path="attendee/delete/:id/" element={<AttendeeDelete />} />

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
              <Route
                path="meeting-update/cancel/:id/"
                element={<ProjectDelete />}
              />
              {/* <Route
                path="meeting-update/detail/:id/"
                element={<MeetingUpdateDetail />}
              /> */}
            </Route>

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
            {/* ---------------- setup------------------------------ */}
            {/* localhost/dashboard/setup/zone */}
            <Route path="setup" element={<SetupDashboard />}>
              <Route path="designation" element={<DesignationTable />} />
              <Route path="designation/create" element={<DesignationForm />} />
              {/* department */}
              <Route path="department" element={<DepartmentTable />} />
              <Route path="department/create" element={<DepartmentForm />} />

              <Route
                path="department/delete/:id"
                element={<DepartmentDelete />}
              />
              {/* zone */}
              <Route path="zone" element={<ZoneList />} />
              <Route path="zone/create" element={<ZoneForm />} />

              {/* district route=>localhost/dashboard/setup/district*/}
              <Route path="district" element={<DistrictTable />} />
              <Route path="district/create/" element={<DistrictForm />} />
              <Route path="district/update/:id/" element={<UpdateDistrict />} />
              <Route path="district/delete/:id/" element={<DeleteDistrict />} />

              {/* municipality  route -> localhost/dashboard/setup/municipality*/}
              <Route path="municipality" element={<MunicipalityList />} />
              <Route
                path="municipality/create"
                element={<MunicipalityForm />}
              />
              <Route
                path="municipality/update/:id"
                element={<UpdateMunicipality />}
              />
              <Route
                path="municipality/delete/:id"
                element={<DeleteMunicipality />}
              />

              {/* province route -> localhost/dashboard/setup/province*/}
              <Route path="province" element={<ProvinceList />} />
              <Route path="province/create/" element={<ProvinceForm />} />
              <Route path="province/update/:id" element={<UpdateProvince />} />
              <Route path="province/delete/:id" element={<DeleteProvince />} />
              {/* day route */}
              <Route path="day" element={<DayTable />} />
              <Route path="day/create" element={<DayForm />} />
              {/* <Route
                path="department/update/:id"
                element={<UpdateMunicipality />}
              /> */}
              <Route path="day/delete/:id" element={<DayDelete />} />
              {/* crm dashboard */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
