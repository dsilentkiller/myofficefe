import React from "react";
// import { Navigate } from "react-big-calendar";
import { Route,Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
