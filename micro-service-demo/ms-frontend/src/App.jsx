import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/demo1")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() =>
        setMessage("❌ Could not connect to demo microservice backend.")
      );
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Demo Feature Consumer (MS2)</h2>
      <p style={{ fontSize: "1.2rem", color: "navy" }}>{message}</p>
    </div>
  );
}

export default App;
