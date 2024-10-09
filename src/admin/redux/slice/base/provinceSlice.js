import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProvinces = createAsyncThunk(
  "provinces/fetchProvinces",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/province/"
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProvince = createAsyncThunk(
  "provinces/createProvince",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/province/create/",
        formData
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Fetch a single province by ID
export const fetchProvinceById = createAsyncThunk(
  "provinces/fetchProvinceById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/province/${id}/`
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update province
// Update province
export const updateProvince = createAsyncThunk(
  "provinces/updateProvince",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/province/${id}/`,
        { name }
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// search
export const searchProvince = createAsyncThunk(
  "provinces/searchProvince",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/setup/province/?search=${searchTerm}`
    );
    return response.data.result;
  }
);

export const deleteProvince = createAsyncThunk(
  "provinces/deleteProvince",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/setup/province/${id}/`);
      return id; // Return the ID of the deleted province
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const provinceSlice = createSlice({
  name: "provinces",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    createError: null,
    updateStatus: null,
    updateError: null,
    deleteStatus: null,
    deleteError: null,
    currentProvince: null, // Added this line
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Provinces
      .addCase(fetchProvinces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Create Province
      .addCase(createProvince.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createProvince.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createProvince.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      })

      // Fetch Province By ID
      .addCase(fetchProvinceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProvinceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProvince = action.payload;
      })
      .addCase(fetchProvinceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Province
      .addCase(updateProvince.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateProvince.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        state.list[index] = action.payload;
      })
      .addCase(updateProvince.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      })

      // Search Province
      .addCase(searchProvince.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProvince.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchProvince.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Province
      .addCase(deleteProvince.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteProvince.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (province) => province.id !== action.payload
        );
      })
      .addCase(deleteProvince.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      });
  },
});

export default provinceSlice.reducer;

// const provinceSlice = createSlice({
//   name: "provinces",
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     createStatus: "idle",
//     createError: null,
//     updateStatus: "idle",
//     updateError: null,
//     deleteStatus: "idle",
//     deleteError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     //fetch province
//     builder
//       .addCase(fetchProvince.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProvince.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchProvince.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       //create province
//       .addCase(createProvince.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createProvince.fulfilled, (state, action) => {
//         state.createStatus = "succeeded";
//         state.list.push(action.payload);
//       })
//       .addCase(createProvince.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload;
//       });
//     // Fetch Province By ID
//     builder
//       .addCase(fetchProvinceById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProvinceById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentProvince = action.payload;
//       })
//       .addCase(fetchProvinceById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       //update province
//       .addCase(updateProvince.pending, (state) => {
//         state.updateStatus = "loading";
//       })
//       .addCase(updateProvince.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded";
//         const index = state.list.findIndex((p) => p.id === action.payload.id);
//         state.list[index] = action.payload;
//       })

//       .addCase(updateProvince.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.error.message;
//       })
//       // search district name
//       .addCase(searchProvince.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(searchProvince.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(searchProvince.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//     //delete province
//     // Delete Province
//     builder
//       .addCase(deleteProvince.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteProvince.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (province) => province.id !== action.payload
//         );
//       })
//       .addCase(deleteProvince.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload;
//       });
//   },
// });

// export default provinceSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // export const fetchProvince = createAsyncThunk(
// //   "province/fetchProvince",
// //   async (_, thunkAPI) => {
// //     try {
// //       const response = await axios.get(
// //         "http://127.0.0.1:8000/api/setup/province/"
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data || "An Unknown Error Ocurred"
// //       );
// //     }
// //   }
// // );

// // // Async thunk for creating a new province
// // export const createProvince = createAsyncThunk(
// //   "province/createProvince",
// //   async (formData, thunkAPI) => {
// //     try {
// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/api/setup/province/create/",
// //         formData
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );
// // const ProvinceSlice = createSlice({
// //   name: "provinces",
// //   initialState: {
// //     list: [], //An array to store Province data.
// //     isLoading: false, //A boolean indicating if data is being fetched.
// //     error: null, //To store any error that occurs during fetching.
// //     createStatus: "idle", //The status of the create operation (idle, loading, succeeded, failed).
// //     createError: null,
// //   },
// //   reducers: {}, //An empty object
// //   //all actions are handled via extraReducers.
// //   extraReducers: (builder) => {
// //     // Fetch Provinces
// //     builder
// //       .addCase(fetchProvince.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchProvince.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.push = action.payload;
// //       })
// //       .addCase(fetchProvince.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload;
// //       });

// //     // Create Province
// //     builder
// //       .addCase(createProvince.pending, (state) => {
// //         state.createStatus = "loading";
// //         state.createError = null;
// //       })
// //       .addCase(createProvince.fulfilled, (state, action) => {
// //         state.createStatus = "succeeded";
// //         state.push(action.payload);
// //       })
// //       .addCase(createProvince.rejected, (state, action) => {
// //         state.createStatus = "failed";
// //         state.createError = action.payload;
// //       });
// //   },
// // });

// // export default ProvinceSlice.reducer;
