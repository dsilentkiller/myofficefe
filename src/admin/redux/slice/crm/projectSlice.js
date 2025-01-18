import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all projects action
export const fetchProject = createAsyncThunk(
  "projects/fetchProject",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/project/");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a project action
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/project/create/",
        formData
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/project/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateProjectStatus = createAsyncThunk(
  "projects/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/project/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/project/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated project data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Delete project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/project/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search project action
export const searchProject = createAsyncThunk(
  "projects/searchProject",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/project/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentProject: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchProjectByIdSuccess: (state, action) => {
      state.currentProject = action.payload; // This should update the currentProject
    },
    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProjectById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentProject = action.payload; // Make sure payload is correctly updating currentProject
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentProject = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        state.list = state.list.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );
        if (state.currentProject.id === updatedProject.id) {
          state.currentProject = updatedProject;
        }
      })

      //create project
      .addCase(createProject.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
//update project
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        if (!updatedProject || !updatedProject.id) return;

        // Update project in the list
        const index = state.list.findIndex(
          (project) => project.id === updatedProject.id
        );

        if (index !== -1) {
          state.list[index] = updatedProject;
        }

        // Also update currentProject if necessary
        if (
          state.currentProject &&
          state.currentProject.id === updatedProject.id
        ) {
          state.currentProject = updatedProject;
        }
      })

      .addCase(updateProject.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update project";
      })
      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload ;
      })
   
      // Search project
      .addCase(searchProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// // search
// export const searchProject = createAsyncThunk(
//   "projects/searchProject",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/project/?search=${searchTerm}`
//     );
//     return response.data.result.data;
//   }
// );
// // Fetch all"project action
// export const fetchProject = createAsyncThunk(
//   "projects/fetchProject",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/project/");
//       // console.log(response.data); // Check the response structure
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
// // export const createProject = createAsyncThunk(
// //   "project/createProject",
// //   async (projectData, thunkAPI) => {
// //     try {
// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/api/project/create/",
// //         projectData
// //       );
// //       return response.data.result.data; // Adjust this based on your actual API response structure
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.result.data);
// //     }
// //   }
// // );

// export const createProject = createAsyncThunk(
//   "projects/createProject",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/project/create/",
//         formData
//       );
//       if (response.status === 201) {
//         // Ensure it's a successful creation response
//         return response.data.result.data;
//       } else {
//         return thunkAPI.rejectWithValue("Failed to create project.");
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// // Fetch a single project by ID action
// export const fetchProjectById = createAsyncThunk(
//   "project/fetchProjectById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/project/${id}/`
//       );
//       return response.data.result.data; // Adjust this based on your actual API response structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
// // // Update project
// export const updateProject = createAsyncThunk(
//   "project/updateProject",
//   async ({ id, name }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/project/update/${id}/`,
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

// export const deleteProject = createAsyncThunk(
//   "project/deleteProject",
//   async (id, thunkAPI) => {
//     try {
//       // Make sure this URL is correct
//       await axios.delete(`http://127.0.0.1:8000/api/project/delete/${id}/`);
//       return id; // Return the ID of the deleted project
//     } catch (error) {
//       // Log the entire error to understand its structure
//       console.error("Delete request failed:", error);

//       // Return a more descriptive error message
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "An unknown error occurred"
//       );
//     }
//   }
// );

// const projectSlice = createSlice({
//   name: "projects",
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,
//     currentProject: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch all"project
//       .addCase(fetchProject.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProject.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchProject.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       // Fetch project by ID
//       .addCase(fetchProjectById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProjectById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentProject = action.payload;
//         // Update or add the project in the list
//         const index = state.list.findIndex(
//           (projects) => projects.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         } else {
//           state.list.push(action.payload);
//         }
//       })
//       .addCase(fetchProjectById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       // Create project
//       .addCase(createProject.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
//       .addCase(createProject.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//         state.createStatus = "succeeded";
//       })
//       .addCase(createProject.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.error.message;
//       })
//       // Update project
//       .addCase(updateProject.pending, (state) => {
//         state.updateStatus = "loading";
//       })
//       .addCase(updateProject.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded";
//         const index = state.list.findIndex((p) => p.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })
//       .addCase(updateProject.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.payload;
//       })
//       // Delete project
//       .addCase(deleteProject.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteProject.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (projects) => projects.id !== action.payload
//         );
//       })
//       .addCase(deleteProject.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || "Failed to delete project";
//       })
//       // search MusearchProject name
//       .addCase(searchProject.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(searchProject.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(searchProject.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });
// export default projectSlice.reducer;
