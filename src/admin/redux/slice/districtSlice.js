import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching districts
export const fetchDistricts = createAsyncThunk(
  "district/fetchDistricts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/district"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating a new district
export const createDistrict = createAsyncThunk(
  "district/createDistrict",
  async (districtData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/district/create/",
        districtData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const districtSlice = createSlice({
  name: "districts",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: "idle",
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch districts
    builder
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
      });

    // Create district
    builder
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
      });
  },
});

export default districtSlice.reducer;
