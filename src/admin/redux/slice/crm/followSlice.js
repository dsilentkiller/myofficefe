import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all follows action
export const fetchFollows = createAsyncThunk(
  "follows/fetchFollows",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/followup/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a follow action
export const createFollow = createAsyncThunk(
  "follows/createFollow",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/followup/create/",
        formData
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Check for duplicate follow
export const checkDuplicateFollow = createAsyncThunk(
  "follows/checkDuplicateFollow",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/followup/check-duplicate/",
        formData
      ); // ✅ Use POST, not GET
      return response.data.exists;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// export const checkDuplicateFollow = createAsyncThunk(
//   "follows/checkDuplicateFollow",
//   async (formData, thunkAPI) => {
//     try {
//       const API_BASE_URL =
//         process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

//       // Send only necessary fields
//       const validParams = {
//         vendor: formData.vendor,
//         enquiry_id: formData.enquiry_id,
//         follow_by: formData.follow_by,
//       };

//       console.log("Sending request with params:", validParams);

//       const response = await axios.get(
//         `${API_BASE_URL}/api/followup/check-duplicate/`,
//         {
//           params: validParams,
//         }
//       );

//       console.log("API Response:", response.data);

//       return response.data?.exists ?? false;
//     } catch (error) {
//       console.error("API Error Response:", error.response?.data);

//       let errorMessage = "An unknown error occurred";

//       if (error.response) {
//         errorMessage = error.response.data?.error
//           ? error.response.data.error
//           : JSON.stringify(error.response.data);
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

export const fetchFollowById = createAsyncThunk(
  "follows/fetchFollowById",
  async ({ enquiryId, id }, thunkAPI) => {
    // Destructure enquiryId and id from the payload object
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/followup/?enquiry_id=${enquiryId}` // Assuming this returns an array of follow-ups
      );

      // Filter the array to find the follow-up by its ID
      const followUp = response.data.result.find(
        (follow) => follow.id === parseInt(id)
      );

      if (followUp) {
        return followUp;
      } else {
        return thunkAPI.rejectWithValue("Follow-up not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const fetchFollowById = createAsyncThunk(
//   "follows/fetchFollowById",
//   async (enquiryId, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/followup/?enquiry_id=${enquiryId}`
//       );
//       console.log("API Response:", response.data); // Log API response for
//       return response.data.result; // Adjust based on your API's response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Update follow by ID
export const updateFollowById = createAsyncThunk(
  "follows/updateFollowById",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/followup/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated follow data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete follow
export const deleteFollow = createAsyncThunk(
  "follows/deleteFollow",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/followup/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search follow
export const searchFollow = createAsyncThunk(
  "follows/searchFollow",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/followup/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Adjust the API call and remove trailing slash
// Define the asynchronous thunk action
export const FollowupByEnquiryId = createAsyncThunk(
  "followup/fetchByEnquiryId",
  async (enquiryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // `http://127.0.0.1:8000/api/followup/followup-by-enquiry-id/?enquiryId=${enquiryId}/`
        `http://127.0.0.1:8000/api/followup/followup-by-enquiry-id/?${enquiryId}/`
      );
      console.log("API Response:", response.data); // Log API response for
      return response.data.result; // Return the follow-ups directly
    } catch (error) {
      console.error("Error fetching follow-ups:", error);
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);
// Redux slice
const followSlice = createSlice({
  name: "follows",
  initialState: {
    list: [],
    status: "idle",
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentFollow: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    setFollows: (state, action) => {
      state.followups = action.payload; // Store the follow-up data
      state.loading = false;
      state.error = null;
    },
    // setFollows(state, action) {
    //   state.list = action.payload;
    // },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCurrentFollow(state, action) {
      state.currentFollow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch follows
      .addCase(fetchFollows.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFollows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchFollows.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.payload;
      })
      // Check for duplicate follow
      // .addCase(checkDuplicateFollow.pending, (state) => {
      //   state.duplicateCheck = null; // Reset on new request
      // })
      // .addCase(checkDuplicateFollow.fulfilled, (state, action) => {
      //   state.duplicateCheck = action.payload; // Boolean: true or false
      // })
      // .addCase(checkDuplicateFollow.rejected, (state, action) => {
      //   state.duplicateCheck = false; // Treat errors as no duplicates
      //   state.error = action.payload;
      // })

      // Fetch follow by ID
      .addCase(fetchFollowById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(fetchFollowById.fulfilled, (state, action) => {
      //   console.log("Fetched Follow-up Data:", action.payload); // Log the received data
      //   if (action.payload) {
      //     state.currentFollow = action.payload; // Correctly update the state with the fetched follow-up data
      //   } else {
      //     state.currentFollow = null; // If no data is returned, set currentFollow to null
      //   }
      //   state.isLoading = false; // Stop loading
      // })
      // .addCase(fetchFollowById.fulfilled, (state, action) => {
      //   console.log("Follow-up data received:", action.payload); // Log to verify the response
      //   // Assuming action.payload is an array, filter for the specific follow-up
      //   state.currentFollow = action.payload.find(follow => follow.id === action.meta.arg); // Make sure only one follow-up is set
      //   state.isLoading = false;
      // })
      // In the slice, inside extraReducers:
      .addCase(fetchFollowById.fulfilled, (state, action) => {
        console.log("Follow-up data received:", action.payload); // Check the response data
        if (action.payload) {
          state.currentFollow = action.payload; // Store the single follow-up in currentFollow
        } else {
          state.currentFollow = null; // Ensure it's null if no data is found
        }
        state.isLoading = false;
      })

      .addCase(fetchFollowById.rejected, (state, action) => {
        state.isLoading = false;
        state.currentFollow = null;
        state.error = action.payload;
      })
      // Update follow by ID
      .addCase(updateFollowById.fulfilled, (state, action) => {
        const updatedFollow = action.payload;
        const index = state.list.findIndex(
          (follow) => follow.id === updatedFollow.id
        );
        if (index !== -1) {
          state.list[index] = updatedFollow;
        }
        if (state.currentFollow?.id === updatedFollow.id) {
          state.currentFollow = updatedFollow;
        }
      })
      .addCase(updateFollowById.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Create follow
      .addCase(createFollow.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createFollow.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createFollow.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      // Delete follow
      .addCase(deleteFollow.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteFollow.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (follow) => follow.id !== action.payload
        );
      })
      .addCase(deleteFollow.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })
      // Search follow
      .addCase(searchFollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFollow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchFollow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //followbyenquiryid
      .addCase(FollowupByEnquiryId.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(FollowupByEnquiryId.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded"; // Update status to succeeded
        state.list = action.payload; // Set the follow-ups
      })
      .addCase(FollowupByEnquiryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export const { setFollows, setLoading, setError, setCurrentFollow } =
  followSlice.actions;
export default followSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all follows action
// export const fetchFollows = createAsyncThunk(
//   "follows/fetchFollows",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/followup/");
//       console.log(response.data);
//       return response.data.result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Create a follow action
// export const createFollow = createAsyncThunk(
//   "follow/create",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/followup/create/",
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// // detail id wise
// export const fetchFollowsById = createAsyncThunk(
//   "follows/fetchFollowsById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/followup/detail/${id}/`
//       );
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// //updatefollwbyid to update
// export const updateFollowByIdById = createAsyncThunk(
//   "follows/updateFollowByIdById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/followup/update/${id}/`
//       );
//       return response.data.result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Update follow Status
// // export const updateFollowByIdStatus = createAsyncThunk(
// //   "follows/updateStatus",
// //   async ({ id, status }) => {
// //     const response = await axios.put(
// //       `http://127.0.0.1:8000/api/followup/${id}/`,
// //       { status }
// //     );
// //     return response.data.result;
// //   }
// // );

// // export const updateFollowById = createAsyncThunk(
// //   "follows/updateFollowById",
// //   async ({ id, ...data }, thunkAPI) => {
// //     try {
// //       const response = await axios.put(
// //         `http://127.0.0.1:8000/api/followup/update/${id}/`,
// //         data
// //       );
// //       return response.data.result;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // Delete follow
// export const deleteFollow = createAsyncThunk(
//   "follows/deleteFollow",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/followup/delete/${id}/`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Search follow action
// export const searchFollow = createAsyncThunk(
//   "follows/searchFollow",
//   async (searchTerm, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/followup/?search=${searchTerm}`
//       );
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Redux slice
// const followSlice = createSlice({
//   name: "follows",
//   initialState: {
//     list: [],
//     loading: false,

//     isLoading: false,
//     error: null,
//     createStatus: null,
//     // updateStatus: null,
//     deleteStatus: null,
//     currentFollow: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//     fetchError: null,
//   },
//   reducers: {
//     fetchFollowsByIdSuccess: (state, action) => {
//       state.currentFollow = action.payload;
//     },
//     setCurrentFollow(state, action) {
//       state.currentFollow = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
// // Fetch follows
// .addCase(fetchFollows.pending, (state) => {
//   state.isLoading = true;
//   state.error = null;
// })
// .addCase(fetchFollows.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.list = action.payload;
// })
// .addCase(fetchFollows.rejected, (state, action) => {
//   state.isLoading = false;
//   state.fetchError = action.payload;
// })
//       // Fetch follow by ID
//       .addCase(fetchFollowsById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchFollowsById.fulfilled, (state, action) => {
//         console.log("Updated currentFollow:", action.payload); // Log the updated follow data
//         state.loading = false;
//         state.currentFollow = action.payload;
//       })
//       .addCase(fetchFollowsById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.currentFollow = null;
//         state.fetchError = action.error.message;
//       })
//       // update follow by id
//       .addCase(updateFollowByIdById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateFollowByIdById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentFollow = action.payload;
//       })
//       .addCase(updateFollowByIdById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.currentFollow = null;
//         state.fetchError = action.error.message;
//       })
//       // .addCase(updateFollowByIdStatus.fulfilled, (state, action) => {
//       //   const updatedFollow = action.payload;
//       //   const index = state.list.findIndex(
//       //     (follow) => follow.id === updatedFollow.id
//       //   );
//       //   if (index !== -1) {
//       //     state.list[index] = updatedFollow;
//       //   }
//       //   if (state.currentFollow?.id === updatedFollow.id) {
//       //     state.currentFollow = updatedFollow;
//       //   }
//       // })
//       // create follow
//       .addCase(createFollow.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createFollow.fulfilled, (state, action) => {
//         state.createStatus = "succeeded";
//         state.list.push(action.payload);
//       })
//       .addCase(createFollow.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload;
//         console.error("Create Follow Error:", action.payload);
//       })
//       // .addCase(updateFollowById.fulfilled, (state, action) => {
//       //   const updatedFollow = action.payload;
//       //   if (!updatedFollow || !updatedFollow.id) return;

//       //   const index = state.list.findIndex(
//       //     (follow) => follow.id === updatedFollow.id
//       //   );
//       //   if (index !== -1) {
//       //     state.list[index] = updatedFollow;
//       //   }

//       //   if (state.currentFollow?.id === updatedFollow.id) {
//       //     state.currentFollow = updatedFollow;
//       //   }
//       // })
//       // .addCase(updateFollowById.rejected, (state, action) => {
//       //   state.updateStatus = "failed";
//       //   state.updateError = action.payload || "Failed to update follow";
//       // })
//       // Delete follow
//       .addCase(deleteFollow.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteFollow.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (follow) => follow.id !== action.payload
//         );
//       })
//       .addCase(deleteFollow.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || "Failed to delete follow";
//       })
//       // Search follow
//       .addCase(searchFollow.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(searchFollow.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(searchFollow.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default followSlice.reducer;
