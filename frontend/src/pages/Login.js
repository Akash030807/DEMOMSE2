import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      const res = await API.post("/login", form);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleSubmit}>Login</button>

        <p style={{ marginTop: "10px" }}>
          Don't have an account? <a href="/">Register</a>
        </p>
      </div>
    </div>
  );
}