import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./admin/redux/slice/districtSlice";
// import { ProvinceReducer } from "./admin/redux/reducers/ProvinceReducer";
// import { DesignationReducer } from "./admin/redux/reducers/DesignationReducer";

const store = configureStore({
  reducer: {
    districts: districtReducer,
    // provinces: ProvinceReducer,
    // designations: DesignationReducer,
  },
});

export default store;
