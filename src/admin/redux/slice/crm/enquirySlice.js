import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      return response.data.result.data;
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
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.result);
    }
  }
);

// Fetch a single enquiry by ID
export const fetchEnquiryById = createAsyncThunk(
  "enquiries/fetchEnquiryById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/${id}/`
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update Enquiry
export const updateEnquiry = createAsyncThunk(
  "enquiry/updateEnquiry",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/enquiry/update/${id}/`,
        { name }
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
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
export const fetchCategories = createAsyncThunk(
  "enquiry/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/enquiry/category/"
    );
    return response.data.result;
  }
);
// export const fetchDesignations = createAsyncThunk(
//   "enquiry/fetchDesignations",
//   async () => {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/setup/designation"
//     );
//     return response.data.result;
//   }
// );

// export const fetchDepartments = createAsyncThunk(
//   "enquiry/fetchDepartments",
//   async () => {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/setup/department/"
//     );
//     return response.data.result;
//   }
// );

// export const fetchMunicipalities = createAsyncThunk(
//   "enquiry/fetchMunicipalities",
//   async () => {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/setup/municipality/"
//     );
//     return response.data.result;
//   }
// );

// Fetch Provinces
// export const fetchProvinces = createAsyncThunk(
//   "enquiry/fetchProvinces",
//   async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/setup/province/"
//       );
//       console.log("Provinces fetched:", response.data); // Check the data structu
//       // dispatch(setProvinces(response.data));
//     } catch (error) {
//       console.error("Failed to fetch provinces:", error);
//     }
//   }
// );

// Fetch Zones
// export const fetchZones = createAsyncThunk("enquiry/fetchZones", async () => {
//   const response = await axios.get("http://127.0.0.1:8000/api/setup/zone/");
//   return response.result.data;
// });

// Fetch Districts
// export const fetchDistricts = createAsyncThunk(
//   "enquiry/fetchDistricts",
//   async () => {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/setup/district/"
//     );
//     return response.result.data;
//   }
// );

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: {
    loading: false,
    error: null,
    list: [],
    isLoading: false,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentEnquiry: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // // Fetch Provinces
      // .addCase(fetchProvinces.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchProvinces.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   // state.provinces = action.payload;
      //   state.provinces = Array.isArray(action.payload) ? action.payload : [];
      // })
      // .addCase(fetchProvinces.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.error.message;
      // })

      // Fetch Zones
      // .addCase(fetchZones.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchZones.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.zones = action.payload;
      // })
      // .addCase(fetchZones.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.error.message;
      // })

      // Fetch Districts
      // .addCase(fetchDistricts.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchDistricts.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.districts = action.payload;
      // })
      // .addCase(fetchDistricts.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.error.message;
      // })

      // // Fetch Municipalities
      // .addCase(fetchMunicipalities.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchMunicipalities.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.municipalities = action.payload.data.municipalities;
      // })
      // .addCase(fetchMunicipalities.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.error.message;
      // })
      // Fetch all enquiries
      .addCase(fetchEnquiries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch enquiry by ID
      .addCase(fetchEnquiryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnquiryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEnquiry = action.payload;
        const index = state.list.findIndex(
          (enquiry) => enquiry.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchEnquiryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
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
        state.createError = action.payload;
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
        state.updateError = action.payload;
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
        state.deleteError = action.payload;
      })
      // Search Enquiries
      .addCase(searchEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default enquirySlice.reducer;
