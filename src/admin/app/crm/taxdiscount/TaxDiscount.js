
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaxDiscount =()=> {
  //  const [quotationType, setQuotationType] = useState("service");
    const [includeTax, setIncludeTax] = useState(false);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [includeDiscount, setIncludeDiscount] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);


  // Calculate subtotal
  const calculateSubtotal = () => {
    return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
  };

  // Calculate total
  const calculateTotal = () => {
    let total = calculateSubtotal();
    if (includeTax) total += (total * taxPercentage) / 100;
    if (includeDiscount) total -= (total * discountPercentage) / 100;
    return total.toFixed(2);
  };

  return (
    <div>
    {/* Tax and Discount */}
    <Box mt={4}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Switch checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} />}
            label="Include Tax"
          />
          {includeTax && (
            <TextField
              fullWidth
              type="number"
              label="Tax Percentage (%)"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(+e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Switch checked={includeDiscount} onChange={(e) => setIncludeDiscount(e.target.checked)} />}
            label="Include Discount"
          />
          {includeDiscount && (
            <TextField
              fullWidth
              type="number"
              label="Discount Percentage (%)"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(+e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Grid>
      </Grid>
    </Box>

    {/* Total Calculation */}
    <Box mt={4}>
      <Typography variant="h6">Subtotal: ${calculateSubtotal().toFixed(2)}</Typography>
      {includeTax && <Typography variant="h6">Tax: ${(calculateSubtotal() * (taxPercentage / 100)).toFixed(2)}</Typography>}
      {includeDiscount && <Typography variant="h6">Discount: ${(calculateSubtotal() * (discountPercentage / 100)).toFixed(2)}</Typography>}
      <Typography variant="h5">Total: ${calculateTotal()}</Typography>
    </Box>
</div>
  )
}

export default TaxDiscount
