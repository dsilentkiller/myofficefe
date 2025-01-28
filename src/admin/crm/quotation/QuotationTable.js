
import React, { useState, useEffect } from "react";
import GeneralTable from "../../hrm/GeneralTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductQuotations, deleteProductQuotation, deleteServiceQuotation, fetchServiceQuotations } from "../../redux/slice/crm/quotationSlice";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuotationTable = () => {
  const dispatch = useDispatch();
  // const Quotations = useSelector((state) => state.quotations?.list || []); // Safely access 'list'

const Quotations = useSelector((state) => state.quotations?.list || []);
console.log(Quotations); // Check if it's updating correctly
  const navigate = useNavigate();
  const [quotationToDelete, setQuotationToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductQuotations());
    dispatch(fetchServiceQuotations());
  }, [dispatch]);


  const productQuotations = useSelector((state) => state.quotations?.productQuotations || []);
  const serviceQuotations = useSelector((state) => state.quotations?.serviceQuotations || []);
  const list = [...productQuotations, ...serviceQuotations];

  const formattedQuotations = list.map((quotation, index) => ({
    ...quotation,
    index: index + 1,
  }));

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/quotations/edit/${rowData.id}`);
    } else if (actionKey === "delete") {
      setQuotationToDelete(rowData.id);
      setIsDeleteModalOpen(true);
    } else if (actionKey === "view") {
      navigate(`/quotations/detail/${rowData.id}`);
    }
  };

  const handleAdd = () => {
    navigate('/dashboard/crm/quotation/create');
  };

  const handleEdit = (quotation) => {
    navigate(`/dashboard/crm/quotation/update/${quotation.id}/`);
  };

  const handleView = (quotation) => {
    navigate(`/dashboard/crm/quotation/detail/${quotation.id}/`);
  };

  const handleDelete = (quotation) => {
    setQuotationToDelete(quotation.id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalConfirm = () => {
    if (quotationToDelete) {
      dispatch(deleteProductQuotation(quotationToDelete))
        .unwrap()
        .then(() => toast.success("Quotation deleted successfully"))
        .catch((err) => toast.error(`Error: ${err.message}`));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="content-wrapper">
      <GeneralTable
        title="Quotations"
        data={formattedQuotations}
        columns={[
          { label: "#", field: "index" },
          { label: "quotation type", field: "quotation_type" },
          { label: "product name", field: "product_name", sortable: true },
          { label: "Product quantity", field: "quantity" },
          { label: "product price", field: "price" },
          { label: "product quantity", field: "quantity" },

          // { label: "product name", field: "service_name", sortable: true },
          // { label: "Description", field: "service_description" },
          // { label: "quantity", field: "quantity" },
          // { label: "service price", field: "service_price" },
          { label: "Subtotal", field: "subtotal", sortable: true },
          { label: "Tax amount", field: "tax_amount" },
          { label: "Discount Amount", field: "discount_amount" },
          { label: "total amount", field: "total_amount" },
        ]}
        actions={[
          { label: "Edit", icon: <Edit />, key: "edit" },
          { label: "Delete", icon: <Delete />, key: "delete" },
          { label: "View", icon: <Visibility />, key: "view" },
        ]}
        onRowAction={handleRowAction}
        onAdd={handleAdd}
      />
      {/* {isDeleteModalOpen && (
        <QuotationDelete
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteModalConfirm}
        />
      )} */}
    </div>
  );
};

export default QuotationTable;



// import React, { useState, useEffect } from "react";
// import GeneralTable from "../../hrm/GeneralTable";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductQuotations, deleteProductQuotation,deleteServiceQuotation, fetchServiceQuotations } from "../../redux/slice/crm/quotationSlice";
// import { Edit, Delete, Visibility } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // import QuotationDelete from "./QuotationDelete"; // Import your delete confirmation modal

// const QuotationTable = () => {
//   const dispatch = useDispatch();
//   const Quotations = useSelector((state) => state.Quotations.list || []);
//   const navigate = useNavigate();
//   const [quotationToDelete, setQuotationToDelete] = useState(null); // Store the project id to delete
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state

//   useEffect(() => {
//     dispatch(fetchProductQuotations());
//     dispatch(fetchServiceQuotations())
//   }, [dispatch]);

//   const productQuotations = useSelector((state) => state.quotation.productQuotations || []);
//   const serviceQuotations = useSelector((state) => state.quotation.serviceQuotations || []);
//   const list = [...productQuotations, ...serviceQuotations];  // Merge both product and service quotations

//   const formattedQuotations = list.map((quotation, index) => ({
//     ...quotation,
//     index: index + 1, // Add the index dynamically
//   }));

//   const handleRowAction = (actionKey, rowData) => {
//     if (actionKey === "edit") {
//       navigate(`/quotations/edit/${rowData.id}`);
//     } else if (actionKey === "delete") {
//       setQuotationToDelete(rowData.id); // Set the project to delete
//       setIsDeleteModalOpen(true); // Open the delete confirmation modal
//     } else if (actionKey === "view") {
//       navigate(`/quotations/detail/${rowData.id}`);
//     }
//   };


//   const handleAdd = () => {

//     navigate('/dashboard/crm/quotation/create');
//   };

//   const handleEdit = (quotation) => {
//     navigate(`/dashboard/crm/quotation/update/${quotation.id}/`);
//   };

//   const handleView = (quotation) => {
//     navigate(`/dashboard/crm/quotation/detail/${quotation.id}/`);
//   };
//   // This is the function for deleting a project
//   const handleDelete = (quotation) => {

//     setQuotationToDelete(quotation.id); // Store the project ID to delete
//     setIsDeleteModalOpen(true); // Open the delete confirmation modal
//   };
//   const handleDeleteModalConfirm = () => {
//     // Handle delete based on quotation type
//     if (quotationToDelete) {
//       dispatch(deleteProductQuotation(quotationToDelete)) // or deleteServiceQuotation
//         .unwrap()
//         .then(() => toast.success("Quotation deleted successfully"))
//         .catch((err) => toast.error(`Error: ${err.message}`));

//       setIsDeleteModalOpen(false);
//     }
//   };



//   return (
//     <div className="content-wrapper">
//       <GeneralTable
//         title="Quotations"
//         data={formattedQuotations}
//         columns={[
//           { label: "#", field: "index" },
//           { label: "product name", field: "product_name", sortable: true },
//           { label: "Product quantity", field: "quantity" },
//           { label: "product price", field: "price" },
//           { label: "product quantity", field: "quantity" },

//           // service
//           { label: "product name", field: "service_name", sortable: true },
//           { label: "Description", field: "service_description" },
//           { label: "quantity", field: "quantity" },
//           { label: "service price", field: "service_price" },
//              //tatal details
//           { label: "Subtotal", field: "subtotal", sortable: true },
//           { label: "Tax amount", field: "tax_amount" },
//           { label: "Discount Amount", field: "discount_amount" },
//           { label: "total amount", field: "total_amount" },



//         ]}
//         actions={[
//           { label: "Edit", icon: <Edit />, key: "edit" },
//           { label: "Delete", icon: <Delete />, key: "delete" },
//           { label: "View", icon: <Visibility />, key: "view" },
//         ]}
//         onRowAction={(actionKey, rowData) => handleRowAction(actionKey, rowData)}

//         onEdit={handleEdit}
//         onView={handleView}
//         onDelete= {handleDelete}
//         onAdd={handleAdd}
//       />

//       {/* Delete Confirmation Modal */}
//       {/* {isDeleteModalOpen && (
//         <QuotationDelete
//           id={quotationToDelete}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={handleDelete}
//         />
//       )} */}
//     </div>
//   );
// };

// export default QuotationTable;

// import React from "react";

// const QuotationTable = ({ formData = {} }) => {
//     const {
//         tax_percentage = 0,
//         discount_percentage = 0,
//         subtotal = 0,
//         tax_amount = 0,
//         discount_amount = 0,
//         total_amount = 0,
//     } = formData;

//     return (
//         <div>
//             <h3>Quotation Summary</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Subtotal</th>
//                         <th>Tax Percentage</th>
//                         <th>Tax Amount</th>
//                         <th>Discount Percentage</th>
//                         <th>Discount Amount</th>
//                         <th>Total Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{subtotal.toFixed(2)}</td>
//                         <td>{tax_percentage}%</td>
//                         <td>{tax_amount.toFixed(2)}</td>
//                         <td>{discount_percentage}%</td>
//                         <td>{discount_amount.toFixed(2)}</td>
//                         <td>{total_amount.toFixed(2)}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default QuotationTable;


// import React from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// const QuotationTable = ({ formData }) => {
//   // if (!formData) {
//   //   return (
//   //     <Box p={4} textAlign="center">
//   //       <Typography variant="h6" color="textSecondary">
//   //         No data available to display.
//   //       </Typography>
//   //     </Box>
//   //   );
//   // }

//   const {
//     // client_name,
//     // client_email,
//     // client_phone,
//     // quotation_date,
//     tax_percentage,
//     discount_percentage,
//     subtotal,
//     tax_amount,
//     discount_amount,
//     total_amount,
//     products,
//     services,
//   } = formData;

//   return (
//     <Box p={4}>
//       <Paper elevation={3}>
//         <Box p={3}>
//           <Typography variant="h5" align="center" gutterBottom>
//             Quotation Details
//           </Typography>

//           {/* <Typography variant="subtitle1">
//             <strong>Client Name:</strong> {client_name || "N/A"}
//           </Typography>
//           <Typography variant="subtitle1">
//             <strong>Client Email:</strong> {client_email || "N/A"}
//           </Typography>
//           <Typography variant="subtitle1">
//             <strong>Client Phone:</strong> {client_phone || "N/A"}
//           </Typography>
//           <Typography variant="subtitle1">
//             <strong>Quotation Date:</strong> {quotation_date || "N/A"}
//           </Typography> */}

//           <Box mt={3}>
//             <Typography variant="h6">Summary</Typography>
//             <Typography>
//               <strong>Subtotal:</strong> {subtotal.toFixed(2)}
//             </Typography>
//             <Typography>
//               <strong>Tax ({tax_percentage}%):</strong> {tax_amount.toFixed(2)}
//             </Typography>
//             <Typography>
//               <strong>Discount ({discount_percentage}%):</strong> {discount_amount.toFixed(2)}
//             </Typography>
//             <Typography>
//               <strong>Total:</strong> {total_amount.toFixed(2)}
//             </Typography>
//           </Box>

//           <Box mt={4}>
//             <Typography variant="h6">
//               {products.length > 0 ? "Product Details" : "Service Details"}
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Name</strong></TableCell>
//                     {products.length > 0 && (
//                       <>
//                         <TableCell><strong>Quantity</strong></TableCell>
//                         <TableCell><strong>Price</strong></TableCell>
//                         <TableCell><strong>Total</strong></TableCell>
//                       </>
//                     )}
//                     {services.length > 0 && (
//                       <>
//                         <TableCell><strong>Description</strong></TableCell>
//                         <TableCell><strong>Price</strong></TableCell>
//                       </>
//                     )}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {products.length > 0 &&
//                     products.map((product, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{product.product_name}</TableCell>
//                         <TableCell>{product.quantity}</TableCell>
//                         <TableCell>{product.price.toFixed(2)}</TableCell>
//                         <TableCell>
//                           {(product.quantity * product.price).toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   {services.length > 0 &&
//                     services.map((service, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{service.service_name}</TableCell>
//                         <TableCell>{service.service_description}</TableCell>
//                         <TableCell>{service.service_price.toFixed(2)}</TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default QuotationTable;

