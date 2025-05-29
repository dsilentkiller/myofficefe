import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetchProductQuotationById } from "../../../redux/slice/admin/crm/quotationSlice";

const ProductQuotationDetail = () => {
  const { id } = useParams(); // Access quotation ID from the URL
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuotationDetails = async () => {
      try {
        const response = await fetchProductQuotationById(id); // Fetch quotation by ID
        setQuotation(response); // Set quotation data to state
      } catch (error) {
        console.error("Error fetching product quotation details", error);
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
        <Typography variant="h4" gutterBottom>
          Product Quotation Details
        </Typography>

        <Typography variant="h6">
          Customer Name: {quotation.customer_name}
        </Typography>
        <Typography variant="h6">
          Enquiry Name: {quotation.enquiry_name}
        </Typography>
        <Typography variant="h6">
          Quotation Date: {quotation.quotation_date}
        </Typography>
        <Typography variant="h6">
          Tax Percentage: {quotation.tax_percentage}%
        </Typography>
        <Typography variant="h6">
          Discount Percentage: {quotation.discount_percentage}%
        </Typography>
        <Typography variant="h6">
          Total Amount: ${quotation.total_amount}
        </Typography>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotation.products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>${product.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
          Back
        </Button>
      </Paper>
    </div>
  );
};

export default ProductQuotationDetail;

// #=========================
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {fetchProductQuotationsById  } from "../../redux/slice/crm/quotationSlice";

// const ProductQuotationDetail = () => {
//   const { id } = useParams(); // Get quotation ID from URL
//   const dispatch = useDispatch();

//   // Get data from Redux store
//   const { quotation, loading, error } = useSelector((state) => state.quotation);

//   // Fetch quotation details on mount
//   useEffect(() => {
//     console.log("Fetching quotation for ID:", id);
//     dispatch(fetchProductQuotationsById(id));
//   }, [dispatch, id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!quotation) {
//     return <div>No quotation found</div>;
//   }

//   return (
//     <div className="quotation-detail">
//       <h1>Quotation #{quotation.id}</h1>
//       <div>
//         <strong>Selection Type:</strong> {quotation.selection_type}
//       </div>
//       {quotation.selection_type === "customer" && (
//         <div>
//           <strong>Customer:</strong> {quotation.customer?.name || "N/A"}
//         </div>
//       )}
//       {quotation.selection_type === "enquiry" && (
//         <div>
//           <strong>Enquiry:</strong> {quotation.enquiry?.title || "N/A"}
//         </div>
//       )}
//       <div>
//         <strong>Quotation Date:</strong> {quotation.quotation_date}
//       </div>
//       <div>
//         <strong>Tax Percentage:</strong> {quotation.tax_percentage}%
//       </div>
//       <div>
//         <strong>Discount Percentage:</strong> {quotation.discount_percentage}%
//       </div>
//       <div>
//         <strong>Total Amount:</strong> ${quotation.total_amount}
//       </div>
//       <div>
//         <strong>Subtotal:</strong> ${quotation.subtotal || "N/A"}
//       </div>
//       <div>
//         <strong>Net Amount:</strong> ${quotation.net_amount}
//       </div>
//       <div>
//         <h3>Quotation Products:</h3>
//         <ul>
//           {quotation.products?.map((product) => (
//             <li key={product.id}>
//               <div>{product.product_name}</div>
//               <div>Quantity: {product.quantity}</div>
//               <div>Price: ${product.price}</div>
//               <div>Total: ${product.total}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProductQuotationDetail;
