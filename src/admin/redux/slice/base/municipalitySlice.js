import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchMunicipality = createAsyncThunk(
  "municipality/searchMunicipality",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/setup/municipality/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all municipalities action
export const fetchMunicipalities = createAsyncThunk(
  "municipalities/fetchMunicipalities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/setup/municipality/"
      );
      console.log(response.data); // Log to check the API response
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const createMunicipality = createAsyncThunk(
  "municipalities/createMunicipality",
  async (municipalityData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setup/municipality/create/",
        municipalityData
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.result.data);
    }
  }
);
// Fetch a single municipality by ID action
export const fetchMunicipalityById = createAsyncThunk(
  "municipalities/fetchMunicipalityById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/setup/municipality/${id}/`
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update municipality
export const updateMunicipality = createAsyncThunk(
  "municipalities/updateMunicipality",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/setup/municipality/update/${id}/`,
        { name }
      );
      return response.data.result.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMunicipality = createAsyncThunk(
  "municipalities/deleteMunicipality",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(
        `http://127.0.0.1:8000/api/setup/municipality/delete/${id}/`
      );
      return id; // Return the ID of the deleted municipality
    } catch (error) {
      // Log the entire error to understand its structure
      console.error("Delete request failed:", error);

      // Return a more descriptive error message
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

// export const deleteMunicipality = createAsyncThunk(
//   "municipalities/deleteMunicipality",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/api/municipalities/${id}`);
//       return id; // Return the ID of the deleted municipality
//     } catch (error) {
//       // Use rejectWithValue to return a custom error message
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

const municipalitySlice = createSlice({
  name: "municipalities",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentMunicipality: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all municipalities
      .addCase(fetchMunicipalities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMunicipalities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchMunicipalities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch municipality by ID
      .addCase(fetchMunicipalityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMunicipalityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMunicipality = action.payload;
        // Update or add the municipality in the list
        const index = state.list.findIndex(
          (municipality) => municipality.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchMunicipalityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create municipality
      .addCase(createMunicipality.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createMunicipality.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createMunicipality.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      // Update municipality
      .addCase(updateMunicipality.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateMunicipality.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateMunicipality.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete municipality
      .addCase(deleteMunicipality.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteMunicipality.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (municipality) => municipality.id !== action.payload
        );
      })
      .addCase(deleteMunicipality.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete municipality";
      })
      // search MusearchMunicipality name
      .addCase(searchMunicipality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchMunicipality.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchMunicipality.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default municipalitySlice.reducer;
