const handleSubmit = (e) => {
  e.preventDefault();

  // Ensure either customer or enquiry is selected
  if (!selectedCustomerOrEnquiry) {
    toast.error(`Please select a ${selectionType === "customer" ? "customer" : "enquiry"}`);
    return;
  }

  const total = calculateTotal();

  // Get the selected customer or enquiry by ID
  const selectedItem =
    selectionType === "customer"
      ? customers.find((customer) => customer.id === selectedCustomerOrEnquiry)
      : enquiries.find((enquiry) => enquiry.id === selectedCustomerOrEnquiry);

  // Log the selected item for debugging
  console.log("Selected Item:", selectedItem);

  // If the selected item is not found, show an error
  if (!selectedItem) {
    toast.error(`Selected ${selectionType} not found`);
    return;
  }

  // Construct the form data
  const formData = {
    enquiry: null, // Ensure this is populated with the correct ID
    customer: null,
    quotation_date: currentDate,
    tax_percentage: taxPercentage,
    discount_percentage: discountPercentage,
    subtotal: total.subtotal,
    tax_amount: total.taxAmount,
    discount_amount: total.discountAmount,
    total_amount: total.total,
    products: quotationType === "product" ? products : [],
    services: quotationType === "service" ? services.map((service) => service.id) : [], // Send service IDs only
    selection_type: selectionType,
  };

  // If selected is customer, set customer details
  if (selectionType === "customer") {
    formData.customer = selectedItem.id; // Ensure customer_id is set
    formData.customer_name = selectedItem.customer_name; // Add customer_name to formData
  } else if (selectionType === "enquiry") {
    formData.enquiry = selectedItem.id; // Ensure enquiry_id is set
    formData.enquiry_name = selectedItem.enquiry_name || selectedItem.customer_name; // Add enquiry_name to formData
  }

  // Log formData for debugging
  console.log("Form Data:", formData);

  // Validate required fields for services and products
  const validateServiceFields = services.every((service, index) => {
    if (!service.service_name || !service.service_price || !service.quantity) {
      toast.error(`Service at index ${index} is missing required fields.`);
      return false;
    }
    return true;
  });

  const validateProductFields = products.every((product, index) => {
    if (!product.product_name || !product.price || !product.quantity) {
      toast.error(`Product at index ${index} is missing required fields.`);
      return false;
    }
    return true;
  });

  // If there are missing fields, stop form submission
  if (!validateServiceFields || !validateProductFields) {
    return;
  }

  // Ensure subtotal is valid
  if (!formData.subtotal || formData.subtotal <= 0) {
    toast.error("Subtotal must be greater than 0.");
    return;
  }

  // Ensure customer_name or enquiry_name is set
  if (!formData.customer_name && !formData.enquiry_name) {
    toast.error("Either customer_name or enquiry_name must be provided.");
    return;
  }

  // Make API request to create the quotation
  const createQuotation =
    quotationType === "product"
      ? dispatch(createProductQuotation(formData))
      : dispatch(createServiceQuotation(formData));

  createQuotation
    .unwrap()
    .then((response) => {
      toast.success(
        `${quotationType.charAt(0).toUpperCase() + quotationType.slice(1)} quotation created successfully!`
      );
      dispatch(fetchProductQuotations());
      dispatch(fetchServiceQuotations());
      navigate(`/dashboard/crm/quotations`);
    })
    .catch((error) => {
      console.log("Create Error:", error);

      if (error.errors) {
        // Log all errors for specific fields
        Object.entries(error.errors).forEach(([field, messages]) => {
          messages.forEach((msg) => toast.error(`${field}: ${msg}`));
        });
      } else {
        toast.error(`Create Error: ${error.message || "Unknown error"}`);
      }
    });
};
