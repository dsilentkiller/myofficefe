import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Form from "../container/user/employee/Form";
import EmployeeList from "../container/user/employee/EmployeeList";
// import Banner from "./components/Banner";
import ServiceListing from "./components/ServiceListing";
// import Testimonial from "./components/Testimonial";
// import Team from "./components/Team";
import CustomerForm from "../container/user/customer/CustomerForm";
import CustomerList from "../container/user/customer/List";
import CountryList from "../base/country/CountryList";
import CountryForm from "../base/country/Country";
import CustomerVisitPeriodForm from "../base/customer_visit/Form";
import CustomerVisitPeriodList from "../base/customer_visit/List";
import DayForm from "../base/day/Form";
import DayList from "../base/day/List";
import DesignationList from "../base/designation/DesignationList";
import DesignationForm from "../base/designation/DesignationForm";
// import Project from "./components/Project"; // Uncomment if Project component is available

const AdminRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* -------------------------------- employee---------------------------- */}
        {/* <Route index path="employee/list/" element={<EmployeeList />} />
        <Route path="/admin/container/user/employee/form" element={<Form />} /> */}

        {/* Employee routes */}
        <Route path="/employee/list/" element={<EmployeeList />} />
        <Route path="admin/employee/create/" element={<Form />} />
        {/* ----------------------------customer------------------------ */}
        <Route path="/customer/create/" element={<CustomerForm />} />
        <Route path="/customer/list/" element={<CustomerList />} />

        {/* <Route path="/service" element={<ServiceListing />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/testimonial" element={<Testimonial />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/country/create/" element={<CountryForm />} />
        <Route path="/country/list/" element={<CountryList />} />
        <Route
          path="customer-visit-period/"
          element={<CustomerVisitPeriodForm />}
        />
        <Route
          path="customer-visit-period-list/"
          element={<CustomerVisitPeriodList />}
        />

        <Route path="day/form/" element={<DayForm />} />

        <Route path="day/list/" element={<DayList />} />

        {/* designation */}
        <Route path="designation/form/" element={<DesignationForm />} />
        <Route path="designation/list/" element={<DesignationList />} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/service" element={<ServiceListing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonial" element={<Testimonial />} /> */}
        {/* <Route path="/team" element={<Team />} /> */}
        {/* <Route path="/project" element={<Project />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
