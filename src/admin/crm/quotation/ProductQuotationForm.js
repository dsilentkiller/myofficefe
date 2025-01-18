
// //new
import React, { useState } from "react";
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

const ProductQuotation = ({ products, setProducts, includeTax, tax_percentage, includeDiscount, discount_percentage }) => {
  const addProductRow = () => {
    setProducts([...products, { product_name: "", quantity: 1, price: 0 }]);
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const calculateSubtotalProduct = () => {
    return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
  };

  const calculateTotalProduct = () => {
    let total = calculateSubtotalProduct();
    if (includeTax) total += (total * tax_percentage) / 100;
    if (includeDiscount) total -= (total * discount_percentage) / 100;
    return total;
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Product Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Price (USD)</strong></TableCell>
              <TableCell><strong>Total (USD)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={product.product_name}
                    onChange={(e) => updateProduct(index, "product_name", e.target.value)}
                    placeholder="Enter product name"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateProduct(index, "quantity", +e.target.value)}
                    placeholder="Quantity"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.price}
                    onChange={(e) => updateProduct(index, "price", +e.target.value)}
                    placeholder="Price"
                  />
                </TableCell>
                <TableCell>
                  ${(product.quantity * product.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Button variant="outlined" onClick={addProductRow}>
                  Add Product
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Calculation for Product */}
      {/* <Box mt={4}>
        <Typography variant="h6">
          Subtotal: ${calculateSubtotalProduct().toFixed(2)}
        </Typography>
        {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotalProduct() * (tax_percentage / 100)).toFixed(2)}</Typography>}
        {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotalProduct() * (discount_percentage / 100)).toFixed(2)}</Typography>}
        <Typography variant="h5">Total: ${calculateTotalProduct().toFixed(2)}</Typography>
      </Box> */}
    </Box>
  );
};

export default ProductQuotation;



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
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProductQuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [tax_percentage, setTax_percentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discount_percentage, setDiscount_percentage] = useState(0);
//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);

//   const handleSendQuotation = async () => {
//     const payload = {
//       quotation_type: quotationType,
//       tax_percentage: includeTax ? tax_percentage : 0,
//       discount_percentage: includeDiscount ? discount_percentage : 0,
//       products: products.map((product) => ({
//         name: product.name,
//         quantity: product.quantity,
//         price: product.price,
//       })),
//     };

//     try {
//       const response = await fetch("/product-quotations/create/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         toast.error(`Failed to send quotation: ${errorData.message || "Unknown error"}`);
//         return;
//       }

//       const data = await response.json();
//       toast.success("Quotation sent successfully!");
//       console.log("Response Data:", data);
//     } catch (error) {
//       toast.error("Failed to send quotation. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   // Add a new product row
//   const addProductRow = () => {
//     setProducts([...products, { name: "", quantity: 1, price: 0 }]);
//     toast.info("New product row added!");
//   };

//   // Update product details
//   const updateProduct = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   // Calculate subtotal
//   const calculateSubtotal = () => {
//     return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     let total = calculateSubtotal();
//     if (includeTax) total += (total * tax_percentage) / 100;
//     if (includeDiscount) total -= (total * discount_percentage) / 100;
//     return total.toFixed(2);
//   };


//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>
//           <Typography variant="body1" align="center" gutterBottom>
//             Date: <strong>{new Date().toLocaleDateString()}</strong>
//           </Typography>

//           {/* Quotation Type Selector */}
//           <Box mt={3} mb={3}>
//             <FormControl fullWidth>
//               <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//               <Select
//                 labelId="quotation-type-label"
//                 value={quotationType}
//                 onChange={(e) => setQuotationType(e.target.value)}
//                 label="Quotation Type"
//               >
//                 <MenuItem value="service">Business Services</MenuItem>
//                 <MenuItem value="product">Products</MenuItem>
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

//           {/* Dynamic Quotation Details */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               {quotationType === "service" ? "Service Details" : "Product Details"}
//             </Typography>
//             {quotationType === "service" ? (
//               <Typography variant="body1">Include your service details here.</Typography>
//             ) : (
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Product Name</TableCell>
//                       <TableCell>Quantity</TableCell>
//                       <TableCell>Price (USD)</TableCell>
//                       <TableCell>Total (USD)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {products.map((product, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             value={product.name}
//                             onChange={(e) => updateProduct(index, "name", e.target.value)}
//                             placeholder="Enter product name"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             type="number"
//                             value={product.quantity}
//                             onChange={(e) => updateProduct(index, "quantity", +e.target.value)}
//                             placeholder="Quantity"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             type="number"
//                             value={product.price}
//                             onChange={(e) => updateProduct(index, "price", +e.target.value)}
//                             placeholder="Price"
//                           />
//                         </TableCell>
//                         <TableCell>${(product.quantity * product.price).toFixed(2)}</TableCell>
//                       </TableRow>
//                     ))}
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">
//                         <Button variant="outlined" onClick={addProductRow}>
//                           Add Product
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
//             <Typography variant="h6">Subtotal: ${calculateSubtotal().toFixed(2)}</Typography>
//             {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotal() * (tax_percentage / 100)).toFixed(2)}</Typography>}
//             {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotal() * (discount_percentage / 100)).toFixed(2)}</Typography>}
//             <Typography variant="h5">Total: ${calculateTotal()}</Typography>
//           </Box>

//           {/* Footer */}
//           <Box mt={4} textAlign="center">
//             <Button variant="contained" color="primary" onClick={handleSendQuotation}>
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ProductQuotationForm;


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

// const ProductQuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [tax_percentage, setTax_percentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discount_percentage, setDiscount_percentage] = useState(0);

//   const [products, setProducts] = useState([
//     { name: "", quantity: 1, price: 0 },
//   ]);

//   // Add a new product row
//   const addProductRow = () => {
//     setProducts([...products, { name: "", quantity: 1, price: 0 }]);
//   };

//   // Update product details
//   const updateProduct = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   // Calculate subtotal
//   const calculateSubtotal = () => {
//     return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     let total = calculateSubtotal();
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
//                 <MenuItem value="product">Products</MenuItem>
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
//               {quotationType === "service" ? "Service Details" : "Product Details"}
//             </Typography>
//             {quotationType === "service" ? (
//               <Typography variant="body1">Include your service details here.</Typography>
//             ) : (
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell><strong>Product Name</strong></TableCell>
//                       <TableCell><strong>Quantity</strong></TableCell>
//                       <TableCell><strong>Price (USD)</strong></TableCell>
//                       <TableCell><strong>Total (USD)</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {products.map((product, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             value={product.name}
//                             onChange={(e) => updateProduct(index, "name", e.target.value)}
//                             placeholder="Enter product name"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             type="number"
//                             value={product.quantity}
//                             onChange={(e) => updateProduct(index, "quantity", +e.target.value)}
//                             placeholder="Quantity"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             type="number"
//                             value={product.price}
//                             onChange={(e) => updateProduct(index, "price", +e.target.value)}
//                             placeholder="Price"
//                           />
//                         </TableCell>
//                         <TableCell>${(product.quantity * product.price).toFixed(2)}</TableCell>
//                       </TableRow>
//                     ))}
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">
//                         <Button variant="outlined" onClick={addProductRow}>
//                           Add Product
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
//               Subtotal: ${calculateSubtotal().toFixed(2)}
//             </Typography>
//             {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotal() * (tax_percentage / 100)).toFixed(2)}</Typography>}
//             {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotal() * (discount_percentage / 100)).toFixed(2)}</Typography>}
//             <Typography variant="h5">Total: ${calculateTotal()}</Typography>
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

// export default ProductQuotationForm;



