// src/admin/redux/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../admin/api/axiosInstance"; // multi-tenant awar
// Utility to safely parse from localStorage
const safeJSONParse = (item) => {
  try {
    const value = localStorage.getItem(item);
    return value && value !== "undefined" ? JSON.parse(value) : null;
  } catch (err) {
    console.warn(`Error parsing localStorage key "${item}":`, err);
    return null;
  }
};

const userFromStorage = safeJSONParse("user");
const tokenFromStorage = localStorage.getItem("access_token") || null;

// 🚀 Login API
export const loginVendor = createAsyncThunk(
  "auth/loginVendor",
  async ({ email, password, code }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/accounts/login/`, {
        email,
        password,
        code,
      });

      const { access, refresh, user } = response.data;

      // Save tokens to localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, access };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🚀 Verify Token API
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.get(`api/accounts/verify/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return token; // If valid, return the token back
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail || "Token verification failed"
      );
    }
  }
);

// 🔐 Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        localStorage.setItem("token", action.payload.token); // ✅ persist
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.token = action.payload.token; // ✅ or whatever you return
        state.user = action.payload.user; // this solve multitenant login issue
      })
      .addCase(verifyToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// ===== 2 nd portion =======
// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for login
// export const loginVendor = createAsyncThunk(
//   "auth/loginVendor",
//   async ({ email, password, code }, { rejectWithValue }) => {
//     try {
//       // Log to ensure the data is passed correctly
//       console.log("Sending login request with: ", { email, password, code }); // Debugging line
//       const response = await axios.post(
//         // `http://${code}.localhost/api/vendor/login/`, // Dynamically construct the URL using tenant's code
//         `http://${code}.lvh.me:8000/api/vendor/login/`,
//         new URLSearchParams({ email, password, code }), // Send the data as URLSearchParams
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded", // Proper headers for URL search params
//           },
//         }
//       );

//       const { access, refresh } = response.data; // Destructure the access and refresh tokens
//       localStorage.setItem("access_token", access); // Store tokens in localStorage
//       localStorage.setItem("refresh_token", refresh);
//       return { access, refresh }; // Return the access and refresh tokens
//     } catch (err) {
//       // Handle errors and pass the error message
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed. Please try again."
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     access: null,
//     refresh: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       localStorage.clear(); // Clear tokens from localStorage
//       state.access = null;
//       state.refresh = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginVendor.pending, (state) => {
//         state.loading = true; // Show loading when the request is in progress
//         state.error = null;
//       })
//       .addCase(loginVendor.fulfilled, (state, action) => {
//         state.loading = false; // Set loading to false after successful login
//         state.access = action.payload.access; // Store access token in state
//         state.refresh = action.payload.refresh; // Store refresh token in state
//       })
//       .addCase(loginVendor.rejected, (state, action) => {
//         state.loading = false; // Set loading to false after failure
//         state.error = action.payload; // Set error message
//       });
//   },
// });
// === 1 st ====
// export const { logout } = authSlice.actions; // Action to log out
// export default authSlice.reducer; // Export the reducer

// // src/redux/slices/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for login
// export const loginVendor = createAsyncThunk(
//   "auth/loginVendor",
//   async ({ email, password, code }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `https://${code}.localhost/api/vendor/login/`, //  `https://${code}.localhost.com/api/vendor/login/`,
//         new URLSearchParams({ email, password,code}),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const { access, refresh } = response.data;
//       localStorage.setItem("access_token", access);
//       localStorage.setItem("refresh_token", refresh);
//       return { access, refresh };
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed. Please try again."
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     access: null,
//     refresh: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       localStorage.clear();
//       state.access = null;
//       state.refresh = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginVendor.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginVendor.fulfilled, (state, action) => {
//         state.loading = false;
//         state.access = action.payload.access;
//         state.refresh = action.payload.refresh;
//       })
//       .addCase(loginVendor.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
