import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./admin/redux/slice/base/districtSlice";
import provinceReducer from "./admin/redux/slice/base/provinceSlice";
// import { ProvinceReducer } from "./admin/redux/reducers/ProvinceReducer";
import designationReducer from "./admin/redux/slice/base/designationSlice";
import municipalityReducer from "./admin/redux/slice/base/municipalitySlice";
import workingReducer from "./admin/redux/slice/base/workingSlice";
import departmentReducer from "./admin/redux/slice/base/departmentSlice";
import projectReducer from "./admin/redux/slice/crm/projectSlice";
import eventReducer from "./admin/redux/slice/crm/eventSlice";
import attendeeReducer from "./admin/redux/slice/crm/attendeeSlice";
import categoryReducer from "./admin/redux/slice/crm/categorySlice";
import enquiryReducer from "./admin/redux/slice/crm/enquirySlice";
import followReducer from "./admin/redux/slice/crm/followSlice";
import customerReducer from "./admin/redux/slice/customer/customerSlice";
import accountReducer from "./admin/redux/slice/crm/accountSlice";
import employeeReducer from "./admin/redux/slice/hrm/employeeSlice";
import meetingUpdateReducer from "./admin/redux/slice/crm/meetingUpdateSlice";
import assetReducer from "./admin/redux/slice/hrm/assetSlice";
import leaveReducer from "./admin/redux/slice/hrm/leaveSlice";
import userReducer from "./admin/redux/slice/user/UserSlice"
import quotationReducer from "./admin/redux/slice/crm/quotationSlice"
const store = configureStore({
  reducer: {
    districts: districtReducer,
    municipalities: municipalityReducer,
    provinces: provinceReducer,
    workings: workingReducer,
    designations: designationReducer,
    departments: departmentReducer,
    projects: projectReducer,
    events: eventReducer,
    attendees: attendeeReducer, // Add the attendee slice here
    categories: categoryReducer, //
    enquiries: enquiryReducer,
    follows: followReducer,
    customers:customerReducer,
    account:accountReducer,
    employees:employeeReducer,
    assets:assetReducer,
    leaves:leaveReducer,
    meetingupdates: meetingUpdateReducer, // Ensure this matches your slice name
    user: userReducer, // Add the user slice here
    quotations: quotationReducer, // Make sure this is properly mapped
  },
  //

  //
});

export default store;

