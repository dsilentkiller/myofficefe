

//####################### old table start ############
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
  // updateStatus,
  // updateError,
  // deleteError,
} from "../../redux/slice/crm/categorySlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import CategoryDelete from "./CategoryDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
import { AppBar, Toolbar, Typography, TextField, IconButton, Button } from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableIcon,
  FileDownload as ExcelIcon,
} from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,

  TableSortLabel,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';

// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable"; // Import the autoTable plugin
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Access state from Redux
  // const updateStatus = useSelector((state) => state.categories?.updateStatus);
  // const updateError = useSelector((state) => state.categories?.updateError);

  const {
    list: categories = [], // Default to empty array if undefined
    // isLoading,
    // error,
    deleteError,
  } = useSelector((state) => state.categories || {});


  //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Categories fetched:", categories);
  }, [dispatch]);
  // To update item in the table
  const handleEdit = (id, category_name) => {
    setEditId(id);
    setNewName(category_name);
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(updateCategory({ id: editId, category_name: newName }));
      setEditId(null);
      setNewName("");
    }
  };

  // Toast messages for update status
  // useEffect(() => {
  //   if (updateStatus === "succeeded") {
  //     toast.success("Category updated successfully!");
  //   } else if (updateStatus === "failed") {
  //     toast.error(
  //       `Failed to update category: ${updateError || "Unknown error"}`
  //     );
  //   }
  // }, [updateStatus, updateError]);

  const handleDelete = (id) => {
    setCategoryToDelete(id); // Set the category ID to trigger the modal
  };

  const confirmDelete = (id) => {
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => {
        toast.success("category deleted successfully!");
        setCategoryToDelete(null); // Close the modal after successful deletion
        dispatch(fetchCategories()); // Refresh the list
      })
      .catch((error) => {
        // Handle and log the error more robustly
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete category: ${
            error.message || deleteError || "Unknown error"
          }`
        );
      });
  };
  //--converting first letter  capital
  const formatName = (category_name) => {
    if (!category_name) return "";
    return category_name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // Filter categories for search term

  const filteredCategories = categories?.filter((category) => {
    //   console.log(categories);
    // console.log("**");
    return category?.category_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                 {/* Navbar Title */}
                      <Typography variant="h6" style={{textAlign: 'left', fontWeight: 'bold', flexGrow: 1 }}>
                        Category List
                      </Typography>
                <div className="navbar-nav ml-auto">
                 {/* Add Category Button */}
                            <Link to="create" style={{ textDecoration: 'none' }}>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                style={{ marginRight: '16px' }}
                              >
                                Add Category
                              </Button>
                            </Link>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  setSearchTerm(e.target.q.value);
                                }}
                                className="form-inline ml-3"
                              >
                                  {/* Search Bar */}
                            <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
                              <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                  endAdornment: (
                                    <IconButton>
                                      <SearchIcon />
                                    </IconButton>
                                  ),
                                }}
                                sx={{ width: 250 }}
                              />
                            </div>

                  </form>
                </div>
              </div>
            </nav>
            <div className="table-container">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories?.map?.((category, index) =>
                    category ? (
                      <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>
                          {editId === category.id ? (
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                            />
                          ) : (
                            formatName(category.category_name || "") // Default to empty string if name is null
                          )}

                                  </td>
                                  <td>
                                {/* Edit or Save Button */}
                                {editId === category.id ? (
                                  <Button
                                    onClick={handleUpdate}
                                    variant="contained"
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    size="small"
                                    style={{ marginRight: 8 }}
                                  >
                                    Save
                                  </Button>
                                ) : (
                                  <IconButton
                                    onClick={() => handleEdit(category.id, category.category_name || "")}
                                    color="primary"
                                    size="small"
                                    aria-label="edit"
                                    style={{ marginRight: 8 }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                )}

                                {/* Delete Button */}
                                <IconButton
                                  onClick={() => handleDelete(category.id)}
                                  color="error"
                                  size="small"
                                  aria-label="delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                            </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
              {/* )} */}
            </div>
            {/* Delete Confirmation Modal */}
            {categoryToDelete !== null && (
              <CategoryDelete
                id={categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={() => confirmDelete(categoryToDelete)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
