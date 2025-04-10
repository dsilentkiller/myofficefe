import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all abouts action
export const fetchAbout = createAsyncThunk(
  "abouts/fetchAbout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/website/about/"
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create aabout action
export const createAbout = createAsyncThunk(
  "abouts/createAbout",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/website/about/create/",
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

export const fetchAboutById = createAsyncThunk(
  "abouts/fetchAboutById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/about/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateAboutStatus = createAsyncThunk(
  "abouts/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/website/about/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateAbout = createAsyncThunk(
  "abouts/updateAbout",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/website/about/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updatedabout data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Deleteabout
export const deleteAbout = createAsyncThunk(
  "abouts/deleteAbout",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/website/about/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Searchabout action
export const searchAbout = createAsyncThunk(
  "abouts/searchAbout",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/about/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const aboutSlice = createSlice({
  name: "abouts",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentAbout: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchAboutByIdSuccess: (state, action) => {
      state.currentAbout = action.payload; // This should update the currentAbout
    },
    setCurrentAbout(state, action) {
      state.currentAbout = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch abouts
      .addCase(fetchAbout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetchabout by ID
      .addCase(fetchAboutById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAboutById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentAbout = action.payload; // Make sure payload is correctly updating currentAbout
      })
      .addCase(fetchAboutById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentAbout = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateAboutStatus.fulfilled, (state, action) => {
        const updatedAbout = action.payload;
        state.list = state.list.map((about) =>
          about.id === updatedAbout.id ? updatedAbout : about
        );
        if (state.currentAbout.id === updatedAbout.id) {
          state.currentAbout = updatedAbout;
        }
      })

      //createabout
      .addCase(createAbout.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      //updateabout
      .addCase(updateAbout.fulfilled, (state, action) => {
        const updatedAbout = action.payload;
        if (!updatedAbout || !updatedAbout.id) return;

        // Updateabout in the list
        const index = state.list.findIndex(
          (about) => about.id === updatedAbout.id
        );

        if (index !== -1) {
          state.list[index] = updatedAbout;
        }

        // Also update currentAbout if necessary
        if (state.currentAbout && state.currentAbout.id === updatedAbout.id) {
          state.currentAbout = updatedAbout;
        }
      })

      .addCase(updateAbout.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to updateabout";
      })
      // Deleteabout
      .addCase(deleteAbout.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter((about) => about.id !== action.payload);
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })

      // Searchabout
      .addCase(searchAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;
