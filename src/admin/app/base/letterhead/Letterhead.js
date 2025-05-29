import React from 'react';
import { Box, Typography } from '@mui/material';

const Letterhead = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#4CAF50', // Green Background
        color: '#FFD700', // Golden Text
        padding: '20px',
        textAlign: 'center',
        borderBottom: '4px solid #FFD700', // Golden Border
        marginBottom: '20px'
      }}
    >
      {/* Company Name */}
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Your Company Name
      </Typography>

      {/* Company Slogan or Address */}
      <Typography variant="h6" sx={{ marginTop: '5px' }}>
        Your Company Slogan or Address Here
      </Typography>
    </Box>
  );
};

export default Letterhead;
