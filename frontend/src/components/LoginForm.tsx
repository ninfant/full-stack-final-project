import React, { useState, useEffect } from "react";
import { useMyDispatch, usePostsSelector } from "../hooks";
import { loginThunk } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useMyDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = usePostsSelector((state) => state.auth); // instead of useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button type="submit" disabled={loading}>
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
