import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

type Row = {
  id: number;
  name: string;
  enabled: boolean;
  customer: string;
  region: string;
};

const FlagDashboard = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/dashboard/flags-overview");
      setRows(res.data);
    } catch (err) {
      setError("❌ Failed to load flags");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (id: number, current: boolean) => {
    try {
      await axios.put(`/feature-flags/${id}/toggle`, {
        enabled: !current,
      });
      fetchData();
    } catch (err) {
      console.error("❌ Toggle failed", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/feature-flags/${id}`);
      fetchData();
    } catch (err) {
      console.error("❌ Delete failed", err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Feature Flags Overview
      </Typography>

      {loading && <p>Loading flags...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Region</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((flag) => (
              <TableRow key={flag.id}>
                <TableCell>{flag.name}</TableCell>
                <TableCell>
                  <Chip
                    label={flag.enabled ? "ON" : "OFF"}
                    color={flag.enabled ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{flag.customer || "—"}</TableCell>
                <TableCell>{flag.region || "—"}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleToggle(flag.id, flag.enabled)}
                    color={flag.enabled ? "success" : "default"}
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(flag.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlagDashboard;
