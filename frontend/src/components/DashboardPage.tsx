import FlagDashboard from "../components/FlagDashboard";
import FlagCreateForm from "../components/FlagCreateForm";
import { Box } from "@mui/material";

const DashboardPage = () => {
  return (
    <Box sx={{ display: "flex", gap: 4, flexDirection: "column", padding: 3 }}>
      <FlagDashboard />
      <FlagCreateForm />
    </Box>
  );
};

export default DashboardPage;
