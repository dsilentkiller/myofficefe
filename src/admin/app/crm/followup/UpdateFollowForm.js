import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFollowById,
  fetchFollowById,
} from "../../../../redux/slice/admin/crm/followSlice"; // Adjust paths as needed
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Save } from "@mui/icons-material";

const UpdateFollowForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentFollow = useSelector((state) => state.follows.currentFollow);
  const isLoading = useSelector((state) => state.follows.isLoading);
  const error = useSelector((state) => state.follows.error);

  // Local state for form inputs
  const [followDetails, setFollowDetails] = useState({
    follow_by: "",
    due_date: "",
    status: "",
    notes: "",
  });

  // Form validation state
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchFollowById({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentFollow) {
      setFollowDetails({
        follow_by: currentFollow.follow_by || "",
        due_date: currentFollow.due_date || "",
        status: currentFollow.status || "",
        notes: currentFollow.notes || "",
      });
    }
  }, [currentFollow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowDetails({ ...followDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !followDetails.follow_by ||
      !followDetails.due_date ||
      !followDetails.status
    ) {
      setFormError("Please fill out all required fields.");
      return;
    }

    // Dispatch update follow action
    dispatch(updateFollowById({ id, ...followDetails }))
      .unwrap()
      .then(() => {
        navigate(`/dashboard/crm/follow/${id}`); // Navigate back to follow details
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom align="center">
        Update Follow-up Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            {/* Followed By */}
            <TextField
              label="Followed By"
              name="follow_by"
              variant="outlined"
              fullWidth
              value={followDetails.follow_by}
              onChange={handleChange}
              required
              margin="normal"
            />

            {/* Due Date */}
            <TextField
              label="Due Date"
              name="due_date"
              type="date"
              variant="outlined"
              fullWidth
              value={followDetails.due_date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />

            {/* Status */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={followDetails.status}
                onChange={handleChange}
                defaultValue=""
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
              <FormHelperText>
                Choose the current status of the follow-up
              </FormHelperText>
            </FormControl>

            {/* Notes */}
            <TextField
              label="Notes"
              name="notes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={followDetails.notes}
              onChange={handleChange}
              margin="normal"
            />

            {/* Form Error */}
            {formError && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                {formError}
              </Alert>
            )}

            {/* Action Buttons */}
            <Box marginTop={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Save />}
                sx={{ width: "200px" }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateFollowForm;
