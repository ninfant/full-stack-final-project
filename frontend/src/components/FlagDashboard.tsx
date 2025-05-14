import { useEffect } from "react";
import { useMyDispatch, usePostsSelector } from "../hooks";
import {
  fetchFlagsThunk,
  toggleFlagThunk,
  deleteFlagThunk,
} from "../features/featureFlags/featureFlagThunks";
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

const FlagDashboard = () => {
  const dispatch = useMyDispatch();
  const { flags, loading, error } = usePostsSelector(
    (state) => state.featureFlags
  );

  useEffect(() => {
    dispatch(fetchFlagsThunk());
  }, [dispatch]);

  const handleToggle = (id: number) => {
    const flag = flags.find((f) => f.id === id);
    if (flag) {
      dispatch(toggleFlagThunk({ id: flag.id, enabled: !flag.enabled }));
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteFlagThunk(id));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Feature Flags Overview
      </Typography>

      {loading && <p>Loading...</p>}
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
            {flags.map((flag) => (
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
                    onClick={() => handleToggle(flag.id)}
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
