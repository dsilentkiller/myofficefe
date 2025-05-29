import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Topbar from "../components/topbar/Topbar";


const CmsLayout = () => {
  return (
    <div className="page-wrapper">
 
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CmsLayout;
