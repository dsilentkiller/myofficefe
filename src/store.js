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
  },
});

export default store;
