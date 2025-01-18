import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import ProductQuotation from "./ProductQuotationForm";
import ServiceQuotation from "./ServiceQuotationForm";
import { createProductQuotation, createServiceQuotation } from "../../redux/slice/crm/quotationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuotationForm = () => {
  const [quotationType, setQuotationType] = useState("service");
  const [includeTax, setIncludeTax] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [includeDiscount, setIncludeDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [services, setServices] = useState([
    // { name: "Consultation", description: "Expert advice session.", price: 100.0 },
    // { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const calculateTotal = () => {
    let subtotal = 0;

    if (quotationType === "product") {
      subtotal = products.reduce(
        (sum, product) => sum + product.quantity * product.price, 0
      );
    } else if (quotationType === "service") {
      // Ensure services array has valid data
      console.log('Services Array for Calculation:', services);
      subtotal = services.reduce(
        (sum, service) => sum + (parseFloat(service.quantity) || 1) * (parseFloat(service.service_price) || 0),
        0
      );

    }

    // Calculate tax and discount
    const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
    const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
    const total = subtotal + taxAmount - discountAmount;

    console.log('Calculated Subtotal:', subtotal);
    console.log('Calculated Tax Amount:', taxAmount);
    console.log('Calculated Discount Amount:', discountAmount);
    console.log('Calculated Total:', total);

    return { subtotal, taxAmount, discountAmount, total };
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const totals = calculateTotal();

  //   const formData = {
  //     client_name: "",
  //     client_email: "",
  //     client_phone: "",
  //     quotation_date: "",
  //     tax_percentage: taxPercentage,
  //     discount_percentage: discountPercentage,
  //     subtotal: totals.subtotal,
  //     tax_amount: totals.taxAmount,
  //     discount_amount: totals.discountAmount,
  //     total_amount: totals.total,
  //     products: quotationType === "product" ? products : [],
  //     services: quotationType === "service" ? services : [],
  //   };

  //   if (quotationType === "product") {
  //     if (editing) { // Check if editing
  //       dispatch(updateProductQuotation({ id: quotationId, ...formData }))
  //         .unwrap()
  //         .then(() => {
  //           toast.success("Product quotation updated successfully!");
  //           navigate("/dashboard/crm/product-quotation");
  //         })
  //         .catch((error) => toast.error(`Update Error: ${error.message}`));
  //     } else {
  //       dispatch(createProductQuotation(formData))
  //         .unwrap()
  //         .then(() => {
  //           toast.success("Product quotation created successfully!");
  //           navigate("/dashboard/crm/product-quotation");
  //         })
  //         .catch((error) => toast.error(`Create Error: ${error.message}`));
  //     }
  //   } else if (quotationType === "service") {
  //     if (editing) { // Check if editing
  //       dispatch(updateServiceQuotation({ id: quotationId, ...formData }))
  //         .unwrap()
  //         .then(() => {
  //           toast.success("Service quotation updated successfully!");
  //           navigate("/dashboard/crm/service-quotation");
  //         })
  //         .catch((error) => toast.error(`Update Error: ${error.message}`));
  //     } else {
  //       dispatch(createServiceQuotation(formData))
  //         .unwrap()
  //         .then(() => {
  //           toast.success("Service quotation created successfully!");
  //           navigate("/dashboard/crm/service-quotation");
  //         })
  //         .catch((error) => toast.error(`Create Error: ${error.message}`));
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totals = calculateTotal();

    console.log('Form Data:', totals); // Debugging totals
    const formData = {
      client_name: "",
      client_email: "",
      client_phone: "",
      quotation_date: "",
      tax_percentage: taxPercentage,
      discount_percentage: discountPercentage,
      subtotal: totals.subtotal,
      tax_amount: totals.taxAmount,
      discount_amount: totals.discountAmount,
      total_amount: totals.total,
      products: quotationType === "product" ? products : [],
      services: quotationType === "service" ? services : [],
    };

    if (quotationType === "product") {
      dispatch(createProductQuotation(formData))
        .unwrap()
        .then(() => {
          toast.success("Product quotation created successfully!");
          navigate("/dashboard/crm/product-quotation");
        })
        .catch((error) => toast.error(`Create Error: ${error.message}`));
    } else if (quotationType === "service") {
      dispatch(createServiceQuotation(formData))
        .unwrap()
        .then(() => {
          toast.success("Service quotation created successfully!");
          navigate("/dashboard/crm/service-quotation");
        })
        .catch((error) => toast.error(`Create Error: ${error.message}`));
    }
  };
  // .catch((error) => toast.error(`Create Error: ${error.message || 'An unknown error occurred'}`));

  const totals = calculateTotal();
  // console.log(error); // Inspect the error object
  // toast.error(`Create Error: ${error.message || 'An unknown error occurred'}`);

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Quotation Form
          </Typography>

          {/* Quotation Type Selector */}
          <FormControl fullWidth>
            <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
            <Select
              labelId="quotation-type-label"
              value={quotationType}
              onChange={(e) => setQuotationType(e.target.value)}
              label="Quotation Type"
            >
              <MenuItem value="service">Service</MenuItem>
              <MenuItem value="product">Product</MenuItem>
            </Select>
          </FormControl>

          {/* Tax and Discount Section */}
          <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
  <FormControlLabel
    control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
    label="Include Tax"
  />
  {includeTax && (
    <TextField
      type="number"
      label="Tax Percentage (%)"
      value={taxPercentage}
      onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
    />
  )}
  <FormControlLabel
    control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
    label="Include Discount"
  />
  {includeDiscount && (
    <TextField
      type="number"
      label="Discount Percentage (%)"
      value={discountPercentage}
      onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
    />
  )}
</Box>

          {/* Render either ProductQuotation or ServiceQuotation */}
          {quotationType === "product" ? (
            <ProductQuotation products={products} setProducts={setProducts} />
          ) : (
            <ServiceQuotation services={services} setServices={setServices} />
          )}

          {/* Display Totals */}
          <Box mt={4} textAlign="center">
            <Typography variant="h6">Subtotal: {totals.subtotal.toFixed(2)}</Typography>
            <Typography variant="h6">Tax: {totals.taxAmount.toFixed(2)}</Typography>
            <Typography variant="h6">Discount: {totals.discountAmount.toFixed(2)}</Typography>
            <Typography variant="h5" color="primary">Total: {totals.total.toFixed(2)}</Typography>
          </Box>


          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Send Quotation
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotationForm;

//product work well
// // import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Switch,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation, createServiceQuotation } from "../../redux/slice/crm/quotationSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const QuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);

//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const [services, setServices] = useState([
//     // { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//     // { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//   ]);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const calculateTotal = () => {
//     let subtotal = 0;

//     if (quotationType === "product") {
//       subtotal = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
//     } else if (quotationType === "service") {
//       subtotal = services.reduce((sum, service) => sum + service.price, 0);
//     }

//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     return { subtotal, taxAmount, discountAmount, total };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const totals = calculateTotal();
//     const formData = {
//       client_name: "",
//       client_email: "",
//       client_phone: "",
//       quotation_date: "",
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: totals.subtotal,
//       tax_amount: totals.taxAmount,
//       discount_amount: totals.discountAmount,
//       total_amount: totals.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? services : [],
//     };

//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Product quotation created successfully!");
//           navigate("/dashboard/crm/product-quotation");
//         })
//         .catch((error) => toast.error(`Create Error: ${error.message}`));
//     } else if (quotationType === "service") {
//       dispatch(createServiceQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Service quotation created successfully!");
//           navigate("/dashboard/crm/service-quotation");
//         })
//         .catch((error) => toast.error(`Create Error: ${error.message}`));
//     }
//   };

//   const totals = calculateTotal();

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

//           {/* Quotation Type Selector */}
//           <FormControl fullWidth>
//             <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//             <Select
//               labelId="quotation-type-label"
//               value={quotationType}
//               onChange={(e) => setQuotationType(e.target.value)}
//               label="Quotation Type"
//             >
//               <MenuItem value="service">Service</MenuItem>
//               <MenuItem value="product">Product</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Tax and Discount Section */}
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation products={products} setProducts={setProducts} />
//           ) : (
//             <ServiceQuotation services={services} setServices={setServices} />
//           )}

//           {/* Display Totals */}
//           <Box mt={4} textAlign="center">
//             <Typography variant="h6">Subtotal: {totals.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {totals.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {totals.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5">Total: {totals.total.toFixed(2)}</Typography>
//           </Box>

//           <Box textAlign="center" mt={4}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default QuotationForm;

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Switch,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation, createServiceQuotation } from "../../redux/slice/crm/quotationSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const QuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);

//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const [services, setServices] = useState([
//     { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//     { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//   ]);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     client_name: "",
//     client_email: "",
//     client_phone: "",
//     quotation_date: "",
//     tax_percentage: "",
//     discount_percentage: "",
//     total_amount: "",
//     product_name: "",
//     quantity: "",
//     price: "",
//     service_name: "",
//     service_description: "",
//     service_price: "",
//     service_terms: "",
//   });

//   // Ensure taxPercentage and discountPercentage are valid numbers
//   const calculateTotal = () => {
//     let totalAmount = 0;

//     if (quotationType === "product") {
//       // Calculate the total amount for product quotation
//       totalAmount = products.reduce((sum, product) => {
//         const productTotal = product.quantity * product.price;
//         return sum + productTotal;
//       }, 0);
//     } else if (quotationType === "service") {
//       // Calculate the total amount for service quotation
//       totalAmount = services.reduce((sum, service) => sum + service.price, 0);
//     }

//     // Apply tax if included
//     if (includeTax) {
//       const validTaxPercentage = isNaN(taxPercentage) ? 0 : taxPercentage;
//       totalAmount += (totalAmount * validTaxPercentage) / 100;
//     }

//     // Apply discount if included
//     if (includeDiscount) {
//       const validDiscountPercentage = isNaN(discountPercentage) ? 0 : discountPercentage;
//       totalAmount -= (totalAmount * validDiscountPercentage) / 100;
//     }

//     return totalAmount;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const totalAmount = calculateTotal();

//     // Update total amount in the form data
//     setFormData({ ...formData, total_amount: totalAmount });

//     // Submit the form data based on the quotation type
//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Product quotation created successfully!");
//           setFormData({
//             client_name: "",
//             client_email: "",
//             client_phone: "",
//             quotation_date: "",
//             tax_percentage: "",
//             discount_percentage: "",
//             total_amount: "",
//             product_name: "",
//             quantity: "",
//             price: "",
//           });
//           navigate("/dashboard/crm/product-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.response?.data?.detail || error.message}`);
//         });
//     } else if (quotationType === "service") {
//       dispatch(createServiceQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Service quotation created successfully!");
//           setFormData({
//             client_name: "",
//             client_email: "",
//             client_phone: "",
//             quotation_date: "",
//             tax_percentage: "",
//             discount_percentage: "",
//             total_amount: "",
//             service_name: "",
//             service_description: "",
//             service_price: "",
//             service_terms: "",
//           });
//           navigate("/dashboard/crm/service-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.response?.data?.detail || error.message}`);
//         });
//     }
//   };

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

//           {/* Quotation Type Selector */}
//           <FormControl fullWidth>
//             <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//             <Select
//               labelId="quotation-type-label"
//               value={quotationType}
//               onChange={(e) => setQuotationType(e.target.value)}
//               label="Quotation Type"
//             >
//               <MenuItem value="service">Service</MenuItem>
//               <MenuItem value="product">Product</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Tax and Discount Section */}
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)} // Ensure valid number
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)} // Ensure valid number
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation
//               products={products}
//               setProducts={setProducts}
//               includeTax={includeTax}
//               taxPercentage={taxPercentage}
//               includeDiscount={includeDiscount}
//               discountPercentage={discountPercentage}
//             />
//           ) : (
//             <ServiceQuotation
//               services={services}
//               setServices={setServices}
//               includeTax={includeTax}
//               taxPercentage={taxPercentage}
//               includeDiscount={includeDiscount}
//               discountPercentage={discountPercentage}
//             />
//           )}

//           {/* Display Total */}
//           <Box mt={2} textAlign="center">
//             <Typography variant="h6">
//               Total Amount: {calculateTotal().toFixed(2)}
//             </Typography>
//           </Box>

//           <Box textAlign="center" mt={4}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default QuotationForm;


//include terms
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Switch,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation, createServiceQuotation } from "../../redux/slice/crm/quotationSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const QuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);

//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const [services, setServices] = useState([
//     { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//     { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//   ]);

//   const [terms, setTerms] = useState([""]); // State for terms and conditions

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     client_name: "",
//     client_email: "",
//     client_phone: "",
//     quotation_date: "",
//     tax_percentage: "",
//     discount_percentage: "",
//     total_amount: "",
//     product_name: "",
//     quantity: "",
//     price: "",
//     service_name: "",
//     service_description: "",
//     service_price: "",
//     service_terms: "",
//   });

//   // Function to handle term changes
//   const updateTerm = (index, value) => {
//     const newTerms = [...terms];
//     newTerms[index] = value;
//     setTerms(newTerms);
//   };

//   // Function to remove a term
//   const removeTerm = (index) => {
//     const newTerms = terms.filter((_, i) => i !== index);
//     setTerms(newTerms);
//   };

//   const calculateTotal = () => {
//     let totalAmount = 0;

//     if (quotationType === "product") {
//       // Calculate the total amount for product quotation
//       totalAmount = products.reduce((sum, product) => {
//         const productTotal = product.quantity * product.price;
//         return sum + productTotal;
//       }, 0);
//     } else if (quotationType === "service") {
//       // Calculate the total amount for service quotation
//       totalAmount = services.reduce((sum, service) => sum + service.price, 0);
//     }

//     // Apply tax if included
//     if (includeTax) {
//       totalAmount += (totalAmount * taxPercentage) / 100;
//     }

//     // Apply discount if included
//     if (includeDiscount) {
//       totalAmount -= (totalAmount * discountPercentage) / 100;
//     }

//     return totalAmount;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const totalAmount = calculateTotal();

//     // Update total amount in the form data
//     setFormData({ ...formData, total_amount: totalAmount });

//     // Submit the form data based on the quotation type
//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Product quotation created successfully!");
//           setFormData({
//             client_name: "",
//             client_email: "",
//             client_phone: "",
//             quotation_date: "",
//             tax_percentage: "",
//             discount_percentage: "",
//             total_amount: "",
//             product_name: "",
//             quantity: "",
//             price: "",
//           });
//           navigate("/dashboard/crm/product-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.response?.data?.detail || error.message}`);
//         });
//     } else if (quotationType === "service") {
//       // Add the terms to formData
//       setFormData({ ...formData, service_terms: terms.join("\n") });

//       dispatch(createServiceQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Service quotation created successfully!");
//           setFormData({
//             client_name: "",
//             client_email: "",
//             client_phone: "",
//             quotation_date: "",
//             tax_percentage: "",
//             discount_percentage: "",
//             total_amount: "",
//             service_name: "",
//             service_description: "",
//             service_price: "",
//             service_terms: "",
//           });
//           navigate("/dashboard/crm/service-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.response?.data?.detail || error.message}`);
//         });
//     }
//   };

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

//           {/* Quotation Type Selector */}
//           <FormControl fullWidth>
//             <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//             <Select
//               labelId="quotation-type-label"
//               value={quotationType}
//               onChange={(e) => setQuotationType(e.target.value)}
//               label="Quotation Type"
//             >
//               <MenuItem value="service">Service</MenuItem>
//               <MenuItem value="product">Product</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Tax and Discount Section */}
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(+e.target.value)}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(+e.target.value)}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>

//           {/* Terms & Conditions Section */}
//           {quotationType === "service" && (
//             <Box mt={4}>
//               <Typography variant="h5" gutterBottom>
//                 Terms & Conditions
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 Please add any terms and conditions for the quotation.
//               </Typography>
//               {terms.map((term, index) => (
//                 <Box display="flex" alignItems="center" mb={2} key={index}>
//                   <TextField
//                     fullWidth
//                     value={term}
//                     onChange={(e) => updateTerm(index, e.target.value)}
//                     placeholder={`Enter term ${index + 1}`}
//                     variant="outlined"
//                   />
//                   <Button
//                     color="secondary"
//                     onClick={() => removeTerm(index)}
//                     style={{ marginLeft: "8px" }}
//                   >
//                     Remove
//                   </Button>
//                 </Box>
//               ))}
//               <Box>
//                 <Button
//                   variant="outlined"
//                   onClick={() => setTerms([...terms, ""])}
//                   sx={{ mt: 2 }}
//                 >
//                   Add Term
//                 </Button>
//               </Box>
//             </Box>
//           )}

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation
//               products={products}
//               setProducts={setProducts}
//               includeTax={includeTax}
//               taxPercentage={taxPercentage}
//               includeDiscount={includeDiscount}
//               discountPercentage={discountPercentage}
//             />
//           ) : (
//             <ServiceQuotation
//               services={services}
//               setServices={setServices}
//               includeTax={includeTax}
//               taxPercentage={taxPercentage}
//               includeDiscount={includeDiscount}
//               discountPercentage={discountPercentage}
//             />
//           )}

//           {/* Display Total */}
//           <Box mt={2} textAlign="center">
//             <Typography variant="h6">
//               Total Amount: {calculateTotal().toFixed(2)}
//             </Typography>
//           </Box>

//           <Box textAlign="center" mt={4}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default QuotationForm;



// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Switch,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation } from "../../redux/slice/crm/quotationSlice";
// import { Form, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const QuotationForm = () => {
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);

//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [services, setServices] = useState([
//     { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//     { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//   ]);
//     const [formData, setFormData] = useState({
//       client_name:"",
//       client_email:"",
//       client_phone:"",
//       quotation_date:"",
//       tax_percentage:"",
//       discount_percentage:"",
//       total_amount:"",
//       product_name:"",
//       quantity:"",
//       price:"",
//       service_name:"",
//       service_description:"",
//       service_price:"",
//       service_terms:"",

//     });
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Create new product quotation
//             dispatch(createProductQuotation(formData))
//               .unwrap()
//               .then(() => {
//                 toast.success("product quotation created successfully!");
//                 setFormData({
//                     quotation_date:"",
//                     tax_percentage:"",
//                     discount_percentage:"",
//                     total_amount:"",
//                   product_name: "",
//                   quantity:"",
//                   price:"",
//                 });
//                 navigate("/dashboard/crm/product quotation");
//               })
//               .catch((error) => {
//                 toast.error(
//                   `Create Error: ${error.response?.data?.detail || error.message}`
//                 );
//               });

//     }



//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

//           {/* QuotationType Selector */}
//           <FormControl fullWidth>
//             <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//             <Select
//               labelId="quotation-type-label"
//               value={quotationType}
//               onChange={(e) => setQuotationType(e.target.value)}
//               label="Quotation Type"
//             >
//               <MenuItem value="service">Service</MenuItem>
//               <MenuItem value="product">Product</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Tax and Discount Section */}
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(+e.target.value)}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>
//           <Box mt={4}>
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(+e.target.value)}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation
//               products={products}
//               setProducts={setProducts}
//               includeTax={includeTax}
//               taxPercentage={taxPercentage}
//               includeDiscount={includeDiscount}
//               discountPercentage={discountPercentage}
//             />
//           ) : (
//             <ServiceQuotation
//               services={services}
//               setServices={setServices}
//               includeTax={includeTax}
//               taxPercentage={taxPercentage}
//               includeDiscount={includeDiscount}
//               discountPercentage={discountPercentage}
//             />
//           )}

//           <Box textAlign="center" mt={4}>
//             <Button variant="contained" color="primary">
//               Send Quotation
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default QuotationForm;


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
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);
//   const [terms, setTerms] = useState([""]);
//   const [services, setServices] = React.useState([
//       { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//       { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//     ]);
//   const [products, setProducts] = useState([
//     { name: "", quantity: 1, price: 0 },
//   ]);
//   // State for "From" details
//   const [fromDetails, setFromDetails] = useState({
//     name: "Paaru Rawal",
//     title: "Software Engineer | AI Enthusiast",
//     contact: "+977 9828889263",
//     email: "paarurawal@gmail.com",
//     location: "AB Dev Factory, Lalitpur Nakhu",
//   });

//   // State for "Acceptance" details
//   const [acceptanceDetails, setAcceptanceDetails] = useState({
//     client_name: "",
//     signature: "",
//     date: "",
//   });

// // Sample data for products/services
// const items = [
//   { name: "Website Development", description: "Complete website development package.", cost: 1200 },
//   { name: "E-commerce Platform", description: "Online store development.", cost: 2500 },
//   { name: "SEO Services", description: "Search engine optimization for your business.", cost: 800 },
//   { name: "Laptops", description: "High-performance laptops for office use.", cost: 1000 },
//   { name: "Printers", description: "Multifunction printers for business.", cost: 200 },
// ];
//  // Handle input changes dynamically
//  const handleFromChange = (field, value) => {
//   setFromDetails((prev) => ({ ...prev, [field]: value }));
// };

// const handleAcceptanceChange = (field, value) => {
//   setAcceptanceDetails((prev) => ({ ...prev, [field]: value }));
// };


// const addTerm = () => {
//   setTerms([...terms, ""]);
// };

// const updateTerm = (index, value) => {
//   const updatedTerms = [...terms];
//   updatedTerms[index] = value;
//   setTerms(updatedTerms);
// };

// const removeTerm = (index) => {
//   const updatedTerms = terms.filter((_, i) => i !== index);
//   setTerms(updatedTerms);
// };
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

//    // Add a new product row
//    const addServiceRow = () => {
//     setServices([...services, { name: "", description: 1, price: 0 }]);
//   };

//   // Update product details

//   const updateService = (index, field, value) => {
//     const updatedServices = [...services];
//     updatedServices[index][field] = value;
//     setServices(updatedServices);
//   };


//   // Calculate subtotal  PRODUCT
//   const calculateSubtotalProduct = () => {
//     return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
//   };

//   // Calculate total
//   // const calculateTotalProduct = () => {
//   //   let total = calculateSubtotalProduct();
//   //   if (includeTax) total += (total * taxPercentage) / 100;
//   //   if (includeDiscount) total -= (total * discountPercentage) / 100;
//   //   return total.toFixed(2);
//   // };
//   // console.log("Subtotal:", subtotal);
//   console.log("Tax:", taxPercentage);
//   console.log("Discount:", discountPercentage);
//   //CALCULATE subtotal and total for service


//   const calculateSubtotalService = () => {
//     return services.reduce((acc, service) => acc + service.price, 0);
//   };

//   // const calculateTotalService = () => {
//   //   let total = calculateSubtotalService();
//   //   if (includeTax) total += (total * taxPercentage) / 100;
//   //   if (includeDiscount) total -= (total * discountPercentage) / 100;
//   //   return total.toFixed(2);
//   // };
// // Calculate total for product
// const calculateTotalProduct = () => {
//   let total = calculateSubtotalProduct();
//   if (includeTax) total += (total * taxPercentage) / 100;
//   if (includeDiscount) total -= (total * discountPercentage) / 100;
//   return total; // return the number, don't apply toFixed here
// };

// // Calculate total for service
// const calculateTotalService = () => {
//   let total = calculateSubtotalService();
//   if (includeTax) total += (total * taxPercentage) / 100;
//   if (includeDiscount) total -= (total * discountPercentage) / 100;
//   return total; // return the number, don't apply toFixed here
// };


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
//             {/* "From" Section */}
//             <Box mt={4} mb={3}>
//             <Typography variant="h6" gutterBottom>
//               From:
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Name"
//                   fullWidth
//                   value={fromDetails.name}
//                   onChange={(e) => handleFromChange("name", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Title"
//                   fullWidth
//                   value={fromDetails.title}
//                   onChange={(e) => handleFromChange("title", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Contact"
//                   fullWidth
//                   value={fromDetails.contact}
//                   onChange={(e) => handleFromChange("contact", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Email"
//                   fullWidth
//                   value={fromDetails.email}
//                   onChange={(e) => handleFromChange("email", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Location"
//                   fullWidth
//                   value={fromDetails.location}
//                   onChange={(e) => handleFromChange("location", e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider />


//           {/* <Divider /> */}

//           {/* Dynamic QuotationForm Details */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               {quotationType === "service" ? "Service Details" : "Product Details"}
//             </Typography>
//             {quotationType === "service" ? (
//                 <>
//               <Typography variant="body1">Include your service details here.</Typography>

//                         <Divider />

//                        {/* ServiceQuotationForm Breakdown */}
//                         <Box mt={4}>
//                           <TableContainer component={Paper}>
//                             <Table>
//                               <TableHead>
//                                 <TableRow>
//                                   <TableCell><strong>Name</strong></TableCell>
//                                   <TableCell><strong>Description</strong></TableCell>
//                                   <TableCell><strong>Cost (USD)</strong></TableCell>
//                                 </TableRow>
//                               </TableHead>
//                             <TableBody>
//   {services.map((service, index) => (
//     <TableRow key={index}>
//       <TableCell>
//         <TextField
//           fullWidth
//           value={service.name}
//           onChange={(e) => updateService(index, "name", e.target.value)}
//           placeholder="Enter service/feature name"
//         />
//       </TableCell>
//       <TableCell>
//         <TextField
//           fullWidth
//           type="text"
//           value={service.description}
//           onChange={(e) => updateService(index, "description", e.target.value)}
//           placeholder="Description"
//         />
//       </TableCell>
//       <TableCell>
//         <TextField
//           fullWidth
//           type="number"
//           value={service.price || 0}
//           onChange={(e) =>
//             updateService(index, "price", parseFloat(e.target.value) || 0)
//           }
//           placeholder="Price"
//         />
//       </TableCell>
//       <TableCell>
//         ${service.price ? service.price.toFixed(2) : "0.00"}
//       </TableCell>
//     </TableRow>
//   ))}
//                                                <TableRow>
//                                                     <TableCell colSpan={4} align="center">
//                                                       <Button variant="outlined" onClick={addServiceRow}>
//                                                         Add service
//                                                       </Button>
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableBody>
//                             </Table>
//                           </TableContainer>
//                         </Box>
//                           {/* Summary Section */}
//                         {/* Terms & Conditions */}
                        //                       <Box mt={4}>
                        // <Typography variant="h5" gutterBottom>
                        //   Terms & Conditions
                        // </Typography>
                        // <Typography variant="body2" gutterBottom>
                        //   Please add any terms and conditions for the quotation.
                        // </Typography>
                        // {terms.map((term, index) => (
                        //   <Box display="flex" alignItems="center" mb={2} key={index}>
                        //     <TextField
                        //       fullWidth
                        //       value={term}
                        //       onChange={(e) => updateTerm(index, e.target.value)}
                        //       placeholder={`Enter term ${index + 1}`}
                        //       variant="outlined"
                        //     />
                        //     <Button
                        //       color="secondary"
                        //       onClick={() => removeTerm(index)}
                        //       style={{ marginLeft: "8px" }}
                        //     >
                        //       Remove
                        //     </Button>
                        //   </Box>
//                         ))}
//                         <Button variant="outlined" onClick={addTerm}>
//                           Add Term
//                         </Button>
//                       </Box>
//                          {/* Acceptance Section */}
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               Acceptance
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               If you agree to the terms and service quotation, please fill in the details below.
//             </Typography>
//             <Grid container spacing={2} mt={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Client Name"
//                   fullWidth
//                   value={acceptanceDetails.clientName}
//                   onChange={(e) => handleAcceptanceChange("clientName", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Signature"
//                   fullWidth
//                   value={acceptanceDetails.signature}
//                   onChange={(e) => handleAcceptanceChange("signature", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Date"
//                   fullWidth
//                   type="date"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   value={acceptanceDetails.date}
//                   onChange={(e) => handleAcceptanceChange("date", e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//                 </>

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


//             <Box>
//       <Paper sx={{ padding: 3 }}>
//         {/* Tax and Discount Section */}
//         <Box mt={4}>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <FormControlLabel
//                 control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//                 label="Include Tax"
//               />
//               {includeTax && (
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Tax Percentage (%)"
//                   value={taxPercentage}
//                   onChange={(e) => setTaxPercentage(+e.target.value)}
//                   sx={{ mt: 2 }}
//                 />
//               )}
//             </Grid>
//             <Grid item xs={6}>
//               <FormControlLabel
//                 control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//                 label="Include Discount"
//               />
//               {includeDiscount && (
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Discount Percentage (%)"
//                   value={discountPercentage}
//                   onChange={(e) => setDiscountPercentage(+e.target.value)}
//                   sx={{ mt: 2 }}
//                 />
//               )}
//             </Grid>
//           </Grid>
//         </Box>

//   {/* Total Calculation for Product */}
// {quotationType === 'product' && (
//   <Box mt={4}>
//     <Typography variant="h6">
//       Subtotal: ${calculateSubtotalProduct().toFixed(2)}
//     </Typography>
//     {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotalProduct() * (taxPercentage / 100)).toFixed(2)}</Typography>}
//     {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotalProduct() * (discountPercentage / 100)).toFixed(2)}</Typography>}
//     <Typography variant="h5">Total: ${calculateTotalProduct().toFixed(2)}</Typography> {/* Apply toFixed here */}
//   </Box>
// )}

// {/* Total Calculation for Service */}
// {quotationType === 'service' && (
//   <Box mt={4}>
//     <Typography variant="h6">
//       Subtotal: ${calculateSubtotalService().toFixed(2)}
//     </Typography>
//     {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotalService() * (taxPercentage / 100)).toFixed(2)}</Typography>}
//     {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotalService() * (discountPercentage / 100)).toFixed(2)}</Typography>}
//     <Typography variant="h5">Total: ${calculateTotalService().toFixed(2)}</Typography> {/* Apply toFixed here */}
//   </Box>
// )}
//       </Paper>
//     </Box>
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



