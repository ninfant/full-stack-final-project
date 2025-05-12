import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { usePostsSelector } from "./hooks";
import LoginForm from "./components/LoginForm";
import DashboardPage from "./components/DashboardPage";
import "./App.css";

const App = () => {
  const { token } = usePostsSelector((state) => state.auth);

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
          element={token ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
