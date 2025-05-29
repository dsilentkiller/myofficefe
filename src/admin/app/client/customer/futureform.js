
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
} from '@mui/material';

const CustomerDetail = () => {
  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: '1.5rem', color: '#3f51b5', fontWeight: 'bold' }}>
        Customer Details
      </Typography>

      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Customer Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth select label="Customer Type" variant="outlined">
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Primary Phone" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Secondary Phone" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth select label="Gender" variant="outlined">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Work Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Work Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Organization Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Category" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Department" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Designation" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Joining Date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Estimated Budget" variant="outlined" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Address Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Province" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="District" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Municipality" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Street Address" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Secondary Address" variant="outlined" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Information */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Additional Information
              </Typography>
                                  {/* <Grid item xs={6}>

                         <TextField fullWidth label="Primary Phone" variant="outlined" />
               <Typography variant="h6" gutterBottom>
                      Primary Phone
                    </Typography>
                    <PhoneInput
                      country={"np"} // Country code for Nepal
                      value={formData.pri_phone}
                      onChange={validatePhoneNumber}
                      inputStyle={{
                        width: "100%",
                        borderColor: phoneValid ? "green" : "red",
                        backgroundColor: phoneValid ? "#e0f7fa" : "#ffebee",
                        height: "56px", // Adjust height to match MUI text fields
                        borderRadius: "4px", // Border radius for a consistent look
                      }}
                    />
                    {!phoneValid && (
                      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        Please enter a valid phone number between 10 and 17 digits.
                      </Typography>
                    )}
                  </Grid> */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth select label="Work Status" variant="outlined">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="History" variant="outlined" multiline rows={4} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" sx={{ marginRight: '1rem' }}>
          Save
        </Button>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerDetail;

