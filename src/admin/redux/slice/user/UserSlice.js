// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminToken: null, // Default value for admin token
  membersToken: null, // Default value for teacher/member token
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdminToken(state, action) {
      state.adminToken = action.payload;
    },
    setMembersToken(state, action) {
      state.membersToken = action.payload;
    },
    clearTokens(state) {
      state.adminToken = null;
      state.membersToken = null;
    },
  },
});

export const { setAdminToken, setMembersToken, clearTokens } = userSlice.actions;
export default userSlice.reducer;
