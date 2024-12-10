import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// search
export const searchAttendee = createAsyncThunk(
  "attendee/searchAttendee",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/event/attendee/?search=${searchTerm}`
    );
    return response.data.result;
  }
);
// Fetch all"attendees action
export const fetchAttendees = createAsyncThunk(
  "attendees/fetchAttendees",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/event/attendee/"
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createAttendee = createAsyncThunk(
  "attendee/createAttendee",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/event/attendee/create/",
        formData
      );
      toast.success("Attendee created successfully!");
      return response.data.result; // Adjust based on actual response structure
    } catch (error) {
      // Log or display the server error message
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Failed to create attendee."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// Fetch a single attendee by ID action
export const fetchAttendeeById = createAsyncThunk(
  "attendees/fetchAttendeeById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/event/attendee/detail/${id}/`
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update attendee
export const updateAttendee = createAsyncThunk(
  "attendee/updateAttendee",
  async ({ id, ...formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/event/attendee/update/${id}/`,
        formData
      );
      return response.data.result;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAttendee = createAsyncThunk(
  "attendees/deleteAttendee",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(
        `     http://127.0.0.1:8000/api/event/attendee/delete/${id}/`
      );
      return id; // Return the ID of the deleted attendee
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

const attendeeSlice = createSlice({
  name: "attendees",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentAttendee: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all"attendees
      .addCase(fetchAttendees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAttendees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch attendee by ID
      .addCase(fetchAttendeeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendeeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAttendee = action.payload;
        // Update or add the attendee in the list
        const index = state.list.findIndex(
          (attendee) => attendee.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchAttendeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create attendee
      .addCase(createAttendee.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createAttendee.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.createStatus = "succeeded";
      })
      .addCase(createAttendee.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message;
      })
      // Update attendee
      .addCase(updateAttendee.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAttendee.fulfilled, (state, action) => {
        const updatedAttendee = action.payload;
        if (!updatedAttendee || !updatedAttendee.id) return;

        // state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === updatedAttendee.id);
        if (index !== -1) {
          state.list[index] = updatedAttendee;
        }
        //also update currentAttendee if necessory
        if (
          state.currentAttendee &&
          state.currentAttendee.id === updatedAttendee.id
        ) {
          state.currentAttendee = updatedAttendee;
        }
      })
      .addCase(updateAttendee.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete attendee
      .addCase(deleteAttendee.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteAttendee.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (attendee) => attendee.id !== action.payload
        );
      })
      .addCase(deleteAttendee.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete attendee";
      })
      // search MusearchAttendee name
      .addCase(searchAttendee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchAttendee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchAttendee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default attendeeSlice.reducer;
