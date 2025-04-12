import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("access_token") !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
//##secong protected route
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("access_token") !== null;

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


///####old route######
// import React from "react";
// // import { Navigate } from "react-big-calendar";
// import { Route,Navigate } from "react-router-dom";

// // Protected Route Component
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem("access_token");

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default ProtectedRoute;