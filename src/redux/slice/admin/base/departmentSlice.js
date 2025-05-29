import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../admin/api/axiosInstance";
// search
export const searchDepartment = createAsyncThunk(
  "department/searchDepartment",
  async (searchTerm) => {
    const response = await axiosInstance.get(
      `api/setup/department/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all"departments action
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "api/setup/department/"
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result.data);
    }
  }
);

export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (departmentData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/setup/department/create/",
        departmentData
      );
      if (response.status === 201) {
        // Ensure it's a successful creation response
        return response.data.result.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to create department.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Fetch a single Department by ID action
export const fetchDepartmentById = createAsyncThunk(
  "departments/fetchDepartmentById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/setup/department/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update Department
export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `api/setup/department/update/${id}/`,
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

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axiosInstance.delete(
        `api/setup/department/delete/${id}/`
      );
      return id; // Return the ID of the deleted Department
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

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentDepartment: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all"departments
      .addCase(fetchDepartments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Department by ID
      .addCase(fetchDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDepartment = action.payload;
        // Update or add the Department in the list
        const index = state.list.findIndex(
          (Department) => Department.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create Department
      .addCase(createDepartment.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.createStatus = "succeeded";
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message;
      })
      // Update Department
      .addCase(updateDepartment.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete Department
      .addCase(deleteDepartment.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (Department) => Department.id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete Department";
      })
      // search MusearchDepartment name
      .addCase(searchDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default departmentSlice.reducer;
