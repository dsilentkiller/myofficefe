import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Search Enquiries
export const searchEnquiry = createAsyncThunk(
  "enquiry/searchEnquiry",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/enquiry/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);

// Fetch all enquiries
export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetchEnquiries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/enquiry/");
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create Enquiry
// Create Enquiry (improved error handling)
export const createEnquiry = createAsyncThunk(
  "enquiries/createEnquiry",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/enquiry/create/",
        formData
      );
      return response.data.result.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch a single enquiry by ID
export const fetchEnquiryById = createAsyncThunk(
  "enquiries/fetchEnquiryById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/detail/${id}/`
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update Enquiry
export const updateEnquiry = createAsyncThunk(
  "enquiry/updateEnquiry",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
        { name }
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete Enquiry
export const deleteEnquiry = createAsyncThunk(
  "enquiries/deleteEnquiry",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/enquiry/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);
export const fetchCategories = createAsyncThunk(
  "enquiry/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/enquiry/category/"
    );
    return response.data.result;
  }
);

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: {
    list: [], // Initialize list as an empty array
    loading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentEnquiry: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all enquiries
      .addCase(fetchEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Ensure list is an array
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Fetch enquiry by ID
      .addCase(fetchEnquiryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEnquiry = action.payload;
        const index = state.list.findIndex(
          (enquiry) => enquiry.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchEnquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Create Enquiry
      .addCase(createEnquiry.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      })

      // Update Enquiry
      .addCase(updateEnquiry.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex(
          (enquiry) => enquiry.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      })

      // Delete Enquiry
      .addCase(deleteEnquiry.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (enquiry) => enquiry.id !== action.payload
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      })

      // Search Enquiries
      .addCase(searchEnquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Ensure the list is an array
      })
      .addCase(searchEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default enquirySlice.reducer;
