
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box, Typography, Alert, IconButton } from "@mui/material";
import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/", // API endpoint for login
        { email, password }
      );

      // If login is successful, save the token in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect to a protected route or dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back, Myoffice!
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <EmailIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <LockIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ padding: "12px" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const history = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/login/", // API endpoint for login
//         { email, password }
//       );

//       // If login is successful, save the token in localStorage
//       localStorage.setItem("access_token", response.data.access);
//       localStorage.setItem("refresh_token", response.data.refresh);

//       // Redirect to a protected route or dashboard
//       history.push("/dashboard");
//     } catch (error) {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2 className="login-title">Welcome Back!</h2>
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
