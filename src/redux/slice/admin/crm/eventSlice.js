import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../admin/api/axiosInstance"; // use shared axiosInstance Multi-tenant aware

// API URL
// const API_URL = "api/";

// Async thunk for fetching events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axiosInstance.get("api/event/event-list/");
  return response.data.result;
});

export const updateEventStatus = createAsyncThunk(
  "events/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`api/event/cancel/${id}/`, {
        is_canceled: true,
      }); // Patch request to cancel the event
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async action to fetch event details by ID
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id) => {
    const response = await axiosInstance.fetch(`api/event/detail/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    return await response.json(); // Assuming the API returns the event data
  }
);



// Async thunk for creating a new event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`api/event/create/`, eventData);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchEventByIdUpdate = createAsyncThunk(
  "events/updateEvent",
  async ({ id, eventToSave }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `api/event/update/${id}/`,
        eventToSave
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`api/event/delete/${id}/`);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    status: "idle",
    selectedEvent: null, // Ensure this is part of the initial state
    currentEvent: null,
    error: null,
  },
  reducers: {
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload;
    },
    eventDeleted: (state, action) => {
      // Remove the deleted event from the state
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEventStatus.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        state.selectedEvent = updatedEvent;
        // Update the selected event status in Redux store
        if (state.selectedEvent.id === action.payload.id) {
          state.selectedEvent.is_canceled = true; // Update status to cancelled
        }
      })
      .addCase(updateEventStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // Fetch events
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //single event
      .addCase(fetchEventById.pending, (state) => {
        state.status = "loading";
        // state.loading = true;
        // state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload;
        state.loading = false;
        state.currentEvent = action.payload; // Correct case
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;

        state.currentEvent = null;
        state.error = action.payload || "Failed to fetch event";
      });

    // Create event
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Update event
    builder
      .addCase(fetchEventByIdUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventByIdUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        state.events[index] = action.payload;
      })
      .addCase(fetchEventByIdUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Delete event
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = state.events.filter(
          (event) => event.id !== action.payload.id
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
