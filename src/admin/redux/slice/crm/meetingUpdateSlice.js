import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const BASE_URL = "http://127.0.0.1:8000/api/meeting-update/";

// Async thunk for searching meeting updates
export const searchMeetingUpdate = createAsyncThunk(
  "meetingupdate/searchMeetingUpdate",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/?search=${searchTerm}`);
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);


export const fetchMeetingUpdate = createAsyncThunk(
  "meetingupdates/fetchMeetingUpdate",
  async (eventId, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/meeting-update/list/${eventId}/`);
      // , {
        // params: { event_id: eventId }, // Pass event_id as a filter
      // });

      console.log("API Response:", response.data); // Debugging

      return response.data?.result || []; // Ensure it always returns an array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);





export const createMeetingUpdate = createAsyncThunk(
  'meetingUpdate/createMeetingUpdate',
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      if (!eventId) {
        throw new Error('eventId is required and cannot be undefined.');
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/meeting-update/create/${eventId}/`,
        formData
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response from the server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


// // Add a New Meeting Update
// export const createMeetingUpdate = createAsyncThunk(
//   "meetingUpdate/createMeetingUpdate",
//   async ({ eventId, updateText }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/api/meeting-update/${eventId}/`,
//         { update_text: updateText }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Server error");
//     }
//   }
// );
// Async thunk for fetching a single meeting update by ID
export const fetchMeetingUpdateById = createAsyncThunk(
  "meetingupdate/fetchMeetingUpdateById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/`);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch by ID failed");
    }
  }
);

// Async thunk for updating a meeting update
export const updateMeetingUpdate = createAsyncThunk(
  "meetingupdate/updateMeetingUpdate",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}/`, data);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Async thunk for deleting a meeting update
export const deleteMeetingUpdate = createAsyncThunk(
  "meetingupdate/deleteMeetingUpdate",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
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
  },
  reducers: {
    createMeetingUpdate(state, action) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(fetchMeetingUpdate.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   if (Array.isArray(action.payload)) {
      //     state.list = action.payload; // Ensure action.payload is an array
      //   } else {
      //     console.error("Fetched data is not an array:", action.payload);
      //     state.list = []; // Reset to an empty array if the data is invalid
      //   }
      // // })
      // .addCase(fetchMeetingUpdate.fulfilled, (state, action) => {
      //   console.log('Fetched meeting updates:', action.payload); // Log for debugging
      //   state.isLoading = false;
      //   state.list = Array.isArray(action.payload) ? action.payload : []; // Ensure it's an array
      // })

      .addCase(fetchMeetingUpdate.fulfilled, (state, action) => {
        console.log('Fetched meeting updates:', action.payload); // Log for debugging
        state.isLoading = false;
        state.list = Array.isArray(action.payload) ? action.payload : []; // Ensure it's an array
      })

      .addCase(fetchMeetingUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createMeetingUpdate.fulfilled, (state, action) => {
        console.log("action.payload", action.payload); // Log to inspect payload
        if (Array.isArray(state.list)) {
          state.list.push(action.payload); // Ensure you're pushing to an array
        } else {
          console.error("State list is not an array!");
          state.list = [action.payload]; // Reinitialize state.list if needed
        }
        state.createStatus = 'succeeded';
      })
      // .addCase(createMeetingUpdate.fulfilled, (state, action) => {
      //   console.log("action.payload", action.payload); // Log the payload to make sure it's valid
      //   if (Array.isArray(state.list)) {
      //     state.list.push(action.payload); // Ensure you're pushing to an array
      //   } else {
      //     console.error("State list is not an array!");
      //   }
      //   state.createStatus = 'succeeded';
      // })
      .addCase(createMeetingUpdate.rejected, (state, action) => {
        // state.createStatus = "failed";
        state.error = action.payload;
      })
      .addCase(updateMeetingUpdate.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) {
          state.list[index] = action.payload;
        }
        state.updateStatus = 'succeeded';
      })
      .addCase(updateMeetingUpdate.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(deleteMeetingUpdate.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteMeetingUpdate.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

// export const { createMeetingUpdate } = meetingUpdateSlice.actions;
export default meetingUpdateSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// // search
// export const searchMeetingUpdate = createAsyncThunk(
//   "meetingupdate/searchMeetingUpdate",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/meeting-update/?search=${searchTerm}`
//     );
//     return response.data.result.data;
//   }
// );
// // Fetch all"formDatas action
// export const fetchMeetingUpdate = createAsyncThunk(
//   "meetingupdate/fetchMeetingUpdate",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/meeting-update/list/"
//       );
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createMeetingUpdate = createAsyncThunk(
//   "meetingupdate/createMeetingUpdate",
//   async (meetingupdate, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/meeting-update/create/",
//         meetingupdate
//       );
//       const data = response.data?.result?.data;
//       if (!data) {
//         console.error("Invalid API response:", response.data);
//         throw new Error("Failed to fetch valid meetingupdate.");
//       }
//       return data;
//     } catch (error) {
//       console.error("API Error:", error.response || error);
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// // Fetch a single meetingupdate by ID action
// export const fetchMeetingUpdateById = createAsyncThunk(
//   "formData/fetchMeetingUpdateById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/meeting-update/${id}/`
//       );
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
// // // Update formData
// export const updateMeetingUpdate = createAsyncThunk(
//   "formData/updateMeetingUpdate",
//   async ({ id, name }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/meeting-update/update/${id}/`,
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

// export const deleteMeetingUpdate = createAsyncThunk(
//   "formData/deleteMeetingUpdate",
//   async (id, thunkAPI) => {
//     try {
//       // Make sure this URL is correct
//       await axios.delete(
//         `http://127.0.0.1:8000/api/meeting-update/delete/${id}/`
//       );
//       return id; // Return the ID of the deleted formData
//     } catch (error) {
//       // Log the entire error to understand its structure
//       console.error("Delete request failed:", error);

//       // Return a more descriptive error message
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "An unknown error occurred"
//       );
//     }
//   }
// );

// const meetingUpdateSlice = createSlice({
//   name: "meetingupdates",
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,
//     currentMeetingUpdate: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   reducers: {
//     addMeetingUpdate(state, action) {
//       state.list.push(action.payload); // Correctly push to the `list` array
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMeetingUpdate.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchMeetingUpdate.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchMeetingUpdate.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchMeetingUpdateById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentMeetingUpdate = action.payload;

//         if (!state.list) state.list = []; // Ensure list is initialized

//         const index = state.list.findIndex(
//           (meetingupdate) => meetingupdate.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         } else {
//           state.list.push(action.payload);
//         }
//       })
//       .addCase(createMeetingUpdate.fulfilled, (state, action) => {
//         if (!state.list) state.list = []; // Fallback initialization
//         state.list.push(action.payload);
//         state.createStatus = "succeeded";
//       })

//       .addCase(updateMeetingUpdate.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.payload;
//       })
//       // Delete formData
//       .addCase(deleteMeetingUpdate.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteMeetingUpdate.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (meetingupdate) => meetingupdate.id !== action.payload
//         );
//       })
//       .addCase(deleteMeetingUpdate.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || "Failed to delete formData";
//       })
//       // search MusearchmeetingUpdatename
//       .addCase(searchMeetingUpdate.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(searchMeetingUpdate.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(searchMeetingUpdate.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });
// export default meetingUpdateSlice.reducer;
