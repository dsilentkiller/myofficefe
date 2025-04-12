import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
const currentDate = new Date().toISOString().split('T')[0]; // Formats date as 'YYYY-MM-DD'

const ServiceQuotation = ({ services, setServices, includeTax, tax_percentage, includeDiscount, discount_percentage }) => {
  const addServiceRow = () => {
    setServices([...services, { service_name: "", service_description: "", service_price: 0, quantity: 1 }]);
  };
  const updateService = (index, key, value) => {
    const updatedServices = [...services];
    updatedServices[index][key] = key === 'service_price' || key === 'quantity' ? parseFloat(value) || 0 : value;

    // Ensure the values are always valid
    if (key === 'service_price' && isNaN(updatedServices[index][key])) {
      updatedServices[index][key] = 0; // Default to 0 if invalid
    }

    if (key === 'quantity' && isNaN(updatedServices[index][key])) {
      updatedServices[index][key] = 1; // Default to 1 if invalid
    }

    setServices(updatedServices);
  };
  // console.log("Services before validation:", formData.services);

  // const updateService = (index, key, value) => {
  //   const updatedServices = [...services];
  //   updatedServices[index][key] = key === 'service_price' || key === 'quantity' ? parseFloat(value) || 0 : value;
  //   setServices(updatedServices);
  // };

  const calculateSubtotalService = () => {
    return services.reduce((acc, service) => acc + service.service_price * service.quantity, 0);
  };

  const calculateTotalService = () => {
    let subtotal = calculateSubtotalService();
    let tax = includeTax ? (subtotal * tax_percentage) / 100 : 0;
    let discount = includeDiscount ? (subtotal * discount_percentage) / 100 : 0;
    return subtotal + tax - discount;
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Service Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Cost (USD)</strong></TableCell>
              <TableCell><strong>Total (USD)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={service.service_name}
                    onChange={(e) => updateService(index, "service_name", e.target.value)}
                    placeholder="Enter the name of the service"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={service.service_description}
                    onChange={(e) => updateService(index, "service_description", e.target.value)}
                    placeholder="Provide a brief description of the service"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={service.quantity}
                    onChange={(e) => updateService(index, "quantity", e.target.value)}
                    placeholder="Enter the quantity"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={service.service_price}
                    onChange={(e) => updateService(index, "service_price", e.target.value)}
                    placeholder="Enter the price per service"
                  />
                </TableCell>
                <TableCell>
                  ${(service.quantity * service.service_price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Button variant="outlined" onClick={addServiceRow}>
                  Add Service
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


    </Box>
  );
};

export default ServiceQuotation;


{/* Display Total Calculation */}
      {/* <Box mt={4}>
        <Typography variant="h6">Subtotal: ${calculateSubtotalService().toFixed(2)}</Typography>
        {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotalService() * (tax_percentage / 100)).toFixed(2)}</Typography>}
        {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotalService() * (discount_percentage / 100)).toFixed(2)}</Typography>}
        <Typography variant="h5">Total: ${calculateTotalService().toFixed(2)}</Typography>
      </Box> */}


// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Paper,
// } from "@mui/material";

// const ServiceQuotation = ({ services, setServices, includeTax, tax_percentage, includeDiscount, discount_percentage }) => {
//   const addServiceRow = () => {
//     setServices([...services, { service_name: "", service_description: "", service_price: 0, quantity: 1 }]);
//   };

//   // const updateService = (index, field, value) => {
//   //   const updatedServices = [...services];
//   //   updatedServices[index][field] = field === "service_price" || field === "quantity" ? parseFloat(value) || 0 : value;
//   //   setServices(updatedServices);
//   // };
//   const updateService = (index, key, value) => {
//     const updatedServices = [...services];
//     updatedServices[index][key] = value;
//     setServices(updatedServices);
//   };

//   const calculateSubtotalService = () => {
//     return services.reduce((acc, service) => acc + service.service_price * service.quantity, 0);
//   };

//   const calculateTotalService = () => {
//     let subtotal = calculateSubtotalService();
//     let tax = includeTax ? (subtotal * tax_percentage) / 100 : 0;
//     let discount = includeDiscount ? (subtotal * discount_percentage) / 100 : 0;
//     return subtotal + tax - discount;
//   };

//   return (
//     <Box mt={4}>
//       <Typography variant="h5" gutterBottom>
//         Service Details
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Description</strong></TableCell>
//               <TableCell><strong>Quantity</strong></TableCell>
//               <TableCell><strong>Cost (USD)</strong></TableCell>
//               <TableCell><strong>Total (USD)</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {services.map((service, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <TextField
//                     fullWidth
//                     value={service.service_name}
//                     onChange={(e) => updateService(index, "service_name", e.target.value)}
//                     placeholder="Enter service/feature name"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     fullWidth
//                     value={service.service_description}
//                     onChange={(e) => updateService(index, "service_description", e.target.value)}
//                     placeholder="Description"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     value={service.quantity}
//                     onChange={(e) => updateService(index, "quantity", e.target.value)}
//                     placeholder="Quantity"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     value={service.service_price}
//                     onChange={(e) => updateService(index, "service_price", e.target.value)}
//                     placeholder="Price"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   ${(service.quantity * service.service_price).toFixed(2)}
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell colSpan={5} align="center">
//                 <Button variant="outlined" onClick={addServiceRow}>
//                   Add Service
//                 </Button>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Display Total Calculation */}
//       {/* <Box mt={4}>
//         <Typography variant="h6">Subtotal: ${calculateSubtotalService().toFixed(2)}</Typography>
//         {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotalService() * (tax_percentage / 100)).toFixed(2)}</Typography>}
//         {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotalService() * (discount_percentage / 100)).toFixed(2)}</Typography>}
//         <Typography variant="h5">Total: ${calculateTotalService().toFixed(2)}</Typography>
//       </Box> */}
//     </Box>
//   );
// };

// export default ServiceQuotation;




// //service related quotation form

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const ServiceQuotationForm = () => {
//   // State for ServicequotationForm type (Business or service)
//   const [ServicequotationFormType, setServiceQuotationFormType] = useState("business");

//   // Sample data for services/services
//   const items = [
//     { name: "Website Development", description: "Complete website development package.", cost: 1200 },
//     { name: "E-commerce Platform", description: "Online store development.", cost: 2500 },
//     { name: "SEO Services", description: "Search engine optimization for your business.", cost: 800 },
//     { name: "Laptops", description: "High-performance laptops for office use.", cost: 1000 },
//     { name: "Printers", description: "Multifunction printers for business.", cost: 200 },
//   ];

//   // Function to calculate total cost
//   const calculateTotal = () => items.reduce((acc, item) => acc + item.cost, 0);

//   return (
//     <Box p={4} maxWidth="800px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           {/* Header Section */}
//           <Typography variant="h4" align="center" gutterBottom>
//             ServiceQuotationForm
//           </Typography>
//           <Typography variant="body1" align="center" gutterBottom>
//             Date: <strong>{new Date().toLocaleDateString()}</strong>
//           </Typography>

//           {/* ServiceQuotationForm Type Selector */}
//           <Box mt={3} mb={3}>
//             <FormControl fullWidth>
//               <InputLabel id="ServicequotationForm-type-label">ServiceQuotationForm Type</InputLabel>
//               <Select
//                 labelId="ServicequotationForm-type-label"
//                 value={ServicequotationFormType}
//                 onChange={(e) => setServiceQuotationFormType(e.target.value)}
//                 label="ServiceQuotationForm Type"
//               >
//                 <MenuItem value="business">Business Services</MenuItem>
//                 <MenuItem value="service">services</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Sender and Recipient Details */}
//           <Box mt={4} mb={3}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography variant="h6">From:</Typography>
//                 <Typography>Paaru Rawal</Typography>
//                 <Typography>Software Engineer | AI Enthusiast</Typography>
//                 <Typography>Contact: +977 9828889263</Typography>
//                 <Typography>Email: paarurawal@gmail.com</Typography>
//                 <Typography>Location: AB Dev Factory, Lalitpur Nakhu</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="h6">To:</Typography>
//                 <TextField fullWidth label="Client Name" variant="outlined" />
//                 <TextField fullWidth label="Company Name" variant="outlined" sx={{ mt: 2 }} />
//                 <TextField fullWidth label="Contact Information" variant="outlined" sx={{ mt: 2 }} />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider />

//           {/* ServiceQuotationForm Breakdown */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               {ServicequotationFormType === "business" ? "Service Details" : "service Details"}
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Name</strong></TableCell>
//                     <TableCell><strong>Description</strong></TableCell>
//                     <TableCell><strong>Cost (USD)</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {items.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell>{item.description}</TableCell>
//                       <TableCell>${item.cost}</TableCell>
//                     </TableRow>
//                   ))}
//                   <TableRow>
//                     <TableCell colSpan={2}><strong>Total</strong></TableCell>
//                     <TableCell><strong>${calculateTotal()}</strong></TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>

//           {/* Terms & Conditions */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               Terms & Conditions
//             </Typography>
//             <Typography variant="body2">
//               <ol>
//                 <li>A 50% upfront payment is required to initiate the project.</li>
//                 <li>The remaining 50% is due upon project/service delivery.</li>
//                 <li>Additional requirements requested beyond the agreed scope will be charged separately.</li>
//               </ol>
//             </Typography>
//           </Box>

//           {/* Acceptance Section */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               Acceptance
//             </Typography>
//             <Typography variant="body1">
//               If you agree to the terms and ServicequotationForm, please sign below and return a copy to us.
//             </Typography>
//             <Box mt={2}>
//               <Typography variant="body1">Client Name: ________________________</Typography>
//               <Typography variant="body1">Signature: __________________________</Typography>
//               <Typography variant="body1">Date: ______________________________</Typography>
//             </Box>
//           </Box>

//           {/* Footer */}
//           <Box mt={4} textAlign="center">
//             <Button variant="contained" color="primary" onClick={() => alert("ServiceQuotationForm Sent!")}>
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ServiceQuotationForm;

// //////////////

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Switch,
//   FormControlLabel,
// } from "@mui/material";

// const QuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [tax_percentage, setTax_percentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discount_percentage, setDiscount_percentage] = useState(0);
//   const [services, setServices] = React.useState([
//     { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//     { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//   ]);
//   const [services, setservices] = useState([
//     { name: "", quantity: 1, price: 0 },
//   ]);
// // Sample data for services/services
// const items = [
//   { name: "Website Development", description: "Complete website development package.", cost: 1200 },
//   { name: "E-commerce Platform", description: "Online store development.", cost: 2500 },
//   { name: "SEO Services", description: "Search engine optimization for your business.", cost: 800 },
//   { name: "Laptops", description: "High-performance laptops for office use.", cost: 1000 },
//   { name: "Printers", description: "Multifunction printers for business.", cost: 200 },
// ];

//   // Add a new service row
//   const addserviceRow = () => {
//     setservices([...services, { name: "", quantity: 1, price: 0 }]);
//   };
//     // Add a new service row
//   const addServiceRow = () => {
//       setServices([...services, { name: "", description: 1, price: 0 }]);
//     };

//   // Update service details
//   const updateservice = (index, field, value) => {
//     const updatedservices = [...services];
//     updatedservices[index][field] = value;
//     setservices(updatedservices);
//   };
//     // Update service details
//     const updateService = (index, field, value) => {
//       const updatedServices = [...services];
//       updatedServices[index][field] = value;
//       setServices(updatedServices);
//     };


//   // Calculate subtotal prodict
//   const calculateSubtotalservice = () => {
//     return services.reduce((acc, service) => acc + service.quantity * service.price, 0);
//   };
//     // Calculate subtotal
//     const calculateSubtotalService = () => {
//       return services.reduce((acc, service) => acc +  service.price, 0);
//     };

//   // Calculate total service
//   const calculateTotalservice = () => {
//     let total = calculateSubtotalservice();
//     if (includeTax) total += (total * tax_percentage) / 100;
//     if (includeDiscount) total -= (total * discount_percentage) / 100;
//     return total.toFixed(2);
//   };
//   // Calculate total service
//   const calculateTotalService = () => {
//     let total = calculateSubtotalService();
//     if (includeTax) total += (total * tax_percentage) / 100;
//     if (includeDiscount) total -= (total * discount_percentage) / 100;
//     return total.toFixed(2);
//   };
//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           {/* Header Section */}
//           <Typography variant="h4" align="center" gutterBottom>
//             QuotationForm
//           </Typography>
//           <Typography variant="body1" align="center" gutterBottom>
//             Date: <strong>{new Date().toLocaleDateString()}</strong>
//           </Typography>

//           {/* QuotationForm Type Selector */}
//           <Box mt={3} mb={3}>
//             <FormControl fullWidth>
//               <InputLabel id="quotation-type-label">QuotationForm Type</InputLabel>
//               <Select
//                 labelId="quotation-type-label"
//                 value={quotationType}
//                 onChange={(e) => setQuotationType(e.target.value)}
//                 label="QuotationForm Type"
//               >
//                 <MenuItem value="service">Business Services</MenuItem>
//                 <MenuItem value="service">services</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Recipient Details */}
//           <Box mt={4} mb={3}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography variant="h6">From:</Typography>
//                 <Typography>Paaru Rawal</Typography>
//                 <Typography>Software Engineer | AI Enthusiast</Typography>
//                 <Typography>Contact: +977 9828889263</Typography>
//                 <Typography>Email: paarurawal@gmail.com</Typography>
//                 <Typography>Location: AB Dev Factory, Lalitpur Nakhu</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="h6">To:</Typography>
//                 <TextField fullWidth label="Client Name" variant="outlined" />
//                 <TextField fullWidth label="Company Name" variant="outlined" sx={{ mt: 2 }} />
//                 <TextField fullWidth label="Contact Information" variant="outlined" sx={{ mt: 2 }} />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider />

//           {/* Dynamic QuotationForm Details */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               {quotationType === "service" ? "Service Details" : "service Details"}
//             </Typography>
//             {quotationType === "service" ? (
//                 <>
//               <Typography variant="body1">Include your service details here.</Typography>

//                         <Divider />

//                        {/* ServiceQuotationForm Breakdown */}
//                         <Box mt={4}>
//                           {/* <Typography variant="h5" gutterBottom>
//                             {ServicequotationFormType === "business" ? "Service Details" : "service Details"}
//                           </Typography> */}
//                           <TableContainer component={Paper}>
//                             <Table>
//                               <TableHead>
//                                 <TableRow>
//                                   <TableCell><strong>Name</strong></TableCell>
//                                   <TableCell><strong>Description</strong></TableCell>
//                                   <TableCell><strong>Cost (USD)</strong></TableCell>
//                                 </TableRow>
//                               </TableHead>
//                               <TableBody>
//                                 {items.map((item, index) => (
//                                   <TableRow key={index}>
//                                     <TableCell>
//                                       {/* {item.name} */}

//                                   <TextField
//                                       fullWidth
//                                       value={services.name}
//                                       onChange={(e) => updateService({ ...services, name: e.target.value })}
//                                       placeholder="Enter service name"
//                                     />
//                                     </TableCell>
//                                     <TableCell>
//                                       {/* {item.description} */}
//                                     <TextField
//                                       fullWidth
//                                       multiline
//                                       rows={3}
//                                       value={services.description}
//                                       onChange={(e) => updateService({ ...services, description: e.target.value })}
//                                       placeholder="Enter service description"
//                                       // defaultValue="Default description of the service."
//                                     />
//                                     </TableCell>
//                                     <TableCell>
//                                       {/* ${item.cost} */}
//                                       <TextField
//                                         fullWidth
//                                         type="number"
//                                         value={services.price}
//                                         onChange={(e) => updateService(index, "price", +e.target.value)}
//                                         placeholder="Price"
//                                       />

//                                     </TableCell>


//                                     <TableCell colSpan={4} align="center">
//                                           <Button variant="outlined" onClick={addServiceRow}>
//                                                             Add Service
//                                             </Button>
//                                               </TableCell>
//                                 </TableRow>
//                                 ))}
//                                 <TableRow>
//                                   <TableCell colSpan={2}><strong>Total</strong></TableCell>
//                                   <TableCell><strong>${calculateTotalService()}</strong></TableCell>
//                                 </TableRow>
//                               </TableBody>
//                             </Table>
//                           </TableContainer>
//                         </Box>

//                         {/* Terms & Conditions */}
//                         <Box mt={4}>
//                           <Typography variant="h5" gutterBottom>
//                             Terms & Conditions
//                           </Typography>
//                           <Typography variant="body2">
//                             <ol>
//                               {/* <li>A 50% upfront payment is required to initiate the project.</li>
//                               <li>The remaining 50% is due upon project/service delivery.</li>
//                               <li>Additional requirements requested beyond the agreed scope will be charged separately.</li> */}
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 value={services.terms}
//                                 onChange={(e) => setServices({ ...services, terms: e.target.value })}
//                                 placeholder="Enter terms and conditions"
//                                 defaultValue="Default terms and conditions apply."
//                               />
//                             </ol>
//                           </Typography>
//                         </Box>

//                         {/* Acceptance Section */}
//                         <Box mt={4}>
//                           <Typography variant="h5" gutterBottom>
//                             Acceptance
//                           </Typography>
//                           <Typography variant="body1">
//                             If you agree to the terms and Service quotation, please sign below and return a copy to us.
//                           </Typography>
//                           <Box mt={2}>
//                             <Typography variant="body1">Client Name: ________________________</Typography>
//                             <Typography variant="body1">Signature: __________________________</Typography>
//                             <Typography variant="body1">Date: ______________________________</Typography>
//                           </Box>
//                         </Box>
//                 </>

//             ) : (
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell><strong>service Name</strong></TableCell>
//                       <TableCell><strong>Quantity</strong></TableCell>
//                       <TableCell><strong>Price (USD)</strong></TableCell>
//                       <TableCell><strong>Total (USD)</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {services.map((service, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             value={service.name}
//                             onChange={(e) => updateservice(index, "name", e.target.value)}
//                             placeholder="Enter service name"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             type="number"
//                             value={service.quantity}
//                             onChange={(e) => updateservice(index, "quantity", +e.target.value)}
//                             placeholder="Quantity"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             type="number"
//                             value={service.price}
//                             onChange={(e) => updateservice(index, "price", +e.target.value)}
//                             placeholder="Price"
//                           />
//                         </TableCell>
//                         <TableCell>${(service.quantity * service.price).toFixed(2)}</TableCell>
//                       </TableRow>
//                     ))}
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">
//                         <Button variant="outlined" onClick={addserviceRow}>
//                           Add service
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//           </Box>

//           {/* Tax and Discount */}
//           <Box mt={4}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <FormControlLabel
//                   control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//                   label="Include Tax"
//                 />
//                 {includeTax && (
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Tax Percentage (%)"
//                     value={tax_percentage}
//                     onChange={(e) => setTax_percentage(+e.target.value)}
//                     sx={{ mt: 2 }}
//                   />
//                 )}
//               </Grid>
//               <Grid item xs={6}>
//                 <FormControlLabel
//                   control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//                   label="Include Discount"
//                 />
//                 {includeDiscount && (
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Discount Percentage (%)"
//                     value={discount_percentage}
//                     onChange={(e) => setDiscount_percentage(+e.target.value)}
//                     sx={{ mt: 2 }}
//                   />
//                 )}
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Total Calculation */}
//           <Box mt={4}>
//             <Typography variant="h6">
//               Subtotal: ${calculateSubtotalservice().toFixed(2)}
//             </Typography>
//             {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotalservice() * (tax_percentage / 100)).toFixed(2)}</Typography>}
//             {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotalservice() * (discount_percentage / 100)).toFixed(2)}</Typography>}
//             <Typography variant="h5">Total: ${calculateTotalservice()}</Typography>
//           </Box>

//           {/* Footer */}
//           <Box mt={4} textAlign="center">
//             <Button variant="contained" color="primary" onClick={() => alert("QuotationForm Sent!")}>
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default QuotationForm;



