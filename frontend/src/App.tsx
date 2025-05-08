import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from "./hooks";
import LoginForm from "./components/LoginForm";
import FeatureFlagList from "./components/FeatureFlagList";

const App = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginForm />}
        />
        <Route
          path="/dashboard"
          element={token ? <FeatureFlagList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
