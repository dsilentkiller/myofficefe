// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Grid, Box, Typography, Alert, IconButton } from "@mui/material";
// import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import { setAdminToken, setMembersToken } from "../redux/slice/user/UserSlice";
// import "../css/login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   if (!role) {
//   //     setError("Please select a role.");
//   //     return;
//   //   }
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:8000/api/accounts/login/", // API endpoint
//   //       { email: "admin@admin.com", password: "admin" }
//   //     );

//   //     const { access, refresh, role } = response.data; // Assuming the role is returned here
//   //     console.log.response('hello',response.data)
//   //     // Save tokens in local storage
//   //     localStorage.setItem("access_token", access);
//   //     localStorage.setItem("refresh_token", refresh);

//   //     // Dispatch tokens based on role
//   //     if (role === "admin") {
//   //       dispatch(setAdminToken(access));
//   //       navigate("/admin"); // Redirect to admin dashboard
//   //     } else if (role === "member") {
//   //       dispatch(setMembersToken(access));
//   //       navigate("/crm"); // Redirect to member dashboard
//   //     } else {
//   //       setError("Invalid role. Please contact support.");
//   //     }
//   //   } catch (err) {
//   //     setError("Invalid credentials. Please try again.");
//   //   }
//   // };
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Check if role is selected
//     if (!role) {
//       setError("Please select a role.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/accounts/login/", // API endpoint
//         { email, password, role }
//       );

//       // Log the response for debugging
//       console.log("Server Response:", response.data);

//       // Check if login was successful
//       if (response.data.success) {
//         const { access, refresh, role } = response.data.token; // Extract tokens and role

//         // Save tokens to local storage
//         localStorage.setItem("access_token", access);
//         localStorage.setItem("refresh_token", refresh);

//         // Dispatch the tokens based on the role
//         if (role === "admin") {
//           dispatch(setAdminToken(access));
//           navigate("/admin"); // Redirect to admin dashboard
//         } else if (role === "member") {
//           dispatch(setMembersToken(access));
//           navigate("/crm"); // Redirect to member dashboard
//         } else {
//           setError("Invalid role. Please contact support.");
//         }
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login Error:", err);
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#f4f4f9",
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: "white",
//           padding: "30px",
//           borderRadius: "8px",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           width: "100%",
//           maxWidth: "400px",
//         }}
//       >
//         <Typography variant="h5" align="center" gutterBottom>
//           Welcome Back, MyOffice!
//         </Typography>
//         <form onSubmit={handleLogin}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 variant="outlined"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <IconButton>
//                       <EmailIcon />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Password"
//                 variant="outlined"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <IconButton>
//                       <LockIcon />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Grid>
//             {/* <Grid item xs={12}>
//               <div className="form-group">
//                 <label htmlFor="role">Role:</label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)} // Handle role change
//                   className="form-control"
//                   required
//                 >
//                   <option value="">Select role</option>
//                   <option value="member">Member</option>
//                   <option value="admin">admin</option>
//                 </select>
//               </div>
//             </Grid> */}
//             {error && (
//               <Grid item xs={12}>
//                 <Alert severity="error">{error}</Alert>
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <Button
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 sx={{ padding: "12px" }}
//               >
//                 Login
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

// //ROLE ASSIGN
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { TextField, Button, Grid, Box, Typography, Alert, IconButton } from "@mui/material";
// // import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
// // import { useDispatch } from "react-redux";
// // import { setAdminToken, setMembersToken } from "../redux/slice/user/UserSlice";
// // import "../css/login.css";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [role, setRole] = useState(""); // State for role selection
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

//     // if (!role) {
//     //   setError("Please select a role.");
//     //   return;
//     // }

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8000/api/login/", // Replace with your API endpoint
// //         { email, password, role } // Include the role in the request payload
// //       );

// //       const { access, refresh, role: userRole } = response.data;

// //       // Save tokens in local storage
// //       localStorage.setItem("access_token", access);
// //       localStorage.setItem("refresh_token", refresh);

// //       // Dispatch tokens based on role
// //       if (userRole === "admin") {
// //         dispatch(setAdminToken(access));
// //         navigate("/admin"); // Redirect to admin dashboard
// //       } else if (userRole === "member") {
// //         dispatch(setMembersToken(access));
// //         navigate("/crm"); // Redirect to teacher/member dashboard
// //       } else {
// //         setError("Invalid role. Please contact support.");
// //       }
// //     } catch (err) {
// //       setError("Invalid credentials. Please try again.");
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         minHeight: "100vh",
// //         backgroundColor: "#f4f4f9",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           backgroundColor: "white",
// //           padding: "30px",
// //           borderRadius: "8px",
// //           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
// //           width: "100%",
// //           maxWidth: "400px",
// //         }}
// //       >
// //         <Typography variant="h5" align="center" gutterBottom>
// //           Welcome Back, MyOffice!
// //         </Typography>
// //         <form onSubmit={handleLogin}>
// //           <Grid container spacing={2}>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Email"
// //                 variant="outlined"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <IconButton>
// //                       <EmailIcon />
// //                     </IconButton>
// //                   ),
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Password"
// //                 variant="outlined"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <IconButton>
// //                       <LockIcon />
// //                     </IconButton>
// //                   ),
// //                 }}
// //               />
// //             </Grid>
//             // <Grid item xs={12}>
//             //   <div className="form-group">
//             //     <label htmlFor="role">Role:</label>
//             //     <select
//             //       id="role"
//             //       name="role"
//             //       value={role}
//             //       onChange={(e) => setRole(e.target.value)} // Handle role change
//             //       className="form-control"
//             //       required
//             //     >
//             //       <option value="">Select role</option>
//             //       <option value="member">Member</option>
//             //       <option value="admin">Admin</option>
//             //     </select>
//             //   </div>
//             // </Grid>
// //             {error && (
// //               <Grid item xs={12}>
// //                 <Alert severity="error">{error}</Alert>
// //               </Grid>
// //             )}
// //             <Grid item xs={12}>
// //               <Button
// //                 fullWidth
// //                 type="submit"
// //                 variant="contained"
// //                 color="primary"
// //                 sx={{ padding: "12px" }}
// //               >
// //                 Login
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         </form>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Login;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "../css/login.css";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8000/api/login/", // API endpoint for login
// //         { email, password }
// //       );

// //       // If login is successful, save the token in localStorage
// //       localStorage.setItem("access_token", response.data.access);
// //       localStorage.setItem("refresh_token", response.data.refresh);

// //       // Redirect to a protected route or dashboard
// //       navigate.push("/dashboard");
// //     } catch (error) {
// //       setError("Invalid credentials. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <p>hello</p>
// //       <div className="login-form">
// //         <h2 className="login-title">Welcome Back!</h2>
// //         <form onSubmit={handleLogin}>
// //           <div className="form-group">
// //             <label>Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label>Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           {error && <p style={{ color: "red" }}>{error}</p>}
// //           <button type="submit">Login</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
