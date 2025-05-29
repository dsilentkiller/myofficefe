// src/components/PrivateRoute.jsx
//Outlet-Based (Best for Nested Routes)
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

// #for both outlet and inline
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children || <Outlet />;
};

export default PrivateRoute;
