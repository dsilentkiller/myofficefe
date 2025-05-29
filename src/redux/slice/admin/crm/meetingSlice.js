// meetingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../../../admin/api/axiosInstance.jsx"; // use shared axiosInstance Multi-tenant aware
import axiosInstance from '../../../../admin/api/axiosInstance';

// Define the initial state of the slice

// Thunks to interact with the API (CRUD operations)

export const fetchMeetings = createAsyncThunk(
  "meetings/fetchMeetings",
  async (eventId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/meeting-update/list/`

        // `api/events/${eventId}/meetings/`
      );
      console.log("data:", response.data);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createMeeting = createAsyncThunk(
  "meetings/createMeeting",
  async ({ eventId, formData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/meeting-update/create/`,
        // `api/events/${eventId}/meetings/`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateMeeting = createAsyncThunk(
  "meetings/updateMeeting",
  async ({ id, eventId, meetingId, formData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `api/meeting-update/update/${id}/`,
        // `api/events/${eventId}/meetings/${meetingId}/`,
        formData
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// In your redux/slice/crm/meetingSlice.js

// Async action to fetch meeting details by ID
export const meetingDetail = createAsyncThunk(
  "meetings/meetingDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.fetch(
        `api/meeting-update/detail/${id}/`
      );
      if (!response.ok) throw new Error("Failed to fetch meeting details");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  "meetings/deleteMeeting",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(
        `api/meeting-update/delete/${id}/`
        // `api/events/${eventId}/meetings/${meetingId}/`
      );
      return id; // Returning meetingId so we can remove it from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the slice
const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
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
    builder
      .addCase(updateMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMeeting = action.payload; // set the fetched meeting data
      });

    builder
      .addCase(updateMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //detail
      .addCase(meetingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(meetingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMeeting = action.payload;
      })
      .addCase(meetingDetail.rejected, (state, action) => {
        state.loading = false;
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
