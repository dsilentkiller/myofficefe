import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../admin/components/footer/Footer";
import DefaultHeader from "../admin/components/navbar/DefaultHeader";
import UserHeader from "./components/navbar/UserHeader";
import Sidebar from "./components/sidebar/Sidebar";
import CountryList from "./base/country/CountryList";
import Form from "./container/user/employee/Form";

import EmployeeList from "./container/user/employee/EmployeeList";
import ProvinceList from "./base/province/ProvinceList";
import DesignationList from "./base/designation/DesignationList";
import ZoneList from "./base/zone/List";
import MunicipalityList from "./base/municipality/List";
import DistrictList from "./base/district/Form";
import DayForm from "./base/day/Form";
import CustomerVisitPeriodForm from "./base/customer_visit/Form";
import CustomerVisitPeriodList from "./base/customer_visit/List";
import WorkingForm from "./base/working/Form";
import WorkingList from "./base/working/List";
import AssignGradeFormAndList from "./base/grade/assign_grade/List";
import CustomerForm from "./container/user/customer/Form";
import CustomerList from "./container/user/customer/List";

const AdminDashboard = () => {
  const employees = [
    { id: 1, name: "Employee 1" },
    { id: 2, name: "Employee 2" },
    // Add more employees as needed
  ];

  const countries = [
    { id: 1, name: "Country 1" },
    { id: 2, name: "Country 2" },
    // Add more countries as needed
  ];

  const designations = [
    { id: 1, name: "Designation 1" },
    { id: 2, name: "Designation 2" },
    // Add more designations as needed
  ];

  const districts = [
    { id: 1, name: "District 1" },
    { id: 2, name: "District 2" },
    // Add more districts as needed
  ];

  const provinces = [
    { id: 1, name: "Province 1" },
    { id: 2, name: "Province 2" },
    // Add more provinces as needed
  ];

  const zones = [
    { id: 1, name: "Zone 1" },
    { id: 2, name: "Zone 2" },
    // Add more zones as needed
  ];

  return (
    <div className="container-wrapper">
      <div className="flex min-h-screen bg-light">
        <Sidebar />
        <div className="flex flex-col flex-grow bg-light relative">
          <div className="flex flex-col bg-light">
            <DefaultHeader />
          </div>
          <div className="flex flex-col bg-light fixed-position">
            <UserHeader />
          </div>
          <div className="flex-grow flex justify-center items-center p-3">
            <Routes>
              {/* employee */}
              <Route
                path="employee/list/"
                element={<EmployeeList employees={employees} />}
              />
              <Route path="employee/create/" element={<Form />} />
              {/* customer */}
              <Route
                path="customer/"
                element={<CustomerList customers={employees} />}
              />
              <Route path="customer/create/" element={<CustomerForm />} />

              {/* country */}
              <Route
                path="country-list"
                element={<CountryList countries={countries} />}
              />
              {/* province */}
              <Route
                path="province-list"
                element={<ProvinceList provinces={provinces} />}
              />
              {/* designation */}
              <Route
                path="designation-list"
                element={<DesignationList designations={designations} />}
              />
              {/* zone */}
              <Route path="zone-list" element={<ZoneList zones={zones} />} />
              {/* municipality */}
              <Route path="municipality-list" element={<MunicipalityList />} />
              {/* dustrict */}
              <Route path="district-list" element={<DistrictList />} />
              {/* day */}
              <Route path="day-form" element={<DayForm />} />
              {/* customer visit period */}
              <Route
                path="customer-visit-period-list"
                element={<CustomerVisitPeriodList />}
              />
              <Route
                path="customer-visit-period-form"
                element={<CustomerVisitPeriodForm />}
              />
              {/* working form */}
              <Route path="working-form" element={<WorkingForm />} />
              <Route path="working-list" element={<WorkingList />} />
              {/* assign grade */}
              <Route
                path="assign-grade-form-and-list"
                element={<AssignGradeFormAndList />}
              />
            </Routes>
          </div>
          <div className="flex flex-col bg-light absolute bottom-0 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
