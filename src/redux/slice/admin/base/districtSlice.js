import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../../admin/api/axiosInstance";


// Async thunk to fetch districts based on province ID
export const fetchDistrictsByProvince = createAsyncThunk(
  'districts/fetchByProvince',
  async (provinceId) => {
    try {
      const response = await axiosInstance.get(`api/setup/district/${provinceId}/`);
      return response.data;  // Return an array of districts [{id, name}, ...]
    } catch (error) {
      throw error;
    }
  }
);

export const fetchMunicipalityByDistrict = createAsyncThunk(
  "districts/fetchMunicipalityByDistrict",
  async (districtId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/setup/municipalities/?district=${districtId}`
      );
      return response.data.result; // Adjust based on API response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
    }
  }
);
// Thunks
export const fetchDistricts = createAsyncThunk(
  "districts/fetchDistricts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "api/setup/district/"
      );
      console.log("Fetched districts:", response.data); // Add this line
      return response.data.result.data; // Adjust based on the actual API response structure
    } catch (error) {
      console.error("Error fetching districts:", error); // Log error if it occurs
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDistrict = createAsyncThunk(
  "districts/createDistrict",
  async (districtData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/setup/district/create/",
        districtData
      );
      return response.data.result.data; // Adjust based on your API response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDistrictById = createAsyncThunk(
  "districts/fetchDistrictById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/setup/district/${id}/`
      );
      return response.data.result;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Example of the updateDistrict action in the Redux slice


export const updateDistrict = createAsyncThunk(
  "districts/updateDistrict",
  async (district, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `api/setup/district/update/${district.id}/`,
        district
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update district"
      );
    }
  }
);


// search
export const searchDistrict = createAsyncThunk(
  "districts/searchDistrict",
  async (searchTerm) => {
    const response = await axiosInstance.get(
      `api/setup/district/?search=${searchTerm}`
    );
    return response.data.result;
  }
);

export const deleteDistrict = createAsyncThunk(
  "districts/deleteDistrict",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(
        `api/setup/district/delete/${id}/`
      );
      return id; // Return the id of the deleted province
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
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
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // .addCase(fetchDistrictsByProvince.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(fetchDistrictsByProvince.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.list = action.payload; // Assign fetched districts
    // })
    // .addCase(fetchDistrictsByProvince.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.error.message;
    // })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.list = state.list.map((district) =>
          district.id === action.payload.id ? action.payload : district
        );
      })

      .addCase(fetchDistrictsByProvince.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDistrictsByProvince.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;  // Populate districts list with the fetched data
      })
      .addCase(fetchDistrictsByProvince.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // .addCase(updateDistrict.fulfilled, (state, action) => {
      //   const updatedDistrict = action.payload;
      //   const index = state.list.findIndex(
      //     (district) => district.id === updatedDistrict.id
      //   );
      //   if (index !== -1) {
      //     state.list[index] = updatedDistrict; // Update both name and province
      //   }
      // })
      .addCase(updateDistrict.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "An error occurred during update";
      })
      .addCase(updateDistrict.pending, (state) => {
        state.updateStatus = "loading";
      })
      // Fetch district
      .addCase(fetchDistricts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
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
        // state.list.push(action.payload);
        if (Array.isArray(state.list)) {
          state.list.push(action.payload); // Push new district if list is an array (to solve state.list.push doesnot defined)
        }
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

      //  delete district
      .addCase(deleteDistrict.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteDistrict.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })
      // search district name
      .addCase(searchDistrict.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDistrict.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchDistrict.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
// export const { resetCreateStatus } = districtSlice.actions;
export default districtSlice.reducer;
