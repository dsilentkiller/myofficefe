// src/store/eventSlice.js
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/event/");
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Action to create an event
export const createEvent = (formData) => async (dispatch) => {
  try {
    // const formattedEvent = {
    //   ...formData,
    //   attendees: formData.attendees.map((attendee) => parseInt(attendee, 10)), // Convert to integers
    // };

    // console.log("Formatted Event Data:", formattedEvent); // Log the data being sent

    const response = await axios.post(
      "http://127.0.0.1:8000/api/event/create/",
      formData
    );

    dispatch({ type: "EVENT_CREATED", payload: response.data.result });
  } catch (error) {
    console.error("Error creating event:", error); // Log the full error object

    if (error.response) {
      console.error("Error response data:", error.response.data); // Log specific response details
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);

      // Dispatch an error action with detailed message
      dispatch({
        type: "EVENT_CREATE_FAILED",
        payload: error.response.data, // Send the entire error data for detailed information
      });
    } else if (error.request) {
      console.error("Error request:", error.request);
      dispatch({
        type: "EVENT_CREATE_FAILED",
        payload: "No response received from server.",
      });
    } else {
      console.error("Error message:", error.message);
      dispatch({
        type: "EVENT_CREATE_FAILED",
        payload: error.message,
      });
    }
  }
};

// Fetch a single event by ID action
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/event/${id}/`
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
