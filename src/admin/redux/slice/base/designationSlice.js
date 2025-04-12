import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchDesignation = createAsyncThunk(
  "designations/searchDesignation",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/setup/designation/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all designation action
export const fetchDesignations = createAsyncThunk(
  "designations/fetchDesignations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/designation/"
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
    }
  }
);
export const createDesignation = createAsyncThunk(
  "designations/createDesignation",
  async (DesignationData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/designation/create/",
        DesignationData
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.result.data);
    }
  }
);
// Fetch a single Designation by ID action
export const fetchDesignationById = createAsyncThunk(
  "designations/fetchDesignationById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/designation/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
    }
  }
);
// // Update Designation
export const updateDesignation = createAsyncThunk(
  "designations/updateDesignation",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/designation/update/${id}/`,
        { name }
      );
      return response.data.result.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  "designations/deleteDesignation",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(
        `http://127.0.0.1:8000/api/setup/designation/delete/${id}/`
      );
      return id; // Return the ID of the deleted Designation
    } catch (error) {
      // Log the entire error to understand its structure
      console.error("Delete request failed:", error);

      // Return a more descriptive error message
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

// export const deleteDesignation = createAsyncThunk(
//   "designation/deleteDesignation",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/api/designation/${id}`);
//       return id; // Return the ID of the deleted Designation
//     } catch (error) {
//       // Use rejectWithValue to return a custom error message
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

const designationSlice = createSlice({
  name: "designations",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: "idle",
    updateStatus: null,
    deleteStatus: null,
    currentDesignation: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all designation
      .addCase(fetchDesignations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Designation by ID
      .addCase(fetchDesignationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDesignationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDesignation = action.payload;
        // Update or add the Designation in the list
        const index = state.list.findIndex(
          (Designation) => Designation.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchDesignationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create Designation
      .addCase(createDesignation.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.createError = null;
        state.list.push(action.payload);
      })
      .addCase(createDesignation.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error;
      })
      // Update Designation
      .addCase(updateDesignation.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete Designation
      .addCase(deleteDesignation.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (designation) => designation.id !== action.payload
        );
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete Designation";
      })
      // search MusearchDesignation name
      .addCase(searchDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default designationSlice.reducer;
