import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});
  const [error, setError] = useState(""); // ✅ FIX

  const handleSubmit = async () => {
    try {
      setError("");

      await API.post("/register", form);

      window.location.href = "/login";

    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "Email already exists") {
        setError("User already registered. Please login.");
      } else {
        setError(message || "Something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />

        {/* ✅ Show error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleSubmit}>Register</button>

        {/* ✅ Add login link */}
        <p style={{ marginTop: "10px" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}