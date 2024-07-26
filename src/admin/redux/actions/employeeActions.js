// import axios from "axios";

// // Action types
// export const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST";
// export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
// export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";

import axios from "axios";
import { ADD_EMPLOYEE } from "./types"; // Define your action types

export const addEmployee = (employeeData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/employee/",
      employeeData
    );
    dispatch({
      type: ADD_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// // Action creators
// const addEmployeeRequest = () => ({
//   type: ADD_EMPLOYEE_REQUEST,
// });

// const addEmployeeSuccess = (employee) => ({
//   type: ADD_EMPLOYEE_SUCCESS,
//   payload: employee,
// });

// const addEmployeeFailure = (error) => ({
//   type: ADD_EMPLOYEE_FAILURE,
//   payload: error,
// });

// // Async action to add employee
// export const addEmployee = (employeeData) => {
//   return (dispatch) => {
//     dispatch(addEmployeeRequest());
//     axios
//       .post("/api/employees/", employeeData)
//       .then((response) => {
//         dispatch(addEmployeeSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(addEmployeeFailure(error.message));
//       });
//   };
// };

// export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';

// export const addEmployee = (employeeData) => {
//   return {
//     type: ADD_EMPLOYEE,
//     payload: employeeData,
//   };
// };
