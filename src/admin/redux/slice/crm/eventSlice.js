// src/store/eventSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchEvent = createAsyncThunk(
  "event/searchEvent",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/events/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all"events action
export const fetchEvent = createAsyncThunk(
  "events/fetchEvent",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/event/");
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// export const createEvent = createAsyncThunk(
//   "events/createEvent",
//   async (eventData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/events/create/",
//         eventData
//       );
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.result.data);
//     }
//   }
// );

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/event/create/",
        eventData
      );
      if (response.status === 201) {
        // Ensure it's a successful creation response
        return response.data.result.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to create event.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Fetch a single event by ID action
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/event/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update event
// export const updateEvent = createAsyncThunk(
//   "event/updateEvent",
//   async ({ id, name }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/events/update/${id}/`,
//         { name }
//       );
//       return response.data.result.data;
//     } catch (error) {
//       const message =
//         error.response?.data?.message || error.message || "An error occurred";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(`http://127.0.0.1:8000/api/event/delete/${id}/`);
      return id; // Return the ID of the deleted event
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

const initialState = {
  events: [],
  isLoading: false,
  error: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  currentEvent: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
});

export const { addEvent, removeEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;
