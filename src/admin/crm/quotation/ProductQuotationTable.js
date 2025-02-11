import React, { useEffect, useState } from "react";
import {
  IconButton,
  Collapse,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  Tooltip,
  Button,

  TextField,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { ExpandMore, ExpandLess, Edit, Delete, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductQuotations } from "../../redux/slice/crm/quotationSlice";
import { useNavigate,Link} from "react-router-dom";
 // Modal open state

const ProductQuotationTable = () => {
  const [expandedRows, setExpandedRows] = useState({});
 const [searchTerm, setSearchTerm] = useState("");
  const products = useSelector((state) => state.quotations?.products || []);
  const dispatch = useDispatch();
   const navigate = useNavigate();
   const [projectToDelete, setProjectToDelete] = useState(null); // Store the project id to delete
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductQuotations()); // Dispatch to fetch quotations
  }, [dispatch]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRowAction = (actionKey, rowData) => {
    if (actionKey === "edit") {
      navigate(`/dashboard/crm/quotation/product-quotation/update/${rowData.id}`);
    } else if (actionKey === "delete") {
      setProjectToDelete(rowData.id); // Set the project to delete
      setIsDeleteModalOpen(true); // Open the delete confirmation modal
    } else if (actionKey === "view") {
      navigate(`/dashboard/crm/quotation/product-quotation/detail/${rowData.id}`);
    }
  };
  const handleAdd = () => {
    navigate('/dashboard/crm/project/create');
  };

  const handleEdit = (project) => {
    navigate(`/dashboard/crm/project/update/${project.id}/`);
  };

  const handleView = (project) => {
    navigate(`/dashboard/crm/project/detail/${project.id}/`);
  };
  // This is the function for deleting a project
  const handleDelete = (project) => {

    setProjectToDelete(project.id); // Store the project ID to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };


  const formattedQuotations = products.map((quotation, index) => ({
    index: index + 1,
    enquiry_name: quotation.enquiry_name || "N/A",
    quotation_date: quotation.quotation_date,
    tax_percentage: `${quotation.tax_percentage}%`,
    discount_percentage: `${quotation.discount_percentage}%`,
    total_amount: `$${quotation.total_amount}`,
    subtotal: `$${quotation.subtotal || "N/A"}`,
    net_amount: `$${quotation.net_amount}`,
    products: quotation.products, // This will be used to render the nested table (collapsible)
  }));

  return (
    <div className="content-wrapper col-md-11 col-ms-11">
      <AppBar position="static" color="gray" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Pruduct Quotation table
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="create"
            sx={{ marginRight: 2 }}
          >
            Add quotation
          </Button>
          <TextField
            label="Search follows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white", marginRight: 2, width: 250 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper} sx={{ maxHeight: 600, overflowX: "auto",  marginTop: 2, border: "1px solid #ccc"}}>
      <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
            <TableRow style={{ backgroundColor: "#6200ea", color: "white" }}>
              <TableCell style={{ color: "white" }}>#</TableCell>
              <TableCell style={{ color: "white" }}>Enquiry Name</TableCell>
              <TableCell style={{ color: "white" }}>Quotation Date</TableCell>
              <TableCell style={{ color: "white" }}>Tax (%)</TableCell>
              <TableCell style={{ color: "white" }}>Discount (%)</TableCell>
              <TableCell style={{ color: "white" }}>Total Amount ($)</TableCell>
              <TableCell style={{ color: "white" }}>Subtotal ($)</TableCell>
              <TableCell style={{ color: "white" }}>Net Amount ($)</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedQuotations.length > 0 ? (
              formattedQuotations.map((quotation, index) => (
                <React.Fragment key={quotation.index}>
                  <TableRow style={{ backgroundColor: "#f4f4f9" }}>
                    <TableCell>{quotation.index}</TableCell>
                    <TableCell>{quotation.enquiry_name}</TableCell>
                    <TableCell>{quotation.quotation_date}</TableCell>
                    <TableCell>{quotation.tax_percentage}</TableCell>
                    <TableCell>{quotation.discount_percentage}</TableCell>
                    <TableCell>{quotation.total_amount}</TableCell>
                    <TableCell>{quotation.subtotal}</TableCell>
                    <TableCell>{quotation.net_amount}</TableCell>
                    <TableCell>
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                                          <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
                                            <Edit />
                                          </IconButton>
                                          <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
                                            <Delete />
                                          </IconButton>
                                          <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
                                            <Visibility />
                                          </IconButton>



                      <IconButton onClick={() => toggleRow(quotation.index)} color="primary">
                        {expandedRows[quotation.index] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Collapsible Product Details */}
                  {expandedRows[quotation.index] && (
                    <TableRow style={{ backgroundColor: "#e3f2fd" }}>
                      <TableCell colSpan={9} style={{ padding: "10px 0" }}>
                        <Collapse in={expandedRows[quotation.index]} timeout="auto" unmountOnExit>
                          <Table size="small" style={{ width: "50%", margin: "0 auto" }}>
                            <TableHead>
                              <TableRow style={{ backgroundColor: "#bb86fc" }}>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price ($)</TableCell>
                                <TableCell>Total ($)</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {quotation.products.length > 0 ? (
                                quotation.products.map((product, idx) => (
                                  <TableRow key={idx} style={{ backgroundColor: "#ffffff" }}>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>${product.total}</TableCell>
                                      {/* Action Icons for Edit, Delete, View */}
                                      <div style={{ marginTop: "10px", textAlign: "center" }}>
                                          <IconButton onClick={() => handleRowAction("edit", quotation)} color="primary">
                                            <Edit />
                                          </IconButton>
                                          <IconButton onClick={() => handleRowAction("delete", quotation)} color="secondary">
                                            <Delete />
                                          </IconButton>
                                          <IconButton onClick={() => handleRowAction("view", quotation)} color="primary">
                                            <Visibility />
                                          </IconButton>

                                      </div>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} style={{ textAlign: "center", color: "#6200ea" }}>
                                    No Products Found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Collapse>


                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: "center" }}>
                  No Quotations Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductQuotationTable;
