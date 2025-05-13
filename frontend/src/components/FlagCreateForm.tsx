import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useMyDispatch } from "../hooks";
import { createFlagsThunk } from "../features/featureFlags/featureFlagThunks";

type Customer = { id: number; name: string };
type Region = { id: number; name: string };

const FlagCreateForm = () => {
  const dispatch = useMyDispatch();
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/meta/customers").then((res) => setCustomers(res.data));
    axios.get("/meta/regions").then((res) => setRegions(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Flag name is required");
      return;
    }

    try {
      await dispatch(
        createFlagsThunk({
          name: name.trim(),
          enabled,
          customer: selectedCustomers,
          region: selectedRegions,
        })
      ).unwrap();

      setMessage("Feature flag created successfully!");
      setError(null);
      setName("");
      setEnabled(false);
      setSelectedCustomers([]);
      setSelectedRegions([]);
    } catch (err) {
      setError("❌ Failed to create feature flag");
      setMessage(null);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 300,
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" mb={2}>
        Create New Feature Flag
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Flag Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
        }
        label="Enabled by default"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Assign Customers</InputLabel>
        <Select
          multiple
          value={selectedCustomers}
          onChange={(e) => setSelectedCustomers(e.target.value as number[])}
          input={<OutlinedInput label="Assign Customers" />}
          renderValue={(selected) =>
            customers
              .filter((c) => selected.includes(c.id))
              .map((c) => c.name)
              .join(", ")
          }
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Assign Regions</InputLabel>
        <Select
          multiple
          value={selectedRegions}
          onChange={(e) => setSelectedRegions(e.target.value as number[])}
          input={<OutlinedInput label="Assign Regions" />}
          renderValue={(selected) =>
            regions
              .filter((r) => selected.includes(r.id))
              .map((r) => r.name)
              .join(", ")
          }
        >
          {regions.map((region) => (
            <MenuItem key={region.id} value={region.id}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3, //margin-top: 24px - Cada unidad (1) equivale a 8px
          backgroundColor: "#2f3640",
          color: "white",
          "&:hover": {
            backgroundColor: "#1e232b",
          },
        }}
      >
        Create Flag
      </Button>
    </Box>
  );
};

export default FlagCreateForm;
