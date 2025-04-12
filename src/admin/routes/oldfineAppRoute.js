

// old working route.
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
// import UserDashboard from "./admin/layouts/UserDashboard";
import EmployeeForm from "./admin/hrm/employee/Form";
import EmployeeList from "./admin/hrm/employee/EmployeeList";
import CustomerTable from "./admin/client/customer/CustomerTable";
import CustomerForm from "./admin/client/customer/CustomerForm";
import LeaveCategoryList from "./admin/hrm/leave/leave_category/List";
import LeaveForm from "./admin/hrm/leave/Form";
import LeaveDashboard from "./admin/layouts/LeaveDashboard";
// import AssetsDashboard from "./admin/layouts/AssetDashboard";
import AssetsForm from "./admin/hrm/assets/AssetsForm";
import AssetsList from "./admin/hrm/assets/AssetList";
// import AssignAssetsForm from "./admin/hrm/assets/AssignAssetsForm";
// import AssignAssetsList from "./admin/hrm/assets/AssignAssetsList";
import LeaveCategoryForm from "./admin/hrm/leave/leave_category/Form";
import LeaveList from "./admin/hrm/leave/List";
// import AssetDashboard from "./admin/layouts/AssetDashboard";
import SetupDashboard from "./admin/layouts/SetupDashboard";
import ProvinceList from "./admin/base/province/ProvinceList";
import DesignationTable from "./admin/base/designation/DesignationTable";
import DesignationForm from "./admin/base/designation/DesignationForm";
import DistrictTable from "./admin/base/district/DistrictTable";
import DistrictForm from "./admin/base/district/Form";
import UpdateProvince from "./admin/base/province/UpdateProvince";
// import DeleteProvince from "./admin/base/province/DeleteProvince";
import MunicipalityList from "./admin/base/municipality/List";
import DeleteMunicipality from "./admin/base/municipality/DeleteMunicipality";
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
// import EnquiryUpdate from "./admin/crm/enquiry/EnquiryUpdate";
import EventUpdate from "./admin/crm/event/EventUpdate";
import FollowForm from "./admin/crm/followup/FollowForm";
import FollowTable from "./admin/crm/followup/FollowupTable";
import FollowDelete from "./admin/crm/followup/FollowDelete";
import FollowDetail from "./admin/crm/followup/FollowDetail";
import ClientDashboard from "./admin/layouts/ClientDashboard";
import HrmDashboard from "./admin/layouts/HrmDashboard";
import CustomerDetail from "./admin/client/customer/CustomerDetail";
import Logout from "./admin/accounts/Logout";
import { Login } from "@mui/icons-material";
import PrivateRoute from "./admin/accounts/PrivateRoute";  // Adjust the path if needed
import MeetingUpdateTable from "./admin/crm/meetingupdate/MeetingUpdateTable";
import MeetingUpdateForm from "./admin/crm/meetingupdate/MeetingUpdateForm";

function App() {
  // const isAuthenticated = localStorage.getItem("access_token") !== null;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          {/* <Route path="/login" element={<Login />} /> */}

          {/* Protected Routes */}
          {/* <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}> */}
            <Route path="/dashboard">
              {/* localhost/dashboard */}
              <Route index element={<AdminDashboard />} />

              <Route path="crm" element={<CrmDashboard />}>
                {/* dashboard/crm/category */}
                <Route path="category" element={<CategoryTable />} />
                <Route path="category/create" element={<CategoryForm />} />
                <Route path="category/delete/:id/" element={<CategoryDelete />} />

                {/* localhost/dashboard/crm/enquiry */}
                <Route path="enquiry" element={<EnquiryTable />} />
                <Route path="enquiry/create/" element={<EnquiryForm />} />
                <Route path="enquiry/delete/" element={<EnquiryDelete />} />
                <Route path="enquiry/detail/:id/" element={<EnquiryDetail />} />
                <Route path="enquiry/update/:id/" element={<EnquiryForm />} />
                {/* meetingupdate */}
                <Route path="meetingupdate/:id" element={<MeetingUpdateTable />} />
                <Route path="meetingupdate/create" element={<MeetingUpdateForm />} />

                {/* localhost/dashboard/crm/project */}
                <Route path="project" element={<ProjectTable />} />
                <Route path="project/create" element={<ProjectForm />} />
                <Route path="project/update/:id/" element={<ProjectForm />} />
                <Route path="project/delete/:id/" element={<ProjectDelete />} />
                <Route path="project/detail/:id/" element={<ProjectDetail />} />

                {/* localhost/dashboard/crm/event */}
                <Route path="event" element={<EventSystem />} />
                <Route path="event/create" element={<EventSystem />} />
                <Route path="event/update/:id/" element={<EventUpdate />} />
                <Route path="event/detail/:id/" element={<EventDetail />} />

                {/* dashboard/crm/attendees */}
                <Route path="attendee/update/:id/" element={<AttendeeForm />} />
                <Route path="attendee/delete/:id/" element={<AttendeeDelete />} />

                {/* localhost/dashboard/crm/follow */}
                <Route path="follow" element={<FollowTable />} />
                <Route path="follow/create" element={<FollowForm />} />
                <Route path="follow/update/:id/" element={<FollowForm />} />
                <Route path="/dashboard/crm/follow/delete/:id/" element={<FollowDelete />} />
                <Route path="/dashboard/crm/follow/detail/:id/" element={<FollowDetail />} />
                <Route path="/dashboard/crm/follow/detail/:id/" element={<FollowDetail />} />


              </Route>

              {/* Customer Routes */}
              <Route path="customer" element={<ClientDashboard />}>
                <Route path="customer-list" element={<CustomerTable />} />
                <Route path="create" element={<CustomerForm />} />
                <Route path="update/:id/" element={<CustomerForm />} />
                <Route path="detail/:id/" element={<CustomerDetail />} />
              </Route>

              {/* HRM Routes */}
              <Route path="hrm" element={<HrmDashboard />}>
                <Route path="employee/employee-list" element={<EmployeeList />} />
                <Route path="employee/create" element={<EmployeeForm />} />

                <Route path="leave" element={<LeaveDashboard />}>
                <Route index element={<LeaveList />} />
                {/* // Default leave page */}
                  {/* <Route path="list" element={<LeaveList />} /> */}
                  <Route path="create" element={<LeaveForm />} />
                  <Route path="category/list" element={<LeaveCategoryList />} />
                  <Route path="category/create" element={<LeaveCategoryForm />} />
                </Route>
                {/* hrm/asset */}
                <Route path="asset">
                  <Route path="list" element={<AssetsList />} />
                  <Route path="create" element={<AssetsForm />} />

                  <Route path="assign-asset/list" element={<AssetsList />} />
                  <Route path="assign-asset/create" element={<AssetsForm />} />

                </Route>

                <Route path="attendance">
                  <Route path="list" element={<AssetsList />} />
                  <Route path="create" element={<AssetsForm />} />
                </Route>
              </Route>

              {/* Setup Routes */}
              <Route path="setup" element={<SetupDashboard />}>
                <Route path="designation" element={<DesignationTable />} />
                <Route path="designation/create" element={<DesignationForm />} />
                <Route path="department" element={<DepartmentTable />} />
                <Route path="department/create" element={<DepartmentForm />} />
                <Route path="department/delete/:id" element={<DepartmentDelete />} />
                <Route path="district" element={<DistrictTable />} />
                <Route path="district/create/" element={<DistrictForm />} />
                <Route path="district/update/:id/" element={<UpdateDistrict />} />
                <Route path="district/delete/:id/" element={<DeleteDistrict />} />
                <Route path="municipality" element={<MunicipalityList />} />
                <Route path="municipality/create" element={<MunicipalityForm />} />
                <Route path="municipality/update/:id" element={<UpdateMunicipality />} />
                <Route path="municipality/delete/:id" element={<DeleteMunicipality />} />
                <Route path="province" element={<ProvinceList />} />
                <Route path="province/create/" element={<ProvinceForm />} />
                <Route path="province/update/:id" element={<UpdateProvince />} />
                <Route path="province/delete/:id" element={<DeleteProvince />} />
                <Route path="day" element={<DayTable />} />
                <Route path="day/create" element={<DayForm />} />
                <Route path="day/delete/:id" element={<DayDelete />} />
              </Route>
            </Route>



          {/* </Route> */}

          {/* Logout Route */}
          <Route path="/logout" element={<Logout />} />

          {/* Catch-all Redirect */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




// ####### old good working url
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import UserDashboard from "./admin/layouts/UserDashboard";
// import EmployeeForm from "./admin/hrm/employee/Form";
// import EmployeeList from "./admin/hrm/employee/EmployeeList";
// import CustomerTable from "./admin/client/customer/CustomerTable";
// import CustomerForm from "./admin/client/customer/CustomerForm";
// import LeaveCategoryList from "./admin/hrm/leave/leave_category/List";
// import LeaveForm from "./admin/hrm/leave/Form";
// import LeaveDashboard from "./admin/layouts/LeaveDashboard";
// // import AssetsDashboard from "./admin/layouts/AssetDashboard";
// import AssetsForm from "./admin/hrm/assets/AssetsForm";
// import AssetsList from "./admin/hrm/assets/AssetList";
// // import AssignAssetsForm from "./admin/hrm/assets/AssignAssetsForm";
// // import AssignAssetsList from "./admin/hrm/assets/AssignAssetsList";
// import LeaveCategoryForm from "./admin/hrm/leave/leave_category/Form";
// import LeaveList from "./admin/hrm/leave/List";
// // import AssetDashboard from "./admin/layouts/AssetDashboard";
// import SetupDashboard from "./admin/layouts/SetupDashboard";
// // import ZoneList from "./admin/base/zone/List";
// // import ZoneForm from "./admin/base/zone/Form";
// import ProvinceList from "./admin/base/province/ProvinceList";

// import DesignationTable from "./admin/base/designation/DesignationTable";
// import DesignationForm from "./admin/base/designation/DesignationForm";
// import DistrictTable from "./admin/base/district/DistrictTable";
// import DistrictForm from "./admin/base/district/Form";
// import UpdateProvince from "./admin/base/province/UpdateProvince";
// // import DeleteProvince from "./admin/base/province/DeleteProvince";
// import MunicipalityList from "./admin/base/municipality/List";
// import DeleteMunicipality from "./admin/base/municipality/Delete";
// import UpdateMunicipality from "./admin/base/municipality/Update";
// import MunicipalityForm from "./admin/base/municipality/Form";
// import UpdateDistrict from "./admin/base/district/UpdateDistrict";
// import DeleteDistrict from "./admin/base/district/DeleteDistrict";

// import DeleteProvince from "./admin/base/province/DeleteProvince";
// import ProvinceForm from "./admin/base/province/ProvinceForm";
// import DepartmentTable from "./admin/base/department/DepartmentTable";
// import DepartmentForm from "./admin/base/department/DepartmentForm";
// import DepartmentDelete from "./admin/base/department/DepartmentDelete";
// import DayDelete from "./admin/base/day/DayDelete";
// import DayTable from "./admin/base/day/DayTable";
// import DayForm from "./admin/base/day/DayForm";
// import CrmDashboard from "./admin/layouts/CrmDashboard";
// import ProjectTable from "./admin/crm/project/ProjectTable";
// import ProjectDelete from "./admin/crm/project/ProjectDelete";
// import ProjectForm from "./admin/crm/project/ProjectForm";
// import ProjectDetail from "./admin/crm/project/ProjectDetail";
// import EventSystem from "./admin/crm/event/EventSystem";
// import AttendeeForm from "./admin/crm/attendee/AttendeeForm";
// import AttendeeTable from "./admin/crm/attendee/AttendeeTable";
// // import MeetingUpdateTable from "./admin/crm/event/meetingupdate/MeetingUpdateTable";
// // import MeetingUpdateForm from "./admin/crm/event/meetingupdate/MeetingUpdateForm";
// import AttendeeDelete from "./admin/crm/attendee/AttendeeDelete";
// import AttendeeUpdate from "./admin/crm/attendee/AttendeeUpdate";
// import AttendeeDetail from "./admin/crm/attendee/AttendeeDetail";
// import EnquiryForm from "./admin/crm/enquiry/EnquiryForm";
// import EnquiryTable from "./admin/crm/enquiry/EnquiryTable";
// import CategoryTable from "./admin/crm/category/CategoryTable";
// import CategoryForm from "./admin/crm/category/CategoryForm";
// import CategoryDelete from "./admin/crm/category/CategoryDelete";
// import EventDetail from "./admin/crm/event/EventDetail";
// import EnquiryDelete from "./admin/crm/enquiry/EnquiryDelete";
// import EnquiryDetail from "./admin/crm/enquiry/EnquiryDetail";
// // import EnquiryUpdate from "./admin/crm/enquiry/EnquiryUpdate";
// import EventUpdate from "./admin/crm/event/EventUpdate";
// import FollowForm from "./admin/crm/followup/FollowForm";
// import FollowTable from "./admin/crm/followup/FollowupTable";
// import FollowDelete from "./admin/crm/followup/FollowDelete";
// import FollowDetail from "./admin/crm/followup/FollowDetail";
// import ClientDashboard from "./admin/layouts/ClientDashboard";
// import HrmDashboard from "./admin/layouts/HrmDashboard";

// // import customerDashboard from "./admin/layouts";
// // import LoginForm from "./admin/accounts/LoginForm";
// // import ProjectForm from "./admin/"
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Admin Dashboard Route */}
//           <Route path="/dashboard">
//             {/*localhost/dashboard */}
//             <Route index element={<AdminDashboard />} />
//             <Route path="crm" element={<CrmDashboard />}>
//               {/* dashboard/crm/category */}
//               <Route path="category" element={<CategoryTable />} />
//               <Route path="category/create" element={<CategoryForm />} />
//               <Route path="category/delete/:id/" element={<CategoryDelete />} />

//               {/* localhost/dashbaord/crm/enquiry */}
//               <Route path="enquiry" element={<EnquiryTable />} />
//               <Route path="enquiry/create/" element={<EnquiryForm />} />
//               <Route path="enquiry/delete/" element={<EnquiryDelete />} />
//               <Route path="enquiry/detail/:id/" element={<EnquiryDetail />} />
//               {/* <Route path="/follow/:followId" element={<EnquiryDetail />} /> */}
//               <Route path="enquiry/update/:id/" element={<EnquiryForm />} />
//               {/* <Route path="enquiry/update/:id/" element={<EnquiryUpdate />} /> */}

//               {/*  {/* localhost/dashbaord/crm/project */}
//               <Route path="project" element={<ProjectTable />} />
//               <Route path="project/create" element={<ProjectForm />} />
//               <Route path="project/update/:id/" element={<ProjectForm />} />
//               <Route path="project/delete/:id/" element={<ProjectDelete />} />
//               <Route path="project/detail/:id/" element={<ProjectDetail />} />

//               {/*  {/* localhost/dashbaord/crm/event */}
//               <Route path="event" element={<EventSystem />} />
//               <Route path="event/create" element={<EventSystem />} />
//               <Route path="event/update/:id/" element={<EventUpdate />} />
//               {/* <Route path="event/cancel/:id/" element={<ProjectDelete />} /> */}
//               <Route path="event/detail/:id/" element={<EventDetail />} />

//               {/* dashboard/crm/attendees */}
//               {/* <Route path="attendee" element={<AttendeeTable />} />
//               <Route path="attendee/create/" element={<AttendeeForm />} />
//               <Route
//                 path="/dashboard/crm/attendee/detail/:id"
//                 element={<AttendeeDetail />}
//               /> */}
//               <Route path="attendee/update/:id/" element={<AttendeeForm />} />
//               <Route path="attendee/delete/:id/" element={<AttendeeDelete />} />
//               {/*  {/* localhost/dashbaord/crm/project */}
//               <Route path="follow" element={<FollowTable />} />
//               <Route path="follow/create" element={<FollowForm />} />
//               <Route path="follow/update/:id/" element={<FollowForm />} />
//               <Route
//                 path="/dashboard/crm/follow/delete/:id/"
//                 element={<FollowDelete />}
//               />
//               <Route
//                 path="/dashboard/crm/follow/detail/:id/"
//                 element={<FollowDetail />}
//               />
//               {/* meeting update */}
//               {/* <Route path="meeting-update" element={<MeetingUpdateTable />} />
//               <Route
//                 path="meeting-update/create"
//                 element={<MeetingUpdateForm />}
//               />
//               <Route
//                 path="meeting-update/update/:id/"
//                 element={<MeetingUpdateForm />}
//               /> */}
//               <Route
//                 path="meeting-update/cancel/:id/"
//                 element={<ProjectDelete />}
//               />
//               {/* <Route
//                 path="meeting-update/detail/:id/"
//                 element={<MeetingUpdateDetail />}
//               /> */}
//             </Route>
//             {/* customer */}
//             <Route path="customer" element={<ClientDashboard />}>
//               {/* localhost/dashbaord/customer */}
//               <Route path="customer-list" element={<CustomerTable/>} />
//               <Route path="create" element={<CustomerForm />} />
//               <Route path="update/:id/" element={<CustomerForm />} />
//               {/* // <Route path="customer/detail/:id/" element={<CustomerDetail />} /> */}
//             </Route>


//             {/* localhost/dashboard/user */}


//               {/* localhost/dashbaord/employee */}
//               {/* Nested routes under HrmDashboard */}
//           <Route path="hrm" element={<HrmDashboard />}>
//             <Route path="employee" element={<EmployeeList />} />
//             <Route path="employee/create" element={<EmployeeForm />} />

//           </Route>


//             {/* ----  Leave Routes---- */}
//             <Route path="leave" element={<LeaveDashboard />}>
//               <Route path="list" element={<LeaveList />} />
//               <Route path="create" element={<LeaveForm />} />
//               <Route path="category/list" element={<LeaveCategoryList />} />
//               <Route path="category/create" element={<LeaveCategoryForm />} />
//             </Route>
//             {/* -------------- Assets -------- */}
//             {/* <Route path="assets" element={<AssetDashboard />}>
//               <Route path="list" element={<AssetsList />} />
//               <Route path="create" element={<AssetsForm />} />
//               <Route path="assign/list" element={<AssignAssetsList />} />
//               <Route path="assign/create" element={<AssignAssetsForm />} />
//             </Route> */}

//             {/* ---- Attendance---- */}
//             <Route path="attendance">
//               <Route path="list" element={<AssetsList />} />
//               <Route path="create" element={<AssetsForm />} />
//             </Route>
//             {/* ---------------- setup------------------------------ */}
//             {/* localhost/dashboard/setup/zone */}
//             <Route path="setup" element={<SetupDashboard />}>
//               <Route path="designation" element={<DesignationTable />} />
//               <Route path="designation/create" element={<DesignationForm />} />
//               {/* department */}
//               <Route path="department" element={<DepartmentTable />} />
//               <Route path="department/create" element={<DepartmentForm />} />

//               <Route
//                 path="department/delete/:id"
//                 element={<DepartmentDelete />}
//               />
//               {/* zone
//               <Route path="zone" element={<ZoneList />} />
//               <Route path="zone/create" element={<ZoneForm />} /> */}

//               {/* district route=>localhost/dashboard/setup/district*/}
//               <Route path="district" element={<DistrictTable />} />
//               <Route path="district/create/" element={<DistrictForm />} />
//               <Route path="district/update/:id/" element={<UpdateDistrict />} />
//               <Route path="district/delete/:id/" element={<DeleteDistrict />} />

//               {/* municipality  route -> localhost/dashboard/setup/municipality*/}
//               <Route path="municipality" element={<MunicipalityList />} />
//               <Route
//                 path="municipality/create"
//                 element={<MunicipalityForm />}
//               />
//               <Route
//                 path="municipality/update/:id"
//                 element={<UpdateMunicipality />}
//               />
//               <Route
//                 path="municipality/delete/:id"
//                 element={<DeleteMunicipality />}
//               />

//               {/* province route -> localhost/dashboard/setup/province*/}
//               <Route path="province" element={<ProvinceList />} />
//               <Route path="province/create/" element={<ProvinceForm />} />
//               <Route path="province/update/:id" element={<UpdateProvince />} />
//               <Route path="province/delete/:id" element={<DeleteProvince />} />
//               {/* day route */}
//               <Route path="day" element={<DayTable />} />
//               <Route path="day/create" element={<DayForm />} />
//               {/* <Route
//                 path="department/update/:id"
//                 element={<UpdateMunicipality />}
//               /> */}
//               <Route path="day/delete/:id" element={<DayDelete />} />
//               {/* crm dashboard */}
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
// #######old fine working url end#####

// new second route

// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import SetupDashboard from "./admin/layouts/SetupDashboard";
// import ProvinceList from "./admin/base/province/ProvinceList";
// import DesignationTable from "./admin/base/designation/DesignationTable";
// import DesignationForm from "./admin/base/designation/DesignationForm";
// import DistrictTable from "./admin/base/district/DistrictTable";
// import DistrictForm from "./admin/base/district/Form";
// import UpdateProvince from "./admin/base/province/UpdateProvince";
// import DeleteProvince from "./admin/base/province/DeleteProvince";
// import MunicipalityList from "./admin/base/municipality/List";
// import DeleteMunicipality from "./admin/base/municipality/Delete";
// import UpdateMunicipality from "./admin/base/municipality/Update";
// import MunicipalityForm from "./admin/base/municipality/Form";
// import UpdateDistrict from "./admin/base/district/UpdateDistrict";
// import DeleteDistrict from "./admin/base/district/DeleteDistrict";
// import DepartmentTable from "./admin/base/department/DepartmentTable";
// import DepartmentForm from "./admin/base/department/DepartmentForm";
// import DepartmentDelete from "./admin/base/department/DepartmentDelete";
// import DayDelete from "./admin/base/day/DayDelete";
// import DayTable from "./admin/base/day/DayTable";
// import DayForm from "./admin/base/day/DayForm";
// import CrmDashboard from "./admin/layouts/CrmDashboard";
// import ProjectTable from "./admin/crm/project/ProjectTable";
// import ProjectDelete from "./admin/crm/project/ProjectDelete";
// import ProjectForm from "./admin/crm/project/ProjectForm";
// import ProjectDetail from "./admin/crm/project/ProjectDetail";
// import EventSystem from "./admin/crm/event/EventSystem";
// import AttendeeForm from "./admin/crm/attendee/AttendeeForm";
// import AttendeeTable from "./admin/crm/attendee/AttendeeTable";
// import AttendeeDelete from "./admin/crm/attendee/AttendeeDelete";
// import AttendeeUpdate from "./admin/crm/attendee/AttendeeUpdate";
// import AttendeeDetail from "./admin/crm/attendee/AttendeeDetail";
// import EnquiryForm from "./admin/crm/enquiry/EnquiryForm";
// import EnquiryTable from "./admin/crm/enquiry/EnquiryTable";
// import CategoryTable from "./admin/crm/category/CategoryTable";
// import CategoryForm from "./admin/crm/category/CategoryForm";
// import CategoryDelete from "./admin/crm/category/CategoryDelete";
// import EventDetail from "./admin/crm/event/EventDetail";
// import EnquiryDelete from "./admin/crm/enquiry/EnquiryDelete";
// import EnquiryDetail from "./admin/crm/enquiry/EnquiryDetail";
// import EnquiryUpdate from "./admin/crm/enquiry/EnquiryUpdate";
// import EventUpdate from "./admin/crm/event/EventUpdate";
// import FollowForm from "./admin/crm/followup/FollowForm";
// import FollowTable from "./admin/crm/followup/FollowupTable";
// import FollowDelete from "./admin/crm/followup/FollowDelete";
// import Login from "./admin/accounts/Login";
// // import ProtectedRoute from "./admin/accounts/ProtectedRoute";
// import Logout from "./admin/accounts/Logout";
// import ProvinceForm from "./admin/base/province/ProvinceForm";
// import ClientDashboard from "./admin/layouts/ClientDashboard";
// import CustomerTable from "./admin/client/customer/CustomerTable";
// import CustomerDetail from "./admin/client/customer/CustomerDetail";
// import CustomerForm from "./admin/client/customer/CustomerForm";
// import { Navigate } from "react-router-dom";
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { useState, useEffect } from 'react';

// function App() {
//   // const isAuthenticated = false; // Replace with actual authentication check    // Check if the user is authenticated (using localStorage here as an example)
//     const isAuthenticated = localStorage.getItem("access_token") !== null;

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Public Route */}
//           <Route path="/login" element={<Login />} />

//           {/* Protected Routes */}
//           {/* <Route
//             path="/"
//             element={
//               isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
//             }
//           > */}

//           {/* <Route path="/" element={<ProtectedRoute />}> */}
//           {/* Admin Dashboard Route */}
//           <Route path="/dashboard" element={<AdminDashboard />}>
//             {/* CRM Dashboard */}
//             <Route path="crm" element={<CrmDashboard />}>
//               <Route path="category" element={<CategoryTable />} />
//               <Route path="category/create" element={<CategoryForm />} />
//               <Route path="category/delete/:id" element={<CategoryDelete />} />

//               {/* Enquiry */}
//               <Route path="enquiry" element={<EnquiryTable />} />
//               <Route path="enquiry/create" element={<EnquiryForm />} />
//               <Route path="enquiry/delete/:id" element={<EnquiryDelete />} />
//               <Route path="enquiry/detail/:id" element={<EnquiryDetail />} />
//               <Route path="enquiry/update/:id" element={<EnquiryUpdate />} />

//               {/* Project */}
//               <Route path="project" element={<ProjectTable />} />
//               <Route path="project/create" element={<ProjectForm />} />
//               <Route path="project/update/:id" element={<ProjectForm />} />
//               <Route path="project/delete/:id" element={<ProjectDelete />} />
//               <Route path="project/detail/:id" element={<ProjectDetail />} />

//               {/* Event */}
//               <Route path="event" element={<EventSystem />} />
//               <Route path="event/create" element={<EventSystem />} />
//               <Route path="event/update/:id" element={<EventUpdate />} />
//               <Route path="event/detail/:id" element={<EventDetail />} />

//               {/* Attendees */}
//               <Route path="attendee" element={<AttendeeTable />} />
//               <Route path="attendee/create" element={<AttendeeForm />} />
//               <Route path="attendee/detail/:id" element={<AttendeeDetail />} />
//               <Route path="attendee/update/:id" element={<AttendeeUpdate />} />
//               <Route path="attendee/delete/:id" element={<AttendeeDelete />} />

//               {/* Follow-up */}
//               <Route path="follow" element={<FollowTable />} />
//               <Route path="follow/create" element={<FollowForm />} />
//               <Route path="follow/update/:id" element={<FollowForm />} />
//               <Route path="follow/delete/:id" element={<FollowDelete />} />
//             </Route>

//             {/* Setup Routes */}
//             <Route path="setup" element={<SetupDashboard />}>
//               <Route path="designation" element={<DesignationTable />} />
//               <Route path="designation/create" element={<DesignationForm />} />
//               <Route path="department" element={<DepartmentTable />} />
//               <Route path="department/create" element={<DepartmentForm />} />
//               <Route
//                 path="department/delete/:id"
//                 element={<DepartmentDelete />}
//               />

//               <Route path="district" element={<DistrictTable />} />
//               <Route path="district/create" element={<DistrictForm />} />
//               <Route path="district/update/:id" element={<UpdateDistrict />} />
//               <Route path="district/delete/:id" element={<DeleteDistrict />} />
//               <Route path="municipality" element={<MunicipalityList />} />
//               <Route
//                 path="municipality/create"
//                 element={<MunicipalityForm />}
//               />
//               <Route
//                 path="municipality/update/:id"
//                 element={<UpdateMunicipality />}
//               />
//               <Route
//                 path="municipality/delete/:id"
//                 element={<DeleteMunicipality />}
//               />
//               <Route path="province" element={<ProvinceList />} />
//               <Route path="province/create" element={<ProvinceForm />} />
//               <Route path="province/update/:id" element={<UpdateProvince />} />
//               <Route path="province/delete/:id" element={<DeleteProvince />} />
//               <Route path="day" element={<DayTable />} />
//               <Route path="day/create" element={<DayForm />} />
//               <Route path="day/delete/:id" element={<DayDelete />} />
//             </Route>
//             {/* customer */}
//             <Route path="customer" element={<ClientDashboard />}>
//                {/* localhost/dashbaord/customer */}
//                <Route path="customer-list/" element={<CustomerTable/>} />
//                <Route path="create" element={<CustomerForm />} />
//                <Route path="update/:id/" element={<CustomerForm />} />
//                <Route path="detail/:id/" element={<CustomerDetail />} />
//              </Route>
//           </Route>
//           {/* </Route>  */}
//       {/* </Route> */}

//           {/* Logout Route */}
//           <Route path="/logout" element={<Logout />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
