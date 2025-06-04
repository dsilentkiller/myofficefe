//update work fine

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMunicipalities,
  updateMunicipality,
  deleteMunicipality,
  // createMunicipality,
} from "../../../../redux/slice/admin/base/municipalitySlice";
import { Link } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteMunicipality from "./DeleteMunicipality";
import { toast } from "react-toastify";
import { Button, InputAdornment, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileUploadIcon from "@mui/icons-material/FileUpload"; // This might be more appropriate if you need a file upload icon
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { fetchDistricts } from "../../../../redux/slice/admin/base/districtSlice";
import "../../../../admin/css/table/Table.css";
import { IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';

const MunicipalityTable = () => {
  const dispatch = useDispatch();
  const { list: municipalities, deleteError } = useSelector(
    (state) => state.municipalities
  );
  // const [municipalities, setMunicipality] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newMunicipalityName, setNewMunicipalityName] = useState("");
  const [newDistrictName, setNewDistrictName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalityToDelete, setMunicipalityToDelete] = useState(null);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [districtToDelete, setDistrictToDelete] = useState(null);

  const districts = useSelector((state) => state.districts.list);
  const isLoading = useSelector((state) => state.districts.isLoading);
  const error = useSelector((state) => state.districts.error);
  useEffect(() => {
    console.log("Districts from Redux state:", districts);
  }, [districts]);

  useEffect(() => {
    dispatch(fetchMunicipalities());
    dispatch(fetchDistricts());
  }, [dispatch]);

  const importExcel = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
          toast.error("The Excel file is empty or invalid.");
          return;
        }

        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData); // Here you can process and add the data to Redux or state

        toast.success("Excel Data Imported Successfully!");
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      toast.error("Please upload a valid .xlsx file.");
    }
  };

  // #---------handle edit district (both district and municipality)
  const handleEdit = (id, name, district) => {
    setEditId(id);
    setNewMunicipalityName(name);
    setNewDistrictName(district);
  };
  const handleDistrictChange = (e) => {
    setNewDistrictName(e.target.value); // Update district name (or ID, if using ID directly)
  };

  //---- Handle update district (both district name and municipality) ---
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Update triggered");

    // Find the districtId based on the district name
    const districtId =
      districts &&
      districts.find((district) => district.name === newDistrictName)?.id;

    if (newMunicipalityName && districtId) {
      console.log(
        "Updating municipality",
        editId,
        newMunicipalityName,
        districtId
      );

      dispatch(
        updateMunicipality({
          id: editId,
          name: newMunicipalityName,
          districtId,
        })
      )
        .then((response) => {
          // Update municipalities state optimistically (or re-fetch if needed)
          const updatedMunicipalities = municipalities.map((municipality) =>
            municipality.id === editId
              ? {
                ...municipality,
                name: newMunicipalityName,
                district_name: newDistrictName,
              }
              : municipality
          );
          setFilteredMunicipalities(updatedMunicipalities); // Update filtered municipalities
          setEditId(null);
          setNewMunicipalityName("");
          setNewDistrictName("");
          toast.success("Municipality updated successfully!");
        })
        .catch((error) => {
          console.error("Failed to update municipality:", error);
          toast.error("Failed to update municipality.");
        });
    } else {
      toast.error("Please select a valid district");
    }
  };

  const handleDelete = (id) => {
    setMunicipalityToDelete(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteMunicipality(id))
      .unwrap()
      .then(() => {
        toast.success("Municipality deleted successfully!");
        setMunicipalityToDelete(null);
        dispatch(fetchMunicipalities());
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error(
          `Failed to delete municipality: ${error?.message || deleteError?.message || "Unknown error"
          }`
        );
      });
  };
  //-- Formatting name (capitalizing first letter) ---
  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredMunicipalities(
        (municipalities || []).filter((municipality) =>
        //     municipality.name &&
        //     municipality.name.toLowerCase().includes(searchTerm.toLowerCase())
        {
          // Ensure district.name and district.province are defined before calling toLowerCase()
          const municipalityName = municipality.name
            ? municipality.name.toLowerCase()
            : "";
          const districtName = municipality.district
            ? municipality.district.toLowerCase()
            : "";

          return (
            municipalityName.includes(searchTerm.toLowerCase()) ||
            districtName.includes(searchTerm.toLowerCase())
          );
        }
        )
      );
    } else {
      setFilteredMunicipalities(municipalities);
    }
  }, [searchTerm, municipalities]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDistricts(
        municipalities.filter((municipality) => {
          // Ensure district.name and district.district are defined before calling toLowerCase()
          const municipalityName = municipality.name
            ? municipality.name.toLowerCase()
            : "";
          const districtName = municipality.district
            ? municipality.district.toLowerCase()
            : "";

          return (
            districtName.includes(searchTerm.toLowerCase()) ||
            districtName.includes(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredDistricts(municipalities);
    }
  }, [searchTerm, municipalities]);
  //########### importing excel file #############

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      municipalities.map((municipality) => ({
        ID: municipality.id,
        Name: municipality.name,
        District: municipality.district_name, // Add district name
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Municipalities");
    XLSX.writeFile(workbook, "municipalities.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Municipalities", 20, 10);

    const tableColumn = ["ID", "Name", "District"]; // Add district column
    const tableRows = municipalities.map((municipality) => [
      municipality.id,
      municipality.name,
      municipality.district_name, // Add district name
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("municipalities.pdf");
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <div className="container-fluid d-flex align-items-center justify-content-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              {/* Brand Name */}
              <h5 className="navbar-brand">Municipalities</h5>

              {/* Search Bar */}
              <div className="d-flex align-items-center" style={{ gap: "1rem", maxWidth: "600px" }}>
                {/* Add Municipality Button */}
                <Button
                  variant="contained"
                  component={Link}
                  to="create"
                  color="primary"
                  startIcon={<AddCircleOutlineIcon />}
                  size="medium"  // set size explicitly
                  style={{ height: "40px" }} // optional fixed height to match TextField
                >
                  Add Municipality
                </Button>

                {/* Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearchTerm(e.target.search_term.value);
                  }}
                  style={{ flexGrow: 1, maxWidth: "300px" }}
                >
                  <TextField
                    id="default-search"
                    name="search_term"
                    value={searchTerm}
                    placeholder="Search Municipalities..."
                    onChange={handleSearchChange}
                    required
                    size="medium"  // same size as Button
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      style: { height: "40px", boxSizing: "border-box" },  // force TextField height same as button
                    }}
                    // Remove fullWidth so width is constrained by parent flex container
                    style={{ width: "100%" }} // fill parent maxWidth
                  />
                </form>
              </div>

              {/* Export and Import Buttons */}
              <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<FileDownloadIcon />}
                  onClick={exportToExcel}
                >
                  Export Excel
                </Button>

                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={exportToPDF}
                >
                  Export PDF
                </Button>

                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "#3f51b5",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#303f9f",
                    },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FileUploadIcon sx={{ marginRight: 1 }} />
                  Import Excel
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    hidden
                    onChange={importExcel}
                  />
                </Button>
              </div>
            </div>


            <div className="card-body">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                      <div className="overflow-x-auto">
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error: {error?.message || "Unknown error"}</p>
                        ) : (
                          <div className="table-container">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Municipality</th>
                                  <th>District</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredMunicipalities.length > 0 ? (
                                  filteredMunicipalities.map(
                                    (municipality, index) => (
                                      <tr key={municipality.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                          {editId === municipality.id ? (
                                            <input
                                              type="text"
                                              value={newMunicipalityName}
                                              onChange={(e) =>
                                                setNewMunicipalityName(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          ) : (
                                            municipality.name
                                          )}
                                        </td>
                                        <td>
                                          {editId === municipality.id ? (
                                            <select
                                              value={newDistrictName || ""}
                                              onChange={(e) =>
                                                setNewDistrictName(
                                                  e.target.value
                                                )
                                              }
                                              className="form-control"
                                            >
                                              <option value="">
                                                Select district
                                              </option>
                                              {districts &&
                                                districts.map((district) => (
                                                  <option
                                                    key={district.id}
                                                    value={district.name}
                                                  >
                                                    {district.name}
                                                  </option>
                                                ))}
                                            </select>
                                          ) : (
                                            formatName(
                                              municipality.district_name || ""
                                            ) // Handle undefined safely
                                          )}
                                        </td>

                                        <td>
                                          <div style={{ display: "flex", gap: "8px" }}>
                                            {editId === municipality.id ? (
                                              <IconButton color="success" onClick={handleUpdate}>
                                                <Save />
                                              </IconButton>
                                            ) : (
                                              <IconButton
                                                color="primary"
                                                onClick={() =>
                                                  handleEdit(
                                                    municipality.id,
                                                    municipality.name,
                                                    municipality.district
                                                  )
                                                }
                                              >
                                                <Edit />
                                              </IconButton>
                                            )}
                                            <IconButton
                                              color="error"
                                              onClick={() => confirmDelete(municipality.id)}
                                            >
                                              <Delete />
                                            </IconButton>
                                          </div>
                                        </td>

                                      </tr>
                                    )
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan="3">
                                      No municipalities found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Delete Confirmation Modal */}
              <DeleteMunicipality
                id={municipalityToDelete}
                onConfirm={confirmDelete}
                onClose={() => setMunicipalityToDelete(null)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* #// When municipalityToDelete is set, the modal will show */}
      {municipalityToDelete !== null && (
        <DeleteMunicipality
          id={municipalityToDelete}
          onConfirm={confirmDelete}
          onClose={() => setMunicipalityToDelete(null)}
        />
      )}
    </>
  );
};

export default MunicipalityTable;
