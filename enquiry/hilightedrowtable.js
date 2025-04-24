import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";

const HighlightedRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
}));

const EnquiryTable = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", dueDate: "2024-12-30", status: "Pending" },
    { id: 2, name: "Jane Smith", dueDate: "2024-12-25", status: "Completed" },
    { id: 3, name: "Alice Johnson", dueDate: "2024-12-28", status: "Pending" },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const importExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const formattedRows = parsedData.map((row, index) => ({
        id: index + 1,
        name: row.Name || "Unknown",
        dueDate: row.DueDate || "2024-12-31",
        status: row.Status || "Pending",
      }));
      setRows((prevRows) => [...prevRows, ...formattedRows]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedRows = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setRows(sortedRows);
  };

  const isHighlighted = (dueDate) => {
    const today = new Date();
    const targetDate = new Date(dueDate);
    const timeDifference = targetDate - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference >= -7 && daysDifference <= 1;
  };

  return (
    <Paper>
      <Typography variant="h6" align="center" gutterBottom>
        Enquiry Table
      </Typography>
      <Button
        variant="contained"
        component="label"
        style={{ marginBottom: "10px" }}
      >
        Import Excel
        <input
          type="file"
          accept=".xlsx, .xls"
          hidden
          onChange={importExcel}
        />
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "name"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "dueDate"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("dueDate")}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "status"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              isHighlighted(row.dueDate) ? (
                <HighlightedRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </HighlightedRow>
              ) : (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EnquiryTable;
