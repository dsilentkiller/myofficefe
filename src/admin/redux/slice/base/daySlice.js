import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchDay = createAsyncThunk(
  "day/searchDay",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/setup/day/?search=${searchTerm}`
    );
    return response.data.result;
  }
);
// Fetch all"days action
export const fetchDays = createAsyncThunk(
  "days/fetchDays",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/setup/day/");
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// export const createDay = createAsyncThunk(
//   "days/createDay",
//   async (dayData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/setup/day/create/",
//         dayData
//       );
//       return response.data.result; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.result.data);
//     }
//   }
// );

export const createDay = createAsyncThunk(
  "days/createDay",
  async (dayData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/day/create/",
        dayData
      );
      if (response.status === 201) {
        // Ensure it's a successful creation response
        return response.data.result;
      } else {
        return thunkAPI.rejectWithValue("Failed to create day.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Fetch a single day by ID action
export const fetchDayById = createAsyncThunk(
  "days/fetchDayById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/day/${id}/`
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update day
export const updateDay = createAsyncThunk(
  "day/updateDay",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/day/update/${id}/`,
        { name }
      );
      return response.data.result;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDay = createAsyncThunk(
  "days/deleteDay",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(`http://127.0.0.1:8000/api/setup/day/delete/${id}/`);
      return id; // Return the ID of the deleted day
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

const daySlice = createSlice({
  name: "days",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentDay: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all"days
      .addCase(fetchDays.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch day by ID
      .addCase(fetchDayById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDayById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDay = action.payload;
        // Update or add the day in the list
        const index = state.list.findIndex(
          (day) => day.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchDayById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create day
      .addCase(createDay.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createDay.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.createStatus = "succeeded";
      })
      .addCase(createDay.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message;
      })
      // Update day
      .addCase(updateDay.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateDay.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateDay.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete day
      .addCase(deleteDay.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteDay.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter((day) => day.id !== action.payload);
      })
      .addCase(deleteDay.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete day";
      })
      // search MusearchDay name
      .addCase(searchDay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default daySlice.reducer;
