import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { usePostsSelector } from "./hooks";
import LoginForm from "./components/LoginForm";
import DashboardLayout from "./components/layouts/DashboardLayout";
import FlagDashboard from "./components/FlagDashboard";
import CustomerRegionPanel from "./components/CustomerRegionPanel";
import FlagCreateForm from "./components/FlagCreateForm";

import "./styles/FlagCreateForm.css";

const App = () => {
  const { token } = usePostsSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Redirect root based on auth */}
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />

        {/* Login route */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginForm />}
        />

        {/* Protected Routes inside Layout */}
        {token && (
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<FlagDashboard />} />
            <Route path="/dashboard/create" element={<FlagCreateForm />} />
            <Route path="/dashboard/meta" element={<CustomerRegionPanel />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
