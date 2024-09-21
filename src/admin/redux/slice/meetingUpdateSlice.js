import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchMeetingUpdate = createAsyncThunk(
  "department/searchMeetingUpdate",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/crm/meeting-update/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all"departments action
export const fetchMeetingUpdate = createAsyncThunk(
  "departments/fetchMeetingUpdate",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/crm/meeting-update/"
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// export const createMeeitngUpdate = createAsyncThunk(
//   "departments/createMeeitngUpdate",
//   async (departmentData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/crm/meetingupdate/create/",
//         departmentData
//       );
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.result.data);
//     }
//   }
// );

export const createMeetingUpdate = createAsyncThunk(
  "departments/createMeetingUpdate",
  async (departmentData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/crm/meetingupdate/create/",
        departmentData
      );
      if (response.status === 201) {
        // Ensure it's a successful creation response
        return response.data.result.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to create department.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Fetch a single Department by ID action
export const fetchMeetingUpdateById = createAsyncThunk(
  "departments/fetchMeetingUpdateById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/crm/meetingupdate/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update Department
export const updateMeetingUpdate = createAsyncThunk(
  "department/updateMeetingUpdate",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/crm/meetingupdate/update/${id}/`,
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

export const deleteMeetingUpdate = createAsyncThunk(
  "departments/deleteMeetingUpdate",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(
        `http://127.0.0.1:8000/api/crm/meeting-update/delete/${id}/`
      );
      return id; // Return the ID of the deleted Department
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

const meetingUpdateSlice = createSlice({
  name: "meetingupdates",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentMeetingUpdate: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all"departments
      .addCase(fetchMeetingUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetingUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchMeetingUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Department by ID
      .addCase(fetchMeetingUpdateById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetingUpdateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMeetingUpdate = action.payload;
        // Update or add the Department in the list
        const index = state.list.findIndex(
          (meetingupdate) => meetingupdate.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchMeetingUpdateById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create Department
      .addCase(createMeetingUpdate.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createMeetingUpdate.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.createStatus = "succeeded";
      })
      .addCase(createMeetingUpdate.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message;
      })
      // Update Department
      .addCase(updateMeetingUpdate.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateMeetingUpdate.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateMeetingUpdate.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete Department
      .addCase(deleteMeetingUpdate.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteMeetingUpdate.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (meetingupdate) => meetingupdate.id !== action.payload
        );
      })
      .addCase(deleteMeetingUpdate.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete Department";
      })
      // search MusearchmeetingUpdatename
      .addCase(searchMeetingUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchMeetingUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchMeetingUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default meetingUpdateSlice.reducer;
