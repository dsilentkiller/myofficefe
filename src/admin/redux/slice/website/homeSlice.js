import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all homes action
export const fetchHome = createAsyncThunk(
  "homes/fetchHome",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/website/home/"
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a home action
export const createHome = createAsyncThunk(
  "homes/createHome",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/website/home/create/",
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

export const fetchHomeById = createAsyncThunk(
  "homes/fetchHomeById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/home/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateHomeStatus = createAsyncThunk(
  "homes/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/website/home/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateHome = createAsyncThunk(
  "homes/updateHome",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/website/home/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated home data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete home
export const deleteHome = createAsyncThunk(
  "homes/deleteHome",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/website/home/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search home action
export const searchHome = createAsyncThunk(
  "homes/searchHome",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/home/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const homeSlice = createSlice({
  name: "homes",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentHome: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchContactByIdSuccess: (state, action) => {
      state.currentHome = action.payload; // This should update the currentHome
    },
    setCurrentContact(state, action) {
      state.currentHome = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch homes
      .addCase(fetchHome.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch home by ID
      .addCase(fetchHomeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchHomeById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentHome = action.payload; // Make sure payload is correctly updating currentHome
      })
      .addCase(fetchHomeById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentHome = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateHomeStatus.fulfilled, (state, action) => {
        const updatedHome = action.payload;
        state.list = state.list.map((home) =>
          home.id === updatedHome.id ? updatedHome : home
        );
        if (state.currentHome.id === updatedHome.id) {
          state.currentHome = updatedHome;
        }
      })

      //create home
      .addCase(createHome.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createHome.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createHome.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      //update home
      .addCase(updateHome.fulfilled, (state, action) => {
        const updatedHome = action.payload;
        if (!updatedHome || !updatedHome.id) return;

        // Update home in the list
        const index = state.list.findIndex(
          (home) => home.id === updatedHome.id
        );

        if (index !== -1) {
          state.list[index] = updatedHome;
        }

        // Also update currentHome if necessary
        if (state.currentHome && state.currentHome.id === updatedHome.id) {
          state.currentHome = updatedHome;
        }
      })

      .addCase(updateHome.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update home";
      })
      // Delete home
      .addCase(deleteHome.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteHome.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter((home) => home.id !== action.payload);
      })
      .addCase(deleteHome.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })

      // Search home
      .addCase(searchHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchHome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
