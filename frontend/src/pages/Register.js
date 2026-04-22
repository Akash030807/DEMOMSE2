import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    try {
      await API.post("/register", form);
      alert("Registered successfully");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
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
  
        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}