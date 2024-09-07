import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks
export const fetchDistrict = createAsyncThunk(
  "district/fetchDistrict",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/district/"
      );
      return response.data.result.data; // Adjust based on your API response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDistrict = createAsyncThunk(
  "district/createDistrict",
  async (districtData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/district/create/",
        districtData
      );
      return response.data.result; // Adjust based on your API response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDistrictById = createAsyncThunk(
  "district/fetchDistrictById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/district/${id}/`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDistrict = createAsyncThunk(
  "districts/updateDistrict",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/district/update/${id}/`,
        { name }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDistrict = createAsyncThunk(
  "districts/deleteDistrict",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/setup/districts/${id}/`);
      return id; // Return the id of the deleted province
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const districtSlice = createSlice({
  name: "districts",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: "idle",
    createError: null,
    updateStatus: "idle",
    updateError: null,
    deleteStatus: "idle",
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch district
      .addCase(fetchDistrict.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDistrict.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDistrict.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create district
      .addCase(createDistrict.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createDistrict.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createDistrict.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      // Fetch district By ID
      .addCase(fetchDistrictById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDistrictById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchDistrictById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update district
      // .addCase(updateDistrict.pending, (state) => {
      //   state.updateStatus = "loading";
      //   state.updateError = null;
      // })
      // .addCase(updateDistrict.fulfilled, (state, action) => {
      //   state.updateStatus = "succeeded";
      //   const index = state.list.findIndex((p) => p.id === action.payload.id);
      //   if (index !== -1) {
      //     state.list[index] = action.payload;
      //   }
      // })
      // .addCase(updateDistrict.rejected, (state, action) => {
      //   state.updateStatus = "failed";
      //   state.updateError = action.payload;
      // })
      .addCase(updateDistrict.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateDistrict.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete district
      .addCase(deleteDistrict.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (district) => district.id !== action.payload
        );
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

export default districtSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchDistrict = createAsyncThunk(
//   "district/fetchDistrict",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/setup/district/"
//       );
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createDistrict = createAsyncThunk(
//   "district/createDistrict",
//   async (districtData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/setup/district/create/",
//         districtData
//       );
//       return response.data.result; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
// // Fetch a single district by ID
// export const fetchDistrictById = createAsyncThunk(
//   "districts/fetchDistrictById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/setup/district/${id}/`
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // Update district
// // Update district
// export const updateDistrict = createAsyncThunk(
//   "districts/updateDistrict",
//   async ({ id, name }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/setup/district/${id}/`,
//         { name }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
// // Delete district
// // export const deletedistrict = createAsyncThunk(
// //   "district/deletedistrict",
// //   async (id) => {
// //     await axios.delete(`http://127.0.0.1:8000/api/setup/district/${id}/`);
// //     return id;
// //   }
// // );
// export const deleteDistrict = createAsyncThunk(
//   "district/deleteDistrict",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/setup/district/${id}/`);
//       // return id; // Return the ID of the deleted district
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// const districtSlice = createSlice({
//   name: "districts",
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     createStatus: "idle",
//     createError: null,
//     deleteStatus: "idle",
//     deleteError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     //fetch district
//     builder
//       .addCase(fetchDistrict.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDistrict.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchDistrict.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       //create district
//       .addCase(createDistrict.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createDistrict.fulfilled, (state, action) => {
//         state.createStatus = "succeeded";
//         state.list.push(action.payload);
//       })
//       .addCase(createDistrict.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload;
//       });
//     // Fetch district By ID
//     builder
//       .addCase(fetchDistrictById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDistrictById.fulfilled, (state, action) => {
//         const index = state.list.findIndex((d) => d.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         } else {
//           state.list.push(action.payload);
//         }
//       })
//       // .addCase(fetchDistrictById.fulfilled, (state, action) => {
//       //   state.isLoading = false;
//       //   state.currentDistrict = action.payload;
//       // })
//       .addCase(fetchDistrictById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       //update district
//       .addCase(updateDistrict.pending, (state) => {
//         state.updateStatus = "loading";
//       })
//       .addCase(updateDistrict.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded";
//         const index = state.list.findIndex((p) => p.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })

//       .addCase(updateDistrict.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.error.message;
//       });
//     //delete district
//     // Delete district
//     builder
//       .addCase(deleteDistrict.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteDistrict.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (district) => district.id !== action.payload
//         );
//       })
//       .addCase(deleteDistrict.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload;
//       });
//   },
// });

// export default districtSlice.reducer;
