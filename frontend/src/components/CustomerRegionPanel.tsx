import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import axios from "../api/axiosInstance";

const CustomerRegionPanel = () => {
  const [customerName, setCustomerName] = useState("");
  const [regionName, setRegionName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCustomer = async () => {
    if (!customerName.trim()) return;
    try {
      await axios.post("/meta/customers", { name: customerName });
      setMessage("Customer created!");
      setCustomerName("");
    } catch (err) {
      console.error("Error creating customer:", err);
      setMessage("❌ Failed to create customer");
    }
  };

  const handleAddRegion = async () => {
    if (!regionName.trim()) return;
    try {
      await axios.post("/meta/regions", { name: regionName });
      setMessage("Region created!");
      setRegionName("");
    } catch (err) {
      console.error("Error creating region:", err);
      setMessage("❌ Failed to create region");
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Add Customers & Regions
      </Typography>

      {message && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="space-between"
      >
        {/* Customer Panel */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Add Customer</Typography>
          <TextField
            fullWidth
            size="small"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. Netflix"
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddCustomer}
            sx={{
              mt: 3,
              backgroundColor: "#2f3640",
              color: "white",
              "&:hover": {
                backgroundColor: "#1e232b",
              },
            }}
          >
            Create Customer
          </Button>
        </Paper>

        {/* Region Panel */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Add Region</Typography>
          <TextField
            fullWidth
            size="small"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
            placeholder="e.g. LATAM"
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddRegion}
            sx={{
              mt: 3,
              backgroundColor: "#2f3640",
              color: "white",
              "&:hover": {
                backgroundColor: "#1e232b",
              },
            }}
          >
            Create Region
          </Button>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CustomerRegionPanel;
