//####################### old table start ############
import { IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
} from "../../../../redux/slice/admin/crm/categorySlice";

import CategoryDelete from "./CategoryDelete";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import TableActionNavbar from "../../../components/common/navbar/TableActionNavbar"


import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";



const CategoryTable = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const {
    list: categories = [], // Default to empty array if undefined
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
          `Failed to delete category: ${error.message || deleteError || "Unknown error"
          }`
        );
      });
  };

  // Filter categories for search term

  const filteredCategories = categories?.filter((category) => {
    //   console.log(categories);
    // console.log("**");
    return category?.category_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  //##############converting first letter  capital
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const importExcelHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Parsed Excel Data:", jsonData);
      // TODO: Dispatch to Redux or send to API for DB import
    };

    reader.readAsArrayBuffer(file);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      categories.map((category) => ({
        ID: category.id,
        Name: category.category_name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "categories");
    XLSX.writeFile(workbook, "category.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("category List", 20, 10);

    const tableColumn = ["ID", "Name"];
    const tableRows = categories.map((category) => [
      category.id,
      category.category_name,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("category.pdf");
  };


  return (

    <div className="col-lg-10">
      <div className="card">
        {/* extend Tableactionnavbar */}
        <TableActionNavbar
          style={{ position: "relative", zIndex: 10, marginTop: 0 }}
          title="Category List"
          addLink="create"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExportExcel={exportToExcel}
          onExportPDF={exportToPDF}
          onImportExcel={importExcelHandler}
        />

        {/* Responsive table wrapper */}
        <div className="table-container-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "30%", whiteSpace: "nowrap" }}>Name</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.map?.((category, index) =>
                category ? (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td className="text-truncate" style={{ maxWidth: "180px" }}>
                      {editId === category.id ? (
                        <input
                          type="text"
                          value={newName}
                          className="form-control form-control-sm"
                          onChange={(e) => setNewName(e.target.value)}
                        />
                      ) : (
                        formatName(category.category_name || "") // Default to empty string if name is null
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {/* Edit or Save Button */}
                        {editId === category.id ? (
                          <Button
                            onClick={handleUpdate}
                            variant="contained"
                            color="success"
                            startIcon={<SaveIcon />}
                            size="small"
                          // style={{ marginRight: 8 }}
                          >
                            Save
                          </Button>
                        ) : (
                          <IconButton
                            onClick={() =>
                              handleEdit(
                                category.id,
                                category.category_name || ""
                              )
                            }
                            color="primary"
                            size="small"
                            aria-label="edit"
                          // style={{ marginRight: 8 }}
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
                      </div>
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

  );
};

export default CategoryTable;



{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                {/* Navbar Title */}
{/* <Typography
                  variant="h6"
                  style={{ textAlign: "left", fontWeight: "bold", flexGrow: 1 }}
                >
                  Category List
                </Typography>
                <div className="navbar-nav ml-auto">
                  {/* Add Category Button */}
{/* <Link to="create" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      style={{ marginRight: "16px" }}
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
                  >  */}
{/* Search Bar */ }
{/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 20,
                      }}
                    >
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
          </nav>   */} 