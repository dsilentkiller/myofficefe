import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {fetchProductQuotationsById  } from "../../redux/slice/crm/quotationSlice";

const ProductQuotationDetail = () => {
  const { id } = useParams(); // Get quotation ID from URL
  const dispatch = useDispatch();

  // Get data from Redux store
  const { quotation, loading, error } = useSelector((state) => state.quotation);

  // Fetch quotation details on mount
  useEffect(() => {
    console.log("Fetching quotation for ID:", id);
    dispatch(fetchProductQuotationsById(id));
  }, [dispatch, id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quotation) {
    return <div>No quotation found</div>;
  }

  return (
    <div className="quotation-detail">
      <h1>Quotation #{quotation.id}</h1>
      <div>
        <strong>Selection Type:</strong> {quotation.selection_type}
      </div>
      {quotation.selection_type === "customer" && (
        <div>
          <strong>Customer:</strong> {quotation.customer?.name || "N/A"}
        </div>
      )}
      {quotation.selection_type === "enquiry" && (
        <div>
          <strong>Enquiry:</strong> {quotation.enquiry?.title || "N/A"}
        </div>
      )}
      <div>
        <strong>Quotation Date:</strong> {quotation.quotation_date}
      </div>
      <div>
        <strong>Tax Percentage:</strong> {quotation.tax_percentage}%
      </div>
      <div>
        <strong>Discount Percentage:</strong> {quotation.discount_percentage}%
      </div>
      <div>
        <strong>Total Amount:</strong> ${quotation.total_amount}
      </div>
      <div>
        <strong>Subtotal:</strong> ${quotation.subtotal || "N/A"}
      </div>
      <div>
        <strong>Net Amount:</strong> ${quotation.net_amount}
      </div>
      <div>
        <h3>Quotation Products:</h3>
        <ul>
          {quotation.products?.map((product) => (
            <li key={product.id}>
              <div>{product.product_name}</div>
              <div>Quantity: {product.quantity}</div>
              <div>Price: ${product.price}</div>
              <div>Total: ${product.total}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductQuotationDetail;
