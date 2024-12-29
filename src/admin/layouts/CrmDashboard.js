import React from "react";
import DefaultHeader from "../components/navbar/DefaultHeader";

import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import CrmHeader from "../components/navbar/CrmHeader";


function CrmDashboard() {
  return (
    <div>
      <div className="container-wrapper">
        <div className="flex min-h-screen bg-light">
          <Sidebar />
          <div className="flex flex-col flex-grow bg-light relative">
            <div className="flex flex-col bg-light">
              <DefaultHeader />
            </div>
            <div className="flex flex-col bg-light fixed-position">
              <CrmHeader />
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

export default CrmDashboard;
