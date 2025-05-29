import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCategory,
  fetchCategories,
} from "../../../redux/slice/admin/crm/categorySlice";

const CategoryForm = () => {
  const [formData, setFormData] = useState({ category_name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use a fallback value in case `categories` is undefined
  const categories = useSelector((state) => state.categories?.list || []);
  const createStatus = useSelector((state) => state.categories.createStatus);
  const createError = useSelector((state) => state.categories.createError);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Category created successfully!");
      setFormData({ category_name: "" }); // Clear the form after successful creation
      dispatch(fetchCategories()); // Refresh the category list
      navigate("/dashboard/crm/category"); // Redirect to the table page
    }
  }, [createStatus, navigate, dispatch]);

  useEffect(() => {
  if (createStatus === "failed") {
    console.error("Error object:", createError); // ✅ For debugging
    const errorMessage =
      typeof createError === "string"
        ? createError
        : createError?.message || createError?.detail || JSON.stringify(createError);
    toast.error(errorMessage);
  }
}, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim input and check if it's empty
    const trimmedName = formData.category_name.trim();
    if (trimmedName === "") {
      toast.error("Category name cannot be empty.");
      return;
    }

    // Check if category name already exists (ignores case and trims spaces)
    // Check if category name already exists (safely checking for undefined values)
    const existingCategory = categories.some(
      (category) =>
        category?.category_name && // Ensure category is defined and has category_name
        category.category_name.trim().toLowerCase() ===
          trimmedName.toLowerCase()
    );

    if (existingCategory) {
      toast.error("Category with this name already exists.");
      return;
    }

    // Dispatch the action to create a new category
    dispatch(createCategory({ category_name: trimmedName })).unwrap();
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Category Name</h4>
            </div>
            {/* <div className="card-body">
              {createError && (
              <p className="text-danger">
                {createError.message || createError.detail || "An error occurred."}
              </p> */}
            {/* )} */}

             <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Category Name:</label>
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    value={formData.category_name}
                    className="form-control"
                    placeholder="Enter category name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default CategoryForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createCategory,
//   fetchCategories,
// } from "../../redux/slice/crm/categorySlice";

// const CategoryForm = () => {
//   const [formData, setFormData] = useState({ category_name: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Use a fallback value in case `categories` is undefined
//   const categories = useSelector((state) => state.categories.list || []);
//   const createStatus = useSelector((state) => state.categories.createStatus);
//   // const createError = useSelector((state) => state.categories.createError);
//   const createError = useSelector((state) => state.categories.createError); // Update based on your state structure

//   useEffect(() => {
//     // Fetch categories when the component mounts
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Category created successfully!");
//       setFormData({ category_name: "" }); // Clear the form after successful creation
//       dispatch(fetchCategories()); // Refresh the category listnpm start
//       navigate("/dashboard/crm/category"); // Redirect to the table page
//     }
//   }, [createStatus, navigate]);

//   useEffect(() => {
//     if (createStatus === "failed") {
//       toast.error(`Error: ${createError.message || "An error occurred"}`);
//     }
//   }, [createStatus, createError]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.category_name.trim() === "") return; // Prevent empty name submission

//     // Check if category name already exists
//     const existingCategory = categories.some(
//       (category) =>
//         category.category_name &&
//         category.category_name.toLowerCase() ===
//           formData.category_name.toLowerCase()
//     );

//     if (existingCategory) {
//       toast.error("Category with this name already exists.");
//       return;
//     }

//     // Dispatch the action to create a new category
//     dispatch(createCategory(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({ category_name: "" }); // Clear the form
//       })
//       .catch((error) => {
//         console.error("Create Error:", error); // Log error
//       });
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="container">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="btn btn-primary">Add Category Name</h4>
//             </div>
//             <div className="card-body">
//               {createError && <p className="text-danger">{createError}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name"> Category Name:</label>
//                   <input
//                     type="text"
//                     id="category_name"
//                     name="category_name"
//                     value={formData.category_name}
//                     className="form-control"
//                     placeholder="Enter category name"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;
#############
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../admin/api/axiosInstance"; // use shared axiosInstance Multi-tenant aware
// search
export const searchCategory = createAsyncThunk(
  "categories/searchCategory",
  async (searchTerm) => {
    const response = await axiosInstance.get(
      `api/enquiry/category/?search=${searchTerm}`
    );
    return response.data.result.data;
  }
);
// Fetch all"categories action
// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(
//         "api/enquiry/category/"
//       );
//       return response.data.result; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(message);
//       // return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("api/enquiry/category/");
      return response.data.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      return thunkAPI.rejectWithValue(errorMessage); // ✅ Fixed
    }
  }
);

// export const createCategory = createAsyncThunk(
//   "categories/createCategory",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(
//         "api/enquiry/category/create/",
//         formData
//       );
//       console.log(response.data.result);
//       if (response.status === 201) {
//         return response.data.result;
//       } else {
//         return thunkAPI.rejectWithValue("Failed to create category.");
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "An error occurred");

//     }
//   }
// );
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/enquiry/category/create/",
        formData
      );
      if (response.status === 201) {
        return response.data.result;
      } else {
        return thunkAPI.rejectWithValue("Failed to create category.");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      ); // ✅ Fixed
    }
  }
);

// Fetch a single category by ID action
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/enquiry/category/${id}/`
      );
      return response.data.result.data; // Adjust this based on your actual API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, category_name }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `api/enquiry/category/update/${id}/`,
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
      await axiosInstance.delete(
        `api/enquiry/category/delete/${id}/`
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
    //   .addCase(fetchCategories.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchCategories.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.list = action.payload;
    //   })
    //   // .addCase(fetchCategories.rejected, (state, action) => {
    //   //   state.isLoading = false;
    //   //   state.error = action.error.message;
    //   // })
    //   .addCase(fetchCategories.rejected, (state, action) => {
    //       state.isLoading = false;
    //       state.error = action.payload || action.error.message || "Unknown error";
    //     })
    //           // Fetch category by ID
    //   .addCase(fetchCategoryById.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchCategoryById.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.currentCategory = action.payload;
    //     // Update or add the category in the list
    //     const index = state.list.findIndex(
    //       (category) => category.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.list[index] = action.payload;
    //     } else {
    //       state.list.push(action.payload);
    //     }
    //   })
    // .addCase(createCategory.rejected, (state, action) => {
    //   state.createStatus = "failed";
    //   state.createError =
    //     typeof action.payload === "string"
    //       ? action.payload
    //       : action.error?.message || "Unknown error occurred";
    // })

    //   // Create category
    //   .addCase(createCategory.pending, (state) => {
    //     state.createStatus = "loading";
    //     state.createError = null;
    //   })
    //   .addCase(createCategory.fulfilled, (state, action) => {
    //     state.list.push(action.payload.result); //add create category to the list
    //     state.createStatus = "succeeded";
    //     state.createError = null; //reset error on sucess
    //   })

    //   .addCase(createCategory.rejected, (state, action) => {
    //       state.createStatus = "failed";

    //       if (action.payload?.message?.category_name) {
    //         state.createError = `Category error: ${action.payload.message.category_name.join(", ")}`;
    //       } else if (typeof action.payload === "string") {
    //         state.createError = action.payload;
    //       } else {
    //         state.createError = "Failed to create category";
    //       }
    //     })
    .addCase(fetchCategories.pending, (state) => {
      state.fetchStatus = 'loading';
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.fetchStatus = 'succeeded';
      state.list = action.payload;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.payload || action.error?.message;
    })

    .addCase(createCategory.pending, (state) => {
      state.createStatus = 'loading';
      state.createError = null;
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.createStatus = 'succeeded';
      state.list.push(action.payload);
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.createStatus = 'failed';
      state.createError =
        typeof action.payload === 'string'
          ? action.payload
          : action.error?.message || 'Unknown error';
    })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.updateStatus = "loading";
      })

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
