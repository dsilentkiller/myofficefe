// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Search for attendee
// export const searchAttendee = createAsyncThunk(
//   "attendee/searchAttendee",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/attendee/?search=${searchTerm}`
//     );
//     return response.data.result.data;
//   }
// );

// // Fetch all attendees
// export const fetchAttendee = createAsyncThunk(
//   "attendee/fetchAttendee",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/attendee/");
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create a new attendee
// export const createAttendee = createAsyncThunk(
//   "attendee/createAttendee",
//   async (attendee, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/attendee/create/",
//         attendee
//       );
//       if (response.status === 201) {
//         return response.data.result.data;
//       } else {
//         return thunkAPI.rejectWithValue("Failed to create attendee.");
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Fetch a single attendee by ID
// export const fetchAttendeeById = createAsyncThunk(
//   "attendee/fetchAttendeeById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/attendee/${id}/`
//       );
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // Update an attendee
// export const updateAttendee = createAsyncThunk(
//   "attendee/updateAttendee",
//   async ({ id, name }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/attendee/update/${id}/`,
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

// // Delete an attendee
// export const deleteAttendee = createAsyncThunk(
//   "attendee/deleteAttendee",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/attendee/delete/${id}/`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "An unknown error occurred"
//       );
//     }
//   }
// );

// const attendeeSlice = createSlice({
//   name: "attendee",
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     success: false,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,
//     currentAttendee: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   reducers: {
//     resetStatus: (state) => {
//       state.isLoading = false;
//       state.error = null;
//       state.success = false;
//       state.createStatus = null;
//       state.updateStatus = null;
//       state.deleteStatus = null;
//       state.createError = null;
//       state.updateError = null;
//       state.deleteError = null;
//       state.currentAttendee = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch all attendees
//       .addCase(fetchAttendee.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAttendee.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchAttendee.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       // Fetch attendee by ID
//       .addCase(fetchAttendeeById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAttendeeById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentAttendee = action.payload;
//         const index = state.list.findIndex(
//           (attendee) => attendee.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         } else {
//           state.list.push(action.payload);
//         }
//       })
//       .addCase(fetchAttendeeById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       // Create attendee
//       .addCase(createAttendee.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createAttendee.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//         state.createStatus = "succeeded";
//         state.isLoading = false;
//       })

//       .addCase(createAttendee.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload || action.error.message; //disoly exact error coming from backend
//       })
//       // Update attendee
//       .addCase(updateAttendee.pending, (state) => {
//         state.updateStatus = "loading";
//       })
//       .addCase(updateAttendee.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded";
//         const index = state.list.findIndex((p) => p.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })
//       .addCase(updateAttendee.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.payload;
//       })
//       // Delete attendee
//       .addCase(deleteAttendee.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteAttendee.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (attendee) => attendee.id !== action.payload
//         );
//       })
//       .addCase(deleteAttendee.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || "Failed to delete attendee";
//       })
//       // Search attendee by name
//       .addCase(searchAttendee.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(searchAttendee.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(searchAttendee.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { resetStatus } = attendeeSlice.actions;
// export default attendeeSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";
// // // search
// // export const searchAttendee = createAsyncThunk(
// //   "attendee/searchAttendee",
// //   async (searchTerm) => {
// //     const response = await axios.get(
// //       `http://127.0.0.1:8000/api/crm/attendee/?search=${searchTerm}`
// //     );
// //     return response.data.result.data;
// //   }
// // );
// // // Fetch all"attendee action
// // export const fetchAttendee = createAsyncThunk(
// //   "attendee/fetchAttendee",
// //   async (_, thunkAPI) => {
// //     try {
// //       const response = await axios.get("http://127.0.0.1:8000/api/attendee/");
// //       return response.data.result.data; // Adjust this based on your actual API response structure
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );
// // // export const createAttendee = createAsyncThunk(
// // //   "attendee/createAttendee",
// // //   async (attendeeData, thunkAPI) => {
// // //     try {
// // //       const response = await axios.post(
// // //         "http://127.0.0.1:8000/api/crm/attendee/create/",
// // //         attendeeData
// // //       );
// // //       return response.data.result.data; // Adjust this based on your actual API response structure
// // //     } catch (error) {
// // //       return thunkAPI.rejectWithValue(error.response.result.data);
// // //     }
// // //   }
// // // );

// // export const createAttendee = createAsyncThunk(
// //   "attendee/createAttendee",
// //   async (attendee, thunkAPI) => {
// //     try {
// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/api/attendee/create/",
// //         attendee
// //       );
// //       if (response.status === 201) {
// //         // Ensure it's a successful creation response
// //         return response.data.result.data;
// //       } else {
// //         return thunkAPI.rejectWithValue("Failed to create attendee.");
// //       }
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );
// // // Fetch a single attendee by ID action
// // export const fetchAttendeeById = createAsyncThunk(
// //   "attendee/fetchAttendeeById",
// //   async (id, thunkAPI) => {
// //     try {
// //       const response = await axios.get(
// //         `http://127.0.0.1:8000/api/attendee/${id}/`
// //       );
// //       return response.data.result.data; // Adjust this based on your actual API response structure
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );
// // // // Update attendee
// // export const updateAttendee = createAsyncThunk(
// //   "attendee/updateAttendee",
// //   async ({ id, name }, thunkAPI) => {
// //     try {
// //       const response = await axios.put(
// //         `http://127.0.0.1:8000/api/crm/attendee/update/${id}/`,
// //         { name }
// //       );
// //       return response.data.result.data;
// //     } catch (error) {
// //       const message =
// //         error.response?.data?.message || error.message || "An error occurred";
// //       return thunkAPI.rejectWithValue(message);
// //     }
// //   }
// // );

// // export const deleteAttendee = createAsyncThunk(
// //   "attendee/deleteAttendee",
// //   async (id, thunkAPI) => {
// //     try {
// //       // Make sure this URL is correct
// //       await axios.delete(
// //         `http://127.0.0.1:8000/api/crm/attendee/delete/${id}/`
// //       );
// //       return id; // Return the ID of the deleted attendee
// //     } catch (error) {
// //       // Log the entire error to understand its structure
// //       console.error("Delete request failed:", error);

// //       // Return a more descriptive error message
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message ||
// //           error.message ||
// //           "An unknown error occurred"
// //       );
// //     }
// //   }
// // );

// // const attendeeSlice = createSlice({
// //   name: "attendee",
// //   initialState: {
// //     list: [],
// //     isLoading: false,
// //     error: null,
// //     success:false,
// //     createStatus: null,
// //     updateStatus: null,
// //     deleteStatus: null,
// //     currentAttendee: null,
// //     createError: null,
// //     updateError: null,
// //     deleteError: null,
// //   },
// //   reducers: {
// //      resetStatus: (state) => {
// //       resetStatus: (state) => {
// //         state.isLoading = false;
// //         state.error = null;
// //         state.success = false;
// //         state.createStatus = null;
// //         state.updateStatus = null;
// //         state.deleteStatus = null;
// //         state.createError = null;
// //         state.updateError = null;
// //         state.deleteError = null;
// //         state.currentAttendee = null;
// //       }},
// //   extraReducers: (builder) => {
// //     builder
// //       // Fetch all"attendee
// //       .addCase(fetchAttendee.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchAttendee.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.list = action.payload;
// //       })
// //       .addCase(fetchAttendee.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.error.message;
// //       })
// //       // Fetch attendee by ID
// //       .addCase(fetchAttendeeById.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchAttendeeById.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.currentAttendee = action.payload;
// //         // Update or add the attendee in the list
// //         const index = state.list.findIndex(
// //           (attendee) => attendee.id === action.payload.id
// //         );
// //         if (index !== -1) {
// //           state.list[index] = action.payload;
// //         } else {
// //           state.list.push(action.payload);
// //         }
// //       })
// //       .addCase(fetchAttendeeById.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.error.message;
// //       })
// //       // Create attendee
// //       .addCase(createAttendee.pending, (state) => {
// //         state.createStatus = "loading";
// //         state.createError = null;
// //       })
// //       .addCase(createAttendee.fulfilled, (state, action) => {
// //         state.list.push(action.payload);
// //         state.createStatus = "succeeded";
// //         state.loading = false;
// //       })
// //       .addCase(createAttendee.rejected, (state, action) => {
// //         state.createStatus = "failed";
// //         state.createError = action.error.message;
// //       })
// //       // Update attendee
// //       .addCase(updateAttendee.pending, (state) => {
// //         state.updateStatus = "loading";
// //       })
// //       .addCase(updateAttendee.fulfilled, (state, action) => {
// //         state.updateStatus = "succeeded";
// //         const index = state.list.findIndex((p) => p.id === action.payload.id);
// //         if (index !== -1) {
// //           state.list[index] = action.payload;
// //         }
// //       })
// //       .addCase(updateAttendee.rejected, (state, action) => {
// //         state.updateStatus = "failed";
// //         state.updateError = action.payload;
// //       })
// //       // Delete attendee
// //       .addCase(deleteAttendee.pending, (state) => {
// //         state.deleteStatus = "loading";
// //         state.deleteError = null;
// //       })
// //       .addCase(deleteAttendee.fulfilled, (state, action) => {
// //         state.deleteStatus = "succeeded";
// //         state.list = state.list.filter(
// //           (attendee) => attendee.id !== action.payload
// //         );
// //       })
// //       .addCase(deleteAttendee.rejected, (state, action) => {
// //         state.deleteStatus = "failed";
// //         state.deleteError = action.payload || "Failed to delete attendee";
// //       })
// //       // search MusearchAttendee name
// //       .addCase(searchAttendee.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(searchAttendee.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.list = action.payload;
// //       })
// //       .addCase(searchAttendee.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.error.message;
// //       });
// //   },
// // },);
// // export const { resetStatus } = attendeeSlice.actions;
// // export default attendeeSlice.reducer;
