import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Add this action to your enquiry slice to remove the enquiry from the list
// export const removeEnquiryFromList = (state, action) => {
//   state.enquiries = state.enquiries.filter(enquiry => enquiry.id !== action.payload.id);
// };
// Async thunk to convert enquiry to customer
export const convertToCustomer = createAsyncThunk(
  "enquiry/convertToCustomer",
  async (enquiryId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enquiry/convert_enquiry_to_customer/${enquiryId}/`,
        {},
        // {
        //   headers: {
        //     // Authorization: `Bearer ${yourAuthToken}`
        //   }
        // }
        )

      if (response.status === 201) {
        return response.data; // Return success data
      } else {
        return rejectWithValue("Failed to convert enquiry to customer.");
      }
    } catch (error) {
      return rejectWithValue("Error converting enquiry to customer.");
    }
  }
);



// Search Enquiries
export const searchEnquiry = createAsyncThunk(
  "enquiry/searchEnquiry",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/enquiry/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);

// Fetch all enquiries
export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetchEnquiries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/enquiry/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create Enquiry
export const createEnquiry = createAsyncThunk(
  "enquiries/createEnquiry",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/enquiry/create/",
        formData
      );
      return response.data.result.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const updateEnquiry = createAsyncThunk(
  "enquiries/updateEnquiry",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
      { status }
    );
    return response.data.result;
  }
);

// Fetch enquiry by ID update
export const fetchEnquiryByIdUpdate = createAsyncThunk(
  "enquiries/fetchEnquiryByIdUpdate",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/update/${id}/`
      );
      return response.data.result.data; // Make sure this matches your actual response structure
    } catch (error) {
      console.error("Error fetching enquiry by ID update:", error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch enquiry by ID
// Fetch enquiry by ID
export const fetchEnquiryById = createAsyncThunk(
  "enquiries/fetchEnquiryById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/detail/${id}/`
      );
      console.log("API Response:", response.data); // Log to check the structure of the response
      return response.data; // Ensure this is the correct path
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateEnquiryStatus = createAsyncThunk(
  "enquiries/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
      { status }
    );
    return response.data.result;
  }
);

// Delete Enquiry
export const deleteEnquiry = createAsyncThunk(
  "enquiries/deleteEnquiry",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/enquiry/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "enquiry/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/enquiry/category/"
    );
    return response.data.result;
  }
);
// Fetch Lost Enquiries
export const fetchLostEnquiries = createAsyncThunk(
  "enquiries/fetchLostEnquiries",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/enquiry/lost/"
    );
    return response.data.result;
  }
);

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: {
    list: [], // Initialize list as an empty array
    lostEnquiries: [], // Lost inquiries
    loading: false,
    error: null,
    selectedEnquiry: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentEnquiry: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    // removeEnquiryFromList,
    setCurrentEnquiry(state, action) {
      state.currentEnquiry = action.payload;
    },
    fetchEnquiryByIdSuccess: (state, action) => {
      state.currentEnquiry = action.payload; // This should update the currentProject
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(convertToCustomer.pending, (state) => {
      state.status = "loading";
    })
  //   .addCase(convertToCustomer.fulfilled, (state, action) => {
  //     state.status = "succeeded";
  //     // Assuming you store customers in the state, add the new customer
  //     state.customers.push(action.payload); // Add the customer to the customers list
  //      // Assuming the API returns a `customerId` and `enquiryId`:
  // if (action.payload.enquiryId) {
  //   state.list = state.list.filter((enquiry) => enquiry.id !== action.payload.enquiryId); // Remove the converted enquiry
  // }
  //   })
  .addCase(convertToCustomer.fulfilled, (state, action) => {
    state.status = "succeeded";
    // If conversion is successful, add customer and remove enquiry from list
    if (action.payload.enquiry_id) {
      // Remove the converted enquiry from the list
      state.list = state.list.filter((enquiry) => enquiry.id !== action.payload.enquiry_id);
      // Add customer to the customer list
      state.customers.push({
        id: action.payload.customer_id,
        ...action.payload.customer_data, // Assuming customer data is part of the payload
      });

      // Show a success toast message
      state.toastMessage = `Enquiry ${action.payload.enquiry_id} successfully converted to Customer.`;
    }
  })

    .addCase(convertToCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
      // Fetch all enquiries
      .addCase(fetchEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Ensure list is an array
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Fetch enquiry by ID update (only one should be here)
      .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
        console.log("Fetched Enquiry Data:", action.payload);
        state.currentEnquiry = action.payload;
        state.selectedEnquiry = action.payload; // Keep if necessary
        state.loading = false;
    })

      .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
        state.loading = false;
        state.currentEnquiry = null;
        state.fetchError = action.error.message;
      })

      // Fetch enquiry by ID
      .addCase(fetchEnquiryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiryById.fulfilled, (state, action) => {

        console.log("Fetched Enquiry:", action.payload); // Log to confirm if the data is coming through
        state.loading = false;
        state.selectedEnquiry = action.payload || {}; // Store the enquiry details
      })
      .addCase(fetchEnquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // lost enquiry status
      // Inside your extraReducers (reducers for async thunks) in the slice:
          .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
            const updatedEnquiry = action.payload;

            // Update the main list with the updated enquiry
            state.list = state.list.filter((enquiry) =>
              enquiry.id === updatedEnquiry.id ? updatedEnquiry : enquiry
            );

            // If the enquiry is marked as "lost", add it to the lost enquiries list
            if (updatedEnquiry.status === "lost") {
              state.lostEnquiries.push(updatedEnquiry); // Add it to lost enquiries
            }

            // // Optionally, if the current enquiry matches the updated enquiry, update it too
            // if (state.currentEnquiry?.id === updatedEnquiry.id) {
            //   state.currentEnquiry = updatedEnquiry;
            // }
          })

      // Create Enquiry
      .addCase(createEnquiry.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      })

      // Delete Enquiry
      .addCase(deleteEnquiry.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (enquiry) => enquiry.id !== action.payload
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      })
        // Update Enquiry
      .addCase(updateEnquiry.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex(
          (enquiry) => enquiry.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      })


      // Search Enquiries
      .addCase(searchEnquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Ensure the list is an array
      })
      .addCase(searchEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
       // Fetch Lost Enquiries
       .addCase(fetchLostEnquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLostEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.lostEnquiries = action.payload || [];  // Store lost enquiries
      })
      .addCase(fetchLostEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export const { setCurrentEnquiry, setEnquiry, setLoading, setError } = enquirySlice.actions;

export default enquirySlice.reducer;






// const enquirySlice = createSlice({
//   name: "enquiries",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//     selectedEnquiry: null,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,
//     currentEnquiry: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   reducers: {
//     setCurrentEnquiry(state, action) {
//       state.currentEnquiry = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch all enquiries
//       .addCase(fetchEnquiries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEnquiries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || [];
//       })
//       .addCase(fetchEnquiries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // Fetch enquiry by ID
//       .addCase(fetchEnquiryById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchEnquiryById.fulfilled, (state, action) => {
//         state.currentEnquiry = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchEnquiryById.rejected, (state, action) => {
//         state.loading = false;
//         state.fetchError = action.error.message;
//       })

//       // Fetch enquiry by ID update (FIXED: Removed duplicate cases)
//       .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
//         state.currentEnquiry = action.payload;
//         state.selectedEnquiry = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
//         state.loading = false;
//         state.currentEnquiry = null;
//         state.fetchError = action.error.message;
//       })

//       // Update Status
//       .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
//         const updatedEnquiry = action.payload;
//         state.list = state.list.map((enquiry) =>
//           enquiry.id === updatedEnquiry.id ? updatedEnquiry : enquiry
//         );
//         if (state.currentEnquiry.id === updatedEnquiry.id) {
//           state.currentEnquiry = updatedEnquiry;
//         }
//       })

//       // Create Enquiry
//       .addCase(createEnquiry.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createEnquiry.fulfilled, (state, action) => {
//         state.createStatus = "succeeded";
//         state.list.push(action.payload);
//       })
//       .addCase(createEnquiry.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload || action.error.message;
//       })

//       // Delete Enquiry
//       .addCase(deleteEnquiry.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteEnquiry.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (enquiry) => enquiry.id !== action.payload
//         );
//       })
//       .addCase(deleteEnquiry.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || action.error.message;
//       })

//       // Search Enquiries
//       .addCase(searchEnquiry.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchEnquiry.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || [];
//       })
//       .addCase(searchEnquiry.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export const { setCurrentEnquiry } = enquirySlice.actions;
// export default enquirySlice.reducer;














// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// // import { createSelector } from "reselect";


// // Search Enquiries
// export const searchEnquiry = createAsyncThunk(
//   "enquiry/searchEnquiry",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/enquiry/?search=${searchTerm}`
//     );
//     return response.data.result.data;
//   }
// );

// // Fetch all enquiries
// export const fetchEnquiries = createAsyncThunk(
//   "enquiries/fetchEnquiries",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/enquiry/");
//       return response.data.result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create Enquiry
// // Create Enquiry (improved error handling)
// export const createEnquiry = createAsyncThunk(
//   "enquiries/createEnquiry",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/enquiry/create/",
//         formData
//       );
//       return response.data.result.data || [];
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );
// // fetch enquiry by id upodate
// export const fetchEnquiryByIdUpdate = createAsyncThunk(
//   "enquiries/fetchEnquiryByIdUpdate",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/enquiry/update/${id}/`
//       );
//       return response.data.result; // Make sure this matches your actual response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
// export const fetchEnquiryById = createAsyncThunk(
//   "enquiries/fetchEnquiryById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/enquiry/detail/${id}/`
//       );
//       return response.data.result; // Make sure the API returns the correct structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Update Project Status
// export const updateEnquiryStatus = createAsyncThunk(
//   "enquiries/updateStatus",
//   async ({ id, status }) => {
//     const response = await axios.put(
//       `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
//       { status }
//     );
//     return response.data.result;
//   }
// );

// // Update Enquiry
// // export const updateEnquiry = createAsyncThunk(
// //   "enquiries/updateEnquiry",
// //   async ({ id, ...data }, thunkAPI) => {
// //     try {
// //       const response = await axios.put(
// //         `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
// //         data
// //       );
// //       return response.data.result.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // Delete Enquiry
// export const deleteEnquiry = createAsyncThunk(
//   "enquiries/deleteEnquiry",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/enquiry/delete/${id}/`);
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
// export const fetchCategories = createAsyncThunk(
//   "enquiry/fetchCategories",
//   async () => {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/enquiry/category/"
//     );
//     return response.data.result;
//   }
// );

// const enquirySlice = createSlice({
//   name: "enquiries",
//   initialState: {
//     list: [], // Initialize list as an empty array
//     loading: false,
//     error: null,
//     selectedEnquiry: null,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,
//     currentEnquiry: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   reducers: {
//     setCurrentEnquiry(state, action) {
//       state.currentEnquiry = action.payload;
//     },
//     fetchEnquiryByIdSuccess: (state, action) => {
//       state.currentEnquiry = action.payload; // This should update the currentProject
//     },
//     // setCurrentEnquiry(state, action) {
//     //   state.currentEnquiry = action.payload;
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch all enquiries
//       .addCase(fetchEnquiries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEnquiries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || []; // Ensure list is an array
//       })
//       .addCase(fetchEnquiries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       // Fetch enquiry by ID update

//       .addCase(fetchEnquiryById.pending, (state) => {
//         state.status = "loading";
//       })

//       .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
//         state.currentEnquiry = action.payload;
//         state.selectedEnquiry = action.payload;
//         state.loading = false;
//     })
//     .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
//         state.loading = false;
//         state.currentEnquiry = null;
//         state.fetchError = action.error.message;
//     })

//       // Fetch enquiry by ID update
//       .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
//         state.currentEnquiry = action.payload;
//         state.loading = false;

//         state.selectedEnquiry = action.payload;
//       })
//       .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
//         state.loading = false;
//         state.currentEnquiry = null;
//         state.fetchError = action.error.message;
//       })

//       .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
//         const updatedEnquiry = action.payload;
//         state.list = state.list.map((enquiry) =>
//           enquiry.id === updatedEnquiry.id ? updatedEnquiry : enquiry
//         );
//         if (state.currentEnquiry.id === updatedEnquiry.id) {
//           state.currentEnquiry = updatedEnquiry;
//         }
//       })

//       // Create Enquiry
//       .addCase(createEnquiry.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createEnquiry.fulfilled, (state, action) => {
//         state.createStatus = "succeeded";
//         state.list.push(action.payload);
//       })
//       .addCase(createEnquiry.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload || action.error.message;
//       })

//       // Update Enquiry
//       // .addCase(updateEnquiry.pending, (state) => {
//       //   state.updateStatus = "loading";
//       // })
//       // .addCase(updateEnquiry.fulfilled, (state, action) => {
//       //   state.updateStatus = "succeeded";
//       //   const index = state.list.findIndex(
//       //     (enquiry) => enquiry.id === action.payload.id
//       //   );
//       //   if (index !== -1) {
//       //     state.list[index] = action.payload;
//       //   }
//       // })
//       // .addCase(updateEnquiry.rejected, (state, action) => {
//       //   state.updateStatus = "failed";
//       //   state.updateError = action.payload || action.error.message;
//       // })

//       // Delete Enquiry
//       .addCase(deleteEnquiry.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteEnquiry.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (enquiry) => enquiry.id !== action.payload
//         );
//       })
//       .addCase(deleteEnquiry.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || action.error.message;
//       })

//       // Search Enquiries
//       .addCase(searchEnquiry.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchEnquiry.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || []; // Ensure the list is an array
//       })
//       .addCase(searchEnquiry.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });
// export const {setCurrentEnquiry ,setEnquiry, setLoading, setError } = enquirySlice.actions;
// export default enquirySlice.reducer;
