// meetingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state of the slice

// Thunks to interact with the API (CRUD operations)

export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async (eventId, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/events/${eventId}/meetings/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createMeeting = createAsyncThunk(
  'meetings/createMeeting',
  async ({ eventId, meetingData }, thunkAPI) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/events/${eventId}/meetings/`, meetingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateMeeting = createAsyncThunk(
  'meetings/updateMeeting',
  async ({ eventId, meetingId, meetingData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/events/${eventId}/meetings/${meetingId}/`, meetingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  'meetings/deleteMeeting',
  async ({ eventId, meetingId }, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/meetings/${meetingId}/`);
      return meetingId; // Returning meetingId so we can remove it from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the slice
const meetingSlice = createSlice({
  name: 'meetings',
  initialState:{
    meeting: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentMeetingUpdate: null,
  },
  reducers: {
    clearMeetingsState: (state) => {
      state.meetings = [];
      state.meeting = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch meetings
    builder.addCase(fetchMeetings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMeetings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetings = action.payload;
    });
    builder.addCase(fetchMeetings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Add meeting
    builder.addCase(createMeeting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetings.push(action.payload);
    });
    builder.addCase(createMeeting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Edit meeting
    builder.addCase(updateMeeting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedMeetingIndex = state.meetings.findIndex(
        (meeting) => meeting.id === action.payload.id
      );
      if (updatedMeetingIndex !== -1) {
        state.meetings[updatedMeetingIndex] = action.payload;
      }
    });
    builder.addCase(updateMeeting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete meeting
    builder.addCase(deleteMeeting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMeeting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetings = state.meetings.filter(
        (meeting) => meeting.id !== action.payload
      );
    });
    builder.addCase(deleteMeeting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export actions and reducer
export const { clearMeetingsState } = meetingSlice.actions;

export default meetingSlice.reducer;
