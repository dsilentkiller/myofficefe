import React from "react";
import DefaultHeader from "../components/navbar/DefaultHeader";

import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

import AssetHeader from "../components/navbar/AssetHeader";

const AssetDashboard = () => {
  return (
    <div>
      <div className="flex min-h-screen bg-light">
        <Sidebar />
        <div className="flex flex-col flex-grow bg-light">
          <div className="flex flex-col flex-grow bg-light">
            <DefaultHeader />
          </div>
          <AssetHeader />

          <div className="flex flex-col flex-grow bg-light">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetDashboard;
