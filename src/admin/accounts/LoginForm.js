import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // || !code
    if (!email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/vendor/login/",
        new URLSearchParams({ email, password, code }),

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        setOpenToast(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

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

        {/* Success Notification */}
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
