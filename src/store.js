import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./admin/redux/slice/districtSlice";
import provinceReducer from "./admin/redux/slice/provinceSlice";
// import { ProvinceReducer } from "./admin/redux/reducers/ProvinceReducer";
// import { DesignationReducer } from "./admin/redux/reducers/DesignationReducer";
import municipalityReducer from "./admin/redux/slice/municipalitySlice";

const store = configureStore({
  reducer: {
    districts: districtReducer,
    municipalities: municipalityReducer,
    provinces: provinceReducer,
    // provinces: ProvinceReducer,
    // designations: DesignationReducer,
  },
});

export default store;
