import React from "react";
import DefaultHeader from "../components/navbar/DefaultHeader";
import UserHeader from "../components/navbar/UserHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import AssignAssetsList from "../container/assets/AssignAssetsList";
import AssignAssetsForm from "../container/assets/AssignAssetsForm";
import AssetsForm from "../container/assets/AssetsForm";
import AssetsList from "../container/assets/AssetList";
function AssetDashboard() {
  return (
    <div>
      <DefaultHeader />
      <UserHeader />
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* employee */}
          <Route
            exact
            path="/admin/assign_assets/"
            element={AssignAssetsList}
          />
          <Route
            path="/admin/assign_assets/create/"
            element={AssignAssetsForm}
          />
          {/* <Route path="/admin/assign_assets/:id/" element={AssignAssetsDetail} /> */}
          {/* assets */}

          {/* <Route path="/admin/assets/" element={UserDashboard} /> */}
          <Route path="/admin/assets/create/" element={AssetsForm} />
          <Route path="/admin/assets/" element={AssetsList} />
          {/* <Route path="/admin/assets/:id/" element={AssetsDetail} /> */}
          {/* enquiry */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default AssetDashboard;

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
//               <Route exact path="/admin/clients" element={assetsList} />
//               <Route path="/admin/clients/:id" element={assetsDetail} />
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
// import assetsList from "../container/user/assets/List"; // Example element for client list
// import assetsDetail from "../container/user/assets/Detail"; // Example element for client detail

// function ClientDashboard() {
//   return (
//     <div>
//       <ClientHeader />
//       <main>
//         <Routes>
//           <Route exact path="/admin/clients" element={assetsList} />
//           <Route path="/admin/clients/:id" element={assetsDetail} />
//           {/* Add more client-specific routes here */}
//         </Routes>
//       </main>
//       <ClientFooter />
//     </div>
//   );
// }

// export default ClientDashboard;
