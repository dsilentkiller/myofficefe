import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirect user to login page
    navigate.push("/login");
  };

  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
