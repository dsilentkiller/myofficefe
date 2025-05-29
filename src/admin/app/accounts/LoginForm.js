import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginVendor,
  verifyToken,
} from "../../../redux/slice/admin/accounts/authSlice";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const {
    user,
    token,
    loading,
    error: authError,
  } = useSelector((state) => state.auth || {});

  // Local component states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState("");
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  // ✅ Step 1: Prevent accessing login if already logged in
  const [hasNavigated, setHasNavigated] = useState(false); // ✅ prevents repeated redirects

  // ✅ Step 2: Navigate once after successful login
  useEffect(() => {
    if (token && user) {
      setOpenToast(true); // Optional: show success
      setTimeout(() => navigate("/dashboard"), 1500); // Navigate after a short delay
    }
  }, [token, user]);

  // ✅ Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !code) {
      setError("All fields are required.");
      return;
    }

    try {
      await dispatch(loginVendor({ email, password, code })).unwrap();
      console.log("✅ Login dispatched");
    } catch (err) {
      console.error("❌ Raw Error:", err);

      let errorMsg = "Login failed";
      const resData = err?.response?.data;

      if (resData) {
        if (typeof resData === "string") {
          errorMsg = resData;
        } else if (resData.detail) {
          errorMsg = resData.detail;
        } else if (resData.non_field_errors) {
          errorMsg = resData.non_field_errors.join(" ");
        } else {
          errorMsg = JSON.stringify(resData);
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
      setErrorToastOpen(true);
    }
  };
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  {
    /* ✅ Success Toast */
  }
  <Snackbar
    open={openToast}
    autoHideDuration={3000}
    onClose={() => setOpenToast(false)}
  >
    <Alert onClose={() => setOpenToast(false)} severity="success">
      Login Successful! Redirecting...
    </Alert>
  </Snackbar>;
  {
    /* ❌ Error Toast */
  }
  <Snackbar
    open={errorToastOpen}
    autoHideDuration={4000}
    onClose={() => setErrorToastOpen(false)}
  >
    <Alert onClose={() => setErrorToastOpen(false)} severity="error">
      {error}
    </Alert>
  </Snackbar>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #4A90E2, #142850)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: { xs: "90%", sm: 400 },
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          MyOffice
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your office seamlessly
        </Typography>

        {/* Display validation or auth error */}
        {(error || authError) && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error || authError}
          </Alert>
        )}

        {/* ✅ Login Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Vendor Code"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#4A90E2",
              "&:hover": { bgcolor: "#357ABD" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        {/* ✅ Success Toast */}
        <Snackbar
          open={openToast}
          autoHideDuration={3000}
          onClose={() => setOpenToast(false)}
        >
          <Alert onClose={() => setOpenToast(false)} severity="success">
            Login Successful! Redirecting...
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default LoginForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks
// import { loginVendor } from "../../admin/redux/slice/accounts/authSlice.jsx"; // Import the loginVendor action
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Typography,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// const LoginForm = () => {
//   const dispatch = useDispatch(); // Dispatch action
//   const navigate = useNavigate(); // Navigate after successful login

//   const { user, token, loading } = useSelector((state) => state.auth || {}); // Get state from redux
//   console.log("this is token ", token);
//   console.log("this is user", user);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [openToast, setOpenToast] = useState(false);
//   const [error, setError] = useState(""); // Added this to handle error messages
//   // const [hasNavigated, setHasNavigated] = useState(false);

//   // useEffect(() => {
//   //   if (!loading && token && user && !hasNavigated) {
//   //     setHasNavigated(true);
//   //     navigate("/dashboard/");
//   //   }
//   // }, [loading, token, user, hasNavigated, navigate]);
//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);
//   // const subdomain = getSubdomain();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //basic validation
//     if (!email || !password || !code) {
//       setError("All fields are required.");
//       return;
//     }

//     // Dispatch the loginVendor action
//     try {
//       // dispatch async thunk and unwrap result or catch errors.
//       await dispatch(
//         loginVendor({ email: email, password: password, code: code })
//       ).unwrap();

//       console.log("✅ Login successful:"); // log actual result here
//       console.log("login result:");
//       // navigate("/dashboard"); // Assuming you're redirecting after login
//     } catch (err) {
//       //
//       console.error(
//         err?.response?.data?.detail || err.message || "Login failed",
//         err
//       );
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #4A90E2, #142850)",
//         padding: 2,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           width: { xs: "90%", sm: 400 },
//           textAlign: "center",
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           MyOffice
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           Manage your office seamlessly
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <TextField
//             label="Vendor Code"
//             fullWidth
//             margin="normal"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 2,
//               bgcolor: "#4A90E2",
//               "&:hover": { bgcolor: "#357ABD" },
//             }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//         </form>

//         {/* Success Notification */}
//         <Snackbar
//           open={openToast}
//           autoHideDuration={3000}
//           onClose={() => setOpenToast(false)}
//         >
//           <Alert onClose={() => setOpenToast(false)} severity="success">
//             Login Successful! Redirecting...
//           </Alert>
//         </Snackbar>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginForm;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks
// import { loginVendor } from "../../admin/redux/slice/accounts/authSlice.jsx"; // Import the loginVendor action
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Typography,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { getSubdomain } from "./subDomain"; // Assuming utils.js has the getSubdomain() function

// const LoginForm = () => {
//   const dispatch = useDispatch(); // Dispatch action
//   const navigate = useNavigate(); // Navigate after successful login
//   const { access, refresh, loading } = useSelector((state) => state.auth || {}); // Get state from redux

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [openToast, setOpenToast] = useState(false);
//   const [error, setError] = useState(""); // Added this to handle error messages

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password || !code) {
//       setError("All fields are required.");
//       return;
//     }

//     // Dispatch the loginVendor action
//     try {
//       await dispatch(loginVendor({ email, password, code })).unwrap();
//       navigate("/dashboard"); // Assuming you're redirecting after login
//     } catch (err) {
//       setError(err.message || "Login failed. Please try again.");
//     }
//   };
//   // Dynamically set the tenant's subdomain and dispatch the login action
//   //   const tenantSubdomain = getSubdomain();
//   //   dispatch(loginVendor({ email, password, code: tenantSubdomain }));
//   // };
//   console.log("login details is ", loginVendor); // Check if it logs a function or something else

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #4A90E2, #142850)",
//         padding: 2,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           width: { xs: "90%", sm: 400 },
//           textAlign: "center",
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           MyOffice
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           Manage your office seamlessly
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <TextField
//             label="Vendor Code"
//             fullWidth
//             margin="normal"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 2,
//               bgcolor: "#4A90E2",
//               "&:hover": { bgcolor: "#357ABD" },
//             }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//         </form>

//         {/* Success Notification */}
//         <Snackbar
//           open={openToast}
//           autoHideDuration={3000}
//           onClose={() => setOpenToast(false)}
//         >
//           <Alert onClose={() => setOpenToast(false)} severity="success">
//             Login Successful! Redirecting...
//           </Alert>
//         </Snackbar>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginForm;

// #============ vendor wise last ========================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Typography,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [openToast, setOpenToast] = useState(false);
//   const navigate = useNavigate();

//   // Redirect to dashboard if already logged in
//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     // || !code
//     if (!email || !password) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/vendor/login/",
//         new URLSearchParams({ email, password, code }),

//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//         // const response = await axios.post(
//         //   "https://backend.myofficeai.org/api/vendor/login/",
//         //   new URLSearchParams({ email, password, code }),
//         //   {
//         //     headers: {
//         //       "Content-Type": "application/x-www-form-urlencoded",
//         //     },
//         //     withCredentials: true, // only if you're setting session cookies across origins
//         //   }
//         // );
//       );

//       if (response.status === 200) {
//         localStorage.setItem("access_token", response.data.access);
//         localStorage.setItem("refresh_token", response.data.refresh);
//         setOpenToast(true);

//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1500);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Invalid credentials. Please check your details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #4A90E2, #142850)",
//         padding: 2,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           width: { xs: "90%", sm: 400 },
//           textAlign: "center",
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           MyOffice
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           Manage your office seamlessly
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <TextField
//             label="Vendor Code"
//             fullWidth
//             margin="normal"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 2,
//               bgcolor: "#4A90E2",
//               "&:hover": { bgcolor: "#357ABD" },
//             }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//         </form>

//         {/* Success Notification */}
//         <Snackbar
//           open={openToast}
//           autoHideDuration={3000}
//           onClose={() => setOpenToast(false)}
//         >
//           <Alert onClose={() => setOpenToast(false)} severity="success">
//             Login Successful! Redirecting...
//           </Alert>
//         </Snackbar>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginForm;

//#### it has multirendering issue while login.
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Typography,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [openToast, setOpenToast] = useState(false);
//   const navigate = useNavigate();

//   // Check if the user is already logged in when the component mounts
//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       navigate("/dashboard"); // Redirect to dashboard if already logged in
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     if (!email || !password || !code) {
//       setError("Email, password, and vendor code are required.");
//       setLoading(false);
//       return;
//     }

//     const payload = { email, password, code };

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/vendor/login/",
//         payload,
//         {
//           headers: {
//             // "Content-Type": "application/json",
//             "Content-Type": "application/x-www-form-urlencoded",
//             Accept: "application/json",
//           },
//           body: new URLSearchParams({
//             email,
//             password,
//             code,
//           }),
//         }
//       );

//       if (response.status === 200) {
//         // Store tokens in localStorage

//         localStorage.setItem("access_token", response.data.access);
//         localStorage.setItem("refresh_token", response.data.refresh);

//         // Redirect immediately to the dashboard without any delay
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setLoading(false);
//       if (err.response) {
//         setError(
//           err.response.data.message ||
//             "Invalid credentials. Please check your email, password, and vendor code."
//         );
//       } else {
//         setError("Cannot connect to the server. Please check your network.");
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "linear-gradient(to right, #4A90E2, #142850)",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           padding: 4,
//           width: 400,
//           textAlign: "center",
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           MyOffice
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           Manage your office seamlessly
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <TextField
//             label="Vendor Code"
//             fullWidth
//             margin="normal"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 2,
//               bgcolor: "#4A90E2",
//               "&:hover": { bgcolor: "#357ABD" },
//             }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//             {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
//             {/* {success && <p style={{ color: "green" }}>{success}</p>} */}
//           </Button>
//         </form>

//         <Snackbar
//           open={openToast}
//           autoHideDuration={3000}
//           onClose={() => setOpenToast(false)}
//         >
//           <Alert onClose={() => setOpenToast(false)} severity="success">
//             Login Successful! Redirecting...
//           </Alert>
//         </Snackbar>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [code, setCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [openToast, setOpenToast] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (localStorage.getItem('access_token')) {
//             navigate('/dashboard');
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMessage('');
//         setLoading(true);

//         const payload = {
//             username: email, // Ensure this matches API expectations
//             password,
//             code
//         };

//         if (!email || !password || !code) {
//             setError('Email, password, and vendor name are required.');
//             setLoading(false);
//             return;
//         }

//         try {
//             console.log("Sending payload:", payload);
//             const response = await axios.post("http://localhost:8000/api/vendor/login/", payload, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 }
//             });

//             console.log("API Response:", response.data);

//             if (response.status === 200) {
//                 localStorage.setItem("access_token", response.data.access);
//                 localStorage.setItem("refresh_token", response.data.refresh);

//                 setSuccessMessage("Login successful!");
//                 setOpenToast(true);
//                 navigate("/dashboard");

//                 setEmail('');
//                 setPassword('');
//                 setCode('');
//             }
//         } catch (err) {
//             setLoading(false);
//             console.error("API Error:", err);

//             if (err.response) {
//                 if (err.response.status === 400) {
//                     setError(err.response.data.message || "Invalid credentials. Please check your email, password, and vendor name.");
//                 } else if (err.response.status === 401) {
//                     setError("Unauthorized: Incorrect email, password, or vendor name.");
//                 } else {
//                     setError("An error occurred. Please try again later.");
//                 }
//             } else {
//                 setError("Cannot connect to the server. Please check your network.");
//             }
//         }
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <h2>Login</h2>
//             {error && <Alert severity="error">{error}</Alert>}
//             {successMessage && <Alert severity="success">{successMessage}</Alert>}

//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Email"
//                     fullWidth
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <TextField
//                     label="code"
//                     fullWidth
//                     margin="normal"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     style={{ marginTop: '20px' }}
//                     disabled={loading}
//                 >
//                     {loading ? <CircularProgress size={24} color="secondary" /> : "Login"}
//                 </Button>
//             </form>

//             <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
//                 <Alert onClose={() => setOpenToast(false)} severity="success">
//                     Login Successful! Redirecting...
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default LoginForm;

//lsastt
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [code, setCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [openToast, setOpenToast] = useState(false); // State to control the toast visibility
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (localStorage.getItem('access_token')) {
//             navigate('/dashboard');
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMessage('');
//         setLoading(true); // Show loading spinner during the login request
//         const payload = {
//           code: code,  // Ensure this value is correct
//           username: email,   // Ensure this value is correct
//           password: password,   // Ensure this value is correct
//         };
//         console.log('payload',payload)
//         if (!email || !password || !code) {
//             setError('Email, password, and vendor name are required.');
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:8000/api/merchant/login/", {
//                 email,
//                 password,
//                 code
//                 });
//             if (response.status === 200) {
//                     // If login is successful, save the access and refresh tokens
//                     localStorage.setItem("access_token", response.data.access);
//                     localStorage.setItem("refresh_token", response.data.refresh);

//      // Redirect to dashboard after successful login
//             navigate("/dashboard");
//             setSuccessMessage("Login successful!");
//             setOpenToast(true);
//             // Clear the form fields after login
//             setEmail('');
//             setPassword('');
//             setLoading(false);}
//         } catch (err) {
//             setLoading(false);

//             // Handle different error cases
//             if (err.response && err.response.status === 400) {
//                 setError('Invalid credentials. Please check your email, password, and vendor name.');
//             } else {
//                 setError('An error occurred. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <h2>Login</h2>
//             {error && <Alert severity="error">{error}</Alert>}
//             {successMessage && <Alert severity="success">{successMessage}</Alert>}

//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Email"
//                     fullWidth
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <TextField
//                     label="Vendor Name"
//                     fullWidth
//                     margin="normal"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     style={{ marginTop: '20px' }}
//                     disabled={loading}
//                 >
//                     {loading ? <CircularProgress size={24} color="secondary" /> : "Login"}
//                 </Button>
//             </form>

//             <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
//                 <Alert onClose={() => setOpenToast(false)} severity="success">
//                     Login Successful! Redirecting...
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default LoginForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [code, setCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [openToast, setOpenToast] = useState(false); // State to control the toast visibility
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError("");
//       setSuccessMessage("");
//       setLoading(true); // Show loading spinner during the login request

//       if (!email || !password || !code) {
//         setError("Both name and password are required.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.post("http://localhost:8000/api/merchant/login/", {
//           email,
//           password,
//           code
//         });

//         // If login is successful, save the access and refresh tokens
//         localStorage.setItem("access_token", response.data.access);
//         localStorage.setItem("refresh_token", response.data.refresh);

//         setSuccessMessage("Login successful!");
//         setOpenToast(true); // Show the toast message

//         // Redirect to dashboard after successful login
//         navigate("/dashboard");

//         // Clear the form fields after login
//         setEmail("");
//         setPassword("");
//         setLoading(false);
//       } catch (err) {
//         setError("Invalid credentials. Please try again.");
//         setLoading(false);
//       }
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <h2>Login</h2>
//             {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="email"
//                     fullWidth
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <TextField
//                     label="Vendor Name"
//                     fullWidth
//                     margin="normal"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                 />

//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     style={{ marginTop: '20px' }}
//                     disabled={loading}
//                 >
//                     {loading ? <CircularProgress size={24} color="secondary" /> : "Login"}
//                 </Button>
//             </form>

//             <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
//                 <Alert onClose={() => setOpenToast(false)} severity="success">
//                     Login Successful! Redirecting...
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default LoginForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Container, Box, Typography, TextField, Button, Grid, Alert, CircularProgress, Snackbar } from "@mui/material";
// import MuiAlert from '@mui/material/Alert';

// const LoginForm = () => {
//   const [name, setEmail] = useState("");
//   const [password, setPassword] = useState("");
// const [error, setError] = useState("");
// const [successMessage, setSuccessMessage] = useState("");
// const [loading, setLoading] = useState(false);
// const [openToast, setOpenToast] = useState(false); // State to control the toast visibility
// const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect to dashboard if already logged in
//     if (localStorage.getItem("access_token")) {
//       navigate("/dashboard"); // Redirect to the dashboard if the user is already logged in
//     }
//   }, [navigate]);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setSuccessMessage("");
//   setLoading(true); // Show loading spinner during the login request

//   if (!name || !password) {
//     setError("Both name and password are required.");
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await axios.post("http://localhost:8000/api/login/", {
//       name,
//       password,
//     });

//     // If login is successful, save the access and refresh tokens
//     localStorage.setItem("access_token", response.data.access);
//     localStorage.setItem("refresh_token", response.data.refresh);

//     setSuccessMessage("Login successful!");
//     setOpenToast(true); // Show the toast message

//     // Redirect to dashboard after successful login
//     navigate("/dashboard");

//     // Clear the form fields after login
//     setEmail("");
//     setPassword("");
//     setLoading(false);
//   } catch (err) {
//     setError("Invalid credentials. Please try again.");
//     setLoading(false);
//   }
// };

//   // Close the toast
//   const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 5 }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           backgroundColor: "background.paper",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Welcome to My Office
//         </Typography>
//         <Typography variant="h6" color="textSecondary" gutterBottom>
//           Please login first
//         </Typography>

//         {error && <Alert severity="error" sx={{ width: "100%", mb: 2 }}>{error}</Alert>}
//         {successMessage && <Alert severity="success" sx={{ width: "100%", mb: 2 }}>{successMessage}</Alert>}

//         <form onSubmit={handleSubmit} style={{ width: "100%" }}>
//           <TextField
//             label="Email"
//             type="name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ padding: "10px", fontSize: "16px" }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} color="secondary" /> : "Log In"}
//             </Button>
//           </Box>
//         </form>
//       </Box>

//       <Snackbar
//         open={openToast}
//         autoHideDuration={3000} // Toast visible for 3 seconds
//         onClose={handleCloseToast}
//       >
//         <MuiAlert onClose={handleCloseToast} severity="success" sx={{ width: "100%" }}>
//           {successMessage || "Login Successful! Redirecting..."}
//         </MuiAlert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default LoginForm;

// ## -------- dashboard login and work greatestDurationDenominator./

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/login.css";  // If you have a CSS file for styling

// const LoginForm = () => {
//   const [name, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect to dashboard if already logged in
//     if (localStorage.getItem("access_token")) {
//       navigate("/dashboard"); // Redirect to the dashboard if the user is already logged in
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     if (!name || !password) {
//       setError("Both name and password are required.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/api/login/", {
//         name,
//         password,
//       });

//       // If login is successful, save the access and refresh tokens
//       localStorage.setItem("access_token", response.data.access);
//       localStorage.setItem("refresh_token", response.data.refresh);

//       setSuccessMessage("Login successful!");

//       // Redirect to dashboard after successful login
//       navigate("/dashboard");

//       // Clear the form fields after login
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>

//       {error && <p className="error-message">{error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Email</label>
//           <input
//             type="name"
//             id="name"
//             value={name}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
