import React from "react";
import ClientHeader from "../components/navbar/ClientHeader"
import Sidebar from "../components/sidebar/LeftSidebar";
// import DefaultHeader from "../components/navbar/DefaultHeader";
import Footer from "../components/footer/Footer";
// import CustomerTable from "../client/customer/CustomerTable";
import { Outlet } from "react-router-dom";
// import { Route,Router} from "react-router-dom";
// import CustomerTable from "../client/customer/CustomerTable"; // Example component for client list
// import CustomerDetail from "../client/customer/CustomerForm"; // Example component for client detail

function ClientDashboard() {
  return (
    <div>
      <div className="container-wrapper">
        <div className="flex min-h-screen bg-light">
          <Sidebar />
          <div className="flex flex-col flex-grow bg-light relative">
            {/* <div className="flex flex-col bg-light">
              <DefaultHeader />
            </div> */}
            <div className="flex flex-col bg-light fixed-position">
              <ClientHeader />
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

export default ClientDashboard;
