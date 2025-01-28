import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "reselect";


// New async thunk to convert an enquiry to a customer
export const convertEnquiryToCustomer = createAsyncThunk(
  "customers/convertEnquiryToCustomer",
  async (enquiryId, thunkAPI) => {
    try {
      // Make the POST request to the backend to convert the enquiry to a customer
      const response = await axios.post(
        `http://127.0.0.1:8000/api/customer/convert_enquiry_to_customer/${enquiryId}/`
      );
      return response.data; // This will return the success message or customer data
    } catch (error) {
      // Handle error appropriately
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Search customers
export const searchCustomer = createAsyncThunk(
  "customer/searchCustomer",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/customer/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);

// Fetch all customers
export const fetchCustomers= createAsyncThunk(
  "customers/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/customer/customer-list/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create customers
// Create customers (improved error handling)
export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/customer/create/",
        formData
      );
      return response.data.result || [];
    } catch (error) {
      // Log error for debugging
      console.error("API Error:", error.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);
// fetch customers by id upodate
export const fetchCustomerByIdUpdate = createAsyncThunk(
  "customers/fetchCustomerByIdUpdate",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customer/update/${id}/` // Use the correct endpoint
      );
      return response.data.result; // Adjust based on your API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const fetchCustomerByIdUpdate = createAsyncThunk(
//   "customers/fetchCustomerByIdUpdate",
//   async ({ id, ...data }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/customer/update/${id}/`,
//         data
//       );
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// fetch customers by id
export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customer/detail/${id}/`
      );

      // Log the full response to inspect its structure
      console.log("API Response:", response);

      // Check if the structure is as expected
      if (response.data && response.data.result && response.data.result.data) {
        return response.data.result.data;
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Error fetching customers by ID:", error);
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
      } else if (error.request) {
        return thunkAPI.rejectWithValue(
          "Network error. Please try again later."
        );
      } else {
        return thunkAPI.rejectWithValue(
          error.message || "An unexpected error occurred."
        );
      }
    }
  }
);


// Update customers
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/customer/update/${id}/`,
        data
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete customers
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/customer/delete/${id}/`);
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
  "customer/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/customer/category/"
    );
    return response.data.result;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    list: [], // Initialize list as an empty array
    loading: false,
    error: null,
    selectedCustomer: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentCustomer: null,
    createError: null,
    updateError: null,
    deleteError: null,
    conversionStatus: null, // Add this to track conversion status
    conversionError: null,  // Add this to track any error during conversion
  },
  reducers: {
    fetchCustomerByIdSuccess: (state, action) => {
      state.currentCustomer = action.payload; // This should update the currentProject
    },
    setCurrentCustomer(state, action) {
      state.currentCustomer = action.payload;
    },
    updateCustomer(state, action) {
      const { id, data } = action.payload;
      state.customers = state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...data } : customer
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Ensure list is an array
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Handle Convert Enquiry to Customer (new action)
      .addCase(convertEnquiryToCustomer.pending, (state) => {
        state.conversionStatus = "loading";
        state.conversionError = null;
      })
      .addCase(convertEnquiryToCustomer.fulfilled, (state, action) => {
        state.conversionStatus = "succeeded";
        state.message = action.payload.message;  // This is fine if you are getting a success message
        // state.customers.push(convertedCustomer); // Add the customer to the customers list
// Add the converted enquiry to the customers list
const convertedCustomer = action.payload; // Assuming action.payload contains the new customer data
state.customers.push(convertedCustomer); // Add the customer t
        // If the API returns the newly created customer data
        if (action.payload.newCustomer) {
          state.list.push(action.payload.newCustomer); // Add the new customer to the list
        }

        // Alternatively, you can dispatch `fetchCustomers` to refresh the list:
        // dispatch(fetchCustomers());
      })

      .addCase(convertEnquiryToCustomer.rejected, (state, action) => {
        state.conversionStatus = "failed";
        state.conversionError = action.payload || action.error.message;
      })
      // .addCase(fetchCustomerById.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchCustomerById.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.customerToView = action.payload.data; // Adjust this based on the API response structure
      // })
      // .addCase(fetchCustomerById.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      // Fetch customers by ID update
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        console.log("Fetched customers Payload:", action.payload); // Log the payload
        state.selectedCustomer = action.payload;
        state.currentCustomer = action.payload;
        state.loading = false;

        state.currentCustomer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        console.error("Fetch customers failed:", action.error.message); // Log error message
        state.loading = false;
        state.currentCustomer = null;
        state.fetchError = action.error.message;
      })

      // Fetch customers by ID update
      .addCase(fetchCustomerByIdUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerByIdUpdate.fulfilled, (state, action) => {
        state.currentCustomer = action.payload;
        state.loading = false;

        state.selectedCustomer = action.payload;
      })
      .addCase(fetchCustomerByIdUpdate.rejected, (state, action) => {
        state.loading = false;
        state.currentCustomer = null;
        state.fetchError = action.error.message;
      })

      // .addCase(updateCustomerStatus.fulfilled, (state, action) => {
      //   const updatedcustomers = action.payload;
      //   state.list = state.list.map((customers) =>
      //     customers.id === updatedcustomers.id ? updatedcustomers : customers
      //   );
      //   if (state.currentCustomer.id === updatedcustomers.id) {
      //     state.currentCustomer = updatedcustomers;
      //   }
      // })

      // Create customers
      .addCase(createCustomer.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
        state.list = action.payload.updatedCustomers; // Assuming your API returns updated customer list
        state.list.push(action.payload.newCustomer); // Add the new customer to the list


      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      })

      // Update customers
      .addCase(updateCustomer.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex(
          (customers) => customers.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      })

      // Delete customers
      .addCase(deleteCustomer.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (customers) => customers.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      })

      // Search customers
      .addCase(searchCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Ensure the list is an array
      })
      .addCase(searchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export const { setCustomers, setLoading, setError } = customerSlice.actions;
export default customerSlice.reducer;
