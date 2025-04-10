import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all demos action
export const fetchDemos = createAsyncThunk(
  "demos/fetchDemos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/website/request-demo/"
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a demo action
export const createDemo = createAsyncThunk(
  "demos/createDemo",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/website/request-demo/create/",
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

export const fetchDemoById = createAsyncThunk(
  "demos/fetchDemoById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/request-demo/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateDemoStatus = createAsyncThunk(
  "demos/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/website/request-demo/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateDemo = createAsyncThunk(
  "demos/updateDemo",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/website/request-demo/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated demo data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete demo
export const deleteDemo = createAsyncThunk(
  "demos/deleteDemo",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/website/request-demo/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search demo action
export const searchDemo = createAsyncThunk(
  "demos/searchDemo",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/request-demo/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const demoSlice = createSlice({
  name: "demos",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentDemo: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchContactByIdSuccess: (state, action) => {
      state.currentDemo = action.payload; // This should update the currentDemo
    },
    setCurrentContact(state, action) {
      state.currentDemo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch demos
      .addCase(fetchDemos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDemos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDemos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch demo by ID
      .addCase(fetchDemoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchDemoById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentDemo = action.payload; // Make sure payload is correctly updating currentDemo
      })
      .addCase(fetchDemoById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentDemo = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateDemoStatus.fulfilled, (state, action) => {
        const updatedDemo = action.payload;
        state.list = state.list.map((demo) =>
          demo.id === updatedDemo.id ? updatedDemo : demo
        );
        if (state.currentDemo.id === updatedDemo.id) {
          state.currentDemo = updatedDemo;
        }
      })

      //create demo
      .addCase(createDemo.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createDemo.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createDemo.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      //update demo
      .addCase(updateDemo.fulfilled, (state, action) => {
        const updatedDemo = action.payload;
        if (!updatedDemo || !updatedDemo.id) return;

        // Update demo in the list
        const index = state.list.findIndex(
          (demo) => demo.id === updatedDemo.id
        );

        if (index !== -1) {
          state.list[index] = updatedDemo;
        }

        // Also update currentDemo if necessary
        if (state.currentDemo && state.currentDemo.id === updatedDemo.id) {
          state.currentDemo = updatedDemo;
        }
      })

      .addCase(updateDemo.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update demo";
      })
      // Delete demo
      .addCase(deleteDemo.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteDemo.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter((demo) => demo.id !== action.payload);
      })
      .addCase(deleteDemo.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })

      // Search demo
      .addCase(searchDemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchDemo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default demoSlice.reducer;
