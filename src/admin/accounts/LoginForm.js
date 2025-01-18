import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Grid, Alert, CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false); // State to control the toast visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (localStorage.getItem("access_token")) {
      navigate("/dashboard"); // Redirect to the dashboard if the user is already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true); // Show loading spinner during the login request

    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      // If login is successful, save the access and refresh tokens
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      setSuccessMessage("Login successful!");
      setOpenToast(true); // Show the toast message

      // Redirect to dashboard after successful login
      navigate("/dashboard");

      // Clear the form fields after login
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  // Close the toast
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to My Office
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Please login first
        </Typography>

        {error && <Alert severity="error" sx={{ width: "100%", mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ width: "100%", mb: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: "10px", fontSize: "16px" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="secondary" /> : "Log In"}
            </Button>
          </Box>
        </form>
      </Box>

      <Snackbar
        open={openToast}
        autoHideDuration={3000} // Toast visible for 3 seconds
        onClose={handleCloseToast}
      >
        <MuiAlert onClose={handleCloseToast} severity="success" sx={{ width: "100%" }}>
          {successMessage || "Login Successful! Redirecting..."}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;


// ## -------- dashboard login and work greatestDurationDenominator./

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/login.css";  // If you have a CSS file for styling

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
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

//     if (!email || !password) {
//       setError("Both email and password are required.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/api/login/", {
//         email,
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
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
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

