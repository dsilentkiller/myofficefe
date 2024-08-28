import React from "react";
import DefaultHeader from "../components/navbar/DefaultHeader";
import UserHeader from "../components/navbar/UserHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import AssignAssetsList from "../container/assets/AssignAssetsList";
import AssignAssetsForm from "../container/assets/AssignAssetsForm";
import AssetsForm from "../container/assets/AssetsForm";
import AssetList from "../container/assets/AssetList";
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

          <main>
            <Routes>
              <Route exact path="assign/list" element={AssignAssetsList} />
              <Route path="assign/create/" element={AssignAssetsForm} />
              <Route exact path="asset/list/" element={AssetList} />
              <Route path="asset/create/" element={AssetsForm} />
            </Routes>
          </main>

          <div className="flex flex-col flex-grow bg-light">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetDashboard;
