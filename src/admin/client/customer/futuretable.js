
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const CollapsibleRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.organization}</TableCell>
        <TableCell>{row.joiningDate}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" size="small">
            Edit
          </Button>
          <Button variant="contained" color="info" size="small" sx={{ ml: 1 }}>
            View
          </Button>
          <Button variant="contained" color="error" size="small" sx={{ ml: 1 }}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Typography variant="body1">{row.history}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CustomerTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      email: "johndoe@example.com",
      organization: "ABC Corp",
      joiningDate: "2023-01-15",
      history: "Customer joined in January and has been highly active.",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "9876543210",
      email: "janesmith@example.com",
      organization: "XYZ Inc",
      joiningDate: "2023-02-20",
      history: "Customer joined in February and is currently dormant.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
        <Typography variant="h6">Customer List</Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary">
          Add Customer
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Joining Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7}>
              <Typography variant="body2" align="center">
                You can add additional information or filtering options here.
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <CollapsibleRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
