// ..............     old working route .......................................................
// import LeaveCategoryList from "./admin/hrm/leave/leave_category/List";
// import LeaveForm from "./admin/hrm/leave/Form";
// import LeaveDashboard from "./admin/layouts/LeaveDashboard";
// import AssetsDashboard from "./admin/layouts/AssetDashboard";
// import AssetsForm from "./admin/hrm/assets/AssetsForm";
// import AssetsList from "./admin/hrm/assets/AssetList";
// import AssignAssetsForm from "./admin/hrm/assets/AssignAssetsForm";
// import AssignAssetsList from "./admin/hrm/assets/AssignAssetsList";
// import LeaveCategoryForm from "./admin/hrm/leave/leave_category/Form";
// import LeaveList from "./admin/hrm/leave/List";
// import AssetDashboard from "./admin/layouts/AssetDashboard";
// import EmployeeForm from "./admin/hrm/employee/Form";
// import EmployeeList from "./admin/hrm/employee/EmployeeList";
// import { verifyToken } from "./redux/slice/admin/accounts/authSlice.jsx";
// import HrmDashboard from "./admin/layouts/HrmDashboard";


import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSubdomain } from "./admin/app/accounts/utils/getSubdomain.js";
import { setTenant } from "./redux/slice/admin/tenant/tenantSlice.js";

import { useSelector } from "react-redux";
import AdminDashboard from "./admin/dashboard/AdminDashboard.js";

import CustomerTable from "./admin/app/client/customer/CustomerTable";
import CustomerForm from "./admin/app/client/customer/CustomerForm";
import CustomerDetail from "./admin/app/client/customer/CustomerDetail.js"
import SetupDashboard from "./admin/layouts/SetupDashboard";
import ProvinceList from "./admin/app/base/province/ProvinceList";
import DesignationTable from "./admin/app/base/designation/DesignationTable";
import DesignationForm from "./admin/app/base/designation/DesignationForm";
import DistrictTable from "./admin/app/base/district/DistrictTable";
import DistrictForm from "./admin/app/base/district/Form";
import UpdateProvince from "./admin/app/base/province/UpdateProvince";
// import DeleteProvince from "./admin/app/base/province/DeleteProvince";
import MunicipalityTable from "./admin/app/base/municipality/List";
import DeleteMunicipality from "./admin/app/base/municipality/DeleteMunicipality";
import UpdateMunicipality from "./admin/app/base/municipality/Update";
import MunicipalityForm from "./admin/app/base/municipality/Form";
import UpdateDistrict from "./admin/app/base/district/UpdateDistrict";
import DeleteDistrict from "./admin/app/base/district/DeleteDistrict";
import DeleteProvince from "./admin/app/base/province/DeleteProvince";
import ProvinceForm from "./admin/app/base/province/ProvinceForm";
import DepartmentTable from "./admin/app/base/department/DepartmentTable";
import DepartmentForm from "./admin/app/base/department/DepartmentForm";
import DepartmentDelete from "./admin/app/base/department/DepartmentDelete";
import DayDelete from "./admin/app/base/day/DayDelete";
import DayTable from "./admin/app/base/day/DayTable";
import DayForm from "./admin/app/base/day/DayForm.js";
import CrmDashboard from "./admin/layouts/CrmDashboard";
import ProjectTable from "./admin/app/crm/project/ProjectTable";
import ProjectDelete from "./admin/app/crm/project/ProjectDelete";
import ProjectForm from "./admin/app/crm/project/ProjectForm";
import ProjectDetail from "./admin/app/crm/project/ProjectDetail";
import EventSystem from "./admin/app/crm/event/EventSystem";
import AttendeeForm from "./admin/app/crm/attendee/AttendeeForm";
import AttendeeTable from "./admin/app/crm/attendee/AttendeeTable";
import AttendeeDelete from "./admin/app/crm/attendee/AttendeeDelete";
import AttendeeUpdate from "./admin/app/crm/attendee/AttendeeUpdate";
import AttendeeDetail from "./admin/app/crm/attendee/AttendeeDetail";
import EnquiryForm from "./admin/app/crm/enquiry/EnquiryForm";
import EnquiryTable from "./admin/app/crm/enquiry/EnquiryTable";
import CategoryTable from "./admin/app/crm/category/CategoryTable";
import CategoryForm from "./admin/app/crm/category/CategoryForm";
import CategoryDelete from "./admin/app/crm/category/CategoryDelete";
import EventDetail from "./admin/app/crm/event/EventDetail";
import EnquiryDelete from "./admin/app/crm/enquiry/EnquiryDelete";
import EnquiryDetail from "./admin/app/crm/enquiry/EnquiryDetail";
import UpdateEnquiryForm from "./admin/app/crm/enquiry/EnquiryUpdate";
import EventUpdate from "./admin/app/crm/event/EventUpdate";
import FollowForm from "./admin/app/crm/followup/FollowForm";
import FollowTable from "./admin/app/crm/followup/FollowupTable";
import FollowDelete from "./admin/app/crm/followup/FollowDelete";
import FollowDetail from "./admin/app/crm/followup/FollowDetail";
import ClientDashboard from "./admin/layouts/ClientDashboard";


import PrivateRoute from "./admin/app/accounts/PrivateRoute.js"; // Adjust the path if needed
import MeetingTable from "./admin/app/crm/meetingupdate/MeetingTable";
import MeetingForm from "./admin/app/crm/meetingupdate/MeetingForm";
import MeetingUpdateForm from "./admin/app/crm/meetingupdate/MeetingUpdateForm";
import MeetingDetail from "./admin/app/crm/meetingupdate/MeetingDetail";

import LostEnquiryTable from "./admin/app/crm/enquiry/LostEnquiryTable";
import LoginForm from "./admin/app/accounts/LoginForm.js";

import QuotationForm from "./admin/app/crm/quotation/QuotationForm";
import UpdateFollowForm from "./admin/app/crm/followup/UpdateFollowForm";

import ServiceQuotationForm from "./admin/app/crm/quotation/ServiceQuotationForm";
import ProductQuotationForm from "./admin/app/crm/quotation/ProductQuotationForm";
import Letterhead from "./admin/app/base/letterhead/Letterhead";
import QuotationTable from "./admin/app/crm/quotation/QuotationTable";
import OrganizationForm from "./admin/app/base/organization/Form.js";
import ServiceQuotationDetail from "./admin/app/crm/quotation/ServiceQuotationDetail";
import ProductQuotationDetail from "./admin/app/crm/quotation/ProductQuotationDetail1";
import ProposalForm from "./admin/app/crm/proposal/ProposalForm";
import ProposalTable from "./admin/app/crm/proposal/ProposalTable";
import ProposalDetail from "./admin/app/crm/proposal/ProposalDetail";
import OrganizationDetail from "./admin/app/base/organization/OrganizationDetail";
// import AIChat from "./admin/ai_agent/AIChat";
import WorkingTable from "./admin/app/base/working/WorkingTable.js";

import Homepage from "./cms/pages/home/HomePage.js";
import About from "./cms/pages/about/About";
import Services from "./cms/pages/services/Services.js";
import Contact from "./cms/pages/contact/Contact";
import RequestDemo from "./cms/pages/request_demo/RequestDemo";
import CmsLayout from "./cms/layout/CmsLayout"
import AdminDashboardLayout from "./admin/dashboard/AdminDashboardLayout";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth || {});
  // ✅ Runs only once on mount to set tenant
  useEffect(() => {
    const tenant = getSubdomain();
    dispatch(setTenant(tenant));
    localStorage.setItem("tenant", tenant);
  }, [dispatch]); // Optional: add dispatch as a best practice

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<CmsLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="about/" element={<About />} />
            <Route path="services/" element={<Services />} />
            <Route path="contact/" element={<Contact />} />

            <Route path="contact/" element={<Contact />} />
            <Route path="request-demo/" element={<RequestDemo />} />
          </Route>


          {/* Public Route */}
          <Route path="/login" element={<LoginForm />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            {/* Admin Routes */}
            {/* {userRole === "admin" && ( */}
            <Route path="/dashboard" element={<AdminDashboardLayout />}>
              {/* localhost/dashboard */}
              <Route index element={<AdminDashboard />} />

              <Route path="crm" element={<CrmDashboard />}>
                {/* dashboard/crm/category */}
                <Route path="category" element={<CategoryTable />} />
                <Route path="category/create" element={<CategoryForm />} />
                <Route
                  path="category/delete/:id/"
                  element={<CategoryDelete />}
                />

                {/* localhost/dashboard/crm/enquiry */}
                <Route path="enquiry" element={<EnquiryTable />} />
                <Route path="enquiry/create/" element={<EnquiryForm />} />
                <Route path="enquiry/delete/" element={<EnquiryDelete />} />
                <Route path="enquiry/detail/:id/" element={<EnquiryDetail />} />
                <Route
                  path="enquiry/update/:id/"
                  element={<UpdateEnquiryForm />}
                />
                <Route
                  path="enquiry/lost-enquiry/"
                  element={<LostEnquiryTable />}
                />

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
                {/* meetingupdate */}
                <Route path="meetings/" element={<MeetingTable />} />
                <Route path="meeting/create/" element={<MeetingForm />} />
                <Route
                  path="meeting/update/:id/"
                  element={<MeetingUpdateForm />}
                />
                <Route path="meeting/detail/:id/" element={<MeetingDetail />} />

                {/* dashboard/crm/attendees */}
                <Route path="attendee/update/:id/" element={<AttendeeForm />} />
                <Route
                  path="attendee/delete/:id/"
                  element={<AttendeeDelete />}
                />

                {/* localhost/dashboard/crm/follow */}
                <Route path="follow" element={<FollowTable />} />
                <Route path="follow/create" element={<FollowForm />} />
                <Route
                  path="follow/update/:id/"
                  element={<UpdateFollowForm />}
                />
                <Route
                  path="/dashboard/crm/follow/delete/:id/"
                  element={<FollowDelete />}
                />
                <Route
                  path="/dashboard/crm/follow/detail/:id/"
                  element={<FollowDetail />}
                />
                <Route
                  path="/dashboard/crm/follow/detail/:id/"
                  element={<FollowDetail />}
                />
                {/* .......quotation ........... */}
                <Route path="quotations" element={<QuotationTable />} />
                <Route path="quotation/create" element={<QuotationForm />} />
                <Route
                  path="quotation/update/:id"
                  element={<QuotationForm />}
                />
                <Route
                  path="quotation/product/create"
                  element={<ProductQuotationForm />}
                />
                <Route
                  path="quotation/service/create"
                  element={<ServiceQuotationForm />}
                />
                <Route
                  path="quotation/product/detail/:id/"
                  element={<ProductQuotationDetail />}
                />
                <Route
                  path="quotation/service/detail/:id/"
                  element={<ServiceQuotationDetail />}
                />

                <Route
                  path="quotation/service-quotation/detail/:id/"
                  element={<ServiceQuotationDetail />}
                />
                {/* proposal  */}
                {/* <Route path="proposal/create" element={<ProposalForm />} />
                    <Route path="proposals/" element={<ProposalTable />} />
                    <Route path="proposal/update/:id/" element={<ProposalForm />} />
                    <Route
                      path="proposal/detail/:id/"
                      element={<ProposalDetail />}
                    /> */}
                {/* ai chat */}
                {/* <Route path="ai/chat/" element={<AIChat />} />
                  </Route> */}

                {/* Customer Routes */}
                <Route path="customer" element={<ClientDashboard />}>
                  <Route path="customer-list" element={<CustomerTable />} />
                  <Route path="create" element={<CustomerForm />} />
                  <Route path="update/:id/" element={<CustomerForm />} />
                  <Route path="detail/:id/" element={<CustomerDetail />} />
                </Route>
                {/* aichat */}
                {/* <Route path="ai" element={<ClientDashboard />}>
                    <Route path="customer-list" element={<CustomerTable />} />
                    <Route path="create" element={<CustomerForm />} />
                    <Route path="update/:id/" element={<CustomerForm />} />
                    <Route path="detail/:id/" element={<CustomerDetail />} />
                  </Route> */}

                {/* HRM Routes */}
                {/* <Route path="hrm" element={<HrmDashboard />}>
                    <Route
                      path="employee/employee-list"
                      element={<EmployeeList />}
                    />
                    <Route path="employee/create" element={<EmployeeForm />} />

                    <Route path="leave" element={<LeaveDashboard />}>
                      <Route index element={<LeaveList />} />
                      {/* // Default leave page */}
                {/* <Route path="list" element={<LeaveList />} /> */}
                {/* <Route path="create" element={<LeaveForm />} />
                      <Route path="category/list" element={<LeaveCategoryList />} />
                      <Route
                        path="category/create"
                        element={<LeaveCategoryForm />}
                      />
                    </Route> */}
                {/* hrm/asset */}
                {/* <Route path="asset">
                      <Route path="list" element={<AssetsList />} />
                      <Route path="create" element={<AssetsForm />} />

                      <Route path="assign-asset/list" element={<AssetsList />} />
                      <Route path="assign-asset/create" element={<AssetsForm />} />
                    </Route>

                    <Route path="attendance">
                      <Route path="list" element={<AssetsList />} />
                      <Route path="create" element={<AssetsForm />} />
                    </Route>
                  </Route>  */}

                {/* Setup Routes */}
                <Route path="setup/" element={<SetupDashboard />}>
                  <Route path="designation" element={<DesignationTable />} />
                  <Route
                    path="designation/create"
                    element={<DesignationForm />}
                  />
                  <Route path="department" element={<DepartmentTable />} />
                  <Route path="department/create" element={<DepartmentForm />} />
                  <Route
                    path="department/delete/:id"
                    element={<DepartmentDelete />}
                  />
                  <Route path="district" element={<DistrictTable />} />
                  <Route path="district/create/" element={<DistrictForm />} />
                  <Route
                    path="district/update/:id/"
                    element={<UpdateDistrict />}
                  />
                  <Route
                    path="district/delete/:id/"
                    element={<DeleteDistrict />}
                  />
                  <Route path="municipality" element={<MunicipalityTable />} />
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
                  <Route path="province" element={<ProvinceList />} />
                  <Route path="province/create/" element={<ProvinceForm />} />
                  <Route
                    path="province/update/:id"
                    element={<UpdateProvince />}
                  />
                  <Route
                    path="province/delete/:id"
                    element={<DeleteProvince />}
                  />
                  {/* Working day */}
                  <Route path="working/" element={<WorkingTable />} />
                  {/* <Route path="working/create" element={<WorkingForm />} />
                    <Route path="working/delete/:id" element={<WorkingDelete />} /> */}
                  {/* day */}
                  <Route path="day" element={<DayTable />} />
                  <Route path="day/create" element={<DayForm />} />
                  <Route path="day/delete/:id" element={<DayDelete />} />
                  {/* <Route path="letterhead/create" element={<Letterhead />} /> */}
                  {/* <Route
                      path="organization/create"
                      element={<OrganizationForm />}
                    /> */}
                  <Route
                    path="organization/detail/"
                    element={<OrganizationDetail />}
                  />
                </Route>
              </Route>

            </Route>
          </Route>
          {/* Logout Route */}
          {/* <Route path="/logout" element={<Logout />} /> */}
          {/* Catch-all Redirect */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          {/* Fallback route */}
          {/* <Route path="*" element={<Navigate to={userRole === "admin" ? "/dashboard" : "/login"} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// new not working url
// import React from "react";
// import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminRoute from "./admin/routes/AdminRoute";
// import CrmDashboard from "./admin/layouts/CrmDashboard";
// import CrmRoute from "./admin/routes/CrmRoute";
// import Login from "./admin/accounts/Login"; // Assuming you have a Login component
// import Logout from "./admin/accounts/Logout";

// const App = () => {
//   const adminToken = useSelector((state) => state.user.adminToken); // Accessing admin token
//   const memberToken = useSelector((state) => state.user.teachersToken); // Accessing teachers token

//   return (
//     <Routes>
//       {/* Admin Route */}
//       {adminToken ? (
//         <Route
//           path="dashboard/*"
//           element={
//             <AdminDashboard>
//               <AdminRoute />
//             </AdminDashboard>
//           }
//         />
//       ) : memberToken ? (
//         // CRM Route
//         <Route
//           path="crm/*"
//           element={
//             <CrmDashboard>
//               <CrmRoute />
//             </CrmDashboard>
//           }
//         />
//       ) : (
//         // Login Route
//         <Route path="/" element={<Outlet />}>
//           <Route path="login" element={<Login />} />
//         </Route>
//       )}

//       {/* Logout Route */}
//       <Route path="logout" element={<Logout />} />

//       {/* Redirect based on token */}
//       <Route
//         path="*"
//         element={
//           adminToken ? (
//             <Navigate to="/dashboard" replace />
//           ) : memberToken ? (
//             <Navigate to="/crm" replace />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// };

// const Root = () => (
//   <BrowserRouter> {/* Wrap your App component with BrowserRouter */}
//     <App />
//   </BrowserRouter>
// );

// export default Root;

// //.... new change rout-> modified ........................
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// // import WelcomePage from "./component/WelcomePage";
// // import AdminRoute from "./component/routes/AdminRoute";
// // import TeacherRoute from "./component/routes/TeacherRoute";
// // import AdminDashboard from "./component/theme/AdminDashboard";
// // import ForgotPassword from "./component/user/ForgotPassword";
// // import ResetPassword from "./component/user/ResetPassword";
// // import UserLogin from "./component/user/UserLogin";
// import { Login } from "@mui/icons-material";
// // import { Login } from "@mui/icons-material";
// import { Logout } from "@mui/icons-material";
// // import UserLogout from "./component/user/UserLogout";
// // import { RootState } from "./store/store";
// import CrmDashboard from "./admin/layouts/CrmDashboard";
// // import FeedbackForm from "./feedback/FeedBackForm";
// import AdminRoute from "./admin/routes/AdminRoute";
// import AdminDashboard from "./admin/AdminDashboard"
// import CrmRoute from "./admin/routes/CrmRoute";

// const App = () => {
//   const adminToken = useSelector((store: RootState) => store.user.adminToken);
//   const memberToken = useSelector(
//     (store: RootState) => store.user.teachersToken
//   );

//   return (
//     <Routes>
//       {adminToken ? (
//         <Route
//           path="admin/*"
//           element={
//             <AdminDashboard>
//               <AdminRoute />
//             </AdminDashboard>
//           }
//         />
//       ) : memberToken ? (
//         <Route
//           path="crm/*"
//           element={
//             <CrmDashboard>
//               <CrmRoute />
//             </CrmDashboard>
//           }
//         />
//       ) : (
//         <Route path="/" element={<Outlet />}>
//           {/* <Route index element={<WelcomePage />} /> */}
//           {/* <Route path="login" element={<UserLogin />} /> */}
//           <Route path="login" element={<Login />} />
//           {/* <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route path="reset-password" element={<ResetPassword />} /> */}
//         </Route>
//       )}

//       {/* <Route path="feedback-form" element={<FeedbackForm />} /> */}
//       <Route path="logout" element={<Logout />} />

//       {/* Catch-all route */}
//       <Route
//         path="*"
//         element={
//           adminToken ? (
//             <Navigate to="/admin" replace />
//           ) : memberToken ? (
//             <Navigate to="/crm" replace />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// };

// export default App;

//..................... new changes route ......................
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import WelcomePage from "./component/WelcomePage";
// import AdminRoute from "./component/routes/AdminRoute";
// import TeacherRoute from "./component/routes/TeacherRoute";
// import AdminDashboard from "./component/theme/AdminDashboard";
// import ForgotPassword from "./component/user/ForgotPassword";
// import ResetPassword from "./component/user/ResetPassword";
// import UserLogin from "./component/user/UserLogin";
// import UserLogout from "./component/user/UserLogout";
// import { RootState } from "./store/store";
// import FeedbackForm from "./feedback/FeedBackForm";

// const App = () => {
//   const adminToken = useSelector((store: RootState) => store.user.adminToken);
//   const memberToken = useSelector(
//     (store: RootState) => store.user.teachersToken
//   );

//   return (
//     <Routes>
//       {adminToken ? (
//         <Route
//           path="admin/*"
//           element={
//             <AdminDashboard>
//               <AdminRoute />
//             </AdminDashboard>
//           }
//         />
//       ) : memberToken ? (
//         <Route
//           path="teachers/*"
//           element={
//             <AdminDashboard>
//               <TeacherRoute />
//             </AdminDashboard>
//           }
//         />
//       ) : (
//         <Route path="/" element={<Outlet />}>
//           {/* <Route index element={<WelcomePage />} /> */}
//           <Route path="login" element={<UserLogin />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route path="reset-password" element={<ResetPassword />} />
//         </Route>
//       )}

//       <Route path="feedback-form" element={<FeedbackForm />} />
//       <Route path="logout" element={<UserLogout />} />

//       {/* Catch-all route */}
//       <Route
//         path="*"
//         element={
//           adminToken ? (
//             <Navigate to="/admin" replace />
//           ) : memberToken ? (
//             <Navigate to="/teachers" replace />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// };

// export default App;

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
// // import ZoneList from "./admin/app/base/zone/List";
// // import ZoneForm from "./admin/app/base/zone/Form";
// import ProvinceList from "./admin/app/base/province/ProvinceList";

// import DesignationTable from "./admin/app/base/designation/DesignationTable";
// import DesignationForm from "./admin/app/base/designation/DesignationForm";
// import DistrictTable from "./admin/app/base/district/DistrictTable";
// import DistrictForm from "./admin/app/base/district/Form";
// import UpdateProvince from "./admin/app/base/province/UpdateProvince";
// // import DeleteProvince from "./admin/app/base/province/DeleteProvince";
// import MunicipalityList from "./admin/app/base/municipality/List";
// import DeleteMunicipality from "./admin/app/base/municipality/Delete";
// import UpdateMunicipality from "./admin/app/base/municipality/Update";
// import MunicipalityForm from "./admin/app/base/municipality/Form";
// import UpdateDistrict from "./admin/app/base/district/UpdateDistrict";
// import DeleteDistrict from "./admin/app/base/district/DeleteDistrict";

// import DeleteProvince from "./admin/app/base/province/DeleteProvince";
// import ProvinceForm from "./admin/app/base/province/ProvinceForm";
// import DepartmentTable from "./admin/app/base/department/DepartmentTable";
// import DepartmentForm from "./admin/app/base/department/DepartmentForm";
// import DepartmentDelete from "./admin/app/base/department/DepartmentDelete";
// import DayDelete from "./admin/app/base/day/DayDelete";
// import DayTable from "./admin/app/base/day/DayTable";
// import DayForm from "./admin/app/base/day/DayForm";
// import CrmDashboard from "./admin/layouts/CrmDashboard";
// import ProjectTable from "./admin/app/crm/project/ProjectTable";
// import ProjectDelete from "./admin/app/crm/project/ProjectDelete";
// import ProjectForm from "./admin/app/crm/project/ProjectForm";
// import ProjectDetail from "./admin/app/crm/project/ProjectDetail";
// import EventSystem from "./admin/app/crm/event/EventSystem";
// import AttendeeForm from "./admin/app/crm/attendee/AttendeeForm";
// import AttendeeTable from "./admin/app/crm/attendee/AttendeeTable";
// // import MeetingUpdateTable from "./admin/app/crm/event/meetingupdate/MeetingUpdateTable";
// // import MeetingUpdateForm from "./admin/app/crm/event/meetingupdate/MeetingUpdateForm";
// import AttendeeDelete from "./admin/app/crm/attendee/AttendeeDelete";
// import AttendeeUpdate from "./admin/app/crm/attendee/AttendeeUpdate";
// import AttendeeDetail from "./admin/app/crm/attendee/AttendeeDetail";
// import EnquiryForm from "./admin/app/crm/enquiry/EnquiryForm";
// import EnquiryTable from "./admin/app/crm/enquiry/EnquiryTable";
// import CategoryTable from "./admin/app/crm/category/CategoryTable";
// import CategoryForm from "./admin/app/crm/category/CategoryForm";
// import CategoryDelete from "./admin/app/crm/category/CategoryDelete";
// import EventDetail from "./admin/app/crm/event/EventDetail";
// import EnquiryDelete from "./admin/app/crm/enquiry/EnquiryDelete";
// import EnquiryDetail from "./admin/app/crm/enquiry/EnquiryDetail";
// // import EnquiryUpdate from "./admin/app/crm/enquiry/EnquiryUpdate";
// import EventUpdate from "./admin/app/crm/event/EventUpdate";
// import FollowForm from "./admin/app/crm/followup/FollowForm";
// import FollowTable from "./admin/app/crm/followup/FollowupTable";
// import FollowDelete from "./admin/app/crm/followup/FollowDelete";
// import FollowDetail from "./admin/app/crm/followup/FollowDetail";
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
// import ProvinceList from "./admin/app/base/province/ProvinceList";
// import DesignationTable from "./admin/app/base/designation/DesignationTable";
// import DesignationForm from "./admin/app/base/designation/DesignationForm";
// import DistrictTable from "./admin/app/base/district/DistrictTable";
// import DistrictForm from "./admin/app/base/district/Form";
// import UpdateProvince from "./admin/app/base/province/UpdateProvince";
// import DeleteProvince from "./admin/app/base/province/DeleteProvince";
// import MunicipalityList from "./admin/app/base/municipality/List";
// import DeleteMunicipality from "./admin/app/base/municipality/Delete";
// import UpdateMunicipality from "./admin/app/base/municipality/Update";
// import MunicipalityForm from "./admin/app/base/municipality/Form";
// import UpdateDistrict from "./admin/app/base/district/UpdateDistrict";
// import DeleteDistrict from "./admin/app/base/district/DeleteDistrict";
// import DepartmentTable from "./admin/app/base/department/DepartmentTable";
// import DepartmentForm from "./admin/app/base/department/DepartmentForm";
// import DepartmentDelete from "./admin/app/base/department/DepartmentDelete";
// import DayDelete from "./admin/app/base/day/DayDelete";
// import DayTable from "./admin/app/base/day/DayTable";
// import DayForm from "./admin/app/base/day/DayForm";
// import CrmDashboard from "./admin/layouts/CrmDashboard";
// import ProjectTable from "./admin/app/crm/project/ProjectTable";
// import ProjectDelete from "./admin/app/crm/project/ProjectDelete";
// import ProjectForm from "./admin/app/crm/project/ProjectForm";
// import ProjectDetail from "./admin/app/crm/project/ProjectDetail";
// import EventSystem from "./admin/app/crm/event/EventSystem";
// import AttendeeForm from "./admin/app/crm/attendee/AttendeeForm";
// import AttendeeTable from "./admin/app/crm/attendee/AttendeeTable";
// import AttendeeDelete from "./admin/app/crm/attendee/AttendeeDelete";
// import AttendeeUpdate from "./admin/app/crm/attendee/AttendeeUpdate";
// import AttendeeDetail from "./admin/app/crm/attendee/AttendeeDetail";
// import EnquiryForm from "./admin/app/crm/enquiry/EnquiryForm";
// import EnquiryTable from "./admin/app/crm/enquiry/EnquiryTable";
// import CategoryTable from "./admin/app/crm/category/CategoryTable";
// import CategoryForm from "./admin/app/crm/category/CategoryForm";
// import CategoryDelete from "./admin/app/crm/category/CategoryDelete";
// import EventDetail from "./admin/app/crm/event/EventDetail";
// import EnquiryDelete from "./admin/app/crm/enquiry/EnquiryDelete";
// import EnquiryDetail from "./admin/app/crm/enquiry/EnquiryDetail";
// import EnquiryUpdate from "./admin/app/crm/enquiry/EnquiryUpdate";
// import EventUpdate from "./admin/app/crm/event/EventUpdate";
// import FollowForm from "./admin/app/crm/followup/FollowForm";
// import FollowTable from "./admin/app/crm/followup/FollowupTable";
// import FollowDelete from "./admin/app/crm/followup/FollowDelete";
// import Login from "./admin/accounts/Login";
// // import ProtectedRoute from "./admin/accounts/ProtectedRoute";
// import Logout from "./admin/accounts/Logout";
// import ProvinceForm from "./admin/app/base/province/ProvinceForm";
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
