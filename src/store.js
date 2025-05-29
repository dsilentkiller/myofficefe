import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./redux/slice/admin/base/districtSlice";
import provinceReducer from "./redux/slice/admin/base/provinceSlice";
// import { ProvinceReducer } from "./redux/reducers/ProvinceReducer";
import designationReducer from "./redux/slice/admin/base/designationSlice";
import municipalityReducer from "./redux/slice/admin/base/municipalitySlice";
import workingReducer from "./redux/slice/admin/base/workingSlice";
import departmentReducer from "./redux/slice/admin/base/departmentSlice";
import projectReducer from "./redux/slice/admin/crm/projectSlice";
import eventReducer from "./redux/slice/admin/crm/eventSlice";
import attendeeReducer from "./redux/slice/admin/crm/attendeeSlice";
import categoryReducer from "./redux/slice/admin/crm/categorySlice";
import enquiryReducer from "./redux/slice/admin/crm/enquirySlice";
import followReducer from "./redux/slice/admin/crm/followSlice";

import customerReducer from "./redux/slice/admin/customer/customerSlice";
import employeeReducer from "./redux/slice/admin/hrm/employeeSlice";
// import meetingUpdateReducer from "./redux/slice/admin/crm/meetingUpdateSlice";
// import assetReducer from "./redux/slice/hrm/assetSlice";
// import leaveReducer from "./redux/slice/hrm/leaveSlice";
import userReducer from "./redux/slice/admin/user/UserSlice";
import quotationReducer from "./redux/slice/admin/crm/quotationSlice";
import meetingReducer from "./redux/slice/admin/crm/meetingSlice";
import proposalReducer from "./redux/slice/admin/crm/proposalSlice";
// import aiChatReducer from "./redux/slice/ai_agent/aiChatSlice";
import aboutReducer from "./redux/slice/cms/about/aboutSlice";
import contactReducer from "./redux/slice/cms/contact/contactSlice";
import servicesReducer from "./redux/slice/cms/service/servicesSlice";
import demoReducer from "./redux/slice/cms/demo/demoSlice";
import authReducer from "./redux/slice/admin/accounts/authSlice";
import organizationReducer from "./redux/slice/admin/base/organizationSlice";

const store = configureStore({
  reducer: {
    districts: districtReducer,
    municipalities: municipalityReducer,
    provinces: provinceReducer,
    workings: workingReducer,
    designations: designationReducer,
    departments: departmentReducer,
    organizations:organizationReducer,
    projects: projectReducer,
    events: eventReducer,
    attendees: attendeeReducer, // Add the attendee slice here
    categories: categoryReducer, //
    enquiries: enquiryReducer,
    follows: followReducer,
    customers: customerReducer,

    employees: employeeReducer,
    // assets: assetReducer,
    // leaves: leaveReducer,
    // meetingupdates: meetingUpdateReducer, // Ensure this matches your slice name
    // meetingupdates: meetingUpdateReducer,
    meetings: meetingReducer, // Make sure 'meetings' is the correct key here
    user: userReducer, // Add the user slice here
    quotations: quotationReducer, // Make sure this is properly mapped
    proposals: proposalReducer, // Add the reducer here
    // aiChat: aiChatReducer,
    about: aboutReducer,
    service: servicesReducer,
    contact: contactReducer,
    requestDemo: demoReducer,
    auth: authReducer,
  },
  //

  //
});

export default store;
