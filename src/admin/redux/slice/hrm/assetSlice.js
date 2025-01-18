import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all assets action
export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/assets/list/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a project action
export const createAsset = createAsyncThunk(
  "assets/createAsset",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/assets/create/",
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

export const fetchAssetsById = createAsyncThunk(
  "assets/fetchAssetsById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateAssetStatus = createAsyncThunk(
  "assets/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/assets/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/assets/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated project data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Delete project
export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/assets/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search project action
export const searchAsset = createAsyncThunk(
  "assets/searchAsset",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const assetSlice = createSlice({
  name: "assets",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentAsset: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchAssetsByIdSuccess: (state, action) => {
      state.currentAsset = action.payload; // This should update the currentAsset
    },
    setCurrentAsset(state, action) {
      state.currentAsset = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch project by ID
      .addCase(fetchAssetsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAssetsById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentAsset = action.payload; // Make sure payload is correctly updating current Asset
      })
      .addCase(fetchAssetsById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentAsset = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateAssetStatus.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        state.list = state.list.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );
        if (state.currentAsset.id === updatedProject.id) {
          state.currentAsset = updatedProject;
        }
      })

      //create project
      .addCase(createAsset.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
//update project
      .addCase(updateAsset.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        if (!updatedProject || !updatedProject.id) return;

        // Update project in the list
        const index = state.list.findIndex(
          (project) => project.id === updatedProject.id
        );

        if (index !== -1) {
          state.list[index] = updatedProject;
        }

        // Also update current Asset if necessary
        if (
          state.currentAsset &&
          state.currentAsset.id === updatedProject.id
        ) {
          state.currentAsset = updatedProject;
        }
      })

      .addCase(updateAsset.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update project";
      })
      // Delete project
      .addCase(deleteAsset.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload ;
      })
   
      // Search project
      .addCase(searchAsset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchAsset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchAsset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default assetSlice.reducer;
