const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Add Expense
router.post("/expense", auth, async (req, res) => {
    const { title, amount, category } = req.body;

    const expense = new Expense({
        userId: req.user.id,
        title,
        amount,
        category
    });

    await expense.save();
    res.json(expense);
});

// Get Expenses
router.get("/expenses", auth, async (req, res) => {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
});

module.exports = router;