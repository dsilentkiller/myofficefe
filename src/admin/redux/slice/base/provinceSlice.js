import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Fetch districts by province ID
export const fetchDistrictsByProvince = createAsyncThunk(
  "districts/fetchDistrictsByProvince",
  async (provinceId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/districts/?province=${provinceId}`
      );
      return response.data.result.data; // Adjust based on API response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
    }
  }
);
export const fetchProvinces = createAsyncThunk(
  "provinces/fetchProvinces",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/province/"
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
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
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
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
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
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
        `http://127.0.0.1:8000/api/setup/province/update/${id}/`,
        { name }
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
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
    return response.data.result.data;
  }
);

export const deleteProvince = createAsyncThunk(
  "provinces/deleteProvince",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/setup/province/delete/${id}/`
      );
      return id; // Return the ID of the deleted province
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
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
    
      .addCase(fetchDistrictsByProvince.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDistrictsByProvince.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDistrictsByProvince.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
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
