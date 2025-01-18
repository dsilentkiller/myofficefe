// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Base URLs for API
// const API_BASE_URL = 'http://localhost:8000/api/quotation/';

// // Async thunks for Product Quotation
// export const fetchProductQuotations = createAsyncThunk(
//   'quotation/fetchProductQuotations',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/product-quotations/`);
//       return response.data.result;
//     } catch (error) {
//       return rejectWithValue(error.response.data.result);
//     }
//   }
// );

// export const createProductQuotation = createAsyncThunk(
//   'quotation/createProductQuotation',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`http://localhost:8000/api/quotation/product-quotations/create/
// `, data);
//       return response.data.result;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const fetchProductQuotationById = createAsyncThunk(
//   "productquotations/fetchProductQuotationById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/product-quotation/detail/${id}/`
//       );
//       return response.data.result; // Make sure the API returns the correct structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateProductionQuotation = createAsyncThunk(
//   "productquotations/updateProductionQuotation",
//   async ({ id, ...data }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/product-quotation/update/${id}/`,
//         data
//       );
//       return response.data.result; // Ensure this returns the updated project data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteProductQuotation = createAsyncThunk(
//   'quotation/deleteProductQuotation',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/product-quotations/delete/${id}/`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunks for Service Quotation
// export const fetchServiceQuotations = createAsyncThunk(
//   'quotation/fetchServiceQuotations',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/service-quotations/`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Search project action
// export const searchQuotation = createAsyncThunk(
//   "quotations/searchQuotation",
//   async (searchTerm, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/quotation/?search=${searchTerm}`
//       );
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// export const createServiceQuotation = createAsyncThunk(
//   'quotation/createServiceQuotation',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/service-quotations/create`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const fetchServiceQuotationById = createAsyncThunk(
//   "servicequotations/fetchServiceQuotationById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/service-quotation/detail/${id}/`
//       );
//       return response.data.result; // Make sure the API returns the correct structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateServiceQuotation = createAsyncThunk(
//   "servicequotations/updateServiceQuotation",
//   async ({ id, ...data }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/service-quotation/update/${id}/`,
//         data
//       );
//       return response.data.result; // Ensure this returns the updated project data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteServiceQuotation = createAsyncThunk(
//   'quotation/deleteServiceQuotation',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/service-quotations/delete/${id}/`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URLs for API
const API_BASE_URL = 'http://localhost:8000/api/quotation/';

// Async thunks for Product Quotation
export const fetchProductQuotations = createAsyncThunk(
  'quotation/fetchProductQuotations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}product-quotations/`);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data.result);
    }
  }
);

export const createProductQuotation = createAsyncThunk(
  'quotation/createProductQuotation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}product-quotations/create`, data);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductQuotationById = createAsyncThunk(
  'productquotations/fetchProductQuotationById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}product-quotations/detail/${id}/`);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProductQuotation = createAsyncThunk(
  'productquotations/updateProductQuotation',
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}product-quotations/update/${id}/`, data);
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
      await axios.delete(`${API_BASE_URL}product-quotations/delete/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunks for Service Quotation
export const fetchServiceQuotations = createAsyncThunk(
  'quotation/fetchServiceQuotations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}service-quotations/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createServiceQuotation = createAsyncThunk(
  'quotation/createServiceQuotation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}service-quotations/create`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchServiceQuotationById = createAsyncThunk(
  'servicequotations/fetchServiceQuotationById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}service-quotations/detail/${id}/`);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateServiceQuotation = createAsyncThunk(
  'servicequotations/updateServiceQuotation',
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}service-quotations/update/${id}/`, data);
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
      await axios.delete(`${API_BASE_URL}service-quotations/delete/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Initial state
const initialState = {
  list: [],
  productQuotations: [],
  serviceQuotations: [],
  loading: false,
  error: null,
};

// Slice
const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    setQuotations: (state, action) => {
      state.list = action.payload;
    },
    // Add reducers for fetching, deleting, etc.
    setProductQuotations: (state, action) => {
      state.productQuotations = action.payload;
    },
    setServiceQuotations: (state, action) => {
      state.serviceQuotations = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Product Quotation Reducers
    builder
    //fetch production quotation
      .addCase(fetchProductQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.productQuotations = action.payload;
      })
      .addCase(fetchProductQuotations.rejected, (state, action) => {
        state.loading = false;
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
        state.loading = false;
        state.productQuotations.push(action.payload);
      })
      .addCase(createProductQuotation.rejected, (state, action) => {
        console.error("Create product quotation failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      //delete product quotation
      .addCase(deleteProductQuotation.fulfilled, (state, action) => {
        state.productQuotations = state.productQuotations.filter(
          (quotation) => quotation.id !== action.payload
        );
      })

    // Service Quotation Reducers
    builder
    //fetch service quotations
      .addCase(fetchServiceQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceQuotations = action.payload;
      })
      .addCase(fetchServiceQuotations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //create quotations
      // .addCase(createServiceQuotation.fulfilled, (state, action) => {
      //   state.serviceQuotations.push(action.payload);
      // })
      .addCase(createServiceQuotation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceQuotations.push(action.payload);
      })
      .addCase(createServiceQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete quotation
      .addCase(deleteServiceQuotation.fulfilled, (state, action) => {
        state.serviceQuotations = state.serviceQuotations.filter(
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
