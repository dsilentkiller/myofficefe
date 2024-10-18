import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
  // updateStatus,
  updateError,
  deleteError,
} from "../../redux/slice/crm/categorySlice";
import { Link } from "react-router-dom";
import "../../../admin/css/Table.css"; // Ensure this includes necessary styles
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete
import CategoryDelete from "./CategoryDelete";
import { toast } from "react-toastify"; // Import toast for error messages
import "../../css/Table.css";
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
  const updateStatus = useSelector((state) => state.categories?.updateStatus);
  const updateError = useSelector((state) => state.categories?.updateError);

  const {
    list: categories = [], // Default to empty array if undefined
    // isLoading,
    // error,
    deleteError,
  } = useSelector((state) => state.categories || {});

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
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Category updated successfully!");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update category: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, updateError]);

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
                <h5 className="navbar-brand">Category List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-primary">
                    <h5>Add Category</h5>
                  </Link>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSearchTerm(e.target.q.value);
                    }}
                    className="form-inline ml-3"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="q"
                        value={searchTerm}
                        className="form-control"
                        placeholder="Search categories..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </nav>
            {/* {isLoading ? ( */}
            {/* //   <p>Loading...</p>
              // ) : error ? (
              //   <p>Error: {error}</p>
              // ) : ( */}
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
                          {editId === category.id ? (
                            <button
                              onClick={handleUpdate}
                              className="btn btn-success"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleEdit(
                                  category.id,
                                  category.category_name || ""
                                )
                              }
                              className="btn btn-primary"
                            >
                              <FaEdit />
                            </button>
                          )}
                          <span> </span>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="btn btn-danger"
                          >
                            <FaTrash />
                          </button>
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
