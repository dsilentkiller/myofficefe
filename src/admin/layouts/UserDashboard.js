import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../User/components/sidebar/Sidebar";
// import DefaultHeader from "../components/navbar/DefaultHeader";
import Footer from "../User/components/footer/Footer";

import DefaultHeader from "../User/components/navbar/DefaultHeader";
import UserHeader from "../components/navbar/UserHeader";
const UserDashboard = () => {
  return (
    <div>
      <div className="flex min-h-screen bg-light">
        <Sidebar />
        <div className="flex flex-col flex-grow bg-light">
          <div className="flex flex-col flex-grow bg-light">
            <DefaultHeader />
          </div>
          <UserHeader />
          <div className="flex-grow p-3">
            Total USER ARE : {UserDashboard.count}
          </div>

          <div className="flex flex-col flex-grow bg-light">
            <Footer />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
