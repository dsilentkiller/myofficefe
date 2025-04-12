
// //late final list
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSelector } from "@reduxjs/toolkit";
// Base URLs for API
const API_BASE_URL = 'http://127.0.0.1:8000/api/quotation';
// / Selector to get service quotations from state
export const selectQuotations = createSelector(
  (state) => state.quotations.services,  // Ensure 'services' matches state structure
  (services) => services || []  // Return an empty array if services is undefined
);

export const fetchProductQuotations = createAsyncThunk(
  "quotation/fetchProductQuotations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/quotation/product-quotations/");
      // console.log("Product Quotations Data:", response.data.result); // ✅ Log API response
      // return response.data.result; // ✅ Ensure correct return value
      const data = response.data; // Assuming `data` contains the quotations
      console.log("product Quotations Data:", data); // Log to verify data format
      return data; // Ensure that this returns the correct data structure
    } catch (error) {
      console.error("Error fetching quotations:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch Product Quotations
// export const fetchProductQuotationss = createAsyncThunk(
//   'quotation/fetchProductQuotationss',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/quotation/product-quotations/');
//       if (response.status === 200) {
//         console.log('Product Quotations:', response.data);  // Log the results
//         return response.data;  // Ensure you're returning 'results'
//       }
//       throw new Error('Failed to fetch product quotations');
//     } catch (error) {
//       console.error('Error fetching product quotations:', error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



// Fetch Service Quotations with axios (consistency)
export const fetchServiceQuotations = createAsyncThunk(
  'quotation/fetchServiceQuotations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/quotation/service-quotations/`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch service quotations");
      }
      const data = response.data.results; // Assuming `data` contains the quotations
      console.log("Service Quotations Data:", data); // Log to verify data format
      return data; // Ensure that this returns the correct data structure
    } catch (error) {
      console.error("Error fetching service quotations:", error);
      return rejectWithValue(error.response?.data || error.message); // Reject with error message
    }
  }
);


export const createProductQuotation = createAsyncThunk(
  'quotation/createProductQuotation',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/product-quotations/create/`, formData);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductQuotationsById = createAsyncThunk(
  'productquotations/fetchProductQuotationsById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/quotation/product-quotations/detail/${id}/`);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProductQuotation = createAsyncThunk(
  'productquotations/updateProductQuotation',
  async ({ id, ...formData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/product-quotations/update/${id}/`, formData);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductQuotation = createAsyncThunk(
  'quotation/deleteProductQuotation',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/product-quotations/delete/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunks for Service Quotation
// export const fetchServiceQuotations = createAsyncThunk(
//   'quotation/fetchServiceQuotations',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/service-quotations/`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch product quotations");
//       }
//       const data = await response.json();
//       console.log("Product Quotations Data:", data); // Log the data
//       return data;
//     } catch (error) {
//       console.error("Error fetching product quotations:", error);
//       throw error; // Re-throw the error to trigger rejected state
//     }
//   }
// );
export const createServiceQuotation = createAsyncThunk(
  'quotation/createServiceQuotation',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/service-quotations/create/`, formData);
      return response.data.result;
    } catch (error) {
      console.error("Error creating service quotation:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchServiceQuotationById = createAsyncThunk(
  'servicequotations/fetchServiceQuotationById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/service-quotations/detail/${id}/`);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateServiceQuotation = createAsyncThunk(
  'servicequotations/updateServiceQuotation',
  async ({ id, ...formData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/service-quotations/update/${id}/`, formData);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteServiceQuotation = createAsyncThunk(
  'quotation/deleteServiceQuotation',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/service-quotations/delete/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Initial state
const initialState = {

  products: [],
  services: [],
  loading: false,
  error: null,
  isLoading: false,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
  currentProject: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

// Slice
const quotationSlice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {
    // setQuotations: (state, action) => {
    //   state.list = action.payload;
    // },
    // Add reducers for fetching, deleting, etc.
    setProductQuotations: (state, action) => {
      state.products = action.payload;
      state.loading = false; // Stop loading when data is fetched
    },
    setServiceQuotations: (state, action) => {
      state.services = action.payload;
      state.loading = false; // Stop loading when data is fetched
    },
     setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Product Quotation Reducers
    builder
    .addCase(fetchProductQuotations.fulfilled, (state, action) => {
      state.loading = false;
      console.log("Updating state with:", action.payload); // ✅ Debugging
      state.products = action.payload.products|| [];  // ✅ Update products
      state.products = action.payload.result || [];
      // state.products = action.payload.result || []; // ✅ Ensure products array is updated
    })

      .addCase(fetchProductQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

  // .addCase(fetchProductQuotationss.fulfilled, (state, action) => {
  //   state.products = Array.isArray(action.payload) ? action.payload : [];
  // })
  // .addCase(fetchServiceQuotations.fulfilled, (state, action) => {
  //   state.services = Array.isArray(action.payload) ? action.payload : [];
  // })

  .addCase(fetchProductQuotations.rejected, (state, action) => {
    state.loading = false;
    console.error("Error fetching quotations:", action.payload);
    // Optionally, set an error message in the state to display to users
    state.error = action.payload;
  })

      //create product quotation
      .addCase(createProductQuotation.pending, (state) => {
        console.log("Create product quotation request started.");
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductQuotation.fulfilled, (state, action) => {
        console.log("Create product quotation succeeded:", action.payload);
        // state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductQuotation.rejected, (state, action) => {
        console.error("Create product quotation failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      //delete product quotation
      .addCase(deleteProductQuotation.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (quotation) => quotation.id !== action.payload
        );
      })

    // Service Quotation Reducers

    //fetch service quotations
      .addCase(fetchServiceQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload || [];  // Store results array
      })

      .addCase(fetchServiceQuotations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //create service quotation
      .addCase(createServiceQuotation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createServiceQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete quotation
      .addCase(deleteServiceQuotation.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (quotation) => quotation.id !== action.payload
        );
      });
  },
});
export const {
  setQuotations,
  setProductQuotations,
  setServiceQuotations,
} = quotationSlice.actions;

export default quotationSlice.reducer;
