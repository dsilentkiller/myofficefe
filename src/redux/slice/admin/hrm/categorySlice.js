import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all leaves action
export const fetchLeave = createAsyncThunk(
  "leaves/fetchLeave",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/leave/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a project action
export const createLeave = createAsyncThunk(
  "leaves/createLeave",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/leave/create/",
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

export const fetchLeaveById = createAsyncThunk(
  "leaves/fetchLeaveById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/leave/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateLeaveStatus = createAsyncThunk(
  "leaves/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/leave/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateLeave = createAsyncThunk(
  "leaves/updateLeave",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/leave/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated project data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Delete project
export const deleteLeave = createAsyncThunk(
  "leaves/deleteLeave",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/leave/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search project action
export const searchLeave = createAsyncThunk(
  "leaves/searchLeave",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/leave/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentProject: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchLeaveByIdSuccess: (state, action) => {
      state.currentProject = action.payload; // This should update the currentProject
    },
    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch leaves
      .addCase(fetchLeave.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch project by ID
      .addCase(fetchLeaveById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchLeaveById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentProject = action.payload; // Make sure payload is correctly updating currentProject
      })
      .addCase(fetchLeaveById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentLeave= null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const updatedLeave = action.payload;
        state.list = state.list.map((leave) =>
          leave.id === updatedLeave.id ? updatedLeave : leave
        );
        if (state.currentLeave.id === updatedLeave.id) {
          state.currentLeave = updatedLeave;
        }
      })

      //create leave
      .addCase(createLeave.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
//update project
      .addCase(updateLeave.fulfilled, (state, action) => {
        const updatedLeave = action.payload;
        if (!updatedLeave || !updatedLeave.id) return;

        // Update project in the list
        const index = state.list.findIndex(
          (leave) => leave.id === updatedLeave.id
        );

        if (index !== -1) {
          state.list[index] = updatedLeave;
        }

        // Also update currentProject if necessary
        if (
          state.currentLeave &&
          state.currentLeave.id === updatedLeave.id
        ) {
          state.currentLeave = updatedLeave;
        }
      })

      .addCase(updateLeave.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update project";
      })
      // Delete project
      .addCase(deleteLeave.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (leave) => leave.id !== action.payload
        );
      })
      .addCase(deleteLeave.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload ;
      })
   
      // Search project
      .addCase(searchLeave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default leaveSlice.reducer;