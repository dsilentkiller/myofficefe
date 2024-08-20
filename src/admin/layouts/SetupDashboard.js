import React from "react";
import SetupHeader from "../components/navbar/SetupHeader";

import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import CountryList from "../base/country/CountryList";
import ProvinceList from "../base/province/ProvinceList";
import DesignationList from "../base/designation/DesignationList";
import ZoneList from "../base/zone/List";
// import Department
// import CustomerVisitPeriod  from "../base/CustomerVisitPeriod/List";
import WorkingList from "../base/working/List";
import WorkingForm from "../base/working/Form";
import MunicipalityList from "../base/municipality/List";
// import DayList from "../base/day/List";
import DayForm from "../base/day/Form";
import DistrictList from "../base/district/List";
import CustomerVisitPeriodList from "../base/customer_visit/List";
// import WorkingForm from "../base/working/Form";
import CustomerVisitPeriodForm from "../base/customer_visit/Form";
import AssignGradeFormAndList from "../base/grade/assign_grade/List";
import DefaultHeader from "../components/navbar/DefaultHeader";
import Sidebar from "../components/sidebar/Sidebar";

const SetupDashboard = () => {
  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-light">
        <div className="flex flex-col flex-grow bg-light">
          <DefaultHeader />
        </div>
        <SetupHeader />
      </div>
      {/* <div className="flex-grow p-3">
          Total USER ARE : {UserDashboard.count}
        </div> */}
      {/*--------------setup ---  base ------------------------- */}
      {/* country */}
      <Routes>
        <Route
          path="/admin/setup/country/country-list/"
          element={<CountryList />}
        />
        {/* countries={countries}  */}
        {/* province */}
        <Route path="province-list/" element={<ProvinceList />} />
        {/* provinces={provinces} */}
        {/* designation */}
        <Route path="designation-list/" element={<DesignationList />} />
        {/* designations={designations} */}
        {/* zone */}
        <Route path="zone-list/" element={<ZoneList />} />
        {/* zones={zones} */}
        {/* municipality */}
        <Route path="municipality-list/" element={<MunicipalityList />} />
        {/* dustrict */}
        <Route path="district-list/" element={<DistrictList />} />
        {/* day */}
        <Route path="day-form/" element={<DayForm />} />
        {/* customer visit period */}
        <Route
          path="customer-visit-period-list/"
          element={<CustomerVisitPeriodList />}
        />
        <Route
          path="customer-visit-period-form/"
          element={<CustomerVisitPeriodForm />}
        />
        {/* working form */}
        <Route path="working-form/" element={<WorkingForm />} />
        <Route path="working-list/" element={<WorkingList />} />
        {/* assign grade */}
        <Route
          path="assign-grade-form-and-list/"
          element={<AssignGradeFormAndList />}
        />
      </Routes>
      {/*------------------ setup end ---------------------------------- */}
      <div className="flex flex-col flex-grow bg-light">
        <Footer />
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default SetupDashboard;
