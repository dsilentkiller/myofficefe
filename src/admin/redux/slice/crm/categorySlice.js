import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// search
export const searchCategory = createAsyncThunk(
  "categories/searchCategory",
  async (searchTerm) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/enquiry/category/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all"categories action
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/enquiry/category/"
      );
      return response.data.result; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/enquiry/category/create/",
        formData
      );
      if (response.status === 201) {
        return response.data.result;
      } else {
        return thunkAPI.rejectWithValue("Failed to create category.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Fetch a single category by ID action
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enquiry/category/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// // Update category
// export const updateCategory = createAsyncThunk(
//   "category/updateCategory",
//   async ({ id, name }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/enquiry/category/update/${id}/`,
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
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, category_name }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/enquiry/category/update/${id}/`,
        {
          category_name,
        }
      );
      console.log(response.data); // Log the response to check if it's returning data
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      // Make sure this URL is correct
      await axios.delete(
        `http://127.0.0.1:8000/api/enquiry/category/delete/${id}/`
      );
      return id; // Return the ID of the deleted category
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

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: "idle",
    deleteStatus: null,
    currentCategory: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all"categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCategory = action.payload;
        // Update or add the category in the list
        const index = state.list.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.push(action.payload.result); //add create category to the list
        state.createStatus = "succeeded";
        state.createError = null; //reset error on sucess
      })
      // .addCase(createCategory.rejected, (state, action) => {
      //   state.createStatus = "failed";
      //   state.createError = action.error.message;
      // })
      .addCase(createCategory.rejected, (state, action) => {
        state.createStatus = "failed";
        // if (action.payload?.message?.category_name) {
        //   state.createError = `Category name error: ${action.payload.message.category_name.join(
        //     ", "
        //   )}`;
        // } else {
        state.createError = action.payload || "Failed to create category";
        // }
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.updateStatus = "loading";
      })
      // .addCase(updateCategory.fulfilled, (state, action) => {
      //   state.updateStatus = "succeeded";
      //   const index = state.list.findIndex((p) => p.id === action.payload.id);
      //   if (index !== -1) {
      //     state.list[index] = action.payload;
      //   }
      // })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload) {
          const updatedCategoryIndex = state.list.findIndex(
            (cat) => cat.id === action.payload.result.id
          );
          if (updatedCategoryIndex !== -1) {
            state.list[updatedCategoryIndex] = action.payload.result;
          }
        }
        state.updateStatus = "succeeded";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || "Failed to delete category";
      })
      // search MusearchCategory name
      .addCase(searchCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default categorySlice.reducer;
