import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all follows action
export const fetchFollows = createAsyncThunk(
  "follows/fetchFollow",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/followup/");
      console.log(response.data);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a follow action
export const createFollow = createAsyncThunk(
  "follow/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/followup/create/",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// detail id wise
export const fetchFollowById = createAsyncThunk(
  "follows/fetchFollowById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/followup/detail/${id}/`
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
//updatefollwbyid
export const updateFollowById = createAsyncThunk(
  "follows/updateFollowById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/followup/update/${id}/`
      );
      return response.data.result;
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
      `http://127.0.0.1:8000/api/followup/${id}/`,
      { status }
    );
    return response.data.result;
  }
);

// export const updateFollow = createAsyncThunk(
//   "follows/updateFollow",
//   async ({ id, ...data }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/followup/update/${id}/`,
//         data
//       );
//       return response.data.result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Delete follow
export const deleteFollow = createAsyncThunk(
  "follows/deleteFollow",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/followup/delete/${id}/`);
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
        `http://127.0.0.1:8000/api/followup/?search=${searchTerm}`
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
    fetchError: null,
  },
  reducers: {
    fetchFollowByIdSuccess: (state, action) => {
      state.currentFollow = action.payload;
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
        state.fetchError = action.payload;
      })
      // Fetch follow by ID
      .addCase(fetchFollowById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFollowById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFollow = action.payload;
      })
      .addCase(fetchFollowById.rejected, (state, action) => {
        state.isLoading = false;
        state.currentFollow = null;
        state.fetchError = action.error.message;
      })
      // update follow by id
      .addCase(updateFollowById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFollowById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFollow = action.payload;
      })
      .addCase(updateFollowById.rejected, (state, action) => {
        state.isLoading = false;
        state.currentFollow = null;
        state.fetchError = action.error.message;
      })
      .addCase(updateFollowStatus.fulfilled, (state, action) => {
        const updatedFollow = action.payload;
        const index = state.list.findIndex(
          (follow) => follow.id === updatedFollow.id
        );
        if (index !== -1) {
          state.list[index] = updatedFollow;
        }
        if (state.currentFollow?.id === updatedFollow.id) {
          state.currentFollow = updatedFollow;
        }
      })
      // create follow
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
        state.createError = action.payload;
        console.error("Create Follow Error:", action.payload);
      })
      // .addCase(updateFollow.fulfilled, (state, action) => {
      //   const updatedFollow = action.payload;
      //   if (!updatedFollow || !updatedFollow.id) return;

      //   const index = state.list.findIndex(
      //     (follow) => follow.id === updatedFollow.id
      //   );
      //   if (index !== -1) {
      //     state.list[index] = updatedFollow;
      //   }

      //   if (state.currentFollow?.id === updatedFollow.id) {
      //     state.currentFollow = updatedFollow;
      //   }
      // })
      // .addCase(updateFollow.rejected, (state, action) => {
      //   state.updateStatus = "failed";
      //   state.updateError = action.payload || "Failed to update follow";
      // })
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
