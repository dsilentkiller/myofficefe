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
import AssetsDashboard from "./admin/layouts/AssetDashboard";
import AssetsForm from "./admin/container/assets/AssetsForm";
import AssetsList from "./admin/container/assets/AssetList";
import AssignAssetsForm from "./admin/container/assets/AssignAssetsForm";
import AssignAssetsList from "./admin/container/assets/AssignAssetsList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Dashboard Route */}
          <Route path="/" element={<AdminDashboard />} />

          {/* User Routes */}
          <Route path="/user/*" element={<UserDashboard />}>
            <Route path="employee" element={<EmployeeList />} />
            <Route path="employee/create" element={<EmployeeForm />} />
            <Route path="customer" element={<CustomerList />} />
            <Route path="customer/create" element={<CustomerForm />} />
            {/* Catch-all for /user routes */}
            {/* <Route path="*" element={<Navigate to="/user" replace />} /> */}
          </Route>

          {/* Leave Routes */}
          <Route path="/leave/*" element={<LeaveDashboard />}>
            <Route path="create" element={<LeaveForm />} />
            <Route path="category/list" element={<LeaveCategoryList />} />
            <Route path="category/create" element={<LeaveForm />} />
            {/* Catch-all for /leave routes */}
            {/* <Route path="*" element={<Navigate to="/leave" replace />} /> */}
          </Route>

          {/* Asset Routes */}
          <Route path="/asset/*" element={<AssetsDashboard />}>
            <Route path="assign/list" element={<AssignAssetsList />} />
            <Route path="assign/create" element={<AssignAssetsForm />} />
            <Route path="create" element={<AssetsForm />} />
            <Route path="list" element={<AssetsList />} />
            {/* Catch-all for /asset routes */}
            {/* <Route path="*" element={<Navigate to="/asset" replace />} /> */}
          </Route>

          {/* Catch-all for other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import "./App.css";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import UserDashboard from "./admin/layouts/UserDashboard";
// import EmployeeForm from "./admin/container/user/employee/Form";
// import EmployeeList from "./admin/container/user/employee/EmployeeList";
// import CustomerList from "./admin/container/user/customer/List";
// import CustomerForm from "./admin/container/user/customer/Form";
// import LeaveCategoryList from "./admin/container/leave/leave_category/List";
// import LeaveForm from "./admin/container/leave/Form";
// import LeaveDashboard from "./admin/layouts/LeaveDashboard";
// import AssetsDashboard from "./admin/layouts/AssetDashboard";
// import AssetsForm from "./admin/container/assets/AssetsForm";
// import AssetsList from "./admin/container/assets/AssetList";
// import AssignAssetsForm from "./admin/container/assets/AssignAssetsForm";
// import AssignAssetsList from "./admin/container/assets/AssignAssetsList";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Admin Dashboard Route */}
//           <Route path="/" element={<AdminDashboard />} />
//           {/* User Routes */}
//           <Route path="/user" element={<UserDashboard />}>
//             <Route path="employee" element={<EmployeeList />} />
//             <Route path="employee/create" element={<EmployeeForm />} />
//             <Route path="customer" element={<CustomerList />} />
//             <Route path="customer/create" element={<CustomerForm />} />
//             {/* Catch-all for /user routes */}
//             <Route path="/user" element={<Navigate to="/user" replace />} />
//           </Route>
//           {/* Leave Routes */}
//           <Route path="/leave" element={<LeaveDashboard />}>
//             <Route path="create" element={<LeaveForm />} />
//             <Route path="category/list" element={<LeaveCategoryList />} />
//             <Route path="category/create" element={<LeaveForm />} />
//             {/* Catch-all for /leave routes */}
//             <Route path="/leave" element={<Navigate to="/leave" replace />} />
//           </Route>
//           {/* aSSETS */}
//           <Route path="/asset" element={<AssetsDashboard />}>
//             <Route path="assign/list" element={<AssignAssetsList />} />
//             <Route path="assign/create" element={<AssignAssetsForm />} />
//             <Route path="create/" element={<AssetsForm />} />
//             <Route path="list/" element={<AssetsList />} />
//           </Route>
//           {/* Catch-all for other routes */}
//           <Route path="/asset" element={<Navigate to="/" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import UserDashboard from "./admin/layouts/UserDashboard";
// import EmployeeForm from "./admin/container/user/employee/Form";
// import EmployeeList from "./admin/container/user/employee/EmployeeList";
// import CustomerList from "./admin/container/user/customer/List";
// import CustomerForm from "./admin/container/user/customer/Form";
// import LeaveCategoryList from "./admin/container/leave/leave_category/List";
// import LeaveForm from "./admin/container/leave/Form";
// import LeaveDashboard from "./admin/layouts/LeaveDashboard";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Admin Dashboard Route */}
//           <Route exact path="/" element={<AdminDashboard />} />

//           {/* User Routes */}
//           <Route path="/user" element={<UserDashboard />}>
//             <Route path="employee" element={<EmployeeList />} />
//             <Route path="employee/create" element={<EmployeeForm />} />
//             <Route path="customer" element={<CustomerList />} />
//             <Route path="customer/create" element={<CustomerForm />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Route>

//           {/* Leave Routes */}
//           <Route path="/leave" element={<LeaveDashboard />}>
//             <Route path="create" element={<LeaveForm />} />
//             <Route path="category/list" element={<LeaveCategoryList />} />
//             <Route path="category/create" element={<LeaveForm />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AdminDashboard from "./admin/AdminDashboard";
// import SetupDashboard from "./admin/layouts/SetupDashboard";
// import LeaveDashboard from "./admin/layouts/LeaveDashboard";
// import CustomerDashboard from "./admin/layouts/ClientDashboard";
// import AssetsDashboard from "./admin/layouts/AssetDashboard";
// // import UserDashboard from "./admin/layouts/UserDashboard";
// import UserDashboard from "./admin/layouts/UserDashboard";
// import EmployeeForm from "./admin/container/user/employee/Form";
// import EmployeeList from "./admin/container/user/employee/EmployeeList";
// import CustomerForm from "./admin/container/user/customer/Form";
// import CustomerList from "./admin/container/user/customer/List";
// import EnquiryForm from "./admin/container/user/enquiry/Form";
// import EnquiryList from "./admin/container/user/enquiry/List";

// function App() {
//   return (
//     <div className="App">
//       {/* <Provider store={store}> */}
//       <BrowserRouter>
//         <Routes>
//           <Route exact path="admin/" element={<AdminDashboard />}>
//             <Route exact path="user/" element={<UserDashboard />}>
//               <Route exact path="employee/create" element={<EmployeeForm />} />
//               <Route exact path="employee/list" element={<EmployeeList />} />
//               <Route path="customer/create" element={<CustomerForm />} />
//               <Route path="customer/list" element={<CustomerList />} />
//               <Route path="enquiry/create" element={<EnquiryForm />} />
//               <Route path="enquiry-list" element={<EnquiryList />} />
//             </Route>
//           </Route>
//         </Routes>
//         {/* <Footer /> */}
//       </BrowserRouter>
//       {/* </Provider> */}
//     </div>
//   );
// }
// export default App;
