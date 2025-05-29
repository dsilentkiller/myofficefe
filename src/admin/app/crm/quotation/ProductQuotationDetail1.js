// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProductQuotationDetail, fetchServiceQuotationDetail } from "../../redux/slice/crm/quotationSlice";
// import { format } from "date-fns"; // Use this to format dates if needed.

// const ProductionQuotationDetail = () => {
//   const { id } = useParams(); // Get the quotation ID from the URL
//   const dispatch = useDispatch();
//   const [quotationDetails, setQuotationDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch product and service quotations based on ID
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         // const productDetails = await dispatch(fetchProductQuotationDetail(id)).unwrap();
//         // const serviceDetails = await dispatch(fetchServiceQuotationDetail(id)).unwrap();

//         // Combine product or service data
//         if (productDetails) {
//           setQuotationDetails({ ...productDetails, quotation_type: "Product" });
//         } else if (serviceDetails) {
//           setQuotationDetails({ ...serviceDetails, quotation_type: "Service" });
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching quotation details:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [dispatch, id]);

//   // If loading, display loading message
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // If no quotation found, show error message
//   if (!quotationDetails) {
//     return <div>Quotation not found!</div>;
//   }

//   const { customer_name, created, items, price, subtotal, tax_amount, discount_amount, total_amount, quotation_type } = quotationDetails;

//   return (
//     <div className="quotation-detail-container">
//       <div className="quotation-header">
//         <h1>{quotation_type} Quotation</h1>
//         <p><strong>Customer Name:</strong> {customer_name}</p>
//         <p><strong>Quotation Date:</strong> {format(new Date(created), 'MMMM dd, yyyy')}</p>
//         <p><strong>Quotation ID:</strong> {id}</p>
//       </div>

//       <div className="quotation-items">
//         <h2>Items</h2>
//         <table className="invoice-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{index + 1}</td>
//                 <td>{item.product_name || item.service_name}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.price}</td>
//                 <td>{(item.quantity * item.price).toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="quotation-summary">
//         <h3>Summary</h3>
//         <table className="invoice-summary-table">
//           <tbody>
//             <tr>
//               <td>Subtotal</td>
//               <td>{subtotal}</td>
//             </tr>
//             <tr>
//               <td>Tax Amount</td>
//               <td>{tax_amount}</td>
//             </tr>
//             <tr>
//               <td>Discount</td>
//               <td>{discount_amount}</td>
//             </tr>
//             <tr className="total-row">
//               <td><strong>Total Amount</strong></td>
//               <td><strong>{total_amount}</strong></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="actions">
//         <button className="btn btn-primary" onClick={() => window.print()}>Print Invoice</button>
//       </div>
//     </div>
//   );
// };

// export default ProductionQuotationDetail;
