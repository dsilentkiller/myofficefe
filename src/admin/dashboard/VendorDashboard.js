import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Implement Multi-Vendor Dashboards
// Once the login is successful, each vendor can have their own dashboard page where their data is displayed (CRM, HRM, Clients).
const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');
  const vendorName = localStorage.getItem('vendor_name');

  useEffect(() => {
    if (!accessToken) {
      navigate("/login"); // Redirect if user is not logged in
      return;
    }

    const fetchVendorData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vendor/dashboard/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            vendor_name: vendorName, // Send the vendor_name to identify the correct vendor's data
          },
        });
        setVendorData(response.data);
      } catch (error) {
        console.error("Error fetching vendor data", error);
      }
    };

    fetchVendorData();
  }, [accessToken, vendorName, navigate]);

  return (
    <div>
      <Typography variant="h4">Welcome to {vendorName}'s Dashboard</Typography>
      {vendorData ? (
        <Box>
          {/* Render vendor-specific data */}
          <Typography variant="h6">CRM Data: {vendorData.crmCount}</Typography>
          <Typography variant="h6">HR Data: {vendorData.hrCount}</Typography>
          <Typography variant="h6">Client Data: {vendorData.clientsCount}</Typography>
        </Box>
      ) : (
        <Typography variant="body1">Loading vendor data...</Typography>
      )}
    </div>
  );
};

export default VendorDashboard;
