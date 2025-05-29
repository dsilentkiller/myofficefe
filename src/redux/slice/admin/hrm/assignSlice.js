import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all assigns action
export const fetchAssigns = createAsyncThunk(
  "assigns/fetchAssigns",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/assets/assign-assets/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a project action
export const createAssign = createAsyncThunk(
  "assigns/createAssign",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/assets/assign-asset/create/",
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

export const fetchAssignById = createAsyncThunk(
  "assigns/fetchAssignById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/assign-assets/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateAssignStatus = createAsyncThunk(
  "assigns/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/assets/assign-assets/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateAssign = createAsyncThunk(
  "assigns/updateAssign",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/assets/assign-assets/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated project data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Delete project
export const deleteAssign = createAsyncThunk(
  "assigns/deleteAssign",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/assets/assign-assets/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search project action
export const searchAssign = createAsyncThunk(
  "assigns/searchAssign",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/assign-assets/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const assignSlice = createSlice({
  name: "assigns",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentAssign: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchAssignByIdSuccess: (state, action) => {
      state.currentAssign = action.payload; // This should update the currentAssign
    },
    setCurrentAssign(state, action) {
      state.currentAssign = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch assigns
      .addCase(fetchAssigns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAssigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAssigns.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch project by ID
      .addCase(fetchAssignById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAssignById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentAssign = action.payload; // Make sure payload is correctly updating currentAssign
      })
      .addCase(fetchAssignById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentAssign = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateAssignStatus.fulfilled, (state, action) => {
        const updatedAssign = action.payload;
        state.list = state.list.map((project) =>
          project.id === updatedAssign.id ? updatedAssign : project
        );
        if (state.currentAssign.id === updatedAssign.id) {
          state.currentAssign = updatedAssign;
        }
      })

      //create project
      .addCase(createAssign.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createAssign.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createAssign.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
//update project
      .addCase(updateAssign.fulfilled, (state, action) => {
        const updatedAssign = action.payload;
        if (!updatedAssign || !updatedAssign.id) return;

        // Update project in the list
        const index = state.list.findIndex(
          (project) => project.id === updatedAssign.id
        );

        if (index !== -1) {
          state.list[index] = updatedAssign;
        }

        // Also update currentAssign if necessary
        if (
          state.currentAssign &&
          state.currentAssign.id === updatedAssign.id
        ) {
          state.currentAssign = updatedAssign;
        }
      })

      .addCase(updateAssign.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update project";
      })
      // Delete project
      .addCase(deleteAssign.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteAssign.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteAssign.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload ;
      })
   
      // Search project
      .addCase(searchAssign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchAssign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchAssign.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default assignSlice.reducer;