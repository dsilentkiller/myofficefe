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
  },
});

export default store;
