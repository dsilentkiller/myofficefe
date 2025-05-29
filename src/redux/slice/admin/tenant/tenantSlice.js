// redux/tenantSlice.js
//Store Tenant Globally
import { createSlice } from "@reduxjs/toolkit";

const tenantSlice = createSlice({
  name: "tenant",
  initialState: { tenant: null },
  reducers: {
    setTenant: (state, action) => {
      state.tenant = action.payload;
    },
  },
});

export const { setTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
