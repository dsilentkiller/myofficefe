// import { ADD_EMPLOYEE } from "../actions/employeeActions";

import {
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
} from "../actions/employeeActions";

const initialState = {
  loading: false,
  employee: [],
  error: "",
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        employee: action.payload,
        error: "",
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        loading: false,
        employee: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;

// const initialState = {
//   employees: [],
// };

// const employeeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_EMPLOYEE:
//       return {
//         ...state,
//         employees: [...state.employees, action.payload],
//       };
//     default:
//       return state;
//   }
// };

// export default employeeReducer;
