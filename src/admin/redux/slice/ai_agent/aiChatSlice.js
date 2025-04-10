import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API Base URL (Update if needed)
const API_URL = "http://localhost:8000/api/ai/chat/";

// Async Thunk to send user query to AI API
export const fetchAIResponse = createAsyncThunk(
  "aiChat/fetchAIResponse",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { query },{
        headers:{
          'Content-Type':"application/json",

        },
      });
      return response.data.result.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || "AI service error");
    }
  }
);

// Create AI Chat Slice
const aiChatSlice = createSlice({
  name: "aiChat",
  initialState: {
    message: "",
    response: "",
    loading: false,
    error: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        state.response = "";
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setMessage } = aiChatSlice.actions;
export default aiChatSlice.reducer;
