import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";
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
      // const response = await axios.get("http://127.0.0.1:8000/api/enquiry/");
      const response = await axiosInstance.get("enquiry/");
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
// Fetch updated enquiry by ID
export const fetchEnquiryByIdUpdate = createAsyncThunk(
  "enquiries/fetchEnquiryByIdUpdate",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/update/${id}/`
      );
      console.log("API Response:", response.data); // Log to check the structure of the response
      return response.data.result.enquiry; // Ensure this is the correct path
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// This action should make a request to your backend API
export const updateEnquiry = createAsyncThunk(
  "enquiries/updateEnquiry",
  async (formData, { rejectWithValue }) => {
    try {
      // Send the PUT request to update the enquiry data in the database
      const response = await axios.put(
        `http://127.0.0.1:8000/api/enquiry/update/${formData.id}/`,
        formData
      );
      return response.data.result; // Assuming response.data.result contains the updated enquiry
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error if the request fails
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

      // .addCase(updateEnquiry.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   // Handle state update when the enquiry is updated successfully
      //   if (
      //     state.currentEnquiry &&
      //     state.currentEnquiry.id === action.payload.id
      //   ) {
      //     state.currentEnquiry = action.payload;
      //   }
      // })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.status = "succeeded"; // Update status to succeeded when the action is fulfilled

        // Only update the enquiry if the action payload matches the current enquiry's ID
        if (
          state.selectedEnquiry &&
          state.selectedEnquiry.id === action.payload.id
        ) {
          state.selectedEnquiry = action.payload; // Update the selected enquiry with the updated data
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
