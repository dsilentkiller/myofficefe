import React from "react";
import DefaultHeader from "../components/navbar/DefaultHeader";
import LeaveHeader from "../components/navbar/LeaveHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import LeaveCategoryList from "../container/leave/leave_category/List";
import LeaveCategoryForm from "../container/leave/leave_category/Form";
import LeaveForm from "../container/leave/Form";
import LeaveList from "../container/leave/List";
import { Outlet } from "react-router-dom";

function LeaveDashboard() {
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
              <LeaveHeader />
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

export default LeaveDashboard;
