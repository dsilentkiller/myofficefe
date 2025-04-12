// import React from "react";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "../User/components/sidebar/Sidebar";
// import DefaultHeader from "../components/navbar/DefaultHeader";
// import Footer from "../User/components/footer/Footer";
// import { Routes, Route } from "react-router-dom";
// import DefaultHeader from "../User/components/navbar/DefaultHeader";
// import UserHeader from "../components/navbar/UserHeader";
// import CustomerList from "../container/user/customer/List"; // Example component for client list
// import CustomerDetail from "../container/user/customer/Detail";

import React from "react";
import DefaultHeader from "../components/navbar/DefaultHeader";
import UserHeader from "../components/navbar/UserHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
// import EmployeeList from "../container/user/employee/EmployeeList";
// import EmployeeForm from "../container/user/employee/Form";
// import EmployeeDetail from "../container/user/employee/Detail";
// import CustomerList from "../container/user/customer/List";
// import CustomerForm from "../container/user/customer/Form";
// import CustomerDetail from "../container/user/customer/Detail";
// import EnquiryForm from "../container/user/enquiry/Form";
// import EnquiryList from "../container/user/enquiry/List";

function UserDashboard() {
  return (
    <div>
      {/* <DefaultHeader />
      <UserHeader />
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* employee */}
      {/* <Route exact path="/admin/employee/list/" component={EmployeeList} />
          <Route path="/admin/employee/create/" component={EmployeeForm} />
          <Route path="/admin/employee/:id/" component={EmployeeDetail} /> */}
      {/* customer */}

      {/* <Route path="/admin/customer/" component={UserDashboard} /> */}
      {/* <Route path="/admin/customer/create/" component={CustomerForm} />
          <Route path="/admin/customer/" component={CustomerList} />
          <Route path="/admin/customer/:id/" component={CustomerDetail} /> */}
      {/* enquiry */}
      {/*  enquiry*/}
      {/* <Route path="/admin/enquiry/create/" component={EnquiryForm} />
          <Route path="/admin/enquiry/" component={EnquiryList} />
        </Routes>
      </div> */}
      {/* <Footer /> */}

      <div className="container-wrapper">
        <div className="flex min-h-screen bg-light">
          <Sidebar />
          <div className="flex flex-col flex-grow bg-light relative">
            <div className="flex flex-col bg-light">
              <DefaultHeader />
            </div>
            <div className="flex flex-col bg-light fixed-position">
              <UserHeader />
            </div>
            <Outlet />
            <div className="flex-grow flex justify-center items-center p-3"></div>
            <div className="flex flex-col bg-light absolute bottom-0 w-full">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

// const UserDashboard = () => {
//   return (
//     <div>
//       <div className="flex min-h-screen bg-light">
//         <Sidebar />
//         <div className="flex flex-col flex-grow bg-light">
//           <div className="flex flex-col flex-grow bg-light">
//             <DefaultHeader />
//           </div>
//           <UserHeader />
//           {/* <div className="flex-grow p-3">
//             Total USER ARE : {UserDashboard.count}
//           </div> */}
//           <main>
//             <Routes>
//               <Route exact path="/admin/clients" component={CustomerList} />
//               <Route path="/admin/clients/:id" component={CustomerDetail} />
//               {/* Add more client-specific routes here */}
//             </Routes>
//           </main>

//           <div className="flex flex-col flex-grow bg-light">
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UserDashboard;

// #-----------------------------old --------------------
// import React from "react";
// import ClientHeader from "./ClientHeader";
// import ClientFooter from "./ClientFooter";
// import { Route, Routes } from "react-router-dom";
// import CustomerList from "../container/user/customer/List"; // Example component for client list
// import CustomerDetail from "../container/user/customer/Detail"; // Example component for client detail

// function ClientDashboard() {
//   return (
//     <div>
//       <ClientHeader />
//       <main>
//         <Routes>
//           <Route exact path="/admin/clients" component={CustomerList} />
//           <Route path="/admin/clients/:id" component={CustomerDetail} />
//           {/* Add more client-specific routes here */}
//         </Routes>
//       </main>
//       <ClientFooter />
//     </div>
//   );
// }

// export default ClientDashboard;
