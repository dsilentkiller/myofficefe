

import Footer from "../components/common/footer/Footer";
import { Outlet } from "react-router-dom";
import CrmHeader from "../components/crm/navbar/crm_header/CrmHeader";
// import "../css/crm/layout/CrmDashboard.css"
function CrmDashboard() {
  return (
    <>
      <div className="container-wrapper">

        <div className="flex flex-col bg-light fixed-position">
          <CrmHeader />
        </div>
        <main className="p-4 flex-grow overflow-y-auto">
          <Outlet />
        </main>

        <div className="flex flex-col bg-light absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>


    </>
  );
}

export default CrmDashboard;
