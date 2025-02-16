
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
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
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import ProductQuotation from "./ProductQuotationForm";
import ServiceQuotation from "./ServiceQuotationForm";
import { createProductQuotation, createServiceQuotation, fetchProductQuotations, fetchServiceQuotations } from "../../redux/slice/crm/quotationSlice";
import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
import { fetchCategories } from "../../redux/slice/crm/categorySlice";
import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
import { fetchDesignations } from "../../redux/slice/base/designationSlice";
import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const QuotationForm = ({ existingQuotation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quotationType, setQuotationType] = useState(existingQuotation?.quotation_type || "service");
  const [includeTax, setIncludeTax] = useState(existingQuotation?.include_tax || false);
  const [taxPercentage, setTaxPercentage] = useState(existingQuotation?.tax_percentage || 0);
  const [includeDiscount, setIncludeDiscount] = useState(existingQuotation?.include_discount || false);
  const [discountPercentage, setDiscountPercentage] = useState(existingQuotation?.discount_percentage || 0);

  const [products, setProducts] = useState(existingQuotation?.products || [{ product_name: "", quantity: 1, price: 0 }]);
  const [services, setServices] = useState(existingQuotation?.services || [{ service_name: "", service_description: "", service_price: 0.0, quantity: 1 }]);
  const [selectionType, setSelectionType] = useState("customer");
  const [selectedCustomerOrEnquiry, setSelectedCustomerOrEnquiry] = useState(existingQuotation?.customer_or_enquiry_id || "");
  const currentDate = new Date().toISOString().split('T')[0];

  const { list: customers } = useSelector((state) => state.customers);
  const { list: departments } = useSelector((state) => state.departments);
  const { list: designations } = useSelector((state) => state.designations);
  const { list: categories } = useSelector((state) => state.categories);
  const { list: enquiries } = useSelector((state) => state.enquiries);

  const isLoading = useSelector((state) => state.enquiries.isLoading);
  const error = useSelector((state) => state.enquiries.error);

  useEffect(() => {
    dispatch(fetchEnquiries());
    dispatch(fetchCategories());
    dispatch(fetchCustomers());
    dispatch(fetchDesignations());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const calculateTotal = () => {
    let subtotal = 0;

    if (quotationType === "product") {
      subtotal = products.reduce(
        (sum, product) => sum + product.quantity * product.price, 0
      );
    } else if (quotationType === "service") {
      subtotal = services.reduce(
        (sum, service) => sum + (parseFloat(service.quantity) || 1) * (parseFloat(service.service_price) || 0),
        0
      );
    }

    const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
    const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
    const total = subtotal + taxAmount - discountAmount;

    return { subtotal, taxAmount, discountAmount, total };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure either customer or enquiry is selected
    if (!selectedCustomerOrEnquiry) {
      toast.error(`Please select a ${selectionType === "customer" ? "customer" : "enquiry"}`);
      return;
    }
  
    const total = calculateTotal();
  
    // Construct the form data
    const formData = {
      quotation_date: currentDate,
      tax_percentage: taxPercentage,
      discount_percentage: discountPercentage,
      subtotal: total.subtotal,
      tax_amount: total.taxAmount,
      discount_amount: total.discountAmount,
      total_amount: total.total,
      products: quotationType === "product" ? products : [],
      services: quotationType === "service" ? services : [],
      selection_type: selectionType,
    };
  
    // Get selected customer or enquiry by ID
    const selectedItem = selectionType === "customer"
      ? customers.find(customer => customer.id === selectedCustomerOrEnquiry)
      
      : enquiries.find(enquiry => enquiry.id === selectedCustomerOrEnquiry);
  
    if (!selectedItem) {
      toast.error(`Selected ${selectionType} not found`);
      return;
    }
  
    // Add customer_id or enquiry_id to formData
    if (selectionType === "customer") {
      formData.customer_name = selectedItem.id; // Store customer_id
    } else if (selectionType === "enquiry") {
      formData.enquiry_name = selectedItem.id; // Store enquiry_id
    }
  
    // Log the form data for debugging
    console.log("Form Data: ", formData);
  
    // Validate required fields for services and products
    formData.services.forEach((service, index) => {
      if (!service.service_name || !service.service_price || !service.quantity) {
        toast.error(`Service at index ${index} is missing required fields.`);
        return;
      }
    });
  
    formData.products.forEach((product, index) => {
      if (!product.product_name || !product.price || !product.quantity) {
        toast.error(`Product at index ${index} is missing required fields.`);
        return;
      }
    });
  
    // Ensure subtotal is valid
    if (!formData.subtotal || formData.subtotal <= 0) {
      toast.error("Subtotal must be greater than 0.");
      return;
    }
  
    // Make API request to create the quotation
    const createQuotation = quotationType === "product"
      ? dispatch(createProductQuotation(formData))
      : dispatch(createServiceQuotation(formData));
  
    createQuotation
      .unwrap()
      .then((response) => {
        toast.success(`${quotationType.charAt(0).toUpperCase() + quotationType.slice(1)} quotation created successfully!`);
        dispatch(fetchProductQuotations());
        dispatch(fetchServiceQuotations());
        navigate(`/dashboard/crm/quotations`);
      })
      .catch((error) => {
        console.log("Create Error:", error);
  
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(`${field}: ${msg}`));
          });
        } else {
          toast.error(`Create Error: ${error.message || "Unknown error"}`);
        }
      });
  };
  
          // useEffect(() => {
          //   calculateTotal(); // Recalculate totals when data changes
          // }, [products, services, taxPercentage, discountPercentage, includeTax, includeDiscount]);
          


          const totals = calculateTotal();
          


  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Quotation Form
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="selection-type-label">Select From</InputLabel>
            <Select
              labelId="selection-type-label"
              value={selectionType}
              onChange={(e) => setSelectionType(e.target.value)}
              label="Select From"
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="enquiry">Enquiry</MenuItem>
            </Select>
          </FormControl>

          <Select
            id="customer-or-enquiry"
            value={selectedCustomerOrEnquiry}
            onChange={(e) => setSelectedCustomerOrEnquiry(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          >
            <MenuItem value="">Select {selectionType === "customer" ? "Customer" : "Enquiry"}</MenuItem>
            {selectionType === "customer" && Array.isArray(customers) && customers.length > 0 ? (
              customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.customer_name}
                </MenuItem>
              ))
            ) : selectionType === "enquiry" && Array.isArray(enquiries) && enquiries.length > 0 ? (
              enquiries.map((enquiry) => (
                <MenuItem key={enquiry.id} value={enquiry.id}>
                  {enquiry.customer_name || "No Enquiry Name"}
                </MenuItem>
              ))
            ) : (
              <MenuItem>No {selectionType === "customer" ? "customers" : "enquiries"} available</MenuItem>
            )}
          </Select>

          {/* Quotation Type Selector */}
          <FormControl fullWidth sx={{ mt: 2 }}>
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


//old quotation form work well
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
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
//   CircularProgress,
//   FormHelperText,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation, createServiceQuotation, fetchProductQuotations, fetchServiceQuotations } from "../../redux/slice/crm/quotationSlice";
// import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
// import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
// import { fetchDesignations } from "../../redux/slice/base/designationSlice";
// import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";

// const QuotationForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);

//   const [products, setProducts] = useState([{ product_name: "", quantity: 1, price: 0 }]);
//   const [services, setServices] = useState([{ service_name: "", service_description: "", service_price: 0.0, quantity: 1 }]);
//   const [selectionType, setSelectionType] = useState("customer"); // "enquiry" or "customer"
//   const [selectedCustomerOrEnquiry, setSelectedCustomerOrEnquiry] = useState("");
//   const currentDate = new Date().toISOString().split('T')[0]; // Get today's date


//   const { list: customers } = useSelector((state) => state.customers);
//   const { list: departments } = useSelector((state) => state.departments);
//   const { list: designations } = useSelector((state) => state.designations);
//   const { list: categories } = useSelector((state) => state.categories);
//   const { list: enquiries } = useSelector((state) => state.enquiries);


//   const isLoading = useSelector((state) => state.enquiries.isLoading);
//   const error = useSelector((state) => state.enquiries.error);

//   useEffect(() => {
//     dispatch(fetchEnquiries());
//     dispatch(fetchCategories());
//     dispatch(fetchCustomers());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//   }, [dispatch]);
//   console.log(customers); // Check what structure customers have
//   console.log(enquiries); // Check what structure enquiries have

//   const calculateTotal = () => {
//     let subtotal = 0;

//     if (quotationType === "product") {
//       subtotal = products.reduce(
//         (sum, product) => sum + product.quantity * product.price, 0
//       );
//     } else if (quotationType === "service") {
//       subtotal = services.reduce(
//         (sum, service) => sum + (parseFloat(service.quantity) || 1) * (parseFloat(service.service_price) || 0),
//         0
//       );
//     }


//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     return { subtotal, taxAmount, discountAmount, total };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (quotationType === "product") {
//       for (let product of products) {
//         if (!product.product_name || !product.price || !product.quantity) {
//           toast.error("Product name, price, and quantity are required for each product.");
//           return;
//         }
//       }
//     }

//     if (quotationType === "service") {
//       for (let service of services) {
//         if (!service.service_name || !service.service_price) {
//           toast.error("Service name and price are required for each service.");
//           return;
//         }
//       }
//     }

//     const total = calculateTotal();


// // added
// const currentDate = new Date().toISOString().split('T')[0]; // Get today's date

//   // const updatedQuotation = {
//   //   quotation_date: currentDate,  // Or get from input
//   //   tax_percentage: taxPercentage,
//   //   discount_percentage: discountPercentage,
//   //   subtotal: total.subtotal,
//   //   tax_amount: total.taxAmount,
//   //   discount_amount: total.discountAmount,
//   //   total_amount: total.total,
//   //   products: quotationType === "product" ? products : [],
//   //   services: quotationType === "service" ? services : [],
//   // };

//   // Send the updatedQuotation to the backend
//   // console.log(updatedQuotation); // For testing purposes
//     const formData = {
//       quotation_date: currentDate,  // Or get from input
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? services : [],
//     };
//     if (!formData.quotation_date ) {
//       toast.error("Some required fields are missing.");
//       return;
//     }
//     //|| !formData.tax_percentage || !formData.discount_percentage
//     formData.services.forEach((service, index) => {
//       if (!service.service_name || !service.service_price || !service.quantity) {
//         toast.error(`Service at index ${index} is missing required fields.`);
//         return;
//       }
//     });

//     formData.products.forEach((product, index) => {
//       if (!product.product_name || !product.price || !product.quantity) {
//         toast.error(`Product at index ${index} is missing required fields.`);
//         return;
//       }
//     });

//     if (!formData.subtotal || formData.subtotal <= 0) {
//       toast.error("Subtotal must be greater than 0.");
//       return;
//     }

//     const createQuotation = quotationType === "product"
//       ? dispatch(createProductQuotation(formData))
//       : dispatch(createServiceQuotation(formData));

//     createQuotation
//       .unwrap()
//       .then((response) => {
//         toast.success(`${quotationType.charAt(0).toUpperCase() + quotationType.slice(1)} quotation quotation_date successfully!`);
//         dispatch(fetchProductQuotations());
//         dispatch(fetchServiceQuotations());
//         navigate(`/dashboard/crm/quotations`);
//       })
//       // .then((response) => {
//       //   toast.success(`${quotationType.charAt(0).toUpperCase() + quotationType.slice(1)} quotation quotation_date successfully!`);
//       //   dispatch(fetchProductQuotations());
//       //   dispatch(fetchServiceQuotations());
//       //   navigate(`/dashboard/crm/quotations/${quotationType}-quotation`);
//       // })
//       .catch((error) => {
//         toast.error(`Create Error: ${error.message || "Unknown error"}`);
//       });

//   };

//   const total = calculateTotal();
//   // console.log(formData);  // Log the formData to check if `service_name` and `service_price` are included
//   const validateForm = () => {
//     // Check if all product fields are filled
//     if (quotationType === "product") {
//       for (let product of products) {
//         if (!product.product_name || !product.price || !product.quantity) {
//           toast.error("Product name, price, and quantity are required for each product.");
//           return false;
//         }
//       }
//     }

//     // Check if all service fields are filled
//     if (quotationType === "service") {
//       for (let service of services) {
//         if (!service.service_name || !service.service_price || !service.quantity) {
//           toast.error("Service name, price, and quantity are required for each service.");
//           return false;
//         }
//       }
//     }

//     return true;
//   };

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

//           <div className="form-group">


//           <FormControl fullWidth>
//   <InputLabel id="selection-type-label">Select From</InputLabel>
//   <Select
//     labelId="selection-type-label"
//     value={selectionType}
//     onChange={(e) => setSelectionType(e.target.value)}
//     label="Select From"
//   >
//     <MenuItem value="customer">Customer</MenuItem>
//     <MenuItem value="enquiry">Enquiry</MenuItem>
//   </Select>
// </FormControl>
// <Select
//   id="customer-or-enquiry"
//   value={selectedCustomerOrEnquiry}
//   onChange={(e) => setSelectedCustomerOrEnquiry(e.target.value)}
//   fullWidth
//   required
// >
//   <MenuItem value="">Select {selectionType === "customer" ? "Customer" : "Enquiry"}</MenuItem>
//   {selectionType === "customer" && Array.isArray(customers) && customers.length > 0 ? (
//     customers.map((customer) => (
//       <MenuItem key={customer.id} value={customer.id}>
//         {customer.customer_name} {/* Ensure 'name' property exists */}
//       </MenuItem>
//     ))
//   ) : selectionType === "enquiry" && Array.isArray(enquiries) && enquiries.length > 0 ? (
//     enquiries.map((enquiry) => (
//       <MenuItem key={enquiry.id} value={enquiry.id}>
//         {/* {enquiry.enquiry_name} Ensure 'customer_name' property exists */}
//         {enquiry.enquiry_name ? enquiry.enquiry_name : "No Enquiry Name"}
//       </MenuItem>
//     ))
//   ) : (
//     <MenuItem>No {selectionType === "customer" ? "customers" : "enquiries"} available</MenuItem>
//   )}
// </Select>

//           </div>
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
//           <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//               />
//             )}
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
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
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5" color="primary">Total: {total.total.toFixed(2)}</Typography>
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












//changes made in submit form
// import React, { useState,useEffect} from "react";
// import {
//   Box,
//   Grid,
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
// import { fetchCustomers} from "../../redux/slice/customer/customerSlice";
// import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
// import { fetchDesignations } from "../../redux/slice/base/designationSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import {CircularProgress,FormHelperText} from "@mui/material";
// import {fetchProductQuotations,fetchServiceQuotations} from "../../redux/slice/crm/quotationSlice"
// // import{fetch}


// const QuotationForm = () => {
//     const navigate = useNavigate(); // For navigation after form submission
//     const dispatch = useDispatch();
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);
//   // const CustomerOrEnquirySelect = ({ customers, enquiries, formData, setFormData }) => {
//   //   const [selectionType, setSelectionType] = useState("customer"); // State to track if Customer or Enquiry is selected



//   const [products, setProducts] = useState([{ product_name: "", quantity: 1, price: 0 }]);
//   const { list: customers } = useSelector((state) => state.customers);
//   const [services, setServices] = useState([
//     { service_name: "",service_description:"", service_price: 0.0, quantity: 1 }
//   ]);
//   // const { list: customers } = useSelector((state) => state.customers);
//   const { list: departments } = useSelector((state) => state.departments);
//   const { list: designations } = useSelector((state) => state.designations);
//    const { list: categories } = useSelector((state) => state.categories);
//    const enquiries = useSelector((state) => state.enquiries.list);
//    const isLoading = useSelector((state) => state.enquiries.isLoading);
//    const error = useSelector((state) => state.enquiries.error);

//   //  const [formData, setFormData] = useState({
//   //   customerName: "",
//   //   organizationName: "",
//   //   category: "",
//   //   department: "",
//   //   designation: "",
//   //   employeeName: "",
//   //   email: "",
//   //   phone: "",
//   // });

// // Fetch data when component mounts
//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchCustomers());
//     // dispatch(fetchDistricts());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     // dispatch(fetchMunicipalities());
//   }, [dispatch]);

//   const calculateTotal = () => {
//     let subtotal = 0;

//     if (quotationType === "product") {
//       subtotal = products.reduce(
//         (sum, product) => sum + product.quantity * product.price, 0
//       );
//     } else if (quotationType === "service") {
//       // Ensure services array has valid data
//       console.log('Services Array for Calculation:', services);
//       subtotal = services.reduce(
//         (sum, service) => sum + (parseFloat(service.quantity) || 1) * (parseFloat(service.service_price) || 0),
//         0
//       );

//     }
//     // const handleChange = (e) => {
//     //   setFormData({ ...formData, [e.target.name]: e.target.value });
//     // };
//     // Calculate tax and discount
//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     console.log('Calculated Subtotal:', subtotal);
//     console.log('Calculated Tax Amount:', taxAmount);
//     console.log('Calculated Discount Amount:', discountAmount);
//     console.log('Calculated Total:', total);



//     return { subtotal, taxAmount, discountAmount, total };
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate the fields
//     if (quotationType === "product") {
//       for (let product of products) {
//         if (!product.product_name || !product.price || !product.quantity) {
//           toast.error("Product name, price, and quantity are required for each product.");
//           return;
//         }
//       }if (quotationType === "service") {
//         for (let service of services) {
//           if (!service.service_name || !service.service_price) {
//             toast.error("Service name and price are required for each service.");
//             return;
//           }
//         }
//       }

//     // }

//     // if (quotationType === "product") {
//     //   // Check if product fields are missing
//     //   const invalidProduct = products.some((product) => !product.product_name || !product.price || !product.quantity);
//     //   if (invalidProduct) {
//     //     toast.error("All product fields (name, price, and quantity) are required.");
//     //     return;
//     //   }
//     // } else if (quotationType === "service") {
//     //   // Check if service fields are missing
//     //   const invalidService = services.some((service) => !service.service_name || !service.service_price);
//     //   if (invalidService) {
//     //     toast.error("All service fields (name and price) are required.");
//     //     return;
//     //   }
//     }

//     const total = calculateTotal();

//     // Construct the form data
//     const formData = {
//       quotation_date: "",
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? services : [],
//     };

//     // Log formData to check the structure
//     console.log("Form Data before dispatch:", formData);
//     // Validation
//     if (!formData.subtotal || formData.subtotal <= 0) {
//       toast.error('Subtotal must be greater than 0.');
//       return;
//     }

//     // Dispatch action
//     const createQuotation = quotationType === "product"
//       ? dispatch(createProductQuotation(formData))
//       : dispatch(createServiceQuotation(formData));

//     createQuotation
//       .unwrap() // .unwrap() works only for createAsyncThunk actions
//       .then((response) => {
//         toast.success(`${quotationType.charAt(0).toUpperCase() + quotationType.slice(1)} quotation quotation_date successfully!`);
//         // Fetch the updated list of quotations
//         dispatch(fetchProductQuotations());
//         dispatch(fetchServiceQuotations());
//         navigate(`/dashboard/crm/quotation/${quotationType}-quotation`);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         toast.error(`Create Error: ${error.message || 'Unknown error'}`);
//       });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const total = calculateTotal();

//   //   // Construct the form data
//   //   const formData = {
//   //     // customer_name: "",
//   //     // client_email: "",
//   //     // client_phone: "",
//   //     quotation_date: "",
//   //     tax_percentage: taxPercentage,
//   //     discount_percentage: discountPercentage,
//   //     subtotal: total.subtotal,
//   //     tax_amount: total.taxAmount,
//   //     discount_amount: total.discountAmount,
//   //     total_amount: total.total,
//   //     products: quotationType === "product" ? products : [],
//   //     services: quotationType === "service" ? services : [],
//   //   };

//   //   console.log('Submitting form data:', formData);

//   //   // Basic validation to check required fields
//   //   // if (!formData.customer_name || !formData.client_email || !formData.client_phone) {
//   //   //   toast.error('Please fill in all required fields.');
//   //   //   return;
//   //   // }

//   //   // Check if there are valid products or services for each case
//   //   if (quotationType === "product" && products.length === 0) {
//   //     toast.error('Please add at least one product.');
//   //     return;
//   //   }

//   //   if (quotationType === "service" && services.length === 0) {
//   //     toast.error('Please add at least one service.');
//   //     return;
//   //   }

//   //   // Dispatch action with the correct formData
//   //   if (quotationType === "product") {
//   //     dispatch(createProductQuotation(formData))
//   //       .unwrap()
//   //       .then((response) => {
//   //         console.log('Product Quotation Created:', response.data); // Debugging
//   //         toast.success("Product quotation quotation_date successfully!");
//   //         navigate("/dashboard/crm/quotation/product-quotation");
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error:", error);  // Log error products
//   //         toast.error(`Create Error: ${error.message}`);
//   //       });
//   //   } else if (quotationType === "service") {
//   //     dispatch(createServiceQuotation(formData))
//   //       .unwrap()
//   //       .then((response) => {
//   //         console.log('service Quotation Created:', response); // Debugging
//   //         toast.success("Service quotation quotation_date successfully!");
//   //         navigate("/dashboard/crm/quotation/service-quotation");
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error:", error);  // Log error products
//   //         toast.error(`Create Error: ${error.message}`);
//   //       });
//   //   }
//   // };

//   const total = calculateTotal();
//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>
//           {/* card1 */}

//                      {/* Customer Card */}
//           {/* Sender Card */}
//           {/* <Grid container spacing={4}>
//             <Grid item md={6} xs={12}>
//               <Paper elevation={3} sx={{ padding: "20px", borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom>Sender Information</Typography>
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="department-label">Department</InputLabel>
//                   <Select
//                     labelId="department-label"
//                     value={formData.department}
//                     onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                   >
//                     <MenuItem value="">Select Department</MenuItem>
//                     {departments.map((department) => (
//                       <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="designation-label">Designation</InputLabel>
//                   <Select
//                     labelId="designation-label"
//                     value={formData.designation}
//                     onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//                   >
//                     <MenuItem value="">Select Designation</MenuItem>
//                     {designations.map((designation) => (
//                       <MenuItem key={designation.id} value={designation.id}>{designation.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl> */}
//                 {/* customer or enquiry selection */}
//                 {/* <div className="col-md-12"> */}
//       {/* Dropdown to choose between 'Customer' or 'Enquiry' */}
//       {/* <FormControl fullWidth required>
//         <InputLabel id="selection-label">Select Type</InputLabel>
//         <Select
//           labelId="selection-label"
//           id="selection"
//           value={selectionType}
//           onChange={handleSelectionChange}
//           label="Select Type"
//         >
//           <MenuItem value="customer">Customer</MenuItem>
//           <MenuItem value="enquiry">Enquiry</MenuItem>
//         </Select>
//       </FormControl> */}

//       {/* Customer/Enquiry Select dropdown based on the selection */}
//       {/* <FormControl fullWidth required style={{ marginTop: "16px" }}>
//         <InputLabel id="customer-or-enquiry-label">{selectionType === "customer" ? "Customer" : "Enquiry"}</InputLabel>
//         <Select
//           labelId="customer-or-enquiry-label"
//           id="customer-or-enquiry"
//           name={selectionType === "customer" ? "customer_name" : "enquiry_name"}
//           value={formData.customer}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               customer: e.target.value,
//             })
//           }
//           label={selectionType === "customer" ? "Customer" : "Enquiry"}
//         >
//           <MenuItem value="">
//             <em>Select {selectionType === "customer" ? "customer" : "enquiry"}</em>
//           </MenuItem>
//           {selectionType === "customer" && customers.length > 0 ? (
//             customers.map((customer) => (
//               <MenuItem key={customer.id} value={customer.id}>
//                 {customer.customer_name}
//               </MenuItem>
//             ))
//           ) : selectionType === "enquiry" && enquiries.length > 0 ? (
//             enquiries.map((enquiry) => (
//               <MenuItem key={enquiry.id} value={enquiry.id}>
//                 {enquiry.enquiry_name} {/* Assuming enquiry has a 'customer_name' field
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="">
//               <em>No {selectionType === "customer" ? "customers" : "enquiries"} available</em>
//             </MenuItem>
//           )}
//         </Select>
//         <FormHelperText>Choose a {selectionType === "customer" ? "customer" : "enquiry"} from the list</FormHelperText>
//       </FormControl>
//     </div> */}

//             {/* </Paper>
//             </Grid> */}
//             {/* <Grid item md={6} xs={12}>
//               <Paper elevation={3} sx={{ padding: "20px", borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom>Customer Information</Typography>
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="customer-label">Customer</InputLabel>
//                   <Select
//                     labelId="customer-label"
//                     value={formData.customerName}
//                     onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//                   >
//                     <MenuItem value="">Select Customer</MenuItem>
//                     {customers.map((customer) => (
//                       <MenuItem key={customer.id} value={customer.id}>{customer.customer_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   label="Organization Name"
//                   value={formData.organizationName}
//                   onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
//                   sx={{ marginBottom: "15px" }}
//                 />
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="category-label">Category</InputLabel>
//                   <Select
//                     labelId="category-label"
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   >
//                     <MenuItem value="">Select Category</MenuItem>
//                     {categories.map((category) => (
//                       <MenuItem key={category.id} value={category.id}>{category.category_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   sx={{ marginBottom: "15px" }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   sx={{ marginBottom: "15px" }}
//                 />
//               </Paper>
//             </Grid> */}
//           {/* </Grid> */}

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
//           <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
//   <FormControlLabel
//     control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//     label="Include Tax"
//   />
//   {includeTax && (
//     <TextField
//       type="number"
//       label="Tax Percentage (%)"
//       value={taxPercentage}
//       onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//     />
//   )}
//   <FormControlLabel
//     control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//     label="Include Discount"
//   />
//   {includeDiscount && (
//     <TextField
//       type="number"
//       label="Discount Percentage (%)"
//       value={discountPercentage}
//       onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
//     />
//   )}
// </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation products={products} setProducts={setProducts} />
//           ) : (
//             <ServiceQuotation services={services} setServices={setServices} />
//           )}

//           {/* Display Totals */}
//           <Box mt={4} textAlign="center">
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5" color="primary">Total: {total.total.toFixed(2)}</Typography>
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


//adding customer or enquiry
// import React, { useState,useEffect} from "react";
// import {
//   Box,
//   Grid,
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
// import { fetchCustomers} from "../../redux/slice/customer/customerSlice";
// import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
// import { fetchDesignations } from "../../redux/slice/base/designationSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import {CircularProgress,FormHelperText} from "@mui/material";


// const QuotationForm = () => {
//     const navigate = useNavigate(); // For navigation after form submission
//     const dispatch = useDispatch();
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);

//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const { list: customers } = useSelector((state) => state.customers);
//   const [services, setServices] = useState([
//     // { name: "Consultation", description: "Expert advice session.", price: 100.0 },
//     // { name: "Maintenance", description: "Monthly system maintenance.", price: 250.0 },
//   ]);
//   // const { list: customers } = useSelector((state) => state.customers);
//   const { list: departments } = useSelector((state) => state.departments);
//   const { list: designations } = useSelector((state) => state.designations);
//    const { list: categories } = useSelector((state) => state.categories);
//    const enquiries = useSelector((state) => state.enquiries.list);
//    const isLoading = useSelector((state) => state.enquiries.isLoading);
//    const error = useSelector((state) => state.enquiries.error);

//    const [formData, setFormData] = useState({
//     customerName: "",
//     organizationName: "",
//     category: "",
//     department: "",
//     designation: "",
//     employeeName: "",
//     email: "",
//     phone: "",
//   });

// // Fetch data when component mounts
//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchCustomers());
//     // dispatch(fetchDistricts());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     // dispatch(fetchMunicipalities());
//   }, [dispatch]);

//   const calculateTotal = () => {
//     let subtotal = 0;

//     if (quotationType === "product") {
//       subtotal = products.reduce(
//         (sum, product) => sum + product.quantity * product.price, 0
//       );
//     } else if (quotationType === "service") {
//       // Ensure services array has valid data
//       console.log('Services Array for Calculation:', services);
//       subtotal = services.reduce(
//         (sum, service) => sum + (parseFloat(service.quantity) || 1) * (parseFloat(service.service_price) || 0),
//         0
//       );

//     }
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     // Calculate tax and discount
//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     console.log('Calculated Subtotal:', subtotal);
//     console.log('Calculated Tax Amount:', taxAmount);
//     console.log('Calculated Discount Amount:', discountAmount);
//     console.log('Calculated Total:', total);

//     return { subtotal, taxAmount, discountAmount, total };
//   };
//   const CustomerOrEnquirySelect = ({ customers, enquiries, formData, setFormData }) => {
//     const [selectionType, setSelectionType] = useState("customer"); // State to track if Customer or Enquiry is selected

//     const handleSelectionChange = (e) => {
//       setSelectionType(e.target.value); // Switch between customer and enquiry
//       setFormData({
//         ...formData,
//         customer: "", // Reset selected customer or enquiry
//       });
//     };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const total = calculateTotal();

//     // Construct the form data
//     const formData = {
//       customer_name: "",
//       client_email: "",
//       client_phone: "",
//       quotation_date: "",
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? services : [],
//     };

//     console.log('Submitting form data:', formData);

//     // Basic validation to check required fields
//     if (!formData.customer_name || !formData.client_email || !formData.client_phone) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }

//     // Check if there are valid products or services for each case
//     if (quotationType === "product" && products.length === 0) {
//       toast.error('Please add at least one product.');
//       return;
//     }

//     if (quotationType === "service" && services.length === 0) {
//       toast.error('Please add at least one service.');
//       return;
//     }

//     // Dispatch action with the correct formData
//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formData))
//         .unwrap()
//         .then((response) => {
//           console.log('Product Quotation Created:', response); // Debugging
//           toast.success("Product quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/product-quotation");
//         })
//         .catch((error) => {
//           console.error("Error:", error);  // Log error products
//           toast.error(`Create Error: ${error.message}`);
//         });
//     } else if (quotationType === "service") {
//       dispatch(createServiceQuotation(formData))
//         .unwrap()
//         .then((response) => {
//           console.log('service Quotation Created:', response); // Debugging
//           toast.success("Service quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/service-quotation");
//         })
//         .catch((error) => {
//           console.error("Error:", error);  // Log error products
//           toast.error(`Create Error: ${error.message}`);
//         });
//     }
//   };



//   const total = calculateTotal();


//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>
//           {/* card1 */}

//           {/* customer products  */}
//           {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="customer">customer:</label>
//                         <select
//                           id="customer"
//                           name="customer_name"
//                           value={customers.customer_name}
//                           onChange={handleChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               customer: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select customer</option>

//                           {customers.length > 0 ? (
//                             customers.map((customer) => (
//                               <option key={customer.id} value={customer.id}>
//                                 {customer.customer_name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No customers available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="category">categories </label>
//                         <select
//                           id="category"
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select categories</option>
//                           {categories.length > 0 ? (
//                             categories.map((category) => (
//                               <option key={category.id} value={category.id}>
//                                 {category.category_name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No categories available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div> */}
//                     {/* sent by */}
//                     {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="department">Departments:</label>
//                         <select
//                           id="department"
//                           name="department"
//                           value={formData.department}
//                           onChange={handleChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               department: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select department</option>
//                           {departments.length > 0 ? (
//                             departments.map((department) => (
//                               <option key={department.id} value={department.id}>
//                                 {department.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">no departments available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div> */}

//                     {/* designation  */}
//                     {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="designation">Designations:</label>
//                         <select
//                           id="designation"
//                           name="designation"
//                           value={formData.designation}
//                           onChange={handleChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               designation: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select designation</option>
//                           {designations && designations.length > 0 ? (
//                             designations.map((designation) => (
//                               <option
//                                 key={designation.id}
//                                 value={designation.id}
//                               >
//                                 {designation.name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No designations available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div> */}
//                      {/* Customer Card */}
//                                {/* Sender Card */}
//           <Grid container spacing={4}>
//             <Grid item md={6} xs={12}>
//               <Paper elevation={3} sx={{ padding: "20px", borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom>Sender Information</Typography>
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="department-label">Department</InputLabel>
//                   <Select
//                     labelId="department-label"
//                     value={formData.department}
//                     onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                   >
//                     <MenuItem value="">Select Department</MenuItem>
//                     {departments.map((department) => (
//                       <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="designation-label">Designation</InputLabel>
//                   <Select
//                     labelId="designation-label"
//                     value={formData.designation}
//                     onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//                   >
//                     <MenuItem value="">Select Designation</MenuItem>
//                     {designations.map((designation) => (
//                       <MenuItem key={designation.id} value={designation.id}>{designation.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 {/* customer or enquiry selection */}
//                 <div className="col-md-12">
//       {/* Dropdown to choose between 'Customer' or 'Enquiry' */}
//       <FormControl fullWidth required>
//         <InputLabel id="selection-label">Select Type</InputLabel>
//         <Select
//           labelId="selection-label"
//           id="selection"
//           value={selectionType}
//           onChange={handleSelectionChange}
//           label="Select Type"
//         >
//           <MenuItem value="customer">Customer</MenuItem>
//           <MenuItem value="enquiry">Enquiry</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Customer/Enquiry Select dropdown based on the selection */}
//       <FormControl fullWidth required style={{ marginTop: "16px" }}>
//         <InputLabel id="customer-or-enquiry-label">{selectionType === "customer" ? "Customer" : "Enquiry"}</InputLabel>
//         <Select
//           labelId="customer-or-enquiry-label"
//           id="customer-or-enquiry"
//           name={selectionType === "customer" ? "customer_name" : "enquiry_name"}
//           value={formData.customer}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               customer: e.target.value,
//             })
//           }
//           label={selectionType === "customer" ? "Customer" : "Enquiry"}
//         >
//           <MenuItem value="">
//             <em>Select {selectionType === "customer" ? "customer" : "enquiry"}</em>
//           </MenuItem>
//           {selectionType === "customer" && customers.length > 0 ? (
//             customers.map((customer) => (
//               <MenuItem key={customer.id} value={customer.id}>
//                 {customer.customer_name}
//               </MenuItem>
//             ))
//           ) : selectionType === "enquiry" && enquiries.length > 0 ? (
//             enquiries.map((enquiry) => (
//               <MenuItem key={enquiry.id} value={enquiry.id}>
//                 {enquiry.enquiry_name} {/* Assuming enquiry has a 'customer_name' field */}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="">
//               <em>No {selectionType === "customer" ? "customers" : "enquiries"} available</em>
//             </MenuItem>
//           )}
//         </Select>
//         <FormHelperText>Choose a {selectionType === "customer" ? "customer" : "enquiry"} from the list</FormHelperText>
//       </FormControl>
//     </div>
//                   {/* Customer Name Selection */}

//         {/* <div className="col-md-12">
//       <FormControl fullWidth required>
//         <InputLabel id="customer-label">Customer</InputLabel>
//         <Select
//           labelId="customer-label"
//           id="customer"
//           name="customer_name"
//           value={formData.customer}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               customer: e.target.value,
//             })
//           }
//           label="Customer"
//         >
//           <MenuItem value="">
//             <em>Select customer</em>
//           </MenuItem>
//           {customers.length > 0 ? (
//             customers.map((customer) => (
//               <MenuItem key={customer.id} value={customer.id}>
//                 {customer.customer_name}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="">
//               <em>No customers available</em>
//             </MenuItem>
//           )}
//         </Select>
//         <FormHelperText>Choose a customer from the list</FormHelperText>
//       </FormControl>
//     </div> */}
//          {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="customer">customer:</label>
//                         <select
//                           id="customer"
//                           name="customer_name"
//                           value={customers.customer_name}
//                           // onChange={handleChange}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               customer: e.target.value,
//                             })
//                           }
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Select customer</option>

//                           {customers.length > 0 ? (
//                             customers.map((customer) => (
//                               <option key={customer.id} value={customer.id}>
//                                 {customer.customer_name}
//                               </option>
//                             ))
//                           ) : (
//                             <option value="">No customers available</option>
//                           )}
//                         </select>
//                       </div>
//                     </div> */}

//               </Paper>
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <Paper elevation={3} sx={{ padding: "20px", borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom>Customer Information</Typography>
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="customer-label">Customer</InputLabel>
//                   <Select
//                     labelId="customer-label"
//                     value={formData.customerName}
//                     onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//                   >
//                     <MenuItem value="">Select Customer</MenuItem>
//                     {customers.map((customer) => (
//                       <MenuItem key={customer.id} value={customer.id}>{customer.customer_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   label="Organization Name"
//                   value={formData.organizationName}
//                   onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
//                   sx={{ marginBottom: "15px" }}
//                 />
//                 <FormControl fullWidth sx={{ marginBottom: "15px" }}>
//                   <InputLabel id="category-label">Category</InputLabel>
//                   <Select
//                     labelId="category-label"
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   >
//                     <MenuItem value="">Select Category</MenuItem>
//                     {categories.map((category) => (
//                       <MenuItem key={category.id} value={category.id}>{category.category_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   sx={{ marginBottom: "15px" }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   sx={{ marginBottom: "15px" }}
//                 />
//               </Paper>
//             </Grid>
//           </Grid>

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
//           <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
//   <FormControlLabel
//     control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//     label="Include Tax"
//   />
//   {includeTax && (
//     <TextField
//       type="number"
//       label="Tax Percentage (%)"
//       value={taxPercentage}
//       onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//     />
//   )}
//   <FormControlLabel
//     control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//     label="Include Discount"
//   />
//   {includeDiscount && (
//     <TextField
//       type="number"
//       label="Discount Percentage (%)"
//       value={discountPercentage}
//       onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
//     />
//   )}
// </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation products={products} setProducts={setProducts} />
//           ) : (
//             <ServiceQuotation services={services} setServices={setServices} />
//           )}

//           {/* Display Totals */}
//           <Box mt={4} textAlign="center">
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5" color="primary">Total: {total.total.toFixed(2)}</Typography>
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

// import React, { useState, useEffect } from "react";
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
//   Grid,
//   Divider,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation, createServiceQuotation } from "../../redux/slice/crm/quotationSlice";
// import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
// import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
// import { fetchDesignations } from "../../redux/slice/base/designationSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchEnquiries } from "../../redux/slice/crm/enquirySlice";
// import {CircularProgress,FormHelperText} from "@mui/material";
// const QuotationForm = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [quotationType, setQuotationType] = useState("service");
  // const [includeTax, setIncludeTax] = useState(false);
  // const [taxPercentage, setTaxPercentage] = useState(0);
  // const [includeDiscount, setIncludeDiscount] = useState(false);
  // const [discountPercentage, setDiscountPercentage] = useState(0);
  // const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
  // const { list: customers } = useSelector((state) => state.customers);
  // const { list: departments } = useSelector((state) => state.departments);
  // const { list: designations } = useSelector((state) => state.designations);
  // const { list: categories } = useSelector((state) => state.categories);

    // const enquiries = useSelector((state) => state.enquiries.list);
    // const isLoading = useSelector((state) => state.enquiries.isLoading);
    // const error = useSelector((state) => state.enquiries.error);

  // const [formData, setFormData] = useState({
  //   customerName: "",
  //   organizationName: "",
  //   category: "",
  //   department: "",
  //   designation: "",
  //   employeeName: "",
  //   email: "",
  //   phone: "",
  // });

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchCustomers());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//     dispatch(fetchEnquiries());
//   }, [dispatch]);

//   const calculateTotal = () => {
//     let subtotal = 0;
//     if (quotationType === "product") {
//       subtotal = products.reduce(
//         (sum, product) => sum + product.quantity * product.price,
//         0
//       );
//     } else if (quotationType === "service") {
//       subtotal = products.reduce(
//         (sum, service) => sum + (service.quantity ||1) * (service.price||0),
//         0
//       );
//     }
// //calvulate tax and discount
//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     return { subtotal, taxAmount, discountAmount, total };
//   };
//   const total = calculateTotal();
//   // const [total, setTotals] = useState(calculateTotal());

//   // Recalculate total whenever relevant data changes
//   // useEffect(() => {
//   //   setTotals(calculateTotal());
//   // }, [products, services, taxPercentage, discountPercentage, includeTax, includeDiscount, quotationType]);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const total = calculateTotal();
//     const formDataWithTotals = {
//       ...formData,
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? products : [],
//     };

//     // Basic validation
//     if (!formDataWithTotals.customerName || !formDataWithTotals.email || !formDataWithTotals.phone) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     if (quotationType === "product" && products.length === 0) {
//       toast.error("Please add at least one product.");
//       return;
//     }

//     if (quotationType === "service" && products.length === 0) {
//       toast.error("Please add at least one service.");
//       return;
//     }

//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formDataWithTotals))
//         .unwrap()
//         .then((response) => {
//           toast.success("Product quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/product-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.message}`);
//         });
//     } else {
//       dispatch(createServiceQuotation(formDataWithTotals))
//         .unwrap()
//         .then((response) => {
//           toast.success("Service quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/service-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.message}`);
//         });
//     }
//   };


  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

        //   {/* Sender Card */}
        //   <Grid container spacing={4}>
        //     <Grid item md={6} xs={12}>
        //       <Paper elevation={3} sx={{ padding: "20px", borderRadius: 2 }}>
        //         <Typography variant="h6" gutterBottom>Sender Information</Typography>
        //         <FormControl fullWidth sx={{ marginBottom: "15px" }}>
        //           <InputLabel id="department-label">Department</InputLabel>
        //           <Select
        //             labelId="department-label"
        //             value={formData.department}
        //             onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        //           >
        //             <MenuItem value="">Select Department</MenuItem>
        //             {departments.map((department) => (
        //               <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
        //             ))}
        //           </Select>
        //         </FormControl>
        //         <FormControl fullWidth sx={{ marginBottom: "15px" }}>
        //           <InputLabel id="designation-label">Designation</InputLabel>
        //           <Select
        //             labelId="designation-label"
        //             value={formData.designation}
        //             onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
        //           >
        //             <MenuItem value="">Select Designation</MenuItem>
        //             {designations.map((designation) => (
        //               <MenuItem key={designation.id} value={designation.id}>{designation.name}</MenuItem>
        //             ))}
        //           </Select>
        //         </FormControl>
        //           {/* Customer Name Selection */}
        // <FormControl fullWidth required sx={{ marginBottom: "20px" }}>
        //   <InputLabel id="enquiry-label">Customer Name</InputLabel>
        //   <Select
        //     labelId="enquiry-label"
        //     id="enquiry"
        //     name="enquiry_id"
        //     value={formData.enquiry_id}
            //onChange={handleChange}
        //     label="Customer Name"
        //     fullWidth
        //   >
        //     <MenuItem value="">
        //       <em>Select Enquiry</em>
        //     </MenuItem>
        //     {isLoading ? (
        //       <MenuItem disabled>
        //         <CircularProgress size={24} />
        //       </MenuItem>
        //     ) : error ? (
        //       <MenuItem disabled>{error}</MenuItem>
        //     ) : enquiries.length > 0 ? (
        //       enquiries.map((enquiry) => (
        //         <MenuItem key={enquiry.id} value={enquiry.id}>
        //           {enquiry.enquiry_name}
        //         </MenuItem>
        //       ))
        //     ) : (
        //       <MenuItem disabled>No enquiries available</MenuItem>
        //     )}
        //   </Select>
        //   <FormHelperText>Required</FormHelperText>
        // </FormControl>

        //       </Paper>
        //     </Grid>

          //   {/* Customer Card */}
          //   <Grid item md={6} xs={12}>
          //     <Paper elevation={3} sx={{ padding: "20px", borderRadius: 2 }}>
          //       <Typography variant="h6" gutterBottom>Customer Information</Typography>
          //       <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          //         <InputLabel id="customer-label">Customer</InputLabel>
          //         <Select
          //           labelId="customer-label"
          //           value={formData.customerName}
          //           onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          //         >
          //           <MenuItem value="">Select Customer</MenuItem>
          //           {customers.map((customer) => (
          //             <MenuItem key={customer.id} value={customer.id}>{customer.customer_name}</MenuItem>
          //           ))}
          //         </Select>
          //       </FormControl>
          //       <TextField
          //         fullWidth
          //         label="Organization Name"
          //         value={formData.organizationName}
          //         onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
          //         sx={{ marginBottom: "15px" }}
          //       />
          //       <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          //         <InputLabel id="category-label">Category</InputLabel>
          //         <Select
          //           labelId="category-label"
          //           value={formData.category}
          //           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          //         >
          //           <MenuItem value="">Select Category</MenuItem>
          //           {categories.map((category) => (
          //             <MenuItem key={category.id} value={category.id}>{category.category_name}</MenuItem>
          //           ))}
          //         </Select>
          //       </FormControl>
          //       <TextField
          //         fullWidth
          //         label="Email"
          //         value={formData.email}
          //         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          //         sx={{ marginBottom: "15px" }}
          //       />
          //       <TextField
          //         fullWidth
          //         label="Phone"
          //         value={formData.phone}
          //         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          //         sx={{ marginBottom: "15px" }}
          //       />
          //     </Paper>
          //   </Grid>
          // </Grid>

//           {/* Quotation Type Selector */}
//           <FormControl fullWidth mt={3} sx={{ marginBottom: "20px", marginTop: "30px"  }}>
//             <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//             <Select
//               labelId="quotation-type-label"
//               value={quotationType}
//               onChange={(e) => setQuotationType(e.target.value)}
//             >
//               <MenuItem value="service">Service</MenuItem>
//               <MenuItem value="product">Product</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Tax and Discount Section */}
//           <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//                 sx={{ width: "120px" }}
//               />
//             )}
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
//                 sx={{ width: "120px" }}
//               />
//             )}
//           </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation products={products} setProducts={setProducts} />
//           ) : (
//             <ServiceQuotation services={products} setServices={setProducts} />
//           )}

//           {/* Display Totals */}
//           <Box mt={4} textAlign="center">
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5" color="primary">Total: {total.total.toFixed(2)}</Typography>
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


//added letter head
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
//   const [error, setError] = useState("");  // To manage form errors

//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const [services, setServices] = useState([]);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const calculateTotal = () => {
//     let subtotal = 0;

//     if (quotationType === "product") {
//       subtotal = products.reduce(
//         (sum, product) => sum + product.quantity * product.price, 0
//       );
//     } else if (quotationType === "service") {
//       subtotal = services.reduce(
//         (sum, service) => sum + (parseFloat(service.quantity) || 1) * (parseFloat(service.service_price) || 0),
//         0
//       );
//     }

//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     return { subtotal, taxAmount, discountAmount, total };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const total = calculateTotal();

//     // Construct the form data
//     const formData = {
//       customer_name: "",
//       client_email: "",
//       client_phone: "",
//       quotation_date: "",
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? services : [],
//     };

//     // Basic validation to check required fields
//     if (!formData.customer_name || !formData.client_email || !formData.client_phone) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     // Check if there are valid products or services for each case
//     if (quotationType === "product" && products.length === 0) {
//       setError("Please add at least one product.");
//       return;
//     }

//     if (quotationType === "service" && services.length === 0) {
//       setError("Please add at least one service.");
//       return;
//     }

//     // Dispatch action with the correct formData
//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formData))
//         .unwrap()
//         .then((response) => {
//           toast.success("Product quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/product-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.message}`);
//         });
//     } else if (quotationType === "service") {
//       dispatch(createServiceQuotation(formData))
//         .unwrap()
//         .then((response) => {
//           toast.success("Service quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/service-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.message}`);
//         });
//     }
//   };

//   const total = calculateTotal();

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         {/* Letterhead-style Header */}
//         {/* <Box p={3} sx={{ borderBottom: '2px solid #000' }}>
//           <Typography variant="h5" align="center" gutterBottom>
//             [Your Company Letterhead Here]
//           </Typography>
//         </Box> */}

//         {/* Error Message Box */}
//         {error && (
//           <Box p={2} bgcolor="error.main" color="white" mb={2} textAlign="center">
//             <Typography>{error}</Typography>
//           </Box>
//         )}

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
//           <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//               />
//             )}
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
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
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5" color="primary">Total: {total.total.toFixed(2)}</Typography>
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
//card design  customer and sender added.
// import React, { useState, useEffect } from "react";
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
//   Grid,
// } from "@mui/material";
// import ProductQuotation from "./ProductQuotationForm";
// import ServiceQuotation from "./ServiceQuotationForm";
// import { createProductQuotation, createServiceQuotation } from "../../redux/slice/crm/quotationSlice";
// import { fetchCustomers } from "../../redux/slice/customer/customerSlice";
// import { fetchCategories } from "../../redux/slice/crm/categorySlice";
// import { fetchDepartments } from "../../redux/slice/base/departmentSlice";
// import { fetchDesignations } from "../../redux/slice/base/designationSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";

// const QuotationForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [quotationType, setQuotationType] = useState("service");
//   const [includeTax, setIncludeTax] = useState(false);
//   const [taxPercentage, setTaxPercentage] = useState(0);
//   const [includeDiscount, setIncludeDiscount] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(0);
//   const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
//   const { list: customers } = useSelector((state) => state.customers);
//   const { list: departments } = useSelector((state) => state.departments);
//   const { list: designations } = useSelector((state) => state.designations);
//   const { list: categories } = useSelector((state) => state.categories);
//   const [formData, setFormData] = useState({
//     customerName: "",
//     organizationName: "",
//     category: "",
//     department: "",
//     designation: "",
//     employeeName: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchCustomers());
//     dispatch(fetchDesignations());
//     dispatch(fetchDepartments());
//   }, [dispatch]);

//   const calculateTotal = () => {
//     let subtotal = 0;
//     if (quotationType === "product") {
//       subtotal = products.reduce(
//         (sum, product) => sum + product.quantity * product.price,
//         0
//       );
//     } else if (quotationType === "service") {
//       subtotal = products.reduce(
//         (sum, service) => sum + service.quantity * service.price,
//         0
//       );
//     }

//     const taxAmount = includeTax ? (subtotal * taxPercentage) / 100 : 0;
//     const discountAmount = includeDiscount ? (subtotal * discountPercentage) / 100 : 0;
//     const total = subtotal + taxAmount - discountAmount;

//     return { subtotal, taxAmount, discountAmount, total };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const total = calculateTotal();
//     const formDataWithTotals = {
//       ...formData,
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? products : [],
//     };

//     // Basic validation
//     if (!formDataWithTotals.customerName || !formDataWithTotals.email || !formDataWithTotals.phone) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     if (quotationType === "product" && products.length === 0) {
//       toast.error("Please add at least one product.");
//       return;
//     }

//     if (quotationType === "service" && products.length === 0) {
//       toast.error("Please add at least one service.");
//       return;
//     }

//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formDataWithTotals))
//         .unwrap()
//         .then((response) => {
//           toast.success("Product quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/product-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.message}`);
//         });
//     } else {
//       dispatch(createServiceQuotation(formDataWithTotals))
//         .unwrap()
//         .then((response) => {
//           toast.success("Service quotation quotation_date successfully!");
//           navigate("/dashboard/crm/quotation/service-quotation");
//         })
//         .catch((error) => {
//           toast.error(`Create Error: ${error.message}`);
//         });
//     }
//   };

//   const total = calculateTotal();

//   return (
//     <Box p={4} maxWidth="900px" mx="auto">
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Quotation Form
//           </Typography>

//           {/* Sender Card */}
//           <Grid container spacing={3}>
//             <Grid item md={6} xs={12}>
//               <Paper elevation={3} p={2}>
//                 <Typography variant="h6" gutterBottom>Sender Information</Typography>
//                 <FormControl fullWidth>
//                   <InputLabel id="department-label">Department</InputLabel>
//                   <Select
//                     labelId="department-label"
//                     value={formData.department}
//                     onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                   >
//                     <MenuItem value="">Select Department</MenuItem>
//                     {departments.map((department) => (
//                       <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth mt={2}>
//                   <InputLabel id="designation-label">Designation</InputLabel>
//                   <Select
//                     labelId="designation-label"
//                     value={formData.designation}
//                     onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//                   >
//                     <MenuItem value="">Select Designation</MenuItem>
//                     {designations.map((designation) => (
//                       <MenuItem key={designation.id} value={designation.id}>{designation.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 {/* Add Employee Name field */}
//                 <TextField
//                   fullWidth
//                   label="Employee Name"
//                   value={formData.employeeName}
//                   onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
//                   mt={2}
//                 />
//               </Paper>
//             </Grid>

//             {/* Customer Card */}
//             <Grid item md={6} xs={12}>
//               <Paper elevation={3} p={2}>
//                 <Typography variant="h6" gutterBottom>Customer Information</Typography>
//                 <FormControl fullWidth>
//                   <InputLabel id="customer-label">Customer</InputLabel>
//                   <Select
//                     labelId="customer-label"
//                     value={formData.customerName}
//                     onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//                   >
//                     <MenuItem value="">Select Customer</MenuItem>
//                     {customers.map((customer) => (
//                       <MenuItem key={customer.id} value={customer.id}>{customer.customer_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   label="Organization Name"
//                   value={formData.organizationName}
//                   onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
//                   mt={2}
//                 />
//                 <FormControl fullWidth mt={2}>
//                   <InputLabel id="category-label">Category</InputLabel>
//                   <Select
//                     labelId="category-label"
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   >
//                     <MenuItem value="">Select Category</MenuItem>
//                     {categories.map((category) => (
//                       <MenuItem key={category.id} value={category.id}>{category.category_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   mt={2}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   mt={2}
//                 />
//               </Paper>
//             </Grid>
//           </Grid>

//           {/* Quotation Type Selector */}
//           <FormControl fullWidth mt={3}>
//             <InputLabel id="quotation-type-label">Quotation Type</InputLabel>
//             <Select
//               labelId="quotation-type-label"
//               value={quotationType}
//               onChange={(e) => setQuotationType(e.target.value)}
//             >
//               <MenuItem value="service">Service</MenuItem>
//               <MenuItem value="product">Product</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Tax and Discount Section */}
//           <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
//             <FormControlLabel
//               control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
//               label="Include Tax"
//             />
//             {includeTax && (
//               <TextField
//                 type="number"
//                 label="Tax Percentage (%)"
//                 value={taxPercentage}
//                 onChange={(e) => setTaxPercentage(e.target.value ? +e.target.value : 0)}
//               />
//             )}
//             <FormControlLabel
//               control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
//               label="Include Discount"
//             />
//             {includeDiscount && (
//               <TextField
//                 type="number"
//                 label="Discount Percentage (%)"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(e.target.value ? +e.target.value : 0)}
//               />
//             )}
//           </Box>

//           {/* Render either ProductQuotation or ServiceQuotation */}
//           {quotationType === "product" ? (
//             <ProductQuotation products={products} setProducts={setProducts} />
//           ) : (
//             <ServiceQuotation services={products} setServices={setProducts} />
//           )}

//           {/* Display Totals */}
//           <Box mt={4} textAlign="center">
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5" color="primary">Total: {total.total.toFixed(2)}</Typography>
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

//adding customer  products



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

//     const total = calculateTotal();
//     const formData = {
//       customer_name: "",
//       client_email: "",
//       client_phone: "",
//       quotation_date: "",
//       tax_percentage: taxPercentage,
//       discount_percentage: discountPercentage,
//       subtotal: total.subtotal,
//       tax_amount: total.taxAmount,
//       discount_amount: total.discountAmount,
//       total_amount: total.total,
//       products: quotationType === "product" ? products : [],
//       services: quotationType === "service" ? services : [],
//     };

//     if (quotationType === "product") {
//       dispatch(createProductQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Product quotation quotation_date successfully!");
//           navigate("/dashboard/crm/product-quotation");
//         })
//         .catch((error) => toast.error(`Create Error: ${error.message}`));
//     } else if (quotationType === "service") {
//       dispatch(createServiceQuotation(formData))
//         .unwrap()
//         .then(() => {
//           toast.success("Service quotation quotation_date successfully!");
//           navigate("/dashboard/crm/service-quotation");
//         })
//         .catch((error) => toast.error(`Create Error: ${error.message}`));
//     }
//   };

//   const total = calculateTotal();

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
//             <Typography variant="h6">Subtotal: {total.subtotal.toFixed(2)}</Typography>
//             <Typography variant="h6">Tax: {total.taxAmount.toFixed(2)}</Typography>
//             <Typography variant="h6">Discount: {total.discountAmount.toFixed(2)}</Typography>
//             <Typography variant="h5">Total: {total.total.toFixed(2)}</Typography>
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
//     customer_name: "",
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
//           toast.success("Product quotation quotation_date successfully!");
//           setFormData({
//             customer_name: "",
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
//           toast.success("Service quotation quotation_date successfully!");
//           setFormData({
//             customer_name: "",
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
//     customer_name: "",
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
//           toast.success("Product quotation quotation_date successfully!");
//           setFormData({
//             customer_name: "",
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
//           toast.success("Service quotation quotation_date successfully!");
//           setFormData({
//             customer_name: "",
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
//       customer_name:"",
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
//                 toast.success("product quotation quotation_date successfully!");
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
//   // State for "From" products
//   const [fromDetails, setFromDetails] = useState({
//     name: "Paaru Rawal",
//     title: "Software Engineer | AI Enthusiast",
//     contact: "+977 9828889263",
//     email: "paarurawal@gmail.com",
//     location: "AB Dev Factory, Lalitpur Nakhu",
//   });

//   // State for "Acceptance" products
//   const [acceptanceDetails, setAcceptanceDetails] = useState({
//     customer_name: "",
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

//   // Update product products
//   const updateProduct = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//    // Add a new product row
//    const addServiceRow = () => {
//     setServices([...services, { name: "", description: 1, price: 0 }]);
//   };

//   // Update product products

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
//               <Typography variant="body1">Include your service products here.</Typography>

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
//               If you agree to the terms and service quotation, please fill in the products below.
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



