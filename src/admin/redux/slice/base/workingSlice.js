import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchWorking = createAsyncThunk(
  "workings/searchWorking",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/setup/working/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all municipalities action
export const fetchWorkings = createAsyncThunk(
  "workings/fetchWorkings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/working/"
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const createWorking = createAsyncThunk(
  "workings/createWorking",
  async (workingData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/working/create/",
        workingData
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.result.data);
    }
  }
);
// Fetch a single working by ID action
export const fetchWorkingById = createAsyncThunk(
  "workings/fetchWorkingById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/working/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update working
export const updateWorking = createAsyncThunk(
  "workings/updateWorking",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/working/update/${id}/`,
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

export const deleteWorking = createAsyncThunk(
  "workings/deleteWorking",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(
        `http://127.0.0.1:8000/api/setup/working/delete/${id}/`
      );
      return id; // Return the ID of the deleted working
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

// export const deleteWorking = createAsyncThunk(
//   "working/deleteWorking",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/api/municipalities/${id}`);
//       return id; // Return the ID of the deleted working
//     } catch (error) {
//       // Use rejectWithValue to return a custom error message
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

const workingSlice = createSlice({
  name: "workings",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentWorking: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all municipalities
      .addCase(fetchWorkings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchWorkings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch working by ID
      .addCase(fetchWorkingById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWorking = action.payload;
        // Update or add the working in the list
        const index = state.list.findIndex(
          (working) => working.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchWorkingById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create working
      .addCase(createWorking.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createWorking.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createWorking.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      // Update working
      .addCase(updateWorking.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateWorking.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateWorking.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete working
      .addCase(deleteWorking.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteWorking.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (working) => working.id !== action.payload
        );
      })
      .addCase(deleteWorking.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete working";
      })
      // search MusearchWorking name
      .addCase(searchWorking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchWorking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchWorking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default workingSlice.reducer;
