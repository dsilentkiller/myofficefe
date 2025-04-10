import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to convert enquiry to customer
export const convertToCustomer = createAsyncThunk(
  "enquiry/convertToCustomer",
  async (enquiryId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enquiry/convert_enquiry_to_customer/${enquiryId}/`,
        {},
        {
          // headers: {
          //   Authorization: `Bearer ${}`
          // }
        }
      );

      if (response.status === 201) {
        return response.data.result; // Return success data
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
    return response.data.result;
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
      return response.data.result || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
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

// Fetch enquiry by ID update
export const fetchEnquiryByIdUpdate = createAsyncThunk(
  "enquiries/fetchEnquiryByIdUpdate",
  async ({ id, formData }, thunkAPI) => {
    try {
      // Ensure that required fields are provided
      if (
        !formData.category ||
        !formData.department ||
        !formData.designation ||
        !formData.province ||
        !formData.district
      ) {
        throw new Error("All required fields must be provided.");
      }

      // Construct the request data
      const requestData = {
        status: formData.status || "status", // Ensure this has a valid value
        category: formData.category, // Use real data from form
        department: formData.department, // Use real data from form
        designation: formData.designation, // Use real data from form
        province: formData.province, // Use real data from form
        district: formData.district, // Use real data from form
      };

      console.log("Sending Update Request with Data:", requestData);

      // Send the PUT request to update the enquiry
      const response = await axios.put(
        `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
        requestData
      );

      console.log("Update Response:", response);
      return response.data.result; // Return success data if the update is successful
    } catch (error) {
      // Log the full error message
      console.error(
        "Error fetching enquiry by ID update:",
        error.response ? error.response.data : error.message
      );

      // Check if the error is a 400 Bad Request
      if (error.response && error.response.status === 400) {
        // Log the validation error details
        console.error("Validation Errors:", error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message); // Send validation errors to Redux
      }

      // Handle other errors (network issues, server errors, etc.)
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
      return response.data.result.enquiry; // Ensure this is the correct path
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
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
    const response = await axios.get("http://127.0.0.1:8000/api/enquiry/lost/");
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
    //update enquiry
    setEnquiryToUpdate: (state, action) => {
      state.currentEnquiry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertToCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(convertToCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";

        // If conversion is successful, add customer and remove enquiry from list
        if (action.payload.enquiry_id) {
          // Remove the converted enquiry from the list
          state.list = state.list.filter(
            (enquiry) => enquiry.id !== action.payload.enquiry_id
          );
          // Ensure customers array exists
          if (!state.customers) {
            state.customers = []; // Initialize customers array if undefined
          }
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

      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Handle state update when the enquiry is updated successfully
        if (
          state.currentEnquiry &&
          state.currentEnquiry.id === action.payload.id
        ) {
          state.currentEnquiry = action.payload;
        }
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
        console.log("Fetched Enquiry Data:", action.payload);
        state.currentEnquiry = action.payload; // Set the fetched enquiry data to state
        state.status = "succeeded";
      })
      .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.currentEnquiry = null;
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
        state.enquiryToUpdate = action.payload;
      })
      .addCase(fetchEnquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.lostEnquiries = action.payload || []; // Store lost enquiries
      })
      .addCase(fetchLostEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export const { setCurrentEnquiry, setEnquiry, setLoading, setError } =
  enquirySlice.actions;

export default enquirySlice.reducer;

//problem for updating form
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to convert enquiry to customer
// export const convertToCustomer = createAsyncThunk(
//   "enquiry/convertToCustomer",
//   async (enquiryId, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/api/enquiry/convert_enquiry_to_customer/${enquiryId}/`,
//         {},
//         {
//           // headers: {
//           //   Authorization: `Bearer ${}`
//           // }
//         }
//       );

//       if (response.status === 201) {
//         return response.data.result; // Return success data
//       } else {
//         return rejectWithValue("Failed to convert enquiry to customer.");
//       }
//     } catch (error) {
//       return rejectWithValue("Error converting enquiry to customer.");
//     }
//   }
// );

// // Search Enquiries
// export const searchEnquiry = createAsyncThunk(
//   "enquiry/searchEnquiry",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/enquiry/?search=${searchTerm}`
//     );
//     return response.data.result;
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
// export const createEnquiry = createAsyncThunk(
//   "enquiries/createEnquiry",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/enquiry/create/",
//         formData
//       );
//       return response.data.result || [];
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
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

// // Fetch enquiry by ID update
// export const fetchEnquiryByIdUpdate = createAsyncThunk(
//   "enquiries/fetchEnquiryByIdUpdate",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       // Ensure that required fields are provided
//       if (
//         !formData.category ||
//         !formData.department ||
//         !formData.designation ||
//         !formData.province ||
//         !formData.district
//       ) {
//         throw new Error("All required fields must be provided.");
//       }

//       // Construct the request data
//       const requestData = {
//         status: formData.status || "status", // Ensure this has a valid value
//         category: formData.category, // Use real data from form
//         department: formData.department, // Use real data from form
//         designation: formData.designation, // Use real data from form
//         province: formData.province, // Use real data from form
//         district: formData.district, // Use real data from form
//       };

//       console.log("Sending Update Request with Data:", requestData);

//       // Send the PUT request to update the enquiry
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
//         requestData
//       );

//       console.log("Update Response:", response);
//       return response.data.result; // Return success data if the update is successful
//     } catch (error) {
//       // Log the full error message
//       console.error(
//         "Error fetching enquiry by ID update:",
//         error.response ? error.response.data : error.message
//       );

//       // Check if the error is a 400 Bad Request
//       if (error.response && error.response.status === 400) {
//         // Log the validation error details
//         console.error("Validation Errors:", error.response.data.message);
//         return thunkAPI.rejectWithValue(error.response.data.message); // Send validation errors to Redux
//       }

//       // Handle other errors (network issues, server errors, etc.)
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Fetch enquiry by ID
// // Fetch enquiry by ID
// export const fetchEnquiryById = createAsyncThunk(
//   "enquiries/fetchEnquiryById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/enquiry/detail/${id}/`
//       );
//       console.log("API Response:", response.data); // Log to check the structure of the response
//       return response.data.result.enquiry; // Ensure this is the correct path
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

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
// export const updateEnquiry = createAsyncThunk(
//   "enquiries/updateEnquiry",
//   async ({ id, status }) => {
//     const response = await axios.put(
//       `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
//       { status }
//     );
//     return response.data.result;
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
// // Fetch Lost Enquiries
// export const fetchLostEnquiries = createAsyncThunk(
//   "enquiries/fetchLostEnquiries",
//   async () => {
//     const response = await axios.get("http://127.0.0.1:8000/api/enquiry/lost/");
//     return response.data.result;
//   }
// );

// const enquirySlice = createSlice({
//   name: "enquiries",
//   initialState: {
//     list: [], // Initialize list as an empty array
//     lostEnquiries: [], // Lost inquiries
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
//     // removeEnquiryFromList,
//     setCurrentEnquiry(state, action) {
//       state.currentEnquiry = action.payload;
//     },
//     fetchEnquiryByIdSuccess: (state, action) => {
//       state.currentEnquiry = action.payload; // This should update the currentProject
//     },
//     //update enquiry
//     setEnquiryToUpdate: (state, action) => {
//       state.currentEnquiry = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(convertToCustomer.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(convertToCustomer.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         // If conversion is successful, add customer and remove enquiry from list
//         if (action.payload.enquiry_id) {
//           // Remove the converted enquiry from the list
//           state.list = state.list.filter(
//             (enquiry) => enquiry.id !== action.payload.enquiry_id
//           );
//           // Ensure customers array exists
//           if (!state.customers) {
//             state.customers = []; // Initialize customers array if undefined
//           }
//           // Add customer to the customer list
//           state.customers.push({
//             id: action.payload.customer_id,
//             ...action.payload.customer_data, // Assuming customer data is part of the payload
//           });

//           // Show a success toast message
//           state.toastMessage = `Enquiry ${action.payload.enquiry_id} successfully converted to Customer.`;
//         }
//       })

//       .addCase(convertToCustomer.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
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
//       //  .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
//       //   state.status = 'loading';
//       // })
//       // .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
//       //   state.status = 'succeeded';
//       //   state.enquiryToUpdate = action.payload; // Store updated enquiry data
//       // })
//       // .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
//       //   state.status = 'failed';
//       //   state.error = action.payload; // Capture the error
//       // })
//       // Update enquiry status
//       .addCase(updateEnquiry.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateEnquiry.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Update the status of the enquiry in the store if necessary
//         if (
//           state.enquiryToUpdate &&
//           state.enquiryToUpdate.id === action.payload.id
//         ) {
//           state.enquiryToUpdate.status = action.payload.status;
//         }
//       })
//       .addCase(updateEnquiry.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload; // Capture the error
//       })
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

//       // Fetch enquiry by ID update (only one should be here)
//       .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
//         console.log("Fetched Enquiry Data:", action.payload);
//         state.currentEnquiry = action.payload;
//         state.selectedEnquiry = action.payload; // Keep if necessary
//         state.enquiryToUpdate = action.payload;
//         state.loading = false;
//       })

//       .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
//         state.loading = false;
//         state.currentEnquiry = null;
//         state.fetchError = action.error.message;
//       })

//       // Fetch enquiry by ID
//       .addCase(fetchEnquiryById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchEnquiryById.fulfilled, (state, action) => {
//         console.log("Fetched Enquiry:", action.payload); // Log to confirm if the data is coming through
//         state.loading = false;
//         state.selectedEnquiry = action.payload || {}; // Store the enquiry details
//         state.enquiryToUpdate = action.payload;
//       })
//       .addCase(fetchEnquiryById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // lost enquiry status
//       // Inside your extraReducers (reducers for async thunks) in the slice:

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
//         state.list = action.payload || []; // Ensure the list is an array
//       })
//       .addCase(searchEnquiry.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       // Fetch Lost Enquiries
//       .addCase(fetchLostEnquiries.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLostEnquiries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lostEnquiries = action.payload || []; // Store lost enquiries
//       })
//       .addCase(fetchLostEnquiries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });
// export const { setCurrentEnquiry, setEnquiry, setLoading, setError } =
//   enquirySlice.actions;

// export default enquirySlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Add this action to your enquiry slice to remove the enquiry from the list
// // export const removeEnquiryFromList = (state, action) => {
// //   state.enquiries = state.enquiries.filter(enquiry => enquiry.id !== action.payload.id);
// // };
// // Async thunk to convert enquiry to customer
// export const convertToCustomer = createAsyncThunk(
//   "enquiry/convertToCustomer",
//   async (enquiryId, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/api/enquiry/convert_enquiry_to_customer/${enquiryId}/`,
//         {},
//         {
//           // headers: {
//           //   Authorization: `Bearer ${}`
//           // }
//         }
//       );

//       if (response.status === 201) {
//         return response.data.result; // Return success data
//       } else {
//         return rejectWithValue("Failed to convert enquiry to customer.");
//       }
//     } catch (error) {
//       return rejectWithValue("Error converting enquiry to customer.");
//     }
//   }
// );

// // Search Enquiries
// export const searchEnquiry = createAsyncThunk(
//   "enquiry/searchEnquiry",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/enquiry/?search=${searchTerm}`
//     );
//     return response.data.result;
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
// export const createEnquiry = createAsyncThunk(
//   "enquiries/createEnquiry",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/enquiry/create/",
//         formData
//       );
//       return response.data.result || [];
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );
// export const updateEnquiry = createAsyncThunk(
//   "enquiries/updateEnquiry",
//   async ({ id, status }) => {
//     const response = await axios.put(
//       `http://127.0.0.1:8000/api/enquiry/${id}/`,
//       { status }
//     );
//     return response.data.result;
//   }
// );

// // Fetch enquiry by ID update
// export const fetchEnquiryByIdUpdate = createAsyncThunk(
//   "enquiries/fetchEnquiryByIdUpdate",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/enquiry/update/${id}/`
//       );
//       // Make sure the response structure is correct.
//       return response.data.result; // Adjust this based on the actual response structure
//     } catch (error) {
//       console.error("Error fetching enquiry by ID update:", error);
//       // Handling specific errors from the response
//       if (error.response && error.response.status === 400) {
//         return thunkAPI.rejectWithValue("Bad request. Check your input.");
//       }
//       // Ensure proper error handling
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Fetch enquiry by ID
// // Fetch enquiry by ID
// export const fetchEnquiryById = createAsyncThunk(
//   "enquiries/fetchEnquiryById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/enquiry/detail/${id}/`
//       );
//       console.log("API Response:", response.data); // Log to check the structure of the response
//       return response.data.result.enquiry; // Ensure this is the correct path
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
// // Fetch Lost Enquiries
// export const fetchLostEnquiries = createAsyncThunk(
//   "enquiries/fetchLostEnquiries",
//   async () => {
//     const response = await axios.get("http://127.0.0.1:8000/api/enquiry/lost/");
//     return response.data.result;
//   }
// );

// const enquirySlice = createSlice({
//   name: "enquiries",
//   initialState: {
//     list: [], // Initialize list as an empty array
//     lostEnquiries: [], // Lost inquiries
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
//     // removeEnquiryFromList,
//     setCurrentEnquiry(state, action) {
//       state.currentEnquiry = action.payload;
//     },
//     fetchEnquiryByIdSuccess: (state, action) => {
//       state.currentEnquiry = action.payload; // This should update the currentProject
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(convertToCustomer.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(convertToCustomer.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         // If conversion is successful, add customer and remove enquiry from list
//         if (action.payload.enquiry_id) {
//           // Remove the converted enquiry from the list
//           state.list = state.list.filter(
//             (enquiry) => enquiry.id !== action.payload.enquiry_id
//           );
//           // Ensure customers array exists
//           if (!state.customers) {
//             state.customers = []; // Initialize customers array if undefined
//           }
//           // Add customer to the customer list
//           state.customers.push({
//             id: action.payload.customer_id,
//             ...action.payload.customer_data, // Assuming customer data is part of the payload
//           });

//           // Show a success toast message
//           state.toastMessage = `Enquiry ${action.payload.enquiry_id} successfully converted to Customer.`;
//         }
//       })

//       .addCase(convertToCustomer.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
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

//       // Fetch enquiry by ID update (only one should be here)
//       .addCase(fetchEnquiryByIdUpdate.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEnquiryByIdUpdate.fulfilled, (state, action) => {
//         console.log("Fetched Enquiry Data:", action.payload);
//         state.currentEnquiry = action.payload;
//         state.selectedEnquiry = action.payload; // Keep if necessary
//         state.enquiryToUpdate = action.payload;
//         state.loading = false;
//       })

//       .addCase(fetchEnquiryByIdUpdate.rejected, (state, action) => {
//         state.loading = false;
//         state.currentEnquiry = null;
//         state.fetchError = action.error.message;
//       })

//       // Fetch enquiry by ID
//       .addCase(fetchEnquiryById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchEnquiryById.fulfilled, (state, action) => {
//         console.log("Fetched Enquiry:", action.payload); // Log to confirm if the data is coming through
//         state.loading = false;
//         state.selectedEnquiry = action.payload || {}; // Store the enquiry details
//         state.enquiryToUpdate = action.payload;
//       })
//       .addCase(fetchEnquiryById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // lost enquiry status
//       // Inside your extraReducers (reducers for async thunks) in the slice:
//       .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
//         const updatedEnquiry = action.payload;

//         // Update the main list with the updated enquiry
//         state.list = state.list.filter((enquiry) =>
//           enquiry.id === updatedEnquiry.id ? updatedEnquiry : enquiry
//         );

//         // If the enquiry is marked as "lost", add it to the lost enquiries list
//         if (updatedEnquiry.status === "lost") {
//           state.lostEnquiries.push(updatedEnquiry); // Add it to lost enquiries
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
// Update Enquiry
// .addCase(updateEnquiry.pending, (state) => {
//   state.updateStatus = "loading";
// })
// .addCase(updateEnquiry.fulfilled, (state, action) => {
//   state.updateStatus = "succeeded";
//   const index = state.list.findIndex(
//     (enquiry) => enquiry.id === action.payload.id
//   );
//   if (index !== -1) {
//     state.list[index] = action.payload;
//   }
// })
// .addCase(updateEnquiry.rejected, (state, action) => {
//   state.updateStatus = "failed";
//   state.updateError = action.payload || action.error.message;
// })

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
//       })
//       // Fetch Lost Enquiries
//       .addCase(fetchLostEnquiries.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLostEnquiries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lostEnquiries = action.payload || []; // Store lost enquiries
//       })
//       .addCase(fetchLostEnquiries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });
// export const { setCurrentEnquiry, setEnquiry, setLoading, setError } =
//   enquirySlice.actions;

// export default enquirySlice.reducer;

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
