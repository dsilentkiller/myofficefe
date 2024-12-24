import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
// const API_URL = "http://127.0.0.1:8000/api/";

// Async thunk for fetching events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/event/event-list/"
  );
  return response.data.result;
});

// Async thunk for fetching an event by ID
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/event/detail/${id}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Fetch all Events action
export const fetchEvent = createAsyncThunk(
  "Events/fetchEvent",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/Event/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for creating a new event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/event/create/`,
        eventData
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an event
export const fetchEventByIdUpdate = createAsyncThunk(
  "events/fetchEventByIdUpdate",
  async ({ id, eventData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/event/update/${id}/`,
        eventData
      );
      return response.data.result;
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
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/event/delete/${id}/`
      );
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
    error: null,
  },
  reducers: {
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload; // Correct case
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;

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
