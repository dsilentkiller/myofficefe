// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Paper, Typography, CircularProgress, Grid } from "@mui/material";
// import axios from "axios";

// const ServiceQuotationDetail = () => {
//   const { quotationId } = useParams(); // Get the quotationId from the URL
//   const [serviceQuotation, setServiceQuotation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServiceQuotation = async () => {
//       try {
//         const response = await axios.get(`/api/service-quotations/${quotationId}`);
//         setServiceQuotation(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch the service quotation data.");
//         setLoading(false);
//       }
//     };

//     fetchServiceQuotation();
//   }, [quotationId]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <Typography variant="h6" color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!serviceQuotation) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <Typography variant="h6">Service Quotation not found.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Service Quotation Detail
//           </Typography>

//           <Typography variant="h6" gutterBottom>
//             Enquiry Name: {serviceQuotation.enquiry_name.enquiry_name || "N/A"}
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             Quotation Date: {new Date(serviceQuotation.quotation_date).toLocaleDateString()}
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             Tax Percentage: {serviceQuotation.tax_percentage}%
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             Discount Percentage: {serviceQuotation.discount_percentage}%
//           </Typography>

//           {/* Render Services */}
//           <Typography variant="h6" gutterBottom>
//             Services:
//           </Typography>
//           <Grid container spacing={2}>
//             {serviceQuotation.services.map((service) => (
//               <Grid item xs={12} sm={6} md={4} key={service.id}>
//                 <Paper elevation={2} sx={{ padding: 2 }}>
//                   <Typography variant="h6">{service.service_name}</Typography>
//                   <Typography variant="body2">{service.service_description}</Typography>
//                   <Typography variant="body2">Price: ${service.service_price}</Typography>
//                   <Typography variant="body2">Quantity: {service.quantity}</Typography>
//                   <Typography variant="body2" color="primary">
//                     Total: ${(service.service_price * service.quantity).toFixed(2)}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Display Totals */}
//           <Box mt={4} textAlign="center">
//             <Typography variant="h6">Subtotal: ${serviceQuotation.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Net Amount: ${serviceQuotation.net_amount.toFixed(2)}</Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ServiceQuotationDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { fetchServiceQuotationById } from "../../../../redux/slice/admin/crm/quotationSlice";

const ServiceQuotationDetail = () => {
  const { id } = useParams(); // Access quotation ID from the URL
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuotationDetails = async () => {
      try {
        const response = await fetchServiceQuotationById(id); // Fetch quotation by ID
        setQuotation(response); // Set quotation data to state
      } catch (error) {
        console.error("Error fetching service quotation details", error);
      } finally {
        setLoading(false);
      }
    };

    getQuotationDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quotation) {
    return <div>Quotation not found</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>Service Quotation Details</Typography>

        <Typography variant="h6">Customer Name: {quotation.customer_name}</Typography>
        <Typography variant="h6">Enquiry Name: {quotation.enquiry_name}</Typography>
        <Typography variant="h6">Quotation Date: {quotation.quotation_date}</Typography>
        <Typography variant="h6">Tax Percentage: {quotation.tax_percentage}%</Typography>
        <Typography variant="h6">Discount Percentage: {quotation.discount_percentage}%</Typography>
        <Typography variant="h6">Total Amount: ${quotation.total_amount}</Typography>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotation.services.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.service_name}</TableCell>
                  <TableCell>{service.quantity}</TableCell>
                  <TableCell>${service.price}</TableCell>
                  <TableCell>${service.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>Back</Button>
      </Paper>
    </div>
  );
};

export default ServiceQuotationDetail;
