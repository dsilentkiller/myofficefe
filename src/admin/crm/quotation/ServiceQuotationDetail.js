import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography, CircularProgress, Grid } from "@mui/material";
import axios from "axios";

const ServiceQuotationDetail = () => {
  const { quotationId } = useParams(); // Get the quotationId from the URL
  const [serviceQuotation, setServiceQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceQuotation = async () => {
      try {
        const response = await axios.get(`/api/service-quotations/${quotationId}`);
        setServiceQuotation(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the service quotation data.");
        setLoading(false);
      }
    };

    fetchServiceQuotation();
  }, [quotationId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!serviceQuotation) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Service Quotation not found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Service Quotation Detail
          </Typography>

          <Typography variant="h6" gutterBottom>
            Enquiry Name: {serviceQuotation.enquiry_name.enquiry_name || "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Quotation Date: {new Date(serviceQuotation.quotation_date).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Tax Percentage: {serviceQuotation.tax_percentage}%
          </Typography>
          <Typography variant="h6" gutterBottom>
            Discount Percentage: {serviceQuotation.discount_percentage}%
          </Typography>

          {/* Render Services */}
          <Typography variant="h6" gutterBottom>
            Services:
          </Typography>
          <Grid container spacing={2}>
            {serviceQuotation.services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Paper elevation={2} sx={{ padding: 2 }}>
                  <Typography variant="h6">{service.service_name}</Typography>
                  <Typography variant="body2">{service.service_description}</Typography>
                  <Typography variant="body2">Price: ${service.service_price}</Typography>
                  <Typography variant="body2">Quantity: {service.quantity}</Typography>
                  <Typography variant="body2" color="primary">
                    Total: ${(service.service_price * service.quantity).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Display Totals */}
          <Box mt={4} textAlign="center">
            <Typography variant="h6">Subtotal: ${serviceQuotation.subtotal.toFixed(2)}</Typography>
            <Typography variant="h6">Net Amount: ${serviceQuotation.net_amount.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ServiceQuotationDetail;
