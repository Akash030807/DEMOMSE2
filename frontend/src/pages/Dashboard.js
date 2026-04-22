import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({});

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch {
      alert("Unauthorized - please login again");
      window.location.href = "/login";
    }
  };

  const addExpense = async () => {
    try {
      await API.post("/expense", form);
      fetchExpenses();
    } catch {
      alert("Error adding expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
  
        <h3>Add Expense</h3>
  
        <input placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })} />
  
        <input placeholder="Amount"
          onChange={e => setForm({ ...form, amount: e.target.value })} />
  
        <input placeholder="Category"
          onChange={e => setForm({ ...form, category: e.target.value })} />
  
        <button onClick={addExpense}>Add Expense</button>
  
        <h3>Your Expenses</h3>
  
        {expenses.map(e => (
          <div className="expense" key={e._id}>
            <span>{e.title}</span>
            <span>₹{e.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}