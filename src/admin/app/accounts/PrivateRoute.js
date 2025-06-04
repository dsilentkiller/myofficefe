// src/components/PrivateRoute.jsx
//Outlet-Based (Best for Nested Routes)
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

// #for both outlet and inline
//This ensures users are redirected to login if:
// No token exists
// OR token is expired
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./utils/auth";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");
    const isValid = token && isTokenValid(token);

    if (!isValid) return <Navigate to="/login" replace />;
    return children || <Outlet />;
};

export default PrivateRoute;
// this both work well
// // Example usage in PrivateRoute
// import { getAccessToken } from "../accounts/utils/authStorage";
// import { isTokenValid } from "../accounts/utils/auth";

// const token = getAccessToken();
// const isValid = token && isTokenValid(token);
