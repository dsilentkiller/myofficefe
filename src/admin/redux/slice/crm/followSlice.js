import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all follows action
export const fetchFollows = createAsyncThunk(
  "follows/fetchFollow",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/enquiry/follow-up/"
      );
      console.log(response.data); // Log response to verify structure
      return response.data.result; // Ensure the correct structure here
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a follow action
export const createFollow = createAsyncThunk(
  "follows/createFollow",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/enquiry/follow-up/create/",
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

export const fetchFollowById = createAsyncThunk(
  "follows/fetchFollowById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/follow-up/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update follow Status
export const updateFollowStatus = createAsyncThunk(
  "follows/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/enquiry/follow-up/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateFollow = createAsyncThunk(
  "follows/updateFollow",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/enquiry/follow-up/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated follow data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete follow
export const deleteFollow = createAsyncThunk(
  "follows/deleteFollow",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/enquiry/follow-up/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search follow action
export const searchFollow = createAsyncThunk(
  "follows/searchFollow",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/follow-up/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const followSlice = createSlice({
  name: "follows",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentFollow: null,
    createError: null,
    updateError: null,
    deleteError: null,
    fetchError: null, // Add fetchError heres
  },
  reducers: {
    fetchFollowByIdSuccess: (state, action) => {
      state.currentFollow = action.payload; // This should update the currentFollow
    },
    setCurrentFollow(state, action) {
      state.currentFollow = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch follows
      .addCase(fetchFollows.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFollows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchFollows.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.payload; // Use fetchError to handle errors
      })
      // Fetch follow by ID
      .addCase(fetchFollowById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchFollowById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentFollow = action.payload; // Make sure payload is correctly updating currentFollow
      })
      .addCase(fetchFollowById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentFollow = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateFollowStatus.fulfilled, (state, action) => {
        const updatedFollow = action.payload;
        state.list = state.list.map((follow) =>
          follow.id === updatedFollow.id ? updatedFollow : follow
        );
        if (state.currentFollow.id === updatedFollow.id) {
          state.currentFollow = updatedFollow;
        }
      })

      .addCase(createFollow.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createFollow.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createFollow.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload; // Logs any specific validation errors
        console.error("Create Follow Error:", action.payload);
      })

      .addCase(updateFollow.fulfilled, (state, action) => {
        const updatedFollow = action.payload;
        if (!updatedFollow || !updatedFollow.id) return;

        // Update follow in the list
        const index = state.list.findIndex(
          (follow) => follow.id === updatedFollow.id
        );

        if (index !== -1) {
          state.list[index] = updatedFollow;
        }

        // Also update currentFollow if necessary
        if (
          state.currentFollow &&
          state.currentFollow.id === updatedFollow.id
        ) {
          state.currentFollow = updatedFollow;
        }
      })

      .addCase(updateFollow.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update follow";
      })
      // Delete follow
      .addCase(deleteFollow.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteFollow.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (follow) => follow.id !== action.payload
        );
      })
      .addCase(deleteFollow.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete follow";
      })
      // Search follow
      .addCase(searchFollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFollow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchFollow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default followSlice.reducer;
