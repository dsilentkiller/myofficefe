import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all services action
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/website/service/"
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a service action
export const createServices = createAsyncThunk(
  "services/createServices",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/website/service/create/",
        formData
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchServicesById = createAsyncThunk(
  "services/fetchServicesById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/service/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateServicesStatus = createAsyncThunk(
  "services/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/website/service/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateServices = createAsyncThunk(
  "services/updateServices",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/website/service/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated service data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete service
export const deleteServices = createAsyncThunk(
  "services/deleteServices",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/website/service/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search service action
export const searchServices = createAsyncThunk(
  "services/searchServices",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/service/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentServices: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchContactByIdSuccess: (state, action) => {
      state.currentServices = action.payload; // This should update the currentServices
    },
    setCurrentContact(state, action) {
      state.currentServices = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch service by ID
      .addCase(fetchServicesById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchServicesById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentServices = action.payload; // Make sure payload is correctly updating currentServices
      })
      .addCase(fetchServicesById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentServices = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateServicesStatus.fulfilled, (state, action) => {
        const updatedServices = action.payload;
        state.list = state.list.map((service) =>
          service.id === updatedServices.id ? updatedServices : service
        );
        if (state.currentServices.id === updatedServices.id) {
          state.currentServices = updatedServices;
        }
      })

      //create service
      .addCase(createServices.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createServices.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createServices.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      //update service
      .addCase(updateServices.fulfilled, (state, action) => {
        const updatedServices = action.payload;
        if (!updatedServices || !updatedServices.id) return;

        // Update service in the list
        const index = state.list.findIndex(
          (service) => service.id === updatedServices.id
        );

        if (index !== -1) {
          state.list[index] = updatedServices;
        }

        // Also update currentServices if necessary
        if (
          state.currentServices &&
          state.currentServices.id === updatedServices.id
        ) {
          state.currentServices = updatedServices;
        }
      })

      .addCase(updateServices.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update service";
      })
      // Delete service
      .addCase(deleteServices.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteServices.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (service) => service.id !== action.payload
        );
      })
      .addCase(deleteServices.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })

      // Search service
      .addCase(searchServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
