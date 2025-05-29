import React, { useState,useEffect  } from "react";
import { TextField, Button, Box, Grid, InputAdornment, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AddCircleOutline as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  createAsset,
  fetchAssetById,
  updateAsset,
} from "../../../redux/slice/admin/hrm/assetSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"

function AssetsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    assets_name: "",
    serial_num: "",
    status: "",
    created: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const createError = useSelector((state) => state.Assets.createError);
  // const updateError = useSelector((state) => state.Assets.updateError);
  // const AssetToUpdate = useSelector((state) => state.Assets.currentAsset);
  const assets = useSelector((state) => state.assets.list || []);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchAssetById(id));
  //   }
  // }, [dispatch, id]);

  // useEffect(() => {
  //   if (AssetToUpdate && id) {
  //     setFormData({
  //       Asset_name: AssetToUpdate.Asset_name || "",
  //       description: AssetToUpdate.description || "",
  //       start_date: AssetToUpdate.start_date || "",
  //       end_date: AssetToUpdate.end_date || "",
  //       status: AssetToUpdate.status || "",
  //     });
  //   } else if (!AssetToUpdate && id) {
  //     toast.error("Failed to load Asset details for update.");
  //   }
  // }, [AssetToUpdate, id]);

// const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that end_date is after start_date
    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      toast.error("End date must be after the start date.");
      return;
    }

    if (id) {
      // Skip the existing Asset name check for updates
      console.log("Form Data Before Update:", formData);
      dispatch(updateAsset({ id, ...formData }))
        .unwrap()
        .then((updatedAsset) => {
          console.log("Updated Asset:", updatedAsset);
          // Update formData to reflect the latest values if necessary
          setFormData(updatedAsset); // Assuming updatedAsset is the entire object
          toast.success("Asset updated successfully!");
          navigate("/dashboard/crm/asset");
        })
        .catch((error) => {
          toast.error(
            `Update Error: ${error.response?.data?.detail || error.message}`
          );
        });
    } else {
      // Create new Asset
      dispatch(createAsset(formData))
        .unwrap()
        .then(() => {
          toast.success("Asset created successfully!");
          setFormData({
            Asset_name: "",
            description: "",
            start_date: "",
            end_date: "",
            status: "",
          });
          navigate("/dashboard/crm/asset");
        })
        .catch((error) => {
          toast.error(
            `Create Error: ${error.response?.data?.detail || error.message}`
          );
        });
    }
  };
  return (
    <div  className="content-wrapper">
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#1976d2"}}>Add Assets</Typography>

      {/* Navigation */}
      <Box sx={{ mb: 3 }}>
        <Link to="/dashboard/hrm/asset/list">
          <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
            View Assets List
          </Button>
        </Link>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Assets Name */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Assets Name"
              name="assets_name"
              value={formData.assets_name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>

          {/* Serial Number */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Serial Number"
              name="serial_num"
              type="number"
              value={formData.serial_num}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Status */}

          {/* </Grid> */}
          <FormControl sx={{ width: '33%',marginLeft:5,marginRight:5 }} required>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>Select status</em>
                  </MenuItem>
                  <MenuItem value="assigned">Assigned</MenuItem>
                  <MenuItem value="damaged">Damaged</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                </Select>
              </FormControl>


          {/* Created Date */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Created Date"
              name="created"
              type="date"
              value={formData.created}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            {id ? "Update" : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
    </div>
  );
}

export default AssetsForm;











// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// function AssetsForm() {
//   const [formData, setFormData] = useState({
//     assets_name: "",
//     serial_num: "",
//     status: "",
//     created: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/employees",
//         formData
//       );
//       console.log(response.data);
//       alert("Employee created successfully!");
//       // You can reset the form or navigate to anavailable page here
//     } catch (error) {
//       console.error("There was an error creating the employee!", error);
//       alert("Failed to create employee.");
//     }
//   };

//   return (
//     <div>
//       <div className="card">
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <div className="container-fluid">
//             <h5 className="navbar-brand">Add Assets</h5>
//             <div className="navbar-nav ml-auto">
//               <Link to="/dashboard/assets/list/">
//                 <h5>Assets List</h5>
//               </Link>
//             </div>
//           </div>
//         </nav>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="name"> Assets Name:</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.assets_name}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="serial_num">Serial number :</label>
//                   <input
//                     type="number"
//                     id="serial_num"
//                     name="serial_num"
//                     value={formData.serial_num}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="status">Status</label>
//                   <input
//                     type="text"
//                     id="status"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="created">Created</label>
//                   <input
//                     type="date"
//                     id="created"
//                     name="created"
//                     value={formData.created}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="description">description:</label>
//                   <input
//                     type="text"
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               </div>
//               {/* <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="status">status:</label>
//                         <select
//                           id="status"
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="">Selectstatus</option>
//                           <option value="assigned">assigned</option>
//                           <option value="feassigned">Feassigned</option>
//                           <option value="available">available</option>
//                         </select>
//                       </div>
//                     </div> */}
//               {/* </div> */}

//               {/* <div className="row">
//                     <div className="col-md-4">
//                       <div className="form-group">
//                         <label htmlFor="dob">Date of Birth:</label>
//                         <input
//                           type="date"
//                           id="dob"
//                           name="dob"
//                           value={formData.dob}
//                           onChange={handleChange}
//                           className="form-control"
//                           required
//                         />
//                       </div> */}
//               {/* </div> */}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AssetsForm;
