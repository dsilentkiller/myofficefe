import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, IconButton } from "@mui/material";
import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";
export default function LogoutModel() {
  return (
    <div>
       {/* Logout Confirmation Dialog */}
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You are about to log out. Do you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* Button to cancel the logout */}
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>

          {/* Button to confirm logout */}
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

