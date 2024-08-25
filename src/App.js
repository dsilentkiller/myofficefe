import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./admin/layouts/UserDashboard";
import EmployeeForm from "./admin/container/user/employee/Form";
import EmployeeList from "./admin/container/user/employee/EmployeeList";
import CustomerList from "./admin/container/user/customer/List";
import CustomerForm from "./admin/container/user/customer/Form";
import { Navigate } from "react-router-dom";
import LeaveCategoryList from "./admin/container/leave/leave_category/List";
import LeaveCategoryForm from "./admin/container/leave/leave_category/Form";
import LeaveList from "./admin/container/leave/List";
import LeaveForm from "./admin/container/leave/Form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* user */}
          <Route path="/user" element={<UserDashboard />}>
            <Route path="employee" element={<EmployeeList />} />
            <Route path="employee/create" element={<EmployeeForm />} />
            <Route path="customer" element={<CustomerList />} />
            <Route path="customer/create" element={<CustomerForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          {/* leave form */}
          <Route path="/leave" element={<LeaveList />}>
            <Route path="create" element={<LeaveForm />} />
            <Route path="category/create" element={<LeaveCategoryList />} />
            <Route path="create" element={<LeaveForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route exact path="/" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

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
