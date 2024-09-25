import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./admin/redux/slice/districtSlice";
import provinceReducer from "./admin/redux/slice/provinceSlice";
// import { ProvinceReducer } from "./admin/redux/reducers/ProvinceReducer";
import designationReducer from "./admin/redux/slice/designationSlice";
import municipalityReducer from "./admin/redux/slice/municipalitySlice";
import workingReducer from "./admin/redux/slice/workingSlice";
import departmentReducer from "./admin/redux/slice/departmentSlice";
import projectReducer from "./admin/redux/slice/projectSlice";
import eventReducer from "./admin/redux/slice/eventSlice";
import attendeeReducer from "./admin/redux/slice/attendeeSlice";
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
  },
});

export default store;
