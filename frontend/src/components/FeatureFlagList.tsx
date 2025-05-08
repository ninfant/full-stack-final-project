import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAppDispatch } from "../hooks";
import { logout } from "../features/auth/authSlice";
import type { FeatureFlag } from "../types/featureFlag";

const FeatureFlagList = () => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axiosInstance
      .get("/feature-flags")
      .then((res) => {
        console.log("Flags from backend:", res.data);
        setFlags(res.data);
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Request failed";
        setError(msg);
      });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Feature Flags</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {flags.map((flag) => (
          <li key={flag.id}>
            {flag.name}: {flag.enabled ? "🟢" : "🔴"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureFlagList;
