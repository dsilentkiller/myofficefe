import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistricts, updateDistrict } from "../../../../redux/slice/admin/base/districtSlice";
import { fetchProvinces } from "../../../../redux/slice/admin/base/provinceSlice";
import { Link } from "react-router-dom";
import { IconButton, TableBody, TableRow, Select, MenuItem, Paper, Button, InputAdornment, TextField } from "@mui/material";
import { Edit, Delete, Save, Add, search } from "@mui/icons-material";
import DeleteDistrict from "./DeleteDistrict";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import { createDistrict } from "../../../../redux/slice/admin/base/districtSlice";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const DistrictList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.districts);
  const updateStatus = useSelector((state) => state.districts.updateStatus);
  const updateError = useSelector((state) => state.districts.updateError);

  const [editId, setEditId] = useState(null);
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newProvinceName, setNewProvinceName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [districtToDelete, setDistrictToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchDistricts());
    dispatch(fetchProvinces());
  }, [dispatch]);

  const provinces = useSelector((state) => state.provinces.list);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDistricts(
        list.filter((district) => {
          const districtName = district.name?.toLowerCase() || "";
          const provinceName = district.province?.toLowerCase() || "";

          return (
            districtName.includes(searchTerm.toLowerCase()) ||
            provinceName.includes(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredDistricts(list);
    }
  }, [searchTerm, list]);

  const handleEdit = (id, name, province) => {
    setEditId(id);
    setNewDistrictName(name);
    setNewProvinceName(province);
  };
  //   //--- handle searchitem in a table ----
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //   //--co
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editId !== null) {
      const provinceId = provinces.find((p) => p.name === newProvinceName)?.id;
      if (!provinceId) {
        toast.error("Invalid province selected");
        return;
      }

      dispatch(updateDistrict({ id: editId, name: newDistrictName, province: provinceId }))
        .unwrap()
        .then(() => {
          toast.success("District updated successfully!");
          setEditId(null);
          setNewDistrictName("");
          setNewProvinceName("");
        })
        .catch((error) => {
          toast.error(`Failed to update district: ${error.message}`);
        });
    }
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Assuming you're working with the first sheet
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Process the imported data and map it to your district format
        const formattedData = sheetData.map((row) => ({
          name: row.District || row.DistrictName || "", // Assuming the column name is "District" or "DistrictName"
          province_name: row.Province || "", // Assuming the column name is "Province"
        }));

        // Optionally, you can dispatch this to update the store
        dispatch(createDistrict(formattedData)); // Assuming you have an action like this
        toast.success("File imported successfully!");
      };
      reader.readAsArrayBuffer(file);
    }
  };


  const handleFileExport = (type) => {
    if (type === "csv") {
      const csvData = list.map((district) => ({
        District: district.name,
        Province: district.province_name,
      }));
      const header = ["District", "Province"];
      const rows = csvData.map((item) => [item.District, item.Province]);
      let csvContent = header.join(",") + "\n";
      rows.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Districts.csv";
      link.click();
    } else if (type === "xlsx") {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(list);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Districts");
      XLSX.writeFile(workbook, "Districts.xlsx");
    }
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    const columns = ["District", "Province"];
    const rows = list.map((district) => [district.name, district.province_name]);

    doc.autoTable(columns, rows);
    doc.save("Districts.pdf");
  };

  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {typeof error === "string" ? error : JSON.stringify(error)}</div>;


  return (
    <>
      <div className="col-lg-12">

        <Paper elevation={3} className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>

            <h5 style={{ margin: 0, flexShrink: 0 }}>District List</h5>

            {/* Right-side controls all in one flex container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flexGrow: 1, justifyContent: 'flex-end' }}>


              {/* Search Bar */}
              <div className="d-flex align-items-center" style={{ gap: "1rem", maxWidth: "600px" }}>
                <Link to="create" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" startIcon={<Add />} size="medium">
                    Add District
                  </Button>
                </Link>

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

                      style: { height: "40px", boxSizing: "border-box" },  // force TextField height same as button
                    }}
                    // Remove fullWidth so width is constrained by parent flex container
                    style={{ width: "100%" }} // fill parent maxWidth
                  />
                </form>
              </div>

              <Button
                variant="outlined"
                startIcon={<FileUploadIcon />}
                component="label"
                size="medium"
              >
                Import File
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  hidden
                  onChange={handleFileImport}
                />
              </Button>

              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => handleFileExport("csv")}
                size="medium"
              >
                Export as CSV
              </Button>

              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handlePdfExport}
                size="medium"
              >
                Export as PDF
              </Button>
            </div>
          </div>

          {/* Your table below */}
          <div className="table-container" style={{ marginTop: 16 }}>
            <table className="table table-bordered">



              <thead>
                <tr>
                  <th>#</th>
                  <th>District</th>
                  <th>Province</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <TableBody>
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district, index) => (
                    <TableRow key={district.id}>
                      <td>{index + 1}</td>
                      <td>
                        {editId === district.id ? (
                          <TextField
                            size="small"
                            value={newDistrictName}
                            onChange={(e) => setNewDistrictName(e.target.value)}
                          />
                        ) : (
                          formatName(district.name)
                        )}
                      </td>
                      <td>
                        {editId === district.id ? (
                          <Select
                            size="small"
                            value={newProvinceName || ""}
                            onChange={(e) => setNewProvinceName(e.target.value)}
                            fullWidth
                          >
                            <MenuItem value="">Select Province</MenuItem>
                            {provinces.map((province) => (
                              <MenuItem key={province.id} value={province.name}>
                                {province.name}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          formatName(district.province_name)
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          {editId === district.id ? (
                            <IconButton color="success" onClick={handleUpdate}>
                              <Save />
                            </IconButton>
                          ) : (
                            <IconButton color="primary" onClick={() => handleEdit(district.id, district.name, district.province)}>
                              <Edit />
                            </IconButton>
                          )}
                          <IconButton color="error" onClick={() => setDistrictToDelete(district.id)}>
                            <Delete />
                          </IconButton>
                        </div>
                      </td>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <td colSpan={4} align="center">
                      No districts found
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </table>
          </div>

        </Paper>
      </div>


      {districtToDelete !== null && (
        <DeleteDistrict id={districtToDelete} onClose={() => setDistrictToDelete(null)} />
      )}
    </>
  );
};

export default DistrictList;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDistricts, updateDistrict } from "../../../redux/slice/admin/base/districtSlice";
// import { fetchProvinces } from "../../../redux/slice/admin/base/provinceSlice";
// import { Link } from "react-router-dom";

// import {
//   IconButton,
//   TextField,
//   Table,
//   TableBody,
//   td,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Select,
//   MenuItem,
//   Paper
// } from "@mui/material";
// import { Edit, Delete, Save, Search, Add } from "@mui/icons-material";
// import DeleteDistrict from "./DeleteDistrict";

// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import DownloadIcon from "@mui/icons-material/Download";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";


// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.districts);
//   const updateStatus = useSelector((state) => state.districts.updateStatus);
//   const updateError = useSelector((state) => state.districts.updateError);

//   const [editId, setEditId] = useState(null);
//   const [newDistrictName, setNewDistrictName] = useState("");
//   const [newProvinceName, setNewProvinceName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const [districtToDelete, setDistrictToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchDistricts());
//     dispatch(fetchProvinces());
//   }, [dispatch]);

//   const provinces = useSelector((state) => state.provinces.list);

//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredDistricts(
//         list.filter((district) => {
//           const districtName = district.name?.toLowerCase() || "";
//           const provinceName = district.province?.toLowerCase() || "";

//           return (
//             districtName.includes(searchTerm.toLowerCase()) ||
//             provinceName.includes(searchTerm.toLowerCase())
//           );
//         })
//       );
//     } else {
//       setFilteredDistricts(list);
//     }
//   }, [searchTerm, list]);

//   useEffect(() => {
//     if (districtToDelete === null) {
//       dispatch(fetchDistricts());
//     }
//   }, [districtToDelete, dispatch]);

//   const handleEdit = (id, name, province) => {
//     setEditId(id);
//     setNewDistrictName(name);
//     setNewProvinceName(province);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       const provinceId = provinces.find((p) => p.name === newProvinceName)?.id;
//       if (!provinceId) {
//         toast.error("Invalid province selected");
//         return;
//       }

//       dispatch(updateDistrict({ id: editId, name: newDistrictName, province: provinceId }))
//         .unwrap()
//         .then(() => {
//           toast.success("District updated successfully!");
//           setEditId(null);
//           setNewDistrictName("");
//           setNewProvinceName("");
//         })
//         .catch((error) => {
//           toast.error(`Failed to update district: ${error.message}`);
//         });
//     }
//   };
//   const handleFileImport = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//         console.log("Imported Data:", sheetData);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const handleFileExport = (type) => {
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(list);
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Districts");
//     XLSX.writeFile(workbook, `Districts.${type}`);
//   };
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper " style={{ marginBottom: "60px" }}>
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <Paper elevation={3} className="card">
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
//               <h5>District List</h5>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <Link to="create">
//                   <Button variant="contained" color="primary" startIcon={<Add />}>
//                     Add District
//                   </Button>
//                 </Link>

//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: <Search />,
//                   }}
//                 />

//               </div>
//             </div>
//             <div className="table-container">
//                 <table className="table table-bordered">
//                   <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>District</th>
//                     <th>Province</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <TableBody>
//                   {filteredDistricts.length > 0 ? (
//                     filteredDistricts.map((district, index) => (
//                       <TableRow key={district.id}>
//                         <td>{index + 1}</td>
//                         <td>
//                           {editId === district.id ? (
//                             <TextField
//                               size="small"
//                               value={newDistrictName}
//                               onChange={(e) => setNewDistrictName(e.target.value)}
//                             />
//                           ) : (
//                             formatName(district.name)
//                           )}
//                         </td>
//                         <td>
//                           {editId === district.id ? (
//                             <Select
//                               size="small"
//                               value={newProvinceName || ""}
//                               onChange={(e) => setNewProvinceName(e.target.value)}
//                               fullWidth
//                             >
//                               <MenuItem value="">Select Province</MenuItem>
//                               {provinces.map((province) => (
//                                 <MenuItem key={province.id} value={province.name}>
//                                   {province.name}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           ) : (
//                             formatName(district.province_name)
//                           )}
//                         </td>
//                         <td>
//                           {editId === district.id ? (
//                             <IconButton color="success" onClick={handleUpdate}>
//                               <Save />
//                             </IconButton>
//                           ) : (
//                             <IconButton color="primary" onClick={() => handleEdit(district.id, district.name, district.province)}>
//                               <Edit />
//                             </IconButton>
//                           )}
//                           <IconButton color="error" onClick={() => setDistrictToDelete(district.id)}>
//                             <Delete />
//                           </IconButton>
//                         </td>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <td colSpan={4} align="center">
//                         No districts found
//                       </td>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </table>
//             </div>
//           </Paper>
//         </div>
//       </div>
//       {districtToDelete !== null && (
//         <DeleteDistrict id={districtToDelete} onClose={() => setDistrictToDelete(null)} />
//     )}



//     </div>
//   );
// };

// export default DistrictList;

// import { toast } from "react-toastify";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDistricts,
//   updateDistrict,
//   updateError,
//   updateStatus,
// } from "../../../redux/slice/admin/base/districtSlice";
// import { Link } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../../../admin/css/Table.css";
// import DeleteDistrict from "./DeleteDistrict"; // Adjust the path as need

// const DistrictList = () => {
//   const dispatch = useDispatch();
//   const { list, isLoading, error } = useSelector((state) => state.districts);
//   console.log(list);
//   // Access updateStatus state property
//   const updateStatus = useSelector((state) => state.districts.updateStatus);
//   const updateError = useSelector((state) => state.districts.updateError);
//   const [editId, setEditId] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const [districtToDelete, setDistrictToDelete] = useState(null);
//   // const navigate = useNavigate();
//   //-----Fetching data from database o api call using fetchDistrict  -------------
//   useEffect(() => {
//     dispatch(fetchDistricts());
//   }, [dispatch]);

//   // const handleAddDistrict = () => {
//   //   navigate("create");
//   // };

//   //-----update status toast--------
//   useEffect(() => {
//     if (updateStatus === "succeeded") {
//       toast.success("District updated successfully!");
//     } else if (updateStatus === "failed") {
//       toast.error(
//         `Failed to update district: ${updateError || "Unknown error"}`
//       );
//     }
//   }, [updateStatus, updateError]);

//   //------------ this is filtered district name  in search table ---------
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredDistricts(
//         list.filter((district) =>
//           district.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredDistricts(list);
//     }
//   }, [searchTerm, list]);
//   //----refresh table after delete the item from table ---
//   useEffect(() => {
//     // Refetch data after deletion or update
//     if (districtToDelete === null) {
//       dispatch(fetchDistricts());
//     }
//   }, [districtToDelete, dispatch]);
//   //---to update item in a table --
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setNewName(name);
//   };
//   //----to handle update item in district table
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (editId !== null) {
//       dispatch(updateDistrict({ id: editId, name: newName }));
//       setEditId(null);
//       setNewName("");
//     }
//   };
//   //--- handle searchitem in a table ----
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   //--converting first letter  capital
//   const formatName = (name) => {
//     if (!name) return "";
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="card">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//               <div className="container-fluid">
//                 <h5 className="navbar-brand">District List</h5>
//                 <div className="navbar-nav ml-auto">
//                   <Link
//                     to="create"
//                     className="nav-link btn btn-primary"
//                     // onClick={handleAddDistrict}
//                   >
//                     <h5>Add District</h5>
//                   </Link>
//                   <form className="form-inline ml-3">
//                     <div className="input-group">
//                       <input
//                         type="search"
//                         id="default-search"
//                         name="search_term"
//                         className="form-control"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         required
//                       />
//                       {/* <div className="input-group-append">
//                         <button type="submit" className="btn btn-info">
//                           Search
//                         </button>
//                       </div> */}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </nav>
//             <div className="card-body">
// <div className="table-container">
//   <table className="table table-bordered">
//     <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredDistricts.length > 0 ? (
//                       filteredDistricts.map((district, index) => (
//                         <tr key={district.id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {editId === district.id ? (
//                               <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                               />
//                             ) : (
//                               formatName(district.name)
//                             )}
//                           </td>
//                           <td>
//                             {editId === district.id ? (
//                               <button
//                                 onClick={handleUpdate}
//                                 className="btn btn-success"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() =>
//                                   handleEdit(district.id, district.name)
//                                 }
//                                 className="btn btn-primary"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <span> </span>
//                             <button
//                               onClick={() => setDistrictToDelete(district.id)}
//                               className="btn btn-danger"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3">No districts found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {districtToDelete !== null && (
//         <DeleteDistrict
//           id={districtToDelete}
//           onClose={() => setDistrictToDelete(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default DistrictList;
