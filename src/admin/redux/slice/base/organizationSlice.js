import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API requests
export const fetchDistrictsByOrganization = createAsyncThunk(
  "districts/fetchDistrictsByOrganization",
  async (organizationId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/districts/?organization=${organizationId}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.result?.data || error.message);
    }
  }
);

export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/organization/"
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.result?.data || error.message);
    }
  }
);

export const createOrganization = createAsyncThunk(
  "organization/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/organization/create/",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchOrganizationById = createAsyncThunk(
  "organizations/fetchOrganizationById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/organization/detail/${id}/`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.result?.data || error.message);
    }
  }
);

export const updateOrganizationStatus = createAsyncThunk(
  "organizations/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/setup/organization/update/${id}/`,
      { status }
    );
    return response.data.result;
  }
);

export const updateOrganization = createAsyncThunk(
  "organizations/updateOrganization",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/organization/update/${id}/`,
        { name }
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.result?.data || error.message);
    }
  }
);

export const searchOrganization = createAsyncThunk(
  "organizations/searchOrganization",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/setup/organization/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);

export const deleteOrganization = createAsyncThunk(
  "organizations/deleteOrganization",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/setup/organization/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.result?.data || error.message);
    }
  }
);

// Slice Definition
const organizationSlice = createSlice({
  name: "organizations",
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
    currentOrganization: null,
  },
  reducers: {
    setCurrentOrganization(state, action) {
      state.currentOrganization = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch organizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Create organization
      .addCase(createOrganization.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      })

      // Fetch organization by ID
      .addCase(fetchOrganizationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrganization = action.payload;
      })
      .addCase(fetchOrganizationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Update organization
      .addCase(updateOrganization.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        state.list[index] = action.payload;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      })

      // Delete organization
      .addCase(deleteOrganization.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (organization) => organization.id !== action.payload
        );
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      });
  },
});

export default organizationSlice.reducer;
