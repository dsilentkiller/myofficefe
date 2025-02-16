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
  
    // Add customer_name if selection_type is 'customer'
    if (selectionType === "customer" && selectedCustomerOrEnquiry) {
      formData.customer_name = selectedCustomerOrEnquiry;  // Add customer_name
    } else if (selectionType === "enquiry" && selectedCustomerOrEnquiry) {
      formData.enquiry_name = selectedCustomerOrEnquiry;  // Add enquiry_name
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