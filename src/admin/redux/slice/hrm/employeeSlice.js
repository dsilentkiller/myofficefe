import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all employees action
export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/employee/employee-list");
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create aemployee action
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/employee/create/",
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

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/employee/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Updateemployee Status
export const updateEmployeeStatus = createAsyncThunk(
  "employees/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/employee/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/employee/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updatedemployee data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Deleteemployee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employee/delete/${id}/`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Searchemployee action
export const searchEmployee = createAsyncThunk(
  "employees/searchEmployee",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/employee/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentEmployee: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchEmployeeByIdSuccess: (state, action) => {
      state.currentEmployee = action.payload; // This should update the currentEmployee
    },
    setCurrentEmployee(state, action) {
      state.currentEmployee = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        console.log("Fetched employees:", action.payload);  // Log response
        state.isLoading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetchemployee by ID
      .addCase(fetchEmployeeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentEmployee = action.payload; // Make sure payload is correctly updating currentEmployee
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentEmployee = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateEmployeeStatus.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;
        state.list = state.list.map((employee) =>
         employee.id === updatedEmployee.id ? updatedEmployee :employee
        );
        if (state.currentEmployee.id === updatedEmployee.id) {
          state.currentEmployee = updatedEmployee;
        }
      })

      //createemployee
      .addCase(createEmployee.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
//updateemployee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;
        if (!updatedEmployee || !updatedEmployee.id) return;

        // Updateemployee in the list
        const index = state.list.findIndex(
          (employee) =>employee.id === updatedEmployee.id
        );

        if (index !== -1) {
          state.list[index] = updatedEmployee;
        }

        // Also update currentEmployee if necessary
        if (
          state.currentEmployee &&
          state.currentEmployee.id === updatedEmployee.id
        ) {
          state.currentEmployee = updatedEmployee;
        }
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to updateemployee";
      })
      // Deleteemployee
      .addCase(deleteEmployee.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (employee) =>employee.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload ;
      })
   
      // Searchemployee
      .addCase(searchEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;

//new second last 

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all employees action
// export const fetchEmployee = createAsyncThunk(
//   "employees/fetchEmployee",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/employee/employee-list/");
//       return response.data.result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



// // Create a employee action
// export const createEmployee = createAsyncThunk(
//   "employees/createEmployee",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/employee/create/",
//         formData
//       );
//       return response.data.result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: error.message }
//       );
//     }
//   }
// );

// export const fetchEmployeeById = createAsyncThunk(
//   "employees/fetchEmployeeById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/employee/detail/${id}/`
//       );
//       return response.data.result; // Make sure the API returns the correct structure
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Update employee Status
// export const updateEmployeeStatus = createAsyncThunk(
//   "employees/updateStatus",
//   async ({ id, status }) => {
//     const response = await axios.put(
//       `http://127.0.0.1:8000/api/employee/update/${id}/`,
//       { status }
//     );
//     return response.data.result;
//   }
// );
// export const updateEmployee = createAsyncThunk(
//   "employees/updateEmployee",
//   async ({ id, ...data }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/employee/update/${id}/`,
//         data
//       );
//       return response.data.result; // Ensure this returns the updated employee data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// // Delete employee
// export const deleteEmployee = createAsyncThunk(
//   "employees/deleteEmployee",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/employee/delete/${id}/`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Search employee action
// export const searchEmployee = createAsyncThunk(
//   "employees/searchEmployee",
//   async (searchTerm, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/employee/?search=${searchTerm}`
//       );
//       return response.data.result.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Redux slice
// const employeeSlice = createSlice({
//   name: "employees",
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,
//     currentEmployee: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   // reducers: {
//   //   fetchEmployeesSuccess: (state, action) => {
//   //     state.list = action.payload;  // Update 'list' with fetched data
//   //   },
//   //   fetchEmployeesError: (state, action) => {
//   //     state.error = action.payload;  // Handle errors
//   //   },
//   // },
//   reducers: {
//     fetchEmployeesStart: (state) => {
//       state.loading = true;  // Set loading to true when the request starts
//     },
//     fetchEmployeesSuccess: (state, action) => {
//       state.list = action.payload;  // Update the list with fetched data
//       state.loading = false;  // Set loading to false after successful fetch
//     },
//     fetchEmployeesError: (state, action) => {
//       state.error = action.payload;  // Store any error
//       state.loading = false;  // Set loading to false after error
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch employees
//       .addCase(fetchEmployee.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;  // Store the fetched employee data
//       })
//       .addCase(fetchEmployee.rejected, (state, action) => {
//         state.loading = false;
//         // state.error = action.error.message;
//       })
//       // Fetch employee by ID
//       .addCase(fetchEmployeeById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })

//       .addCase(fetchEmployeeById.fulfilled, (state, action) => {
//         // state.isLoading = false;
//         state.currentEmployee = action.payload; // Make sure payload is correctly updating currentEmployee
//       })
//       .addCase(fetchEmployeeById.rejected, (state, action) => {
//         state.isLoading = false;
//         // state.error = action.payload;
//         state.currentEmployee = null; // Reset if fetching fails
//         state.fetchError = action.error.message; // Optional: Handle the error
//       })
//       .addCase(updateEmployeeStatus.fulfilled, (state, action) => {
//         const updatedEmployee = action.payload;
//         state.list = state.list.map((employee) =>
//           employee.id === updatedEmployee.id ? updatedEmployee : employee
//         );
//         if (state.currentEmployee.id === updatedEmployee.id) {
//           state.currentEmployee = updatedEmployee;
//         }
//       })

//       //create employee
//       .addCase(createEmployee.pending, (state) => {
//         state.createStatus = "loading";
//         state.createError = null;
//       })
  
//       .addCase(createEmployee.fulfilled, (state, action) => {
//         if (action.payload) {
//           state.list.push(action.payload); // Add the new employee to the list
//         }
//       })
      
//       .addCase(createEmployee.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.payload;
//       })
// //update employee
//       .addCase(updateEmployee.fulfilled, (state, action) => {
//         const updatedEmployee = action.payload;
//         if (!updatedEmployee || !updatedEmployee.id) return;

//         // Update employee in the list
//         const index = state.list.findIndex(
//           (employee) => employee.id === updatedEmployee.id
//         );

//         if (index !== -1) {
//           state.list[index] = updatedEmployee;
//         }

//         // Also update currentEmployee if necessary
//         if (
//           state.currentEmployee &&
//           state.currentEmployee.id === updatedEmployee.id
//         ) {
//           state.currentEmployee = updatedEmployee;
//         }
//       })

//       .addCase(updateEmployee.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.payload || "Failed to update employee";
//       })
//       // Delete employee
//       .addCase(deleteEmployee.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteEmployee.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (employee) => employee.id !== action.payload
//         );
//       })
//       .addCase(deleteEmployee.rejected, (state, action) => {
//         // state.deleteStatus = "failed";
//         state.deleteError = action.payload ;
//       })

//       // Search employee
//       .addCase(searchEmployee.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(searchEmployee.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.list = action.payload;
//       })
//       .addCase(searchEmployee.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });


// export const { fetchEmployeesSuccess, fetchEmployeesError } = employeeSlice.actions;
// export default employeeSlice.reducer;



// // src/slices/employeeSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunks for asynchronous actions
// export const fetchEmployees = createAsyncThunk(
//   'employees/fetchEmployees',
//   async (_, thunkAPI) => {
//     try {
//     const response = await axios.get('http://127.0.0.1:8000/api/employee/employee-list/'); // API endpoint to fetch all employees
//     return response.data.result;
//   }
//  catch (error) {
//   return thunkAPI.rejectWithValue(error.response?.data || error.message);
// }}
// );
// // Create employees (improved error handling)
// export const createEmployee = createAsyncThunk(
//   "employees/createEmployee",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/employee/create/",
//         formData
//       );
//       return response.data.result || [];
//     } catch (error) {
//       // Log error for debugging
//       console.error("API Error:", error.response?.data);
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Something went wrong!"
//       );
//     }
//   }
// );
// export const fetchEmployeeById = createAsyncThunk(
//   'employees/fetchEmployeeById',
//   async (employeeId) => {
//     const response = await axios.get(`http://127.0.0.1:8000/api/employee/${employeeId}`); // API endpoint to fetch a single employee by ID
//     return response.data.result;
//   }
// );

// export const updateEmployeeById = createAsyncThunk(
//   'employees/updateEmployee',
//   async ({ employeeId, updatedData }) => {
//     const response = await axios.put(`http://127.0.0.1:8000/api/employee/${employeeId}`, updatedData); // API endpoint to update employee by ID
//     return response.data.result;
//   }
// );

// // Search employees
// export const searchEmployee = createAsyncThunk(
//   "employee/searchEmployee",
//   async (searchTerm) => {
//     const response = await axios.get(
//       `http://127.0.0.1:8000/api/employee/?search=${searchTerm}`
//     );
//     return response.data.result.data;
//   }
// );
// // Delete employees
// export const deleteEmployee = createAsyncThunk(
//   "employees/deleteEmployee",
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/employee/delete/${id}/`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "An unknown error occurred"
//       );
//     }
//   }
// );


// // Slice for employee data
// const employeeSlice = createSlice({
//   name: 'employees',
//   initialState: {
//     list: [],
//     isLoading: false,
//     error: null,
//     createStatus: null,
//     updateStatus: null,
//     deleteStatus: null,

//     selectedEmployee: null,
//     createError: null,
//     updateError: null,
//     deleteError: null,
//   },
//   reducers: {
//     setSelectedEmployee: (state, action) => {
//       state.selectedEmployee = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//     .addCase(fetchEmployees.pending, (state) => {
//       state.loading.fetch = true;
//     })
//     .addCase(fetchEmployees.fulfilled, (state, action) => {
//       state.loading.fetch = false;
//       state.list = action.payload;
//     })
//     .addCase(fetchEmployees.rejected, (state, action) => {
//       state.loading.fetch = false;
//       state.error = action.error.message;
//     })

//       .addCase(createEmployee.pending, (state) => {
//               state.createStatus = "loading";
//               state.createError = null;
//             })
//             .addCase(createEmployee.fulfilled, (state, action) => {
//               state.createStatus = "succeeded";
//               state.list.push(action.payload);
//             })
//             .addCase(createEmployee.rejected, (state, action) => {
//               state.createStatus = "failed";
//               state.createError = action.payload || action.error.message;
//             })
//       .addCase(fetchEmployeeById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployeeById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedEmployee = action.payload;
//       })
//       .addCase(fetchEmployeeById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(updateEmployeeById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateEmployeeById.fulfilled, (state, action) => {
//         state.loading = false;
//         // Update the employee in the employees array
//         const index = state.list.findIndex(
//           (employee) => employee.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//         // Also update the selectedEmployee if it's the one being updated
//         if (state.selectedEmployee?.id === action.payload.id) {
//           state.selectedEmployee = action.payload;
//         }
//       })
//       .addCase(updateEmployeeById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Delete employees
//       .addCase(deleteEmployee.pending, (state) => {
//         state.deleteStatus = "loading";
//         state.deleteError = null;
//       })
//       .addCase(deleteEmployee.fulfilled, (state, action) => {
//         state.deleteStatus = "succeeded";
//         state.list = state.list.filter(
//           (employees) => employees.id !== action.payload
//         );
//       })
//       .addCase(deleteEmployee.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//         state.deleteError = action.payload || action.error.message;
//       })

//       // Search employees
//       .addCase(searchEmployee.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || []; // Ensure the list is an array
//       })
//       .addCase(searchEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });

//   },
// });

// // Actions
// export const { setSelectedEmployee } = employeeSlice.actions;

// // Selectors
// export const selectEmployees = (state) => state.employees.employees;
// export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;
// export const selectEmployeeLoading = (state) => state.employees.loading;
// export const selectEmployeeError = (state) => state.employees.error;

// export default employeeSlice.reducer;
